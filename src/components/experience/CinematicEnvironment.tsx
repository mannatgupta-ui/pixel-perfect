import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";
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
      <ambientLight intensity={1.2} color="#f0f9ff" />
      <directionalLight position={[0, 7.5, 0]} intensity={2.6} color="#ffffff" castShadow />
      <directionalLight position={[-8, 4, -6]} intensity={1.4} color="#93c5fd" />
      <directionalLight position={[8, 4, 6]} intensity={1.4} color="#fed7aa" />

      {/* ──────────────────────────────────────────────────────────
          ENCLOSED LABORATORY ROOM (6 SIDES: FLOOR, CEILING, 4 WALLS)
          ────────────────────────────────────────────────────────── */}

      {/* 1. FLOOR (High-Gloss White/Navy Cleanroom Epoxy with Grid) */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#0b1329" roughness={0.12} metalness={0.7} />
      </mesh>
      <gridHelper args={[24, 24, "#38bdf8", "#1e293b"]} position={[0, -2.19, 0]} />

      {/* Yellow/Black Striped Safety Perimeter Zone on Floor */}
      <mesh position={[0, -2.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.0, 32]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>

      {/* 2. CEILING (Enclosed Cleanroom Ceiling Grid with Recessed Fluorescent Panels) */}
      <mesh position={[0, 7.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Recessed Light Panels on Ceiling */}
      {[-6, 0, 6].map((x) =>
        [-6, 0, 6].map((z) => (
          <group key={`light-${x}-${z}`} position={[x, 7.78, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[2.4, 1.2]} />
              <meshBasicMaterial color="#f8fafc" />
            </mesh>
            <pointLight intensity={0.6} distance={8} color="#ffffff" />
          </group>
        ))
      )}

      {/* Heavy Yellow Industrial Crane Bridge Rails suspended from ceiling */}
      <group position={[0, 6.4, 0]}>
        {[-8, -2, 4, 9].map((z) => (
          <mesh key={`crane-beam-${z}`} position={[0, 0, z]}>
            <boxGeometry args={[26, 0.45, 0.45]} />
            <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
        {/* Overhead Hoist Carriage */}
        <mesh position={[-2, -0.4, 0]}>
          <boxGeometry args={[3.2, 0.65, 2.0]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
        <mesh position={[-2, -2.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4.0, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* 3. NORTH WALL (Front Wall at Z = -13.9) */}
      <group position={[0, 2.8, -13.9]}>
        <mesh>
          <planeGeometry args={[28, 10]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* Large Digital LED Facility Screen on North Wall */}
        <group position={[0, 1.4, 0.05]}>
          <mesh>
            <planeGeometry args={[16, 2.8]} />
            <meshStandardMaterial color="#030712" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[16.3, 3.1]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <Html position={[0, 0, 0.05]} center transform distanceFactor={14}>
            <div className="w-[880px] p-4 text-center font-mono select-none bg-black/90 rounded-2xl border border-cyan-500/50 shadow-2xl">
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                <span className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-widest">
                  <span className="size-2.5 rounded-full bg-cyan-400 animate-ping" />
                  {facilityName}
                </span>
                <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-300 font-semibold border border-cyan-500/40">
                  ISO CLASS 100,000 / AIRLOCK INTERLOCKED
                </span>
              </div>
              <div className="mt-2.5 flex items-center justify-around text-xs text-white/80">
                <div>
                  <span className="text-white/40 block text-[10px]">CURRENT INTEGRATION</span>
                  <span className="font-bold text-amber-400">{spacecraftName.toUpperCase()} · FLIGHT MODEL QUALIFICATION</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">AIR PURITY / HEPA</span>
                  <span className="font-bold text-emerald-400">99.997% @ 0.3 µm</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">ENVIRONMENT</span>
                  <span className="font-bold text-teal">20.2°C · 42% RH</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">FACILITY AGENCY</span>
                  <span className="font-bold text-purple-400">{agencyLogo} AEROSPACE CLEANROOM</span>
                </div>
              </div>
            </div>
          </Html>
        </group>

        {/* Stainless Steel HEPA Air Filter Bank along bottom of North Wall */}
        {[-9, -5, -1, 3, 7, 11].map((x) => (
          <mesh key={`hepa-${x}`} position={[x, -2.5, 0.1]}>
            <boxGeometry args={[3.4, 2.6, 0.2]} />
            <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* 4. SOUTH WALL (Back Wall at Z = +13.9 with Ingress Airlock Doors & Observation Windows) */}
      <group position={[0, 2.8, 13.9]} rotation={[0, Math.PI, 0]}>
        <mesh>
          <planeGeometry args={[28, 10]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* Double Air-Shower Airlock Entry Doors */}
        <group position={[0, -1.2, 0.05]}>
          <mesh position={[-1.2, 0, 0]}>
            <boxGeometry args={[2.2, 4.4, 0.1]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[1.2, 0, 0]}>
            <boxGeometry args={[2.2, 4.4, 0.1]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Round Glass Portholes */}
          {[-1.2, 1.2].map((x) => (
            <mesh key={`porthole-${x}`} position={[x, 0.8, 0.06]}>
              <circleGeometry args={[0.3, 24]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
            </mesh>
          ))}
          {/* Illuminated Exit / Airlock Sign */}
          <group position={[0, 2.6, 0.1]}>
            <mesh>
              <boxGeometry args={[2.8, 0.5, 0.1]} />
              <meshStandardMaterial color="#065f46" />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[2.6, 0.4]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        </group>

        {/* Visitor Gallery Observation Glass Windows on Left & Right */}
        {[-8, 8].map((x) => (
          <group key={`obs-${x}`} position={[x, 0.8, 0.05]}>
            <mesh>
              <boxGeometry args={[6, 2.8, 0.1]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[5.6, 2.4]} />
              <meshBasicMaterial color="#0284c7" transparent opacity={0.25} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5. WEST WALL (Left Wall at X = -13.9 with Blinking Diagnostic Server Racks) */}
      <group position={[-13.9, 2.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[28, 10]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* 19-Inch Telemetry & Diagnostic Computer Server Racks */}
        {[-8, -5, -2, 1, 4].map((z, i) => (
          <group key={`rack-${i}`} position={[z, -1.0, 0.4]}>
            <mesh>
              <boxGeometry args={[1.8, 4.2, 0.8]} />
              <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Blinking Rack Status LEDs */}
            {[-1.2, -0.6, 0, 0.6, 1.2].map((y, idx) => (
              <mesh key={`led-${idx}`} position={[0.6, y, 0.42]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color={idx % 2 === 0 ? "#10b981" : "#38bdf8"} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 6. EAST WALL (Right Wall at X = +13.9 with Cleanroom Workbenches & Tool Cabinets) */}
      <group position={[13.9, 2.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[28, 10]} />
          <meshStandardMaterial color="#111827" roughness={0.5} />
        </mesh>

        {/* Anti-Static Stainless Steel Workbenches & Diagnostic Equipment */}
        {[-6, 0, 6].map((z, i) => (
          <group key={`bench-${i}`} position={[z, -1.8, 0.6]}>
            {/* Table top */}
            <mesh position={[0, 0.8, 0]}>
              <boxGeometry args={[3.5, 0.1, 1.2]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Table legs */}
            {[-1.6, 1.6].map((x) => (
              <mesh key={`leg-${x}`} position={[x, 0.35, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#64748b" metalness={0.8} />
              </mesh>
            ))}
            {/* Oscilloscope on bench */}
            <mesh position={[-0.8, 1.1, 0]}>
              <boxGeometry args={[0.8, 0.5, 0.6]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            <mesh position={[-0.8, 1.1, 0.31]}>
              <planeGeometry args={[0.6, 0.35]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        ))}

        {/* Cleanroom Safety Signs & Posters on East Wall */}
        <group position={[0, 2.0, 0.05]}>
          <mesh>
            <planeGeometry args={[4.2, 1.8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[4.0, 1.6]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      </group>

      {/* ──────────────────────────────────────────────────────────
          3D SCIENTISTS & INTEGRATION STAND
          ────────────────────────────────────────────────────────── */}
      <CleanroomScientist position={[-2.4, -2.2, 1.4]} rotationY={0.6} pose="tablet" label="Lead Systems Engineer" />
      <CleanroomScientist position={[2.4, -2.2, 1.2]} rotationY={-0.8} pose="inspecting" label="Payload Integration Specialist" />
      <CleanroomScientist position={[0, -2.2, 2.8]} rotationY={Math.PI} pose="monitoring" label="Avionics & Telemetry QA" />
      <CleanroomScientist position={[-2.0, -2.2, -2.2]} rotationY={0.2} pose="inspecting" label="Thermal MLI Engineer" />

      {/* Central Heavy Duty Hydraulic Integration Stand holding the Spacecraft */}
      <group position={[0, -1.8, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.4, 1.6, 0.65, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <torusGeometry args={[1.6, 0.04, 12, 32]} />
          <meshStandardMaterial color="#eab308" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────────
   2. FULLY ENCLOSED MISSION CONTROL ROOM (LAUNCH STAGE)
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
      <color attach="background" args={["#030712"]} />
      <ambientLight intensity={0.7} color="#93c5fd" />
      <directionalLight position={[0, 6, 2]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[0, -2, -6]} intensity={3.5} color="#ea580c" />

      {/* Control Room Floor (Navy Carpet with Stepped Ranks) */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 26]} />
        <meshStandardMaterial color="#090d1a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Control Room Ceiling with Soft Downlights */}
      <mesh position={[0, 7.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 26]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Giant Front Video Wall (North Wall at Z = -11.5) */}
      <group position={[0, 3.8, -11.5]}>
        <mesh>
          <planeGeometry args={[18, 7.5]} />
          <meshStandardMaterial color="#030712" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[18.4, 7.9]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>

        <Html position={[0, 0, 0.05]} center transform distanceFactor={13}>
          <div className="w-[960px] h-[400px] p-6 text-center font-mono select-none bg-gradient-to-b from-black/90 via-black/80 to-black/95 rounded-2xl border border-orange-500/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-orange-500/30 pb-3">
              <span className="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wider">
                <span className="size-3 rounded-full bg-red-500 animate-ping" />
                {hqTitle}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300 font-bold border border-emerald-500/40">
                ALL FLIGHT STATIONS GO FOR LAUNCH
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-left">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs space-y-1.5">
                <div className="text-[11px] text-white/50 font-bold uppercase tracking-wider">MISSION CLOCK</div>
                <div className="text-3xl font-display font-bold text-emerald-400">T+ 00:03:14</div>
                <div className="text-[11px] text-amber-400">STATUS: BOOSTER STAGING NOMINAL</div>
                <div className="text-[10px] text-white/70">Vehicle: Polar / Delta Heavy Stack</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs space-y-1.5">
                <div className="text-[11px] text-white/50 font-bold uppercase tracking-wider">FLIGHT DYNAMICS</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-white/60">Altitude:</span>
                  <span className="font-bold text-cyan-400 text-sm">184.2 km</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-white/60">Velocity:</span>
                  <span className="font-bold text-white text-sm">7,420 m/s (Mach 21)</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-white/60">Downrange:</span>
                  <span className="font-bold text-teal text-sm">490 km</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs space-y-1.5">
                <div className="text-[11px] text-white/50 font-bold uppercase tracking-wider">TRACKING NETWORK</div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  DSN Station Tracking Locked
                </div>
                <div className="text-[10px] text-white/70">Carrier: S-Band Transponder Active</div>
                <div className="text-[10px] text-sky-400">Telemetry Bitrate: 2.048 Mbps</div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-orange-500/15 border border-orange-500/30 p-2 text-center text-xs text-orange-300 font-bold tracking-widest uppercase">
              🚀 {spacecraftName.toUpperCase()} EN ROUTE TO ORBIT · ALL SYSTEMS PERFORMING AS EXPECTED
            </div>
          </div>
        </Html>
      </group>

      {/* Flight Control Console Banks */}
      {[-4, 0, 4].map((x, i) => (
        <group key={`console-${i}`} position={[x, -1.8, -4]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[3.2, 0.8, 1.2]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
          {[-0.6, 0.6].map((mx) => (
            <group key={`mon-${mx}`} position={[mx, 1.0, -0.2]}>
              <mesh>
                <boxGeometry args={[0.85, 0.55, 0.05]} />
                <meshStandardMaterial color="#0f172a" />
              </mesh>
              <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[0.8, 0.5]} />
                <meshBasicMaterial color={mx < 0 ? "#0284c7" : "#10b981"} />
              </mesh>
            </group>
          ))}
          <MissionFlightController position={[0, 0, 0.8]} label={i === 1 ? "FLIGHT DIRECTOR" : i === 0 ? "PROPULSION (PROP)" : "NAV / DYNAMICS"} />
        </group>
      ))}

      {/* Ascending Rocket Stack */}
      <group position={[0, 1.5, -6]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 3.8, 24]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 3.2, 0]}>
          <coneGeometry args={[0.5, 1.4, 24]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh ref={rocketFlameRef} position={[0, -2.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.8, 3.8, 24, 1, true]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, -1.8, 0]} intensity={6.0} distance={15} color="#ea580c" />
      </group>

      {/* ──────────────────────────────────────────────────────────
          ENCLOSED CONTROL ROOM WALLS (ALL 4 SIDES ENCLOSED)
          ────────────────────────────────────────────────────────── */}

      {/* South Wall (Back of Mission Control Room at Z = +12.9) with VIP Viewing Gallery */}
      <group position={[0, 2.4, 12.9]} rotation={[0, Math.PI, 0]}>
        <mesh>
          <planeGeometry args={[30, 9.6]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.8} />
        </mesh>
        {/* VIP Observation Glass Gallery above rear */}
        <mesh position={[0, 2.2, 0.05]}>
          <boxGeometry args={[20, 2.8, 0.1]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 2.2, 0.11]}>
          <planeGeometry args={[19.4, 2.4]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
        </mesh>
        {/* Rear Exit Security Doors */}
        {[-8, 8].map((x) => (
          <group key={`door-${x}`} position={[x, -1.2, 0.05]}>
            <mesh>
              <planeGeometry args={[2.2, 3.6]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            <mesh position={[0, 1.9, 0.02]}>
              <planeGeometry args={[1.2, 0.3]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
          </group>
        ))}
      </group>

      {/* West Wall (Left Wall at X = -14.9) with Global DSN Tracking Clocks */}
      <group position={[-14.9, 2.4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[26, 9.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* DSN Station Time Panels */}
        {[-7, -2.5, 2.5, 7].map((z, idx) => (
          <group key={`clock-${idx}`} position={[z, 2.0, 0.1]}>
            <mesh>
              <boxGeometry args={[3.6, 1.6, 0.1]} />
              <meshStandardMaterial color="#020617" />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[3.4, 1.4]} />
              <meshBasicMaterial color="#0f766e" transparent opacity={0.3} />
            </mesh>
          </group>
        ))}
        {/* Flight Telemetry Status Lights */}
        {[-8, -4, 0, 4, 8].map((z, idx) => (
          <mesh key={`rack-led-${idx}`} position={[z, -0.8, 0.2]}>
            <boxGeometry args={[2.2, 2.6, 0.4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* East Wall (Right Wall at X = +14.9) with Mission Telemetry & Operations Boards */}
      <group position={[14.9, 2.4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[26, 9.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* Giant Orbital Trajectory Map Board */}
        <group position={[0, 1.8, 0.1]}>
          <mesh>
            <boxGeometry args={[14, 4.2, 0.1]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[13.6, 3.8]} />
            <meshBasicMaterial color="#1e3a8a" transparent opacity={0.35} />
          </mesh>
        </group>
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
      <color attach="background" args={["#010206"]} />
      <Stars radius={100} depth={50} count={4500} factor={4} fade speed={0.4} />
      <ambientLight intensity={0.15} color="#ffffff" />
      <directionalLight position={[10, 5, 8]} intensity={3.0} color="#fffbeb" />

      {/* 3D Realistic Earth Globe Below */}
      <group position={[0, -11, -6]}>
        <mesh ref={earthRef} rotation={[0.4, 0, 0.2]}>
          <sphereGeometry args={[8.5, 64, 64]} />
          <meshStandardMaterial map={earthTexture} roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh scale={[1.03, 1.03, 1.03]}>
          <sphereGeometry args={[8.5, 48, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Trajectory Ellipse Arcs */}
      <group position={[0, 0, 0]} rotation={[0.5, 0.3, 0]}>
        {[3.5, 5.0, 7.2, 9.5].map((rad, i) => (
          <mesh key={`orbit-${i}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[rad, rad + 0.03, 64]} />
            <meshBasicMaterial color={i === 3 ? "#f97316" : "#38bdf8"} transparent opacity={0.35 + i * 0.15} side={THREE.DoubleSide} />
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
      <color attach="background" args={["#000003"]} />
      <Stars radius={110} depth={55} count={5000} factor={4.5} fade speed={0.2} />
      <ambientLight intensity={0.12} color="#ffffff" />
      <directionalLight position={[12, 6, 10]} intensity={3.2} color="#fffcf2" />

      {/* Distant Pinpoint Brilliant Sun */}
      <group position={[35, 18, 30]}>
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <pointLight intensity={6} distance={60} color="#fffbeb" />
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
      <color attach="background" args={["#010207"]} />
      <Stars radius={90} depth={40} count={4000} factor={3.5} fade speed={0.3} />
      <ambientLight intensity={0.2} color="#fed7aa" />
      <directionalLight position={[10, 4, 8]} intensity={2.8} color="#ffedd5" />

      {/* Planet Growing in Space Ahead */}
      <group position={[0, -2, -14]}>
        <mesh rotation={[0.4, 0, 0]}>
          <sphereGeometry args={[7.0, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.8} />
        </mesh>
        {targetBody === "mars" && (
          <mesh scale={[1.025, 1.025, 1.025]}>
            <sphereGeometry args={[7.0, 48, 48]} />
            <meshBasicMaterial color="#fb923c" transparent opacity={0.2} side={THREE.BackSide} />
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
      <color attach="background" args={["#000002"]} />
      <Stars radius={80} depth={35} count={3500} factor={3.5} fade speed={0.15} />
      <ambientLight intensity={0.05} color="#1e1b4b" />
      <directionalLight position={[-15, 2, -15]} intensity={0.4} color="#7c2d12" />

      {/* Dark Limb of the Planet */}
      <group position={[0, -10.5, 0]}>
        <mesh rotation={[0.3, 0, 0]}>
          <sphereGeometry args={[10.5, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.9} color="#381b16" />
        </mesh>
        <mesh position={[4, 8, -4]}>
          <ringGeometry args={[10.5, 10.7, 48]} />
          <meshBasicMaterial color="#ea580c" transparent opacity={0.15} side={THREE.DoubleSide} />
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
      <color attach="background" args={["#010208"]} />
      <Stars radius={95} depth={45} count={4000} factor={4} fade speed={0.3} />
      <ambientLight intensity={0.25} color="#fed7aa" />
      <directionalLight position={[12, 6, 8]} intensity={3.2} color="#fffbeb" />

      {/* Planet in Full Orbit View */}
      <group position={[0, -6, -10]}>
        <mesh rotation={[0.4, 0, 0.2]}>
          <sphereGeometry args={[5.2, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.8} />
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
      <color attach="background" args={["#000000"]} />
      <Stars radius={95} depth={45} count={4200} factor={3.0} fade speed={0.1} />
      <ambientLight intensity={0.03} color="#ffffff" />

      <group position={[0, -4, -8]}>
        <mesh rotation={[0.4, 0, 0]}>
          <sphereGeometry args={[6.2, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.95} color="#0c0705" />
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
      <ambientLight intensity={0.4} color="#fed7aa" />
      <directionalLight position={[0, 6, 4]} intensity={2.0} color="#ffedd5" />

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
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 7, 5]} intensity={2.6} color="#fffbeb" />

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
      <ambientLight intensity={isMoon ? 0.2 : 0.6} />
      <directionalLight position={[6, 8, 4]} intensity={isMoon ? 3.4 : 2.2} color="#fffcf0" />

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

      {/* Floating Role Name Tag */}
      {label && (
        <Html position={[0, 1.8, 0]} center distanceFactor={10}>
          <div className="pointer-events-none whitespace-nowrap rounded-full bg-cyan-950/80 px-2 py-0.5 font-mono text-[9px] font-bold text-cyan-300 border border-cyan-500/40 shadow-sm">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function MissionFlightController({
  position,
  label,
}: {
  position: [number, number, number];
  label: string;
}) {
  return (
    <group position={position}>
      {/* Seated Torso with Mission Lanyard */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.7, 16]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.6} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      {/* Flight Headset */}
      <mesh position={[0, 1.28, 0]}>
        <torusGeometry args={[0.17, 0.02, 8, 16]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0.16, 1.26, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* Role Badge */}
      <Html position={[0, 1.55, 0]} center distanceFactor={10}>
        <div className="pointer-events-none whitespace-nowrap rounded-md bg-black/85 px-1.5 py-0.5 font-mono text-[8px] font-bold text-amber-400 border border-amber-500/30">
          {label}
        </div>
      </Html>
    </group>
  );
}
