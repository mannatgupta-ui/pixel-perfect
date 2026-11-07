import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getArtifact } from "@/data/artifacts";

export interface SceneProps {
  artifactId: string;
  stageId: string;
  stageIndex?: number;
  totalStages?: number;
  speed: number;
}

export type StagePhase =
  | "cleanroom"
  | "launch"
  | "cruise"
  | "descent"
  | "landing"
  | "surface"
  | "storm"
  | "monument";

/**
 * Maps any mission stageId or stageIndex to a semantic narrative phase
 */
export function getStagePhase(stageId: string, stageIndex = 0, totalStages = 4): StagePhase {
  const id = stageId.toLowerCase();

  if (id.includes("creation") || id.includes("assembly") || id.includes("genesis") || id.includes("blueprint") || id === "01" && stageIndex === 0 && (id.includes("born") || id.includes("behemoth") || id.includes("dream") || id.includes("heart") || id.includes("scout") || id.includes("voyage") || id.includes("pioneer") || id.includes("fastest"))) {
    return "cleanroom";
  }
  if (id.includes("launch") || id.includes("liftoff") || id.includes("roar") || id.includes("lightning") || id.includes("bahubali") || id.includes("bullet")) {
    return "launch";
  }
  if (id.includes("journey") || id.includes("cruise") || id.includes("translunar") || id.includes("slingshot") || id.includes("spiral") || id.includes("jupiter") && totalStages > 3 || id.includes("piggyback") || id.includes("rendezvous")) {
    return "cruise";
  }
  if (id.includes("descent") || id.includes("skycrane") || id.includes("entry") || id.includes("probe") || id.includes("parachute") || id.includes("separation") || id.includes("two-kilometers") || id.includes("terror")) {
    return "descent";
  }
  if (id.includes("landing") || id.includes("touchdown") || id.includes("touchice") || id.includes("ramp") || id.includes("bounces") || id.includes("flight1")) {
    return "landing";
  }
  if (id.includes("storm") || id.includes("challenges") || id.includes("silence") || id.includes("saturation")) {
    return "storm";
  }
  if (id.includes("legacy") || id.includes("monument") || id.includes("farewell") || id.includes("last") || id.includes("eternity") || id.includes("interstellar") || id.includes("voyage") && stageIndex >= totalStages - 1 || id.includes("finale") || id.includes("vindication") || stageIndex >= totalStages - 1) {
    return "monument";
  }

  return "surface";
}

/* ────────────────────────────────────────────────────────────────
 * Kurzgesagt Companion Character: Space Duck / Bird
 * ──────────────────────────────────────────────────────────────── */

interface BirdProps {
  action?: "inspect" | "cheer" | "float" | "drive" | "salute" | "gaze";
  x?: number | string;
  y?: number | string;
  scale?: number | string;
  flip?: boolean;
}

