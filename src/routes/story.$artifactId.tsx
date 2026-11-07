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
  Captions,
  Flag,
  Globe,
  Sliders,
} from "lucide-react";

import { SPIRIT_STORY, STORY_DISCLAIMER, type StoryStage, type Hotspot } from "@/data/spirit";
import { ALL_MISSION_STORIES, getStoryForArtifact, type MissionStoryMeta } from "@/data/multiStories";
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
    return !isNaN(st) && st >= 0 ? { stage: st } : {};
  },
  loader: ({ params }) => {
    const storyMeta = getStoryForArtifact(params.artifactId);
    const artifact = getArtifact(params.artifactId);
    if (!storyMeta || !artifact) throw notFound();
    return { storyMeta, artifact };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.storyMeta?.title ?? "Mission Story";
    const agency = loaderData?.storyMeta?.agency ?? "Space";
    return {
      meta: [
        { title: `${title} (${agency}) — Abandoned but Not Forgotten` },
        {
          name: "description",
          content: loaderData?.storyMeta?.heroTagline ?? "An interactive animated mission lifecycle story.",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData?.storyMeta?.heroTagline ?? "Mission Story" },
      ],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { storyMeta, artifact } = Route.useLoaderData();
  const { stage: searchStage } = Route.useSearch();
  const { updateContext, openWithPrompt } = useAstro();

  const stages = storyMeta.stages;
  const [currentIdx, setCurrentIdx] = useState<number>(searchStage ?? 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [subtitleSize, setSubtitleSize] = useState<"normal" | "large">("normal");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [subSentenceIdx, setSubSentenceIdx] = useState<number>(0);
  const [storyDrawerOpen, setStoryDrawerOpen] = useState<boolean>(false);

  const stage = stages[currentIdx] ?? stages[0]!;

  // Update URL search when stage changes
  const navigate = Route.useNavigate();
  const goToStage = (idx: number) => {
    const clamped = Math.max(0, Math.min(stages.length - 1, idx));
    setCurrentIdx(clamped);
    setActiveHotspot(null);
    setSubSentenceIdx(0);
    navigate({ search: { stage: clamped }, replace: true });
  };

  // Subtitle sentence cycling during narration
  useEffect(() => {
    setSubSentenceIdx(0);
    if (stage.narration.length <= 1) return;

    const interval = setInterval(() => {
      setSubSentenceIdx((prev) => (prev + 1) % stage.narration.length);
    }, (7000 / speed));

    return () => clearInterval(interval);
  }, [currentIdx, speed, stage]);

  // Sync ASTRO context with active story stage
  useEffect(() => {
    updateContext({
      selectedArtifact: artifact.name,
      selectedMission: artifact.mission,
      selectedPlanet: artifact.bodyId ?? "Deep Space",
      currentStoryStage: `${stage.number}. ${stage.title}`,
      selectedComponent: null,
    });
  }, [stage, artifact]);

  // Speech synthesis for first-person narration
  useEffect(() => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const fullText = stage.narration.join(" ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.95 * speed;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith("en") && !v.name.includes("whisper"));
    if (englishVoice) utterance.voice = englishVoice;

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentIdx, voiceEnabled, speed, stage]);

  // Auto-advance timer when playing
  useEffect(() => {
    if (!isPlaying) return;

    const stageDurationMs = 12000 / speed;
    const timer = setTimeout(() => {
      if (currentIdx < stages.length - 1) {
        goToStage(currentIdx + 1);
      } else {
        setIsPlaying(false);
      }
    }, stageDurationMs);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIdx, speed, stages]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const nextStage = () => goToStage(currentIdx + 1);
  const prevStage = () => goToStage(currentIdx - 1);
  const restart = () => {
    goToStage(0);
    setIsPlaying(true);
  };

  const currentSubtitleText = stage.narration[subSentenceIdx] ?? stage.narration[0];

  return (
    <main className="relative min-h-[100svh] bg-background pt-14 pb-20 overflow-x-hidden">
      {/* Cinematic Animation Canvas Container */}
      <section className="relative w-full h-[60svh] sm:h-[68svh] bg-space overflow-hidden border-b border-border">
        {/* Animated Scene Canvas */}
        <AnimatePresence mode="wait">
          <MultiMissionAnimationScene
            key={`${storyMeta.artifactId}-${stage.id}`}
            artifactId={storyMeta.artifactId}
            stageId={stage.id}
            speed={speed}
          />
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

        {/* ON-SCREEN CINEMATIC SUBTITLES / CLOSED CAPTIONS */}
        <AnimatePresence mode="wait">
          {subtitlesEnabled && currentSubtitleText && (
            <div className="pointer-events-none absolute bottom-24 sm:bottom-22 inset-x-4 sm:inset-x-16 z-25 flex justify-center">
              <motion.div
                key={`${stage.id}-${subSentenceIdx}`}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "pointer-events-auto max-w-3xl rounded-2xl border border-border/80 bg-black/85 px-5 py-2.5 backdrop-blur-md shadow-2xl text-center",
                  subtitleSize === "large" ? "text-base sm:text-lg" : "text-xs sm:text-sm",
                )}
              >
                <p className="font-sans font-medium text-white/95 leading-relaxed tracking-wide drop-shadow-md">
                  “{currentSubtitleText}”
                </p>
                <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-widest text-teal/80">
                  {storyMeta.agency} · {stage.number}/{String(stages.length).padStart(2, "0")} · {stage.title}
                </span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Top Info Overlay: Stage Header & Mission Selector Button */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-20 px-4 sm:px-8 flex justify-between items-start gap-3">
          <div className="pointer-events-auto rounded-2xl border border-border/80 bg-panel/85 px-4 py-2.5 backdrop-blur shadow-panel max-w-sm sm:max-w-md">
            <div className="flex items-center gap-2">
              <span className="eyebrow">{storyMeta.agency} Mission</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono text-xs text-muted-foreground">
                Stage {stage.number} of {stages.length}
              </span>
            </div>
            <h1 className="font-display text-lg sm:text-2xl font-bold text-foreground truncate">
              {stage.title}
            </h1>
            <div className="flex items-center gap-2 mt-0.5 font-mono text-xs text-teal">
              <Calendar className="size-3" /> {stage.date}
            </div>
          </div>

          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
            {/* Story Switcher Pill */}
            <Button
              variant="hero"
              size="sm"
              onClick={() => setStoryDrawerOpen(true)}
              className="rounded-full px-3 gap-1.5 shadow-glow"
              title="Browse All Mission Animation Stories"
            >
              <Globe className="size-4" />
              <span className="hidden sm:inline text-xs font-semibold">All Stories ({ALL_MISSION_STORIES.length})</span>
            </Button>

            {/* Subtitle Toggle */}
            <Button
              variant="glass"
              size="sm"
              onClick={() => setSubtitlesEnabled((s) => !s)}
              className={cn("rounded-full px-2.5 gap-1", subtitlesEnabled && "border-teal text-teal")}
              title={subtitlesEnabled ? "Subtitles On" : "Subtitles Off"}
            >
              <Captions className="size-4" />
              <span className="text-xs font-mono">{subtitlesEnabled ? "CC" : "Off"}</span>
            </Button>

            {/* Voice Narration */}
            <Button
              variant="glass"
              size="sm"
              onClick={() => setVoiceEnabled((v) => !v)}
              className={cn("rounded-full px-2.5 gap-1", voiceEnabled && "border-teal text-teal")}
              title={voiceEnabled ? "Mute Voice Narration" : "Enable Voice Narration"}
            >
              {voiceEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </Button>

            {/* Ask ASTRO shortcut */}
            <Button
              variant="glass"
              size="sm"
              onClick={() =>
                openWithPrompt(
                  `Tell me all about ${artifact.name}'s mission stage "${stage.title}" (${stage.date}). What happened historically?`
                )
              }
              className="rounded-full px-3 gap-1.5"
            >
              <Bot className="size-4 text-primary-glow" />
              <span className="hidden md:inline text-xs">Ask ASTRO</span>
            </Button>
          </div>
        </div>

        {/* Interactive Scrubbing Bar (Bottom of canvas) */}
        <div className="absolute bottom-3 inset-x-4 sm:inset-x-8 z-30 pointer-events-auto">
          <div className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-panel/90 p-3 backdrop-blur shadow-panel">
            {/* Milestones track */}
            <div className="relative flex items-center justify-between gap-1">
              {stages.map((s, idx) => (
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
                  disabled={currentIdx === stages.length - 1}
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

              {/* Subtitle Size toggle & Playback Speed toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSubtitleSize((s) => (s === "normal" ? "large" : "normal"))}
                  className="font-mono text-[11px] text-muted-foreground hover:text-foreground px-2 py-0.5 rounded-md border border-border/60"
                  title="Toggle Subtitle Size"
                >
                  CC: {subtitleSize === "large" ? "Large" : "Norm"}
                </button>

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
        </div>
      </section>

      {/* Narrative & Scientific Deep Dive Section */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* First-Person Voice Narration Block */}
          <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <span className="eyebrow">{artifact.name}'s Monologue</span>
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

          {/* Scientific Context & Verified Mission Archive Facts */}
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

            {/* NASA / Agency Photograph if available */}
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
            <h3 className="font-display text-sm font-semibold">
              All {stages.length} Stages of {artifact.name}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">Click any stage to jump</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {stages.map((s, idx) => (
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

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="glass">
              <Link to="/artifact/$artifactId" params={{ artifactId: artifact.id }}>
                Return to 3D {artifact.name} Hardware Inspection <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="hero" onClick={() => setStoryDrawerOpen(true)}>
              Browse All Stories ({ALL_MISSION_STORIES.length}) <Globe className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* ALL MISSION STORIES DRAWER MODAL */}
      <AnimatePresence>
        {storyDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[85svh] overflow-y-auto rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="eyebrow">Animated Storytelling Gallery</span>
                  <h2 className="mt-1 font-display text-2xl font-bold">Choose a Space Explorer's Story</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Discover first-person animated lifecycle stories from NASA, ISRO, and ESA missions.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStoryDrawerOpen(false)}
                  className="rounded-full"
                >
                  ✕
                </Button>
              </div>

              <div className="mt-6 space-y-3">
                {ALL_MISSION_STORIES.map((m) => (
                  <Link
                    key={m.artifactId}
                    to="/story/$artifactId"
                    params={{ artifactId: m.artifactId }}
                    onClick={() => setStoryDrawerOpen(false)}
                    className={cn(
                      "block rounded-2xl border p-4 sm:p-5 transition-all hover:border-primary/50 hover:shadow-glow",
                      m.artifactId === storyMeta.artifactId
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-border bg-background/50 hover:bg-muted",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary-glow">
                        {m.agency}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {m.stagesCount} Stages · {m.durationMinutes}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/80 leading-relaxed">
                      {m.heroTagline}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-teal font-mono">
                      <span>Destination: {m.destination}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-primary-glow">
                        Watch Story <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

/**
 * Multi-Mission Animation Scene Renderer:
 * Dispatches to Spirit, Chandrayaan-3, or Huygens visuals!
 */
function MultiMissionAnimationScene({
  artifactId,
  stageId,
  speed,
}: {
  artifactId: string;
  stageId: string;
  speed: number;
}) {
  if (artifactId === "chandrayaan-3") {
    return <ChandrayaanScene stageId={stageId} speed={speed} />;
  }
  if (artifactId === "huygens") {
    return <HuygensScene stageId={stageId} speed={speed} />;
  }
  if (artifactId === "opportunity") {
    return <OpportunityScene stageId={stageId} speed={speed} />;
  }
  if (artifactId === "apollo-11") {
    return <Apollo11Scene stageId={stageId} speed={speed} />;
  }
  if (artifactId === "mangalyaan") {
    return <MangalyaanScene stageId={stageId} speed={speed} />;
  }
  if (artifactId === "philae") {
    return <PhilaeScene stageId={stageId} speed={speed} />;
  }
  if (artifactId === "voyager-1") {
    return <VoyagerScene stageId={stageId} speed={speed} />;
  }
  return <SpiritScene stageId={stageId} speed={speed} />;
}

/** Chandrayaan-3 Procedural Vector Animation Scenes */
function ChandrayaanScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      {stageId === "creation" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#0c1524" />
          {/* Blueprint grid */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 30} x2="1000" y2={i * 30} stroke="#1e293b" strokeWidth="0.8" />
          ))}
          {/* URSC Cleanroom Banner */}
          <text x="500" y="80" textAnchor="middle" fill="#f97316" fontFamily="IBM Plex Mono" fontSize="14" letterSpacing="4">
            ISRO / URSC SATELLITE CENTRE · BENGALURU, INDIA
          </text>
          {/* Vikram Lander Assembly */}
          <g transform="translate(420, 200)">
            {/* Golden foil lander body */}
            <rect x="0" y="30" width="160" height="120" rx="10" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
            <rect x="-30" y="50" width="30" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" />
            <rect x="160" y="50" width="30" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" />
            {/* Top antenna */}
            <line x1="80" y1="30" x2="80" y2="-20" stroke="#cbd5e1" strokeWidth="4" />
            <circle cx="80" cy="-24" r="8" fill="#38bdf8" />
            {/* Legs */}
            <line x1="10" y1="150" x2="-40" y2="240" stroke="#94a3b8" strokeWidth="6" />
            <line x1="150" y1="150" x2="200" y2="240" stroke="#94a3b8" strokeWidth="6" />
            <circle cx="-40" cy="245" r="14" fill="#64748b" />
            <circle cx="200" cy="245" r="14" fill="#64748b" />
          </g>
          {/* Indian Tricolour Stripe Accent */}
          <rect x="350" y="520" width="100" height="6" fill="#f97316" />
          <rect x="450" y="520" width="100" height="6" fill="#ffffff" />
          <rect x="550" y="520" width="100" height="6" fill="#15803d" />
        </svg>
      )}

      {stageId === "launch" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="launchSky" x1="0" y1="100%" x2="0" y2="0">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="40%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0a0e17" />
            </linearGradient>
            <linearGradient id="lvmPlume" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="80%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#launchSky)" />
          {/* LVM3-M4 'Bahubali' Rocket */}
          <g transform="translate(500, 160)">
            <path d="M-25 150 Q -70 320 0 420 Q 70 320 25 150 Z" fill="url(#lvmPlume)" opacity="0.9" />
            {/* Core stage */}
            <rect x="-18" y="0" width="36" height="150" rx="3" fill="#f8fafc" stroke="#334155" />
            {/* Nosecone fairing */}
            <path d="M-18 0 Q 0 -60 18 0 Z" fill="#f8fafc" />
            {/* Two massive S200 solid strap-on boosters */}
            <rect x="-38" y="45" width="16" height="105" rx="3" fill="#e2e8f0" />
            <rect x="22" y="45" width="16" height="105" rx="3" fill="#e2e8f0" />
            {/* S200 nosecones */}
            <polygon points="-38,45 -30,25 -22,45" fill="#f97316" />
            <polygon points="22,45 30,25 38,45" fill="#f97316" />
          </g>
          <text x="500" y="560" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
            LVM3-M4 'BAHUBALI' LAUNCH · SRIHARIKOTA (14 JULY 2023)
          </text>
        </svg>
      )}

      {stageId === "landing" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#090d16" />
          {/* Lunar South Pole craters */}
          <ellipse cx="500" cy="500" rx="600" ry="180" fill="#334155" />
          <ellipse cx="280" cy="460" rx="140" ry="35" fill="#1e293b" />
          <ellipse cx="720" cy="480" rx="180" ry="40" fill="#1e293b" />
          {/* Vikram Touchdown */}
          <g transform="translate(450, 310)">
            <rect x="0" y="0" width="100" height="80" rx="8" fill="#d97706" />
            {/* Indian Flag emblem on body */}
            <rect x="35" y="25" width="30" height="5" fill="#f97316" />
            <rect x="35" y="30" width="30" height="5" fill="#ffffff" />
            <rect x="35" y="35" width="30" height="5" fill="#15803d" />
            {/* Extended legs on lunar soil */}
            <line x1="10" y1="80" x2="-25" y2="140" stroke="#cbd5e1" strokeWidth="5" />
            <line x1="90" y1="80" x2="125" y2="140" stroke="#cbd5e1" strokeWidth="5" />
            <ellipse cx="-25" cy="142" rx="15" ry="5" fill="#64748b" />
            <ellipse cx="125" cy="142" rx="15" ry="5" fill="#64748b" />
          </g>
          <text x="500" y="555" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
            HISTORIC TOUCHDOWN AT SHIV SHAKTI POINT · 69.373° S (23 AUGUST 2023)
          </text>
        </svg>
      )}

      {stageId === "discoveries" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#0b1120" />
          {/* Lunar Regolith */}
          <path d="M0 380 Q 500 350 1000 380 L 1000 600 L 0 600 Z" fill="#334155" />
          {/* Pragyan Rover driving */}
          <g transform="translate(480, 330)">
            <rect x="0" y="0" width="80" height="30" rx="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            {/* Solar panel */}
            <rect x="-10" y="-12" width="100" height="8" rx="2" fill="#1e3a8a" stroke="#60a5fa" />
            {/* 6 Wheels */}
            {[10, 40, 70].map((x) => (
              <circle key={x} cx={x} cy="38" r="10" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            ))}
            {/* LIBS Laser firing into soil */}
            <line x1="80" y1="15" x2="130" y2="60" stroke="#ef4444" strokeWidth="3" />
            <circle cx="130" cy="60" r="8" fill="#facc15" />
          </g>
          {/* Sulfur Detection Indicator */}
          <g transform="translate(640, 370)">
            <rect x="0" y="0" width="140" height="35" rx="10" fill="#1e293b" stroke="#facc15" strokeWidth="1.5" />
            <text x="70" y="22" textAnchor="middle" fill="#facc15" fontFamily="IBM Plex Mono" fontSize="11" fontWeight="bold">
              SULFUR (S) CONFIRMED
            </text>
          </g>
          <text x="500" y="555" textAnchor="middle" fill="#fef08a" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
            PRAGYAN ROVER · LIBS IN-SITU SULFUR DISCOVERY (AUG - SEPT 2023)
          </text>
        </svg>
      )}

      {/* Default Stage fallback */}
      {stageId !== "creation" && stageId !== "launch" && stageId !== "landing" && stageId !== "discoveries" && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <rect width="1000" height="600" fill="#090d16" />
          <circle cx="500" cy="300" r="140" fill="#1e293b" />
          <circle cx="500" cy="300" r="138" fill="#334155" />
          <ellipse cx="440" cy="270" rx="40" ry="20" fill="#1e293b" />
          <ellipse cx="540" cy="340" rx="35" ry="16" fill="#1e293b" />
          <text x="500" y="530" textAnchor="middle" fill="#38bdf8" fontFamily="IBM Plex Mono" fontSize="14" letterSpacing="3">
            CHANDRAYAAN-3 · LUNAR POLAR CAMPAIGN
          </text>
        </svg>
      )}
    </motion.div>
  );
}

/** Huygens Probe on Titan Procedural Vector Scenes */
function HuygensScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      {/* Orange Titan Smog Atmosphere */}
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="titanSky" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="60%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#titanSky)" />

        {stageId === "landing" || stageId === "legacy" ? (
          <>
            {/* Titan Muddy Methane plain */}
            <path d="M0 420 Q 500 400 1000 420 L 1000 600 L 0 600 Z" fill="#291206" />
            {/* Water-ice rounded pebbles (rock hard at -180C) */}
            <ellipse cx="250" cy="460" rx="25" ry="12" fill="#e2e8f0" stroke="#94a3b8" />
            <ellipse cx="320" cy="480" rx="18" ry="9" fill="#cbd5e1" stroke="#94a3b8" />
            <ellipse cx="700" cy="470" rx="35" ry="16" fill="#e2e8f0" stroke="#94a3b8" />
            <ellipse cx="780" cy="495" rx="22" ry="11" fill="#cbd5e1" stroke="#94a3b8" />
            {/* Huygens Golden Probe at Rest */}
            <g transform="translate(460, 360)">
              <rect x="0" y="20" width="90" height="50" rx="12" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="45" cy="15" r="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M45 -5 L 45 15" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="45" cy="-8" r="5" fill="#38bdf8" />
            </g>
            <text x="500" y="555" textAnchor="middle" fill="#fde68a" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              HUYGENS ON TITAN · ICE PEBBLES & LIQUID METHANE FLATS (14 JAN 2005)
            </text>
          </>
        ) : (
          <>
            {/* Parachute descent through clouds */}
            <g transform="translate(500, 100)">
              <path d="M-80 0 Q 0 -60 80 0 Z" fill="#ea580c" stroke="#fef08a" strokeWidth="2" />
              <line x1="-60" y1="5" x2="0" y2="120" stroke="#fef08a" strokeWidth="1" />
              <line x1="60" y1="5" x2="0" y2="120" stroke="#fef08a" strokeWidth="1" />
              {/* Probe */}
              <circle cx="0" cy="130" r="28" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
            </g>
            <text x="500" y="555" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              ESA HUYGENS DESCENT · PIERCING TITAN'S ATMOSPHERE
            </text>
          </>
        )}
      </svg>
    </motion.div>
  );
}

/** Spirit Rover Vector Scenes */
function SpiritScene({ stageId, speed }: { stageId: string; speed: number }) {
  // Re-uses the high-detail Spirit vector illustrations created previously
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
        {/* Rover drawing */}
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
        </g>
        <text x="500" y="555" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          SPIRIT ROVER (MER-A) · GUSEV CRATER, MARS
        </text>
      </svg>
    </motion.div>
  );
}

/** Opportunity Rover Vector Scenes */
function OpportunityScene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        {stageId === "blueberries" ? (
          <>
            <rect width="1000" height="600" fill="#292019" />
            {/* Rock strata background */}
            <path d="M0 120 Q 500 100 1000 130 L 1000 600 L 0 600 Z" fill="#443224" />
            <path d="M0 260 Q 500 240 1000 280 L 1000 600 L 0 600 Z" fill="#583f2e" />
            {/* Hematite Spheres ('Blueberries') */}
            {[
              { cx: 320, cy: 300, r: 28 },
              { cx: 480, cy: 260, r: 35 },
              { cx: 640, cy: 340, r: 24 },
              { cx: 410, cy: 420, r: 32 },
              { cx: 580, cy: 440, r: 30 },
              { cx: 240, cy: 390, r: 22 },
              { cx: 720, cy: 280, r: 26 },
            ].map((b, i) => (
              <g key={i}>
                <circle cx={b.cx} cy={b.cy} r={b.r} fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
                <circle cx={b.cx - b.r * 0.3} cy={b.cy - b.r * 0.3} r={b.r * 0.3} fill="#93c5fd" opacity="0.7" />
              </g>
            ))}
            {/* Microscopic reticle */}
            <circle cx="500" cy="340" r="180" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
            <line x1="500" y1="140" x2="500" y2="540" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <line x1="300" y1="340" x2="700" y2="340" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              HEMATITE SPHERULES ('BLUEBERRIES') · PROOF OF ANCIENT WATER
            </text>
          </>
        ) : stageId === "duststorm" ? (
          <>
            {/* Pitch black dust storm */}
            <rect width="1000" height="600" fill="#0f0705" />
            {/* Heavy atmospheric dust veil */}
            <path d="M-100 200 Q 500 140 1100 240 L 1100 600 L -100 600 Z" fill="#271008" />
            {/* Swirling dust bands */}
            <path d="M0 150 Q 500 80 1000 180" stroke="#7c2d12" strokeWidth="24" strokeLinecap="round" opacity="0.4" />
            <path d="M0 280 Q 500 210 1000 310" stroke="#7c2d12" strokeWidth="36" strokeLinecap="round" opacity="0.3" />
            {/* Dim extinguished Sun */}
            <circle cx="750" cy="120" r="18" fill="#78350f" opacity="0.4" />
            <text x="500" y="565" textAnchor="middle" fill="#f87171" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              GLOBAL PLANET-ENCIRCLING DUST STORM · TAU &gt; 10.8 (JUNE 2018)
            </text>
          </>
        ) : (
          <>
            {/* Meridiani Planum landscape */}
            <rect width="1000" height="600" fill="#1e130c" />
            <path d="M0 380 Q 500 350 1000 390 L 1000 600 L 0 600 Z" fill="#9a3412" />
            {/* Rover tracks */}
            <path d="M100 480 Q 300 450 480 410" stroke="#431407" strokeWidth="6" strokeDasharray="10 8" />
            <path d="M120 495 Q 320 465 500 425" stroke="#431407" strokeWidth="6" strokeDasharray="10 8" />
            {/* Opportunity Rover */}
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
            </g>
            <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              OPPORTUNITY (MER-B) · 45.16 KM OFF-WORLD MARATHON RECORD
            </text>
          </>
        )}
      </svg>
    </motion.div>
  );
}

