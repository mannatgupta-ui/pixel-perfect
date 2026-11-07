import { motion } from "framer-motion";
import { getArtifact } from "@/data/artifacts";

interface SceneProps {
  artifactId: string;
  stageId: string;
  speed: number;
}

/**
 * Universal Multi-Mission Animation Scene Router
 * Supports all 37 museum artifacts with dedicated vector illustrations
 */
export function MultiMissionAnimationScene({ artifactId, stageId, speed }: SceneProps) {
  // Mars Archetypes
  if (artifactId === "curiosity") return <CuriosityScene stageId={stageId} speed={speed} />;
  if (artifactId === "perseverance") return <PerseveranceScene stageId={stageId} speed={speed} />;
  if (artifactId === "ingenuity") return <IngenuityScene stageId={stageId} speed={speed} />;
  if (artifactId === "insight") return <InSightScene stageId={stageId} speed={speed} />;
  if (artifactId === "pathfinder") return <PathfinderScene stageId={stageId} speed={speed} />;
  if (artifactId === "sojourner") return <SojournerScene stageId={stageId} speed={speed} />;
  if (artifactId === "viking-1" || artifactId === "viking-2") return <VikingScene artifactId={artifactId} stageId={stageId} speed={speed} />;
  if (artifactId === "phoenix") return <PhoenixScene stageId={stageId} speed={speed} />;
  if (artifactId === "beagle-2") return <Beagle2Scene stageId={stageId} speed={speed} />;
  if (artifactId === "schiaparelli") return <SchiaparelliScene stageId={stageId} speed={speed} />;
  if (artifactId === "opportunity") return <OpportunityScene stageId={stageId} speed={speed} />;
  if (artifactId === "spirit") return <SpiritScene stageId={stageId} speed={speed} />;
  if (artifactId === "mangalyaan") return <MangalyaanScene stageId={stageId} speed={speed} />;

  // Lunar Archetypes
  if (artifactId === "chandrayaan-3" || artifactId === "chandrayaan-2") {
    return <ChandrayaanScene artifactId={artifactId} stageId={stageId} speed={speed} />;
  }
  if (artifactId === "chandrayaan-1") return <Chandrayaan1Scene stageId={stageId} speed={speed} />;
  if (artifactId === "smart-1") return <Smart1Scene stageId={stageId} speed={speed} />;
  if (artifactId === "surveyor-3") return <Surveyor3Scene stageId={stageId} speed={speed} />;
  if (artifactId.startsWith("apollo-")) return <ApolloScene artifactId={artifactId} stageId={stageId} speed={speed} />;

  // Outer Planets & Deep Space Archetypes
  if (artifactId === "cassini") return <CassiniScene stageId={stageId} speed={speed} />;
  if (artifactId === "huygens") return <HuygensScene stageId={stageId} speed={speed} />;
  if (artifactId === "new-horizons") return <NewHorizonsScene stageId={stageId} speed={speed} />;
  if (artifactId === "galileo") return <GalileoScene stageId={stageId} speed={speed} />;
  if (artifactId === "messenger") return <MessengerScene stageId={stageId} speed={speed} />;
  if (artifactId === "magellan") return <MagellanScene stageId={stageId} speed={speed} />;
  if (artifactId === "pioneer-venus-multiprobe") return <PioneerVenusScene stageId={stageId} speed={speed} />;
  if (artifactId === "voyager-1" || artifactId === "voyager-2") return <VoyagerScene artifactId={artifactId} stageId={stageId} speed={speed} />;
  if (artifactId === "pioneer-10" || artifactId === "pioneer-11") return <PioneerScene artifactId={artifactId} stageId={stageId} speed={speed} />;
  if (artifactId === "philae") return <PhilaeScene stageId={stageId} speed={speed} />;

  // Fallback to archetype-based rendering using artifact metadata
  const artifact = getArtifact(artifactId);
  if (artifact?.kind === "rover") return <GenericRoverScene artifactName={artifact.name} bodyId={artifact.bodyId ?? "mars"} speed={speed} />;
  if (artifact?.kind === "lander" || artifact?.kind === "descent-stage") return <GenericLanderScene artifactName={artifact.name} bodyId={artifact.bodyId ?? "moon"} speed={speed} />;
  if (artifact?.kind === "orbiter") return <GenericOrbiterScene artifactName={artifact.name} bodyId={artifact.bodyId ?? "mars"} speed={speed} />;
  return <GenericDeepSpaceScene artifactName={artifact?.name ?? artifactId} speed={speed} />;
}

/* ────────────────────────────────────────────────────────────────
 * Mars Scenes
 * ──────────────────────────────────────────────────────────────── */

export function CuriosityScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#0c0705" />
        {/* Layered Martian Mountains (Mount Sharp) */}
        <polygon points="0,320 280,210 520,290 780,180 1000,280 1000,600 0,600" fill="#2d130a" />
        <polygon points="0,380 320,310 650,370 1000,330 1000,600 0,600" fill="#5c2010" />
        <polygon points="0,440 450,420 1000,450 1000,600 0,600" fill="#9a3412" />

        {/* Rover Chassis (1-ton nuclear MMRTG rover) */}
        <g transform="translate(420, 310)">
          {/* MMRTG Nuclear Power unit at rear */}
          <rect x="-35" y="15" width="45" height="30" rx="4" fill="#334155" stroke="#0ea5e9" strokeWidth="1.5" />
          <line x1="-30" y1="20" x2="-30" y2="40" stroke="#64748b" strokeWidth="2" />
          <line x1="-20" y1="20" x2="-20" y2="40" stroke="#64748b" strokeWidth="2" />
          <line x1="-10" y1="20" x2="-10" y2="40" stroke="#64748b" strokeWidth="2" />
          <circle cx="-12" cy="30" r="3" fill="#f59e0b" className="animate-pulse" />

          {/* Main Body */}
          <rect x="0" y="0" width="140" height="55" rx="8" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <text x="70" y="32" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="10" fontWeight="bold">
            NASA · CURIOSITY
          </text>

          {/* Mast & ChemCam Laser */}
          <line x1="110" y1="0" x2="110" y2="-75" stroke="#94a3b8" strokeWidth="5" />
          <rect x="96" y="-90" width="28" height="18" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="104" cy="-81" r="4" fill="#0284c7" />
          <circle cx="116" cy="-81" r="3" fill="#ef4444" />
          {/* Laser beam pulse */}
          <line x1="116" y1="-81" x2="260" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.8" />
          <circle cx="260" cy="80" r="6" fill="#ef4444" opacity="0.6" />

          {/* Robotic Arm with Drill */}
          <polyline points="20,40 50,70 90,85" stroke="#64748b" strokeWidth="4" fill="none" />
          <rect x="85" y="80" width="16" height="12" rx="2" fill="#1e293b" />

          {/* 6 Rocker-Bogie Wheels */}
          {[-15, 30, 80, 130, 175].map((x, i) => (
            <g key={i}>
              <line x1={x < 70 ? 20 : 110} y1="45" x2={x} y2="85" stroke="#475569" strokeWidth="3" />
              <circle cx={x} cy="88" r="16" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
              <circle cx={x} cy="88" r="6" fill="#94a3b8" />
            </g>
          ))}
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          CURIOSITY (MSL) · NUCLEAR GEOLOGIST ON MOUNT SHARP, GALE CRATER
        </text>
      </svg>
    </motion.div>
  );
}