export function KurzgesagtBird({
  action = "inspect",
  x = 750,
  y = 380,
  scale = 1,
  flip = false,
}: BirdProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: scale }}
      transition={{ duration: 0.5 }}
      transform={`translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`}
      className="pointer-events-none select-none"
    >
      {/* Floating or Bobbing Animation */}
      <motion.g
        animate={
          action === "float"
            ? { y: [-8, 8, -8], rotate: [-4, 4, -4] }
            : action === "cheer"
            ? { y: [0, -12, 0], scale: [1, 1.05, 1] }
            : { y: [0, -4, 0] }
        }
        transition={{ repeat: Infinity, duration: action === "float" ? 4 : 2, ease: "easeInOut" }}
      >
        {/* Zero-G Tether Line when floating */}
        {action === "float" && (
          <motion.path
            d="M -15 20 Q -40 60 -100 40"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
        )}

        {/* Space Helmet Glass Bubble */}
        <circle cx="0" cy="-22" r="24" fill="#e0f2fe" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
        {/* Helmet Glass Reflection */}
        <path d="M -14 -32 Q 0 -42 14 -32" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        {/* Gold Helmet Antenna */}
        <line x1="0" y1="-46" x2="0" y2="-56" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="0" cy="-57" r="3" fill="#fbbf24" />

        {/* Bird Head (Canary Yellow) */}
        <circle cx="0" cy="-20" r="17" fill="#facc15" />

        {/* Blinking Eye */}
        <motion.g
          animate={{ scaleY: [1, 1, 1, 0.1, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, times: [0, 0.85, 0.9, 0.95, 1] }}
          transform="translate(6, -23)"
        >
          <circle cx="0" cy="0" r="5" fill="#0f172a" />
          <circle cx="-1.5" cy="-1.5" r="1.8" fill="#ffffff" />
        </motion.g>

        {/* Orange Beak */}
        <polygon points="12,-20 25,-17 12,-12" fill="#ea580c" />

        {/* Space Suit Body */}
        <ellipse cx="-2" cy="10" rx="18" ry="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        {/* Mission Chest Patch */}
        <rect x="2" y="4" width="7" height="6" rx="1.5" fill="#2563eb" />
        <circle cx="5.5" cy="7" r="1.2" fill="#f97316" />

        {/* Left Arm / Tool / Flag */}
        {action === "inspect" && (
          <g transform="translate(14, 6)">
            {/* Wrench */}
            <line x1="0" y1="0" x2="16" y2="-10" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="16" cy="-10" r="4" fill="none" stroke="#94a3b8" strokeWidth="2" />
          </g>
        )}
        {action === "cheer" && (
          <motion.g
            animate={{ rotate: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            transform="translate(10, 0)"
          >
            {/* Waving Arm with tiny flag */}
            <line x1="0" y1="0" x2="12" y2="-18" stroke="#cbd5e1" strokeWidth="3" />
            <polygon points="12,-18 26,-12 12,-6" fill="#f43f5e" />
          </motion.g>
        )}
        {action === "salute" && (
          <g transform="translate(10, -5)">
            <line x1="0" y1="12" x2="10" y2="-5" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        )}
        {action === "gaze" && (
          <g transform="translate(8, 6)">
            {/* Steaming Mug of Hot Cocoa */}
            <rect x="2" y="-4" width="8" height="10" rx="2" fill="#ef4444" />
            <path d="M 6 -6 Q 4 -12 6 -16" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.6" />
          </g>
        )}

        {/* Tiny Space Boots */}
        <ellipse cx="-8" cy="27" rx="6" ry="4" fill="#334155" />
        <ellipse cx="6" cy="27" rx="6" ry="4" fill="#334155" />
      </motion.g>
    </motion.g>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Stage-Specific Universal Environments
 * ──────────────────────────────────────────────────────────────── */

export function CleanroomScene({
  missionTitle,
  agency,
  speed,
}: {
  missionTitle: string;
  agency: string;
  speed: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        {/* High-tech Cleanroom Blueprint Grid */}
        <rect width="1000" height="600" fill="#080e1a" />
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 30} x2="1000" y2={i * 30} stroke="#1e293b" strokeWidth="0.8" opacity="0.7" />
        ))}
        {Array.from({ length: 34 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="600" stroke="#1e293b" strokeWidth="0.8" opacity="0.7" />
        ))}

        {/* Overhead Gantry Crane Rail */}
        <rect x="0" y="30" width="1000" height="16" fill="#1e293b" stroke="#334155" />
        <g transform="translate(480, 46)">
          <rect x="-30" y="0" width="60" height="20" rx="3" fill="#f59e0b" />
          <line x1="0" y1="20" x2="0" y2="120" stroke="#cbd5e1" strokeWidth="2.5" />
          <circle cx="0" cy="125" r="6" fill="#94a3b8" />
        </g>

        {/* Blueprint Circuit Hologram Circles */}
        <circle cx="500" cy="310" r="160" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="8 6" opacity="0.4" />
        <circle cx="500" cy="310" r="220" fill="none" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.25" />

        {/* Robotic Assembly Chassis under construction */}
        <g transform="translate(440, 260)">
          <rect x="0" y="0" width="120" height="80" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <rect x="15" y="15" width="90" height="50" rx="6" fill="#0f172a" stroke="#60a5fa" strokeWidth="1" />
          {/* Active Welding Sparks */}
          <motion.circle
            animate={{ scale: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 0.3 }}
            cx="25"
            cy="15"
            r="4"
            fill="#38bdf8"
          />
          <motion.circle
            animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0.9, 0.2] }}
            transition={{ repeat: Infinity, duration: 0.4, delay: 0.15 }}
            cx="95"
            cy="65"
            r="4"
            fill="#facc15"
          />
        </g>

        {/* Assembly Stage Title */}
        <text x="500" y="90" textAnchor="middle" fill="#38bdf8" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="4">
          {agency} HIGH-BAY CLEANROOM ASSEMBLY & SYSTEM INTEGRATION
        </text>
        <text x="500" y="555" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
          {missionTitle} · BORN FROM HUMAN IMAGINATION AND PRECISION ENGINEERING
        </text>

        {/* Kurzgesagt Bird as Head Lead Engineer */}
        <KurzgesagtBird action="inspect" x="720" y="380" scale={1.2} />
      </svg>
    </motion.div>
  );
}

export function LaunchScene({
  missionTitle,
  agency,
  speed,
}: {
  missionTitle: string;
  agency: string;
  speed: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        {/* Launchpad Night Sky transitioning to dawn */}
        <rect width="1000" height="600" fill="#040714" />
        <ellipse cx="500" cy="620" rx="700" ry="200" fill="#0f172a" />

        {/* Launch Tower / Gantry Structure */}
        <g transform="translate(360, 160)">
          <line x1="0" y1="0" x2="0" y2="340" stroke="#475569" strokeWidth="6" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="-15" y1={i * 42} x2="15" y2={i * 42} stroke="#64748b" strokeWidth="2.5" />
          ))}
          <line x1="0" y1="60" x2="110" y2="60" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 2" />
          <line x1="0" y1="180" x2="110" y2="180" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 2" />
        </g>

        {/* Ascending Heavy-Lift Rocket */}
        <motion.g
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          transform="translate(480, 120)"
        >
          {/* Fairing Capsule on top */}
          <polygon points="20,0 0,-40 40,-40" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Main Core Stage */}
          <rect x="0" y="0" width="40" height="220" rx="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          {/* Agency Emblem on Rocket Body */}
          <rect x="8" y="40" width="24" height="8" rx="2" fill="#ef4444" />
          <text x="20" y="80" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {agency}
          </text>

          {/* Solid Rocket Boosters on flanks */}
          <rect x="-18" y="60" width="16" height="150" rx="4" fill="#e2e8f0" stroke="#64748b" />
          <rect x="42" y="60" width="16" height="150" rx="4" fill="#e2e8f0" stroke="#64748b" />

          {/* Throttleable Pulsating Fiery Exhaust Plumes */}
          <motion.g
            animate={{ scaleY: [0.9, 1.25, 0.95], scaleX: [0.95, 1.08, 0.95] }}
            transition={{ repeat: Infinity, duration: 0.15, ease: "easeInOut" }}
            transform="translate(20, 220)"
          >
            {/* Central Plume */}
            <polygon points="-16,0 16,0 0,130" fill="#f59e0b" opacity="0.9" />
            <polygon points="-8,0 8,0 0,90" fill="#facc15" />
            <polygon points="-4,0 4,0 0,50" fill="#ffffff" />
            {/* Booster Flames */}
            <polygon points="-30,0 -10,0 -20,80" fill="#f97316" opacity="0.85" />
            <polygon points="10,0 30,0 20,80" fill="#f97316" opacity="0.85" />
          </motion.g>
        </motion.g>

        {/* Billowing Giant Exhaust Smoke Cloud at base */}
        <g transform="translate(500, 480)">
          <ellipse cx="-80" cy="0" rx="140" ry="60" fill="#e2e8f0" opacity="0.85" />
          <ellipse cx="80" cy="0" rx="140" ry="60" fill="#cbd5e1" opacity="0.85" />
          <ellipse cx="0" cy="-30" rx="110" ry="50" fill="#fde68a" opacity="0.9" />
          <ellipse cx="0" cy="-10" rx="80" ry="40" fill="#f59e0b" opacity="0.75" />
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {missionTitle} · LIFTOFF INTO ORBIT WITH 10 MILLION NEWTONS OF THRUST
        </text>

        {/* Cheering Kurzgesagt Bird at Mission Control */}
        <KurzgesagtBird action="cheer" x="180" y="440" scale={1.2} />
      </svg>
    </motion.div>
  );
}