/** Apollo 11 Lunar Vector Scenes */
function Apollo11Scene({ stageId, speed }: { stageId: string; speed: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 / speed, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        <rect width="1000" height="600" fill="#030712" />
        {/* Distant Earth in black sky */}
        <circle cx="780" cy="120" r="36" fill="#1e40af" />
        <path d="M760 110 Q 775 95 795 105 Q 805 130 770 140 Z" fill="#22c55e" opacity="0.8" />
        <path d="M750 120 Q 780 125 805 115" stroke="#ffffff" strokeWidth="4" opacity="0.6" />

        {stageId === "step" ? (
          <>
            {/* Lunar dust close-up with the bootprint */}
            <rect y="200" width="1000" height="400" fill="#475569" />
            <path d="M0 200 Q 500 180 1000 210 L 1000 600 L 0 600 Z" fill="#334155" />
            {/* Famous bootprint */}
            <g transform="translate(480, 320) rotate(-15)">
              <ellipse cx="0" cy="0" rx="35" ry="65" fill="#1e293b" />
              {[-35, -20, -5, 10, 25, 40].map((y) => (
                <line key={y} x1="-22" y1={y} x2="22" y2={y} stroke="#0f172a" strokeWidth="5" />
              ))}
            </g>
            <text x="500" y="565" textAnchor="middle" fill="#f8fafc" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              "ONE SMALL STEP FOR MAN, ONE GIANT LEAP FOR MANKIND" · 21 JULY 1969
            </text>
          </>
        ) : (
          <>
            {/* Sea of Tranquility plain */}
            <ellipse cx="500" cy="520" rx="650" ry="200" fill="#334155" />
            <ellipse cx="250" cy="460" rx="160" ry="40" fill="#1e293b" />
            {/* Apollo 11 Lunar Module Descent Stage */}
            <g transform="translate(460, 310)">
              {/* Octagonal golden base */}
              <polygon points="0,50 20,10 80,10 100,50 80,90 20,90" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
              {/* Landing gear legs */}
              <line x1="20" y1="80" x2="-35" y2="150" stroke="#94a3b8" strokeWidth="5" />
              <line x1="80" y1="80" x2="135" y2="150" stroke="#94a3b8" strokeWidth="5" />
              <circle cx="-35" cy="152" r="14" fill="#e2e8f0" />
              <circle cx="135" cy="152" r="14" fill="#e2e8f0" />
              {/* Ladder on front leg */}
              {[-10, 5, 20, 35].map((y) => (
                <line key={y} x1="2" y1={80 + y} x2="-8" y2={85 + y} stroke="#cbd5e1" strokeWidth="2" />
              ))}
              {/* Engine bell beneath */}
              <polygon points="40,90 60,90 65,115 35,115" fill="#1e293b" />
            </g>
            {/* US Flag planted beside */}
            <g transform="translate(640, 410)">
              <line x1="0" y1="0" x2="0" y2="60" stroke="#e2e8f0" strokeWidth="3" />
              <rect x="0" y="0" width="45" height="28" fill="#dc2626" />
              <rect x="0" y="0" width="45" height="4" fill="#ffffff" />
              <rect x="0" y="8" width="45" height="4" fill="#ffffff" />
              <rect x="0" y="16" width="45" height="4" fill="#ffffff" />
              <rect x="0" y="0" width="20" height="15" fill="#1d4ed8" />
            </g>
            <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              TRANQUILITY BASE · APOLLO 11 LM DESCENT STAGE (PERMANENT MONUMENT)
            </text>
          </>
        )}
      </svg>
    </motion.div>
  );
}