export function PerseveranceScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#0b0808" />
        {/* Jezero River Delta & Crater Rim */}
        <polygon points="0,340 300,240 600,300 850,210 1000,290 1000,600 0,600" fill="#3b130e" />
        <path d="M 0 420 Q 300 370 600 420 T 1000 400 L 1000 600 L 0 600 Z" fill="#7c2d12" />
        <ellipse cx="780" cy="460" rx="140" ry="25" fill="#451a03" opacity="0.6" />

        {/* Rover Chassis */}
        <g transform="translate(360, 310)">
          {/* MMRTG */}
          <rect x="-35" y="15" width="45" height="30" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="0" y="0" width="145" height="58" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <text x="72" y="32" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            PERSEVERANCE · MARS 2020
          </text>

          {/* SuperCam Mast */}
          <line x1="115" y1="0" x2="115" y2="-80" stroke="#94a3b8" strokeWidth="5" />
          <rect x="100" y="-96" width="30" height="20" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
          <circle cx="110" cy="-86" r="4" fill="#22d3ee" />
          <circle cx="122" cy="-86" r="3" fill="#f43f5e" />

          {/* Sample Depot Tubes deposited on the ground */}
          <g transform="translate(190, 80)">
            <rect x="0" y="0" width="18" height="4" rx="2" fill="#e2e8f0" stroke="#f59e0b" strokeWidth="1" />
            <rect x="25" y="5" width="18" height="4" rx="2" fill="#e2e8f0" stroke="#f59e0b" strokeWidth="1" />
            <text x="20" y="22" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="9">
              SEALED SAMPLE DEPOT
            </text>
          </g>

          {/* Robotic Arm with PIXL & SHERLOC */}
          <polyline points="20,40 60,75 110,85" stroke="#64748b" strokeWidth="4" fill="none" />
          <circle cx="110" cy="85" r="7" fill="#0284c7" />

          {/* 6 Wheels */}
          {[-15, 30, 80, 130, 175].map((x, i) => (
            <g key={i}>
              <line x1={x < 70 ? 20 : 110} y1="45" x2={x} y2="85" stroke="#475569" strokeWidth="3" />
              <circle cx={x} cy="88" r="16" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2.5" />
              <circle cx={x} cy="88" r="6" fill="#64748b" />
            </g>
          ))}
        </g>

        {/* Ingenuity Helicopter in distant sky */}
        <g transform="translate(760, 190) scale(0.7)">
          <line x1="-35" y1="-8" x2="35" y2="-8" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
          <line x1="-35" y1="2" x2="35" y2="2" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
          <rect x="-10" y="8" width="20" height="15" rx="3" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="-12" y1="23" x2="-20" y2="35" stroke="#94a3b8" strokeWidth="2" />
          <line x1="12" y1="23" x2="20" y2="35" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="0" cy="240" rx="16" ry="4" fill="#1c1917" opacity="0.4" />
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          PERSEVERANCE · JEZERO CRATER DELTA & SAMPLE RETURN DEPOT
        </text>
      </svg>
    </motion.div>
  );
}

export function IngenuityScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#120907" />
        {/* Rippling Sand Dunes */}
        <path d="M0 450 Q 250 420 500 460 T 1000 440 L 1000 600 L 0 600 Z" fill="#9a3412" />
        <path d="M0 500 Q 350 470 700 510 T 1000 490 L 1000 600 L 0 600 Z" fill="#7c2d12" />

        {/* Shadow on Martian Sand */}
        <ellipse cx="500" cy="510" rx="90" ry="18" fill="#1c1917" opacity="0.55" />

        {/* Hovering Ingenuity Helicopter */}
        <g transform="translate(500, 240)">
          {/* Solar Panel & Wright Brothers Cloth */}
          <rect x="-40" y="-120" width="80" height="15" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="-8" y="-105" width="16" height="8" fill="#d97706" />

          {/* Mast & Rotor Swashplates */}
          <line x1="0" y1="-105" x2="0" y2="0" stroke="#cbd5e1" strokeWidth="5" />

          {/* Upper Rotor Blades (Spinning Blur) */}
          <g>
            <ellipse cx="0" cy="-75" rx="190" ry="10" fill="#38bdf8" opacity="0.4" />
            <line x1="-190" y1="-75" x2="190" y2="-75" stroke="#0284c7" strokeWidth="4" />
          </g>

          {/* Lower Rotor Blades (Counter-Rotating Blur) */}
          <g>
            <ellipse cx="0" cy="-45" rx="190" ry="10" fill="#38bdf8" opacity="0.4" />
            <line x1="-180" y1="-43" x2="180" y2="-47" stroke="#0284c7" strokeWidth="4" />
          </g>

          {/* Main Body Fuselage (Cube with batteries and camera) */}
          <rect x="-28" y="0" width="56" height="52" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="0" cy="24" r="8" fill="#38bdf8" />
          <circle cx="0" cy="24" r="4" fill="#0f172a" />
          <text x="0" y="44" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="7" fontWeight="bold">
            INGENUITY
          </text>

          {/* 4 Carbon Fiber Landing Legs */}
          <line x1="-20" y1="45" x2="-80" y2="120" stroke="#94a3b8" strokeWidth="3" />
          <line x1="20" y1="45" x2="80" y2="120" stroke="#94a3b8" strokeWidth="3" />
          <line x1="-15" y1="48" x2="-45" y2="120" stroke="#64748b" strokeWidth="2.5" />
          <line x1="15" y1="48" x2="45" y2="120" stroke="#64748b" strokeWidth="2.5" />
          <circle cx="-80" cy="122" r="4" fill="#cbd5e1" />
          <circle cx="80" cy="122" r="4" fill="#cbd5e1" />
          <circle cx="-45" cy="122" r="3.5" fill="#cbd5e1" />
          <circle cx="45" cy="122" r="3.5" fill="#cbd5e1" />
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          INGENUITY MARS HELICOPTER · 72 POWERED FLIGHTS IN MARTIAN SKIES
        </text>
      </svg>
    </motion.div>
  );
}

