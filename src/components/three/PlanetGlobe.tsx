import { Html, OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import type { BodyId } from "@/data/types";
import { latLonToVector } from "@/lib/geo";
import { TEXTURES } from "@/lib/textures";
import { cn } from "@/lib/utils";
import { ReadySignal } from "./ReadySignal";
import { SCENE } from "./scene-colors";

const GLOBE_R = 2;
const FOCUS_DISTANCE = 4.6;
const FLY_SECONDS = 1.8;
const FLY_RATE = 3.2;

export interface GlobeSite {
  key: string;
  lat: number;
  lon: number;
  label: string;
  tone: "active" | "silent";
  approximate: boolean;
  artifactIds: string[];
}

interface Props {
  bodyId: BodyId;
  sites: GlobeSite[];
  selectedKey: string | null;
  onSelect: (key: string | null) => void;
  onReady?: () => void;
}

export default function PlanetGlobe({ bodyId, sites, selectedKey, onSelect, onReady }: Props) {
  return (
    <Canvas camera={{ position: [0, 1.5, 7.5], fov: 40, near: 0.05, far: 300 }} dpr={[1, 2]} onPointerMissed={() => onSelect(null)}>
      <color attach="background" args={[SCENE.space]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 3, 5]} intensity={2.4} color="#fff1dd" />
      <directionalLight position={[-6, -2, -4]} intensity={0.25} color={SCENE.teal} />
      <Stars radius={90} depth={40} count={3500} factor={4} fade speed={0.3} />
      <OrbitControls makeDefault enablePan={false} minDistance={2.6} maxDistance={14} enableDamping rotateSpeed={0.6} zoomSpeed={0.7} />
      <Suspense fallback={null}>
        <Globe bodyId={bodyId} sites={sites} selectedKey={selectedKey} onSelect={onSelect} />
        {onReady && <ReadySignal onReady={onReady} />}
      </Suspense>
    </Canvas>
  );
}

function Globe({ bodyId, sites, selectedKey, onSelect }: Omit<Props, "onReady">) {
  const map = useTexture(TEXTURES[bodyId], (t) => {
    (Array.isArray(t) ? t : [t]).forEach((x) => {
      x.colorSpace = THREE.SRGBColorSpace;
      x.anisotropy = 8;
    });
  });
  const globeRef = useRef<THREE.Mesh>(null);
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const flyLeft = useRef(0);
  const prev = useRef<string | null>(null);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const origin = useMemo(() => new THREE.Vector3(), []);
  const idle = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!controls) return;
    if (selectedKey !== prev.current) {
      prev.current = selectedKey;
      flyLeft.current = selectedKey ? FLY_SECONDS : 0;
    }
    const site = sites.find((s) => s.key === selectedKey);
    if (site && flyLeft.current > 0) {
      flyLeft.current -= dt;
      const [x, y, z] = latLonToVector(site.lat, site.lon, FOCUS_DISTANCE);
      desired.set(x, y, z);
      const k = 1 - Math.exp(-FLY_RATE * dt);
      camera.position.lerp(desired, k);
      controls.target.lerp(origin, k);
    }
    // Gentle auto-rotation while nothing is selected.
    idle.current += dt;
    controls.autoRotate = !selectedKey;
    controls.autoRotateSpeed = 0.35;
    controls.update();
  });

  const atmosphere = bodyId === "mars" ? SCENE.marsGlow : SCENE.cream;

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[GLOBE_R, 128, 96]} />
        <meshStandardMaterial map={map} roughness={0.95} metalness={0} />
      </mesh>
      <mesh scale={1.035}>
        <sphereGeometry args={[GLOBE_R, 64, 48]} />
        <meshBasicMaterial
          color={atmosphere}
          transparent
          opacity={bodyId === "mars" ? 0.12 : 0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {sites.map((s) => (
        <SiteMarker
          key={s.key}
          site={s}
          selected={s.key === selectedKey}
          onSelect={onSelect}
          occluder={globeRef}
        />
      ))}
    </group>
  );
}

function SiteMarker({
  site,
  selected,
  onSelect,
  occluder,
}: {
  site: GlobeSite;
  selected: boolean;
  onSelect: (key: string) => void;
  occluder: React.RefObject<THREE.Mesh | null>;
}) {
  const [hovered, setHovered] = useState(false);
  const pulse = useRef<THREE.Mesh>(null);
  const { position, quaternion } = useMemo(() => {
    const [x, y, z] = latLonToVector(site.lat, site.lon, GLOBE_R);
    const p = new THREE.Vector3(x, y, z);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());
    return { position: p, quaternion: q };
  }, [site.lat, site.lon]);

  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const t = (clock.elapsedTime * 0.6 + site.lat * 0.01) % 1;
    pulse.current.scale.setScalar(1 + t * 2.2);
    (pulse.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.7;
  });

  const color = site.tone === "active" ? SCENE.signal : SCENE.gold;
  const active = hovered || selected;
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(site.key);
  };

  return (
    <group position={position} quaternion={quaternion}>
      <mesh
        position={[0, 0.06, 0]}
        onClick={click}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <cylinderGeometry args={[0.012, 0.012, 0.12, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.13, 0]} onClick={click}>
        <sphereGeometry args={[active ? 0.045 : 0.032, 16, 12]} />
        <meshBasicMaterial color={active ? SCENE.mars : color} />
      </mesh>
      {/* Larger invisible hit target */}
      <mesh position={[0, 0.1, 0]} onClick={click}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={pulse} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={site.approximate ? [0.05, 0.058, 32] : [0.035, 0.05, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {active && (
        <Html position={[0, 0.22, 0]} center occlude={[occluder as React.RefObject<THREE.Object3D>]} zIndexRange={[20, 0]}>
          <div
            className={cn(
              "pointer-events-none whitespace-nowrap rounded-full border border-border bg-panel px-3 py-1 font-mono text-[11px] text-foreground shadow-panel",
            )}
          >
            {site.label}
            {site.approximate && <span className="ml-1.5 text-gold">≈ approx.</span>}
          </div>
        </Html>
      )}
    </group>
  );
}
