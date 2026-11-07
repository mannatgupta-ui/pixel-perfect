import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Stars, Float, ContactShadows, Lightformer, Environment, Html } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";
import type { Artifact } from "@/data/types";
import { SCENE } from "./scene-colors";
import { ReadySignal } from "./ReadySignal";
import SpiritModel from "./SpiritModel";
import type { SpiritPartId } from "@/data/spirit";
import { useSensorMode, type SensorMode } from "./useSensorMode";

interface Props {
  artifact: Artifact;
  selectedPart?: string | null;
  sensorMode?: SensorMode;
  onSelectPart?: (part: string | null) => void;
  onReady?: () => void;
}

export default function MuseumHardwareModel({
  artifact,
  selectedPart,
  sensorMode = "optical",
  onSelectPart,
  onReady,
}: Props) {
  if (artifact.id === "spirit") {
    return (
      <SpiritModel
        selected={(selectedPart as SpiritPartId) ?? null}
        sensorMode={sensorMode}
        onSelect={(id) => onSelectPart?.(id)}
        {...(onReady ? { onReady } : {})}
      />
    );
  }

  return (
    <Canvas
      camera={{ position: [3, 2, 3.5], fov: 38 }}
      dpr={[1, 2]}
      onPointerMissed={() => onSelectPart?.(null)}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={[SCENE.space]} />
      <Stars radius={70} depth={35} count={2800} factor={3.5} fade speed={0.3} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={2.4} color="#fff2df" />
      <directionalLight position={[-5, 2, -4]} intensity={0.5} color={SCENE.teal} />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
        <Lightformer
          intensity={1.2}
          color={artifact.bodyId === "mars" ? SCENE.marsGlow : SCENE.gold}
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[20, 1, 1]}
        />
        <Lightformer intensity={0.8} color={SCENE.teal} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <GenericHardware
          artifact={artifact}
          selectedPart={selectedPart ?? null}
          sensorMode={sensorMode}
          {...(onSelectPart ? { onSelectPart } : {})}
        />
      </Float>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.4}
        scale={6}
        blur={2.4}
        far={2}
        color={artifact.bodyId === "mars" ? SCENE.mars : "#101628"}
      />
      <OrbitControls makeDefault enablePan={false} minDistance={1.8} maxDistance={9} enableDamping />
      {onReady && <ReadySignal onReady={onReady} />}
    </Canvas>
  );
}

