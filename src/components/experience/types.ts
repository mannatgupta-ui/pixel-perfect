export type CameraMode = "first_person" | "chase" | "free";

export interface TelemetryData {
  met: string; // Mission Elapsed Time, e.g. "T+ 00:00:00", "MET 298d 14h 22m"
  speedKmS: number; // km/s
  distEarthKm: number; // km from Earth
  distTargetKm: number; // km to target (e.g. Mars)
  altitudeKm?: number | undefined; // altitude above surface if applicable
  lightTimeDelay: string; // e.g. "0.002s", "12m 42s"
  propellantMassKg: number; // remaining bipropellant mass
  powerWatts: number; // solar array electrical generation
  signalStrengthDb: number; // received signal strength indicator (dBm)
  provenance: "HISTORICAL ISRO TELEMETRY" | "ORBITAL MECHANICS SIMULATION" | "AUTHENTIC RECONSTRUCTION";
}

export interface SpacecraftComponentInfo {
  id: string;
  name: string;
  category: "propulsion" | "power" | "communication" | "payload" | "structure";
  description: string;
  specs: string[];
  position: [number, number, number];
}

export interface MissionChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  historicalDate: string;
  firstPersonVoice: string[]; // Written in authentic 1st person: "I was born...", "My thrusters fired..."
  scientificContext: string;
  cameraMode: CameraMode;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  environmentType:
    | "cleanroom"
    | "launch"
    | "earth_orbit"
    | "cruise"
    | "approach"
    | "insertion"
    | "science_orbit"
    | "eclipse";
  telemetry: TelemetryData;
  highlightedComponentId?: string;
  eventPills: string[];
  astroPrompts: string[];
  sources: { title: string; url?: string; citation: string }[];
}

export interface MissionExperienceConfig {
  artifactId: string;
  missionName: string;
  spacecraftName: string;
  agency: string;
  launchDate: string;
  endOfMissionDate: string;
  targetBody: string;
  overview: string;
  chapters: MissionChapter[];
  components: SpacecraftComponentInfo[];
}