export function CruiseScene({
  missionTitle,
  targetBody,
  speed,
}: {
  missionTitle: string;
  targetBody: string;
  speed: number;
}) {
  const isMars = targetBody.toLowerCase().includes("mars");
  const isMoon = targetBody.toLowerCase().includes("moon");
  const isSaturn = targetBody.toLowerCase().includes("saturn") || targetBody.toLowerCase().includes("titan");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        {/* Starfield */}
        <rect width="1000" height="600" fill="#020308" />
        {Array.from({ length: 60 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 127) % 1000}
            cy={(i * 97) % 550}
            r={i % 5 === 0 ? 2 : 1}
            fill="#ffffff"
            opacity={(i % 4 + 1) * 0.22}
          />
        ))}

        {/* Earth in distant rear */}
        <g transform="translate(140, 150)">
          <circle cx="0" cy="0" r="30" fill="#1e40af" />
          <ellipse cx="-5" cy="-5" rx="16" ry="10" fill="#38bdf8" />
          <ellipse cx="6" cy="8" rx="12" ry="7" fill="#15803d" />
          <text x="0" y="48" textAnchor="middle" fill="#93c5fd" fontFamily="IBM Plex Mono" fontSize="9">
            EARTH
          </text>
        </g>

        {/* Transfer Trajectory Curve */}
        <path
          d="M 170 150 Q 500 80 820 280"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.6"
        />

        {/* Target Body Looming Ahead */}
        <g transform="translate(850, 290)">
          {isMars && (
            <>
              <circle cx="0" cy="0" r="110" fill="#9a3412" />
              <circle cx="0" cy="0" r="114" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.5" />
            </>
          )}
          {isMoon && (
            <>
              <circle cx="0" cy="0" r="95" fill="#475569" />
              <ellipse cx="-20" cy="-20" rx="35" ry="15" fill="#1e293b" />
            </>
          )}
          {isSaturn && (
            <>
              <ellipse cx="0" cy="0" rx="170" ry="40" fill="none" stroke="#d97706" strokeWidth="14" opacity="0.8" />
              <circle cx="0" cy="0" r="75" fill="#ca8a04" />
            </>
          )}
          {!isMars && !isMoon && !isSaturn && (
            <circle cx="0" cy="0" r="90" fill="#0284c7" />
          )}
          <text x="0" y="130" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="10">
            {targetBody.toUpperCase()}
          </text>
        </g>

        {/* Interplanetary Spacecraft in Cruise Orientation */}
        <motion.g
          animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          transform="translate(480, 220)"
        >
          {/* Main High Gain Parabolic Dish pointing to Earth */}
          <ellipse cx="-50" cy="0" rx="40" ry="18" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-50" y1="0" x2="-80" y2="0" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 2" />

          {/* Central Bus with Gold Thermal Blankets */}
          <rect x="-15" y="-25" width="60" height="50" rx="6" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />

          {/* Solar Arrays */}
          <rect x="-10" y="-105" width="50" height="80" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="-10" y="25" width="50" height="80" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />

          <text x="15" y="5" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="8" fontWeight="bold">
            CRUISE
          </text>
        </motion.g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {missionTitle} · INTERPLANETARY CRUISE ACROSS MILLIONS OF KILOMETRES
        </text>

        {/* Floating Spacewalking Kurzgesagt Bird */}
        <KurzgesagtBird action="float" x="400" y="320" scale={1.1} />
      </svg>
    </motion.div>
  );
}

