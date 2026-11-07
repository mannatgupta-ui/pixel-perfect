import { Html, Line, OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { BODIES, BODY_BY_ID } from "@/data/bodies";
import type { BodyId, CelestialBody } from "@/data/types";
import { SATURN_RING_TEXTURE, TEXTURES } from "@/lib/textures";
import { cn } from "@/lib/utils";
import { ReadySignal } from "./ReadySignal";
import { SCENE } from "./scene-colors";

/* Feel constants */
const ORBIT_SPEED = 0.16; // rad/s for a 1-year orbit (compressed)
const SELECTED_TIME_SCALE = 0.12;
const SPIN = 0.25;
const FLY_SECONDS = 1.6;
const FLY_RATE = 3.5;
const OVERVIEW = new THREE.Vector3(0, 17, 31);

type Positions = Record<BodyId, THREE.Vector3>;

interface Props {
  selected: BodyId | null;
  onSelect: (id: BodyId | null) => void;
  onReady?: () => void;
}

export default function SolarSystemScene({ selected, onSelect, onReady }: Props) {
  return (
    <Canvas
      camera={{ position: OVERVIEW.toArray(), fov: 45, near: 0.05, far: 600 }}
      dpr={[1, 2]}
      onPointerMissed={() => onSelect(null)}
    >
      <color attach="background" args={[SCENE.space]} />
      <ambientLight intensity={0.22} />
      <pointLight position={[0, 0, 0]} intensity={2.6} decay={0} color="#fff3e0" />
      <Stars radius={140} depth={60} count={5000} factor={4.5} saturation={0.4} fade speed={0.4} />
      <OrbitControls makeDefault enablePan={false} minDistance={1.2} maxDistance={80} enableDamping />
      <Suspense fallback={null}>
        <System selected={selected} onSelect={onSelect} />
        {onReady && <ReadySignal onReady={onReady} />}
      </Suspense>
    </Canvas>
  );
}

function System({ selected, onSelect }: { selected: BodyId | null; onSelect: (id: BodyId) => void }) {
  const positions = useMemo(
    () => Object.fromEntries(BODIES.map((b) => [b.id, new THREE.Vector3()])) as Positions,
    [],
  );
  const groups = useRef<Partial<Record<BodyId, THREE.Group>>>({});
  const time = useRef(0);
  const flyLeft = useRef(0);
  const prevSelected = useRef<BodyId | null>(null);
  const lastTarget = useRef(new THREE.Vector3());
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;

  // The one stepper: advance clock → bodies → camera rig.
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    time.current += dt * (selected ? SELECTED_TIME_SCALE : 1);
    const t = time.current;

    for (const body of BODIES) {
      const pos = positions[body.id];
      if (body.orbit === 0) {
        pos.set(0, 0, 0);
      } else {
        const omega = ORBIT_SPEED / Math.sqrt(body.periodYears);
        const angle = seedAngle(body.id) + t * omega;
        const parent = body.parent ? positions[body.parent] : null;
        pos.set(Math.cos(angle) * body.orbit, 0, -Math.sin(angle) * body.orbit);
        if (parent) pos.add(parent);
      }
      const g = groups.current[body.id];
      if (g) g.position.copy(pos);
    }

    if (!controls) return;
    if (selected !== prevSelected.current) {
      prevSelected.current = selected;
      flyLeft.current = FLY_SECONDS;
      if (selected) lastTarget.current.copy(positions[selected]);
    }
    if (selected) {
      // Follow the moving body.
      tmp.subVectors(positions[selected], lastTarget.current);
      camera.position.add(tmp);
      controls.target.add(tmp);
      lastTarget.current.copy(positions[selected]);
    }
    if (flyLeft.current > 0) {
      flyLeft.current -= dt;
      const k = 1 - Math.exp(-FLY_RATE * dt);
      if (selected) {
        const body = BODY_BY_ID[selected];
        const target = positions[selected];
        const dist = body.radius * 5 + 1.2;
        desired.copy(camera.position).sub(controls.target).normalize();
        if (desired.y < 0.25) desired.y = 0.25;
        desired.normalize().multiplyScalar(dist).add(target);
        controls.target.lerp(target, k);
        camera.position.lerp(desired, k);
      } else {
        controls.target.lerp(tmp.set(0, 0, 0), k);
        camera.position.lerp(OVERVIEW, k);
      }
    }
    controls.update();
  });

  return (
    <>
      {BODIES.filter((b) => b.orbit > 0 && !b.parent).map((b) => (
        <OrbitRing key={b.id} radius={b.orbit} highlight={selected === b.id} />
      ))}
      {BODIES.map((b) => (
        <group
          key={b.id}
          ref={(g) => {
            if (g) groups.current[b.id] = g;
          }}
        >
          <Body body={b} selected={selected === b.id} onSelect={onSelect} />
        </group>
      ))}
    </>
  );
}