export function InSightScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#130b08" />
        <ellipse cx="500" cy="480" rx="600" ry="140" fill="#9a3412" />

        {/* InSight Lander Chassis */}
        <g transform="translate(420, 310)">
          {/* Twin UltraFlex Circular Solar Arrays */}
          <circle cx="-130" cy="20" r="75" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" opacity="0.85" />
          <circle cx="210" cy="20" r="75" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" opacity="0.85" />

          {/* Lander Body */}
          <polygon points="0,40 15,0 65,0 80,40 70,60 10,60" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <text x="40" y="32" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            INSIGHT
          </text>

          {/* Landing Struts */}
          <line x1="10" y1="55" x2="-45" y2="120" stroke="#94a3b8" strokeWidth="4" />
          <line x1="70" y1="55" x2="125" y2="120" stroke="#94a3b8" strokeWidth="4" />
          <circle cx="-45" cy="122" r="10" fill="#64748b" />
          <circle cx="125" cy="122" r="10" fill="#64748b" />

          {/* Robotic Arm reaching to surface */}
          <polyline points="65,30 110,60 150,110" stroke="#64748b" strokeWidth="4" fill="none" />
        </g>

        {/* SEIS Seismometer Dome on the ground */}
        <g transform="translate(630, 420)">
          {/* Tether Cable */}
          <path d="M-80 -60 Q -30 -10 0 0" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          {/* Wind and Thermal Shield Dome */}
          <ellipse cx="0" cy="0" rx="38" ry="24" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <ellipse cx="0" cy="-6" rx="20" ry="12" fill="#b45309" />
          {/* Seismic wave ripples radiating from ground */}
          <ellipse cx="0" cy="10" rx="60" ry="15" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
          <ellipse cx="0" cy="10" rx="100" ry="25" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.5" />
          <text x="0" y="38" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="9">
            SEIS · 1,319 MARSQUAKES
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          INSIGHT · LISTENING TO THE DEEP INTERIOR CORE OF MARS (ELYSIUM PLANITIA)
        </text>
      </svg>
    </motion.div>
  );
}

export function PathfinderScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#130b08" />
        <ellipse cx="500" cy="480" rx="650" ry="150" fill="#9a3412" />

        {/* Carl Sagan Memorial Station Petals */}
        <g transform="translate(420, 340)">
          {/* Deflated Airbag remnants */}
          <path d="M-80 60 Q -40 20 0 50 Q 40 80 80 50 Q 120 20 160 60 Z" fill="#94a3b8" opacity="0.6" />

          {/* Three Unfolded Solar Petals */}
          <polygon points="40,20 -60,60 10,70" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <polygon points="40,20 140,60 70,70" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <polygon points="10,70 70,70 40,110" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />

          {/* Central Lander Station */}
          <polygon points="20,20 60,20 70,60 10,60" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          {/* IMP Camera Mast */}
          <line x1="40" y1="20" x2="40" y2="-50" stroke="#94a3b8" strokeWidth="4" />
          <circle cx="34" cy="-52" r="5" fill="#0284c7" />
          <circle cx="46" cy="-52" r="5" fill="#0284c7" />

          {/* Deployment Ramp */}
          <polygon points="30,60 50,60 85,110 5,110" fill="#475569" stroke="#334155" strokeWidth="1" />
        </g>

        {/* Sojourner Rover on the ground nearby */}
        <g transform="translate(620, 420)">
          <rect x="0" y="0" width="45" height="20" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <line x1="5" y1="18" x2="5" y2="28" stroke="#475569" strokeWidth="2" />
          <line x1="22" y1="18" x2="22" y2="28" stroke="#475569" strokeWidth="2" />
          <line x1="40" y1="18" x2="40" y2="28" stroke="#475569" strokeWidth="2" />
          <circle cx="5" cy="28" r="6" fill="#1e293b" />
          <circle cx="22" cy="28" r="6" fill="#1e293b" />
          <circle cx="40" cy="28" r="6" fill="#1e293b" />
          {/* Rock Barnacle Bill */}
          <polygon points="65,10 85,0 95,30 60,32" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          <text x="75" y="45" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9">
            BARNACLE BILL
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          MARS PATHFINDER & SOJOURNER · CARL SAGAN MEMORIAL STATION (ARES VALLIS)
        </text>
      </svg>
    </motion.div>
  );
}

export function SojournerScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#110906" />
        <ellipse cx="500" cy="460" rx="600" ry="140" fill="#9a3412" />

        {/* Prominent Rock Yogi */}
        <polygon points="180,320 280,240 340,360 160,370" fill="#78350f" stroke="#451a03" strokeWidth="2" />
        <text x="250" y="390" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="10">
          ROCK 'YOGI'
        </text>

        {/* Giant Hero View of Sojourner */}
        <g transform="translate(460, 310)">
          {/* Wheel track indentations in regolith */}
          <line x1="-120" y1="85" x2="-10" y2="85" stroke="#7c2d12" strokeWidth="6" strokeDasharray="8 4" />
          <line x1="-120" y1="105" x2="-10" y2="105" stroke="#7c2d12" strokeWidth="6" strokeDasharray="8 4" />

          {/* GaAs Solar Array on Top Deck */}
          <rect x="0" y="0" width="130" height="40" rx="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1={20 + i * 18} y1="0" x2={20 + i * 18} y2="40" stroke="#3b82f6" strokeWidth="1" />
          ))}
          <text x="65" y="24" textAnchor="middle" fill="#93c5fd" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            SOJOURNER · 10.6 KG
          </text>

          {/* APXS Instrument Sensor at rear sniffing rock */}
          <rect x="-25" y="25" width="25" height="15" rx="3" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="0" y1="32" x2="-25" y2="32" stroke="#64748b" strokeWidth="3" />

          {/* 6 Cleated Aluminum Wheels with Rocker-Bogie */}
          <polyline points="20,35 65,55 110,35" stroke="#475569" strokeWidth="4" fill="none" />
          {[15, 65, 115].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="45" x2={x} y2="85" stroke="#475569" strokeWidth="3" />
              <circle cx={x} cy="88" r="18" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
              <circle cx={x} cy="88" r="7" fill="#64748b" />
            </g>
          ))}
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          SOJOURNER ROVER · HUMANITY'S FIRST WHEELS ON ANOTHER WORLD (1997)
        </text>
      </svg>
    </motion.div>
  );
}

export function VikingScene({ artifactId, stageId, speed }: { artifactId: string; stageId: string; speed: number }) {
  const isViking2 = artifactId === "viking-2";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#130a08" />
        <ellipse cx="500" cy="480" rx="650" ry="140" fill={isViking2 ? "#7c2d12" : "#9a3412"} />

        {/* Winter Water-Ice Frost on Boulders for Viking 2 */}
        {isViking2 && (
          <g>
            <polygon points="220,380 290,320 360,390" fill="#451a03" />
            <polygon points="230,375 290,320 320,350" fill="#f8fafc" opacity="0.8" />
            <polygon points="680,390 750,330 810,400" fill="#451a03" />
            <polygon points="690,385 750,330 780,360" fill="#f8fafc" opacity="0.8" />
            <text x="750" y="425" textAnchor="middle" fill="#e2e8f0" fontFamily="IBM Plex Mono" fontSize="9">
              WATER-ICE FROST ON ROCKS
            </text>
          </g>
        )}

        {/* Viking Lander Body */}
        <g transform="translate(430, 310)">
          {/* Hexagonal Base */}
          <polygon points="10,40 30,10 110,10 130,40 100,70 40,70" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
          <text x="70" y="45" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="10" fontWeight="bold">
            {isViking2 ? "VIKING 2" : "VIKING 1"}
          </text>

          {/* Dual Facsimile Cameras */}
          <rect x="35" y="-20" width="12" height="30" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
          <rect x="95" y="-20" width="12" height="30" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />

          {/* Extendable Surface Sampler Boom digging into dirt */}
          <line x1="120" y1="40" x2="200" y2="105" stroke="#64748b" strokeWidth="4" />
          <rect x="195" y="100" width="15" height="12" rx="2" fill="#1e293b" />
          {/* Soil Trench */}
          <line x1="190" y1="115" x2="240" y2="115" stroke="#451a03" strokeWidth="5" />

          {/* 3 Landing Legs */}
          <line x1="25" y1="65" x2="-35" y2="125" stroke="#94a3b8" strokeWidth="5" />
          <line x1="115" y1="65" x2="165" y2="125" stroke="#94a3b8" strokeWidth="5" />
          <circle cx="-35" cy="127" r="14" fill="#64748b" />
          <circle cx="165" cy="127" r="14" fill="#64748b" />
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {isViking2
            ? "VIKING 2 LANDER · UTOPIA PLANITIA NORTHERN FROST OBSERVATION (1976)"
            : "VIKING 1 LANDER · CHRYSE PLANITIA BICENTENNIAL TOUCHDOWN (1976)"}
        </text>
      </svg>
    </motion.div>
  );
}

