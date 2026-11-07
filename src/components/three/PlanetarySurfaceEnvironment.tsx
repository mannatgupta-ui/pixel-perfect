import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import type { Artifact, BodyId } from "@/data/types";

interface Props {
  artifact: Artifact;
}

export function PlanetarySurfaceEnvironment({ artifact }: Props) {
  const bodyId = artifact.bodyId;
  const isOrbiter = artifact.kind === "orbiter" || artifact.kind === "atmospheric-probe";
  const isDeepSpace = artifact.kind === "deep-space-probe" || !bodyId;

  if (isDeepSpace) {
    return <DeepSpaceEnvironment />;
  }

  if (isOrbiter) {
    return <OrbitalEnvironment bodyId={bodyId ?? "mars"} />;
  }

  if (bodyId === "moon") {
    return <MoonSurfaceEnvironment artifact={artifact} />;
  }

  if (bodyId === "venus") {
    return <VenusSurfaceEnvironment />;
  }

  if (artifact.id === "huygens" || (bodyId as string) === "titan") {
    return <TitanSurfaceEnvironment />;
  }

  if (artifact.id === "philae" || bodyId === "mercury") {
    return <CometOrMercuryEnvironment isMercury={bodyId === "mercury"} />;
  }

  // Default planetary surface: Mars
  return <MarsSurfaceEnvironment artifact={artifact} />;
}

/**
 * MARS IN-SITU SURFACE ENVIRONMENT
 * Exact reproduction of Mars as seen from the surface:
 * - Butterscotch / salmon pink sky with atmospheric dust scattering
 * - Rust-colored regolith terrain with dunes and basalt rocks
 * - Distant crater rim / Columbia Hills silhouette
 * - Rover wheel tracks in the sand
 */
