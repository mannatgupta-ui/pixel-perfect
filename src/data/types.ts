export type BodyId =
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "moon"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

/** Planetocentric latitude / east-positive longitude, in degrees. */
export interface Coordinates {
  lat: number;
  lon: number;
  precision: "documented" | "approximate";
  /** Required when precision is "approximate": explains what the point really represents. */
  note?: string;
}

export type ArtifactKind =
  | "rover"
  | "lander"
  | "descent-stage"
  | "helicopter"
  | "orbiter"
  | "atmospheric-probe"
  | "deep-space-probe";

export type ArtifactStatus = "active" | "silent" | "destroyed";

export interface Photo {
  url: string;
  caption: string;
  credit: string;
}

export interface MissionScientist {
  name: string;
  role: string;
  institution: string;
  contribution: string;
  quote?: string;
  photoUrl?: string;
}

export interface ArchivalPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  credit: string;
  dateOrSol?: string;
  instrument?: string;
  significance?: string;
}

export interface MissionInstrument {
  name: string;
  acronym: string;
  purpose: string;
  leadInstitution: string;
  description: string;
  keyDiscovery: string;
}

export interface TechnicalSpecs {
  massLaunchKg?: string | number;
  massLandedKg?: string | number;
  dimensions?: string;
  powerSystem?: string;
  powerOutput?: string;
  flightComputer?: string;
  memory?: string;
  mobilityOrPropulsion?: string;
  topSpeed?: string;
  totalDistance?: string;
  communicationLinks?: string;
  plannedDuration?: string;
  actualDuration?: string;
}

export interface ScientificBreakthrough {
  title: string;
  dateOrSol?: string;
  summary: string;
  significance: string;
}

export interface MissionDossier {
  artifactId: string;
  missionOverview: string;
  scientists: MissionScientist[];
  photos: ArchivalPhoto[];
  instruments: MissionInstrument[];
  specs: TechnicalSpecs;
  breakthroughs: ScientificBreakthrough[];
  historicalQuotes: { quote: string; author: string; context: string }[];
  officialArchives: { name: string; url: string; description: string }[];
}

export interface Source {
  label: string;
  url: string;
}

export type SpaceAgency = "NASA" | "ISRO" | "ESA";

export interface Artifact {
  id: string;
  name: string;
  mission: string;
  agency?: SpaceAgency;
  /** null = deep-space category (not tied to a planet). */
  bodyId: BodyId | null;
  kind: ArtifactKind;
  launchDate?: string;
  /** Landing, arrival or impact date (ISO, UTC). */
  arrivalDate?: string;
  arrivalLabel?: string;
  site?: string;
  coords?: Coordinates;
  status: ArtifactStatus;
  statusLabel: string;
  lastSignal?: string;
  lastSignalLabel?: string;
  finalCondition?: string;
  endReason?: string;
  finalLocation?: string;
  remains?: string;
  summary: string;
  photo?: Photo;
  sources: Source[];
  hasStory?: boolean;
  hasModel?: boolean;
}

export interface CelestialBody {
  id: BodyId;
  name: string;
  tagline: string;
  /** Display radius in scene units (not to scale). */
  radius: number;
  /** Display orbit radius in scene units (not to scale). 0 = Sun. */
  orbit: number;
  /** Real orbital period in Earth years (used for compressed animation speed). */
  periodYears: number;
  /** Parent body for moons. */
  parent?: BodyId;
  diameterKm: number;
  distance: string;
  dayLength: string;
  /** True when a 3D surface exploration globe exists. */
  explorable: boolean;
  noHardwareNote?: string;
}