export function PhoenixScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#0f0907" />
        <ellipse cx="500" cy="480" rx="650" ry="140" fill="#9a3412" />

        {/* Excavated Arctic Ice Trench */}
        <g transform="translate(620, 420)">
          <rect x="0" y="0" width="100" height="24" rx="4" fill="#451a03" />
          {/* Pure White Water-Ice exposed below dirt */}
          <rect x="15" y="4" width="70" height="15" fill="#f8fafc" />
          <text x="50" y="38" textAnchor="middle" fill="#bae6fd" fontFamily="IBM Plex Mono" fontSize="9">
            SUB-SURFACE WATER ICE
          </text>
        </g>

        {/* Phoenix Lander Body */}
        <g transform="translate(420, 310)">
          {/* Twin Decagonal Solar Wings */}
          <polygon points="-110,20 -90,50 -50,50 -30,20 -50,-10 -90,-10" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
          <polygon points="190,20 170,50 130,50 110,20 130,-10 170,-10" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />

          {/* Main Body */}
          <polygon points="10,40 25,0 75,0 90,40 70,60 30,60" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <text x="50" y="32" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            PHOENIX
          </text>

          {/* Robotic Trenching Arm reaching to ice trench */}
          <polyline points="75,30 130,50 200,110" stroke="#64748b" strokeWidth="4" fill="none" />
          <rect x="195" y="105" width="16" height="12" rx="2" fill="#1e293b" />

          {/* Landing Struts */}
          <line x1="20" y1="55" x2="-35" y2="120" stroke="#94a3b8" strokeWidth="4" />
          <line x1="80" y1="55" x2="135" y2="120" stroke="#94a3b8" strokeWidth="4" />
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          PHOENIX LANDER · TOUCHING MARTIAN ARCTIC WATER ICE (VASTITAS BOREALIS)
        </text>
      </svg>
    </motion.div>
  );
}

export function Beagle2Scene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#100806" />
        <ellipse cx="500" cy="480" rx="600" ry="140" fill="#9a3412" />

        {/* Beagle 2 Pocket-Watch Clam Shell Body */}
        <g transform="translate(500, 390)">
          {/* Open Circular Base */}
          <circle cx="0" cy="0" r="45" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
          {/* Two fully unfolded solar petals */}
          <ellipse cx="-75" cy="-25" rx="35" ry="25" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
          <ellipse cx="75" cy="-25" rx="35" ry="25" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
          {/* Partially unfolded third petal blocking antenna */}
          <ellipse cx="0" cy="-65" rx="30" ry="20" fill="#1e3a8a" stroke="#f59e0b" strokeWidth="2" opacity="0.85" />
          <text x="0" y="5" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            BEAGLE 2
          </text>
        </g>

        {/* Discarded Parachute in distance */}
        <ellipse cx="740" cy="360" rx="40" ry="12" fill="#e2e8f0" opacity="0.7" />

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          BEAGLE 2 · REDISCOVERED INTACT ON ISIDIS PLANITIA (ESA / UK)
        </text>
      </svg>
    </motion.div>
  );
}

export function SchiaparelliScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#080404" />
        {/* Curving Mars Horizon */}
        <ellipse cx="500" cy="650" rx="700" ry="250" fill="#9a3412" />

        {/* Supersonic Parachute and Aeroshell Capsule */}
        <g transform="translate(500, 200)">
          {/* Parachute Canopy */}
          <path d="M-80 -120 Q 0 -170 80 -120 Z" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
          {/* Suspension Lines */}
          <line x1="-80" y1="-120" x2="-15" y2="-30" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="80" y1="-120" x2="15" y2="-30" stroke="#cbd5e1" strokeWidth="1" />
          {/* Heatshield & Module */}
          <ellipse cx="0" cy="0" rx="35" ry="18" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <rect x="-20" y="-25" width="40" height="25" fill="#334155" />
          <text x="0" y="35" textAnchor="middle" fill="#fef08a" fontFamily="IBM Plex Mono" fontSize="10">
            SCHIAPARELLI EDM
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          EXOMARS SCHIAPARELLI · ATMOSPHERIC ENTRY DESCENT TELEMETRY DEMONSTRATOR
        </text>
      </svg>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Lunar Scenes
 * ──────────────────────────────────────────────────────────────── */

export function Chandrayaan1Scene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#040711" />
        {/* Cratered Lunar South Pole (Shackleton Crater) */}
        <ellipse cx="500" cy="500" rx="600" ry="180" fill="#1e293b" />
        <ellipse cx="500" cy="460" rx="180" ry="50" fill="#020617" stroke="#334155" strokeWidth="2" />

        {/* Moon Impact Probe with Indian Tricolor impacting the rim */}
        <g transform="translate(500, 360)">
          <line x1="0" y1="-180" x2="0" y2="20" stroke="#f97316" strokeWidth="2" strokeDasharray="6 3" />
          <rect x="-18" y="0" width="36" height="30" rx="4" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Indian Tricolor painted on probe */}
          <rect x="-14" y="6" width="28" height="4" fill="#f97316" />
          <rect x="-14" y="10" width="28" height="4" fill="#ffffff" />
          <rect x="-14" y="14" width="28" height="4" fill="#15803d" />
          <text x="0" y="48" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9">
            JAWAHAR POINT · SHACKLETON CRATER
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          CHANDRAYAAN-1 · MOON IMPACT PROBE & DISCOVERY OF LUNAR WATER (ISRO)
        </text>
      </svg>
    </motion.div>
  );
}