function seedAngle(id: BodyId) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 1000;
  return (h / 1000) * Math.PI * 2;
}

function OrbitRing({ radius, highlight }: { radius: number; highlight: boolean }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);
  return (
    <Line
      points={points}
      color={highlight ? SCENE.mars : SCENE.orbit}
      lineWidth={highlight ? 1.6 : 1}
      transparent
      opacity={highlight ? 0.85 : 0.22}
    />
  );
}

function Body({
  body,
  selected,
  onSelect,
}: {
  body: CelestialBody;
  selected: boolean;
  onSelect: (id: BodyId) => void;
}) {
  const map = useTexture(TEXTURES[body.id], (t) => {
    (Array.isArray(t) ? t : [t]).forEach((x) => (x.colorSpace = THREE.SRGBColorSpace));
  });
  const spinRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const active = hovered || selected;
  const isSun = body.id === "sun";

  useFrame((_, d) => {
    if (spinRef.current) spinRef.current.rotation.y += Math.min(d, 0.05) * SPIN * (isSun ? 0.2 : 1);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(body.id);
  };
  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setHovered(false);
    document.body.style.cursor = "";
  };

  const r = body.radius;
  return (
    <group scale={active && !isSun ? 1.12 : 1}>
      <mesh ref={spinRef} rotation={[0, 0, body.id === "uranus" ? 1.7 : 0.1]}>
        <sphereGeometry args={[r, 48, 32]} />
        {isSun ? <meshBasicMaterial map={map} /> : <meshStandardMaterial map={map} roughness={0.9} metalness={0} />}
      </mesh>

      {/* Generous invisible hit area so small planets are easy to tap. */}
      <mesh onClick={handleClick} onPointerOver={over} onPointerOut={out}>
        <sphereGeometry args={[Math.max(r * 1.6, 0.45), 16, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {isSun && <SunGlow radius={r} />}
      {body.id === "saturn" && <SaturnRing radius={r} />}
      {active && !isSun && <SelectionHalo radius={r} />}

      <Html position={[0, -r - 0.35, 0]} center zIndexRange={[10, 0]}>
        <button
          type="button"
          onClick={() => onSelect(body.id)}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className={cn(
            "pointer-events-auto select-none whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all",
            active
              ? "bg-primary text-primary-foreground shadow-glow"
              : "bg-background/40 text-muted-foreground hover:text-foreground",
          )}
        >
          {body.name.replace("The ", "")}
        </button>
      </Html>
    </group>
  );
}

function SunGlow({ radius }: { radius: number }) {
  return (
    <>
      <mesh scale={1.25}>
        <sphereGeometry args={[radius, 32, 16]} />
        <meshBasicMaterial color={SCENE.marsGlow} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.7}>
        <sphereGeometry args={[radius, 32, 16]} />
        <meshBasicMaterial color={SCENE.mars} transparent opacity={0.07} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

function SelectionHalo({ radius }: { radius: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const camera = useThree((s) => s.camera);
  useFrame(() => ref.current?.quaternion.copy(camera.quaternion));
  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius * 1.35, radius * 1.45, 64]} />
      <meshBasicMaterial color={SCENE.gold} transparent opacity={0.9} depthWrite={false} />
    </mesh>
  );
}

function SaturnRing({ radius }: { radius: number }) {
  const tex = useTexture(SATURN_RING_TEXTURE, (t) => {
    (Array.isArray(t) ? t : [t]).forEach((x) => (x.colorSpace = THREE.SRGBColorSpace));
  });
  const geometry = useMemo(() => {
    const inner = radius * 1.25;
    const outer = radius * 2.3;
    const g = new THREE.RingGeometry(inner, outer, 96, 1);
    const pos = g.attributes["position"] as THREE.BufferAttribute;
    const uv = g.attributes["uv"] as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      uv.setXY(i, (v.length() - inner) / (outer - inner), 0.5);
    }
    return g;
  }, [radius]);
  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2 + 0.47, 0, 0]}>
      <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}