/** Mangalyaan (ISRO MOM) Vector Scenes */
function MangalyaanScene({ stageId, speed }: { stageId: string; speed: number }) {
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
        {/* Full Martian globe in background */}
        <circle cx="680" cy="300" r="160" fill="#9a3412" />
        <ellipse cx="680" cy="155" rx="50" ry="15" fill="#fed7aa" />
        <path d="M600 280 Q 670 240 760 300 Q 720 370 630 350 Z" fill="#7c2d12" opacity="0.6" />

        {/* Mangalyaan Spacecraft in foreground */}
        <g transform="translate(320, 240)">
          {/* Main golden cubical bus */}
          <rect x="0" y="0" width="110" height="110" rx="10" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          {/* High-Gain Antenna parabolic dish */}
          <ellipse cx="55" cy="-25" rx="45" ry="18" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          <line x1="55" y1="0" x2="55" y2="-20" stroke="#94a3b8" strokeWidth="4" />
          {/* Solar wings extending to left and right */}
          <rect x="-140" y="15" width="130" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="120" y="15" width="130" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          {/* Main 440N Liquid Apogee Motor nozzle */}
          <polygon points="45,110 65,110 72,145 38,145" fill="#334155" />
          {/* Indian Tricolour flag on spacecraft body */}
          <rect x="35" y="45" width="40" height="5" fill="#f97316" />
          <rect x="35" y="50" width="40" height="5" fill="#ffffff" />
          <rect x="35" y="55" width="40" height="5" fill="#15803d" />
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          MOM (MANGALYAAN) · FIRST ASIAN NATION TO REACH MARS (FIRST ATTEMPT)
        </text>
      </svg>
    </motion.div>
  );
}