function MarsSurfaceEnvironment({ artifact }: { artifact: Artifact }) {
  const isSpirit = artifact.id === "spirit";
  const isInSight = artifact.id === "insight";
  const isPhoenix = artifact.id === "phoenix";
  const isCuriosityOrPercy = artifact.id === "curiosity" || artifact.id === "perseverance";

  return (
    <group>
      {/* Martian Atmospheric Color & Dust Fog */}
      <color attach="background" args={["#b45309"]} />
      <fog attach="fog" args={["#92400e", 8, 38]} />

      {/* Solar Illumination on Mars: Warm low-density solar spectrum */}
      <ambientLight intensity={0.55} color="#fed7aa" />
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.0}
        color="#fff1e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Secondary diffuse bounce light from Martian red soil */}
      <directionalLight position={[-5, 2, -4]} intensity={0.6} color="#c2410c" />

      {/* Primary Martian Regolith Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[70, 70, 32, 32]} />
        <meshStandardMaterial
          color={isPhoenix ? "#9a3412" : "#c2410c"}
          roughness={0.92}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* Fine Sand Ripple Dunes Around Landing Site */}
      {[-3, -1, 1.5, 3.5].map((z, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0.2 * idx]} position={[0, -0.01, z]}>
          <planeGeometry args={[12, 1.8]} />
          <meshStandardMaterial color="#9a3412" roughness={0.96} />
        </mesh>
      ))}

      {/* Basalt Rocks & Ventifact Boulders Scattered On Surface */}
      <group>
        {/* Near Boulders */}
        <mesh position={[-1.8, 0.12, 1.4]} rotation={[0.2, 0.6, 0.1]}>
          <dodecahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#572813" roughness={0.88} />
        </mesh>
        <mesh position={[2.2, 0.18, 0.8]} rotation={[0.4, 0.2, 0.5]}>
          <dodecahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#431c0e" roughness={0.85} />
        </mesh>
        <mesh position={[1.4, 0.08, -1.6]} rotation={[0.1, 0.9, 0.3]}>
          <dodecahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#572813" roughness={0.9} />
        </mesh>
        <mesh position={[-2.4, 0.25, -1.8]} rotation={[0.6, 0.4, 0.2]}>
          <dodecahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#3b160a" roughness={0.85} />
        </mesh>
        <mesh position={[-0.8, 0.05, 2.2]} rotation={[0.3, 0.1, 0.4]}>
          <dodecahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color="#572813" roughness={0.92} />
        </mesh>
        <mesh position={[3.1, 0.15, -0.7]} rotation={[0.5, 0.8, 0.2]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#4a1e0d" roughness={0.88} />
        </mesh>
      </group>

      {/* Distant Crater Rim Ridges / Columbia Hills Horizon */}
      <group position={[0, 0, -22]}>
        {[-14, -7, 0, 7, 14].map((x, i) => (
          <mesh key={i} position={[x, 1.8 + Math.sin(i * 1.5) * 0.8, -2]}>
            <coneGeometry args={[6.5, 3.8, 5]} />
            <meshStandardMaterial color="#782706" roughness={0.95} />
          </mesh>
        ))}
      </group>

      {/* Rover Wheel Tracks in Martian Sand */}
      {(artifact.kind === "rover" || isSpirit || isCuriosityOrPercy) && (
        <group position={[0, 0.005, 0]}>
          {[-0.62, 0.62].map((x) => (
            <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, -2]}>
              <planeGeometry args={[0.16, 4]} />
              <meshStandardMaterial color="#7c2d12" roughness={0.98} />
            </mesh>
          ))}
        </group>
      )}

      {/* InSight-Specific: Deployed SEIS Seismometer Dome on the regolith */}
      {isInSight && (
        <group position={[1.4, 0.06, 0.8]}>
          {/* Copper Wind & Thermal Shield Dome */}
          <mesh>
            <sphereGeometry args={[0.22, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#ea580c" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Tether connecting back to lander */}
          <mesh position={[-0.7, 0.01, -0.4]} rotation={[0, -0.5, 0]}>
            <boxGeometry args={[1.5, 0.015, 0.04]} />
            <meshStandardMaterial color="#c2410c" roughness={0.7} />
          </mesh>
        </group>
      )}

      {/* Phoenix-Specific: Polygonal Ice Troughs & Subsurface Water-Ice Trench */}
      {isPhoenix && (
        <group position={[0, 0.01, 1.2]}>
          <mesh rotation={[-Math.PI / 2, 0, 0.4]}>
            <ringGeometry args={[2.0, 2.15, 6]} />
            <meshStandardMaterial color="#fed7aa" roughness={0.7} />
          </mesh>
          {/* Snow White Trench showing exposed ice */}
          <mesh position={[0.8, 0.005, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.5, 0.2]} />
            <meshStandardMaterial color="#e0f2fe" roughness={0.2} metalness={0.4} />
          </mesh>
        </group>
      )}

      {/* Spirit-Specific: Troy Sand Trap Depression under Right Wheels */}
      {isSpirit && (
        <mesh position={[0.65, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.7, 16]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.98} />
        </mesh>
      )}
    </group>
  );
}

/**
 * MOON IN-SITU SURFACE ENVIRONMENT
 * Exact reproduction of the Moon's surface:
 * - Pitch-black sky with non-twinkling stars
 * - Harsh, razor-sharp high-contrast directional sunlight
 * - Charcoal-gray regolith terrain and impact craters
 * - The Blue-and-White Marble EARTH hanging in the sky!
 * - South polar long shadows for Chandrayaan-3
 */
