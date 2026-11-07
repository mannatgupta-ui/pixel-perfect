import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  FastForward,
  Bot,
  Layers,
  Sparkles,
  Info,
  Calendar,
  Compass,
  ArrowRight,
  Maximize2,
} from "lucide-react";

import { SPIRIT_STORY, STORY_DISCLAIMER, type StoryStage, type Hotspot } from "@/data/spirit";
import { getArtifact } from "@/data/artifacts";
import { Button } from "@/components/ui/button";
import { useAstro } from "@/components/astro/AstroContext";
import { cn } from "@/lib/utils";

interface StorySearch {
  stage?: number;
}

export const Route = createFileRoute("/story/$artifactId")({
  validateSearch: (s: Record<string, unknown>): StorySearch => {
    const st = Number(s["stage"]);
    return !isNaN(st) && st >= 0 && st < SPIRIT_STORY.length ? { stage: st } : {};
  },
  loader: ({ params }) => {
    if (params.artifactId !== "spirit") throw notFound();
    const artifact = getArtifact("spirit");
    return { artifact: artifact! };
  },
  head: () => ({
    meta: [
      { title: "Spirit Rover — The Animated Story: Abandoned but Not Forgotten" },
      {
        name: "description",
        content:
          "An 11-stage first-person animated story of Spirit Rover's journey from launch to its final signal at Troy.",
      },
      { property: "og:title", content: "Spirit Rover: An Interactive Story" },
      {
        property: "og:description",
        content: "Watch Spirit narrate its 6-year Mars journey across 11 interactive stages.",
      },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  const { stage: searchStage } = Route.useSearch();
  const { updateContext, openWithPrompt } = useAstro();

  const [currentIdx, setCurrentIdx] = useState<number>(searchStage ?? 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showScience, setShowScience] = useState<boolean>(false);

  const stage = SPIRIT_STORY[currentIdx] ?? SPIRIT_STORY[0]!;

  // Update URL search when stage changes
  const navigate = Route.useNavigate();
  const goToStage = (idx: number) => {
    const clamped = Math.max(0, Math.min(SPIRIT_STORY.length - 1, idx));
    setCurrentIdx(clamped);
    setActiveHotspot(null);
    navigate({ search: { stage: clamped }, replace: true });
  };

  // Sync ASTRO context with active story stage
  useEffect(() => {
    updateContext({
      selectedArtifact: "Spirit Rover",
      selectedMission: "Mars Exploration Rover A",
      selectedPlanet: "Mars",
      currentStoryStage: `${stage.number}. ${stage.title}`,
      selectedComponent: null,
    });
  }, [stage]);

  // Speech synthesis for first-person narration
  useEffect(() => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const fullText = stage.narration.join(" ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.95 * speed;
    utterance.pitch = 1.0;

    // Pick natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith("en") && !v.name.includes("whisper"));
    if (englishVoice) utterance.voice = englishVoice;

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentIdx, voiceEnabled, speed]);

  // Auto-advance timer when playing
  useEffect(() => {
    if (!isPlaying) return;

    const stageDurationMs = 12000 / speed;
    const timer = setTimeout(() => {
      if (currentIdx < SPIRIT_STORY.length - 1) {
        goToStage(currentIdx + 1);
      } else {
        setIsPlaying(false);
      }
    }, stageDurationMs);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIdx, speed]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const nextStage = () => goToStage(currentIdx + 1);
  const prevStage = () => goToStage(currentIdx - 1);
  const restart = () => {
    goToStage(0);
    setIsPlaying(true);
  };

  return (
    <main className="relative min-h-[100svh] bg-background pt-14 pb-20 overflow-x-hidden">
      {/* Cinematic Animation Canvas Container */}
      <section className="relative w-full h-[58svh] sm:h-[66svh] bg-space overflow-hidden border-b border-border">
        {/* Animated Scene Canvas */}
        <AnimatePresence mode="wait">
          <StageAnimationScene key={stage.id} stageId={stage.id} speed={speed} />
        </AnimatePresence>

        {/* Hotspots overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {stage.hotspots.map((hs, i) => (
            <div
              key={i}
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2"
            >
              <button
                type="button"
                onClick={() => setActiveHotspot(activeHotspot === hs ? null : hs)}
                className="group relative flex size-6 items-center justify-center rounded-full bg-mars-gradient text-primary-foreground shadow-glow hover:scale-125 transition-transform"
                title={hs.label}
              >
                <span className="size-2 rounded-full bg-white" />
                <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
              </button>

              {/* Hotspot tooltip */}
              {activeHotspot === hs && (
                <div className="absolute left-1/2 bottom-8 -translate-x-1/2 z-30 w-56 rounded-2xl border border-border bg-panel p-3 shadow-panel text-left">
                  <div className="font-display text-xs font-semibold text-primary-glow">{hs.label}</div>
                  <div className="mt-1 text-xs text-foreground/90 leading-snug">{hs.text}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Top Info Overlay: Stage Header */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-20 px-4 sm:px-8 flex justify-between items-start">
          <div className="pointer-events-auto rounded-2xl border border-border/80 bg-panel/85 px-4 py-2.5 backdrop-blur shadow-panel">
            <span className="eyebrow">Stage {stage.number} of 11</span>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              {stage.title}
            </h1>
            <div className="flex items-center gap-2 mt-0.5 font-mono text-xs text-teal">
              <Calendar className="size-3" /> {stage.date}
            </div>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <Button
              variant="glass"
              size="sm"
              onClick={() => setVoiceEnabled((v) => !v)}
              className={cn("rounded-full px-3 gap-1.5", voiceEnabled && "border-teal text-teal")}
              title={voiceEnabled ? "Mute Voice Narration" : "Enable Voice Narration"}
            >
              {voiceEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              <span className="hidden sm:inline text-xs">{voiceEnabled ? "Voice On" : "Voice Off"}</span>
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={() =>
                openWithPrompt(
                  `Tell me all about Spirit Rover's stage "${stage.title}" (${stage.date}). What happened historically?`
                )
              }
              className="rounded-full px-3 gap-1.5"
            >
              <Bot className="size-4 text-primary-glow" />
              <span className="hidden sm:inline text-xs">Ask ASTRO</span>
            </Button>
          </div>
        </div>

        {/* Interactive Scrubbing Bar (Bottom of canvas) */}
        <div className="absolute bottom-3 inset-x-4 sm:inset-x-8 z-30 pointer-events-auto">
          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-panel/90 p-3 backdrop-blur shadow-panel">
            {/* Milestones track */}
            <div className="relative flex items-center justify-between gap-1">
              {SPIRIT_STORY.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToStage(idx)}
                  className={cn(
                    "relative flex-1 h-2 rounded-full transition-all",
                    idx === currentIdx
                      ? "bg-mars-gradient shadow-glow h-3"
                      : idx < currentIdx
                      ? "bg-primary/50"
                      : "bg-muted/70 hover:bg-muted",
                  )}
                  title={`${s.number}. ${s.title}`}
                />
              ))}
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={prevStage}
                  disabled={currentIdx === 0}
                  className="rounded-full size-8 p-0"
                  title="Previous Stage"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={togglePlay}
                  className="rounded-full px-4 gap-1.5"
                >
                  {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
                  <span className="text-xs font-semibold">{isPlaying ? "Pause" : "Play"}</span>
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={nextStage}
                  disabled={currentIdx === SPIRIT_STORY.length - 1}
                  className="rounded-full size-8 p-0"
                  title="Next Stage"
                >
                  <ChevronRight className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={restart}
                  className="rounded-full size-8 p-0 text-muted-foreground hover:text-foreground"
                  title="Restart from Stage 1"
                >
                  <RotateCcw className="size-3.5" />
                </Button>
              </div>

              {/* Playback Speed toggle */}
              <div className="flex items-center gap-1 font-mono text-xs">
                {[0.5, 1, 1.5, 2].map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => setSpeed(sp)}
                    className={cn(
                      "rounded-lg px-2 py-0.5 transition-colors",
                      speed === sp
                        ? "bg-primary/20 text-primary-glow font-bold border border-primary/40"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {sp}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Scientific Deep Dive Section */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* First-Person Voice Narration Block */}
          <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <span className="eyebrow">Spirit's Monologue</span>
              <span className="font-mono text-xs text-muted-foreground">Historical Storytelling</span>
            </div>

            <div className="mt-6 space-y-4">
              {stage.narration.map((p, idx) => (
                <p
                  key={idx}
                  className="text-lg sm:text-xl font-normal leading-relaxed text-foreground/95 italic font-sans"
                >
                  “{p}”
                </p>
              ))}
            </div>

            <footer className="mt-6 border-t border-border/60 pt-4 font-mono text-xs text-muted-foreground">
              — {STORY_DISCLAIMER}
            </footer>
          </div>

          {/* Scientific Context & Verified NASA Archive Facts */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-panel p-6 shadow-panel">
              <span className="eyebrow">{stage.scienceTitle}</span>
              <h3 className="mt-1 font-display text-base font-semibold text-foreground">
                Scientific Context
              </h3>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                {stage.science}
              </p>

              <div className="mt-6">
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-teal">
                  Key Mission Facts
                </h4>
                <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                  {stage.facts.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary-glow font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* NASA Photograph if available */}
            {stage.photo && (
              <div className="overflow-hidden rounded-3xl border border-border bg-panel shadow-panel">
                <img
                  src={stage.photo.url}
                  alt={stage.photo.caption}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4 text-xs">
                  <p className="text-foreground/90">{stage.photo.caption}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">Credit: {stage.photo.credit}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stage Jump Links */}
        <div className="mt-14 border-t border-border pt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-semibold">All 11 Mission Stages</h3>
            <span className="font-mono text-xs text-muted-foreground">Click any stage to jump</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {SPIRIT_STORY.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToStage(idx)}
                className={cn(
                  "rounded-2xl border p-2.5 text-left transition-all",
                  idx === currentIdx
                    ? "border-primary bg-primary/15 text-primary-glow shadow-glow"
                    : "border-border bg-panel hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                <div className="font-mono text-[10px] font-semibold">{s.number}</div>
                <div className="text-xs font-medium truncate mt-0.5">{s.title}</div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button asChild variant="glass">
              <Link to="/artifact/$artifactId" params={{ artifactId: "spirit" }}>
                Return to 3D Spirit Hardware Inspection <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Procedural Kurzgesagt-inspired 2D Vector Animation Scenes
 * for each of the 11 mission stages.
 */
function StageAnimationScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      {/* 01: MY CREATION */}
      {stageId === "creation" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="cleanroomGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e3458" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0c1220" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#cleanroomGlow)" />
          {/* Grid blueprint lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 30}
              x2="1000"
              y2={i * 30}
              stroke="#2c4268"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
          ))}
          {Array.from({ length: 34 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 30}
              y1="0"
              x2={i * 30}
              y2="600"
              stroke="#2c4268"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
          ))}

          {/* Cleanroom technicians silhouettes */}
          <circle cx="200" cy="420" r="18" fill="#58729c" />
          <path d="M185 440 Q 200 435 215 440 L 220 530 L 180 530 Z" fill="#58729c" />
          <circle cx="800" cy="430" r="18" fill="#58729c" />
          <path d="M785 450 Q 800 445 815 450 L 820 530 L 780 530 Z" fill="#58729c" />

          {/* Central Rover Silhouette & Hologram Blueprint */}
          <g transform="translate(380, 240)">
            <rect x="0" y="40" width="240" height="90" rx="14" fill="#e8e1d2" stroke="#5cb8b2" strokeWidth="2" />
            <rect x="20" y="15" width="200" height="25" rx="6" fill="#1b2e50" stroke="#5cb8b2" strokeWidth="1.5" />
            {/* Mast */}
            <rect x="170" y="-80" width="14" height="100" fill="#c0c7d0" />
            <rect x="155" y="-105" width="44" height="25" rx="5" fill="#2d3748" />
            <circle cx="168" cy="-93" r="6" fill="#00d8d6" />
            <circle cx="186" cy="-93" r="6" fill="#00d8d6" />
            {/* Solar arrays open */}
            <path d="M-60 25 L 0 35 L 0 50 L -60 35 Z" fill="#203a6e" stroke="#5cb8b2" strokeWidth="1" />
            <path d="M240 35 L 300 25 L 300 35 L 240 50 Z" fill="#203a6e" stroke="#5cb8b2" strokeWidth="1" />
            {/* Wheels */}
            {[-30, 40, 110, 180, 250].map((x, idx) => (
              <g key={idx} transform={`translate(${x}, 130)`}>
                <circle cx="15" cy="15" r="24" fill="#64748b" stroke="#334155" strokeWidth="3" />
                <circle cx="15" cy="15" r="8" fill="#94a3b8" />
              </g>
            ))}
          </g>

          <text x="500" y="120" textAnchor="middle" fill="#63e6be" fontFamily="IBM Plex Mono" fontSize="14" letterSpacing="3">
            NASA / JPL CLEANROOM · PASADENA, CALIFORNIA (2002)
          </text>
        </svg>
      )}

      {/* 02: MY LAUNCH */}
      {stageId === "launch" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="skyLaunch" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="35%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0b0f19" />
            </linearGradient>
            <linearGradient id="rocketPlume" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#skyLaunch)" />

          {/* Ocean coastline */}
          <path d="M0 550 Q 500 520 1000 550 L 1000 600 L 0 600 Z" fill="#0f172a" />
          <path d="M350 540 L 400 480 L 410 540 Z" fill="#1e293b" />

          {/* Delta II Rocket Ascending */}
          <g transform="translate(500, 160)">
            {/* Exhaust Plume */}
            <path d="M-15 130 Q -60 280 0 380 Q 60 280 15 130 Z" fill="url(#rocketPlume)" opacity="0.9" />
            {/* Rocket Body */}
            <rect x="-14" y="0" width="28" height="130" rx="3" fill="#e2e8f0" stroke="#334155" />
            {/* Payload fairing */}
            <path d="M-14 0 Q 0 -50 14 0 Z" fill="#f8fafc" />
            {/* Solid Rocket Boosters */}
            <rect x="-24" y="50" width="9" height="75" rx="2" fill="#cbd5e1" />
            <rect x="15" y="50" width="9" height="75" rx="2" fill="#cbd5e1" />
            {/* Blue Delta band */}
            <rect x="-14" y="25" width="28" height="8" fill="#2563eb" />
          </g>
          <text x="500" y="575" textAnchor="middle" fill="#fcd34d" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            DELTA II 7925 LIFTOFF · CAPE CANAVERAL (10 JUNE 2003)
          </text>
        </svg>
      )}

      {/* 03: MY JOURNEY */}
      {stageId === "journey" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#090d16" />
          {/* Star particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 37) % 1000}
              cy={(i * 23) % 600}
              r={(i % 3) + 0.8}
              fill="#e2e8f0"
              opacity={0.3 + (i % 5) * 0.15}
            />
          ))}

          {/* Orbital path curve */}
          <path d="M120 440 C 350 200, 650 140, 880 280" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 6" />

          {/* Earth */}
          <g transform="translate(120, 440)">
            <circle cx="0" cy="0" r="32" fill="#3b82f6" />
            <path d="M-20 -10 Q 0 15 20 -5 Q 5 -25 -20 -10 Z" fill="#10b981" opacity="0.8" />
            <text x="0" y="50" textAnchor="middle" fill="#93c5fd" fontFamily="IBM Plex Mono" fontSize="11">EARTH</text>
          </g>

          {/* Mars */}
          <g transform="translate(880, 280)">
            <circle cx="0" cy="0" r="26" fill="#e11d48" />
            <circle cx="-6" cy="-8" r="7" fill="#fb7185" opacity="0.6" />
            <text x="0" y="44" textAnchor="middle" fill="#fda4af" fontFamily="IBM Plex Mono" fontSize="11">MARS</text>
          </g>

          {/* Cruise Stage */}
          <g transform="translate(520, 215)">
            <circle cx="0" cy="0" r="28" fill="#d97706" />
            {/* Solar arrays on cruise stage */}
            <rect x="-65" y="-10" width="38" height="20" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
            <rect x="27" y="-10" width="38" height="20" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
            <circle cx="0" cy="0" r="10" fill="#f8fafc" />
            <path d="M0 -30 L 0 -12" stroke="#67e8f9" strokeWidth="2" />
          </g>

          <text x="500" y="550" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            HOHMANN TRANSFER ORBIT · 487 MILLION KILOMETRES (JUNE 2003 - JAN 2004)
          </text>
        </svg>
      )}

      {/* 04: MY ARRIVAL */}
      {stageId === "arrival" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="entryFlame" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="80%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="1000" height="600" fill="#0b0f19" />

          {/* Martian curvature */}
          <path d="M-100 650 Q 500 350 1100 650 Z" fill="#991b1b" />
          <path d="M-100 650 Q 500 360 1100 650 Z" fill="#b91c1c" opacity="0.6" />

          {/* Fiery Aeroshell Entry */}
          <g transform="translate(480, 260) rotate(28)">
            {/* Shockwave plasma plume */}
            <path d="M-60 -40 Q 0 -110 60 -40 L 70 80 Q 0 140 -70 80 Z" fill="url(#entryFlame)" opacity="0.85" />
            {/* Heat shield */}
            <path d="M-45 30 Q 0 50 45 30 L 35 -15 L -35 -15 Z" fill="#3f3f46" stroke="#ea580c" strokeWidth="3" />
            {/* Aeroshell cone */}
            <path d="M-35 -15 L 0 -55 L 35 -15 Z" fill="#e4e4e7" stroke="#71717a" strokeWidth="1.5" />
          </g>

          <text x="500" y="550" textAnchor="middle" fill="#fca5a5" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            HYPERSONIC MARTIAN ATMOSPHERIC ENTRY · 19,300 KM/H (4 JAN 2004)
          </text>
        </svg>
      )}

      {/* 05: MY DESCENT */}
      {stageId === "descent" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#1c1917" />
          {/* Dusty Martian atmosphere */}
          <rect width="1000" height="600" fill="#b45309" opacity="0.25" />

          {/* Parachute */}
          <g transform="translate(500, 60)">
            <path d="M-110 0 Q 0 -80 110 0 Q 60 15 0 20 Q -60 15 -110 0 Z" fill="#ea580c" stroke="#fef08a" strokeWidth="2" />
            {/* Suspension lines */}
            {[-90, -45, 0, 45, 90].map((x) => (
              <line key={x} x1={x} y1="10" x2="0" y2="150" stroke="#fde047" strokeWidth="0.8" opacity="0.8" />
            ))}
          </g>

          {/* Inflated Airbag Cocoon */}
          <g transform="translate(500, 310)">
            {/* RAD rockets fire */}
            <path d="M-30 -70 L -40 -120 L -20 -70 Z" fill="#fef08a" opacity="0.9" />
            <path d="M30 -70 L 40 -120 L 20 -70 Z" fill="#fef08a" opacity="0.9" />

            {/* 24 Vectran Airbag lobes */}
            <circle cx="-35" cy="-25" r="38" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="35" cy="-25" r="38" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="-35" cy="30" r="38" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="35" cy="30" r="38" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="0" cy="5" r="42" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          </g>

          <text x="500" y="550" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            SUPERSONIC PARACHUTE & VECTRAN AIRBAG DEPLOYMENT (4 JAN 2004)
          </text>
        </svg>
      )}

      {/* 06: MY LANDING */}
      {stageId === "landing" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#291811" />
          {/* Martian plain */}
          <path d="M0 450 Q 500 420 1000 450 L 1000 600 L 0 600 Z" fill="#9a3412" />

          {/* Airbag bounce trajectory curve */}
          <path
            d="M50 430 Q 150 250 250 440 Q 340 320 430 445 Q 490 380 550 450 L 650 450"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Unfolded Lander Platform at Columbia Memorial Station */}
          <g transform="translate(680, 420)">
            {/* Deflated airbags pulled under */}
            <ellipse cx="0" cy="35" rx="90" ry="15" fill="#64748b" opacity="0.6" />
            {/* Triangular petals open */}
            <polygon points="-70,30 0,-10 -20,30" fill="#e2e8f0" stroke="#94a3b8" />
            <polygon points="70,30 0,-10 20,30" fill="#e2e8f0" stroke="#94a3b8" />
            <polygon points="0,45 0,-10 0,45" fill="#e2e8f0" stroke="#94a3b8" />
            {/* Rover upright */}
            <rect x="-35" y="-30" width="70" height="25" rx="5" fill="#d97706" />
            <line x1="18" y1="-30" x2="18" y2="-65" stroke="#f8fafc" strokeWidth="4" />
            <circle cx="18" cy="-68" r="7" fill="#00d8d6" />
          </g>

          <text x="500" y="550" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            COLUMBIA MEMORIAL STATION · 28 BOUNCES TO A STOP (04:35 UTC)
          </text>
        </svg>
      )}

      {/* 07: MY EXPLORATION */}
      {stageId === "exploration" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#3b1d11" />
          {/* Columbia Hills mountains */}
          <polygon points="200,320 380,180 560,320" fill="#7c2d12" />
          <polygon points="450,320 620,150 820,320" fill="#9a3412" />
          <polygon points="680,320 840,210 980,320" fill="#c2410c" />
          <path d="M0 320 Q 500 300 1000 320 L 1000 600 L 0 600 Z" fill="#ea580c" />

          {/* Rover Tracks */}
          <path d="M100 520 Q 300 480 480 420" stroke="#7c2d12" strokeWidth="5" strokeDasharray="3 4" fill="none" />
          <path d="M120 535 Q 320 495 500 435" stroke="#7c2d12" strokeWidth="5" strokeDasharray="3 4" fill="none" />

          {/* Spirit Rover Driving */}
          <g transform="translate(500, 390)">
            <rect x="0" y="10" width="90" height="35" rx="6" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
            {/* Mast */}
            <line x1="70" y1="10" x2="70" y2="-35" stroke="#94a3b8" strokeWidth="4" />
            <rect x="60" y="-45" width="22" height="12" rx="3" fill="#1e293b" />
            <circle cx="66" cy="-39" r="3" fill="#38bdf8" />
            <circle cx="76" cy="-39" r="3" fill="#38bdf8" />
            {/* Solar arrays */}
            <rect x="-10" y="2" width="110" height="6" fill="#1e3a8a" />
            {/* Wheels */}
            {[10, 45, 80].map((x) => (
              <circle key={x} cx={x} cy="52" r="14" fill="#64748b" stroke="#334155" strokeWidth="2.5" />
            ))}
          </g>

          <text x="500" y="560" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            CROSSING GUSEV CRATER & CONQUERING HUSBAND HILL (2004 - 2005)
          </text>
        </svg>
      )}

      {/* 08: MY DISCOVERIES */}
      {stageId === "discoveries" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#2d150c" />
          {/* Ground */}
          <path d="M0 380 Q 500 360 1000 380 L 1000 600 L 0 600 Z" fill="#9a3412" />

          {/* Pure Silica Trench Churned Up by Dragged Wheel */}
          <g transform="translate(380, 430)">
            <ellipse cx="60" cy="30" rx="140" ry="25" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="34" textAnchor="middle" fill="#0284c7" fontFamily="IBM Plex Mono" fontSize="11" fontWeight="bold">
              90% PURE SILICA SOIL (HOT SPRINGS)
            </text>
          </g>

          {/* Rock Adirondack with circular grind mark */}
          <g transform="translate(220, 370)">
            <polygon points="0,50 40,0 120,20 140,80 20,90" fill="#52525b" />
            <circle cx="65" cy="40" r="16" fill="#27272a" stroke="#f59e0b" strokeWidth="2" />
            <text x="65" y="44" textAnchor="middle" fill="#fef08a" fontFamily="IBM Plex Mono" fontSize="9">RAT</text>
          </g>

          {/* Rover with arm extended */}
          <g transform="translate(560, 310)">
            <rect x="0" y="20" width="100" height="40" rx="8" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
            {/* Robotic Arm extended to the left */}
            <line x1="20" y1="50" x2="-40" y2="70" stroke="#94a3b8" strokeWidth="5" />
            <line x1="-40" y1="70" x2="-80" y2="100" stroke="#94a3b8" strokeWidth="4" />
            <circle cx="-80" cy="100" r="9" fill="#f59e0b" />
            {/* Wheels */}
            {[20, 55, 90].map((x) => (
              <circle key={x} cx={x} cy="70" r="15" fill="#64748b" />
            ))}
          </g>

          <text x="500" y="560" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            RAT DRILL HOLE & HYDROTHERMAL SILICA AT HOME PLATE (2004 - 2007)
          </text>
        </svg>
      )}

      {/* 09: MY CHALLENGES */}
      {stageId === "challenges" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="dustStorm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#78350f" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#b45309" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#dustStorm)" />

          {/* Dim winter sun struggling through dust */}
          <circle cx="780" cy="160" r="35" fill="#fef3c7" opacity="0.35" />

          {/* Wind streak lines */}
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M-50 ${i * 45} Q 500 ${i * 45 + (i % 2 ? 30 : -30)} 1050 ${i * 45}`}
              stroke="#fbbf24"
              strokeWidth={i % 3 === 0 ? 2 : 1}
              opacity="0.35"
              fill="none"
            />
          ))}

          {/* Rover Parked on North slope in high wind */}
          <g transform="translate(420, 340) rotate(-14)">
            <rect x="0" y="0" width="110" height="42" rx="8" fill="#a16207" stroke="#78350f" strokeWidth="2" />
            {/* Dusty solar panels */}
            <rect x="-10" y="-8" width="130" height="8" fill="#78350f" />
            {/* Mast bowed */}
            <line x1="85" y1="0" x2="85" y2="-45" stroke="#78350f" strokeWidth="4" />
            {/* Jammed front wheel dragging */}
            <circle cx="95" cy="50" r="16" fill="#451a03" stroke="#b45309" strokeWidth="3" />
            <circle cx="55" cy="50" r="16" fill="#78350f" />
            <circle cx="15" cy="50" r="16" fill="#78350f" />
          </g>

          <text x="500" y="550" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            GLOBAL DUST STORMS & BROKEN FRONT WHEEL (2006 - 2008)
          </text>
        </svg>
      )}

      {/* 10: MY FINAL DAYS */}
      {stageId === "last-days" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="nightCold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="60%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#31101e" />
            </linearGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#nightCold)" />

          {/* Cold Stars */}
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 29) % 1000} cy={(i * 19) % 400} r="1.2" fill="#e0e7ff" opacity="0.6" />
          ))}

          {/* Troy Sand Dune */}
          <path d="M0 430 Q 450 380 1000 450 L 1000 600 L 0 600 Z" fill="#450a0a" />

          {/* Faint Last Radio Waves emitting upward */}
          <g transform="translate(480, 310)">
            <ellipse cx="0" cy="-60" rx="30" ry="10" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
            <ellipse cx="0" cy="-110" rx="60" ry="20" fill="none" stroke="#22d3ee" strokeWidth="1.2" opacity="0.5" />
            <ellipse cx="0" cy="-170" rx="100" ry="32" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.25" />
          </g>

          {/* Rover embedded in soft soil at Troy, tilted south */}
          <g transform="translate(440, 370) rotate(9)">
            <rect x="0" y="10" width="105" height="38" rx="7" fill="#713f12" stroke="#451a03" strokeWidth="2" />
            <line x1="85" y1="10" x2="85" y2="-40" stroke="#a16207" strokeWidth="4" />
            <circle cx="85" cy="-45" r="5" fill="#22d3ee" />
            {/* Wheels sunken halfway into sand */}
            {[20, 55, 90].map((x) => (
              <g key={x} transform={`translate(${x}, 38)`}>
                <circle cx="0" cy="0" r="16" fill="#451a03" />
                <path d="M-18 6 L 18 6" stroke="#b91c1c" strokeWidth="3" />
              </g>
            ))}
          </g>

          <text x="500" y="555" textAnchor="middle" fill="#a5f3fc" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            FINAL SIGNAL · 22 MARCH 2010 (GUSEV CRATER, MARS)
          </text>
        </svg>
      )}

      {/* 11: MY LEGACY */}
      {stageId === "legacy" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="legacyDusk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0b0f19" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#7c2d12" />
            </linearGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#legacyDusk)" />

          {/* Earth as evening star */}
          <circle cx="750" cy="120" r="3.5" fill="#38bdf8" />
          <circle cx="750" cy="120" r="12" fill="#38bdf8" opacity="0.3" />
          <text x="750" y="145" textAnchor="middle" fill="#93c5fd" fontFamily="IBM Plex Mono" fontSize="10">
            EARTH (HOME)
          </text>

          {/* Ridge horizon */}
          <path d="M0 450 Q 500 400 1000 450 L 1000 600 L 0 600 Z" fill="#451a03" />

          {/* Spirit Rover resting peacefully */}
          <g transform="translate(320, 420)">
            <rect x="0" y="0" width="85" height="30" rx="6" fill="#78350f" opacity="0.9" />
            <line x1="65" y1="0" x2="65" y2="-35" stroke="#9a3412" strokeWidth="3" />
            <circle cx="65" cy="-38" r="4" fill="#64748b" />
            {[15, 45, 75].map((x) => (
              <circle key={x} cx={x} cy="30" r="12" fill="#291811" />
            ))}
          </g>

          {/* Distant silhouettes of Curiosity and Perseverance on the horizon */}
          <g transform="translate(700, 385) scale(0.65)" opacity="0.75">
            <rect x="0" y="0" width="120" height="45" rx="8" fill="#0f172a" />
            <line x1="90" y1="0" x2="90" y2="-55" stroke="#0f172a" strokeWidth="5" />
            {[20, 60, 100].map((x) => (
              <circle key={x} cx={x} cy="50" r="18" fill="#0f172a" />
            ))}
            <text x="60" y="-70" textAnchor="middle" fill="#cbd5e1" fontFamily="IBM Plex Mono" fontSize="12">
              CURIOUSITY & PERSEVERANCE
            </text>
          </g>

          <text x="500" y="555" textAnchor="middle" fill="#fcd34d" fontFamily="IBM Plex Mono" fontSize="12" letterSpacing="2">
            “THEY MAY HAVE STOPPED WORKING, BUT THEIR STORIES ARE STILL ALIVE.”
          </text>
        </svg>
      )}
    </motion.div>
  );
}
