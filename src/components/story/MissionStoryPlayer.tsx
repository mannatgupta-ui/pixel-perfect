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
  Sparkles,
  Info,
  Calendar,
  Compass,
  ArrowRight,
  Captions,
  Globe,
  X,
} from "lucide-react";

import { type StoryStage, type Hotspot, STORY_DISCLAIMER } from "@/data/spirit";
import { ALL_MISSION_STORIES, getStoryForArtifact, type MissionStoryMeta } from "@/data/multiStories";
import { getArtifact } from "@/data/artifacts";
import { Button } from "@/components/ui/button";
import { useAstro } from "@/components/astro/AstroContext";
import { cn } from "@/lib/utils";

interface Props {
  artifactId: string;
  initialStage?: number;
  onCloseInline?: () => void;
  compact?: boolean;
}

export function MissionStoryPlayer({
  artifactId,
  initialStage = 0,
  onCloseInline,
  compact = false,
}: Props) {
  const storyMeta = getStoryForArtifact(artifactId);
  const artifact = getArtifact(artifactId);
  const { updateContext, openWithPrompt } = useAstro();

  if (!storyMeta || !artifact) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Story not found for artifact: {artifactId}
      </div>
    );
  }

  const stages = storyMeta.stages;
  const [currentIdx, setCurrentIdx] = useState<number>(initialStage);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [subtitleSize, setSubtitleSize] = useState<"normal" | "large">("normal");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [subSentenceIdx, setSubSentenceIdx] = useState<number>(0);
  const [storyDrawerOpen, setStoryDrawerOpen] = useState<boolean>(false);

  // Active stage
  const stage = stages[currentIdx] ?? stages[0]!;

  const goToStage = (idx: number) => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    const clamped = Math.max(0, Math.min(stages.length - 1, idx));
    setCurrentIdx(clamped);
    setActiveHotspot(null);
    setSubSentenceIdx(0);
  };

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

  // Robust, sentence-synchronized speech synthesis & auto-advancing engine
  useEffect(() => {
    let cancelled = false;
    let timer: NodeJS.Timeout | null = null;

    const sentence = stage.narration[subSentenceIdx];
    if (!sentence) return;

    if (voiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 0.95 * speed;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find((v) => v.lang.startsWith("en") && !v.name.includes("whisper"));
      if (englishVoice) utterance.voice = englishVoice;

      utterance.onend = () => {
        if (cancelled) return;

        // If there are more sentences in this slide, advance to next sentence
        if (subSentenceIdx < stage.narration.length - 1) {
          timer = setTimeout(() => {
            if (!cancelled) setSubSentenceIdx((prev) => prev + 1);
          }, 350);
        } else {
          // Last sentence of the slide just finished completely!
          if (isPlaying) {
            timer = setTimeout(() => {
              if (!cancelled) {
                if (currentIdx < stages.length - 1) {
                  goToStage(currentIdx + 1);
                } else {
                  setIsPlaying(false);
                }
              }
            }, 2200);
          }
        }
      };

      utterance.onerror = () => {
        if (cancelled) return;
        // Fallback reading duration if speech synthesis encounters audio policy
        const wordCount = sentence.split(" ").length;
        const dur = Math.max(3000, (wordCount / 2.6) * 1000 / speed);
        timer = setTimeout(() => {
          if (!cancelled) {
            if (subSentenceIdx < stage.narration.length - 1) {
              setSubSentenceIdx((prev) => prev + 1);
            } else if (isPlaying) {
              if (currentIdx < stages.length - 1) goToStage(currentIdx + 1);
              else setIsPlaying(false);
            }
          }
        }, dur);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Muted playback or SpeechSynthesis not available: advance by word count reading pace
      if (isPlaying) {
        const wordCount = sentence.split(" ").length;
        const dur = Math.max(3600, (wordCount / 2.5) * 1000 / speed);
        timer = setTimeout(() => {
          if (!cancelled) {
            if (subSentenceIdx < stage.narration.length - 1) {
              setSubSentenceIdx((prev) => prev + 1);
            } else {
              timer = setTimeout(() => {
                if (!cancelled) {
                  if (currentIdx < stages.length - 1) goToStage(currentIdx + 1);
                  else setIsPlaying(false);
                }
              }, 1800);
            }
          }
        }, dur);
      }
    }

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [currentIdx, subSentenceIdx, voiceEnabled, isPlaying, speed, stage]);

  const togglePlay = () => {
    if (!isPlaying && !voiceEnabled) {
      // Auto-enable voice on first play click for immersive experience
      setVoiceEnabled(true);
    }
    setIsPlaying((p) => !p);
  };

  const nextStage = () => goToStage(currentIdx + 1);
  const prevStage = () => goToStage(currentIdx - 1);
  const restart = () => {
    goToStage(0);
    setIsPlaying(true);
  };

  const currentSubtitleText = stage.narration[subSentenceIdx] ?? stage.narration[0];

  return (
    <div className={cn("relative w-full overflow-hidden bg-space text-foreground", compact ? "rounded-3xl border border-border" : "")}>
      {/* Top Bar / Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-panel/75 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/20 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary-glow border border-primary/30">
            {storyMeta.agency}
          </span>
          <div>
            <h2 className="font-display text-sm font-semibold sm:text-base text-foreground">
              {storyMeta.title}
            </h2>
            <p className="font-mono text-[11px] text-muted-foreground">
              {stage.number} of {stages.length} · {stage.title} ({stage.date})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Closed Captions toggle */}
          <button
            type="button"
            onClick={() => setSubtitlesEnabled((p) => !p)}
            title={subtitlesEnabled ? "Subtitles ON (Click to hide)" : "Subtitles OFF (Click to show)"}
            className={cn(
              "flex items-center gap-1 rounded-xl border px-2.5 py-1 text-xs font-mono transition-colors",
              subtitlesEnabled
                ? "border-primary bg-primary/20 text-primary-glow font-bold shadow-glow"
                : "border-border bg-background/40 text-muted-foreground hover:text-foreground",
            )}
          >
            <Captions className="size-3.5" /> CC
          </button>

          {/* Voice Mute / Unmute */}
          <button
            type="button"
            onClick={() => setVoiceEnabled((v) => !v)}
            title={voiceEnabled ? "Mute narration audio" : "Enable spoken narration"}
            className={cn(
              "rounded-xl border p-1.5 transition-colors",
              voiceEnabled
                ? "border-primary bg-primary text-primary-foreground shadow-glow"
                : "border-border bg-background/40 text-muted-foreground hover:text-foreground",
            )}
          >
            {voiceEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>

          {/* Story Selector Modal Trigger */}
          <button
            type="button"
            onClick={() => setStoryDrawerOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-background/50 px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Globe className="size-3.5 text-teal" />
            <span className="hidden sm:inline">All Stories</span>
          </button>

          {onCloseInline && (
            <button
              type="button"
              onClick={onCloseInline}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close inline story"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Vector Animation Stage Canvas */}
      <div className="relative h-[48svh] sm:h-[58svh] w-full overflow-hidden bg-space starfield">
        <MultiMissionAnimationScene
          artifactId={storyMeta.artifactId}
          stageId={stage.id}
          speed={speed}
        />

        {/* Hotspots clickable pins */}
        {stage.hotspots.map((h, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveHotspot(activeHotspot?.label === h.label ? null : h)}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            aria-label={h.label}
          >
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex size-3.5 rounded-full bg-teal shadow-glow group-hover:scale-125 transition-transform" />
            </span>
          </button>
        ))}

        {/* Interactive Hotspot Tooltip Popover */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              style={{
                left: `${Math.min(80, Math.max(20, activeHotspot.x))}%`,
                top: `${Math.min(75, Math.max(25, activeHotspot.y))}%`,
              }}
              className="absolute z-30 max-w-xs -translate-x-1/2 -translate-y-full rounded-2xl border border-teal/40 bg-panel/95 p-3.5 shadow-panel backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-xs font-semibold text-teal">{activeHotspot.label}</p>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </div>
              <p className="mt-1 text-xs text-foreground/80 leading-relaxed font-sans">
                {activeHotspot.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CINEMATIC ON-SCREEN SUBTITLES (Synchronized with speech) */}
        {subtitlesEnabled && currentSubtitleText && (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex justify-center">
            <motion.div
              key={`${stage.id}-${subSentenceIdx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={cn(
                "max-w-2xl rounded-2xl border border-primary/30 bg-black/85 px-4 py-2.5 text-center shadow-panel backdrop-blur-md",
                subtitleSize === "large" ? "text-base sm:text-lg" : "text-xs sm:text-sm",
              )}
            >
              <p className="font-sans font-medium text-foreground leading-relaxed drop-shadow-md">
                "{currentSubtitleText}"
              </p>
              <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-mono text-muted-foreground">
                <span>Sentence {subSentenceIdx + 1} of {stage.narration.length}</span>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setSubtitleSize(subtitleSize === "normal" ? "large" : "normal")}
                  className="pointer-events-auto underline hover:text-primary-glow"
                >
                  {subtitleSize === "normal" ? "Large text" : "Normal text"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Playback Controls & Progress Bar */}
      <div className="border-t border-border/80 bg-panel/90 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Stepper Buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={prevStage}
              disabled={currentIdx === 0}
              className="h-8 rounded-xl px-2.5"
            >
              <ChevronLeft className="size-4" /> Prev
            </Button>

            <Button
              size="sm"
              variant="hero"
              onClick={togglePlay}
              className="h-8 gap-1.5 rounded-xl px-3 font-medium"
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
              {isPlaying ? "Pause" : "Play Story"}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={nextStage}
              disabled={currentIdx === stages.length - 1}
              className="h-8 rounded-xl px-2.5"
            >
              Next <ChevronRight className="size-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={restart}
              title="Restart story"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          </div>

          {/* Stage Progress Dots */}
          <div className="hidden md:flex items-center gap-1.5">
            {stages.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToStage(idx)}
                title={`${s.number}: ${s.title}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  idx === currentIdx
                    ? "w-7 bg-primary shadow-glow"
                    : idx < currentIdx
                    ? "w-2 bg-primary/50 hover:bg-primary/80"
                    : "w-2 bg-muted hover:bg-border",
                )}
              />
            ))}
          </div>

          {/* Speed Presets */}
          <div className="flex items-center gap-1">
            <span className="font-mono text-[10px] text-muted-foreground mr-1">Speed:</span>
            {[0.8, 1, 1.3].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={cn(
                  "rounded-lg px-2 py-0.5 font-mono text-[11px] transition-colors",
                  speed === s
                    ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scientific Context & Verified Fact Archive */}
      <div className="p-4 sm:p-6 bg-panel/50 border-t border-border/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-teal uppercase tracking-wider">
              <Compass className="size-3.5" /> Scientific Context
            </div>
            <h3 className="font-display text-base font-semibold text-foreground">
              {stage.scienceTitle}
            </h3>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans">
              {stage.science}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-primary-glow uppercase tracking-wider">
              <Info className="size-3.5" /> Verified Archive Records
            </div>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {stage.facts.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal font-bold">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
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
              className="relative max-h-[85svh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-panel p-6 shadow-panel"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="eyebrow">NASA · ISRO · ESA</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold">
                    All Animated Mission Stories
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select any mission to experience its complete lifecycle story.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStoryDrawerOpen(false)}
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_MISSION_STORIES.map((m) => (
                  <button
                    key={m.artifactId}
                    type="button"
                    onClick={() => {
                      setStoryDrawerOpen(false);
                      // Switch story to the selected mission
                      window.location.href = `/artifact/${m.artifactId}?view=story`;
                    }}
                    className={cn(
                      "text-left block rounded-2xl border p-4 transition-all hover:border-primary/50 hover:shadow-glow",
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
                    <h3 className="mt-2 font-display text-base font-semibold text-foreground">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/80 leading-relaxed line-clamp-2">
                      {m.heroTagline}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-teal font-mono">
                      <span>Destination: {m.destination}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-primary-glow">
                        Watch Story <ArrowRight className="size-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Procedural Vector Scenes for all missions
 */
export function MultiMissionAnimationScene({
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
      <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
        {stageId === "creation" ? (
          <>
            <rect width="1000" height="600" fill="#0c1524" />
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 30} x2="1000" y2={i * 30} stroke="#1e293b" strokeWidth="0.8" />
            ))}
            <text x="500" y="80" textAnchor="middle" fill="#f97316" fontFamily="IBM Plex Mono" fontSize="14" letterSpacing="4">
              ISRO / URSC SATELLITE CENTRE · BENGALURU, INDIA
            </text>
            <g transform="translate(420, 200)">
              <rect x="0" y="30" width="160" height="120" rx="10" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
              <rect x="-30" y="50" width="30" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" />
              <rect x="160" y="50" width="30" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" />
              <line x1="80" y1="30" x2="80" y2="-20" stroke="#cbd5e1" strokeWidth="4" />
              <circle cx="80" cy="-24" r="8" fill="#38bdf8" />
              <line x1="10" y1="150" x2="-40" y2="240" stroke="#94a3b8" strokeWidth="6" />
              <line x1="150" y1="150" x2="200" y2="240" stroke="#94a3b8" strokeWidth="6" />
              <circle cx="-40" cy="245" r="14" fill="#64748b" />
              <circle cx="200" cy="245" r="14" fill="#64748b" />
            </g>
            <rect x="350" y="520" width="100" height="6" fill="#f97316" />
            <rect x="450" y="520" width="100" height="6" fill="#ffffff" />
            <rect x="550" y="520" width="100" height="6" fill="#15803d" />
          </>
        ) : (
          <>
            <rect width="1000" height="600" fill="#090d16" />
            <ellipse cx="500" cy="500" rx="600" ry="180" fill="#334155" />
            <ellipse cx="280" cy="460" rx="140" ry="35" fill="#1e293b" />
            <ellipse cx="720" cy="480" rx="180" ry="40" fill="#1e293b" />
            <g transform="translate(450, 310)">
              <rect x="0" y="0" width="100" height="80" rx="8" fill="#d97706" />
              <rect x="35" y="25" width="30" height="5" fill="#f97316" />
              <rect x="35" y="30" width="30" height="5" fill="#ffffff" />
              <rect x="35" y="35" width="30" height="5" fill="#15803d" />
              <line x1="15" y1="80" x2="-25" y2="135" stroke="#94a3b8" strokeWidth="5" />
              <line x1="85" y1="80" x2="125" y2="135" stroke="#94a3b8" strokeWidth="5" />
            </g>
            <text x="500" y="555" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
              SHIV SHAKTI POINT · LUNAR SOUTH POLE (CHANDRAYAAN-3)
            </text>
          </>
        )}
      </svg>
    </motion.div>
  );
}

/** Huygens Vector Scenes */
function HuygensScene({ stageId, speed }: { stageId: string; speed: number }) {
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

/** Spirit Rover Vector Scenes */
function SpiritScene({ stageId, speed }: { stageId: string; speed: number }) {
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
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          OPPORTUNITY (MER-B) · 45.16 KM OFF-WORLD MARATHON RECORD
        </text>
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
        <circle cx="780" cy="120" r="36" fill="#1e40af" />
        <ellipse cx="500" cy="520" rx="650" ry="200" fill="#334155" />
        <g transform="translate(460, 310)">
          <polygon points="0,50 20,10 80,10 100,50 80,90 20,90" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <line x1="20" y1="80" x2="-35" y2="150" stroke="#94a3b8" strokeWidth="5" />
          <line x1="80" y1="80" x2="135" y2="150" stroke="#94a3b8" strokeWidth="5" />
          <circle cx="-35" cy="152" r="14" fill="#e2e8f0" />
          <circle cx="135" cy="152" r="14" fill="#e2e8f0" />
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          TRANQUILITY BASE · APOLLO 11 LM DESCENT STAGE (MONUMENT)
        </text>
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
        <circle cx="680" cy="300" r="160" fill="#9a3412" />
        <g transform="translate(320, 240)">
          <rect x="0" y="0" width="110" height="110" rx="10" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
          <ellipse cx="55" cy="-25" rx="45" ry="18" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          <rect x="-140" y="15" width="130" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="120" y="15" width="130" height="80" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="35" y="45" width="40" height="5" fill="#f97316" />
          <rect x="35" y="50" width="40" height="5" fill="#ffffff" />
          <rect x="35" y="55" width="40" height="5" fill="#15803d" />
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          MOM (MANGALYAAN) · FIRST ASIAN NATION TO REACH MARS (ISRO)
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
        <g transform="translate(500, 420)">
          <ellipse cx="-120" cy="0" rx="200" ry="120" fill="#1e293b" />
          <ellipse cx="140" cy="-40" rx="140" ry="90" fill="#334155" />
        </g>
        <g transform="translate(420, 220) rotate(-35)">
          <rect x="0" y="0" width="80" height="80" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
          <rect x="8" y="8" width="64" height="64" fill="#1e3a8a" />
          <line x1="15" y1="80" x2="-20" y2="130" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="65" y1="80" x2="100" y2="130" stroke="#cbd5e1" strokeWidth="4" />
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#38bdf8" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          PHILAE LANDER · TOUCHDOWN ON COMET 67P (ESA)
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
        <g transform="translate(420, 220)">
          <ellipse cx="60" cy="40" rx="90" ry="32" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <polygon points="20,85 100,85 115,130 5,130" fill="#d97706" />
          <circle cx="60" cy="108" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <line x1="115" y1="105" x2="280" y2="140" stroke="#cbd5e1" strokeWidth="3" />
        </g>
        <text x="500" y="565" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="13" letterSpacing="2">
          VOYAGER 1 · BEYOND THE HELIOPAUSE & CARRYING THE GOLDEN RECORD
        </text>
      </svg>
    </motion.div>
  );
}
