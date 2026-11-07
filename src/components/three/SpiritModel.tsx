import { ContactShadows, Environment, Float, Html, Lightformer, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { createContext, useContext, useState, type ReactNode } from "react";
import * as THREE from "three";

import { SPIRIT_PART_BY_ID, type SpiritPartId } from "@/data/spirit";
import { ReadySignal } from "./ReadySignal";
import { SCENE } from "./scene-colors";

/**
 * Illustrative reconstruction of a Mars Exploration Rover built from simple
 * shapes. Proportions are approximate — not an exact replica.
 */

const C = {
  body: "#e8e1d2",
  foil: "#d9a441",
  cell: "#1d3566",
  frame: "#9aa3ad",
  dark: "#2b2f38",
  wheel: "#bfc4c9",
  lens: "#030305",
};

interface PartCtx {
  selected: SpiritPartId | null;
  hovered: SpiritPartId | null;
  setHovered: (id: SpiritPartId | null) => void;
  onSelect: (id: SpiritPartId) => void;
}
const Ctx = createContext<PartCtx | null>(null);

function Part({ id, children }: { id: SpiritPartId; children: ReactNode }) {
  const ctx = useContext(Ctx);
  if (!ctx) return null;
  return (
    <group
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        ctx.onSelect(id);
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        ctx.setHovered(id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        ctx.setHovered(null);
        document.body.style.cursor = "";
      }}
    >
      <PartIdContext.Provider value={id}>{children}</PartIdContext.Provider>
    </group>
  );
}
const PartIdContext = createContext<SpiritPartId | null>(null);

function Mat({ color, metal = 0.2, rough = 0.6 }: { color: string; metal?: number; rough?: number }) {
  const ctx = useContext(Ctx);
  const id = useContext(PartIdContext);
  const lit = !!id && (ctx?.selected === id || ctx?.hovered === id);
  return (
    <meshStandardMaterial
      color={color}
      metalness={metal}
      roughness={rough}
      emissive={lit ? SCENE.mars : "#000000"}
      emissiveIntensity={lit ? (ctx?.selected === id ? 0.65 : 0.35) : 0}
    />
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.13, 0.13, 0.11, 24]} />
        <Mat color={C.wheel} metal={0.6} rough={0.4} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.13, 12]} />
        <Mat color={C.dark} />
      </mesh>
    </group>
  );
}

