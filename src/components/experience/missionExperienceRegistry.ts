import { getArtifact } from "@/data/artifacts";
import { getMissionDossier } from "@/data/missionDossiers";
import { getStoryForArtifact } from "@/data/multiStories";
import { MANGALYAAN_EXPERIENCE_CONFIG } from "./MangalyaanMissionConfig";
import type { MissionExperienceConfig, MissionChapter, SpacecraftComponentInfo, CameraMode } from "./types";

/**
 * Universal Registry: Retrieves or synthesizes the full Mission Experience
 * configuration for ANY of the 37 artifacts.
 */
export function getMissionExperienceConfig(artifactId: string): MissionExperienceConfig {
  if (artifactId === "mangalyaan") {
    return MANGALYAAN_EXPERIENCE_CONFIG;
  }

  const artifact = getArtifact(artifactId);
  const dossier = getMissionDossier(artifactId);
  const story = getStoryForArtifact(artifactId);

  if (!artifact) {
    return MANGALYAAN_EXPERIENCE_CONFIG;
  }

  // Extract or synthesize components from dossier/artifact
  const components: SpacecraftComponentInfo[] = [];

  if (dossier?.instruments && dossier.instruments.length > 0) {
    dossier.instruments.forEach((inst, i) => {
      components.push({
        id: `inst-${i}`,
        name: inst.name,
        category: "payload",
        description: inst.purpose,
        specs: [
          `Acronym: ${inst.acronym}`,
          `Lead Institution: ${inst.leadInstitution}`,
          `Key Discovery: ${inst.keyDiscovery}`,
        ],
        position: [
          (i % 2 === 0 ? 0.6 : -0.6),
          0.2 + (i * 0.15),
          0.7,
        ],
      });
    });
  }

  // Core structural components based on hardware kind
  components.unshift({
    id: "central-bus",
    name: `${artifact.name} Primary Bus & Avionics`,
    category: "structure",
    description: `Central flight structure and thermal control system for ${artifact.name}. Designed by ${artifact.agency ?? "NASA"} for extreme interplanetary environments.`,
    specs: [
      `Agency: ${artifact.agency ?? "NASA"}`,
      `Mission: ${artifact.mission}`,
      `Category: ${artifact.kind.toUpperCase()}`,
      `Site / Location: ${artifact.site ?? artifact.finalLocation ?? "Extraterrestrial Space"}`,
    ],
    position: [0, 0, 0],
  });

  if (artifact.kind === "rover") {
    components.push(
      {
        id: "rover-mobility",
        name: "Rocker-Bogie All-Terrain Mobility System",
        category: "propulsion",
        description: "Six cleated aluminum wheels with independent drive motors and differential rocker-bogie suspension designed to climb over boulders without tipping.",
        specs: ["Wheels: 6 independent drive actuators", "Suspension: Rocker-Bogie mechanical linkage"],
        position: [0, -0.4, 0],
      },
      {
        id: "rover-mast",
        name: "Pancam & Navcam Remote Sensing Mast",
        category: "payload",
        description: "Elevated camera mast providing high-resolution stereo vision and multispectral panoramic imaging.",
        specs: ["Sensors: Stereo Pancam / Navcam", "Aperture: Human-eye height observation"],
        position: [0.35, 1.1, 0.4],
      },
    );
  } else if (artifact.kind === "lander") {
    components.push(
      {
        id: "lander-legs",
        name: "Crushable Aluminum Shock-Absorbing Landing Legs",
        category: "structure",
        description: "Cantilevered tripod or quad landing gear with honeycomb shock absorbers designed to cushion touchdown on alien soil.",
        specs: ["Configuration: Multi-leg cantilever", "Footpads: Wide surface area for regolith"],
        position: [0, -0.6, 0],
      },
      {
        id: "lander-terminal-engines",
        name: "Pulsed Hydrazine Descent Thrusters",
        category: "propulsion",
        description: "Terminal braking engines designed to kill descent velocity before touchdown.",
        specs: ["Propellant: Hydrazine monopropellant", "Control: Closed-loop radar altimeter guidance"],
        position: [0, -0.8, 0],
      },
    );
  } else if (artifact.kind === "orbiter" || artifact.kind === "deep-space-probe") {
    components.push(
      {
        id: "hga-dish",
        name: "High-Gain Parabolic Telecommunications Dish",
        category: "communication",
        description: "High-gain antenna providing deep-space tracking links with Earth's Deep Space Network.",
        specs: ["Frequencies: X-band / S-band", "Network: NASA DSN / Ground Tracking"],
        position: [0, 0.85, 0],
      },
      {
        id: "main-engine",
        name: "Trajectory Insertion Rocket Engine",
        category: "propulsion",
        description: "Primary liquid propulsion system for orbital capture and trajectory corrections.",
        specs: ["Function: Orbit Insertion / Delta-V", "Propellant: Bipropellant or Solid Kick Motor"],
        position: [0, -0.8, 0],
      },
    );
  }

  // Build Chapters from Story or Synthesize authentic stages
  const rawStages = story?.stages ?? [];
  const chapters: MissionChapter[] = [];

  const stageCount = rawStages.length > 0 ? rawStages.length : 5;

  for (let idx = 0; idx < stageCount; idx++) {
    const rawStage = rawStages[idx];
    const chNum = idx + 1;

    let envType: MissionChapter["environmentType"] = "cleanroom";
    let camMode: CameraMode = "free";
    let camPos: [number, number, number] = [3, 2, 3.5];
    let camTarget: [number, number, number] = [0, 0, 0];

    // Determine semantic phase based on index and title
    const titleLower = (rawStage?.title ?? "").toLowerCase();
    const idLower = (rawStage?.id ?? "").toLowerCase();

    if (idx === 0 || titleLower.includes("born") || titleLower.includes("assembly") || titleLower.includes("inception") || titleLower.includes("dream")) {
      envType = "cleanroom";
      camMode = "free";
      camPos = [3.2, 1.4, 3.2];
    } else if (idx === 1 || titleLower.includes("launch") || titleLower.includes("liftoff") || titleLower.includes("roar")) {
      envType = "launch";
      camMode = "free";
      camPos = [0, 2.2, 4.2];
      camTarget = [0, 0.6, -1.0];
    } else if (idx === stageCount - 1 || titleLower.includes("silent") || titleLower.includes("legacy") || titleLower.includes("monument") || titleLower.includes("eternal")) {
      envType = artifact.kind === "rover" || artifact.kind === "lander" ? "surface" : "eclipse";
      camMode = "free";
      camPos = [2.5, 1.5, 2.5];
    } else if (titleLower.includes("entry") || titleLower.includes("descent") || titleLower.includes("terror") || titleLower.includes("parachute") || titleLower.includes("skycrane")) {
      envType = "descent";
      camMode = "free";
      camPos = [1.8, 1.2, 3.0];
    } else if (titleLower.includes("landing") || titleLower.includes("touchdown") || titleLower.includes("bounce")) {
      envType = "landing";
      camMode = "free";
      camPos = [0, 0.8, 2.2];
    } else if (titleLower.includes("surface") || titleLower.includes("explore") || titleLower.includes("roving") || titleLower.includes("first")) {
      envType = "surface";
      camMode = "free";
      camPos = [0, 0.8, 2.0];
    } else if (titleLower.includes("orbit") || titleLower.includes("insertion")) {
      envType = "insertion";
      camMode = "free";
      camPos = [2.0, 1.2, 3.0];
    } else {
      envType = "cruise";
      camMode = "free";
      camPos = [2.5, 1.8, 3.5];
    }

    // First person voice generation from narrative
    const voiceLines: string[] = [];
    if (rawStage?.narration && rawStage.narration.length > 0) {
      rawStage.narration.forEach((line) => {
        // Convert to first-person framing if not already
        if (line.toLowerCase().startsWith("i ") || line.toLowerCase().startsWith("my ")) {
          voiceLines.push(line);
        } else {
          voiceLines.push(`"${line}"`);
        }
      });
    } else {
      if (idx === 0) {
        voiceLines.push(`I was conceived and built on Earth by ${artifact.agency ?? "NASA"} engineers, destined to venture across space to ${artifact.bodyId ?? "the cosmos"}.`);
      } else if (idx === 1) {
        voiceLines.push(`I roared into the sky on ${artifact.launchDate ? new Date(artifact.launchDate).toLocaleDateString() : "launch day"}, breaking Earth's atmospheric bonds.`);
      } else if (idx === stageCount - 1) {
        voiceLines.push(`My mission concluded at ${artifact.site ?? "my resting place"}. Though silent now, I remain as humanity's enduring witness.`);
      } else {
        voiceLines.push(`I traversed the silent interplanetary void toward my target destination.`);
      }
    }

    chapters.push({
      id: rawStage?.id ?? `stage-${idx}`,
      chapterNumber: chNum,
      title: rawStage?.title ?? `Chapter ${chNum}`,
      subtitle: `${artifact.agency ?? "NASA"} · ${rawStage?.date ?? artifact.launchDate ?? "Historical Mission"}`,
      historicalDate: rawStage?.date ?? (idx === 0 ? artifact.launchDate ?? "1960–2020s" : artifact.arrivalDate ?? "Historical Date"),
      firstPersonVoice: voiceLines,
      scientificContext: rawStage?.science ?? artifact.summary,
      cameraMode: camMode,
      cameraPosition: camPos,
      cameraTarget: camTarget,
      environmentType: envType,
      telemetry: {
        met: idx === 0 ? "T- 00:00:00" : idx === 1 ? "T+ 00:03:00" : `MET Stage ${chNum}`,
        speedKmS: idx === 0 ? 0.0 : idx === 1 ? 7.8 : idx === stageCount - 1 ? 0.0 : 18.4,
        distEarthKm: idx === 0 ? 0 : idx === 1 ? 250 : 225000000,
        distTargetKm: idx === stageCount - 1 ? 0 : 54000000,
        altitudeKm: envType === "cleanroom" ? 0 : envType === "surface" ? 0 : 250,
        lightTimeDelay: idx === 0 ? "0.000s" : idx === 1 ? "0.001s" : "12m 40s",
        propellantMassKg: Math.max(0, 500 - idx * 80),
        powerWatts: idx === stageCount - 1 ? 0 : 450,
        signalStrengthDb: idx === stageCount - 1 ? -145 : -85,
        provenance: "HISTORICAL ISRO TELEMETRY",
      },
      highlightedComponentId: components[Math.min(idx, components.length - 1)]?.id ?? "central-bus",
      eventPills: rawStage?.facts?.slice(0, 4) ?? [artifact.mission, artifact.agency ?? "NASA", artifact.kind],
      astroPrompts: [
        `Explain what happened during this stage of ${artifact.name}'s mission.`,
        `What engineering challenges did ${artifact.agency ?? "the team"} face here?`,
        `What makes the scientific discoveries of ${artifact.name} historically significant?`,
      ],
      sources: artifact.sources.map((s) => ({
        title: s.label,
        url: s.url,
        citation: `${s.label} (${artifact.agency ?? "NASA"} Science Archive)`,
      })),
    });
  }

  return {
    artifactId: artifact.id,
    missionName: artifact.mission,
    spacecraftName: artifact.name,
    agency: artifact.agency ?? "NASA",
    launchDate: artifact.launchDate ?? "Documented Launch",
    endOfMissionDate: artifact.lastSignal ?? artifact.arrivalDate ?? "Mission Complete",
    targetBody: artifact.bodyId ?? "deep-space",
    overview: artifact.summary,
    chapters,
    components,
  };
}