export function Smart1Scene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#02050e" />
        {/* Crescent Moon */}
        <circle cx="750" cy="300" r="160" fill="#334155" />
        <circle cx="710" cy="270" r="150" fill="#02050e" />

        {/* SMART-1 Spacecraft with Electric Blue Ion Thruster */}
        <g transform="translate(380, 260)">
          {/* Blue Xenon Ion Beam Exhaust */}
          <polygon points="-10,25 -160,10 -160,40" fill="#38bdf8" opacity="0.65" />
          <line x1="-10" y1="25" x2="-180" y2="25" stroke="#0ea5e9" strokeWidth="4" />

          {/* Spacecraft Body */}
          <rect x="0" y="0" width="60" height="50" rx="6" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          {/* Twin Solar Wings */}
          <rect x="15" y="-90" width="30" height="90" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="15" y="50" width="30" height="90" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="30" y="30" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="8" fontWeight="bold">
            SMART-1
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#38bdf8" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          SMART-1 · EUROPE'S ELECTRIC ION PROPULSION LUNAR PIONEER (ESA)
        </text>
      </svg>
    </motion.div>
  );
}

export function Surveyor3Scene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#03050c" />
        <ellipse cx="500" cy="500" rx="650" ry="180" fill="#334155" />

        {/* Surveyor 3 Tripod Lander on Crater Slope */}
        <g transform="translate(450, 320) rotate(-12)">
          {/* Central Mast with Solar Panel and High-Gain Antenna */}
          <line x1="50" y1="50" x2="50" y2="-60" stroke="#cbd5e1" strokeWidth="4" />
          <rect x="35" y="-80" width="30" height="20" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <circle cx="50" cy="-40" r="12" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />

          {/* Triangular Aluminum Frame */}
          <polygon points="10,60 50,30 90,60" fill="none" stroke="#94a3b8" strokeWidth="4" />

          {/* Soil Sampler Scoop */}
          <line x1="80" y1="50" x2="130" y2="85" stroke="#64748b" strokeWidth="3" />
          <rect x="125" y="80" width="12" height="10" fill="#1e293b" />

          {/* Three Landing Struts with Footpads */}
          <line x1="20" y1="55" x2="-25" y2="105" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="80" y1="55" x2="125" y2="105" stroke="#cbd5e1" strokeWidth="4" />
          <circle cx="-25" cy="108" r="12" fill="#64748b" />
          <circle cx="125" cy="108" r="12" fill="#64748b" />
        </g>

        {/* Apollo 12 Lunar Module Intrepid visible on crater rim in background */}
        <g transform="translate(740, 270) scale(0.6)">
          <polygon points="0,50 20,10 80,10 100,50 80,90 20,90" fill="#d97706" />
          <line x1="20" y1="80" x2="-25" y2="130" stroke="#94a3b8" strokeWidth="4" />
          <line x1="80" y1="80" x2="125" y2="130" stroke="#94a3b8" strokeWidth="4" />
          <text x="50" y="150" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="12">
            APOLLO 12 (160M AWAY)
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          SURVEYOR 3 · ONLY ROBOTIC PROBE ON ANOTHER WORLD VISITED BY MAN (OCEAN OF STORMS)
        </text>
      </svg>
    </motion.div>
  );
}

export function ApolloScene({ artifactId, stageId, speed }: { artifactId: string; stageId: string; speed: number }) {
  const hasRover = ["apollo-15", "apollo-16", "apollo-17"].includes(artifactId);
  const missionName = artifactId.toUpperCase().replace("-", " ");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#02040a" />
        {/* Blue Marble Earth in the lunar sky */}
        <circle cx="780" cy="110" r="32" fill="#1e40af" />
        <ellipse cx="775" cy="105" rx="18" ry="12" fill="#38bdf8" />
        <ellipse cx="785" cy="115" rx="12" ry="8" fill="#15803d" />

        <ellipse cx="500" cy="510" rx="650" ry="190" fill="#334155" />

        {/* Apollo Descent Stage */}
        <g transform="translate(380, 280)">
          {/* Gold Foil Octagonal Base */}
          <polygon points="0,60 25,10 95,10 120,60 95,110 25,110" fill="#d97706" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="22" fill="#78350f" />
          {/* Plaque on Ladder */}
          <rect x="-8" y="55" width="16" height="22" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1" />

          {/* 4 Landing Struts with Round Footpads */}
          <line x1="20" y1="95" x2="-45" y2="165" stroke="#cbd5e1" strokeWidth="5" />
          <line x1="100" y1="95" x2="165" y2="165" stroke="#cbd5e1" strokeWidth="5" />
          <circle cx="-45" cy="168" r="16" fill="#e2e8f0" />
          <circle cx="165" cy="168" r="16" fill="#e2e8f0" />

          {/* American Flag planted nearby */}
          <line x1="-80" y1="70" x2="-80" y2="165" stroke="#cbd5e1" strokeWidth="2.5" />
          <rect x="-80" y="70" width="30" height="18" fill="#ef4444" />
          <rect x="-80" y="70" width="14" height="9" fill="#1e40af" />
        </g>

        {/* Lunar Roving Vehicle for Apollo 15/16/17 */}
        {hasRover && (
          <g transform="translate(640, 390)">
            <rect x="0" y="0" width="65" height="15" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
            <line x1="10" y1="12" x2="10" y2="28" stroke="#475569" strokeWidth="3" />
            <line x1="55" y1="12" x2="55" y2="28" stroke="#475569" strokeWidth="3" />
            <circle cx="10" cy="30" r="12" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="55" cy="30" r="12" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
            {/* Umbrella High-Gain Antenna */}
            <line x1="45" y1="0" x2="45" y2="-25" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="45" cy="-28" rx="14" ry="5" fill="#f8fafc" stroke="#64748b" />
            <text x="32" y="55" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="9">
              LUNAR ROVER
            </text>
          </g>
        )}

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {missionName} DESCENT STAGE · PERMANENT MONUMENT ON THE MOON (NASA)
        </text>
      </svg>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Outer Planets & Deep Space Scenes
 * ──────────────────────────────────────────────────────────────── */

export function CassiniScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020308" />
        {/* Saturn and Magnificent Rings */}
        <g transform="translate(680, 260)">
          {/* Ring Arc Behind Planet */}
          <ellipse cx="0" cy="0" rx="340" ry="85" fill="none" stroke="#d97706" strokeWidth="30" opacity="0.6" />
          <ellipse cx="0" cy="0" rx="300" ry="75" fill="none" stroke="#fed7aa" strokeWidth="15" opacity="0.75" />
          {/* Planet Body */}
          <circle cx="0" cy="0" r="120" fill="#ca8a04" />
          {/* Planet Cloud Stripes */}
          <ellipse cx="0" cy="-20" rx="118" ry="18" fill="#eab308" opacity="0.7" />
          <ellipse cx="0" cy="20" rx="118" ry="18" fill="#a16207" opacity="0.7" />
          {/* Ring Arc in Front */}
          <path d="M -340 0 A 340 85 0 0 0 340 0" fill="none" stroke="#d97706" strokeWidth="30" opacity="0.85" />
          <path d="M -300 0 A 300 75 0 0 0 300 0" fill="none" stroke="#fed7aa" strokeWidth="15" opacity="0.9" />
        </g>

        {/* Cassini Spacecraft */}
        <g transform="translate(280, 280) rotate(-15)">
          {/* 4m High-Gain Dish Antenna */}
          <ellipse cx="0" cy="-40" rx="65" ry="22" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
          <line x1="0" y1="-40" x2="0" y2="-65" stroke="#64748b" strokeWidth="3" />
          <circle cx="0" cy="-68" r="5" fill="#38bdf8" />

          {/* Spacecraft Body & Gold Thermal Blanketing */}
          <rect x="-25" y="-18" width="50" height="70" rx="5" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          {/* RTG Booms */}
          <line x1="-25" y1="20" x2="-75" y2="35" stroke="#64748b" strokeWidth="4" />
          <rect x="-85" y="25" width="20" height="15" fill="#334155" stroke="#0ea5e9" strokeWidth="1" />
          {/* Magnetometer Boom */}
          <line x1="25" y1="10" x2="110" y2="10" stroke="#cbd5e1" strokeWidth="2.5" />

          <text x="0" y="85" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            CASSINI-HUYGENS
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          CASSINI · 13 YEARS AT SATURN & THE GRAND FINALE CLOUD PLUNGE (NASA / ESA / ASI)
        </text>
      </svg>
    </motion.div>
  );
}

