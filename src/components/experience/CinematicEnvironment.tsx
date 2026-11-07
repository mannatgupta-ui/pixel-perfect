import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { PlanetarySurfaceEnvironment } from "@/components/three/PlanetarySurfaceEnvironment";
import type { Artifact } from "@/data/types";

interface CinematicEnvironmentProps {
  type:
    | "cleanroom"
    | "launch"
    | "earth_orbit"
    | "cruise"
    | "approach"
    | "insertion"
    | "science_orbit"
    | "eclipse"
    | "descent"
    | "landing"
    | "surface";
  agency?: string | undefined;
  targetBody?: string | undefined;
  spacecraftName?: string | undefined;
  artifact?: Artifact | undefined;
}

export function CinematicEnvironment({
  type,
  agency = "NASA",
  targetBody = "mars",
  spacecraftName = "Spacecraft",
  artifact,
}: CinematicEnvironmentProps) {
  // If the stage is surface operations, landing, or grounded conclusion, render the authentic planet environment!
  if ((type === "surface" || type === "landing") && artifact) {
    return (
      <group>
        <PlanetarySurfaceEnvironment artifact={artifact} />
        {/* Additional landing dynamics if landing */}
        {type === "landing" && <LandingThrusterDust targetBody={targetBody} />}
      </group>
    );
  }

  return (
    <>
      {type === "cleanroom" && <EnclosedCleanroomLaboratory agency={agency} spacecraftName={spacecraftName} />}
      {type === "launch" && <EnclosedMissionControlRoom agency={agency} spacecraftName={spacecraftName} />}
      {type === "earth_orbit" && <EarthOrbitEnvironment />}
      {type === "cruise" && <InterplanetarySpaceEnvironment targetBody={targetBody} />}
      {type === "approach" && <PlanetaryApproachSpaceEnvironment targetBody={targetBody} />}
      {type === "insertion" && <OrbitInsertionSpaceEnvironment targetBody={targetBody} />}
      {type === "science_orbit" && <ScienceOrbitSpaceEnvironment targetBody={targetBody} />}
      {type === "descent" && <AtmosphericDescentEnvironment targetBody={targetBody} artifact={artifact} />}
      {type === "landing" && <LandingFallbackEnvironment targetBody={targetBody} />}
      {type === "surface" && <SurfaceFallbackEnvironment targetBody={targetBody} />}
      {type === "eclipse" && <SilentSpaceEnvironment targetBody={targetBody} />}
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   1. FULLY ENCLOSED 3D CLEANROOM LABORATORY WITH SCIENTISTS
   ──────────────────────────────────────────────────────────────── */

function EnclosedCleanroomLaboratory({ agency, spacecraftName }: { agency: string; spacecraftName: string }) {
  const isIsro = agency.toUpperCase().includes("ISRO");
  const isEsa = agency.toUpperCase().includes("ESA");
  const facilityName = isIsro
    ? "ISRO SATELLITE INTEGRATION & TESTING ESTABLISHMENT (ISITE) · BENGALURU"
    : isEsa
    ? "ESA EUROPEAN SPACE RESEARCH & TECHNOLOGY CENTRE (ESTEC) · NOORDWIJK"
    : "NASA JPL SPACECRAFT ASSEMBLY FACILITY (SAF) · HIGH BAY 1";

  const agencyLogo = isIsro ? "ISRO" : isEsa ? "ESA" : "NASA";

  return (
    <group>
      {/* Soft, even, clinical cleanroom overhead illumination */}
      <color attach="background" args={["#0c1222"]} />
      <ambientLight intensity={1.4} color="#f0f9ff" />
      <directionalLight position={[0, 4.5, 0]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[-5, 3, -4]} intensity={1.6} color="#93c5fd" />
      <directionalLight position={[5, 3, 4]} intensity={1.6} color="#fed7aa" />

      {/* ──────────────────────────────────────────────────────────
          ENCLOSED LABORATORY ROOM (6 SIDES: FLOOR, CEILING, 4 WALLS)
          Room Dimensions: Width 15m (X: ±7.5), Depth 14m (Z: ±7.0), Height 7m
          ────────────────────────────────────────────────────────── */}

      {/* 1. FLOOR (High-Gloss White/Navy Cleanroom Epoxy with Grid) */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 14]} />
        <meshStandardMaterial color="#0b1329" roughness={0.12} metalness={0.7} />
      </mesh>
      <gridHelper args={[14, 14, "#38bdf8", "#1e293b"]} position={[0, -2.19, 0]} />

      {/* Yellow/Black Striped Safety Perimeter Zone on Floor */}
      <mesh position={[0, -2.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.7, 32]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>

      {/* 2. CEILING (Enclosed Cleanroom Ceiling Grid with Recessed Fluorescent Panels) */}
      <mesh position={[0, 4.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 14]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Recessed Light Panels on Ceiling */}
      {[-4.5, 0, 4.5].map((x) =>
        [-4, 0, 4].map((z) => (
          <group key={`light-${x}-${z}`} position={[x, 4.78, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[2.0, 1.0]} />
              <meshBasicMaterial color="#f8fafc" />
            </mesh>
            <pointLight intensity={0.6} distance={6} color="#ffffff" />
          </group>
        ))
      )}

      {/* Heavy Yellow Industrial Crane Bridge Rails suspended from ceiling */}
      <group position={[0, 4.0, 0]}>
        {[-4, 0, 4].map((z) => (
          <mesh key={`crane-beam-${z}`} position={[0, 0, z]}>
            <boxGeometry args={[14.5, 0.35, 0.35]} />
            <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
        {/* Overhead Hoist Carriage */}
        <mesh position={[-1.5, -0.3, 0]}>
          <boxGeometry args={[2.2, 0.5, 1.6]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
        <mesh position={[-1.5, -1.8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3.0, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* 3. NORTH WALL (Front Wall at Z = -7.0) */}
      <group position={[0, 1.3, -7.0]}>
        <mesh>
          <planeGeometry args={[15, 7.0]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* Large Digital LED Facility Screen on North Wall */}
        <group position={[0, 1.2, 0.05]}>
          <mesh>
            <planeGeometry args={[10.5, 2.4]} />
            <meshStandardMaterial color="#030712" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[10.8, 2.7]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          {/* Luminous Facility Status Displays */}
          <group position={[0, 0, 0.02]}>
            {[-3.6, -1.2, 1.2, 3.6].map((px, idx) => (
              <mesh key={`panel-${idx}`} position={[px, 0, 0]}>
                <planeGeometry args={[2.2, 1.8]} />
                <meshBasicMaterial color={idx % 2 === 0 ? "#0284c7" : "#047857"} transparent opacity={0.3} />
              </mesh>
            ))}
            {/* Header Accent Strip */}
            <mesh position={[0, 0.95, 0.01]}>
              <planeGeometry args={[10.2, 0.15]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>
        </group>

        {/* Stainless Steel HEPA Air Filter Bank along bottom of North Wall */}
        {[-5.5, -2.2, 1.1, 4.4].map((x) => (
          <mesh key={`hepa-${x}`} position={[x, -2.0, 0.1]}>
            <boxGeometry args={[2.8, 2.2, 0.2]} />
            <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* 4. SOUTH WALL (Back Wall at Z = +7.0 with Airlock Doors & Observation Windows) */}
      <group position={[0, 1.3, 7.0]} rotation={[0, Math.PI, 0]}>
        <mesh>
          <planeGeometry args={[15, 7.0]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* Double Air-Shower Airlock Entry Doors */}
        <group position={[0, -0.8, 0.05]}>
          <mesh position={[-1.1, 0, 0]}>
            <boxGeometry args={[1.9, 3.8, 0.1]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[1.1, 0, 0]}>
            <boxGeometry args={[1.9, 3.8, 0.1]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>
          {[-1.1, 1.1].map((x) => (
            <mesh key={`porthole-${x}`} position={[x, 0.6, 0.06]}>
              <circleGeometry args={[0.25, 24]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
            </mesh>
          ))}
          {/* Illuminated Airlock Sign */}
          <group position={[0, 2.2, 0.1]}>
            <mesh>
              <boxGeometry args={[2.2, 0.4, 0.1]} />
              <meshStandardMaterial color="#065f46" />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[2.0, 0.3]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        </group>

        {/* Visitor Gallery Observation Glass Windows */}
        {[-4.8, 4.8].map((x) => (
          <group key={`obs-${x}`} position={[x, 0.6, 0.05]}>
            <mesh>
              <boxGeometry args={[3.8, 2.2, 0.1]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[3.5, 1.9]} />
              <meshBasicMaterial color="#0284c7" transparent opacity={0.25} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5. WEST WALL (Left Wall at X = -7.5 with Server Racks) */}
      <group position={[-7.5, 1.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[14, 7.0]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* 19-Inch Telemetry & Diagnostic Computer Server Racks */}
        {[-4.5, -1.8, 0.9, 3.6].map((z, i) => (
          <group key={`rack-${i}`} position={[z, -0.6, 0.4]}>
            <mesh>
              <boxGeometry args={[1.6, 3.6, 0.7]} />
              <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
            </mesh>
            {[-1.0, -0.4, 0.2, 0.8].map((y, idx) => (
              <mesh key={`led-${idx}`} position={[0.5, y, 0.36]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color={idx % 2 === 0 ? "#10b981" : "#38bdf8"} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 6. EAST WALL (Right Wall at X = +7.5 with Workbenches) */}
      <group position={[7.5, 1.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[14, 7.0]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* Anti-Static Stainless Steel Workbenches */}
        {[-3.5, 1.5].map((z, i) => (
          <group key={`bench-${i}`} position={[z, -1.2, 0.5]}>
            <mesh position={[0, 0.6, 0]}>
              <boxGeometry args={[3.0, 0.1, 1.0]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            {[-1.3, 1.3].map((x) => (
              <mesh key={`leg-${x}`} position={[x, 0.25, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} />
              </mesh>
            ))}
            {/* Oscilloscope on bench */}
            <mesh position={[-0.6, 0.85, 0]}>
              <boxGeometry args={[0.65, 0.4, 0.5]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            <mesh position={[-0.6, 0.85, 0.26]}>
              <planeGeometry args={[0.5, 0.28]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ──────────────────────────────────────────────────────────
          3D SCIENTISTS & CENTRAL INTEGRATION PEDESTAL
          ────────────────────────────────────────────────────────── */}
      <CleanroomScientist position={[-2.0, -2.2, 1.2]} rotationY={0.6} pose="tablet" label="Lead Systems Engineer" />
      <CleanroomScientist position={[2.0, -2.2, 1.0]} rotationY={-0.8} pose="inspecting" label="Payload Integration Specialist" />
      <CleanroomScientist position={[0, -2.2, 2.2]} rotationY={Math.PI} pose="monitoring" label="Avionics & Telemetry QA" />
      <CleanroomScientist position={[-1.8, -2.2, -1.8]} rotationY={0.2} pose="inspecting" label="Thermal MLI Engineer" />

      {/* Central Hydraulic Assembly Stand holding the Spacecraft */}
      <group position={[0, -1.8, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.5, 0.65, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <torusGeometry args={[1.5, 0.04, 12, 32]} />
          <meshStandardMaterial color="#eab308" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────────
   2. FULLY ENCLOSED MISSION CONTROL ROOM (LAUNCH STAGE)
   Room Dimensions: Width 15m (X: ±7.5), Depth 12m (Z: ±6.0), Height 5.6m
   ──────────────────────────────────────────────────────────────── */

function EnclosedMissionControlRoom({ agency, spacecraftName }: { agency: string; spacecraftName: string }) {
  const isIsro = agency.toUpperCase().includes("ISRO");
  const isEsa = agency.toUpperCase().includes("ESA");
  const hqTitle = isIsro
    ? "ISRO MISSION OPERATIONS COMPLEX (ISTRAC / MOX) · SRIHARIKOTA FLIGHT DIRECTOR"
    : isEsa
    ? "ESA EUROPEAN SPACE OPERATIONS CENTRE (ESOC) · MAIN MISSION CONTROL"
    : "NASA JPL MISSION CONTROL · SPACE FLIGHT OPERATIONS FACILITY (SFOF)";

  const rocketFlameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (rocketFlameRef.current) {
      rocketFlameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 30) * 0.2;
    }
  });

  return (
    <group>
      <color attach="background" args={["#0a0f1d"]} />
      <ambientLight intensity={1.3} color="#93c5fd" />
      <directionalLight position={[0, 3.5, 1]} intensity={2.4} color="#ffffff" />

      {/* ──────────────────────────────────────────────────────────
          ROOM SHELL (CARPET FLOOR, CEILING, ACOUSTIC WALLS)
          ────────────────────────────────────────────────────────── */}

      {/* Floor: Dark Navy/Charcoal Anti-Static Carpet */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 12]} />
        <meshStandardMaterial color="#0d1322" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Luminous Blue LED Aisle Floor Runners */}
      {[-2.4, 2.4].map((x) => (
        <mesh key={`runner-${x}`} position={[x, -1.79, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}

      {/* Ceiling: Acoustic Grid Ceiling with Soft Warm Recessed LED Panels */}
      <mesh position={[0, 3.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      {[-4, 0, 4].map((x) =>
        [-3, 0, 3].map((z) => (
          <group key={`c-light-${x}-${z}`} position={[x, 3.78, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.8, 0.9]} />
              <meshBasicMaterial color="#f8fafc" />
            </mesh>
            <pointLight intensity={0.5} distance={6} color="#ffffff" />
          </group>
        ))
      )}

      {/* ──────────────────────────────────────────────────────────
          GIANT PANORAMIC LAUNCH SCREEN (NORTH WALL AT Z = -5.4)
          All Flight Controllers are seated facing this giant display!
          ────────────────────────────────────────────────────────── */}
      <group position={[0, 1.0, -5.4]}>
        {/* Wall Frame */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[12.6, 4.4, 0.1]} />
          <meshStandardMaterial color="#020617" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[12.2, 4.0]} />
          <meshBasicMaterial color="#ea580c" />
        </mesh>

        {/* 3D Simulated Rocket Liftoff Display inside the Video Wall */}
        <group position={[0, 0, 0.05]}>
          {/* Screen Background: Coastal Sky turning to Space */}
          <mesh>
            <planeGeometry args={[12.0, 3.8]} />
            <meshBasicMaterial color="#0c172e" />
          </mesh>

          {/* Top Agency Status Ribbon */}
          <group position={[0, 1.6, 0.02]}>
            <mesh>
              <planeGeometry args={[11.6, 0.35]} />
              <meshBasicMaterial color="#1e293b" />
            </mesh>
            <mesh position={[-5.2, 0, 0.01]}>
              <circleGeometry args={[0.07, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[7.2, 0.12]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>

          {/* Left Panel: Ascent Trajectory Arc & Staging Telemetry (X = -3.6) */}
          <group position={[-3.6, -0.1, 0.02]}>
            <mesh>
              <planeGeometry args={[3.8, 2.6]} />
              <meshBasicMaterial color="#031528" />
            </mesh>
            {/* Parabolic Trajectory Points */}
            {Array.from({ length: 9 }).map((_, i) => (
              <mesh key={`pt-${i}`} position={[-1.5 + i * 0.38, -0.9 + Math.pow(i * 0.14, 1.45), 0.01]}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
            ))}
            {/* Flight Metrics Bars */}
            {[-0.6, -0.2, 0.2, 0.6].map((y, idx) => (
              <mesh key={`bar-${idx}`} position={[0, y, 0.01]}>
                <planeGeometry args={[3.2, 0.1]} />
                <meshBasicMaterial color={idx === 3 ? "#10b981" : idx === 2 ? "#38bdf8" : "#0284c7"} />
              </mesh>
            ))}
          </group>

          {/* Center Panel: Global DSN Radar Tracking Array (X = 0) */}
          <group position={[0, -0.1, 0.02]}>
            <mesh>
              <planeGeometry args={[3.0, 2.6]} />
              <meshBasicMaterial color="#041a2f" />
            </mesh>
            {/* Concentric Radar Rings */}
            {[0.35, 0.7, 1.05].map((r, idx) => (
              <mesh key={`radar-${idx}`} position={[0, 0, 0.01]}>
                <ringGeometry args={[r, r + 0.015, 32]} />
                <meshBasicMaterial color="#0284c7" />
              </mesh>
            ))}
            {/* Center Lock Reticle */}
            <mesh position={[0, 0, 0.015]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
            <mesh position={[0, -0.95, 0.01]}>
              <planeGeometry args={[2.5, 0.2]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>

          {/* Right Panel: Ascending Rocket Booster (Offset to X = 3.6 to NEVER overlap the Spacecraft) */}
          <group position={[3.6, 0.1, 0.05]}>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[3.8, 2.8]} />
              <meshBasicMaterial color="#09182a" />
            </mesh>
            {/* Rocket Hull */}
            <mesh position={[0, 0.35, 0.05]}>
              <cylinderGeometry args={[0.18, 0.18, 1.6, 16]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Payload Fairing Cone */}
            <mesh position={[0, 1.35, 0.05]}>
              <coneGeometry args={[0.18, 0.55, 16]} />
              <meshStandardMaterial color="#e2e8f0" />
            </mesh>
            {/* Solid Rocket Booster Exhaust Flame */}
            <mesh ref={rocketFlameRef} position={[0, -0.85, 0.05]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.3, 1.3, 16, 1, true]} />
              <meshBasicMaterial color="#f97316" transparent opacity={0.9} side={THREE.DoubleSide} />
            </mesh>
            {/* Engine Light */}
            <pointLight position={[0, -0.7, 0.2]} intensity={3.5} distance={6} color="#f97316" />

            {/* Launch Smoke Clouds below rocket */}
            {[-0.4, 0, 0.4].map((sx, idx) => (
              <mesh key={`cloud-${idx}`} position={[sx, -1.5, 0.05]}>
                <sphereGeometry args={[0.35, 12, 12]} />
                <meshBasicMaterial color="#cbd5e1" transparent opacity={0.5} />
              </mesh>
            ))}
          </group>

          {/* Bottom Telemetry Ticker Ribbon */}
          <group position={[0, -1.6, 0.02]}>
            <mesh>
              <planeGeometry args={[11.6, 0.32]} />
              <meshBasicMaterial color="#0f172a" />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[11.4, 0.24]} />
              <meshBasicMaterial color="#ea580c" transparent opacity={0.35} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Screen Launch Glow illuminating the Flight Floor */}
      <pointLight position={[0, 1.2, -4.8]} intensity={3.5} distance={10} color="#ea580c" />

      {/* ──────────────────────────────────────────────────────────
          CENTRAL HOLOGRAPHIC TELEMETRY PLATFORM (Z = 0)
          The Spacecraft hovers directly over this pedestal as a
          Live 3D Holographic Telemetry Projection!
          ────────────────────────────────────────────────────────── */}
      <group position={[0, -1.75, 0]}>
        {/* Raised Circular Base */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[1.5, 1.7, 0.16, 32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Concentric Luminous Projection Rings */}
        <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.3, 1.38, 32]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, 0.175, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.48, 1.55, 32]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>

        {/* 4 Emitter Nodes with Vertical Hologram Guide Beams */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, idx) => {
          const ex = Math.cos(angle) * 1.42;
          const ez = Math.sin(angle) * 1.42;
          return (
            <group key={`emitter-${idx}`} position={[ex, 0.2, ez]}>
              <mesh>
                <cylinderGeometry args={[0.05, 0.07, 0.14, 8]} />
                <meshStandardMaterial color="#0284c7" />
              </mesh>
              {/* Vertical projector light column */}
              <mesh position={[0, 0.9, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 1.8, 8]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ──────────────────────────────────────────────────────────
          FLIGHT CONSOLE BANKS & SEATED FLIGHT CONTROLLERS (Z = -3.0)
          ALL SEATED FACING -Z (LOOKING DIRECTLY AT THE GIANT SCREEN)
          ────────────────────────────────────────────────────────── */}
      {[-3.6, 0, 3.6].map((x, i) => (
        <MissionFlightConsole
          key={`console-${i}`}
          position={[x, -1.8, -3.0]}
          roleBadge={i === 1 ? "FLIGHT DIRECTOR" : i === 0 ? "PROPULSION (PROP)" : "NAV & DYNAMICS (FIDO)"}
        />
      ))}

      {/* ──────────────────────────────────────────────────────────
          SIDE WALLS WITH DIGITAL DSN WORLD CLOCKS (X = ±7.5)
          ────────────────────────────────────────────────────────── */}

      {/* West Wall (Left at X = -7.5) */}
      <group position={[-7.5, 1.0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[12, 5.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* World Clocks */}
        {[-3.5, 3.5].map((z, idx) => (
          <group key={`clock-w-${idx}`} position={[z, 1.5, 0.1]}>
            <mesh>
              <boxGeometry args={[3.2, 1.2, 0.1]} />
              <meshStandardMaterial color="#020617" />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[3.0, 1.0]} />
              <meshBasicMaterial color="#064e3b" />
            </mesh>
            <mesh position={[0, 0.22, 0.07]}>
              <planeGeometry args={[2.4, 0.16]} />
              <meshBasicMaterial color="#34d399" />
            </mesh>
            <mesh position={[0, -0.18, 0.07]}>
              <planeGeometry args={[2.0, 0.32]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        ))}
      </group>

      {/* East Wall (Right at X = +7.5) */}
      <group position={[7.5, 1.0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[12, 5.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* World Clocks */}
        {[-3.5, 3.5].map((z, idx) => (
          <group key={`clock-e-${idx}`} position={[z, 1.5, 0.1]}>
            <mesh>
              <boxGeometry args={[3.2, 1.2, 0.1]} />
              <meshStandardMaterial color="#020617" />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[3.0, 1.0]} />
              <meshBasicMaterial color="#064e3b" />
            </mesh>
            <mesh position={[0, 0.22, 0.07]}>
              <planeGeometry args={[2.4, 0.16]} />
              <meshBasicMaterial color="#34d399" />
            </mesh>
            <mesh position={[0, -0.18, 0.07]}>
              <planeGeometry args={[2.0, 0.32]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Rear Wall (South Wall at Z = +6.0) with VIP Viewing Gallery */}
      <group position={[0, 1.0, 6.0]} rotation={[0, Math.PI, 0]}>
        <mesh>
          <planeGeometry args={[15, 5.6]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.8} />
        </mesh>
        {/* VIP Observation Glass Gallery */}
        <mesh position={[0, 1.2, 0.05]}>
          <boxGeometry args={[11, 2.2, 0.1]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 1.2, 0.11]}>
          <planeGeometry args={[10.6, 1.8]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────────
   3. TRUE SPACE ENVIRONMENTS (NO WALLS - INFINITE COSMOS)
   ──────────────────────────────────────────────────────────────── */

function EarthOrbitEnvironment() {
  const earthTexture = useLoader(THREE.TextureLoader, "/textures/earth.jpg");
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group>
      <color attach="background" args={["#02040c"]} />
      <Stars radius={100} depth={50} count={4500} factor={4} fade speed={0.4} />
      <ambientLight intensity={0.8} color="#e0f2fe" />
      <directionalLight position={[10, 6, 8]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[0, -6, -2]} intensity={2.2} color="#38bdf8" />
      <directionalLight position={[-8, 6, -4]} intensity={1.6} color="#93c5fd" />

      {/* 3D Realistic Earth Globe Below */}
      <group position={[0, -11, -6]}>
        <mesh ref={earthRef} rotation={[0.4, 0, 0.2]}>
          <sphereGeometry args={[8.5, 64, 64]} />
          <meshStandardMaterial map={earthTexture} roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh scale={[1.03, 1.03, 1.03]}>
          <sphereGeometry args={[8.5, 48, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Trajectory Ellipse Arcs */}
      <group position={[0, 0, 0]} rotation={[0.5, 0.3, 0]}>
        {[3.5, 5.0, 7.2, 9.5].map((rad, i) => (
          <mesh key={`orbit-${i}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[rad, rad + 0.03, 64]} />
            <meshBasicMaterial color={i === 3 ? "#f97316" : "#38bdf8"} transparent opacity={0.45 + i * 0.15} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function InterplanetarySpaceEnvironment({ targetBody }: { targetBody: string }) {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (particlesRef.current) particlesRef.current.rotation.y += delta * 0.01;
  });

  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 450;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40;
    positions[i + 1] = (Math.random() - 0.5) * 40;
    positions[i + 2] = (Math.random() - 0.5) * 40;
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return (
    <group>
      <color attach="background" args={["#02040c"]} />
      <Stars radius={110} depth={55} count={5000} factor={4.5} fade speed={0.2} />
      <ambientLight intensity={0.75} color="#e2e8f0" />
      <directionalLight position={[12, 6, 10]} intensity={3.5} color="#fffcf2" />
      <directionalLight position={[-10, -4, -8]} intensity={1.8} color="#60a5fa" />
      <directionalLight position={[-6, 8, -4]} intensity={1.5} color="#fde047" />

      {/* Distant Pinpoint Brilliant Sun */}
      <group position={[35, 18, 30]}>
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <pointLight intensity={8} distance={70} color="#fffbeb" />
      </group>

      {/* Distant Earth and Target Planet in Cosmic Space */}
      <group position={[-25, -12, -28]}>
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>
      <group position={[22, 10, -26]}>
        <mesh>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={targetBody === "mars" ? "#ea580c" : targetBody === "moon" ? "#94a3b8" : "#eab308"} />
        </mesh>
      </group>

      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial size={0.06} color="#fed7aa" transparent opacity={0.6} />
      </points>
    </group>
  );
}

function PlanetaryApproachSpaceEnvironment({ targetBody }: { targetBody: string }) {
  const texturePath = targetBody === "moon" ? "/textures/moon.jpg" : targetBody === "mars" ? "/textures/mars.jpg" : targetBody === "venus" ? "/textures/venus.jpg" : "/textures/jupiter.jpg";
  const planetTex = useLoader(THREE.TextureLoader, texturePath);

  return (
    <group>
      <color attach="background" args={["#02040c"]} />
      <Stars radius={90} depth={40} count={4000} factor={3.5} fade speed={0.3} />
      <ambientLight intensity={0.8} color="#fef3c7" />
      <directionalLight position={[10, 5, 8]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[0, -4, -8]} intensity={2.4} color={targetBody === "mars" ? "#ea580c" : targetBody === "moon" ? "#cbd5e1" : "#eab308"} />
      <directionalLight position={[-6, 8, -4]} intensity={1.5} color="#93c5fd" />

      {/* Planet Growing in Space Ahead */}
      <group position={[0, -2, -14]}>
        <mesh rotation={[0.4, 0, 0]}>
          <sphereGeometry args={[7.0, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.7} metalness={0.1} />
        </mesh>
        {targetBody === "mars" && (
          <mesh scale={[1.025, 1.025, 1.025]}>
            <sphereGeometry args={[7.0, 48, 48]} />
            <meshBasicMaterial color="#fb923c" transparent opacity={0.3} side={THREE.BackSide} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function OrbitInsertionSpaceEnvironment({ targetBody }: { targetBody: string }) {
  const texturePath = targetBody === "moon" ? "/textures/moon.jpg" : "/textures/mars.jpg";
  const planetTex = useLoader(THREE.TextureLoader, texturePath);

  return (
    <group>
      <color attach="background" args={["#030712"]} />
      <Stars radius={80} depth={35} count={4000} factor={4.0} fade speed={0.2} />
      {/* High-visibility ambient fill so spacecraft is vibrant & never black */}
      <ambientLight intensity={0.85} color="#fed7aa" />
      {/* Primary Key light */}
      <directionalLight position={[10, 6, 8]} intensity={3.6} color="#ffffff" />
      {/* Red Planet Surface Albedo Bounce */}
      <directionalLight position={[-8, -4, -6]} intensity={2.6} color="#ea580c" />
      {/* Silhouette Separation Rim Light */}
      <directionalLight position={[-6, 8, -4]} intensity={1.8} color="#93c5fd" />

      {/* Curving Mars Horizon Below */}
      <group position={[0, -10.5, -2]}>
        <mesh rotation={[0.3, 0.2, 0]}>
          <sphereGeometry args={[10.5, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Mars Atmospheric Glowing Horizon Ring */}
        <mesh position={[0, 0, 0]} rotation={[0.3, 0.2, 0]}>
          <ringGeometry args={[10.52, 10.85, 64]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Orbital Trajectory Ribbon in Mars Orbit */}
      <group position={[0, 0, 0]} rotation={[0.4, 0.2, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.2, 4.25, 64]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

function ScienceOrbitSpaceEnvironment({ targetBody }: { targetBody: string }) {
  const texturePath = targetBody === "moon" ? "/textures/moon.jpg" : targetBody === "mars" ? "/textures/mars.jpg" : "/textures/jupiter.jpg";
  const planetTex = useLoader(THREE.TextureLoader, texturePath);

  return (
    <group>
      <color attach="background" args={["#02040c"]} />
      <Stars radius={95} depth={45} count={4000} factor={4} fade speed={0.3} />
      <ambientLight intensity={0.8} color="#fed7aa" />
      <directionalLight position={[12, 6, 8]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[0, -5, -6]} intensity={2.4} color={targetBody === "mars" ? "#ea580c" : targetBody === "moon" ? "#cbd5e1" : "#eab308"} />
      <directionalLight position={[-8, 6, -4]} intensity={1.6} color="#93c5fd" />

      {/* Planet in Full Orbit View */}
      <group position={[0, -6, -10]}>
        <mesh rotation={[0.4, 0, 0.2]}>
          <sphereGeometry args={[5.2, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.7} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

function SilentSpaceEnvironment({ targetBody }: { targetBody: string }) {
  const texturePath = targetBody === "moon" ? "/textures/moon.jpg" : "/textures/mars.jpg";
  const planetTex = useLoader(THREE.TextureLoader, texturePath);

  return (
    <group>
      <color attach="background" args={["#02040a"]} />
      <Stars radius={95} depth={45} count={4500} factor={4.0} fade speed={0.1} />
      <ambientLight intensity={0.75} color="#cbd5e1" />
      <directionalLight position={[10, 6, 8]} intensity={3.4} color="#ffffff" />
      <directionalLight position={[-8, -4, -6]} intensity={2.0} color="#f97316" />
      <directionalLight position={[-6, 8, -4]} intensity={1.5} color="#38bdf8" />

      <group position={[0, -5, -8]}>
        <mesh rotation={[0.4, 0.1, 0]}>
          <sphereGeometry args={[6.2, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────────
   4. ATMOSPHERIC DESCENT & LANDING EFFECTS
   ──────────────────────────────────────────────────────────────── */

function AtmosphericDescentEnvironment({ targetBody, artifact }: { targetBody: string; artifact?: Artifact | undefined }) {
  const skyColor = targetBody === "titan" ? "#78350f" : targetBody === "venus" ? "#713f12" : "#7c2d12";
  return (
    <group>
      <color attach="background" args={[skyColor]} />
      <ambientLight intensity={0.8} color="#fed7aa" />
      <directionalLight position={[0, 6, 4]} intensity={3.5} color="#ffedd5" />
      <directionalLight position={[0, -4, 0]} intensity={2.2} color="#ea580c" />

      {/* Fiery Shockwave Plasma Compression Glow */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.4, 16, 32]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 24]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.7} />
      </mesh>

      {/* Supersonic Parachute Canopy */}
      <group position={[0, 8, 0]}>
        <mesh rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[3.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
          <meshStandardMaterial color="#f97316" side={THREE.DoubleSide} />
        </mesh>
        {[-1.5, 1.5].map((x) => (
          <mesh key={`cord-${x}`} position={[x, -3.8, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 7.5, 8]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function LandingThrusterDust({ targetBody }: { targetBody: string }) {
  const dustColor = targetBody === "moon" ? "#94a3b8" : targetBody === "mars" ? "#c2410c" : "#d97706";
  return (
    <group position={[0, 0, 0]}>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`dust-${i}`} position={[(Math.random() - 0.5) * 5, 0.1, (Math.random() - 0.5) * 5]}>
          <sphereGeometry args={[0.3 + Math.random() * 0.4, 12, 12]} />
          <meshBasicMaterial color={dustColor} transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function LandingFallbackEnvironment({ targetBody }: { targetBody: string }) {
  const isMoon = targetBody === "moon";
  const groundColor = isMoon ? "#475569" : targetBody === "mars" ? "#9a3412" : "#854d0e";
  return (
    <group>
      <color attach="background" args={[isMoon ? "#000000" : "#92400e"]} />
      {isMoon && <Stars radius={80} depth={30} count={3500} />}
      <ambientLight intensity={0.75} color="#fed7aa" />
      <directionalLight position={[5, 7, 5]} intensity={3.5} color="#fffbeb" />

      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial color={groundColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

function SurfaceFallbackEnvironment({ targetBody }: { targetBody: string }) {
  const isMoon = targetBody === "moon";
  const groundColor = isMoon ? "#334155" : targetBody === "mars" ? "#9a3412" : "#854d0e";
  return (
    <group>
      <color attach="background" args={[isMoon ? "#000000" : "#b45309"]} />
      {isMoon && <Stars radius={80} depth={30} count={3500} />}
      <ambientLight intensity={0.75} color="#fed7aa" />
      <directionalLight position={[6, 8, 4]} intensity={3.6} color="#fffcf0" />

      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={groundColor} roughness={0.92} />
      </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────────
   5. 3D HUMAN CHARACTERS: CLEANROOM SCIENTISTS & FLIGHT CONTROLLERS
   ──────────────────────────────────────────────────────────────── */

function CleanroomScientist({
  position,
  rotationY = 0,
  pose = "inspecting",
  label,
}: {
  position: [number, number, number];
  rotationY?: number;
  pose?: "inspecting" | "tablet" | "monitoring";
  label?: string;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Body / Torso in White Cleanroom Bunny Suit */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.8, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* Head with Cleanroom Hood */}
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* Dark Protective Face Visor / Safety Goggles */}
      <mesh position={[0, 1.46, 0.14]}>
        <boxGeometry args={[0.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#090d16" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Two Legs in White Booties */}
      {[-0.1, 0.1].map((x) => (
        <mesh key={`leg-${x}`} position={[x, 0.35, 0]}>
          <cylinderGeometry args={[0.075, 0.08, 0.7, 12]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      ))}

      {/* Arms with Blue ESD Nitrile Gloves */}
      {pose === "tablet" ? (
        <group>
          <mesh position={[-0.22, 0.95, 0.15]} rotation={[0.8, 0, 0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.45, 8]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0.22, 0.95, 0.15]} rotation={[0.8, 0, -0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.45, 8]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          {/* Glowing Diagnostic Tablet */}
          <group position={[0, 0.95, 0.35]} rotation={[-0.4, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.3, 0.22, 0.02]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[0.28, 0.2]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>
        </group>
      ) : pose === "inspecting" ? (
        <group>
          <mesh position={[0.24, 1.05, 0.25]} rotation={[1.2, 0.3, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.5, 8]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0.32, 1.25, 0.5]}>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>
        </group>
      ) : (
        <group>
          {[-0.24, 0.24].map((x) => (
            <mesh key={`arm-${x}`} position={[x, 0.85, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
          ))}
        </group>
      )}

      {/* Physical Cleanroom ID Badge on chest */}
      <mesh position={[0.1, 0.95, 0.14]}>
        <boxGeometry args={[0.08, 0.05, 0.01]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

function MissionFlightController({
  position,
  label,
  rotationY = 0,
}: {
  position: [number, number, number];
  label: string;
  rotationY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Ergonomic Flight Task Chair */}
      <group position={[0, -0.3, 0]}>
        {/* Star base */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.08, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        {/* Cushion */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.55, 0.08, 0.52]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        {/* Mesh backrest */}
        <mesh position={[0, 0.88, -0.24]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.5, 0.65, 0.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      </group>

      {/* Seated Torso with Mission Lanyard */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[0.42, 0.55, 0.26]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.6} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.98, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#d4a373" roughness={0.5} />
      </mesh>

      {/* Flight Communication Headset with Boom Mic */}
      <mesh position={[0, 1.0, 0]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
      {/* Earcups */}
      {[-0.14, 0.14].map((x) => (
        <mesh key={`earcup-${x}`} position={[x, 0.98, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.07]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      ))}
      {/* Microphone Boom Arm pointing to front */}
      <mesh position={[0.12, 0.94, 0.12]} rotation={[0.4, 0.3, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.14, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Forward Arms resting on desk / typing */}
      {[-0.2, 0.2].map((x) => (
        <mesh key={`arm-${x}`} position={[x, 0.48, 0.2]} rotation={[1.1, 0, x > 0 ? -0.2 : 0.2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.42, 8]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
      ))}

      {/* 3D Physical Role Placard on back of chair */}
      <mesh position={[0, 1.25, -0.22]}>
        <boxGeometry args={[0.85, 0.14, 0.02]} />
        <meshStandardMaterial color="#020617" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.25, -0.208]}>
        <planeGeometry args={[0.8, 0.1]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
}

function MissionFlightConsole({
  position,
  roleBadge,
}: {
  position: [number, number, number];
  roleBadge: string;
}) {
  return (
    <group position={position}>
      {/* Console Desk Body */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[2.8, 0.75, 1.1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Work Surface */}
      <mesh position={[0, 0.76, 0]}>
        <boxGeometry args={[2.85, 0.04, 1.15]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Dual Angled 27-inch High-Res Flight Monitors */}
      {[-0.65, 0.65].map((mx, idx) => (
        <group key={`monitor-${idx}`} position={[mx, 1.18, -0.22]} rotation={[0, mx > 0 ? -0.15 : 0.15, 0]}>
          {/* Monitor Stand */}
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          {/* Bezel */}
          <mesh>
            <boxGeometry args={[0.95, 0.58, 0.04]} />
            <meshStandardMaterial color="#020617" roughness={0.2} />
          </mesh>
          {/* Display Panel facing flight controller at +Z */}
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[0.9, 0.54]} />
            <meshBasicMaterial color={idx === 0 ? "#0369a1" : "#047857"} />
          </mesh>
          {/* Subtle screen glow */}
          <pointLight position={[0, 0, 0.15]} intensity={0.4} distance={2.5} color={idx === 0 ? "#38bdf8" : "#34d399"} />
        </group>
      ))}

      {/* Keyboard and Controls */}
      <mesh position={[0, 0.79, 0.2]}>
        <boxGeometry args={[1.1, 0.02, 0.3]} />
        <meshStandardMaterial color="#090d16" roughness={0.5} />
      </mesh>

      {/* Flight Controller Seated at Console, FACING FORWARD TOWARD THE SCREEN (-Z) */}
      <MissionFlightController position={[0, 0, 0.72]} label={roleBadge} rotationY={Math.PI} />
    </group>
  );
}