/** Philae Comet Lander Vector Scenes */
function PhilaeScene({ stageId, speed }: { stageId: string; speed: number }) {
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
        {/* Comet 67P craggy double-lobed body */}
        <g transform="translate(500, 420)">
          <ellipse cx="-120" cy="0" rx="200" ry="120" fill="#1e293b" />
          <ellipse cx="140" cy="-40" rx="140" ry="90" fill="#334155" />
          {/* Gas & dust sublimating jets */}
          <line x1="-80" y1="-80" x2="-140" y2="-220" stroke="#38bdf8" strokeWidth="3" opacity="0.4" />
          <line x1="120" y1="-100" x2="200" y2="-250" stroke="#38bdf8" strokeWidth="4" opacity="0.5" />
        </g>

        {/* Philae Lander wedged under dark Abydos cliff */}
        <g transform="translate(420, 220) rotate(-35)">
          <rect x="0" y="0" width="80" height="80" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
          {/* Solar cell face */}
          <rect x="8" y="8" width="64" height="64" fill="#1e3a8a" />
          {/* Three tripod legs */}
          <line x1="15" y1="80" x2="-20" y2="130" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="65" y1="80" x2="100" y2="130" stroke="#cbd5e1" strokeWidth="4" />
          <circle cx="-20" cy="132" r="10" fill="#94a3b8" />
          <circle cx="100" cy="132" r="10" fill="#94a3b8" />
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#38bdf8" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          PHILAE LANDER · TOUCHDOWN ON COMET 67P / CHURYUMOV–GERASIMENKO (ESA)
        </text>
      </svg>
    </motion.div>
  );
}