export function NewHorizonsScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020306" />
        {/* Pluto with Tombaugh Regio Heart */}
        <g transform="translate(680, 280)">
          <circle cx="0" cy="0" r="130" fill="#78350f" />
          {/* Glowing Nitrogen-Ice Heart (Tombaugh Regio) */}
          <path
            d="M -20 -10 C -20 -40 -60 -40 -60 -10 C -60 25 0 60 0 75 C 0 60 60 25 60 -10 C 60 -40 20 -40 20 -10 Z"
            fill="#fef3c7"
            opacity="0.9"
          />
          {/* Baby Blue Atmospheric Haze */}
          <circle cx="0" cy="0" r="136" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.6" />
          <text x="0" y="105" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="10">
            TOMBAUGH REGIO (THE HEART)
          </text>
        </g>

        {/* Charon in distance */}
        <circle cx="860" cy="140" r="45" fill="#475569" stroke="#9a3412" strokeWidth="3" />

        {/* New Horizons Spacecraft */}
        <g transform="translate(280, 270) rotate(10)">
          {/* 2.1m High-Gain Antenna Dish */}
          <ellipse cx="0" cy="-35" rx="55" ry="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
          <circle cx="0" cy="-52" r="4" fill="#38bdf8" />

          {/* Triangular Gold-Foil Body */}
          <polygon points="-35,35 35,35 0,-15" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          {/* LORRI Camera Telescope */}
          <rect x="15" y="-5" width="22" height="12" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          {/* RTG Cylinder */}
          <rect x="-48" y="15" width="22" height="15" fill="#334155" stroke="#f59e0b" strokeWidth="1" />

          <text x="0" y="58" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            NEW HORIZONS
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          NEW HORIZONS · PLUTO, CHARON & THE PRIMORDIAL ARROKOTH KUIPER BELT
        </text>
      </svg>
    </motion.div>
  );
}

export function GalileoScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020307" />
        {/* Striped Jupiter in background */}
        <g transform="translate(700, 280)">
          <circle cx="0" cy="0" r="150" fill="#ca8a04" />
          <ellipse cx="0" cy="-60" rx="140" ry="15" fill="#78350f" opacity="0.8" />
          <ellipse cx="0" cy="-20" rx="148" ry="18" fill="#eab308" opacity="0.7" />
          <ellipse cx="0" cy="25" rx="148" ry="20" fill="#78350f" opacity="0.8" />
          <ellipse cx="40" cy="50" rx="30" ry="15" fill="#dc2626" />
          <ellipse cx="0" cy="80" rx="135" ry="15" fill="#eab308" opacity="0.7" />
        </g>

        {/* Galileo Spacecraft */}
        <g transform="translate(300, 280)">
          {/* Furled Umbrella High Gain Antenna */}
          <polygon points="0,-60 -25,-20 25,-20" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Dual-Spin Rotor Bus */}
          <rect x="-30" y="-20" width="60" height="50" rx="5" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <line x1="-30" y1="10" x2="-80" y2="25" stroke="#64748b" strokeWidth="3" />
          <line x1="30" y1="10" x2="80" y2="25" stroke="#64748b" strokeWidth="3" />
          {/* Descent Probe Separation */}
          <circle cx="0" cy="45" r="14" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="0" y="75" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9">
            GALILEO ORBITER & PROBE
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          GALILEO · FIRST PROBE INTO JUPITER & DISCOVERY OF EUROPA'S OCEAN (NASA)
        </text>
      </svg>
    </motion.div>
  );
}

export function MessengerScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#030409" />
        {/* Blazing Sun at top left */}
        <circle cx="100" cy="100" r="70" fill="#fef08a" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="#f59e0b" strokeWidth="4" opacity="0.6" />

        {/* Heavily Cratered Mercury below */}
        <ellipse cx="500" cy="510" rx="600" ry="160" fill="#475569" />
        <ellipse cx="320" cy="460" rx="80" ry="25" fill="#1e293b" />
        <ellipse cx="680" cy="470" rx="90" ry="28" fill="#1e293b" />

        {/* MESSENGER Spacecraft with Ceramic Sunshade Facing the Sun */}
        <g transform="translate(480, 270)">
          {/* Nextel Ceramic Sunshade Shield */}
          <polygon points="-60,-40 60,-40 40,30 -40,30" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Spacecraft Body behind shield */}
          <rect x="-25" y="30" width="50" height="40" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
          {/* Twin Solar Arrays tilted back */}
          <rect x="-95" y="35" width="65" height="25" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <rect x="30" y="35" width="65" height="25" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <text x="0" y="55" textAnchor="middle" fill="#cbd5e1" fontFamily="IBM Plex Mono" fontSize="8" fontWeight="bold">
            MESSENGER
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          MESSENGER · FIRST MERCURY ORBITER & POLAR WATER-ICE DISCOVERY (NASA)
        </text>
      </svg>
    </motion.div>
  );
}

export function MagellanScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#080603" />
        {/* Dense Sulfuric Acid Atmosphere of Venus */}
        <ellipse cx="500" cy="510" rx="650" ry="170" fill="#78350f" />
        <ellipse cx="500" cy="460" rx="600" ry="130" fill="#ca8a04" opacity="0.6" />

        {/* Synthetic Aperture Radar (SAR) Pulses Stripping Clouds */}
        <polygon points="500,260 200,520 800,520" fill="#f59e0b" opacity="0.15" />
        <line x1="500" y1="260" x2="350" y2="520" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
        <line x1="500" y1="260" x2="650" y2="520" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />

        {/* Magellan Spacecraft with 3.7m Radar Dish */}
        <g transform="translate(500, 230)">
          <ellipse cx="0" cy="0" rx="70" ry="24" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
          <rect x="-20" y="24" width="40" height="45" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <rect x="-95" y="35" width="70" height="22" rx="2" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <rect x="25" y="35" width="70" height="22" rx="2" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <text x="0" y="52" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="8" fontWeight="bold">
            MAGELLAN
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          MAGELLAN · RADAR MAPPING 98% OF VENUS THROUGH SULFURIC CLOUDS (NASA)
        </text>
      </svg>
    </motion.div>
  );
}

