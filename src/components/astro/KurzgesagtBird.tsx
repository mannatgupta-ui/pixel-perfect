import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, X } from "lucide-react";
import type { AstroContextState } from "./AstroContext";

interface Props {
  context: AstroContextState;
  onClick: () => void;
  isOpen: boolean;
}

export function KurzgesagtBird({ context, onClick, isOpen }: Props) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  // Natural blinking rhythm (every 4-6 seconds)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Context-aware quips from the Kurzgesagt bird
  useEffect(() => {
    setBubbleDismissed(false);
    let quip = "Quack! I'm your space travel duck companion. Tap me to talk!";

    if (context.selectedArtifact) {
      if (context.selectedArtifact.toLowerCase().includes("spirit")) {
        quip = "Quack! Spirit drove 7.7 km backwards because a front wheel jammed in 2006!";
      } else if (context.selectedArtifact.toLowerCase().includes("opportunity")) {
        quip = "Opportunity drove a whole marathon on Mars! 45.16 kilometres!";
      } else if (context.selectedArtifact.toLowerCase().includes("chandrayaan")) {
        quip = "Shiv Shakti Point! India was the first to land near the Moon's South Pole!";
      } else if (context.selectedArtifact.toLowerCase().includes("huygens")) {
        quip = "Titan has rivers of liquid methane! Huygens landed on rounded water-ice pebbles!";
      } else if (context.selectedArtifact.toLowerCase().includes("apollo")) {
        quip = "The Apollo 11 descent stage plaque says: 'We came in peace for all mankind'.";
      } else if (context.selectedArtifact.toLowerCase().includes("philae")) {
        quip = "Philae bounced a whole kilometre high into comet microgravity!";
      } else if (context.selectedArtifact.toLowerCase().includes("voyager")) {
        quip = "Voyager 1 is in interstellar space! It carries Earth's Golden Record.";
      } else {
        quip = `Inspecting ${context.selectedArtifact}! Tap me to learn its secret science.`;
      }
    } else if (context.selectedPlanet) {
      if (context.selectedPlanet.toLowerCase().includes("mars")) {
        quip = "The Red Planet! Cold, dusty, and full of our heroic robotic explorers.";
      } else if (context.selectedPlanet.toLowerCase().includes("moon")) {
        quip = "The Moon! Airless and silent, preserving every footprint for millions of years.";
      } else {
        quip = `Traveling to ${context.selectedPlanet}! Look at that orbital path!`;
      }
    }

    setBubbleText(quip);

    // Auto-hide bubble after 9 seconds so it doesn't clutter
    const timer = setTimeout(() => {
      setBubbleDismissed(true);
    }, 9000);

    return () => clearTimeout(timer);
  }, [context.selectedArtifact, context.selectedPlanet, context.currentStoryStage]);

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Speech Bubble from the Bird */}
      <AnimatePresence>
        {!isOpen && bubbleText && !bubbleDismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group absolute bottom-24 right-2 w-64 cursor-pointer rounded-2xl border border-primary/40 bg-panel/95 p-3.5 shadow-panel backdrop-blur-xl transition-all hover:border-primary hover:shadow-glow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xs font-semibold text-primary-glow">
                  ASTRO Duck
                </span>
                <span className="rounded-full bg-primary/20 px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-wider text-teal">
                  Guide
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBubbleDismissed(true);
                }}
                className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Dismiss message"
              >
                <X className="size-3" />
              </button>
            </div>
            <p className="mt-1 text-xs text-foreground/90 leading-relaxed font-sans">
              {bubbleText}
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-teal">
              <span>Tap to chat</span>
              <MessageCircle className="size-3" />
            </div>

            {/* Bubble Tail Pointing to Duck */}
            <div className="absolute -bottom-2 right-8 size-4 rotate-45 border-r border-b border-primary/40 bg-panel/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Kurzgesagt Bird Mascot Button */}
      <motion.div
        drag
        dragConstraints={{ top: -450, left: -600, right: 0, bottom: 0 }}
        dragElastic={0.15}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={{
          y: [0, -10, 1, -8, 0],
          rotate: [-2, 3, -1, 3, -2],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={onClick}
        className="group relative cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Open AI Space Copilot"
      >
        {/* Glowing halo when floating in space */}
        <div className="absolute -inset-2 rounded-full bg-primary/20 blur-md transition-all group-hover:bg-primary/40 group-hover:blur-lg" />

        {/* Outer Glass Astronaut Suit Bubble */}
        <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-primary/40 bg-panel/85 p-2 shadow-panel backdrop-blur-md transition-all group-hover:border-primary group-hover:shadow-glow">
          {/* THE KURZGESAGT DUCK VECTOR MASCOT */}
          <svg viewBox="0 0 100 100" className="size-full overflow-visible">
            {/* Mini Rocket Thruster Jetpack at back */}
            <g transform="translate(14, 46)">
              <rect x="0" y="0" width="10" height="20" rx="3" fill="#64748b" stroke="#334155" strokeWidth="1" />
              {/* Thruster Flame flickering */}
              <motion.polygon
                points="2,20 5,30 8,20"
                fill="#38bdf8"
                animate={{
                  points: [
                    "2,20 5,28 8,20",
                    "2,20 5,34 8,20",
                    "2,20 5,26 8,20",
                  ],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.polygon
                points="3,20 5,25 7,20"
                fill="#ffffff"
                animate={{
                  points: [
                    "3,20 5,24 7,20",
                    "3,20 5,28 7,20",
                    "3,20 5,23 7,20",
                  ],
                }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>

            {/* Duck Body (Round sunny yellow belly) */}
            <ellipse cx="48" cy="54" rx="24" ry="22" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />

            {/* Duck Tail Fluff */}
            <path d="M26 56 Q 18 50 22 44 Q 28 48 30 52 Z" fill="#eab308" />

            {/* Little Duck Foot floating in zero-G */}
            <path d="M42 74 Q 40 82 46 80 Q 48 76 46 72 Z" fill="#ea580c" />
            <path d="M52 74 Q 54 82 58 78 Q 56 74 54 72 Z" fill="#f97316" />

            {/* Wing (Animated flapping motion) */}
            <motion.path
              d="M36 50 Q 48 48 54 58 Q 44 65 34 58 Z"
              fill="#eab308"
              stroke="#ca8a04"
              strokeWidth="1.2"
              animate={{
                rotate: [0, -12, 0, -8, 0],
                transformOrigin: "36px 50px",
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Duck Head */}
            <circle cx="58" cy="38" rx="17" ry="17" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />

            {/* Big Expressive Cartoon Eye */}
            {isBlinking ? (
              // Blink state (horizontal line)
              <line x1="62" y1="36" x2="72" y2="36" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              // Open Eye
              <g>
                <ellipse cx="67" cy="36" rx="5" ry="6.5" fill="#1c1917" />
                {/* Catchlight sparkle */}
                <circle cx="68.5" cy="34" r="2" fill="#ffffff" />
                <circle cx="65.5" cy="38" r="1" fill="#ffffff" />
              </g>
            )}

            {/* Duck Beak (Iconic Kurzgesagt Orange) */}
            <path
              d="M72 38 Q 88 40 84 46 Q 72 48 70 42 Z"
              fill="#f97316"
              stroke="#c2410c"
              strokeWidth="1.2"
            />

            {/* Glass Astronaut Bubble Space Helmet */}
            <circle
              cx="55" cy="40" r="28"
              fill="url(#duckHelmetGlass)"
              stroke="#38bdf8"
              strokeWidth="1.5"
              opacity="0.85"
            />

            {/* Helmet Reflection Arcs */}
            <path
              d="M38 26 Q 52 18 68 22"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <circle cx="72" cy="26" r="1.5" fill="#ffffff" opacity="0.7" />

            {/* Helmet Gold Ring Collar */}
            <ellipse cx="55" cy="65" rx="18" ry="3.5" fill="#d97706" stroke="#b45309" strokeWidth="1" />

            <defs>
              <radialGradient id="duckHelmetGlass" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Little Floating "Quack / Copilot" status pill */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
          {isOpen ? "Duck Active" : "ASTRO Duck"}
        </div>
      </motion.div>
    </div>
  );
}

