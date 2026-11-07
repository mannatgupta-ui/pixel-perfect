import { Html, Line, OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { BODIES, BODY_BY_ID } from "@/data/bodies";
import type { BodyId, CelestialBody } from "@/data/types";
import { SATURN_RING_TEXTURE, TEXTURES } from "@/lib/textures";
import { cn } from "@/lib/utils";
import { ReadySignal } from "./ReadySignal";
import { SCENE } from "./scene-colors";

/* Dynamic Feel Constants */
const BASE_ORBIT_SPEED = 0.16; // rad/s for a 1-year orbit
const SELECTED_TIME_SCALE = 0.12;
const SPIN = 0.25;
const FLY_SECONDS = 1.6;
const FLY_RATE = 3.5;
const OVERVIEW = new THREE.Vector3(0, 18, 32);

export interface SolarSystemSettings {
  timeSpeed?: number;
  showAsteroidBelt?: boolean;
  showKuiperBelt?: boolean;
  showOrbits?: boolean;
  showLabels?: boolean;
  showNebulae?: boolean;
  showComet?: boolean;
  tourActive?: boolean;
  tourStep?: number;
}

interface Props {
  selected: BodyId | null;
  onSelect: (id: BodyId | null) => void;
  onReady?: () => void;
  settings?: SolarSystemSettings;
}

type Positions = Record<BodyId, THREE.Vector3>;

export default function SolarSystemScene({
  selected,
  onSelect,
  onReady,
  settings = {},
}: Props) {
  const {
    timeSpeed = 1,
    showAsteroidBelt = true,
    showKuiperBelt = true,
    showOrbits = true,
    showLabels = true,
    showNebulae = true,
    showComet = true,
    tourActive = false,
    tourStep = 0,
  } = settings;

  return (
    <Canvas
      camera={{ position: OVERVIEW.toArray(), fov: 45, near: 0.05, far: 800 }}
      dpr={[1, 2]}
      onPointerMissed={() => onSelect(null)}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={[SCENE.space]} />
      <ambientLight intensity={0.24} />
      <pointLight position={[0, 0, 0]} intensity={3.0} decay={0} color="#fff6e5" />

      {/* Layered deep-space starfields */}
      <Stars radius={220} depth={80} count={6500} factor={4.0} saturation={0.5} fade speed={0.15 * timeSpeed} />
      <Stars radius={90} depth={40} count={1200} factor={6.0} saturation={0.8} fade speed={0.3 * timeSpeed} />

      {/* Volumetric cosmic nebulae clouds */}
      {showNebulae && <DeepSpaceNebulae />}

      <OrbitControls makeDefault enablePan={false} minDistance={1.2} maxDistance={110} enableDamping />

      <Suspense fallback={null}>
        <System
          selected={selected}
          onSelect={onSelect}
          timeSpeed={timeSpeed}
          showAsteroidBelt={showAsteroidBelt}
          showKuiperBelt={showKuiperBelt}
          showOrbits={showOrbits}
          showLabels={showLabels}
          showComet={showComet}
          tourActive={tourActive}
          tourStep={tourStep}
        />
        {onReady && <ReadySignal onReady={onReady} />}
      </Suspense>
    </Canvas>
  );
}

function System({
  selected,
  onSelect,
  timeSpeed,
  showAsteroidBelt,
  showKuiperBelt,
  showOrbits,
  showLabels,
  showComet,
  tourActive,
  tourStep,
}: {
  selected: BodyId | null;
  onSelect: (id: BodyId) => void;
  timeSpeed: number;
  showAsteroidBelt: boolean;
  showKuiperBelt: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  showComet: boolean;
  tourActive: boolean;
  tourStep: number;
}) {
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

  // Tour Targets Sequence: Sun -> Mercury -> Venus -> Earth -> Mars -> Asteroid Belt -> Jupiter -> Saturn -> Kuiper Belt
  const tourTargets = useMemo(
    () => [
      { pos: new THREE.Vector3(0, 8, 14), look: new THREE.Vector3(0, 0, 0) }, // 0: Sun
      { pos: new THREE.Vector3(3.2, 1.2, 3.5), look: new THREE.Vector3(3.4, 0, 0) }, // 1: Mercury
      { pos: new THREE.Vector3(4.8, 1.6, 5.0), look: new THREE.Vector3(5.1, 0, 0) }, // 2: Venus
      { pos: new THREE.Vector3(6.5, 2.0, 7.0), look: new THREE.Vector3(7.0, 0, 0) }, // 3: Earth & Moon
      { pos: new THREE.Vector3(10.5, 2.8, 11.0), look: new THREE.Vector3(11.0, 0, 0) }, // 4: Mars
      { pos: new THREE.Vector3(12.8, 4.2, 14.0), look: new THREE.Vector3(13.2, 0, 0) }, // 5: Asteroid Belt & Ceres
      { pos: new THREE.Vector3(14.5, 5.0, 16.5), look: new THREE.Vector3(15.2, 0, 0) }, // 6: Jupiter
      { pos: new THREE.Vector3(18.5, 6.0, 21.0), look: new THREE.Vector3(19.8, 0, 0) }, // 7: Saturn & Rings
      { pos: new THREE.Vector3(0, 35, 55), look: new THREE.Vector3(0, 0, 0) }, // 8: Kuiper Belt & Deep Space Overview
    ],
    [],
  );

  // Main Stepper: Advance simulated physics clock -> calculate orbital bodies -> rig camera
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    time.current += dt * (selected ? SELECTED_TIME_SCALE : 1) * timeSpeed;
    const t = time.current;

    for (const body of BODIES) {
      const pos = positions[body.id];
      if (body.orbit === 0) {
        pos.set(0, 0, 0);
      } else {
        const omega = BASE_ORBIT_SPEED / Math.sqrt(body.periodYears);
        const angle = seedAngle(body.id) + t * omega;
        const parent = body.parent ? positions[body.parent] : null;
        pos.set(Math.cos(angle) * body.orbit, 0, -Math.sin(angle) * body.orbit);
        if (parent) pos.add(parent);
      }
      const g = groups.current[body.id];
      if (g) g.position.copy(pos);
    }

    if (!controls) return;

    // Cinematic Tour Animation Override
    if (tourActive) {
      const currentTour = tourTargets[tourStep % tourTargets.length] ?? tourTargets[0]!;
      const k = 1 - Math.exp(-FLY_RATE * dt * 0.75);
      camera.position.lerp(currentTour.pos, k);
      controls.target.lerp(currentTour.look, k);
      controls.update();
      return;
    }

    if (selected !== prevSelected.current) {
      prevSelected.current = selected;
      flyLeft.current = FLY_SECONDS;
      if (selected) lastTarget.current.copy(positions[selected]);
    }

    if (selected) {
      // Follow the selected moving celestial body smoothly
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
        const dist = body.radius * 5.2 + 1.4;
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
      {/* Planetary Orbit Ellipses */}
      {showOrbits &&
        BODIES.filter((b) => b.orbit > 0 && !b.parent).map((b) => (
          <OrbitRing key={b.id} radius={b.orbit} highlight={selected === b.id} />
        ))}

      {/* Main Asteroid Belt between Mars (11.0) and Jupiter (15.2) */}
      {showAsteroidBelt && <AsteroidBelt speed={timeSpeed} showLabels={showLabels} />}

      {/* Outer Kuiper Belt beyond Neptune (28.0) */}
      {showKuiperBelt && <KuiperBelt speed={timeSpeed} showLabels={showLabels} />}

      {/* Active Sweeping Comet (Halley / 67P) */}
      {showComet && <DeepSpaceComet speed={timeSpeed} showLabels={showLabels} />}

      {/* Celestial Bodies */}
      {BODIES.map((b) => (
        <group
          key={b.id}
          ref={(g) => {
            if (g) groups.current[b.id] = g;
          }}
        >
          <Body body={b} selected={selected === b.id} onSelect={onSelect} showLabels={showLabels} />
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
    for (let i = 0; i <= 180; i++) {
      const a = (i / 180) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color={highlight ? SCENE.mars : SCENE.orbit}
      lineWidth={highlight ? 1.8 : 1}
      transparent
      opacity={highlight ? 0.9 : 0.22}
    />
  );
}

function Body({
  body,
  selected,
  onSelect,
  showLabels,
}: {
  body: CelestialBody;
  selected: boolean;
  onSelect: (id: BodyId) => void;
  showLabels: boolean;
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
    <group scale={active && !isSun ? 1.15 : 1}>
      <mesh ref={spinRef} rotation={[0, 0, body.id === "uranus" ? 1.7 : body.id === "earth" ? 0.41 : 0.1]}>
        <sphereGeometry args={[r, 48, 32]} />
        {isSun ? <meshBasicMaterial map={map} /> : <meshStandardMaterial map={map} roughness={0.9} metalness={0.05} />}
      </mesh>

      {/* Generous invisible hit area so small planets are easy to tap */}
      <mesh onClick={handleClick} onPointerOver={over} onPointerOut={out}>
        <sphereGeometry args={[Math.max(r * 1.6, 0.45), 16, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {isSun && <SunGlow radius={r} />}
      {body.id === "saturn" && <SaturnRing radius={r} />}
      {active && !isSun && <SelectionHalo radius={r} />}

      {showLabels && (
        <Html position={[0, -r - 0.38, 0]} center zIndexRange={[10, 0]}>
          <button
            type="button"
            onClick={() => onSelect(body.id)}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            className={cn(
              "pointer-events-auto select-none whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all",
              active
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-background/40 text-muted-foreground backdrop-blur hover:text-foreground",
            )}
          >
            {body.name.replace("The ", "")}
          </button>
        </Html>
      )}
    </group>
  );
}

function SunGlow({ radius }: { radius: number }) {
  const pulseRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const s = 1.65 + Math.sin(clock.getElapsedTime() * 1.5) * 0.05;
      pulseRef.current.scale.set(s, s, s);
    }
  });

  return (
    <>
      <mesh scale={1.25}>
        <sphereGeometry args={[radius, 32, 16]} />
        <meshBasicMaterial
          color={SCENE.marsGlow}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh ref={pulseRef} scale={1.7}>
        <sphereGeometry args={[radius, 32, 16]} />
        <meshBasicMaterial
          color={SCENE.mars}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
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
      <ringGeometry args={[radius * 1.35, radius * 1.48, 64]} />
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

/**
 * ────────────────────────────────────────────────────────────────
 * MAIN ASTEROID BELT (Between Mars 11.0 and Jupiter 15.2)
 * 2,200 Rocky Asteroids with Procedural Shading and Ceres
 * ────────────────────────────────────────────────────────────────
 */
function AsteroidBelt({ speed, showLabels }: { speed: number; showLabels: boolean }) {
  const count = 2200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ceresGroupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const palette = ["#5c554e", "#7a7268", "#45403c", "#8f8579", "#615f5a", "#a3998d"];

    for (let i = 0; i < count; i++) {
      const radius = 12.1 + Math.random() * 2.3 + (Math.random() - 0.5) * 0.4;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.55;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      dummy.position.set(x, y, z);
      const s = 0.024 + Math.random() * 0.048;
      dummy.scale.set(s, s * (0.8 + Math.random() * 0.4), s * (0.8 + Math.random() * 0.4));
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      color.set(palette[i % palette.length]!);
      meshRef.current.setColorAt(i, color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.045 * speed;
    if (ceresGroupRef.current) ceresGroupRef.current.rotation.y += dt * 0.048 * speed;
  });

  return (
    <>
      <group ref={groupRef}>
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial roughness={0.92} metalness={0.08} />
        </instancedMesh>
      </group>

      {/* Ceres Dwarf Planet in Asteroid Belt */}
      <group ref={ceresGroupRef}>
        <group position={[13.2, 0.08, 0]}>
          <mesh>
            <sphereGeometry args={[0.13, 24, 16]} />
            <meshStandardMaterial color="#948c82" roughness={0.9} />
          </mesh>
          {showLabels && (
            <Html position={[0, -0.3, 0]} center zIndexRange={[5, 0]}>
              <span className="pointer-events-none select-none rounded-full bg-background/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground border border-border/40">
                Ceres · 1 Ceres
              </span>
            </Html>
          )}
        </group>
      </group>
    </>
  );
}

/**
 * ────────────────────────────────────────────────────────────────
 * KUIPER BELT (Beyond Neptune 28.0: Radius 31.0 to 44.0)
 * 3,200 Icy Blue/White Fragments & Pluto with 17° Tilted Orbit
 * ────────────────────────────────────────────────────────────────
 */
function KuiperBelt({ speed, showLabels }: { speed: number; showLabels: boolean }) {
  const count = 3200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const plutoRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const palette = ["#8ac4d0", "#a4d7e1", "#d6eff7", "#76a3b8", "#daedf6", "#689bb5"];

    for (let i = 0; i < count; i++) {
      const radius = 31.0 + Math.random() * 13.0 + (Math.random() - 0.5) * 1.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.6; // Wider vertical inclination spread
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      dummy.position.set(x, y, z);
      const s = 0.035 + Math.random() * 0.065;
      dummy.scale.set(s, s * (0.8 + Math.random() * 0.4), s * (0.8 + Math.random() * 0.4));
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      color.set(palette[i % palette.length]!);
      meshRef.current.setColorAt(i, color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.015 * speed;
    if (plutoRef.current) plutoRef.current.rotation.y += dt * 0.016 * speed;
  });

  return (
    <>
      <group ref={groupRef}>
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial roughness={0.65} metalness={0.15} />
        </instancedMesh>
      </group>

      {/* Pluto & Charon with 17° Inclined Orbit */}
      <group ref={plutoRef} rotation={[0.29, 0, 0]}>
        <group position={[33.8, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.16, 24, 16]} />
            <meshStandardMaterial color="#c7b198" roughness={0.85} />
          </mesh>
          {showLabels && (
            <Html position={[0, -0.32, 0]} center zIndexRange={[5, 0]}>
              <span className="pointer-events-none select-none rounded-full bg-background/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal border border-teal/40">
                Pluto · Kuiper Belt
              </span>
            </Html>
          )}
        </group>
      </group>
    </>
  );
}

/**
 * ────────────────────────────────────────────────────────────────
 * DEEP SPACE COMET (Comet 1P/Halley & Comet 67P)
 * Real Keplerian eccentric orbit with dynamic ion/dust tail
 * ────────────────────────────────────────────────────────────────
 */
function DeepSpaceComet({ speed, showLabels }: { speed: number; showLabels: boolean }) {
  const cometRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const time = useRef(1.2);

  // Orbit parameters: a = 18.0, e = 0.86, inclination ~ 18 deg
  const a = 18.0;
  const e = 0.86;
  const b = a * Math.sqrt(1 - e * e);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    time.current += dt * 0.06 * speed;
    const M = time.current % (Math.PI * 2);

    // Solve Kepler's equation for E: E - e*sin(E) = M
    let E = M;
    for (let i = 0; i < 4; i++) {
      E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    }

    const xOrb = a * (Math.cos(E) - e);
    const zOrb = b * Math.sin(E);

    // Apply 18-degree orbital inclination tilt
    const tilt = 0.31;
    const x = xOrb;
    const y = zOrb * Math.sin(tilt);
    const z = zOrb * Math.cos(tilt);

    if (cometRef.current) {
      cometRef.current.position.set(x, y, z);

      // Tail always points radially away from the Sun (0,0,0)
      const sunDist = Math.sqrt(x * x + y * y + z * z);
      const dir = new THREE.Vector3(x, y, z).normalize();

      if (tailRef.current) {
        // Tail length grows when near Sun
        const tailLen = Math.min(10.0, Math.max(1.8, 32.0 / (sunDist + 1.0)));
        tailRef.current.scale.set(0.12 * (1 + 8 / sunDist), tailLen, 0.12 * (1 + 8 / sunDist));
        tailRef.current.position.copy(dir.clone().multiplyScalar(tailLen * 0.5));

        // Align tail with the direction away from the Sun
        const up = new THREE.Vector3(0, 1, 0);
        tailRef.current.quaternion.setFromUnitVectors(up, dir);
      }
    }
  });

  return (
    <group ref={cometRef}>
      {/* Comet Nucleus (Icy dirty snowball) */}
      <mesh>
        <dodecahedronGeometry args={[0.08, 1]} />
        <meshBasicMaterial color="#e0f2fe" />
      </mesh>

      {/* Coma glow */}
      <mesh scale={2.8}>
        <sphereGeometry args={[0.08, 16, 12]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Ion & Dust Tail pointing away from the Sun */}
      <mesh ref={tailRef}>
        <cylinderGeometry args={[0.02, 0.22, 1, 16, 1, true]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {showLabels && (
        <Html position={[0, -0.25, 0]} center zIndexRange={[5, 0]}>
          <span className="pointer-events-none select-none rounded-full bg-teal/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal border border-teal/40 whitespace-nowrap">
            Comet 1P/Halley
          </span>
        </Html>
      )}
    </group>
  );
}

/**
 * ────────────────────────────────────────────────────────────────
 * VOLUMETRIC DEEP SPACE NEBULAE
 * Ambient cosmic gas clouds for authentic deep space atmosphere
 * ────────────────────────────────────────────────────────────────
 */
function DeepSpaceNebulae() {
  return (
    <group>
      {/* Cyan / Teal Deep Space Nebula */}
      <mesh position={[70, 24, -90]} rotation={[0.4, 0.6, 0.2]}>
        <planeGeometry args={[180, 140]} />
        <meshBasicMaterial
          color="#064e3b"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cosmic Violet / Purple Haze */}
      <mesh position={[-85, -20, -70]} rotation={[-0.3, -0.4, 0.5]}>
        <planeGeometry args={[190, 150]} />
        <meshBasicMaterial
          color="#4c1d95"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Mars Gold / Amber Galactic Center Dust */}
      <mesh position={[0, 45, 110]} rotation={[0.5, 0, 0]}>
        <planeGeometry args={[220, 160]} />
        <meshBasicMaterial
          color="#78350f"
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
