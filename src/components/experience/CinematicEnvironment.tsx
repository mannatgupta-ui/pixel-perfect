import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";
import * as THREE from "three";

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
  agency?: string;
  targetBody?: string;
  spacecraftName?: string;
}

export function CinematicEnvironment({
  type,
  agency = "NASA",
  targetBody = "mars",
  spacecraftName = "Spacecraft",
}: CinematicEnvironmentProps) {
  return (
    <>
      {type === "cleanroom" && <CleanroomEnvironment agency={agency} spacecraftName={spacecraftName} />}
      {type === "launch" && <LaunchMissionControlEnvironment agency={agency} spacecraftName={spacecraftName} />}
      {type === "earth_orbit" && <EarthOrbitEnvironment />}
      {type === "cruise" && <InterplanetaryCruiseEnvironment targetBody={targetBody} />}
      {type === "approach" && <PlanetaryApproachEnvironment targetBody={targetBody} />}
      {type === "insertion" && <MarsInsertionEnvironment targetBody={targetBody} />}
      {type === "science_orbit" && <ScienceOrbitEnvironment targetBody={targetBody} />}
      {type === "descent" && <AtmosphericDescentEnvironment targetBody={targetBody} />}
      {type === "landing" && <PlanetaryLandingEnvironment targetBody={targetBody} />}
      {type === "surface" && <PlanetarySurfaceScene targetBody={targetBody} />}
      {type === "eclipse" && <SilentMonumentEnvironment targetBody={targetBody} />}
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   1. 3D CLEANROOM WITH SCIENTISTS & INTEGRATION GANTRY
   ──────────────────────────────────────────────────────────────── */

function CleanroomEnvironment({ agency, spacecraftName }: { agency: string; spacecraftName: string }) {
  const isIsro = agency.toUpperCase().includes("ISRO");
  const isEsa = agency.toUpperCase().includes("ESA");
  const facilityName = isIsro
    ? "ISRO SATELLITE INTEGRATION & TESTING ESTABLISHMENT (ISITE) · BENGALURU"
    : isEsa
    ? "ESA EUROPEAN SPACE RESEARCH & TECHNOLOGY CENTRE (ESTEC) · NOORDWIJK"
    : "NASA JPL SPACECRAFT ASSEMBLY FACILITY (SAF) · HIGH BAY 1";

  return (
    <group>
      <color attach="background" args={["#080c18"]} />
      <ambientLight intensity={1.1} color="#f0f9ff" />
      <directionalLight position={[0, 9, 4]} intensity={2.4} color="#ffffff" castShadow />
      <directionalLight position={[-8, 5, -4]} intensity={1.4} color="#93c5fd" />
      <directionalLight position={[8, 5, 4]} intensity={1.2} color="#fbbf24" />

      {/* Reflective Cleanroom Epoxy Floor */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial color="#0b1329" roughness={0.12} metalness={0.75} />
      </mesh>
      <gridHelper args={[28, 28, "#38bdf8", "#1e293b"]} position={[0, -2.19, 0]} />

      {/* Large Glowing Digital Cleanroom Facility Diagnostic Billboard */}
      <group position={[0, 4.2, -10]}>
        <mesh>
          <planeGeometry args={[16, 2.6]} />
          <meshStandardMaterial color="#030712" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Border glow frame */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[16.2, 2.8]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <Html position={[0, 0, 0.05]} center transform distanceFactor={14}>
          <div className="w-[850px] p-4 text-center font-mono select-none">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
              <span className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-widest">
                <span className="size-2.5 rounded-full bg-cyan-400 animate-ping" />
                {facilityName}
              </span>
              <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-300 font-semibold border border-cyan-500/40">
                CLASS 100,000 CLEANROOM
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-around text-xs text-white/80">
              <div>
                <span className="text-white/40 block text-[10px]">INTEGRATION STAGE</span>
                <span className="font-bold text-amber-400">{spacecraftName.toUpperCase()} FLIGHT BUS ASSEMBLY</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px]">AIR PURITY / HEPA</span>
                <span className="font-bold text-emerald-400">99.997% @ 0.3 µm</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px]">THERMAL CONTROL</span>
                <span className="font-bold text-teal">20.2°C · 43% RH</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px]">ESD PROTOCOL</span>
                <span className="font-bold text-purple-400">GROUNDED & ACTIVE</span>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* Overhead High-Bay Crane Structure with Hazard Markings */}
      <group position={[0, 6.2, 0]}>
        {[-8, -3, 3, 8].map((z) => (
          <mesh key={`crane-${z}`} position={[0, 0, z]}>
            <boxGeometry args={[30, 0.5, 0.5]} />
            <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
        {/* Overhead crane carriage */}
        <mesh position={[-2, -0.4, 0]}>
          <boxGeometry args={[3.2, 0.7, 2.2]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
        {/* Steel suspension wire */}
        <mesh position={[-2, -2.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4.2, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* 3D Cleanroom Scientists in Bunny Suits gathered around the hardware */}
      <CleanroomScientist position={[-2.2, -2.2, 1.2]} rotationY={0.6} pose="tablet" label="Lead Systems Engineer" />
      <CleanroomScientist position={[2.2, -2.2, 1.0]} rotationY={-0.8} pose="inspecting" label="Payload Integration Specialist" />
      <CleanroomScientist position={[0, -2.2, 2.6]} rotationY={Math.PI} pose="monitoring" label="Avionics & Telemetry QA" />
      <CleanroomScientist position={[-1.8, -2.2, -2.0]} rotationY={0.2} pose="inspecting" label="Thermal MLI Engineer" />

      {/* Ground Support Integration Stand & Heavy Duty Hydraulics */}
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
   2. 3D MISSION CONTROL ROOM / HEADQUARTERS AT LAUNCH
   ──────────────────────────────────────────────────────────────── */

function LaunchMissionControlEnvironment({ agency, spacecraftName }: { agency: string; spacecraftName: string }) {
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
      <directionalLight position={[0, 7, 3]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[0, -2, -6]} intensity={4.0} color="#ea580c" />

      {/* Control Room Floor (Tiered Auditorium) */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial color="#090d1a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Giant Panoramic Mission Control Main Video Wall */}
      <group position={[0, 3.8, -11]}>
        {/* Main Center Video Projection Screen (Live Rocket Liftoff Stream) */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[18, 7.5]} />
          <meshStandardMaterial color="#030712" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[18.4, 7.9]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>

        <Html position={[0, 0, 0.05]} center transform distanceFactor={13}>
          <div className="w-[960px] h-[400px] p-6 text-center font-mono select-none bg-gradient-to-b from-black/90 via-black/80 to-black/95 rounded-2xl border border-orange-500/40">
            {/* Header with Agency and Green Operational Status */}
            <div className="flex items-center justify-between border-b border-orange-500/30 pb-3">
              <span className="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wider">
                <span className="size-3 rounded-full bg-red-500 animate-ping" />
                {hqTitle}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300 font-bold border border-emerald-500/40">
                ALL FLIGHT STATIONS GO FOR LAUNCH
              </span>
            </div>

            {/* Giant Live Mission Tracking Grid */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-left">
              {/* Telemetry Stream */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs space-y-1.5">
                <div className="text-[11px] text-white/50 font-bold uppercase tracking-wider">MISSION CLOCK</div>
                <div className="text-3xl font-display font-bold text-emerald-400">T+ 00:03:14</div>
                <div className="text-[11px] text-amber-400">STATUS: BOOSTER STAGING NOMINAL</div>
                <div className="text-[10px] text-white/70">Vehicle: Polar / Delta Heavy Stack</div>
              </div>

              {/* Trajectory Plotter */}
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

              {/* Ground Stations Network */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs space-y-1.5">
                <div className="text-[11px] text-white/50 font-bold uppercase tracking-wider">TRACKING NETWORK</div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  DSN Byalalu / Goldstone Locked
                </div>
                <div className="text-[10px] text-white/70">Carrier: S-Band Transponder Active</div>
                <div className="text-[10px] text-sky-400">Telemetry Bitrate: 2.048 Mbps</div>
              </div>
            </div>

            {/* Giant Live Ascent Banner */}
            <div className="mt-4 rounded-xl bg-orange-500/15 border border-orange-500/30 p-2 text-center text-xs text-orange-300 font-bold tracking-widest uppercase">
              🚀 {spacecraftName.toUpperCase()} EN ROUTE TO PARKING ORBIT · ALL SYSTEMS PERFORMING AS EXPECTED
            </div>
          </div>
        </Html>
      </group>

      {/* Flight Control Console Banks (Rows of workstations with glowing dual monitors) */}
      {[-4, 0, 4].map((x, i) => (
        <group key={`console-row-${i}`} position={[x, -1.8, -4]}>
          {/* Console Desk */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[3.2, 0.8, 1.2]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Dual Glowing Computer Monitors */}
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
          {/* Seated Flight Controller with Communications Headset */}
          <MissionFlightController position={[0, 0, 0.8]} label={i === 1 ? "FLIGHT DIRECTOR" : i === 0 ? "PROPULSION (PROP)" : "TRAJECTORY (NAV)"} />
        </group>
      ))}

      {/* Ascending Launch Vehicle Silhouette with Violent Exhaust Plume in Deep Sky */}
      <group position={[0, 1.5, -6]}>
        {/* Core Booster Stack */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 3.8, 24]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Conical Payload Fairing */}
        <mesh position={[0, 3.2, 0]}>
          <coneGeometry args={[0.5, 1.4, 24]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        {/* Rocket Flame / Exhaust */}
        <mesh ref={rocketFlameRef} position={[0, -2.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.8, 3.8, 24, 1, true]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, -1.8, 0]} intensity={6.0} distance={15} color="#ea580c" />
      </group>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────────
   3. 3D HUMAN CHARACTERS: SCIENTIST & FLIGHT CONTROLLER
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

      {/* Two Arms with Blue ESD Nitrile Gloves */}
      {pose === "tablet" ? (
        <group>
          {/* Left and Right Arms folded forward */}
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
          {/* One arm pointing with optical tool */}
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
          {/* Resting arms */}
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

/* ────────────────────────────────────────────────────────────────
   4. OTHER STAGES: ORBIT, CRUISE, EDL & SURFACE SCENES
   ──────────────────────────────────────────────────────────────── */

function EarthOrbitEnvironment() {
  const earthTexture = useLoader(THREE.TextureLoader, "/textures/earth.jpg");
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group>
      <color attach="background" args={["#02040a"]} />
      <Stars radius={90} depth={40} count={3500} factor={4} fade speed={0.4} />
      <ambientLight intensity={0.15} color="#ffffff" />
      <directionalLight position={[10, 5, 8]} intensity={3.0} color="#fffbeb" />

      {/* Earth Globe */}
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

      {/* Orbital Trajectory Arc */}
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

function InterplanetaryCruiseEnvironment({ targetBody }: { targetBody: string }) {
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
      <color attach="background" args={["#010206"]} />
      <Stars radius={100} depth={50} count={4500} factor={4.5} fade speed={0.2} />
      <ambientLight intensity={0.12} color="#ffffff" />
      <directionalLight position={[12, 6, 10]} intensity={3.2} color="#fffcf2" />

      {/* Sun */}
      <group position={[35, 18, 30]}>
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <pointLight intensity={6} distance={60} color="#fffbeb" />
      </group>

      {/* Distant Earth and Target Planet */}
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

function PlanetaryApproachEnvironment({ targetBody }: { targetBody: string }) {
  const texturePath = targetBody === "moon" ? "/textures/moon.jpg" : targetBody === "mars" ? "/textures/mars.jpg" : "/textures/jupiter.jpg";
  const planetTex = useLoader(THREE.TextureLoader, texturePath);

  return (
    <group>
      <color attach="background" args={["#03050c"]} />
      <Stars radius={85} depth={35} count={3800} factor={3.5} fade speed={0.3} />
      <ambientLight intensity={0.2} color="#fed7aa" />
      <directionalLight position={[10, 4, 8]} intensity={2.8} color="#ffedd5" />

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

function MarsInsertionEnvironment({ targetBody }: { targetBody: string }) {
  const texturePath = targetBody === "moon" ? "/textures/moon.jpg" : "/textures/mars.jpg";
  const planetTex = useLoader(THREE.TextureLoader, texturePath);

  return (
    <group>
      <color attach="background" args={["#010204"]} />
      <Stars radius={75} depth={30} count={3200} factor={3.5} fade speed={0.15} />
      <ambientLight intensity={0.05} color="#1e1b4b" />
      <directionalLight position={[-15, 2, -15]} intensity={0.4} color="#7c2d12" />

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

function AtmosphericDescentEnvironment({ targetBody }: { targetBody: string }) {
  return (
    <group>
      <color attach="background" args={["#7c2d12"]} />
      <ambientLight intensity={0.4} color="#fed7aa" />
      <directionalLight position={[0, 6, 4]} intensity={2.0} color="#ffedd5" />

      {/* Compression Shockwave Fiery Plasma Glow */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.4, 16, 32]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 24]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.7} />
      </mesh>

      {/* Supersonic Parachute Canopy High Overhead */}
      <group position={[0, 8, 0]}>
        <mesh rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[3.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
          <meshStandardMaterial color="#f97316" side={THREE.DoubleSide} />
        </mesh>
        {/* Parachute Suspension Cords */}
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

function PlanetaryLandingEnvironment({ targetBody }: { targetBody: string }) {
  const groundColor = targetBody === "moon" ? "#475569" : targetBody === "mars" ? "#7c2d12" : "#a16207";
  return (
    <group>
      <color attach="background" args={[targetBody === "moon" ? "#000000" : "#92400e"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 7, 5]} intensity={2.6} color="#fffbeb" />

      {/* Surface Terrain */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color={groundColor} roughness={0.9} />
      </mesh>
      {/* Landing thruster dust kickup */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`dust-${i}`} position={[(Math.random() - 0.5) * 4, -1.6, (Math.random() - 0.5) * 4]}>
          <sphereGeometry args={[0.4 + Math.random() * 0.3, 12, 12]} />
          <meshBasicMaterial color="#d97706" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function PlanetarySurfaceScene({ targetBody }: { targetBody: string }) {
  const isMoon = targetBody === "moon";
  const groundColor = isMoon ? "#334155" : targetBody === "mars" ? "#9a3412" : "#854d0e";
  return (
    <group>
      <color attach="background" args={[isMoon ? "#000000" : "#b45309"]} />
      {isMoon && <Stars radius={80} depth={30} count={3500} />}
      <ambientLight intensity={isMoon ? 0.2 : 0.6} />
      <directionalLight position={[6, 8, 4]} intensity={isMoon ? 3.4 : 2.2} color="#fffcf0" />

      {/* Ground Regolith */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={groundColor} roughness={0.92} />
      </mesh>
      {/* Scatter Boulders */}
      {[
        [-3, -0.5, 2] as const,
        [4, -0.5, -3] as const,
        [-2, -0.5, -4] as const,
        [3.5, -0.5, 3.5] as const,
      ].map(([x, y, z], i) => (
        <mesh key={`rock-${i}`} position={[x, y, z]}>
          <dodecahedronGeometry args={[0.3 + i * 0.1, 1]} />
          <meshStandardMaterial color={isMoon ? "#1e293b" : "#451a03"} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function ScienceOrbitEnvironment({ targetBody }: { targetBody: string }) {
  const texturePath = targetBody === "moon" ? "/textures/moon.jpg" : targetBody === "mars" ? "/textures/mars.jpg" : "/textures/jupiter.jpg";
  const planetTex = useLoader(THREE.TextureLoader, texturePath);

  return (
    <group>
      <color attach="background" args={["#020409"]} />
      <Stars radius={90} depth={40} count={3600} factor={4} fade speed={0.3} />
      <ambientLight intensity={0.25} color="#fed7aa" />
      <directionalLight position={[12, 6, 8]} intensity={3.2} color="#fffbeb" />

      <group position={[0, -6, -10]}>
        <mesh rotation={[0.4, 0, 0.2]}>
          <sphereGeometry args={[5.2, 64, 64]} />
          <meshStandardMaterial map={planetTex} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function SilentMonumentEnvironment({ targetBody }: { targetBody: string }) {
  const texturePath = targetBody === "moon" ? "/textures/moon.jpg" : "/textures/mars.jpg";
  const planetTex = useLoader(THREE.TextureLoader, texturePath);

  return (
    <group>
      <color attach="background" args={["#000000"]} />
      <Stars radius={95} depth={45} count={4000} factor={3.0} fade speed={0.1} />
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