export function PioneerVenusScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#0a0804" />
        <ellipse cx="500" cy="500" rx="650" ry="170" fill="#a16207" />

        {/* Four Atmospheric Probes Descending Simultaneously */}
        {/* Large Probe */}
        <g transform="translate(500, 260)">
          <path d="M-30 0 L 30 0 L 0 45 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <text x="0" y="-10" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="9">
            LARGE PROBE
          </text>
        </g>
        {/* Three Small Probes (North, Day, Night) */}
        <g transform="translate(250, 310)">
          <path d="M-18 0 L 18 0 L 0 28 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="0" y="-8" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="8">
            DAY PROBE
          </text>
        </g>
        <g transform="translate(750, 310)">
          <path d="M-18 0 L 18 0 L 0 28 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="0" y="-8" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="8">
            NIGHT PROBE
          </text>
        </g>
        <g transform="translate(380, 200)">
          <path d="M-18 0 L 18 0 L 0 28 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="0" y="-8" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="8">
            NORTH PROBE
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          PIONEER VENUS MULTIPROBE · SIMULTANEOUS FOUR-PROBE ATMOSPHERIC DESCENT (NASA)
        </text>
      </svg>
    </motion.div>
  );
}

export function PioneerScene({ artifactId, stageId, speed }: { artifactId: string; stageId: string; speed: number }) {
  const isP11 = artifactId === "pioneer-11";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#010206" />

        {/* Faint distant Sun as a small bright star */}
        <circle cx="850" cy="120" r="4" fill="#ffffff" />
        <circle cx="850" cy="120" r="10" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />

        {/* Pioneer 10 / 11 Spacecraft */}
        <g transform="translate(450, 280)">
          {/* 2.7m Parabolic Dish */}
          <ellipse cx="0" cy="-20" rx="80" ry="28" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="0" y1="-20" x2="0" y2="-55" stroke="#64748b" strokeWidth="3" />
          <circle cx="0" cy="-58" r="4" fill="#38bdf8" />

          {/* Hexagonal Chassis */}
          <polygon points="-25,10 25,10 35,45 -35,45" fill="#334155" stroke="#475569" strokeWidth="2" />

          {/* Golden Pioneer Plaque on Antenna Strut */}
          <rect x="25" y="-10" width="30" height="20" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          <line x1="32" y1="-5" x2="32" y2="5" stroke="#713f12" strokeWidth="1" />
          <circle cx="45" cy="0" r="4" fill="#713f12" />

          {/* RTG Booms */}
          <line x1="-35" y1="30" x2="-110" y2="45" stroke="#64748b" strokeWidth="3" />
          <line x1="35" y1="30" x2="110" y2="45" stroke="#64748b" strokeWidth="3" />
          <rect x="-125" y="38" width="20" height="14" fill="#1e293b" />
          <rect x="105" y="38" width="20" height="14" fill="#1e293b" />

          <text x="0" y="75" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {isP11 ? "PIONEER 11" : "PIONEER 10"}
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {isP11
            ? "PIONEER 11 · FIRST SCOUT AT SATURN'S RINGS & DRIFTING TOWARD AQUILA"
            : "PIONEER 10 · FIRST ACROSS THE ASTEROID BELT & VOYAGE TO ALDEBARAN"}
        </text>
      </svg>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Generic Archetype Fallbacks
 * ──────────────────────────────────────────────────────────────── */

export function GenericRoverScene({ artifactName, bodyId, speed }: { artifactName: string; bodyId: string; speed: number }) {
  const isMars = bodyId === "mars";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#0c0705" />
        <ellipse cx="500" cy="480" rx="650" ry="150" fill={isMars ? "#9a3412" : "#334155"} />
        <g transform="translate(450, 340)">
          <rect x="0" y="0" width="100" height="40" rx="8" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <line x1="80" y1="0" x2="80" y2="-40" stroke="#94a3b8" strokeWidth="4" />
          <rect x="70" y="-50" width="22" height="12" rx="3" fill="#1e293b" />
          <circle cx="76" cy="-44" r="3" fill="#38bdf8" />
          <circle cx="86" cy="-44" r="3" fill="#38bdf8" />
          <rect x="-10" y="-8" width="120" height="6" fill="#1e3a8a" />
          {[15, 50, 85].map((x) => (
            <circle key={x} cx={x} cy="48" r="14" fill="#64748b" stroke="#334155" strokeWidth="2" />
          ))}
          <text x="50" y="25" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {artifactName}
          </text>
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {artifactName.toUpperCase()} · PLANETARY EXPLORATION ROVER
        </text>
      </svg>
    </motion.div>
  );
}

export function GenericLanderScene({ artifactName, bodyId, speed }: { artifactName: string; bodyId: string; speed: number }) {
  const isMars = bodyId === "mars";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020409" />
        <ellipse cx="500" cy="500" rx="650" ry="160" fill={isMars ? "#9a3412" : "#334155"} />
        <g transform="translate(450, 310)">
          <polygon points="10,50 30,10 90,10 110,50 90,80 30,80" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <line x1="20" y1="75" x2="-35" y2="135" stroke="#94a3b8" strokeWidth="5" />
          <line x1="100" y1="75" x2="155" y2="135" stroke="#94a3b8" strokeWidth="5" />
          <circle cx="-35" cy="138" r="14" fill="#e2e8f0" />
          <circle cx="155" cy="138" r="14" fill="#e2e8f0" />
          <text x="60" y="50" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {artifactName}
          </text>
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {artifactName.toUpperCase()} · SURFACE EXPLORATION STATION
        </text>
      </svg>
    </motion.div>
  );
}

export function GenericOrbiterScene({ artifactName, bodyId, speed }: { artifactName: string; bodyId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020308" />
        <circle cx="700" cy="300" r="150" fill={bodyId === "mars" ? "#9a3412" : bodyId === "venus" ? "#ca8a04" : "#334155"} />
        <g transform="translate(350, 260)">
          <rect x="0" y="0" width="80" height="70" rx="8" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <ellipse cx="40" cy="-20" rx="35" ry="12" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <rect x="-100" y="10" width="90" height="50" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <rect x="90" y="10" width="90" height="50" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <text x="40" y="40" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {artifactName}
          </text>
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {artifactName.toUpperCase()} · ORBITAL SURVEYOR
        </text>
      </svg>
    </motion.div>
  );
}