/** Voyager 1 Interstellar Vector Scenes */
function VoyagerScene({ stageId, speed }: { stageId: string; speed: number }) {
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
        {stageId === "pale-blue-dot" ? (
          <>
            {/* Carl Sagan's iconic Pale Blue Dot sunbeam */}
            <polygon points="620,0 720,0 520,600 420,600" fill="#fef08a" opacity="0.12" />
            <polygon points="480,0 580,0 380,600 280,600" fill="#fef08a" opacity="0.08" />
            {/* The Pale Blue Dot: 1 tiny cyan pixel */}
            <circle cx="560" cy="340" r="3.5" fill="#67e8f9" />
            <circle cx="560" cy="340" r="10" fill="#67e8f9" opacity="0.3" />
            <text x="500" y="565" textAnchor="middle" fill="#67e8f9" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              "THAT'S HERE. THAT'S HOME. THAT'S US." · THE PALE BLUE DOT (14 FEB 1990)
            </text>
          </>
        ) : (
          <>
            {/* Interstellar ocean with Voyager 1 and the Golden Record */}
            <g transform="translate(420, 220)">
              {/* 3.7m Parabolic Dish */}
              <ellipse cx="60" cy="40" rx="90" ry="32" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
              <line x1="60" y1="40" x2="60" y2="85" stroke="#64748b" strokeWidth="5" />
              {/* Decagonal bus */}
              <polygon points="20,85 100,85 115,130 5,130" fill="#d97706" />
              {/* The Golden Record */}
              <circle cx="60" cy="108" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="60" cy="108" r="6" fill="#713f12" />
              {/* Magnetometer boom */}
              <line x1="115" y1="105" x2="280" y2="140" stroke="#cbd5e1" strokeWidth="3" />
            </g>
            <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              VOYAGER 1 · BEYOND THE HELIOPAUSE & CARRYING THE GOLDEN RECORD
            </text>
          </>
        )}
      </svg>
    </motion.div>
  );
}
