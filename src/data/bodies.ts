import type { BodyId, CelestialBody } from "./types";

/**
 * Display values (radius, orbit) are NOT to scale — they are compressed so the
 * whole Solar System fits on one screen. Facts (diameter, distance, day) are real.
 */
export const BODIES: CelestialBody[] = [
  {
    id: "sun",
    name: "The Sun",
    tagline: "The star every machine was powered by — directly or indirectly.",
    radius: 2.4,
    orbit: 0,
    periodYears: 0,
    diameterKm: 1_392_700,
    distance: "Centre of the Solar System",
    dayLength: "~25 Earth days at its equator",
    explorable: false,
    noHardwareNote:
      "No hardware has been left on the Sun. NASA's Parker Solar Probe is still flying close passes around it.",
  },
  {
    id: "mercury",
    name: "Mercury",
    tagline: "The smallest planet, and the final home of MESSENGER.",
    radius: 0.28,
    orbit: 4.6,
    periodYears: 0.241,
    diameterKm: 4_879,
    distance: "0.39 AU from the Sun",
    dayLength: "176 Earth days (solar day)",
    explorable: false,
  },
  {
    id: "venus",
    name: "Venus",
    tagline: "A crushing, scorching atmosphere that swallowed every visitor.",
    radius: 0.46,
    orbit: 6.4,
    periodYears: 0.615,
    diameterKm: 12_104,
    distance: "0.72 AU from the Sun",
    dayLength: "117 Earth days (solar day)",
    explorable: false,
  },
  {
    id: "earth",
    name: "Earth",
    tagline: "Home. Every machine in this museum was built here.",
    radius: 0.5,
    orbit: 8.6,
    periodYears: 1,
    diameterKm: 12_742,
    distance: "1 AU from the Sun",
    dayLength: "24 hours",
    explorable: false,
    noHardwareNote:
      "Every artifact here began its journey on Earth. Select the Moon, Mars or the deep-space probes to find what we left behind.",
  },
  {
    id: "moon",
    name: "The Moon",
    tagline: "Six Apollo landing sites still hold the hardware astronauts left behind.",
    radius: 0.15,
    orbit: 0.95,
    periodYears: 0.0748,
    parent: "earth",
    diameterKm: 3_474,
    distance: "~384,400 km from Earth",
    dayLength: "29.5 Earth days (solar day)",
    explorable: true,
  },
  {
    id: "mars",
    name: "Mars",
    tagline: "The red planet — a graveyard and a workshop of robotic explorers.",
    radius: 0.38,
    orbit: 11,
    periodYears: 1.881,
    diameterKm: 6_779,
    distance: "1.52 AU from the Sun",
    dayLength: "24 h 39 min (one sol)",
    explorable: true,
  },
  {
    id: "jupiter",
    name: "Jupiter",
    tagline: "The giant that Galileo was steered into, on purpose.",
    radius: 1.2,
    orbit: 15.2,
    periodYears: 11.86,
    diameterKm: 139_820,
    distance: "5.2 AU from the Sun",
    dayLength: "~9 h 56 min",
    explorable: false,
  },
  {
    id: "saturn",
    name: "Saturn",
    tagline: "Cassini's grand finale ended inside these clouds.",
    radius: 1.0,
    orbit: 19.4,
    periodYears: 29.46,
    diameterKm: 116_460,
    distance: "9.5 AU from the Sun",
    dayLength: "~10 h 33 min",
    explorable: false,
  },
  {
    id: "uranus",
    name: "Uranus",
    tagline: "Visited once, briefly, by Voyager 2 in 1986.",
    radius: 0.7,
    orbit: 23,
    periodYears: 84.01,
    diameterKm: 50_724,
    distance: "19.2 AU from the Sun",
    dayLength: "~17 h 14 min",
    explorable: false,
    noHardwareNote:
      "No hardware remains here — Voyager 2 flew past in January 1986 and kept going. Find it under Deep Space.",
  },
  {
    id: "neptune",
    name: "Neptune",
    tagline: "The last planet Voyager 2 greeted before leaving for the stars.",
    radius: 0.68,
    orbit: 26.2,
    periodYears: 164.8,
    diameterKm: 49_244,
    distance: "30.1 AU from the Sun",
    dayLength: "~16 h 6 min",
    explorable: false,
    noHardwareNote:
      "No hardware remains here — Voyager 2 flew past in August 1989. Find it under Deep Space.",
  },
];

export const BODY_BY_ID = Object.fromEntries(BODIES.map((b) => [b.id, b])) as Record<
  BodyId,
  CelestialBody
>;

export const BODY_IDS = BODIES.map((b) => b.id);

export function isBodyId(value: string): value is BodyId {
  return (BODY_IDS as string[]).includes(value);
}

export const SCALE_NOTE =
  "Sizes, distances and orbital speeds are compressed so everything fits on screen — they are not to scale.";