export function GenericDeepSpaceScene({ artifactName, speed }: { artifactName: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020306" />
        <g transform="translate(450, 260)">
          <ellipse cx="60" cy="30" rx="80" ry="26" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <rect x="25" y="55" width="70" height="40" rx="5" fill="#d97706" />
          <circle cx="60" cy="75" r="15" fill="#eab308" />
          <line x1="95" y1="75" x2="220" y2="105" stroke="#cbd5e1" strokeWidth="2.5" />
          <text x="60" y="120" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {artifactName}
          </text>
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {artifactName.toUpperCase()} · EXPLORER OF DEEP SPACE
        </text>
      </svg>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Existing Curated Mission Scenes
 * ──────────────────────────────────────────────────────────────── */

export function ChandrayaanScene({ artifactId, stageId, speed }: { artifactId?: string; stageId: string; speed: number }) {
  const isC2 = artifactId === "chandrayaan-2";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#090d16" />
        <ellipse cx="500" cy="500" rx="600" ry="180" fill="#334155" />
        <ellipse cx="280" cy="460" rx="140" ry="35" fill="#1e293b" />
        <ellipse cx="720" cy="480" rx="180" ry="40" fill="#1e293b" />
        <g transform="translate(450, 310)">
          <rect x="0" y="0" width="100" height="80" rx="8" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="35" y="25" width="30" height="5" fill="#f97316" />
          <rect x="35" y="30" width="30" height="5" fill="#ffffff" />
          <rect x="35" y="35" width="30" height="5" fill="#15803d" />
          <line x1="15" y1="80" x2="-25" y2="135" stroke="#94a3b8" strokeWidth="5" />
          <line x1="85" y1="80" x2="125" y2="135" stroke="#94a3b8" strokeWidth="5" />
          <circle cx="-25" cy="138" r="12" fill="#64748b" />
          <circle cx="125" cy="138" r="12" fill="#64748b" />
          <text x="50" y="60" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {isC2 ? "VIKRAM (CH-2)" : "VIKRAM & PRAGYAN"}
          </text>
        </g>
        <text x="500" y="555" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {isC2 ? "CHANDRAYAAN-2 · TIRANGA POINT (ISRO)" : "CHANDRAYAAN-3 · SHIV SHAKTI POINT (ISRO)"}
        </text>
      </svg>
    </motion.div>
  );
}

export function HuygensScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#1f1108" />
        <ellipse cx="500" cy="480" rx="600" ry="160" fill="#9a3412" />
        <g transform="translate(450, 360)">
          <polygon points="10,0 90,0 110,40 -10,40" fill="#d97706" />
          <rect x="25" y="-25" width="50" height="25" fill="#94a3b8" />
        </g>
        <text x="500" y="555" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          HUYGENS ON TITAN · ICE PEBBLES & LIQUID METHANE FLATS (ESA)
        </text>
      </svg>
    </motion.div>
  );
}

export function SpiritScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#1b120c" />
        <path d="M0 400 Q 500 370 1000 400 L 1000 600 L 0 600 Z" fill="#9a3412" />
        <g transform="translate(460, 340)">
          <rect x="0" y="0" width="100" height="40" rx="8" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <line x1="80" y1="0" x2="80" y2="-40" stroke="#94a3b8" strokeWidth="4" />
          <rect x="70" y="-50" width="22" height="12" rx="3" fill="#1e293b" />
          <circle cx="76" cy="-44" r="3" fill="#38bdf8" />
          <circle cx="86" cy="-44" r="3" fill="#38bdf8" />
          <rect x="-10" y="-8" width="120" height="6" fill="#1e3a8a" />
          {[15, 50, 85].map((x) => (
            <circle key={x} cx={x} cy="48" r="14" fill="#64748b" stroke="#334155" strokeWidth="2" />
          ))}
          <text x="50" y="25" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            SPIRIT (MER-A)
          </text>
        </g>
        <text x="500" y="555" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          SPIRIT ROVER (MER-A) · GUSEV CRATER, MARS (NASA)
        </text>
      </svg>
    </motion.div>
  );
}

export function OpportunityScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#1e130c" />
        <path d="M0 380 Q 500 350 1000 390 L 1000 600 L 0 600 Z" fill="#9a3412" />
        <g transform="translate(480, 360)">
          <rect x="0" y="0" width="100" height="38" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
          <line x1="80" y1="0" x2="80" y2="-42" stroke="#94a3b8" strokeWidth="4" />
          <rect x="70" y="-52" width="22" height="12" rx="3" fill="#1e293b" />
          <circle cx="76" cy="-46" r="3" fill="#38bdf8" />
          <circle cx="86" cy="-46" r="3" fill="#38bdf8" />
          <rect x="-12" y="-6" width="124" height="6" fill="#1e3a8a" />
          {[15, 50, 85].map((x) => (
            <circle key={x} cx={x} cy="45" r="14" fill="#64748b" stroke="#334155" strokeWidth="2" />
          ))}
          <text x="50" y="25" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            OPPORTUNITY
          </text>
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          OPPORTUNITY (MER-B) · 45.16 KM OFF-WORLD MARATHON RECORD (NASA)
        </text>
      </svg>
    </motion.div>
  );
}

export function MangalyaanScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#090d16" />
        <circle cx="680" cy="300" r="160" fill="#9a3412" />
        <g transform="translate(320, 240)">
          <rect x="0" y="0" width="110" height="110" rx="10" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <ellipse cx="55" cy="-25" rx="45" ry="18" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          <rect x="-140" y="15" width="130" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="120" y="15" width="130" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="35" y="45" width="40" height="5" fill="#f97316" />
          <rect x="35" y="50" width="40" height="5" fill="#ffffff" />
          <rect x="35" y="55" width="40" height="5" fill="#15803d" />
          <text x="55" y="80" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            MANGALYAAN
          </text>
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          MOM (MANGALYAAN) · FIRST ASIAN NATION TO REACH MARS (ISRO)
        </text>
      </svg>
    </motion.div>
  );
}

export function PhilaeScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#040711" />
        <g transform="translate(500, 420)">
          <ellipse cx="-120" cy="0" rx="200" ry="120" fill="#1e293b" />
          <ellipse cx="140" cy="-40" rx="140" ry="90" fill="#334155" />
        </g>
        <g transform="translate(420, 220) rotate(-35)">
          <rect x="0" y="0" width="80" height="80" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
          <rect x="8" y="8" width="64" height="64" fill="#1e3a8a" />
          <line x1="15" y1="80" x2="-20" y2="130" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="65" y1="80" x2="100" y2="130" stroke="#cbd5e1" strokeWidth="4" />
          <text x="40" y="45" textAnchor="middle" fill="#93c5fd" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            PHILAE
          </text>
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#38bdf8" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          PHILAE LANDER · TOUCHDOWN ON COMET 67P (ESA)
        </text>
      </svg>
    </motion.div>
  );
}

export function VoyagerScene({ artifactId, stageId, speed }: { artifactId?: string; stageId: string; speed: number }) {
  const isV2 = artifactId === "voyager-2";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020408" />
        <g transform="translate(420, 220)">
          <ellipse cx="60" cy="40" rx="90" ry="32" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <polygon points="20,85 100,85 115,130 5,130" fill="#d97706" />
          {/* Golden Record */}
          <circle cx="60" cy="108" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <line x1="115" y1="105" x2="280" y2="140" stroke="#cbd5e1" strokeWidth="3" />
          <text x="60" y="150" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {isV2 ? "VOYAGER 2" : "VOYAGER 1"}
          </text>
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {isV2
            ? "VOYAGER 2 · GRAND TOUR OF URANUS, NEPTUNE & INTERSTELLAR SPACE"
            : "VOYAGER 1 · BEYOND THE HELIOPAUSE & CARRYING THE GOLDEN RECORD"}
        </text>
      </svg>
    </motion.div>
  );
}
