import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
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
    | "eclipse";
}

export function CinematicEnvironment({ type }: CinematicEnvironmentProps) {
  return (
    <>
      {type === "cleanroom" && <CleanroomEnvironment />}
      {type === "launch" && <LaunchEnvironment />}
      {type === "earth_orbit" && <EarthOrbitEnvironment />}
      {type === "cruise" && <InterplanetaryCruiseEnvironment />}
      {type === "approach" && <MarsApproachEnvironment />}
      {type === "insertion" && <MarsInsertionEnvironment />}
      {type === "science_orbit" && <MarsScienceOrbitEnvironment />}
      {type === "eclipse" && <MarsEclipseEnvironment />}
    </>
  );
}

/**
 * Stage 1: ISITE Bengaluru Cleanroom Facility
 */
function CleanroomEnvironment() {
  return (
    <group>
      <color attach="background" args={["#0a0f1d"]} />
      <ambientLight intensity={0.9} color="#e0f2fe" />
      <directionalLight position={[0, 8, 4]} intensity={2.2} color="#ffffff" castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={1.2} color="#93c5fd" />
      <directionalLight position={[6, 4, 4]} intensity={1.0} color="#fbbf24" />

      {/* Glossy Cleanroom Epoxy Floor */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.7} />
      </mesh>

      {/* Cleanroom Grid Lines on Floor */}
      <gridHelper args={[24, 24, "#38bdf8", "#1e293b"]} position={[0, -2.19, 0]} />

      {/* Overhead High-Bay Gantry Beams & Yellow Bridge Crane */}
      <group position={[0, 5.5, 0]}>
        {[-8, -4, 0, 4, 8].map((z) => (
          <mesh key={`beam-${z}`} position={[0, 0, z]}>
            <boxGeometry args={[26, 0.4, 0.4]} />
            <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Crane Carriage */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[3, 0.6, 2]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
        {/* Suspension Cable & Hook */}
        <mesh position={[0, -2.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3.8, 8]} />
          <meshStandardMaterial color="#71717a" metalness={0.9} />
        </mesh>
      </group>

      {/* Cleanroom Walls with Laminar Air Flow Panels */}
      <mesh position={[0, 4, -12]}>
        <planeGeometry args={[28, 14]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
      {/* Wall Air Vents */}
      {[-8, -4, 0, 4, 8].map((x) => (
        <mesh key={`vent-${x}`} position={[x, 3, -11.9]}>
          <planeGeometry args={[2.5, 5]} />
          <meshStandardMaterial color="#1f2937" metalness={0.6} />
        </mesh>
      ))}

      {/* Ground Support Equipment (GSE) Integration Stand */}
      <group position={[0, -1.8, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.6, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Safety Railing */}
        <mesh position={[0, 0.4, 0]}>
          <torusGeometry args={[1.4, 0.04, 8, 24]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Stage 2: PSLV-C25 Rocket Liftoff from Sriharikota
 */
function LaunchEnvironment() {
  const smokeParticlesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (smokeParticlesRef.current) {
      smokeParticlesRef.current.position.y -= delta * 3.5;
      if (smokeParticlesRef.current.position.y < -12) {
        smokeParticlesRef.current.position.y = 0;
      }
    }
  });

  return (
    <group>
      <color attach="background" args={["#0c1a30"]} />
      <ambientLight intensity={0.6} color="#93c5fd" />
      <directionalLight position={[6, 8, 4]} intensity={2.6} color="#fed7aa" />
      <directionalLight position={[0, -4, 0]} intensity={3.5} color="#ea580c" />

      {/* Atmospheric Horizon Gradient (Bay of Bengal Coastline) */}
      <mesh position={[0, -16, -20]} rotation={[0, 0, 0]}>
        <planeGeometry args={[80, 40]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* Rocket Ascent Exhaust Smoke Trail */}
      <group ref={smokeParticlesRef} position={[0, -2, 0]}>
        {Array.from({ length: 18 }).map((_, i) => (
          <mesh
            key={`smoke-${i}`}
            position={[
              (Math.random() - 0.5) * 1.6,
              -1.2 - i * 0.7,
              (Math.random() - 0.5) * 1.6,
            ]}
          >
            <sphereGeometry args={[0.6 + i * 0.12, 12, 12]} />
            <meshStandardMaterial
              color={i < 4 ? "#fb923c" : "#94a3b8"}
              transparent
              opacity={0.65 - i * 0.02}
              roughness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* PSLV Fourth Stage Separation Ring below Mangalyaan */}
      <group position={[0, -2.2, 0]}>
        <mesh>
          <cylinderGeometry args={[1.05, 1.05, 1.2, 24, 1, true]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.4} side={THREE.DoubleSide} />
        </mesh>
        {/* PS4 Liquid Engines Nozzles (Twin Engines) */}
        {[-0.35, 0.35].map((x) => (
          <mesh key={`ps4-${x}`} position={[x, -0.7, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.2, 0.45, 16, 1, true]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Stage 3: Earth Orbit & Progressive Slingshot Trajectory
 */
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

      {/* 3D Realistic Earth Globe below */}
      <group position={[0, -11, -6]}>
        <mesh ref={earthRef} rotation={[0.4, 0, 0.2]}>
          <sphereGeometry args={[8.5, 64, 64]} />
          <meshStandardMaterial map={earthTexture} roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Earth Atmospheric Rayleigh Scattering Blue Rim */}
        <mesh scale={[1.03, 1.03, 1.03]}>
          <sphereGeometry args={[8.5, 48, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Trajectory Ellipse Arcs representing the 6 Perigee Burns */}
      <group position={[0, 0, 0]} rotation={[0.5, 0.3, 0]}>
        {[3.5, 5.0, 7.2, 9.5].map((rad, i) => (
          <mesh key={`orbit-line-${i}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[rad, rad + 0.03, 64]} />
            <meshBasicMaterial
              color={i === 3 ? "#f97316" : "#38bdf8"}
              transparent
              opacity={0.35 + i * 0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Stage 4: 298 Days Deep Interplanetary Cruise
 */
function InterplanetaryCruiseEnvironment() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.01;
    }
  });

  // Solar wind particle stream geometry
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

      {/* Distant Pinpoint Brilliant Sun */}
      <group position={[35, 18, 30]}>
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <pointLight intensity={6} distance={60} color="#fffbeb" />
      </group>

      {/* Tiny Pale Blue Dot (Earth far behind) */}
      <group position={[-25, -12, -28]}>
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Solar Wind Particle Stream */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial size={0.06} color="#fed7aa" transparent opacity={0.6} />
      </points>
    </group>
  );
}

/**
 * Stage 5: Mars Approach Phase
 */
function MarsApproachEnvironment() {
  const marsTexture = useLoader(THREE.TextureLoader, "/textures/mars.jpg");
  const marsRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (marsRef.current) marsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <group>
      <color attach="background" args={["#03050c"]} />
      <Stars radius={85} depth={35} count={3800} factor={3.5} fade speed={0.3} />
      <ambientLight intensity={0.2} color="#fed7aa" />
      <directionalLight position={[10, 4, 8]} intensity={2.8} color="#ffedd5" />

      {/* Mars Globe Growing Ahead */}
      <group position={[0, -2, -14]}>
        <mesh ref={marsRef} rotation={[0.4, 0, 0]}>
          <sphereGeometry args={[7.0, 64, 64]} />
          <meshStandardMaterial map={marsTexture} roughness={0.8} metalness={0.1} />
        </mesh>
        {/* Thin Atmospheric Salmon Rim */}
        <mesh scale={[1.025, 1.025, 1.025]}>
          <sphereGeometry args={[7.0, 48, 48]} />
          <meshBasicMaterial color="#fb923c" transparent opacity={0.2} side={THREE.BackSide} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Stage 6: Mars Orbit Insertion (MOI) - Dark Limb Braking Burn
 */
function MarsInsertionEnvironment() {
  const marsTexture = useLoader(THREE.TextureLoader, "/textures/mars.jpg");

  return (
    <group>
      <color attach="background" args={["#010204"]} />
      <Stars radius={75} depth={30} count={3200} factor={3.5} fade speed={0.15} />

      {/* Deep Shadow on Martian Nightside; Sun is occulted behind the planet */}
      <ambientLight intensity={0.05} color="#1e1b4b" />
      <directionalLight position={[-15, 2, -15]} intensity={0.4} color="#7c2d12" />

      {/* Giant Mars Limb Curving Directly Beside Probe in Total Darkness */}
      <group position={[0, -10.5, 0]}>
        <mesh rotation={[0.3, 0, 0]}>
          <sphereGeometry args={[10.5, 64, 64]} />
          <meshStandardMaterial map={marsTexture} roughness={0.9} color="#381b16" />
        </mesh>
        {/* Subtle dark red twilight terminator glow */}
        <mesh position={[4, 8, -4]}>
          <ringGeometry args={[10.5, 10.7, 48]} />
          <meshBasicMaterial color="#ea580c" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Stage 7: Eight Years of Science (High Elliptical Mars Orbit)
 */
function MarsScienceOrbitEnvironment() {
  const marsTexture = useLoader(THREE.TextureLoader, "/textures/mars.jpg");
  const marsRef = useRef<THREE.Mesh>(null);
  const phobosRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (marsRef.current) marsRef.current.rotation.y += delta * 0.015;
    if (phobosRef.current) phobosRef.current.rotation.x += delta * 0.04;
  });

  return (
    <group>
      <color attach="background" args={["#020409"]} />
      <Stars radius={90} depth={40} count={3600} factor={4} fade speed={0.3} />
      <ambientLight intensity={0.25} color="#fed7aa" />
      <directionalLight position={[12, 6, 8]} intensity={3.2} color="#fffbeb" />

      {/* Mars Globe in Full Disc (Vantage from 76,000 km apoapsis) */}
      <group position={[0, -6, -10]}>
        <mesh ref={marsRef} rotation={[0.4, 0, 0.2]}>
          <sphereGeometry args={[5.2, 64, 64]} />
          <meshStandardMaterial map={marsTexture} roughness={0.8} />
        </mesh>
        <mesh scale={[1.025, 1.025, 1.025]}>
          <sphereGeometry args={[5.2, 48, 48]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.22} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Mars Moon Phobos Flyby */}
      <group position={[5.5, 2.5, -4]}>
        <mesh ref={phobosRef}>
          <dodecahedronGeometry args={[0.35, 1]} />
          <meshStandardMaterial color="#52525b" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Stage 8: The Silent Orbit & April 2022 Eclipse
 */
function MarsEclipseEnvironment() {
  const marsTexture = useLoader(THREE.TextureLoader, "/textures/mars.jpg");

  return (
    <group>
      <color attach="background" args={["#000000"]} />
      <Stars radius={95} depth={45} count={4000} factor={3.0} fade speed={0.1} />
      <ambientLight intensity={0.03} color="#ffffff" />

      {/* Mars in Silhouette Blocking the Sun completely */}
      <group position={[0, -4, -8]}>
        <mesh rotation={[0.4, 0, 0]}>
          <sphereGeometry args={[6.2, 64, 64]} />
          <meshStandardMaterial map={marsTexture} roughness={0.95} color="#0c0705" />
        </mesh>
        {/* Deep penumbra corona halo */}
        <mesh scale={[1.015, 1.015, 1.015]}>
          <sphereGeometry args={[6.2, 48, 48]} />
          <meshBasicMaterial color="#b45309" transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
      </group>
    </group>
  );
}
