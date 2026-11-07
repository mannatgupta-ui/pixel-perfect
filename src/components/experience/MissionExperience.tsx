import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { MANGALYAAN_EXPERIENCE_CONFIG } from "./MangalyaanMissionConfig";
import { Mangalyaan3DModel } from "./Mangalyaan3DModel";
import { CinematicEnvironment } from "./CinematicEnvironment";
import { SpacecraftCameraRig } from "./SpacecraftCameraRig";
import { MissionHUD } from "./MissionHUD";
import { soundEngine } from "./SpacecraftSoundEngine";
import type { CameraMode, SpacecraftComponentInfo } from "./types";
import { useAstro } from "@/components/astro/AstroContext";

interface MissionExperienceProps {
  onClose?: () => void;
  initialChapterIndex?: number;
  initialCameraMode?: CameraMode;
}

export function MissionExperience({
  onClose,
  initialChapterIndex = 0,
  initialCameraMode = "chase",
}: MissionExperienceProps) {
  const config = MANGALYAAN_EXPERIENCE_CONFIG;
  const chapters = config.chapters;
  const { updateContext } = useAstro();

  const [activeChapterIndex, setActiveChapterIndex] = useState(initialChapterIndex);
  const [cameraMode, setCameraMode] = useState<CameraMode>(initialCameraMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedComponent, setSelectedComponent] = useState<SpacecraftComponentInfo | null>(null);

  const activeChapter = chapters[activeChapterIndex] ?? chapters[0]!;

  // Is the main engine currently firing?
  const isEngineFiring =
    activeChapter.environmentType === "launch" ||
    activeChapter.environmentType === "earth_orbit" ||
    activeChapter.environmentType === "insertion";

  const isEclipse =
    activeChapter.environmentType === "insertion" ||
    activeChapter.environmentType === "eclipse";

  // Sync ASTRO AI Copilot context whenever active chapter or component changes
  useEffect(() => {
    updateContext({
      selectedArtifact: config.spacecraftName,
      selectedMission: config.missionName,
      selectedPlanet: config.targetBody,
      currentStoryStage: `Chapter ${activeChapter.chapterNumber}: ${activeChapter.title}`,
      selectedComponent: selectedComponent?.name ?? null,
    });
  }, [activeChapterIndex, selectedComponent]);

  // Handle ambient hum and engine burn sounds
  useEffect(() => {
    soundEngine.startAmbientHum();

    if (isEngineFiring) {
      soundEngine.playEngineBurn(6.0, 0.6);
    } else if (activeChapter.environmentType === "insertion") {
      soundEngine.playOccultationStatic(3.0);
    }

    return () => {
      soundEngine.stopAmbientHum();
    };
  }, [activeChapterIndex, isEngineFiring]);

  // Automated progression timer when playing
  useEffect(() => {
    if (!isPlaying) return;

    const stageDurationMs = (16000 / playbackSpeed);
    const timer = setTimeout(() => {
      if (activeChapterIndex < chapters.length - 1) {
        setActiveChapterIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, stageDurationMs);

    return () => clearTimeout(timer);
  }, [isPlaying, activeChapterIndex, playbackSpeed, chapters.length]);

  const handleSelectChapter = (index: number) => {
    const clamped = Math.max(0, Math.min(chapters.length - 1, index));
    setActiveChapterIndex(clamped);
    setSelectedComponent(null);
    soundEngine.playTelemetryChirp();

    // Respect default camera for the selected stage
    setCameraMode(chapters[clamped]?.cameraMode ?? "chase");
  };

  const handleSelectComponent = (comp: SpacecraftComponentInfo) => {
    setSelectedComponent(comp);
    soundEngine.playRcsBurst();
  };

  const handleSelectComponentById = (id: string) => {
    const comp = config.components.find((c) => c.id === id);
    if (comp) handleSelectComponent(comp);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black select-none">
      {/* ──────────────────────────────────────────────────────────
          3D WEBGL SIMULATOR CANVAS
          ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Suspense fallback={<ExperienceLoader spacecraftName={config.spacecraftName} />}>
          <Canvas
            camera={{
              position: activeChapter.cameraPosition,
              fov: cameraMode === "first_person" ? 65 : 42,
            }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
            }}
          >
            {/* Dynamic Stage Environment */}
            <CinematicEnvironment type={activeChapter.environmentType} />

            {/* Dynamic Camera Controller */}
            <SpacecraftCameraRig
              cameraMode={cameraMode}
              targetPosition={
                cameraMode === "first_person"
                  ? [0.55, -0.2, 0.95] // First-person optical sensor vantage point
                  : activeChapter.cameraPosition
              }
              targetLookAt={
                cameraMode === "first_person"
                  ? [0, 0, 18] // Looking straight out into the cosmos / approaching planet
                  : activeChapter.cameraTarget
              }
            />

            {/* 3D Spacecraft Model */}
            <Mangalyaan3DModel
              selectedComponentId={selectedComponent?.id ?? activeChapter.highlightedComponentId ?? null}
              onSelectComponent={handleSelectComponent}
              components={config.components}
              isEngineFiring={isEngineFiring}
              isEclipse={isEclipse}
              cameraMode={cameraMode}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* ──────────────────────────────────────────────────────────
          HEADS-UP DISPLAY (HUD) & INTERACTIVE CONTROLS OVERLAY
          ────────────────────────────────────────────────────────── */}
      <MissionHUD
        chapters={chapters}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={handleSelectChapter}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
        onRestart={() => handleSelectChapter(0)}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={setPlaybackSpeed}
        cameraMode={cameraMode}
        onChangeCameraMode={setCameraMode}
        selectedComponent={selectedComponent}
        onCloseComponent={() => setSelectedComponent(null)}
        onSelectComponentById={handleSelectComponentById}
        isEngineFiring={isEngineFiring}
        onCloseExperience={() => {
          soundEngine.stopAmbientHum();
          onClose?.();
        }}
      />
    </div>
  );
}

function ExperienceLoader({ spacecraftName }: { spacecraftName: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black font-mono text-white">
      <div className="size-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mb-4" />
      <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
        CALIBRATING SPACECRAFT AVIONICS
      </div>
      <div className="text-[11px] text-white/50 mt-1">Initializing 3D simulation for {spacecraftName}…</div>
    </div>
  );
}