function GenericHardware({
  artifact,
  selectedPart,
  sensorMode = "optical",
  onSelectPart,
}: {
  artifact: Artifact;
  selectedPart?: string | null;
  sensorMode?: SensorMode;
  onSelectPart?: (part: string | null) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const modelGroupRef = useRef<THREE.Group>(null);

  useSensorMode(modelGroupRef, sensorMode);

  const isChandrayaan = artifact.id === "chandrayaan-3";
  const isHuygens = artifact.id === "huygens";
  const isPhilae = artifact.id === "philae";
  const isDescentStage = artifact.kind === "descent-stage" && !isChandrayaan;
  const isProbe = artifact.kind === "deep-space-probe" && !isHuygens && !isPhilae;
  const isLander = artifact.kind === "lander" && !isChandrayaan && !isHuygens && !isPhilae;
  const isRover = artifact.kind === "rover";
  const isOrbiter = (artifact.kind === "orbiter" || artifact.kind === "atmospheric-probe") && !isHuygens;

  const active = hovered ?? selectedPart;

  const partProps = (name: string) => ({
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelectPart?.(name);
    },
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(name);
      document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      setHovered(null);
      document.body.style.cursor = "";
    },
  });

  return (
    <group ref={modelGroupRef} position={[0, -0.2, 0]}>
      {/* CHANDRAYAAN-3 (Vikram Lander & Pragyan Rover) */}
      {isChandrayaan && (
        <group>
          {/* Vikram Lander Main Body */}
          <mesh {...partProps("Vikram Lander Chassis & Avionics")}>
            <boxGeometry args={[1.3, 0.85, 1.3]} />
            <meshStandardMaterial
              color="#d97706"
              metalness={0.8}
              roughness={0.25}
              emissive={active === "Vikram Lander Chassis & Avionics" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "Vikram Lander Chassis & Avionics" ? 0.6 : 0}
            />
          </mesh>
          {/* Indian Tricolour Stripe Accent on Vikram */}
          <group position={[0, 0.44, 0.66]}>
            <mesh position={[0, 0.04, 0]}>
              <boxGeometry args={[0.5, 0.03, 0.02]} />
              <meshBasicMaterial color="#f97316" />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.5, 0.03, 0.02]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, -0.04, 0]}>
              <boxGeometry args={[0.5, 0.03, 0.02]} />
              <meshBasicMaterial color="#15803d" />
            </mesh>
          </group>
          {/* Side Solar Panels */}
          {[-0.68, 0.68].map((x) => (
            <mesh key={x} position={[x, 0, 0]} {...partProps("Lander Solar Power Arrays")}>
              <boxGeometry args={[0.04, 0.75, 1.15]} />
              <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.25} />
            </mesh>
          ))}
          {/* Four 800N Throttleable Engines */}
          {[-0.35, 0.35].map((x) =>
            [-0.35, 0.35].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, -0.6, z]} {...partProps("Throttleable Liquid Engines (800N)")}>
                <coneGeometry args={[0.14, 0.35, 16, 1, true]} />
                <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
              </mesh>
            ))
          )}
          {/* Four Cantilevered Landing Legs and Wide Footpads */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
            <group key={i} rotation={[0, angle, 0]} {...partProps("Landing Legs & Shock Absorbers")}>
              <mesh position={[0.95, -0.45, 0]} rotation={[0, 0, -0.6]}>
                <cylinderGeometry args={[0.035, 0.035, 1.4, 8]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} />
              </mesh>
              <mesh position={[1.4, -0.9, 0]}>
                <cylinderGeometry args={[0.22, 0.25, 0.05, 16]} />
                <meshStandardMaterial color="#64748b" metalness={0.7} />
              </mesh>
            </group>
          ))}
          {/* Pragyan Rover Deployment Ramp */}
          <mesh position={[0, -0.35, 1.1]} rotation={[0.45, 0, 0]} {...partProps("Pragyan Rollout Ramp")}>
            <boxGeometry args={[0.45, 0.03, 1.0]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.6} />
          </mesh>
          {/* Pragyan Rover (6-wheeled lunar explorer) */}
          <group position={[0, -0.75, 1.7]} {...partProps("Pragyan Rover (26 kg)")}>
            <mesh position={[0, 0.08, 0]}>
              <boxGeometry args={[0.34, 0.12, 0.42]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
            </mesh>
            {/* Pragyan Solar Panel tilted up */}
            <mesh position={[0, 0.18, -0.05]} rotation={[-0.35, 0, 0]}>
              <boxGeometry args={[0.32, 0.02, 0.38]} />
              <meshStandardMaterial color="#1e3a8a" metalness={0.7} />
            </mesh>
            {/* 6 tiny rover wheels */}
            {[-0.2, 0.2].map((wx) =>
              [-0.15, 0, 0.15].map((wz) => (
                <mesh key={`${wx}-${wz}`} position={[wx, 0.02, wz]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
                  <meshStandardMaterial color="#475569" metalness={0.8} />
                </mesh>
              ))
            )}
          </group>
          {/* ChaSTE Thermal Probe & ILSA */}
          <mesh position={[0.5, -0.15, 0.5]} {...partProps("ChaSTE Surface Thermal Probe")}>
            <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
            <meshStandardMaterial color="#e11d48" />
          </mesh>
        </group>
      )}

      {/* HUYGENS TITAN PROBE (ESA) */}
      {isHuygens && (
        <group>
          {/* Golden Beryllium Heat Shield (Aeroshell) */}
          <mesh position={[0, -0.2, 0]} rotation={[Math.PI, 0, 0]} {...partProps("Golden Front Heat Shield (Aeroshell)")}>
            <coneGeometry args={[1.35, 0.65, 32, 1, true]} />
            <meshStandardMaterial
              color="#eab308"
              metalness={0.85}
              roughness={0.2}
              side={THREE.DoubleSide}
              emissive={active === "Golden Front Heat Shield (Aeroshell)" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "Golden Front Heat Shield (Aeroshell)" ? 0.6 : 0}
            />
          </mesh>
          {/* Top Aluminum Instrument Cover */}
          <mesh position={[0, 0.25, 0]} {...partProps("Instrument Top Cover & Electronics")}>
            <cylinderGeometry args={[0.68, 0.88, 0.45, 32]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Parachute Release Bridle */}
          <mesh position={[0, 0.55, 0]} {...partProps("Descent Parachute Bridle")}>
            <torusGeometry args={[0.2, 0.03, 12, 24]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
          </mesh>
          {/* DISR Optical Window Ports */}
          <mesh position={[0.5, 0.25, 0.5]} rotation={[0, 0.8, 0]} {...partProps("DISR Camera Optical Windows")}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Surface Penetrometer Probe */}
          <mesh position={[0, -0.65, 0]} {...partProps("Surface Penetrometer Sensor")}>
            <coneGeometry args={[0.04, 0.35, 12]} />
            <meshStandardMaterial color="#f43f5e" metalness={0.9} />
          </mesh>
        </group>
      )}

      {/* PHILAE COMET LANDER (ESA) */}
      {isPhilae && (
        <group>
          {/* Carbon Fiber Main Chassis */}
          <mesh {...partProps("Carbon-Fiber Science Chassis")}>
            <boxGeometry args={[1.0, 0.95, 1.0]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.4}
              roughness={0.5}
              emissive={active === "Carbon-Fiber Science Chassis" ? SCENE.teal : "#000000"}
              emissiveIntensity={active === "Carbon-Fiber Science Chassis" ? 0.6 : 0}
            />
          </mesh>
          {/* Overhead Cold Gas Thruster Nozzle */}
          <mesh position={[0, 0.55, 0]} {...partProps("Cold-Gas Hold-Down Thruster")}>
            <coneGeometry args={[0.12, 0.2, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          {/* Solar Panel Surfaces */}
          {[-0.51, 0.51].map((x) => (
            <mesh key={x} position={[x, 0, 0]} {...partProps("Solar Cell Generator Walls")}>
              <boxGeometry args={[0.02, 0.85, 0.9]} />
              <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.2} />
            </mesh>
          ))}
          {/* Tripod Landing Gear with Ice Screws */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
            <group key={i} rotation={[0, angle, 0]} {...partProps("Tripod Landing Legs & Ice Screws")}>
              <mesh position={[0.85, -0.5, 0]} rotation={[0, 0, -0.55]}>
                <cylinderGeometry args={[0.03, 0.03, 1.3, 8]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
              </mesh>
              <mesh position={[1.25, -0.9, 0]}>
                <cylinderGeometry args={[0.18, 0.2, 0.05, 16]} />
                <meshStandardMaterial color="#64748b" metalness={0.7} />
              </mesh>
              {/* Ice screw drill */}
              <mesh position={[1.25, -0.98, 0]}>
                <coneGeometry args={[0.04, 0.12, 8]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
              </mesh>
            </group>
          ))}
          {/* CONSERT Antenna Boom & MUPUS Penetrator */}
          <mesh position={[0.4, 0.65, 0.4]} rotation={[0.4, 0, 0.4]} {...partProps("CONSERT Radar Antenna")}>
            <cylinderGeometry args={[0.015, 0.015, 0.9, 6]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} />
          </mesh>
        </group>
      )}

      {/* APOLLO DESCENT STAGE */}
      {isDescentStage && (
        <group>
          {/* Octagonal core with gold foil */}
          <mesh {...partProps("Descent Stage Body")}>
            <cylinderGeometry args={[1.1, 1.25, 0.75, 8]} />
            <meshStandardMaterial
              color="#e5a93b"
              metalness={0.8}
              roughness={0.25}
              emissive={active === "Descent Stage Body" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "Descent Stage Body" ? 0.6 : 0}
            />
          </mesh>
          {/* Descent Engine Bell */}
          <mesh position={[0, -0.65, 0]} {...partProps("Descent Engine Nozzle")}>
            <coneGeometry args={[0.5, 0.65, 24, 1, true]} />
            <meshStandardMaterial
              color="#2a2e38"
              metalness={0.7}
              roughness={0.3}
              side={THREE.DoubleSide}
              emissive={active === "Descent Engine Nozzle" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "Descent Engine Nozzle" ? 0.6 : 0}
            />
          </mesh>
          {/* 4 Landing Legs and Footpads */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
            <group key={i} rotation={[0, angle, 0]} {...partProps("Landing Gear & Footpads")}>
              <mesh position={[1.4, -0.5, 0]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.045, 0.045, 1.7, 8]} />
                <meshStandardMaterial color="#bfc4cb" metalness={0.8} roughness={0.3} />
              </mesh>
              <mesh position={[2.0, -1.0, 0]}>
                <cylinderGeometry args={[0.3, 0.35, 0.06, 16]} />
                <meshStandardMaterial color="#d4a34b" metalness={0.7} roughness={0.3} />
              </mesh>
            </group>
          ))}
          {/* Surface Experiment Bay */}
          <mesh position={[0.7, 0.1, 0.7]} {...partProps("MESA / Scientific Equipment Bay")}>
            <boxGeometry args={[0.45, 0.45, 0.45]} />
            <meshStandardMaterial color="#d8dede" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* DEEP SPACE PROBE (Voyager, Pioneer, New Horizons) */}
      {isProbe && (
        <group>
          {/* 3.7m High-Gain Parabolic Reflector Dish */}
          <mesh rotation={[0.4, 0, 0]} {...partProps("High-Gain Antenna Dish")}>
            <sphereGeometry args={[1.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3.2]} />
            <meshStandardMaterial
              color="#f4f4f2"
              roughness={0.3}
              metalness={0.2}
              side={THREE.DoubleSide}
              emissive={active === "High-Gain Antenna Dish" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "High-Gain Antenna Dish" ? 0.5 : 0}
            />
          </mesh>
          {/* Sub-reflector feed */}
          <mesh position={[0, 0.45, 0.75]} {...partProps("Antenna Sub-Reflector Feed")}>
            <coneGeometry args={[0.15, 0.3, 16]} />
            <meshStandardMaterial color="#303540" />
          </mesh>
          {/* 10-sided Equipment Bus */}
          <mesh position={[0, -0.4, -0.3]} {...partProps("Electronics Bus & Star Trackers")}>
            <cylinderGeometry args={[0.65, 0.65, 0.45, 10]} />
            <meshStandardMaterial
              color="#d99f38"
              metalness={0.85}
              roughness={0.25}
              emissive={active === "Electronics Bus & Star Trackers" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "Electronics Bus & Star Trackers" ? 0.5 : 0}
            />
          </mesh>
          {/* Magnetometer Boom */}
          <mesh position={[1.4, -0.4, -0.3]} rotation={[0, 0, Math.PI / 2]} {...partProps("Magnetometer Boom")}>
            <cylinderGeometry args={[0.02, 0.02, 1.8, 6]} />
            <meshStandardMaterial color="#a0a5ad" metalness={0.7} />
          </mesh>
          {/* Radioisotope Thermoelectric Generator (RTG) */}
          <mesh position={[-1.2, -0.4, -0.3]} rotation={[0, 0, Math.PI / 2]} {...partProps("RTG Nuclear Power Source")}>
            <cylinderGeometry args={[0.12, 0.12, 1.1, 12]} />
            <meshStandardMaterial color="#22252c" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* The Golden Record */}
          <mesh position={[0, -0.65, -0.3]} rotation={[Math.PI / 2, 0, 0]} {...partProps("The Golden Record")}>
            <cylinderGeometry args={[0.26, 0.26, 0.02, 32]} />
            <meshStandardMaterial
              color="#e6b830"
              metalness={0.95}
              roughness={0.15}
              emissive={active === "The Golden Record" ? SCENE.gold : "#000000"}
              emissiveIntensity={active === "The Golden Record" ? 0.8 : 0}
            />
          </mesh>
        </group>
      )}

      {/* PLANETARY LANDER (Viking, InSight, Phoenix) */}
      {isLander && (
        <group>
          {/* Lander Platform */}
          <mesh {...partProps("Lander Platform & Science Deck")}>
            <cylinderGeometry args={[0.9, 1.05, 0.4, 6]} />
            <meshStandardMaterial
              color="#e2ded4"
              roughness={0.5}
              metalness={0.3}
              emissive={active === "Lander Platform & Science Deck" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "Lander Platform & Science Deck" ? 0.6 : 0}
            />
          </mesh>
          {/* Circular / Winged Solar Arrays */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 1.5, 0.1, 0]} rotation={[0, 0, s * -0.05]} {...partProps("Ultraflex Solar Arrays")}>
              <cylinderGeometry args={[0.65, 0.65, 0.025, 24]} />
              <meshStandardMaterial
                color="#1a2e56"
                metalness={0.6}
                roughness={0.3}
                emissive={active === "Ultraflex Solar Arrays" ? SCENE.teal : "#000000"}
                emissiveIntensity={active === "Ultraflex Solar Arrays" ? 0.5 : 0}
              />
            </mesh>
          ))}
          {/* 3 Landing Tripod Legs */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((a, i) => (
            <group key={i} rotation={[0, a, 0]} {...partProps("Tripod Landing Legs")}>
              <mesh position={[1.1, -0.4, 0]} rotation={[0, 0, -0.6]}>
                <cylinderGeometry args={[0.035, 0.035, 1.2, 8]} />
                <meshStandardMaterial color="#949aa3" metalness={0.8} />
              </mesh>
              <mesh position={[1.5, -0.85, 0]}>
                <cylinderGeometry args={[0.22, 0.25, 0.05, 16]} />
                <meshStandardMaterial color="#b0b5be" metalness={0.7} />
              </mesh>
            </group>
          ))}
          {/* Robotic Arm / Surface Seismometer */}
          <mesh position={[0.4, 0.45, 0.4]} rotation={[0.4, 0.3, 0]} {...partProps("Robotic Arm & Seismometer")}>
            <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
            <meshStandardMaterial color="#c0c5cc" metalness={0.8} />
          </mesh>
          <mesh position={[0.7, 0.3, 0.7]} {...partProps("Seismometer Dome")}>
            <sphereGeometry args={[0.18, 16, 12]} />
            <meshStandardMaterial color="#c49b38" metalness={0.7} />
          </mesh>
        </group>
      )}

      {/* OTHER ROVER (Opportunity, Curiosity, Perseverance, Sojourner) */}
      {(isRover || (!isDescentStage && !isProbe && !isLander && !isOrbiter)) && (
        <group>
          {/* Body */}
          <mesh position={[0, 0.25, 0]} {...partProps("Rover Chassis")}>
            <boxGeometry args={[1.1, 0.45, 1.3]} />
            <meshStandardMaterial
              color="#e6ded2"
              roughness={0.5}
              metalness={0.3}
              emissive={active === "Rover Chassis" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "Rover Chassis" ? 0.6 : 0}
            />
          </mesh>
          {/* Solar / RTG power deck */}
          <mesh position={[0, 0.5, -0.1]} {...partProps("Power Generation Deck")}>
            <boxGeometry args={[1.3, 0.03, 1.2]} />
            <meshStandardMaterial
              color="#1a2f58"
              metalness={0.5}
              roughness={0.3}
              emissive={active === "Power Generation Deck" ? SCENE.teal : "#000000"}
              emissiveIntensity={active === "Power Generation Deck" ? 0.5 : 0}
            />
          </mesh>
          {/* Camera Mast */}
          <mesh position={[0.35, 0.9, 0.4]} {...partProps("Remote Sensing Mast")}>
            <cylinderGeometry args={[0.04, 0.04, 0.75, 12]} />
            <meshStandardMaterial color="#949aa3" />
          </mesh>
          <mesh position={[0.35, 1.25, 0.4]} {...partProps("Remote Sensing Mast")}>
            <boxGeometry args={[0.35, 0.12, 0.14]} />
            <meshStandardMaterial color="#303540" />
          </mesh>
          {/* 6 Wheels */}
          {[-0.65, 0.65].map((x) =>
            [-0.5, 0, 0.5].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, -0.25, z]} rotation={[0, 0, Math.PI / 2]} {...partProps("All-Terrain Wheels")}>
                <cylinderGeometry args={[0.15, 0.15, 0.13, 20]} />
                <meshStandardMaterial color="#b4b9bf" metalness={0.6} roughness={0.4} />
              </mesh>
            )),
          )}
          {/* Arm */}
          <mesh position={[-0.3, 0.1, 0.7]} rotation={[0.8, 0, 0]} {...partProps("Robotic Science Arm")}>
            <cylinderGeometry args={[0.03, 0.03, 0.55, 8]} />
            <meshStandardMaterial color="#888e99" metalness={0.8} />
          </mesh>
        </group>
      )}

      {/* ORBITER (Cassini, Galileo, Magellan, MESSENGER) */}
      {isOrbiter && (
        <group>
          {/* Core Central Bus */}
          <mesh {...partProps("Spacecraft Central Bus")}>
            <cylinderGeometry args={[0.8, 0.8, 1.4, 12]} />
            <meshStandardMaterial
              color="#d99f36"
              metalness={0.85}
              roughness={0.25}
              emissive={active === "Spacecraft Central Bus" ? SCENE.mars : "#000000"}
              emissiveIntensity={active === "Spacecraft Central Bus" ? 0.6 : 0}
            />
          </mesh>
          {/* High-Gain Antenna Dish */}
          <mesh position={[0, 0.9, 0]} rotation={[-Math.PI / 2, 0, 0]} {...partProps("High-Gain Antenna Dish")}>
            <sphereGeometry args={[1.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3.4]} />
            <meshStandardMaterial
              color="#f4f5f0"
              roughness={0.3}
              metalness={0.2}
              side={THREE.DoubleSide}
              emissive={active === "High-Gain Antenna Dish" ? SCENE.gold : "#000000"}
              emissiveIntensity={active === "High-Gain Antenna Dish" ? 0.6 : 0}
            />
          </mesh>
          {/* Main Rocket Propulsion Bell */}
          <mesh position={[0, -0.9, 0]} rotation={[Math.PI, 0, 0]} {...partProps("Rocket Propulsion Bell")}>
            <coneGeometry args={[0.4, 0.6, 24, 1, true]} />
            <meshStandardMaterial color="#2a2e38" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* Magnetometer / Science Booms */}
          <mesh position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} {...partProps("Magnetometer Boom")}>
            <cylinderGeometry args={[0.02, 0.02, 1.6, 6]} />
            <meshStandardMaterial color="#a0a5ad" metalness={0.8} />
          </mesh>
          <mesh position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} {...partProps("Planetary Instrument Boom")}>
            <cylinderGeometry args={[0.02, 0.02, 1.6, 6]} />
            <meshStandardMaterial color="#a0a5ad" metalness={0.8} />
          </mesh>
        </group>
      )}

      {/* Floating Active Component Label */}
      {active && (
        <Html position={[0, 1.35, 0]} center zIndexRange={[20, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-semibold text-primary-foreground shadow-glow">
            {active}
          </div>
        </Html>
      )}
    </group>
  );
}