function MoonSurfaceEnvironment({ artifact }: { artifact: Artifact }) {
  const isChandrayaan = artifact.id === "chandrayaan-3";
  const isApollo11 = artifact.id === "apollo-11-descent";
  const earthRef = useRef<THREE.Group>(null);

  // Rotate Earth slowly in the lunar sky
  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group>
      {/* Lunar Sky: Pitch Black Vacuum */}
      <color attach="background" args={["#000000"]} />
      <Stars radius={80} depth={40} count={3500} factor={4} fade speed={0} />

      {/* Harsh, Non-Diffused Direct Solar Illumination */}
      <ambientLight intensity={0.12} color="#94a3b8" />
      <directionalLight
        position={isChandrayaan ? [8, 2.2, 4] : [7, 9, 5]}
        intensity={3.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      {/* Faint earthshine bounce */}
      <directionalLight position={[-6, 4, -4]} intensity={0.2} color="#38bdf8" />

      {/* THE EARTH HANGING IN THE LUNAR SKY ("Earthrise") */}
      <group ref={earthRef} position={[-12, 14, -20]}>
        {/* Ocean Core Sphere */}
        <mesh>
          <sphereGeometry args={[2.4, 32, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Continents Pattern */}
        <mesh scale={[1.002, 1.002, 1.002]}>
          <sphereGeometry args={[2.4, 16, 16]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} wireframe={false} opacity={0.65} transparent />
        </mesh>
        {/* Cloud Layer */}
        <mesh scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[2.4, 24, 24]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.45} roughness={0.9} />
        </mesh>
        {/* Blue Atmospheric Rayleigh Glow Ring */}
        <mesh scale={[1.08, 1.08, 1.08]}>
          <sphereGeometry args={[2.4, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Lunar Regolith Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[70, 70, 32, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.95} metalness={0.05} flatShading />
      </mesh>

      {/* Shallow Impact Crater Rings */}
      <group position={[3.5, 0.005, -3]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.7, 24]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
      </group>
      <group position={[-4, 0.005, 2.5]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 1.9, 20]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
      </group>

      {/* Lunar Anorthosite Rocks & Ejecta Stones */}
      <group>
        <mesh position={[-1.6, 0.14, 1.2]} rotation={[0.3, 0.5, 0.1]}>
          <dodecahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <mesh position={[2.4, 0.1, 1.5]} rotation={[0.6, 0.1, 0.4]}>
          <dodecahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.75} />
        </mesh>
        <mesh position={[1.8, 0.18, -1.8]} rotation={[0.2, 0.8, 0.3]}>
          <dodecahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#475569" roughness={0.85} />
        </mesh>
        <mesh position={[-2.8, 0.08, -1.2]} rotation={[0.1, 0.2, 0.7]}>
          <dodecahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
      </group>

      {/* Chandrayaan-3 Shiv Shakti Point Specific Elements */}
      {isChandrayaan && (
        <group>
          {/* Pragyan Rover Wheel Tracks Leading Out from the Ramp */}
          <group position={[0, 0.005, 2.2]}>
            {[-0.15, 0.15].map((x) => (
              <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
                <planeGeometry args={[0.06, 2.4]} />
                <meshStandardMaterial color="#1e293b" roughness={0.98} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* Apollo 11 Mare Tranquillitatis Specific: Footprints & Distant Flag */}
      {isApollo11 && (
        <group position={[-3.5, 0, 1.5]}>
          {/* Gold Foil EASEP Experiment Box */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Laser Ranging Retroreflector (LRRR) */}
          <mesh position={[1.2, 0.12, 0.4]}>
            <boxGeometry args={[0.35, 0.25, 0.35]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* American Flag Placed in Regolith */}
          <group position={[3.8, 0, -2.5]}>
            {/* Pole */}
            <mesh position={[0, 0.75, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 1.5, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
            </mesh>
            {/* Flag Fabric */}
            <mesh position={[0.3, 1.3, 0]}>
              <planeGeometry args={[0.6, 0.35]} />
              <meshStandardMaterial color="#ef4444" roughness={0.8} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
}

/**
 * TITAN IN-SITU SURFACE ENVIRONMENT (Huygens Probe)
 * - Deep orange-amber photochemical smog sky
 * - Dense orange haze
 * - Dark hydrocarbon riverbed with rounded water-ice pebbles
 */
function TitanSurfaceEnvironment() {
  return (
    <group>
      <color attach="background" args={["#c2410c"]} />
      <fog attach="fog" args={["#9a3412", 4, 22]} />

      <ambientLight intensity={0.7} color="#fed7aa" />
      <directionalLight position={[3, 6, 2]} intensity={1.2} color="#fdba74" />

      {/* Dark Orange Hydrocarbon Riverbed Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#451a03" roughness={0.88} />
      </mesh>

      {/* Rounded Water-Ice Pebbles as Imaged by Huygens DISR Camera */}
      {[-1.5, -0.8, 0.9, 1.6, -2.1, 2.2].map((x, i) => (
        <mesh key={i} position={[x, 0.06, ((i * 1.7) % 3) - 1.5]} scale={[1.4, 0.7, 1]}>
          <sphereGeometry args={[0.12 + (i % 3) * 0.06, 12, 12]} />
          <meshStandardMaterial color="#78350f" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * VENUS IN-SITU SURFACE ENVIRONMENT (Venera 7, 9, 13)
 * - Superheated 93-bar supercritical CO2 atmosphere
 * - Yellowish-green sulfuric acid cloud haze
 * - Cracked dark basalt lava slabs
 */
function VenusSurfaceEnvironment() {
  return (
    <group>
      <color attach="background" args={["#84cc16"]} />
      <fog attach="fog" args={["#713f12", 3, 20]} />

      <ambientLight intensity={0.9} color="#fde047" />
      <directionalLight position={[0, 8, 2]} intensity={1.5} color="#fef08a" />

      {/* Cracked Dark Basalt Slab Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#1c1917" roughness={0.9} />
      </mesh>

      {/* Lava Fracture Lines */}
      {[-2, 0.5, 2.2].map((z, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0.3 * i]} position={[0, -0.015, z]}>
          <planeGeometry args={[14, 0.08]} />
          <meshBasicMaterial color="#ea580c" />
        </mesh>
      ))}
    </group>
  );
}

/**
 * COMET 67P / MERCURY IN-SITU ENVIRONMENT (Philae / MESSENGER)
 */
function CometOrMercuryEnvironment({ isMercury }: { isMercury: boolean }) {
  return (
    <group>
      <color attach="background" args={["#000000"]} />
      <Stars radius={70} depth={30} count={3000} factor={3.5} />

      <ambientLight intensity={isMercury ? 0.4 : 0.08} />
      <directionalLight position={[5, 7, 4]} intensity={isMercury ? 4.5 : 1.8} color="#ffffff" />

      {/* Dark Graphite Regolith / Carbon Ice Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color={isMercury ? "#1e293b" : "#0f172a"} roughness={0.95} />
      </mesh>

      {/* Philae's Abydos Cliff Overhang Wall */}
      {!isMercury && (
        <mesh position={[-3.5, 2.5, -2]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[4, 6, 2]} />
          <meshStandardMaterial color="#020617" roughness={0.98} />
        </mesh>
      )}
    </group>
  );
}

/**
 * ORBITAL IN-SITU ENVIRONMENT (Mangalyaan, Cassini, MAVEN, Mars Express)
 * Curved giant planet body below with glowing atmosphere rim
 */
function OrbitalEnvironment({ bodyId }: { bodyId: BodyId }) {
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.015;
    }
  });

  const planetColor =
    bodyId === "mars"
      ? "#c2410c"
      : bodyId === "saturn"
      ? "#eab308"
      : bodyId === "jupiter"
      ? "#d97706"
      : "#64748b";

  return (
    <group>
      <color attach="background" args={["#030712"]} />
      <Stars radius={80} depth={40} count={3500} factor={4} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 5, 6]} intensity={2.6} color="#fffbeb" />

      {/* Massive Curved Planet Sphere Below Spacecraft */}
      <mesh ref={planetRef} position={[0, -18, -4]}>
        <sphereGeometry args={[16, 48, 48]} />
        <meshStandardMaterial color={planetColor} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Saturn's Rings if body is Saturn */}
      {bodyId === "saturn" && (
        <mesh position={[0, -18, -4]} rotation={[1.1, 0.2, 0]}>
          <ringGeometry args={[19, 28, 64]} />
          <meshStandardMaterial
            color="#fde047"
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
            roughness={0.6}
          />
        </mesh>
      )}

      {/* Atmospheric Rayleigh Scattering Glow Rim */}
      <mesh position={[0, -18, -4]} scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[16, 32, 32]} />
        <meshBasicMaterial
          color={bodyId === "mars" ? "#fb923c" : "#38bdf8"}
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/**
 * DEEP SPACE & INTERSTELLAR HELIOPAUSE ENVIRONMENT (Voyager 1/2, New Horizons)
 */
function DeepSpaceEnvironment() {
  return (
    <group>
      <color attach="background" args={["#020617"]} />
      <Stars radius={90} depth={50} count={4500} factor={5} speed={0.2} />

      <ambientLight intensity={0.25} color="#38bdf8" />
      <directionalLight position={[10, 6, 8]} intensity={1.8} color="#ffffff" />

      {/* Distant Pinpoint Brilliant Sun Star */}
      <group position={[35, 20, -50]}>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        <mesh scale={[2.5, 2.5, 2.5]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#fef08a" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}