export function DescentScene({
  missionTitle,
  type = "skycrane",
  speed,
}: {
  missionTitle: string;
  type?: "skycrane" | "parachute" | "heatshield";
  speed: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        {/* Plasma Shock Atmospheric Sky */}
        <rect width="1000" height="600" fill="#170705" />
        <ellipse cx="500" cy="720" rx="800" ry="280" fill="#9a3412" />

        {type === "skycrane" ? (
          /* Sky Crane Lowering Rover */
          <g transform="translate(500, 180)">
            {/* Sky Crane Rocket Descent Stage with 8 Firing Hydrazine Thrusters */}
            <polygon points="-60,0 60,0 45,35 -45,35" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            {/* Thruster Plumes */}
            <motion.polygon
              animate={{ scaleY: [0.9, 1.3, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.12 }}
              points="-55,35 -40,35 -47,95"
              fill="#f59e0b"
            />
            <motion.polygon
              animate={{ scaleY: [0.9, 1.3, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.12, delay: 0.05 }}
              points="40,35 55,35 47,95"
              fill="#f59e0b"
            />

            {/* Triple Nylon Bridle Tethers */}
            <line x1="-30" y1="35" x2="-25" y2="150" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="35" x2="0" y2="150" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="30" y1="35" x2="25" y2="150" stroke="#cbd5e1" strokeWidth="2" />

            {/* Suspended Rover with deployed wheels ready for touchdown */}
            <g transform="translate(-50, 150)">
              <rect x="0" y="0" width="100" height="40" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
              {/* Wheels hanging below */}
              {[-10, 30, 70, 110].map((wx, i) => (
                <circle key={i} cx={wx} cy="55" r="14" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              ))}
            </g>
          </g>
        ) : (
          /* Supersonic Parachute Descent */
          <g transform="translate(500, 150)">
            {/* Oscillating Billowing Parachute Canopy */}
            <motion.g
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            >
              <path d="M -120 -100 Q 0 -170 120 -100 Z" fill="#f8fafc" stroke="#ef4444" strokeWidth="3" />
              <line x1="-120" y1="-100" x2="-20" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="120" y1="-100" x2="20" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
            </motion.g>

            {/* Glowing Capsule / Aeroshell with Plasma Heatshield */}
            <ellipse cx="0" cy="50" rx="45" ry="24" fill="#d97706" stroke="#f59e0b" strokeWidth="2.5" />
            {/* Fiery Shockwave Plasma */}
            <path d="M -60 55 Q 0 85 60 55" stroke="#ef4444" strokeWidth="5" fill="none" opacity="0.85" />
          </g>
        )}

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {missionTitle} · SEVEN MINUTES OF TERROR: HYPERSONIC ENTRY & RETRO-BRAKING
        </text>

        {/* Parachuting / Braced Kurzgesagt Bird */}
        <KurzgesagtBird action="float" x="720" y="240" scale={1.1} />
      </svg>
    </motion.div>
  );
}

export function MonumentTwilightScene({
  missionTitle,
  bodyName,
  speed,
}: {
  missionTitle: string;
  bodyName: string;
  speed: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        {/* Serene Cosmic Twilight Obsidian Sky */}
        <rect width="1000" height="600" fill="#020307" />
        {/* Millions of Brilliant Stars */}
        {Array.from({ length: 80 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 139) % 1000}
            cy={(i * 83) % 480}
            r={i % 6 === 0 ? 2.5 : 1.2}
            fill="#ffffff"
            opacity={(i % 5 + 2) * 0.18}
          />
        ))}

        {/* Gentle Ambient Horizon Glow */}
        <ellipse cx="500" cy="620" rx="750" ry="200" fill="#1e1b4b" opacity="0.4" />
        <ellipse cx="500" cy="540" rx="650" ry="160" fill="#090d16" />

        {/* Resting Monument Silhouette with Soft Breathing Glow */}
        <motion.g
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          transform="translate(440, 340)"
        >
          {/* Commemorative Base */}
          <polygon points="10,50 30,10 90,10 110,50 90,80 30,80" fill="#334155" stroke="#64748b" strokeWidth="2" />
          <circle cx="60" cy="45" r="14" fill="#0284c7" opacity="0.4" className="animate-ping" />
          <line x1="20" y1="75" x2="-35" y2="135" stroke="#64748b" strokeWidth="4" />
          <line x1="100" y1="75" x2="155" y2="135" stroke="#64748b" strokeWidth="4" />
          <text x="60" y="48" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            MONUMENT
          </text>
        </motion.g>

        {/* Memorial Plaque Light Halo */}
        <text x="500" y="555" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {missionTitle} · ABANDONED BUT NOT FORGOTTEN ON {bodyName.toUpperCase()}
        </text>

        {/* Contemplative Kurzgesagt Bird sitting with hot mug watching the stars */}
        <KurzgesagtBird action="gaze" x="680" y="420" scale={1.2} />
      </svg>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Mission-Specific Interactive Live Scenes
 * ──────────────────────────────────────────────────────────────── */

export function LiveCuriosityPerseveranceSurface({
  artifactId,
  speed,
}: {
  artifactId: string;
  speed: number;
}) {
  const isPercy = artifactId === "perseverance";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#0c0705" />
        {/* Layered Mountains / Jezero Delta */}
        <polygon points="0,320 280,210 520,290 780,180 1000,280 1000,600 0,600" fill="#2d130a" />
        <polygon points="0,380 320,310 650,370 1000,330 1000,600 0,600" fill="#5c2010" />
        <polygon points="0,440 450,420 1000,450 1000,600 0,600" fill="#9a3412" />

        {/* Moving Tread Marks in Regolith */}
        <line x1="120" y1="410" x2="380" y2="410" stroke="#451a03" strokeWidth="6" strokeDasharray="10 5" />
        <line x1="120" y1="435" x2="380" y2="435" stroke="#451a03" strokeWidth="6" strokeDasharray="10 5" />

        {/* Rover Chassis */}
        <g transform="translate(400, 310)">
          {/* MMRTG Nuclear Power at rear */}
          <rect x="-35" y="15" width="45" height="30" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />

          {/* Main Body */}
          <rect x="0" y="0" width="145" height="58" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <text x="72" y="32" textAnchor="middle" fill="#0f172a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {isPercy ? "PERSEVERANCE" : "CURIOSITY"}
          </text>

          {/* Mast Camera with Firing Laser */}
          <line x1="115" y1="0" x2="115" y2="-80" stroke="#94a3b8" strokeWidth="5" />
          <rect x="100" y="-96" width="30" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="110" cy="-86" r="4" fill="#38bdf8" />

          {/* Pulsing High-Energy Laser Beam Firing at Rock */}
          <motion.line
            animate={{ opacity: [0, 1, 0], strokeWidth: [1, 3, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            x1="122"
            y1="-86"
            x2="280"
            y2="90"
            stroke="#ef4444"
          />
          {/* Laser Impact Sparks on Rock */}
          <motion.circle
            animate={{ scale: [1, 3, 1], opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            cx="280"
            cy="90"
            r="5"
            fill="#facc15"
          />

          {/* Target Rock Outcrop */}
          <polygon points="270,75 310,60 330,105 260,105" fill="#78350f" stroke="#451a03" strokeWidth="2" />

          {/* 6 Continuously Rolling Wheels with Rocker-Bogie */}
          {[-15, 30, 80, 130, 175].map((wx, i) => (
            <g key={i}>
              <line x1={wx < 70 ? 20 : 110} y1="45" x2={wx} y2="85" stroke="#475569" strokeWidth="3" />
              {/* Spinning Wheel */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                style={{ originX: `${wx}px`, originY: "88px" }}
              >
                <circle cx={wx} cy="88" r="16" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2.5" />
                <line x1={wx - 14} y1="88" x2={wx + 14} y2="88" stroke="#64748b" strokeWidth="2" />
                <line x1={wx} y1="74" x2={wx} y2="102" stroke="#64748b" strokeWidth="2" />
                <circle cx={wx} cy="88" r="6" fill="#64748b" />
              </motion.g>
            </g>
          ))}
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {isPercy ? "PERSEVERANCE" : "CURIOSITY"} · DRILLING MARTIAN BEDROCK & LASER SPECTROSCOPY
        </text>

        {/* Kurzgesagt Bird as Co-Pilot Geologist */}
        <KurzgesagtBird action="drive" x="780" y="410" scale={1.2} />
      </svg>
    </motion.div>
  );
}

export function LiveIngenuityFlightSurface({ speed }: { speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#120907" />
        {/* Rippling Martian Sand Dunes */}
        <path d="M0 450 Q 250 420 500 460 T 1000 440 L 1000 600 L 0 600 Z" fill="#9a3412" />
        <path d="M0 500 Q 350 470 700 510 T 1000 490 L 1000 600 L 0 600 Z" fill="#7c2d12" />

        {/* Dynamic Moving Ground Shadow Tracking Helicopter */}
        <motion.ellipse
          animate={{ cx: [480, 520, 480], rx: [95, 80, 95] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          cy="510"
          ry="18"
          fill="#1c1917"
          opacity="0.6"
        />

        {/* Hovering Ingenuity Helicopter */}
        <motion.g
          animate={{ y: [0, -16, 0], x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          transform="translate(500, 220)"
        >
          {/* Solar Panel & Wright Brothers Cloth */}
          <rect x="-40" y="-120" width="80" height="15" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="-8" y="-105" width="16" height="8" fill="#d97706" />

          {/* Mast */}
          <line x1="0" y1="-105" x2="0" y2="0" stroke="#cbd5e1" strokeWidth="5" />

          {/* Upper High-Speed Counter-Rotating Rotor Blur */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.15, ease: "linear" }}
            style={{ originX: "0px", originY: "-75px" }}
          >
            <ellipse cx="0" cy="-75" rx="190" ry="8" fill="#38bdf8" opacity="0.45" />
            <line x1="-190" y1="-75" x2="190" y2="-75" stroke="#0284c7" strokeWidth="4" />
          </motion.g>

          {/* Lower Counter-Rotating Rotor Blur */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 0.15, ease: "linear" }}
            style={{ originX: "0px", originY: "-45px" }}
          >
            <ellipse cx="0" cy="-45" rx="190" ry="8" fill="#38bdf8" opacity="0.45" />
            <line x1="-185" y1="-45" x2="185" y2="-45" stroke="#0284c7" strokeWidth="4" />
          </motion.g>

          {/* Fuselage Box */}
          <rect x="-28" y="0" width="56" height="52" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="0" cy="24" r="8" fill="#38bdf8" />
          <text x="0" y="44" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="7" fontWeight="bold">
            INGENUITY
          </text>

          {/* 4 Carbon Fiber Landing Legs */}
          <line x1="-20" y1="45" x2="-80" y2="120" stroke="#94a3b8" strokeWidth="3" />
          <line x1="20" y1="45" x2="80" y2="120" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="-80" cy="122" r="4" fill="#cbd5e1" />
          <circle cx="80" cy="122" r="4" fill="#cbd5e1" />
        </motion.g>

        <text x="500" y="565" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          INGENUITY · LIVE AERIAL SCOUTING OVER MARTIAN DUNES (72 FLIGHTS)
        </text>

        {/* Excited Kurzgesagt Bird on the ground tracking the flight */}
        <KurzgesagtBird action="cheer" x="220" y="430" scale={1.2} />
      </svg>
    </motion.div>
  );
}

export function LiveInSightSurface({ speed }: { speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#130b08" />
        <ellipse cx="500" cy="480" rx="600" ry="140" fill="#9a3412" />

        {/* InSight Lander Body */}
        <g transform="translate(400, 310)">
          {/* UltraFlex Solar Wings */}
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
        </g>

        {/* SEIS Seismometer Dome Emitting Live Ground Wave Ripples */}
        <g transform="translate(630, 420)">
          {/* Tether Cable */}
          <path d="M-90 -60 Q -40 -10 0 0" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          {/* Dome Shield */}
          <ellipse cx="0" cy="0" rx="38" ry="24" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />

          {/* Live Expanding Seismic Wave Ripples */}
          <motion.ellipse
            animate={{ rx: [20, 140], ry: [8, 45], opacity: [0.9, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
            cx="0"
            cy="10"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <motion.ellipse
            animate={{ rx: [20, 140], ry: [8, 45], opacity: [0.9, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: 0.8, ease: "easeOut" }}
            cx="0"
            cy="10"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />

          <text x="0" y="38" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="9">
            SEIS · DETECTING MARSQUAKE MAGNITUDE 4.7
          </text>
        </g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          INSIGHT · LISTENING TO SEISMIC ECHOES DEEP INSIDE THE MARTIAN MANTLE
        </text>

        <KurzgesagtBird action="inspect" x="240" y="410" scale={1.2} />
      </svg>
    </motion.div>
  );
}

export function LiveCassiniSurface({ speed }: { speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020308" />

        {/* Saturn with Majestic Glowing Rings */}
        <g transform="translate(680, 260)">
          {/* Ring Arc Behind */}
          <ellipse cx="0" cy="0" rx="340" ry="85" fill="none" stroke="#d97706" strokeWidth="30" opacity="0.6" />
          <ellipse cx="0" cy="0" rx="300" ry="75" fill="none" stroke="#fed7aa" strokeWidth="15" opacity="0.75" />
          {/* Planet Body */}
          <circle cx="0" cy="0" r="120" fill="#ca8a04" />
          <ellipse cx="0" cy="-20" rx="118" ry="18" fill="#eab308" opacity="0.7" />
          <ellipse cx="0" cy="20" rx="118" ry="18" fill="#a16207" opacity="0.7" />
          {/* Ring Arc in Front */}
          <path d="M -340 0 A 340 85 0 0 0 340 0" fill="none" stroke="#d97706" strokeWidth="30" opacity="0.85" />
          <path d="M -300 0 A 300 75 0 0 0 300 0" fill="none" stroke="#fed7aa" strokeWidth="15" opacity="0.9" />
        </g>

        {/* Active Enceladus Ice Geysers erupting into space */}
        <g transform="translate(180, 220)">
          <circle cx="0" cy="0" r="28" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="0" y="44" textAnchor="middle" fill="#bae6fd" fontFamily="IBM Plex Mono" fontSize="9">
            ENCELADUS
          </text>
          {/* Erupting Water Plumes */}
          <motion.path
            animate={{ scaleY: [0.8, 1.4, 0.9], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            d="M -10 -28 Q 0 -90 10 -28 Z"
            fill="#38bdf8"
            opacity="0.8"
          />
        </g>

        {/* Cassini Spacecraft diving through ring plane */}
        <motion.g
          animate={{ y: [-8, 8, -8], rotate: [-16, -14, -16] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          transform="translate(420, 280)"
        >
          <ellipse cx="0" cy="-40" rx="65" ry="22" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
          <rect x="-25" y="-18" width="50" height="70" rx="5" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <line x1="-25" y1="20" x2="-75" y2="35" stroke="#64748b" strokeWidth="4" />
          <rect x="-85" y="25" width="20" height="15" fill="#334155" stroke="#0ea5e9" strokeWidth="1" />
          <text x="0" y="85" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            CASSINI
          </text>
        </motion.g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          CASSINI · SAMPLING HYDROTHERMAL OCEAN PLUMES OF ENCELADUS AT SATURN
        </text>

        <KurzgesagtBird action="float" x="320" y="360" scale={1.1} />
      </svg>
    </motion.div>
  );
}

export function LiveNewHorizonsSurface({ speed }: { speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#020306" />

        {/* Pluto with Tombaugh Regio Heart */}
        <g transform="translate(680, 280)">
          <circle cx="0" cy="0" r="130" fill="#78350f" />
          {/* Glowing Nitrogen Ice Heart */}
          <path
            d="M -20 -10 C -20 -40 -60 -40 -60 -10 C -60 25 0 60 0 75 C 0 60 60 25 60 -10 C 60 -40 20 -40 20 -10 Z"
            fill="#fef3c7"
            opacity="0.9"
          />
          {/* Blue Atmosphere Ring */}
          <circle cx="0" cy="0" r="136" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.6" />
          <text x="0" y="105" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="10">
            TOMBAUGH REGIO (THE HEART)
          </text>
        </g>

        {/* Charon */}
        <circle cx="860" cy="140" r="45" fill="#475569" stroke="#9a3412" strokeWidth="3" />

        {/* New Horizons Spacecraft Flying by */}
        <motion.g
          animate={{ x: [0, 15, 0], y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          transform="translate(280, 270) rotate(10)"
        >
          <ellipse cx="0" cy="-35" rx="55" ry="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
          <polygon points="-35,35 35,35 0,-15" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <rect x="15" y="-5" width="22" height="12" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <rect x="-48" y="15" width="22" height="15" fill="#334155" stroke="#f59e0b" strokeWidth="1" />
          <text x="0" y="58" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            NEW HORIZONS
          </text>
        </motion.g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          NEW HORIZONS · GLIDING PAST THE FROZEN NITROGEN HEART OF PLUTO (NASA)
        </text>

        <KurzgesagtBird action="float" x="180" y="340" scale={1.1} />
      </svg>
    </motion.div>
  );
}

export function LiveApolloSurface({
  artifactId,
  speed,
}: {
  artifactId: string;
  speed: number;
}) {
  const hasRover = ["apollo-15", "apollo-16", "apollo-17"].includes(artifactId);
  const isApollo12 = artifactId === "apollo-12";
  const missionName = artifactId.toUpperCase().replace("-", " ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#02040a" />
        {/* Blue Marble Earth in the Pitch Black Lunar Sky */}
        <circle cx="780" cy="110" r="32" fill="#1e40af" />
        <ellipse cx="775" cy="105" rx="18" ry="12" fill="#38bdf8" />
        <ellipse cx="785" cy="115" rx="12" ry="8" fill="#15803d" />

        <ellipse cx="500" cy="510" rx="650" ry="190" fill="#334155" />

        {/* Apollo Descent Stage */}
        <g transform="translate(380, 280)">
          <polygon points="0,60 25,10 95,10 120,60 95,110 25,110" fill="#d97706" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="22" fill="#78350f" />
          <line x1="20" y1="95" x2="-45" y2="165" stroke="#cbd5e1" strokeWidth="5" />
          <line x1="100" y1="95" x2="165" y2="165" stroke="#cbd5e1" strokeWidth="5" />
          <circle cx="-45" cy="168" r="16" fill="#e2e8f0" />
          <circle cx="165" cy="168" r="16" fill="#e2e8f0" />

          {/* Planted Flag */}
          <line x1="-80" y1="70" x2="-80" y2="165" stroke="#cbd5e1" strokeWidth="2.5" />
          <rect x="-80" y="70" width="30" height="18" fill="#ef4444" />
          <rect x="-80" y="70" width="14" height="9" fill="#1e40af" />
        </g>

        {/* Lunar Rover for Apollo 15/16/17 */}
        {hasRover && (
          <g transform="translate(640, 390)">
            <rect x="0" y="0" width="65" height="15" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
            <circle cx="10" cy="30" r="12" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="55" cy="30" r="12" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="45" y1="0" x2="45" y2="-25" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="45" cy="-28" rx="14" ry="5" fill="#f8fafc" stroke="#64748b" />
          </g>
        )}

        {/* Surveyor 3 visible in background for Apollo 12 */}
        {isApollo12 && (
          <g transform="translate(180, 360) scale(0.6)">
            <polygon points="10,60 50,30 90,60" fill="none" stroke="#94a3b8" strokeWidth="3" />
            <line x1="50" y1="30" x2="50" y2="-40" stroke="#cbd5e1" strokeWidth="3" />
            <text x="50" y="80" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="12">
              SURVEYOR 3 (160M)
            </text>
          </g>
        )}

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {missionName} · FIRST-HAND HUMAN FOOTSTEPS & PERMANENT LUNAR MONUMENT
        </text>

        {/* Astronaut Kurzgesagt Bird on the Moon */}
        <KurzgesagtBird action="salute" x="270" y="420" scale={1.2} />
      </svg>
    </motion.div>
  );
}

export function LiveChandrayaanSurface({
  artifactId,
  speed,
}: {
  artifactId: string;
  speed: number;
}) {
  const isC2 = artifactId === "chandrayaan-2";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#090d16" />
        <ellipse cx="500" cy="500" rx="600" ry="180" fill="#334155" />
        <ellipse cx="280" cy="460" rx="140" ry="35" fill="#1e293b" />
        <ellipse cx="720" cy="480" rx="180" ry="40" fill="#1e293b" />

        {/* Vikram Lander Chassis */}
        <g transform="translate(420, 310)">
          <rect x="0" y="0" width="110" height="80" rx="8" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          {/* Indian Tricolor */}
          <rect x="35" y="25" width="40" height="5" fill="#f97316" />
          <rect x="35" y="30" width="40" height="5" fill="#ffffff" />
          <rect x="35" y="35" width="40" height="5" fill="#15803d" />
          <line x1="15" y1="80" x2="-25" y2="135" stroke="#94a3b8" strokeWidth="5" />
          <line x1="95" y1="80" x2="135" y2="135" stroke="#94a3b8" strokeWidth="5" />
          <circle cx="-25" cy="138" r="12" fill="#64748b" />
          <circle cx="135" cy="138" r="12" fill="#64748b" />

          {/* Roll-down Ramp */}
          <polygon points="55,80 85,80 145,140 115,140" fill="#475569" stroke="#334155" />
        </g>

        {/* Pragyan Rover rolling on the lunar South Pole regolith */}
        {!isC2 && (
          <motion.g
            animate={{ x: [0, 25, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            transform="translate(600, 420)"
          >
            <rect x="0" y="0" width="55" height="24" rx="4" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
            <rect x="5" y="-12" width="45" height="12" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
            {[8, 28, 48].map((wx, i) => (
              <circle key={i} cx={wx} cy="30" r="7" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
            ))}
            <text x="28" y="16" textAnchor="middle" fill="#fef08a" fontFamily="IBM Plex Mono" fontSize="8" fontWeight="bold">
              PRAGYAN
            </text>
          </motion.g>
        )}

        <text x="500" y="555" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {isC2
            ? "CHANDRAYAAN-2 · TIRANGA POINT LUNAR SOUTH POLAR HIGHLANDS (ISRO)"
            : "CHANDRAYAAN-3 · VIKRAM & PRAGYAN AT SHIV SHAKTI POINT (ISRO)"}
        </text>

        <KurzgesagtBird action="salute" x="280" y="420" scale={1.2} />
      </svg>
    </motion.div>
  );
}

export function LiveVoyagerPioneerDeepSpace({
  artifactId,
  speed,
}: {
  artifactId: string;
  speed: number;
}) {
  const isPioneer = artifactId.startsWith("pioneer");
  const isV2 = artifactId === "voyager-2";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 / speed }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#010206" />

        {/* Faint distant Sun */}
        <circle cx="860" cy="110" r="3" fill="#ffffff" />
        <circle cx="860" cy="110" r="8" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />

        {/* Spacecraft Gliding through the Interstellar Void */}
        <motion.g
          animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          transform="translate(420, 240)"
        >
          {/* Parabolic High Gain Dish */}
          <ellipse cx="60" cy="40" rx="90" ry="32" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <polygon points="20,85 100,85 115,130 5,130" fill="#d97706" />

          {/* Golden Record or Pioneer Plaque with live light shimmer gleam */}
          <g transform="translate(60, 108)">
            <circle cx="0" cy="0" r="24" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
            <motion.line
              animate={{ x1: [-25, 25], x2: [-15, 35] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              y1="-20"
              y2="20"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>

          <line x1="115" y1="105" x2="280" y2="140" stroke="#cbd5e1" strokeWidth="3" />
          <text x="60" y="152" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="bold">
            {isPioneer ? "PIONEER" : isV2 ? "VOYAGER 2" : "VOYAGER 1"}
          </text>
        </motion.g>

        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          {isPioneer
            ? "PIONEER · CARRYING CARL SAGAN'S GOLDEN PLAQUE TOWARD THE STARS"
            : "VOYAGER · BEYOND THE HELIOPAUSE BEARING HUMANITY'S GOLDEN RECORD"}
        </text>

        {/* Floating Spacewalking Kurzgesagt Bird */}
        <KurzgesagtBird action="float" x="280" y="320" scale={1.1} />
      </svg>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Main MultiMissionAnimationScene Orchestrator
 * ──────────────────────────────────────────────────────────────── */

export function MultiMissionAnimationScene({
  artifactId,
  stageId,
  stageIndex = 0,
  totalStages = 4,
  speed,
}: SceneProps) {
  const artifact = getArtifact(artifactId);
  const phase = getStagePhase(stageId, stageIndex, totalStages);

  const missionTitle = artifact?.name ?? artifactId.toUpperCase();
  const agency = (artifact?.agency ?? "NASA") as "NASA" | "ISRO" | "ESA";
  const targetBody = artifact?.site ?? artifact?.bodyId ?? "Deep Space";

  // 1. Cleanroom Assembly Stage
  if (phase === "cleanroom") {
    return <CleanroomScene missionTitle={missionTitle} agency={agency} speed={speed} />;
  }

  // 2. Launch & Rocket Liftoff Stage
  if (phase === "launch") {
    return <LaunchScene missionTitle={missionTitle} agency={agency} speed={speed} />;
  }

  // 3. Interplanetary Cruise Stage
  if (phase === "cruise") {
    return <CruiseScene missionTitle={missionTitle} targetBody={targetBody} speed={speed} />;
  }

  // 4. Descent & Entry Stage
  if (phase === "descent") {
    const isSkycrane = artifactId === "curiosity" || artifactId === "perseverance";
    return (
      <DescentScene
        missionTitle={missionTitle}
        type={isSkycrane ? "skycrane" : "parachute"}
        speed={speed}
      />
    );
  }

  // 5. Monument & Sunset Legacy Stage
  if (phase === "monument") {
    return <MonumentTwilightScene missionTitle={missionTitle} bodyName={targetBody} speed={speed} />;
  }

  // 6. Live Working Surface Operations Stage
  if (artifactId === "curiosity" || artifactId === "perseverance") {
    return <LiveCuriosityPerseveranceSurface artifactId={artifactId} speed={speed} />;
  }
  if (artifactId === "ingenuity") {
    return <LiveIngenuityFlightSurface speed={speed} />;
  }
  if (artifactId === "insight" || artifactId === "phoenix") {
    return <LiveInSightSurface speed={speed} />;
  }
  if (artifactId === "cassini" || artifactId === "huygens") {
    return <LiveCassiniSurface speed={speed} />;
  }
  if (artifactId === "new-horizons") {
    return <LiveNewHorizonsSurface speed={speed} />;
  }
  if (artifactId.startsWith("apollo-") || artifactId === "surveyor-3") {
    return <LiveApolloSurface artifactId={artifactId} speed={speed} />;
  }
  if (artifactId.startsWith("chandrayaan-")) {
    return <LiveChandrayaanSurface artifactId={artifactId} speed={speed} />;
  }
  if (artifactId.startsWith("voyager-") || artifactId.startsWith("pioneer-")) {
    return <LiveVoyagerPioneerDeepSpace artifactId={artifactId} speed={speed} />;
  }

  // Generic fallback:
  if (artifact?.kind === "rover") {
    return <LiveCuriosityPerseveranceSurface artifactId="curiosity" speed={speed} />;
  }
  if (artifact?.kind === "lander" || artifact?.kind === "descent-stage") {
    return <LiveApolloSurface artifactId="apollo-11" speed={speed} />;
  }
  return <CruiseScene missionTitle={missionTitle} targetBody={targetBody} speed={speed} />;
}
