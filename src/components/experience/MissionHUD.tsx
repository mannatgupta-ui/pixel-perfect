import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Camera,
  Compass,
  Radio,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
  Bot,
  Info,
  Maximize2,
  Minimize2,
  X,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import type { MissionChapter, CameraMode, SpacecraftComponentInfo } from "./types";
import { soundEngine } from "./SpacecraftSoundEngine";
import { useAstro } from "@/components/astro/AstroContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MissionHUDProps {
  chapters: MissionChapter[];
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  cameraMode: CameraMode;
  onChangeCameraMode: (mode: CameraMode) => void;
  selectedComponent: SpacecraftComponentInfo | null;
  onCloseComponent: () => void;
  onSelectComponentById: (id: string) => void;
  isEngineFiring: boolean;
  onCloseExperience: () => void;
  agency?: string;
  spacecraftName?: string;
  missionName?: string;
}

export function MissionHUD({
  chapters,
  activeChapterIndex,
  onSelectChapter,
  isPlaying,
  onTogglePlay,
  onRestart,
  playbackSpeed,
  onChangeSpeed,
  cameraMode,
  onChangeCameraMode,
  selectedComponent,
  onCloseComponent,
  onSelectComponentById,
  isEngineFiring,
  onCloseExperience,
  agency = "NASA",
  spacecraftName = "Spacecraft",
  missionName,
}: MissionHUDProps) {
  const currentChapter = chapters[activeChapterIndex] ?? chapters[0]!;
  const telemetry = currentChapter.telemetry;
  const { openWithPrompt } = useAstro();

  const [soundMuted, setSoundMuted] = useState(false);
  const [voiceNarrator, setVoiceNarrator] = useState(false);
  const [hudMinimized, setHudMinimized] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);

  // Sync sound mute state with soundEngine
  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    soundEngine.setMuted(next);
    if (!next) soundEngine.playTelemetryChirp();
  };

  // Reset active sentence when chapter changes
  useEffect(() => {
    setActiveSentenceIndex(0);
    soundEngine.playTelemetryChirp();
  }, [activeChapterIndex]);

  // Speech synthesis for 1st person narrative
  useEffect(() => {
    if (!voiceNarrator || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const sentence = currentChapter.firstPersonVoice[activeSentenceIndex];
    if (!sentence) return;

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 0.95 * playbackSpeed;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (activeSentenceIndex < currentChapter.firstPersonVoice.length - 1) {
        setActiveSentenceIndex((prev) => prev + 1);
      }
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [voiceNarrator, activeChapterIndex, activeSentenceIndex, playbackSpeed]);

  const handlePrev = () => {
    if (activeChapterIndex > 0) onSelectChapter(activeChapterIndex - 1);
  };

  const handleNext = () => {
    if (activeChapterIndex < chapters.length - 1) onSelectChapter(activeChapterIndex + 1);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-3 sm:p-5 select-none font-sans">
      {/* ──────────────────────────────────────────────────────────
          TOP BAR: MISSION CONTROL HEADER & TELEMETRY BADGES
          ────────────────────────────────────────────────────────── */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        {/* Left: Mission Identity & Chapter Header */}
        <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl shadow-panel">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-emerald-400">
              MISSION EXPERIENCE ENGINE
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-[11px] text-amber-400 font-semibold uppercase">
              {agency} · {missionName ? `${missionName} (${spacecraftName})` : spacecraftName}
            </span>
          </div>

          <div className="mt-1 flex items-baseline gap-2.5">
            <h1 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white">
              {currentChapter.title}
            </h1>
            <span className="font-mono text-xs text-white/50">
              (Chapter {currentChapter.chapterNumber} of {chapters.length})
            </span>
          </div>
          <div className="font-mono text-[11px] text-teal/90">{currentChapter.subtitle}</div>
        </div>

        {/* Right: Camera Mode Switcher, Audio, & Close Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Camera Perspective Mode Toggles */}
          <div className="flex rounded-xl border border-white/10 bg-black/80 p-1 backdrop-blur-xl shadow-panel">
            <button
              type="button"
              onClick={() => {
                onChangeCameraMode("first_person");
                soundEngine.playTelemetryChirp();
              }}
              title="First-Person Spacecraft Sensor POV"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition-all",
                cameraMode === "first_person"
                  ? "bg-mars text-white shadow-glow"
                  : "text-white/70 hover:text-white hover:bg-white/5",
              )}
            >
              <Eye className="size-3.5" />
              <span className="hidden sm:inline">1st Person POV</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onChangeCameraMode("chase");
                soundEngine.playTelemetryChirp();
              }}
              title="Cinematic Third-Person Chase Cam"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition-all",
                cameraMode === "chase"
                  ? "bg-mars text-white shadow-glow"
                  : "text-white/70 hover:text-white hover:bg-white/5",
              )}
            >
              <Camera className="size-3.5" />
              <span className="hidden sm:inline">Chase Cam</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onChangeCameraMode("free");
                soundEngine.playTelemetryChirp();
              }}
              title="Free 360° Orbital Exploration"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold transition-all",
                cameraMode === "free"
                  ? "bg-mars text-white shadow-glow"
                  : "text-white/70 hover:text-white hover:bg-white/5",
              )}
            >
              <Compass className="size-3.5" />
              <span className="hidden sm:inline">Free Orbit</span>
            </button>
          </div>

          {/* Sound Mute Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundMuted ? "Unmute Spacecraft Audio" : "Mute Spacecraft Audio"}
            className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-black/80 text-white/80 hover:text-white backdrop-blur-xl shadow-panel"
          >
            {soundMuted ? <VolumeX className="size-4 text-red-400" /> : <Volume2 className="size-4 text-emerald-400" />}
          </button>

          {/* Voice Narrator Toggle */}
          <button
            type="button"
            onClick={() => setVoiceNarrator((prev) => !prev)}
            title={voiceNarrator ? "Disable Audio Voiceover" : "Enable Audio Voiceover"}
            className={cn(
              "flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/80 px-2.5 py-2 font-mono text-xs font-semibold backdrop-blur-xl shadow-panel transition-all",
              voiceNarrator ? "text-amber-400 border-amber-500/40" : "text-white/60 hover:text-white",
            )}
          >
            <Radio className="size-3.5" />
            <span className="hidden md:inline">{voiceNarrator ? "Voice On" : "Voice"}</span>
          </button>

          {/* Close Experience Button */}
          <button
            type="button"
            onClick={onCloseExperience}
            title="Exit Mission Experience"
            className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-black/80 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-xl shadow-panel transition-all"
          >
            <X className="size-4" />
          </button>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          MIDDLE SECTION: TELEMETRY HUD (LEFT) & ASTRO COPILOT (RIGHT)
          ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-between gap-4 py-2 pointer-events-none">
        {/* Left Side: Real-Time Scientific Flight Telemetry */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto hidden sm:flex flex-col gap-2 max-w-[280px]"
        >
          <div className="rounded-2xl border border-white/10 bg-black/85 p-3.5 backdrop-blur-xl shadow-panel font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                FLIGHT TELEMETRY
              </span>
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase",
                  telemetry.provenance === "HISTORICAL ISRO TELEMETRY"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-sky-500/20 text-sky-300 border border-sky-500/30",
                )}
              >
                {telemetry.provenance === "HISTORICAL ISRO TELEMETRY" ? "HISTORICAL" : "SIMULATED"}
              </span>
            </div>

            <div className="mt-2.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60">MET:</span>
                <span className="font-bold text-amber-400">{telemetry.met}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Velocity:</span>
                <span className="font-bold text-white">{telemetry.speedKmS.toFixed(2)} km/s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Earth Distance:</span>
                <span className="font-bold text-white">
                  {telemetry.distEarthKm > 1000000
                    ? `${(telemetry.distEarthKm / 1000000).toFixed(1)}M km`
                    : `${telemetry.distEarthKm.toLocaleString()} km`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Mars Distance:</span>
                <span className="font-bold text-white">
                  {telemetry.distTargetKm > 1000000
                    ? `${(telemetry.distTargetKm / 1000000).toFixed(1)}M km`
                    : `${telemetry.distTargetKm.toLocaleString()} km`}
                </span>
              </div>
              {telemetry.altitudeKm !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Altitude:</span>
                  <span className="font-bold text-teal">{telemetry.altitudeKm.toLocaleString()} km</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-white/60">1-Way Light Delay:</span>
                <span className="font-bold text-sky-400">{telemetry.lightTimeDelay}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Propellant Left:</span>
                <span className="font-bold text-foreground">{telemetry.propellantMassKg.toFixed(1)} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Solar Power:</span>
                <span className="font-bold text-amber-300">{telemetry.powerWatts} W</span>
              </div>
            </div>

            {/* Thruster Burn Indicator */}
            {isEngineFiring && (
              <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-orange-500/20 py-1.5 border border-orange-500/40 text-orange-400 animate-pulse font-bold text-[10px]">
                <span className="size-2 rounded-full bg-orange-500" />
                <span>440N LIQUID ENGINE FIRING</span>
              </div>
            )}
          </div>
        </motion.aside>

        {/* Right Side: Interactive Component Inspector Drawer */}
        <AnimatePresence>
          {selectedComponent && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="pointer-events-auto rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl shadow-panel max-w-sm text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {selectedComponent.category} SUBSYSTEM
                </span>
                <button
                  type="button"
                  onClick={onCloseComponent}
                  className="rounded-full p-1 text-white/50 hover:text-white hover:bg-white/10"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <h3 className="mt-1 font-display text-base font-bold text-white">
                {selectedComponent.name}
              </h3>

              <p className="mt-2 text-xs text-white/80 leading-relaxed">
                {selectedComponent.description}
              </p>

              <div className="mt-3 space-y-1 rounded-xl bg-white/5 p-2.5 font-mono text-[11px] text-white/70">
                {selectedComponent.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">›</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Ask ASTRO About This Component */}
              <button
                type="button"
                onClick={() => {
                  openWithPrompt(
                    `Explain the role and significance of the ${selectedComponent.name} on Mangalyaan. What makes this engineering design unique?`,
                  );
                }}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 py-2 font-mono text-xs font-semibold text-primary-glow border border-primary/30 transition-all"
              >
                <Bot className="size-3.5" /> Ask ASTRO About This Subsystem
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ──────────────────────────────────────────────────────────
          BOTTOM SECTION: 1ST-PERSON STORYTELLING NARRATIVE & TIMELINE
          ────────────────────────────────────────────────────────── */}
      <footer className="pointer-events-auto space-y-3">
        {/* First-Person Voice Box */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/85 p-4 backdrop-blur-xl shadow-panel text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mars-glow font-bold">
              FIRST-PERSON SPACECRAFT PERSPECTIVE · {currentChapter.historicalDate}
            </span>
          </div>

          <p className="font-display text-sm sm:text-base font-medium text-white/95 leading-relaxed italic">
            "{currentChapter.firstPersonVoice[activeSentenceIndex]}"
          </p>

          {/* Sentence Pagination if multiple */}
          {currentChapter.firstPersonVoice.length > 1 && (
            <div className="mt-2 flex items-center justify-center gap-1.5">
              {currentChapter.firstPersonVoice.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveSentenceIndex(i)}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i === activeSentenceIndex ? "w-6 bg-mars" : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>
          )}

          {/* ASTRO Contextual Curiosity Buttons */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/10">
            <span className="font-mono text-[10px] text-white/50 flex items-center gap-1">
              <Bot className="size-3 text-sky-400" /> Ask ASTRO:
            </span>
            {currentChapter.astroPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openWithPrompt(prompt)}
                className="rounded-full bg-white/5 hover:bg-white/15 px-2.5 py-1 font-mono text-[11px] text-white/80 transition-colors border border-white/10 flex items-center gap-1"
              >
                <span>{prompt}</span>
                <ArrowRight className="size-2.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Master Timeline & Playback Controller */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/90 px-4 py-2.5 backdrop-blur-xl shadow-panel">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Playback Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeChapterIndex === 0}
                className="flex size-8 items-center justify-center rounded-lg text-white/70 hover:text-white disabled:opacity-30 hover:bg-white/10 transition-all"
                title="Previous Chapter"
              >
                <ChevronLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={onTogglePlay}
                className="flex size-9 items-center justify-center rounded-xl bg-mars text-white hover:scale-105 shadow-glow transition-all"
                title={isPlaying ? "Pause Experience" : "Play Experience"}
              >
                {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeChapterIndex === chapters.length - 1}
                className="flex size-8 items-center justify-center rounded-lg text-white/70 hover:text-white disabled:opacity-30 hover:bg-white/10 transition-all"
                title="Next Chapter"
              >
                <ChevronRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={onRestart}
                className="flex size-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                title="Restart Mission from Chapter 1"
              >
                <RotateCcw className="size-3.5" />
              </button>

              {/* Speed Multiplier */}
              <button
                type="button"
                onClick={() => {
                  const speeds = [1, 1.5, 2];
                  const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                  onChangeSpeed(speeds[nextIdx]!);
                }}
                className="ml-1 rounded-md px-2 py-1 font-mono text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
              >
                {playbackSpeed}x
              </button>
            </div>

            {/* Timeline Stage Indicators / Scrubber */}
            <div className="flex flex-1 items-center gap-1.5 overflow-x-auto py-1">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => onSelectChapter(idx)}
                  className={cn(
                    "flex-1 min-w-[70px] sm:min-w-[90px] rounded-lg py-1 px-1.5 text-left transition-all border",
                    idx === activeChapterIndex
                      ? "bg-mars-gradient border-amber-500/50 text-white shadow-glow"
                      : idx < activeChapterIndex
                      ? "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      : "bg-black/40 border-white/5 text-white/40 hover:text-white/60",
                  )}
                >
                  <div className="font-mono text-[9px] uppercase tracking-wider font-bold truncate">
                    Ch {ch.chapterNumber}
                  </div>
                  <div className="text-[10px] font-medium truncate">{ch.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