function Rover() {
  const wheelX = 0.62;
  const wheelZ = [-0.55, 0, 0.55];
  return (
    <group position={[0, -0.55, 0]}>
      {/* Wheels + rocker-bogie */}
      <Part id="wheels">
        {[-1, 1].map((side) => (
          <group key={side}>
            {wheelZ.map((z) => (
              <Wheel key={z} position={[side * wheelX, 0.13, z]} />
            ))}
            <mesh position={[side * (wheelX - 0.02), 0.42, -0.1]} rotation={[0.35, 0, 0]}>
              <boxGeometry args={[0.04, 0.04, 0.85]} />
              <Mat color={C.frame} metal={0.7} rough={0.35} />
            </mesh>
            <mesh position={[side * (wheelX - 0.02), 0.3, 0.32]} rotation={[-0.5, 0, 0]}>
              <boxGeometry args={[0.04, 0.04, 0.55]} />
              <Mat color={C.frame} metal={0.7} rough={0.35} />
            </mesh>
            {wheelZ.map((z) => (
              <mesh key={z} position={[side * wheelX, 0.3, z]}>
                <boxGeometry args={[0.03, 0.34, 0.03]} />
                <Mat color={C.frame} metal={0.7} rough={0.35} />
              </mesh>
            ))}
          </group>
        ))}
      </Part>

      {/* Warm Electronics Box */}
      <Part id="body">
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.95, 0.32, 1.05]} />
          <Mat color={C.body} rough={0.5} />
        </mesh>
        <mesh position={[0, 0.6, 0.53]}>
          <boxGeometry args={[0.9, 0.26, 0.02]} />
          <Mat color={C.foil} metal={0.8} rough={0.3} />
        </mesh>
        {/* Hazcams */}
        {[-0.15, 0.15].map((x) => (
          <mesh key={x} position={[x, 0.52, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.04, 12]} />
            <Mat color={C.lens} />
          </mesh>
        ))}
      </Part>

      {/* Solar arrays: deck + three wings */}
      <Part id="solar">
        <mesh position={[0, 0.78, -0.02]}>
          <boxGeometry args={[1.25, 0.03, 1.15]} />
          <Mat color={C.cell} metal={0.5} rough={0.25} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.98, 0.79, 0.05]} rotation={[0, 0, side * -0.06]}>
            <boxGeometry args={[0.72, 0.025, 0.9]} />
            <Mat color={C.cell} metal={0.5} rough={0.25} />
          </mesh>
        ))}
        <mesh position={[0, 0.79, -0.92]}>
          <boxGeometry args={[1.0, 0.025, 0.62]} />
          <Mat color={C.cell} metal={0.5} rough={0.25} />
        </mesh>
        {/* cell grid lines */}
        {[-0.4, 0, 0.4].map((z) => (
          <mesh key={z} position={[0, 0.797, z]}>
            <boxGeometry args={[2.6, 0.004, 0.01]} />
            <Mat color={C.frame} />
          </mesh>
        ))}
      </Part>

      {/* Pancam mast */}
      <Part id="mast">
        <mesh position={[0.32, 1.12, 0.38]}>
          <cylinderGeometry args={[0.035, 0.045, 0.66, 12]} />
          <Mat color={C.body} />
        </mesh>
        <mesh position={[0.32, 1.48, 0.38]}>
          <boxGeometry args={[0.36, 0.11, 0.12]} />
          <Mat color={C.body} rough={0.45} />
        </mesh>
        {[-0.12, 0.12, -0.04, 0.04].map((x, i) => (
          <mesh key={x} position={[0.32 + x, 1.48, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[i < 2 ? 0.032 : 0.02, i < 2 ? 0.032 : 0.02, 0.03, 16]} />
            <Mat color={C.lens} metal={0.3} rough={0.1} />
          </mesh>
        ))}
      </Part>

      {/* Robotic arm (IDD) */}
      <Part id="arm">
        <mesh position={[-0.2, 0.42, 0.62]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 10]} />
          <Mat color={C.frame} metal={0.7} rough={0.35} />
        </mesh>
        <mesh position={[0.05, 0.33, 0.78]} rotation={[0.9, 0, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.36, 10]} />
          <Mat color={C.frame} metal={0.7} rough={0.35} />
        </mesh>
        <mesh position={[0.05, 0.2, 0.95]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <Mat color={C.foil} metal={0.6} rough={0.35} />
        </mesh>
      </Part>
      <Part id="rat">
        <mesh position={[0.05, 0.09, 0.95]}>
          <cylinderGeometry args={[0.05, 0.05, 0.09, 16]} />
          <Mat color={C.dark} metal={0.6} rough={0.3} />
        </mesh>
      </Part>

      {/* High-gain antenna */}
      <Part id="hga">
        <mesh position={[-0.3, 0.9, -0.35]}>
          <cylinderGeometry args={[0.025, 0.025, 0.2, 8]} />
          <Mat color={C.frame} />
        </mesh>
        <mesh position={[-0.3, 1.02, -0.35]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.03, 32]} />
          <Mat color={C.body} metal={0.3} rough={0.4} />
        </mesh>
      </Part>

      {/* Low-gain antenna */}
      <Part id="lga">
        <mesh position={[-0.42, 1.05, -0.05]}>
          <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
          <Mat color={C.frame} />
        </mesh>
        <mesh position={[-0.42, 1.34, -0.05]}>
          <sphereGeometry args={[0.025, 10, 8]} />
          <Mat color={C.foil} />
        </mesh>
      </Part>
    </group>
  );
}

const LABEL_POS: Record<SpiritPartId, [number, number, number]> = {
  body: [0, 0.22, 0.6],
  solar: [1.2, 0.35, 0.2],
  mast: [0.32, 1.1, 0.4],
  wheels: [0.7, -0.35, 0.6],
  arm: [-0.1, -0.1, 0.8],
  rat: [0.05, -0.5, 1.0],
  hga: [-0.3, 0.62, -0.35],
  lga: [-0.42, 0.95, -0.05],
};

interface Props {
  selected: SpiritPartId | null;
  onSelect: (id: SpiritPartId | null) => void;
  onReady?: () => void;
}

export default function SpiritModel({ selected, onSelect, onReady }: Props) {
  const [hovered, setHovered] = useState<SpiritPartId | null>(null);
  const label = hovered ?? selected;
  return (
    <Canvas
      camera={{ position: [2.6, 1.6, 3.2], fov: 38 }}
      dpr={[1, 2]}
      onPointerMissed={() => onSelect(null)}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={[SCENE.space]} />
      <Stars radius={60} depth={30} count={2500} factor={3} fade speed={0.3} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={2.2} color="#fff0dc" />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color={SCENE.teal} />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={1.2} color={SCENE.marsGlow} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        <Lightformer intensity={0.8} color={SCENE.teal} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <Ctx.Provider value={{ selected, hovered, setHovered, onSelect: (id) => onSelect(id) }}>
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
          <Rover />
          {label && (
            <Html position={LABEL_POS[label]} center zIndexRange={[20, 0]}>
              <div className="pointer-events-none whitespace-nowrap rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-semibold text-primary-foreground shadow-glow">
                {SPIRIT_PART_BY_ID[label].name}
              </div>
            </Html>
          )}
        </Float>
      </Ctx.Provider>
      <ContactShadows position={[0, -1.1, 0]} opacity={0.35} scale={6} blur={2.6} far={2} color={SCENE.mars} />
      <OrbitControls makeDefault enablePan={false} minDistance={2} maxDistance={8} enableDamping />
      {onReady && <ReadySignal onReady={onReady} />}
    </Canvas>
  );
}
