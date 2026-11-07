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
import { MultiMissionAnimationScene } from "./MissionScenes";
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
          stageIndex={currentIdx}
          totalStages={stages.length}
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

