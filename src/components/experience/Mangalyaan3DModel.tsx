import { useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { SpacecraftComponentInfo } from "./types";

interface Mangalyaan3DModelProps {
  selectedComponentId: string | null;
  onSelectComponent: (component: SpacecraftComponentInfo) => void;
  components: SpacecraftComponentInfo[];
  isEngineFiring?: boolean;
  isEclipse?: boolean;
  cameraMode?: "first_person" | "chase" | "free";
}

export function Mangalyaan3DModel({
  selectedComponentId,
  onSelectComponent,
  components,
  isEngineFiring = false,
  isEclipse = false,
  cameraMode = "chase",
}: Mangalyaan3DModelProps) {
  const modelGroupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const solarWingRef = useRef<THREE.Group>(null);
  const hgaDishRef = useRef<THREE.Group>(null);

  // Subtle spacecraft attitude micro-motion when in deep space
  useFrame((state, delta) => {
    if (modelGroupRef.current && cameraMode !== "first_person") {
      modelGroupRef.current.rotation.y += delta * 0.04;
    }
    // Animate engine flame jitter when firing
    if (flameRef.current && isEngineFiring) {
      flameRef.current.scale.y = 1.0 + Math.sin(state.clock.elapsedTime * 35) * 0.25;
      flameRef.current.scale.x = 1.0 + Math.cos(state.clock.elapsedTime * 28) * 0.15;
    }
    // Subtle sun-tracking oscillation for solar wing
    if (solarWingRef.current && !isEclipse) {
      solarWingRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const getComponent = (id: string) => components.find((c) => c.id === id);

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  const handlePartClick = (id: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const comp = getComponent(id);
    if (comp) onSelectComponent(comp);
  };

  const isSel = (id: string) => selectedComponentId === id;

  // Gold Kapton MLI thermal blanket material parameters
  const mliGoldProps = {
    color: isEclipse ? "#543e18" : "#eab308",
    metalness: 0.88,
    roughness: 0.28,
  };

  const carbonProps = {
    color: "#1c1f26",
    metalness: 0.3,
    roughness: 0.7,
  };

  const titaniumProps = {
    color: "#a1a1aa",
    metalness: 0.8,
    roughness: 0.25,
  };

  return (
    <group ref={modelGroupRef} position={[0, 0, 0]}>
      {/* ──────────────────────────────────────────────────────────
          1. CENTRAL SPACECRAFT BUS (Modified I-1K Cuboid Bus)
          ────────────────────────────────────────────────────────── */}
      <group onClick={handlePartClick("central-bus")} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        {/* Main 1.5m Core Cuboid Bus wrapped in Kapton MLI */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial
            {...mliGoldProps}
            emissive={isSel("central-bus") ? "#f59e0b" : "#000000"}
            emissiveIntensity={isSel("central-bus") ? 0.6 : 0}
          />
        </mesh>

        {/* Optical Solar Reflector (OSR) Radiator Plates on Side Faces */}
        {[-0.76, 0.76].map((x) => (
          <mesh key={`osr-${x}`} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.9, 1.2]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}

        {/* Top & Bottom Equipment Decks (Carbon Composite) */}
        <mesh position={[0, 0.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.48, 1.48]} />
          <meshStandardMaterial {...carbonProps} />
        </mesh>
        <mesh position={[0, -0.76, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.48, 1.48]} />
          <meshStandardMaterial {...carbonProps} />
        </mesh>

        {/* Indian Tricolour Pride Flag Insignia on Forward Deck */}
        <group position={[0, 0.5, 0.765]}>
          <mesh position={[0, 0.06, 0]}>
            <planeGeometry args={[0.42, 0.04]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <planeGeometry args={[0.42, 0.04]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, -0.02, 0]}>
            <planeGeometry args={[0.42, 0.04]} />
            <meshBasicMaterial color="#16a34a" />
          </mesh>
          {/* Ashoka Chakra Blue Dot */}
          <mesh position={[0, 0.02, 0.001]}>
            <circleGeometry args={[0.015, 16]} />
            <meshBasicMaterial color="#1e3a8a" />
          </mesh>
        </group>

        {/* ISRO Typography Plate */}
        <group position={[0, 0.35, 0.765]}>
          <mesh>
            <planeGeometry args={[0.35, 0.08]} />
            <meshStandardMaterial color="#090d16" />
          </mesh>
        </group>

        {isSel("central-bus") && (
          <Html position={[0, 0, 0.9]} center>
            <div className="pointer-events-none rounded-md bg-amber-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-black shadow-lg">
              I-1K Bus & Gold MLI Blanket
            </div>
          </Html>
        )}
      </group>

      {/* ──────────────────────────────────────────────────────────
          2. 440N LIQUID APOGEE MOTOR (LAM) & THRUST PLUME
          ────────────────────────────────────────────────────────── */}
      <group
        position={[0, -0.75, 0]}
        onClick={handlePartClick("lam-engine")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Engine Mounting Gimbal & Heat Shield Collar */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.16, 24]} />
          <meshStandardMaterial {...titaniumProps} />
        </mesh>

        {/* Niobium Alloy Expansion Bell (440N Thrust) */}
        <mesh position={[0, -0.4, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.38, 0.65, 32, 1, true]} />
          <meshStandardMaterial
            color="#27272a"
            metalness={0.8}
            roughness={0.3}
            side={THREE.DoubleSide}
            emissive={isSel("lam-engine") ? "#f97316" : isEngineFiring ? "#ff5500" : "#000000"}
            emissiveIntensity={isSel("lam-engine") ? 0.6 : isEngineFiring ? 0.9 : 0}
          />
        </mesh>

        {/* Hypergolic Combustion Chamber Throat Glow */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.15, 24]} />
          <meshBasicMaterial color={isEngineFiring ? "#ffedd5" : "#e4e4e7"} />
        </mesh>

        {/* Reactive Hypergolic Exhaust Plume (Orange-Blue Thrust Cone) */}
        {isEngineFiring && (
          <group ref={flameRef} position={[0, -0.85, 0]}>
            {/* Core bright white-blue flame */}
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.22, 1.4, 24, 1, true]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.85} side={THREE.DoubleSide} />
            </mesh>
            {/* Outer violent hypergolic flame sheath */}
            <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.2, 0]}>
              <coneGeometry args={[0.42, 2.2, 24, 1, true]} />
              <meshBasicMaterial color="#f97316" transparent opacity={0.65} side={THREE.DoubleSide} />
            </mesh>
            <pointLight position={[0, -0.5, 0]} intensity={4.5} distance={8} color="#f97316" />
          </group>
        )}

        {isSel("lam-engine") && (
          <Html position={[0, -0.6, 0.5]} center>
            <div className="pointer-events-none rounded-md bg-orange-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-black shadow-lg">
              440N Liquid Apogee Motor (LAM)
            </div>
          </Html>
        )}
      </group>

      {/* ──────────────────────────────────────────────────────────
          3. 3-PANEL GALLIUM ARSENIDE SOLAR ARRAY WING
          ────────────────────────────────────────────────────────── */}
      <group
        ref={solarWingRef}
        position={[-0.75, 0, 0]}
        onClick={handlePartClick("solar-arrays")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Drive Yoke & Gimbal Hub */}
        <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 16]} />
          <meshStandardMaterial {...titaniumProps} />
        </mesh>

        {/* Three Hinged Panels (1.8m × 1.4m scale) */}
        {[-0.85, -1.85, -2.85].map((xOffset, i) => (
          <group key={`panel-${i}`} position={[xOffset, 0, 0]}>
            {/* Substrate Frame */}
            <mesh>
              <boxGeometry args={[0.9, 1.4, 0.03]} />
              <meshStandardMaterial
                color="#0f172a"
                roughness={0.4}
                metalness={0.6}
                emissive={isSel("solar-arrays") ? "#38bdf8" : "#000000"}
                emissiveIntensity={isSel("solar-arrays") ? 0.5 : 0}
              />
            </mesh>
            {/* Deep Indigo/Blue Gallium Arsenide Photovoltaic Cells */}
            <mesh position={[0, 0, 0.018]}>
              <planeGeometry args={[0.84, 1.34]} />
              <meshStandardMaterial
                color={isEclipse ? "#030712" : "#1e3a8a"}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Gold Panel-to-Panel Hinges */}
            {[-0.5, 0.5].map((y) => (
              <mesh key={`hinge-${y}`} position={[0.45, y, 0]}>
                <boxGeometry args={[0.06, 0.08, 0.05]} />
                <meshStandardMaterial color="#d97706" metalness={0.9} />
              </mesh>
            ))}
          </group>
        ))}

        {isSel("solar-arrays") && (
          <Html position={[-1.85, 0.8, 0]} center>
            <div className="pointer-events-none rounded-md bg-sky-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-black shadow-lg">
              840W Gallium-Arsenide Solar Wing
            </div>
          </Html>
        )}
      </group>

      {/* ──────────────────────────────────────────────────────────
          4. 2.2-METER HIGH-GAIN ANTENNA (HGA)
          ────────────────────────────────────────────────────────── */}
      <group
        ref={hgaDishRef}
        position={[0, 0.75, 0]}
        onClick={handlePartClick("hga-antenna")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Dual-Axis Gimbal Platform & Mast */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.3, 16]} />
          <meshStandardMaterial {...titaniumProps} />
        </mesh>

        {/* 2.2m Parabolic Dish Reflector */}
        <group position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <sphereGeometry args={[1.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3.2]} />
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.25}
              metalness={0.3}
              side={THREE.DoubleSide}
              emissive={isSel("hga-antenna") ? "#38bdf8" : "#000000"}
              emissiveIntensity={isSel("hga-antenna") ? 0.6 : 0}
            />
          </mesh>
          {/* Gold Antenna Back-Struts */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
            <group key={`strut-${i}`} rotation={[0, 0, angle]}>
              <mesh position={[0.45, 0, -0.15]} rotation={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
                <meshStandardMaterial color="#d97706" metalness={0.8} />
              </mesh>
            </group>
          ))}
          {/* Sub-Reflector Feed Horn Assembly */}
          <mesh position={[0, 0, 0.65]}>
            <coneGeometry args={[0.12, 0.22, 16]} />
            <meshStandardMaterial color="#18181b" metalness={0.8} />
          </mesh>
        </group>

        {isSel("hga-antenna") && (
          <Html position={[0, 1.2, 0.3]} center>
            <div className="pointer-events-none rounded-md bg-teal/95 px-2.5 py-1 font-mono text-[11px] font-bold text-black shadow-lg">
              2.2m High-Gain X-Band Dish (HGA)
            </div>
          </Html>
        )}
      </group>

      {/* ──────────────────────────────────────────────────────────
          5. REACTION CONTROL SYSTEM (8 × 22N RCS THRUSTERS)
          ────────────────────────────────────────────────────────── */}
      <group onClick={handlePartClick("rcs-thrusters")} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        {[-0.72, 0.72].map((x) =>
          [-0.72, 0.72].map((z) => (
            <group key={`rcs-${x}-${z}`} position={[x, -0.65, z]}>
              {/* Thruster Bracket */}
              <mesh>
                <boxGeometry args={[0.08, 0.08, 0.08]} />
                <meshStandardMaterial {...titaniumProps} />
              </mesh>
              {/* Dual Nozzles */}
              <mesh position={[0.04 * Math.sign(x), -0.06, 0]} rotation={[0, 0, 0.4 * Math.sign(x)]}>
                <coneGeometry args={[0.035, 0.08, 12, 1, true]} />
                <meshStandardMaterial
                  color="#3f3f46"
                  metalness={0.8}
                  side={THREE.DoubleSide}
                  emissive={isSel("rcs-thrusters") ? "#f59e0b" : "#000000"}
                  emissiveIntensity={isSel("rcs-thrusters") ? 0.7 : 0}
                />
              </mesh>
            </group>
          ))
        )}

        {isSel("rcs-thrusters") && (
          <Html position={[0.75, -0.65, 0.75]} center>
            <div className="pointer-events-none rounded-md bg-amber-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-black shadow-lg">
              Eight 22N RCS Thrusters
            </div>
          </Html>
        )}
      </group>

      {/* ──────────────────────────────────────────────────────────
          6. INDIGENOUS SCIENTIFIC PAYLOADS (NADIR & SIDE DECKS)
          ────────────────────────────────────────────────────────── */}

      {/* A. MARS COLOUR CAMERA (MCC) */}
      <group
        position={[0.55, -0.2, 0.76]}
        onClick={handlePartClick("mcc-camera")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Camera Optical Lens Barrel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.18, 24]} />
          <meshStandardMaterial
            color="#09090b"
            metalness={0.9}
            roughness={0.15}
            emissive={isSel("mcc-camera") ? "#ef4444" : "#000000"}
            emissiveIntensity={isSel("mcc-camera") ? 0.6 : 0}
          />
        </mesh>
        {/* Front Lens Glass Element with Anti-Reflective Coating */}
        <mesh position={[0, 0, 0.095]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.075, 24]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transmission={0.9}
            roughness={0.05}
            metalness={0.1}
            ior={1.52}
          />
        </mesh>
        {isSel("mcc-camera") && (
          <Html position={[0, 0.2, 0.1]} center>
            <div className="pointer-events-none rounded-md bg-red-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-white shadow-lg">
              Mars Colour Camera (MCC)
            </div>
          </Html>
        )}
      </group>

      {/* B. LYMAN ALPHA PHOTOMETER (LAP) */}
      <group
        position={[0.55, 0.25, 0.76]}
        onClick={handlePartClick("lap-photometer")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.16, 16]} />
          <meshStandardMaterial
            color="#e4e4e7"
            metalness={0.7}
            roughness={0.3}
            emissive={isSel("lap-photometer") ? "#a855f7" : "#000000"}
            emissiveIntensity={isSel("lap-photometer") ? 0.6 : 0}
          />
        </mesh>
        {isSel("lap-photometer") && (
          <Html position={[0, 0.18, 0.1]} center>
            <div className="pointer-events-none rounded-md bg-purple-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-white shadow-lg">
              Lyman Alpha Photometer (LAP)
            </div>
          </Html>
        )}
      </group>

      {/* C. METHANE SENSOR FOR MARS (MSM) */}
      <group
        position={[-0.55, -0.2, 0.76]}
        onClick={handlePartClick("msm-sensor")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <boxGeometry args={[0.14, 0.12, 0.12]} />
          <meshStandardMaterial
            color="#27272a"
            metalness={0.8}
            emissive={isSel("msm-sensor") ? "#10b981" : "#000000"}
            emissiveIntensity={isSel("msm-sensor") ? 0.6 : 0}
          />
        </mesh>
        {/* Gold optical filter aperture */}
        <mesh position={[0, 0, 0.065]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#eab308" metalness={0.95} />
        </mesh>
        {isSel("msm-sensor") && (
          <Html position={[0, 0.18, 0.1]} center>
            <div className="pointer-events-none rounded-md bg-emerald-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-black shadow-lg">
              Methane Sensor for Mars (MSM)
            </div>
          </Html>
        )}
      </group>

      {/* D. THERMAL INFRARED IMAGING SPECTROMETER (TIS) */}
      <group
        position={[-0.55, 0.25, 0.76]}
        onClick={handlePartClick("tis-spectrometer")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <boxGeometry args={[0.13, 0.13, 0.14]} />
          <meshStandardMaterial
            color="#3f3f46"
            metalness={0.6}
            emissive={isSel("tis-spectrometer") ? "#f97316" : "#000000"}
            emissiveIntensity={isSel("tis-spectrometer") ? 0.6 : 0}
          />
        </mesh>
        {isSel("tis-spectrometer") && (
          <Html position={[0, 0.18, 0.1]} center>
            <div className="pointer-events-none rounded-md bg-amber-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-black shadow-lg">
              Thermal IR Spectrometer (TIS)
            </div>
          </Html>
        )}
      </group>

      {/* E. MENCA EXOSPHERIC COMPOSITION ANALYSER */}
      <group
        position={[0, 0.45, 0.76]}
        onClick={handlePartClick("menca-analyzer")}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.18, 16]} />
          <meshStandardMaterial
            color="#d4d4d8"
            metalness={0.8}
            emissive={isSel("menca-analyzer") ? "#38bdf8" : "#000000"}
            emissiveIntensity={isSel("menca-analyzer") ? 0.6 : 0}
          />
        </mesh>
        {isSel("menca-analyzer") && (
          <Html position={[0, 0.18, 0.1]} center>
            <div className="pointer-events-none rounded-md bg-sky-500/95 px-2.5 py-1 font-mono text-[11px] font-bold text-black shadow-lg">
              MENCA Mass Spectrometer
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
