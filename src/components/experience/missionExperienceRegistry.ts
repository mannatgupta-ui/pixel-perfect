import { getArtifact } from "@/data/artifacts";
import { getMissionDossier } from "@/data/missionDossiers";
import { getStoryForArtifact, type MissionStoryMeta } from "@/data/multiStories";
import { MANGALYAAN_EXPERIENCE_CONFIG } from "./MangalyaanMissionConfig";
import type { Artifact } from "@/data/types";
import type { MissionExperienceConfig, MissionChapter, SpacecraftComponentInfo, CameraMode, TelemetryData } from "./types";

/**
 * Universal Registry: Retrieves or synthesizes the full Mission Experience
 * configuration for ANY of the 37 artifacts with a deep, multi-stage lifecycle (7-9 chapters).
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

  // 1. Synthesize detailed, interactive 3D components for this hardware
  const components = buildHardwareComponents(artifact, dossier);

  // 2. Synthesize or retrieve a deep 7-to-9 chapter lifecycle
  const chapters = buildDeepMissionChapters(artifact, dossier, story, components);

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

/* ────────────────────────────────────────────────────────────────
   1. HARDWARE COMPONENT SYNTHESIZER
   ──────────────────────────────────────────────────────────────── */

function buildHardwareComponents(artifact: Artifact, dossier: ReturnType<typeof getMissionDossier>): SpacecraftComponentInfo[] {
  const components: SpacecraftComponentInfo[] = [];

  // Core Bus Structure
  components.push({
    id: "central-bus",
    name: `${artifact.name} Primary Bus & Avionics`,
    category: "structure",
    description: `Central flight structure and thermal control system for ${artifact.name}. Engineered by ${artifact.agency ?? "NASA"} for extreme interplanetary environments.`,
    specs: [
      `Agency: ${artifact.agency ?? "NASA"}`,
      `Mission: ${artifact.mission}`,
      `Hardware Class: ${artifact.kind.toUpperCase()}`,
      `Site / Location: ${artifact.site ?? artifact.finalLocation ?? "Extraterrestrial Space"}`,
    ],
    position: [0, 0, 0],
  });

  const isApollo = artifact.id.startsWith("apollo-") || artifact.kind === "descent-stage";
  const isHelicopter = artifact.kind === "helicopter";

  if (isHelicopter) {
    components.push(
      {
        id: "rotor-system",
        name: "Counter-Rotating Coaxial Carbon Fiber Rotors",
        category: "propulsion",
        description: "Dual 1.2-meter counter-rotating carbon fiber blades spinning at 2,400 RPM to generate aerodynamic lift in Mars's ultra-thin 1% atmosphere.",
        specs: ["Rotor Speed: 2,400 to 2,700 RPM", "Span: 1.2 meters carbon-composite airfoil"],
        position: [0, 0.6, 0],
      },
      {
        id: "solar-panel",
        name: "Overhead Photovoltaic Array & Lithium Cells",
        category: "power",
        description: "Top-mounted solar array recharging six Sony lithium-ion batteries to power motor flight bursts and internal survival heaters overnight.",
        specs: ["Capacity: ~350W peak flight power", "Battery: 6 × Sony 18650 Li-ion cells"],
        position: [0, 0.9, 0],
      },
      {
        id: "landing-legs",
        name: "Four Carbon-Composite Landing Legs",
        category: "structure",
        description: "Flexible, ultra-lightweight carbon-composite legs with dampers designed to absorb touchdown energy on uneven sand and rock surfaces.",
        specs: ["Weight: <100 grams per leg", "Configuration: Quad cantilever flexure"],
        position: [0.35, -0.4, 0.35],
      },
      {
        id: "nav-camera",
        name: "Down-Looking Optical Navigation Sensor",
        category: "payload",
        description: "High-speed downward-looking black-and-white sensor tracking surface texture features at 30 Hz for autonomous drift compensation.",
        specs: ["Rate: 30 frames per second", "Algorithm: Visual odometry feature tracking"],
        position: [0, -0.2, 0],
      },
    );
  } else if (isApollo) {
    components.push(
      {
        id: "dps-engine",
        name: "Descent Propulsion System (DPS)",
        category: "propulsion",
        description: "World's first throttleable rocket engine in deep space (9,870 lbf thrust), capable of continuous throttling between 10% and 60% for precision lunar touchdown.",
        specs: ["Thrust: 4,500 to 43,900 N throttleable", "Propellant: Aerozine 50 & Nitrogen Tetroxide (N2O4)"],
        position: [0, -0.65, 0],
      },
      {
        id: "landing-gear",
        name: "Four Cantilevered Honeycomb Landing Gear",
        category: "structure",
        description: "Crushable aluminum honeycomb shock absorber struts with 37-inch diameter footpads and 5-foot surface contact sensing probes.",
        specs: ["Diameter: 9.4 meters span with gear deployed", "Mechanism: Crushable aluminum honeycomb core"],
        position: [1.2, -0.8, 0],
      },
      {
        id: "mesa-bay",
        name: "Modular Equipment Stowage Assembly (MESA)",
        category: "payload",
        description: "Fold-down exterior equipment bay housing the black-and-white lunar TV camera, geology sample tools, and ALSEP nuclear scientific experiments.",
        specs: ["Deployment: Lanyard-pulled by astronaut on ladder", "Contents: Lunar TV camera & core drill tools"],
        position: [0.7, 0.1, 0.7],
      },
      {
        id: "commemorative-plaque",
        name: "Stainless Steel Commemorative Plaque",
        category: "structure",
        description: "Engraved plaque mounted on the ladder strut of the descent stage: 'Here men from the planet Earth first set foot upon the Moon. We came in peace for all mankind.'",
        specs: ["Material: 304 Stainless steel", "Signatures: Neil Armstrong, Buzz Aldrin, Michael Collins, Richard Nixon"],
        position: [0, -0.3, 0.9],
      },
    );
  } else if (artifact.kind === "rover") {
    components.push(
      {
        id: "rover-mobility",
        name: "Rocker-Bogie 6-Wheel Mobility Chassis",
        category: "propulsion",
        description: "Six cleated aluminum wheels with independent drive actuators and differential rocker-bogie articulation allowing the rover to climb over 25cm obstacles without tipping.",
        specs: ["Drive: 6 brushless DC motors", "Suspension: Passive rocker-bogie differential linkage"],
        position: [0, -0.4, 0],
      },
      {
        id: "rover-mast",
        name: "Pancam & Mastcam Remote Sensing Mast",
        category: "payload",
        description: "Elevated camera mast offering stereo human-eye perspective, multispectral filters, and laser-induced breakdown spectroscopy for distance mineralogy.",
        specs: ["Elevation: 1.5 to 2.1 meters above ground", "Sensors: Stereo color imaging & laser spectrometer"],
        position: [0.35, 1.1, 0.4],
      },
      {
        id: "robotic-arm",
        name: "Instrument Deployment Device (IDD) Arm",
        category: "payload",
        description: "5-degree-of-freedom robotic arm bearing a rock abrasion grinding tool (RAT), microscopic imager, and alpha particle X-ray spectrometer.",
        specs: ["Reach: 1.0 to 2.1 meters", "Payload: Rock Abrasion Tool, APXS, Microscopic Imager"],
        position: [0, 0.2, 0.85],
      },
      {
        id: "power-system",
        name: "High-Efficiency Solar Arrays / MMRTG",
        category: "power",
        description: "Triple-junction gallium-arsenide solar panels or decaying plutonium-238 radioisotope thermoelectric generator supplying uninterrupted electrical power.",
        specs: ["Output: 110W to 900W electrical", "Subsystem: Lithium-ion storage battery bank"],
        position: [0, 0.4, -0.4],
      },
    );
  } else if (artifact.kind === "lander" || artifact.kind === "atmospheric-probe") {
    components.push(
      {
        id: "lander-legs",
        name: "Shock-Absorbing Landing Gear & Footpads",
        category: "structure",
        description: "Cantilevered tripod or quad gear equipped with deformable aluminum cartridges to cushion touchdown impact on alien regolith.",
        specs: ["Configuration: Multi-leg shock absorbing", "Footpads: Wide saucer pads with regolith contact switches"],
        position: [0, -0.6, 0],
      },
      {
        id: "terminal-engines",
        name: "Pulsed Hydrazine Descent Thrusters",
        category: "propulsion",
        description: "Throttleable or pulse-modulated catalytic thrusters designed to eliminate horizontal and vertical velocity during terminal descent.",
        specs: ["Propellant: Hydrazine monopropellant", "Guidance: Closed-loop radar altimeter / Doppler velocimeter"],
        position: [0, -0.8, 0],
      },
      {
        id: "science-arm",
        name: "Surface Sampling Robotic Arm & Trenching Scoop",
        category: "payload",
        description: "Motorized articulated arm equipped with a soil trenching scoop, thermal conductivity needle, and sample delivery rasp for chemical ovens.",
        specs: ["Functions: Regolith digging, sample scraping, camera positioning"],
        position: [0.4, 0.2, 0.6],
      },
      {
        id: "hga-antenna",
        name: "Steerable High-Gain Telecommunications Antenna",
        category: "communication",
        description: "Parabolic or phased-array antenna tracking Earth across light-travel intervals to transmit scientific telemetry directly to the Deep Space Network.",
        specs: ["Frequencies: X-band / S-band", "Network: NASA DSN / Ground Tracking Stations"],
        position: [0, 0.75, 0],
      },
    );
  } else {
    // Orbiters & Deep Space Probes
    components.push(
      {
        id: "hga-dish",
        name: "High-Gain Parabolic Communications Dish",
        category: "communication",
        description: "High-precision parabolic reflector dish maintaining millimeter-accurate point lock on Earth across billions of kilometres.",
        specs: ["Diameter: 2.2m to 3.7m parabolic dish", "Frequencies: X-band / Ka-band high-rate telemetry"],
        position: [0, 0.85, 0],
      },
      {
        id: "main-engine",
        name: "Liquid Orbit Insertion Rocket Engine",
        category: "propulsion",
        description: "High-thrust bipropellant propulsion system executing trajectory correction maneuvers and orbit capture burns.",
        specs: ["Thrust: 400N to 3,000N liquid engine", "Function: Planetary capture & Delta-V maneuvers"],
        position: [0, -0.8, 0],
      },
      {
        id: "solar-arrays",
        name: "Articulated Photovoltaic Solar Wings / RTG",
        category: "power",
        description: "Sun-tracking photovoltaic arrays or radioisotope thermoelectric nuclear generators delivering continuous power in deep space.",
        specs: ["Power Source: Solar Photovoltaics / Plutonium-238 RTG", "Efficiency: Radiation hardened"],
        position: [-1.4, 0, 0],
      },
      {
        id: "science-payload",
        name: "Remote Sensing Science Payload Suite",
        category: "payload",
        description: "Integrated multispectral cameras, synthetic aperture radar, imaging spectrometers, and magnetometers mapping the celestial body.",
        specs: ["Instruments: Multi-spectral imaging, radar sounder, magnetometer"],
        position: [0.6, 0.2, 0.6],
      },
    );
  }

  // Include any specific instruments documented in the dossier
  if (dossier?.instruments && dossier.instruments.length > 0) {
    dossier.instruments.slice(0, 3).forEach((inst, i) => {
      components.push({
        id: `dossier-inst-${i}`,
        name: inst.name,
        category: "payload",
        description: inst.purpose,
        specs: [
          `Acronym: ${inst.acronym}`,
          `Lead Institution: ${inst.leadInstitution}`,
          `Key Discovery: ${inst.keyDiscovery}`,
        ],
        position: [i % 2 === 0 ? 0.55 : -0.55, 0.2 + i * 0.15, 0.7],
      });
    });
  }

  return components;
}

/* ────────────────────────────────────────────────────────────────
   2. DEEP MISSION LIFECYCLE BUILDER (7–9 CHAPTERS FOR EVERY ARTIFACT)
   ──────────────────────────────────────────────────────────────── */

function buildDeepMissionChapters(
  artifact: Artifact,
  dossier: ReturnType<typeof getMissionDossier>,
  story: MissionStoryMeta | undefined,
  components: SpacecraftComponentInfo[],
): MissionChapter[] {
  // If story already has 7 or more handcrafted stages, map them directly with high fidelity!
  if (story?.stages && story.stages.length >= 7) {
    return mapStoryStagesToChapters(artifact, story.stages, components);
  }

  const isApollo = artifact.id.startsWith("apollo-") || artifact.kind === "descent-stage";
  const isHelicopter = artifact.kind === "helicopter";
  const isRover = artifact.kind === "rover";
  const isLander = artifact.kind === "lander" || artifact.kind === "atmospheric-probe";
  const isOrbiter = artifact.kind === "orbiter";

  if (isHelicopter) {
    return generateHelicopterLifecycle(artifact, dossier, components);
  } else if (isApollo) {
    return generateApolloLifecycle(artifact, dossier, components);
  } else if (isRover) {
    return generateRoverLifecycle(artifact, dossier, components);
  } else if (isLander) {
    return generateLanderLifecycle(artifact, dossier, components);
  } else if (isOrbiter) {
    return generateOrbiterLifecycle(artifact, dossier, components);
  } else {
    return generateDeepSpaceLifecycle(artifact, dossier, components);
  }
}

/* ────────────────────────────────────────────────────────────────
   3. ARTIFACT-SPECIFIC LIFECYCLE GENERATORS
   ──────────────────────────────────────────────────────────────── */

/**
 * Planetary Helicopter (Ingenuity) — 8 Full Chapters
 */
function generateHelicopterLifecycle(
  artifact: Artifact,
  dossier: ReturnType<typeof getMissionDossier>,
  components: SpacecraftComponentInfo[],
): MissionChapter[] {
  return [
    {
      id: "ch-1-cleanroom",
      chapterNumber: 1,
      title: "Born at JPL: Defying the Impossible",
      subtitle: "25-Foot Space Simulator Testing · Mars-Density Atmosphere",
      historicalDate: "2018 – 2020 (JPL High Bay)",
      firstPersonVoice: [
        `Many said a heavier-than-air aircraft could never fly on Mars, where the atmospheric density is less than 1% of Earth's.`,
        `Inside NASA JPL's 25-foot space simulator vacuum chamber, engineers evacuated the air, pumped in carbon dioxide, and spun my carbon-fiber blades at 2,400 RPM.`,
        `Weighed down to Martian gravity with an overhead tension tether, my rotors bit into the whisper-thin gas and lifted off. Powered flight on Mars was possible!`,
        `They folded my four carbon legs, bolted me beneath the belly of the Perseverance rover, and prepped me for flight across space.`,
      ],
      scientificContext:
        "Mars atmospheric pressure is ~6 millibars (equivalent to 30,000 meters altitude on Earth). Generating sufficient lift required counter-rotating 1.2m carbon fiber airfoils spinning at 2,400–2,700 RPM.",
      cameraMode: "free",
      cameraPosition: [3.2, 1.4, 3.2],
      cameraTarget: [0, 0, 0],
      environmentType: "cleanroom",
      telemetry: makeTelemetry("T- 00:00:00", 0.0, 0, 225000000, 0, "0.000s", 0, 350, -60),
      highlightedComponentId: "rotor-system",
      eventPills: ["JPL Space Simulator", "2,400 RPM Blades", "1.8 kg Airframe", "Belly Stacking"],
      astroPrompts: [
        "Why is it so difficult to fly a helicopter in Mars's thin atmosphere?",
        "What material are Ingenuity's rotor blades made of?",
        "How fast do Ingenuity's rotors spin compared to Earth helicopters?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-2-launch",
      chapterNumber: 2,
      title: "Riding the Rocket",
      subtitle: "Atlas V Liftoff from Cape Canaveral · Stowed on Perseverance",
      historicalDate: "30 July 2020",
      firstPersonVoice: [
        `On 30 July 2020, an Atlas V 541 rocket roared off Space Launch Complex 41 at Cape Canaveral, carrying Perseverance and me on its nose.`,
        `Tucked beneath the rover's titanium belly pan, I endured the high acoustic vibrations of solid rocket booster staging.`,
        `Centaur second-stage engines fired to break Earth's orbit and inject our composite spacecraft into interplanetary transfer.`,
        `Folded into a tight 1.8-kilogram package, I slept peacefully in the warm electronics envelope.`,
      ],
      scientificContext:
        "Ingenuity traveled to Mars stowed horizontally beneath Perseverance's chassis, protected by a carbon-composite debris shield during launch and landing.",
      cameraMode: "free",
      cameraPosition: [0, 2.2, 4.2],
      cameraTarget: [0, 0.6, -1.0],
      environmentType: "launch",
      telemetry: makeTelemetry("T+ 00:04:30", 10.2, 350, 224000000, 350, "0.001s", 0, 350, -68),
      highlightedComponentId: "central-bus",
      eventPills: ["Atlas V 541", "Cape Canaveral", "Belly Stowage", "Trans-Mars Injection"],
      astroPrompts: [
        "Where was Ingenuity stored during the flight to Mars?",
        "How heavy is the Ingenuity helicopter?",
        "What protected Ingenuity during launch?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-3-cruise",
      chapterNumber: 3,
      title: "Interplanetary Piggyback",
      subtitle: "Cruising 470 Million Kilometres to Mars",
      historicalDate: "August 2020 – January 2021",
      firstPersonVoice: [
        `For seven months and 470 million kilometres, I piggybacked on Perseverance through the deep space void.`,
        `Every few weeks, engineers on Earth routed electrical pulses from the rover to top off my six lithium-ion batteries.`,
        `Internal heaters kept my flight processors and gyroscopes above freezing while outside temperatures dipped to -130°C.`,
        `Jezero Crater drew steadily nearer across the blackness of interplanetary space.`,
      ],
      scientificContext:
        "During cruise, Ingenuity drew electrical trickle charges from Perseverance's MMRTG power bus, conditioning its six Sony lithium-ion battery cells for cold survival.",
      cameraMode: "free",
      cameraPosition: [2.5, 1.8, 3.5],
      cameraTarget: [0, 0, 0],
      environmentType: "cruise",
      telemetry: makeTelemetry("MET 120d · Cruise", 29.4, 150000000, 30000000, 0, "08m 20s", 0, 30, -92),
      highlightedComponentId: "solar-panel",
      eventPills: ["470M km Cruise", "Battery Conditioning", "Heater Checkouts", "Jezero Target Lock"],
      astroPrompts: [
        "How were Ingenuity's batteries kept charged during the flight?",
        "How cold does Mars cruise space get?",
        "What computer processor runs the Ingenuity helicopter?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-4-landing",
      chapterNumber: 4,
      title: "The Sky Crane Arrival",
      subtitle: "Hypersonic Entry & Touchdown in Jezero Crater",
      historicalDate: "18 February 2021",
      firstPersonVoice: [
        `On 18 February 2021, Perseverance plunged through the Martian atmosphere in the legendary Seven Minutes of Terror.`,
        `I felt the 2,000°C shockwave outside, the violent snap of the supersonic parachute, and the roar of the sky crane rocket engines.`,
        `When the rover's wheels touched the red sand of Jezero Crater, I was still clamped securely beneath its belly.`,
        `We had made it through the fire intact! Ahead lay my true test: surviving on my own.`,
      ],
      scientificContext:
        "Ingenuity survived the 10G entry deceleration and the sky crane touchdown maneuver, protected by the underbelly debris shield in Jezero Crater.",
      cameraMode: "free",
      cameraPosition: [1.8, 1.2, 3.0],
      cameraTarget: [0, 0, 0],
      environmentType: "descent",
      telemetry: makeTelemetry("MET 203d · Touchdown", 0.75, 225000000, 0.02, 0.02, "12m 30s", 0, 40, -105),
      highlightedComponentId: "landing-legs",
      eventPills: ["Sky Crane Landing", "Jezero Crater", "Belly Survival", "Debris Shield Release"],
      astroPrompts: [
        "How did Ingenuity survive the high G-forces of landing?",
        "Where is Jezero Crater on Mars?",
        "What was the purpose of the debris shield?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-5-drop",
      chapterNumber: 5,
      title: "The Belly Drop & Sol 1 Survival",
      subtitle: "Deployment to Martian Soil & Surviving the -90°C Night",
      historicalDate: "3–4 April 2021",
      firstPersonVoice: [
        `In early April 2021, Perseverance drove onto a flat airfield, rotated my airframe vertically, and snapped my four carbon legs into landing position.`,
        `With a pyrotechnic release, I dropped the final 13 centimetres onto the surface of Mars. The rover drove away, leaving me standing alone.`,
        `That night, temperatures plunged to -90°C. For the first time, I had only my own small solar-charged batteries and internal heaters to keep my circuits from freezing solid.`,
        `When the Sun rose over Jezero Crater, my solar panel charged, my flight computer booted, and I phoned home: I had survived the Martian night!`,
      ],
      scientificContext:
        "Surviving the first Martian night alone was considered the single highest-risk hurdle of the technology demonstration, as night temperatures drop to -90°C (-130°F), threatening battery freeze.",
      cameraMode: "free",
      cameraPosition: [0, 0.8, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "landing",
      telemetry: makeTelemetry("Sol 44 · Free Standing", 0.0, 225000000, 0, 0, "12m 32s", 0, 320, -78),
      highlightedComponentId: "solar-panel",
      eventPills: ["13cm Belly Drop", "Rover Drives Away", "-90°C Night Survival", "Solar Recharge"],
      astroPrompts: [
        "How did Ingenuity deploy from beneath Perseverance?",
        "Why was the first night on Mars considered so dangerous for Ingenuity?",
        "How much battery power did Ingenuity use just to keep warm?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-6-first-flight",
      chapterNumber: 6,
      title: "The Wright Brothers Moment",
      subtitle: "First Powered Controlled Flight on Another Planet",
      historicalDate: "19 April 2021",
      firstPersonVoice: [
        `On 19 April 2021, at 07:34 UTC, my flight computer autonomously spun my dual carbon-fiber rotors to 2,500 RPM.`,
        `Blades bit into the razor-thin Martian air. Sensors registered lift: 1 meter, 2 meters, 3 meters above the red regolith!`,
        `I hovered rock-steady in the gusty wind, swiveled 96 degrees, and snapped a historic shadow selfie of my landing legs below.`,
        `After 39.1 seconds of flight, I touched down softly. Humanity had achieved powered, controlled flight on another world!`,
      ],
      scientificContext:
        "Flight 1 demonstrated closed-loop autonomous navigation at 500 Hz using down-looking visual odometry and an off-the-shelf Qualcomm Snapdragon processor, confirming aerodynamic models of Martian flight.",
      cameraMode: "free",
      cameraPosition: [0, 0.8, 2.0],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("Flight 1 · 3.0m Altitude", 0.001, 225000000, 0, 3, "12m 34s", 0, 350, -75),
      highlightedComponentId: "rotor-system",
      eventPills: ["First Powered Flight", "3-Meter Hover", "39.1 Seconds", "Wright Brothers Moment"],
      astroPrompts: [
        "What piece of history from the Wright Brothers flyer is on Ingenuity?",
        "How did Ingenuity steer itself without human joystick control?",
        "What was the flight duration of Ingenuity's first flight?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-7-scout",
      chapterNumber: 7,
      title: "The Aerial Scout",
      subtitle: "72 Flights Across Jezero Crater · 17 Kilometres Traversed",
      historicalDate: "2021 – 2024 (Operational Flights)",
      firstPersonVoice: [
        `Engineers designed me for five short demonstration hops. I gave humanity seventy-two extraordinary missions!`,
        `I transformed into Perseverance's forward aerial scout, flying across treacherous sand ripples, boulder fields, and ancient river delta cliffs that no wheeled rover could cross.`,
        `I flew at speeds up to 36 kilometres per hour, climbed to 24 metres altitude, and covered over 17 kilometres of extraterrestrial terrain.`,
        `My downward color camera captured breathtaking aerial surveys that guided Perseverance along the safest, scientifically richest pathways.`,
      ],
      scientificContext:
        "Ingenuity transitioned from a tech demo into an operational aerial scout, completing 72 flights, logging 128.8 minutes of airtime, traversing 17.0 km (10.6 mi), and reaching a peak altitude of 24 meters.",
      cameraMode: "free",
      cameraPosition: [1.8, 1.2, 1.8],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("Flight 68 · 24m Alt", 0.01, 225000000, 0, 24, "12m 40s", 0, 350, -80),
      highlightedComponentId: "nav-camera",
      eventPills: ["72 Total Flights", "17 km Distance", "24m Peak Altitude", "Aerial Rover Scout"],
      astroPrompts: [
        "How did Ingenuity help the Perseverance rover navigate?",
        "What was the fastest speed Ingenuity ever flew?",
        "How did engineers update Ingenuity's flight software from 200 million km away?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-8-valinor",
      chapterNumber: 8,
      title: "Valinor Hills: The Eternal Aviator",
      subtitle: "Flight 72 Touchdown · Preserved Monument at Jezero Crater",
      historicalDate: "18 January 2024 – Eternity",
      firstPersonVoice: [
        `On 18 January 2024, during my 72nd flight, navigation feature tracking was lost over featureless sandy dunes during emergency descent.`,
        `I landed upright, but high-speed shadow photography revealed a rotor blade tip had sheared off upon impact. My flying days were over.`,
        `My avionics, solar panels, and communications remain intact. From my final resting site at 'Valinor Hills', I continue serving as a stationary weather station.`,
        `I proved that the skies of other worlds are open to humanity. Abandoned on the sands of Mars, I will forever stand as the Wright Brothers of the stars.`,
      ],
      scientificContext:
        "On Flight 72, rotor tip damage occurred during an off-nominal landing on featureless sand terrain. NASA confirmed Ingenuity remains stable and transmits daily avionics and weather data to Perseverance.",
      cameraMode: "free",
      cameraPosition: [2.2, 1.2, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("Valinor Hills · Grounded", 0.0, 225000000, 0, 0, "12m 42s", 0, 0, -140),
      highlightedComponentId: "central-bus",
      eventPills: ["Flight 72", "Rotor Blade Damage", "Valinor Hills", "Eternal Aviator Monument"],
      astroPrompts: [
        "What caused Ingenuity to end its flight mission on Flight 72?",
        "Can Ingenuity still communicate with Perseverance today?",
        "What future Mars helicopters are being designed based on Ingenuity's success?",
      ],
      sources: makeSources(artifact),
    },
  ];
}

/**
 * Apollo Lunar Module Descent Stages (Apollo 11, 12, 14, 15, 16, 17) — 8 Full Chapters
 */
function generateApolloLifecycle(
  artifact: Artifact,
  dossier: ReturnType<typeof getMissionDossier>,
  components: SpacecraftComponentInfo[],
): MissionChapter[] {
  const landingYear = artifact.launchDate ? new Date(artifact.launchDate).getFullYear() : 1969;
  const launchDateStr = artifact.launchDate ?? "July 1969";
  const arrivalDateStr = artifact.arrivalDate ?? "July 1969";
  const siteStr = artifact.site ?? "Tranquility Base";

  return [
    {
      id: "ch-1-cleanroom",
      chapterNumber: 1,
      title: "Born at Kennedy Space Center",
      subtitle: "Grumman Aerospace · Cleanroom Assembly & Gold MLI Foil",
      historicalDate: `${landingYear} (Pre-Flight Integration)`,
      firstPersonVoice: [
        `I was built by Grumman Aerospace and meticulously assembled in the Manned Spacecraft Operations Building at Kennedy Space Center.`,
        `My lower stage was wrapped in paper-thin layers of aluminized Mylar and radiant gold Kapton foil to insulate against the brutal 260°C temperature swings on the lunar surface.`,
        `Beneath my equipment deck rested the revolutionary Descent Propulsion System (DPS) — the first throttleable rocket engine engineered for human spaceflight.`,
        `I was designed for a singular, historic destiny: to carry humans to the lunar surface and stand forever as an eternal monument.`,
      ],
      scientificContext:
        "The Lunar Module descent stage served as the unpressurized landing platform, carrying the throttleable rocket engine, four propellant tanks, water and oxygen consumables, and scientific gear.",
      cameraMode: "free",
      cameraPosition: [3.2, 1.4, 3.2],
      cameraTarget: [0, 0, 0],
      environmentType: "cleanroom",
      telemetry: makeTelemetry("T- 00:00:00", 0.0, 0, 384400, 0, "0.000s", 8200, 1400, -65),
      highlightedComponentId: "central-bus",
      eventPills: ["Grumman Aerospace", "Kapton MLI Insulation", "DPS Throttle Engine", "Cleanroom Stacking"],
      astroPrompts: [
        "Why was gold Kapton foil used to wrap the Apollo descent stage?",
        "How did the throttleable descent engine work?",
        "Where was the Lunar Module assembled before launch?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-2-launch",
      chapterNumber: 2,
      title: "Thunder at Pad 39A",
      subtitle: "Saturn V Launch · 7.5 Million Pounds of Thrust",
      historicalDate: launchDateStr,
      firstPersonVoice: [
        `Five mammoth F-1 engines ignited beneath the Saturn V rocket at Launch Complex 39A, delivering 7.5 million pounds of raw thrust.`,
        `The Florida coastline trembled as 3,000 tons of machinery, kerosene, and liquid oxygen lifted into the morning sky.`,
        `I was stowed inside the protective Spacecraft-LM Adapter (SLA) ring below the Command and Service Module.`,
        `High above the Atlantic, the first two stages completed their burns and fell away into the sea. We surged into Earth parking orbit at 28,000 kilometres per hour.`,
      ],
      scientificContext:
        "The Saturn V launch vehicle delivered 34.5 MN of thrust at liftoff. The Lunar Module remained encapsulated inside the SLA adapter until translunar extraction.",
      cameraMode: "free",
      cameraPosition: [0, 2.2, 4.2],
      cameraTarget: [0, 0.6, -1.0],
      environmentType: "launch",
      telemetry: makeTelemetry("T+ 00:02:42", 2.4, 67, 384300, 67, "0.001s", 8200, 1400, -70),
      highlightedComponentId: "dps-engine",
      eventPills: ["Saturn V Ignition", "7.5M lbf Thrust", "Pad 39A Liftoff", "SLA Enclosure"],
      astroPrompts: [
        "How much fuel did the Saturn V burn in its first stage?",
        "Why was the Lunar Module positioned beneath the Service Module?",
        "What was the acceleration experienced during liftoff?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-3-tli",
      chapterNumber: 3,
      title: "Shooting for the Moon",
      subtitle: "Translunar Injection (TLI) & LM Extraction",
      historicalDate: `${launchDateStr} (+3 Hours)`,
      firstPersonVoice: [
        `Over the Pacific Ocean, the S-IVB third stage re-ignited for Translunar Injection, hurling us out of Earth orbit at 39,000 km/h.`,
        `The Command Module separated, pirouetted 180 degrees in the blackness of space, and docked with my nose tunnel with a sharp metallic clack.`,
        `The adapter petals blossomed open. Tightly latched to the Command Module, I was extracted from the spent rocket stage and sailed into the translunar void.`,
        `Looking back through the windows, Earth shrank from a breathtaking blue marble into a tiny jewel suspended in absolute blackness.`,
      ],
      scientificContext:
        "Translunar Injection (TLI) added ~3,050 m/s of velocity, placing Apollo on a free-return trajectory toward the Moon across 384,000 kilometres.",
      cameraMode: "free",
      cameraPosition: [2.5, 1.2, 3.0],
      cameraTarget: [0, 0, 0],
      environmentType: "earth_orbit",
      telemetry: makeTelemetry("T+ 03:20:00", 10.8, 18500, 365900, 18500, "0.062s", 8200, 1350, -78),
      highlightedComponentId: "central-bus",
      eventPills: ["TLI Burn", "Transposition & Docking", "39,000 km/h Escape", "Free-Return Track"],
      astroPrompts: [
        "What is the transposition and docking maneuver?",
        "How long did it take to travel from Earth to the Moon?",
        "What does a free-return trajectory mean?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-4-loi",
      chapterNumber: 4,
      title: "Behind the Dark Side",
      subtitle: "Lunar Orbit Insertion & Undocking",
      historicalDate: `${arrivalDateStr} (-1 Day)`,
      firstPersonVoice: [
        `Seventy-six hours after launch, we swept behind the dark limb of the Moon into total radio shadow.`,
        `The Service Propulsion System fired behind the Moon, shedding orbital energy and locking us into a 110-kilometre circular lunar orbit.`,
        `The astronauts crawled through the docking tunnel to power up my flight computers and check out my thrusters.`,
        `With a gentle push of the capture latches, I separated from the mother ship. Flying independently, I unfurled my four landing legs toward the cratered surface below.`,
      ],
      scientificContext:
        "Lunar Orbit Insertion (LOI) burns occurred behind the lunar farside out of radio contact. The Lunar Module undocked in a 60-nautical-mile circular orbit.",
      cameraMode: "free",
      cameraPosition: [2.2, 1.5, 2.8],
      cameraTarget: [0, 0, 0],
      environmentType: "science_orbit",
      telemetry: makeTelemetry("T+ 75:49:00", 1.63, 384400, 110, 110, "1.280s", 8150, 1300, -88),
      highlightedComponentId: "landing-gear",
      eventPills: ["Lunar Orbit Insertion", "Farside Occultation", "LM Undocking", "Landing Gear Deployed"],
      astroPrompts: [
        "Why did the lunar orbit insertion burn happen behind the Moon?",
        "How did astronauts transfer between the Command Module and Lunar Module?",
        "What speed does an Apollo spacecraft orbit the Moon?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-5-pdi",
      chapterNumber: 5,
      title: "Powered Descent Initiation",
      subtitle: "DPS Braking Burn · Pitch-Over & Hazard Avoidance",
      historicalDate: `${arrivalDateStr} (Terminal Descent)`,
      firstPersonVoice: [
        `At 15 kilometres above the lunar highlands, my throttleable DPS rocket ignited with a silent roar in the vacuum.`,
        `Firing retrograde against our orbital track, the engine bled off 1,700 metres per second of horizontal speed in twelve harrowing minutes.`,
        `At 2,000 metres altitude, I pitched forward. For the first time, the landing site appeared through the triangular pilot windows.`,
        `The landing radar locked onto the approaching craters. Hand-flying through boulders and dust clouds, the pilot steered toward safe, level ground.`,
      ],
      scientificContext:
        "Powered Descent Initiation (PDI) consisted of three distinct guidance phases: Braking Phase, Approach Phase (pitch-over for visual recognition), and Vertical Landing Phase.",
      cameraMode: "free",
      cameraPosition: [2.0, 1.2, 2.8],
      cameraTarget: [0, 0, 0],
      environmentType: "descent",
      telemetry: makeTelemetry("T+ 102:40:00", 0.45, 384400, 2.4, 2.4, "1.282s", 1200, 1250, -92),
      highlightedComponentId: "dps-engine",
      eventPills: ["PDI Ignition", "Landing Radar Lock", "Pitch-Over Maneuver", "Boulder Avoidance"],
      astroPrompts: [
        "How did the Apollo landing radar measure altitude and speed?",
        "What computer alarms occurred during Apollo 11's powered descent?",
        "How much fuel was left in the tanks at touchdown?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-6-touchdown",
      chapterNumber: 6,
      title: "Contact Light",
      subtitle: "Touchdown on the Moon · Engine Shutdown",
      historicalDate: arrivalDateStr,
      firstPersonVoice: [
        `At two metres above the surface, blue probes extending beneath my footpads brushed the grey lunar regolith.`,
        `Inside the cockpit, an amber indicator light glowed bright: 'CONTACT LIGHT'.`,
        `The crew immediately killed the engine. With a gentle crunch, my honeycomb aluminum shock absorbers compressed, resting firmly on the virgin soil of ${siteStr}.`,
        `The dust settled in the vacuum. Across 384,000 kilometres of space, the crew transmitted the triumphant words: humanity had landed on the Moon!`,
      ],
      scientificContext:
        "The lunar surface contact probes triggered the 'Contact Light' indicator, instructing astronauts to cut the descent engine before the nozzle hit the surface to avoid backpressure explosion.",
      cameraMode: "free",
      cameraPosition: [0, 0.8, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "landing",
      telemetry: makeTelemetry("T+ 102:45:40", 0.0, 384400, 0, 0, "1.282s", 180, 1200, -82),
      highlightedComponentId: "landing-gear",
      eventPills: ["Contact Light", "Engine Cutoff", "Touchdown on Regolith", siteStr],
      astroPrompts: [
        "What were the very first words spoken from the lunar surface?",
        "Why did the astronauts have to shut down the engine before touching the ground?",
        "What was the exact landing site of this Apollo mission?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-7-eva",
      chapterNumber: 7,
      title: "Footsteps in the Ancient Dust",
      subtitle: "EVA Moonwalks · ALSEP Science Station Deployment",
      historicalDate: `${arrivalDateStr} (+EVA Phase)`,
      firstPersonVoice: [
        `My lower stage became humanity's primary scientific base on the Moon. From my MESA equipment bay, the astronauts deployed cameras, drills, and the ALSEP nuclear scientific station.`,
        `For days, astronauts in white pressure suits explored the surrounding plains and crater rims, collecting pristine basalt rocks, drilling core samples, and measuring the lunar magnetic field.`,
        `Reflected in the astronauts' golden visors, my gold-clad legs and white ascent stage stood proudly against the black velvet cosmic sky.`,
        `Every instrument transmitted irreplaceable science data directly back to laboratories on Earth.`,
      ],
      scientificContext:
        "The Apollo Lunar Surface Experiments Package (ALSEP) was powered by a SNAP-27 radioisotope thermoelectric generator (RTG), measuring moonquakes, solar wind, and lunar atmospheric particles.",
      cameraMode: "free",
      cameraPosition: [0, 0.8, 2.0],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("T+ 108:15:00", 0.0, 384400, 0, 0, "1.282s", 150, 900, -80),
      highlightedComponentId: "mesa-bay",
      eventPills: ["EVA Moonwalk", "ALSEP Deployment", "Basalt Core Drilling", "Lunar Exploration"],
      astroPrompts: [
        "What scientific experiments were deployed in the ALSEP package?",
        "How did astronauts communicate with Houston while walking on the Moon?",
        "How much lunar rock was returned during this mission?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-8-monument",
      chapterNumber: 8,
      title: "Abandoned but Not Forgotten",
      subtitle: "Ascent Stage Blast-Off · The Preserved Descent Stage",
      historicalDate: artifact.lastSignal ?? "Permanent Monument",
      firstPersonVoice: [
        `When the mission was complete, pyrotechnic guillotines severed the cables connecting my descent stage to the ascent module.`,
        `The ascent engine blasted fire directly onto my upper deck, using me as a launch pad to send the astronauts back to orbit and home to Earth.`,
        `I stayed behind. Here at ${siteStr}, on my ladder leg, hangs the commemorative stainless-steel plaque: 'We came in peace for all mankind.'`,
        `Untouched by rain, wind, or atmosphere, I stand in the silent lunar vacuum for billions of years — humanity's permanent monument among the stars.`,
      ],
      scientificContext:
        "The Apollo descent stages remain in pristine condition at their landing sites on the Moon, preserved in the ultra-high vacuum as human historical and archaeological landmarks.",
      cameraMode: "free",
      cameraPosition: [2.2, 1.2, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("MET PERMANENT", 0.0, 384400, 0, 0, "1.282s", 0, 0, -150),
      highlightedComponentId: "commemorative-plaque",
      eventPills: ["Ascent Stage Blast-Off", "Descent Stage Left Behind", "Plaque Preserved", "Lunar Monument"],
      astroPrompts: [
        "Is the Apollo descent stage still on the Moon today?",
        "Can modern telescopes see the Apollo landing sites?",
        "What keeps artifacts from degrading in the lunar vacuum?",
      ],
      sources: makeSources(artifact),
    },
  ];
}

/**
 * Planetary Rovers (Curiosity, Perseverance, Sojourner, Pragyan, etc.) — 9 Full Chapters
 */
function generateRoverLifecycle(
  artifact: Artifact,
  dossier: ReturnType<typeof getMissionDossier>,
  components: SpacecraftComponentInfo[],
): MissionChapter[] {
  const landingYear = artifact.launchDate ? new Date(artifact.launchDate).getFullYear() : 2004;
  const targetBody = artifact.bodyId ?? "mars";
  const siteStr = artifact.site ?? "Martian Surface";

  return [
    {
      id: "ch-1-cleanroom",
      chapterNumber: 1,
      title: "Assembled in the High Bay",
      subtitle: `${artifact.agency ?? "NASA"} Cleanroom Integration · Rocker-Bogie Assembly`,
      historicalDate: `${landingYear - 1} – ${landingYear}`,
      firstPersonVoice: [
        `I was conceived and built inside the ultra-clean Spacecraft Assembly Facility by engineers in white bunny suits.`,
        `They equipped me with a differential rocker-bogie mobility chassis, six independently driven aluminum wheels, and redundant central flight computers.`,
        `My sensors were calibrated to withstand cosmic radiation, bitter planetary winters, and abrasive airborne dust.`,
        `I was packed with high-resolution stereo cameras, laser spectrometers, and scientific drills to unlock the secrets of ${targetBody}.`,
      ],
      scientificContext: `${artifact.name} was engineered by ${artifact.agency ?? "NASA"} with autonomous mobility and scientific instrumentation designed for years of extraterrestrial field geology.`,
      cameraMode: "free",
      cameraPosition: [3.2, 1.4, 3.2],
      cameraTarget: [0, 0, 0],
      environmentType: "cleanroom",
      telemetry: makeTelemetry("T- 00:00:00", 0.0, 0, 225000000, 0, "0.000s", 500, 950, -65),
      highlightedComponentId: "central-bus",
      eventPills: ["Cleanroom Integration", "Rocker-Bogie Chassis", "Avionics Testing", "Payload Stacking"],
      astroPrompts: [
        `How was ${artifact.name}'s mobility system designed to handle boulders?`,
        "Why do cleanroom engineers have to wear special bunny suits?",
        `What scientific questions was ${artifact.name} built to answer?`,
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-2-launch",
      chapterNumber: 2,
      title: "The Rocket Roar",
      subtitle: "Liftoff from Earth · Trans-Planetary Injection",
      historicalDate: artifact.launchDate ?? "Launch Day",
      firstPersonVoice: [
        `On launch day, the rocket engines ignited in an overwhelming roar of flame and smoke, lifting me off the pad and through Earth's atmosphere.`,
        `Tucked inside my protective aeroshell heat shield, I felt the violent rumble of staging as the solid boosters and core stage dropped away.`,
        `The upper stage fired with precision, injecting me into a heliocentric transfer trajectory toward ${targetBody}.`,
        `Severing Earth's gravitational grip, I embarked on a multi-hundred-million-kilometre voyage across the solar system.`,
      ],
      scientificContext:
        "The launch vehicle delivered sufficient delta-V for Earth escape and trans-planetary insertion, deploying the cruise stage with attitude control thrusters.",
      cameraMode: "free",
      cameraPosition: [0, 2.2, 4.2],
      cameraTarget: [0, 0.6, -1.0],
      environmentType: "launch",
      telemetry: makeTelemetry("T+ 00:04:15", 9.8, 320, 224000000, 320, "0.001s", 480, 850, -72),
      highlightedComponentId: "rover-mobility",
      eventPills: ["Engine Ignition", "Atmospheric Ascent", "Fairing Jettison", "Trans-Planetary Burn"],
      astroPrompts: [
        "What rocket was used to launch this rover into space?",
        "How is a spacecraft steered during launch?",
        "What velocity is required to break free from Earth orbit?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-3-cruise",
      chapterNumber: 3,
      title: "Deep Space Transit",
      subtitle: "Interplanetary Cruise · Trajectory Correction Maneuvers",
      historicalDate: "Interplanetary Cruise Phase",
      firstPersonVoice: [
        `For months, I sailed alone through the silent vacuum of deep space.`,
        `My solar arrays soaked in sunlight, powering internal survival heaters and telemetry transmitters communicating with Earth's Deep Space Network.`,
        `Small hydrazine thrusters fired periodically in Trajectory Correction Maneuvers, fine-tuning my approach angle to within a fraction of a degree.`,
        `Ahead, the red disk of ${targetBody} grew from a distant pinpoint into an inviting, cratered world.`,
      ],
      scientificContext:
        "The interplanetary cruise phase requires precise navigation using star trackers, Doppler radio tracking, and periodic trajectory correction maneuvers (TCMs).",
      cameraMode: "free",
      cameraPosition: [2.5, 1.8, 3.5],
      cameraTarget: [0, 0, 0],
      environmentType: "cruise",
      telemetry: makeTelemetry("MET 180d 12:00:00", 31.2, 180000000, 15000000, 0, "10m 00s", 320, 650, -95),
      highlightedComponentId: "power-system",
      eventPills: ["Heliocentric Transfer", "Star Tracker Nav", "TCM Trajectory Burns", "DSN Contact"],
      astroPrompts: [
        "How does a spacecraft navigate in deep space without GPS?",
        "What are Trajectory Correction Maneuvers?",
        "How cold is space during the cruise phase?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-4-approach",
      chapterNumber: 4,
      title: "Planetary Approach",
      subtitle: "Terminal Navigation & Aeroshell Separation",
      historicalDate: `${artifact.arrivalDate ?? "Arrival"} (-24 Hours)`,
      firstPersonVoice: [
        `Twenty-four hours out, ${targetBody} filled my star sensors with dramatic mountain ranges and ancient dried riverbeds.`,
        `Navigators on Earth calculated the final entry interface vector. Once committed, there was no turning back.`,
        `Minutes before entry, the cruise stage that carried me across the solar system separated, burning up as planned.`,
        `Encapsulated inside my heat shield, I oriented for atmospheric entry at hypersonic velocity.`,
      ],
      scientificContext:
        "Terminal approach requires millimeter-precise targeting of the atmospheric entry corridor (typically ~12 degrees) to prevent skipping off the atmosphere or burning up.",
      cameraMode: "free",
      cameraPosition: [2.2, 1.4, 2.8],
      cameraTarget: [0, 0, 0],
      environmentType: "approach",
      telemetry: makeTelemetry("MET 210d 06:00:00", 21.4, 225000000, 95000, 95000, "12m 30s", 180, 550, -108),
      highlightedComponentId: "central-bus",
      eventPills: ["Terminal Approach", "Cruise Stage Separation", "Atmospheric Corridor", "Guidance Lock"],
      astroPrompts: [
        "What happens if a spacecraft enters the atmosphere at the wrong angle?",
        "How long does the signal take to travel to Earth from Mars?",
        "Why is the cruise stage separated before entry?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-5-edl",
      chapterNumber: 5,
      title: "Seven Minutes of Terror",
      subtitle: "Hypersonic Entry & Atmospheric Descent",
      historicalDate: `${artifact.arrivalDate ?? "Landing Day"} (Entry)`,
      firstPersonVoice: [
        `I slammed into the upper atmosphere at 21,000 kilometres per hour. Frictional heating turned the shockwave outside into a 2,000°C inferno.`,
        `My ablative heat shield glowed white-hot, shedding 99% of my orbital energy while my internal sensors ran on full autonomous control.`,
        `At Mach 2, my supersonic parachute exploded open, jolting my frame with 9G of deceleration.`,
        `The heat shield separated, exposing my landing radar to the rapidly approaching plains below.`,
      ],
      scientificContext:
        "Entry, Descent, and Landing (EDL) takes ~7 minutes, while radio signals take 12+ minutes to reach Earth, requiring 100% autonomous onboard execution.",
      cameraMode: "free",
      cameraPosition: [1.8, 1.2, 3.0],
      cameraTarget: [0, 0, 0],
      environmentType: "descent",
      telemetry: makeTelemetry("MET 210d 08:14:00", 1.8, 225000000, 12, 12, "12m 32s", 90, 480, -112),
      highlightedComponentId: "rover-mobility",
      eventPills: ["Hypersonic Entry", "2000°C Heat Shield", "Supersonic Parachute", "Autonomous EDL"],
      astroPrompts: [
        "Why is landing on Mars called the 'Seven Minutes of Terror'?",
        "How does an ablative heat shield protect the rover inside?",
        "What triggers the parachute to deploy at supersonic speeds?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-6-touchdown",
      chapterNumber: 6,
      title: "Touchdown on Alien Soil",
      subtitle: `Terminal Descent & Arrival at ${siteStr}`,
      historicalDate: artifact.arrivalDate ?? "Landing Day",
      firstPersonVoice: [
        `In the final seconds, retro-rockets fired to arrest my fall just above the surface.`,
        `Lowered gently onto the red soil, my six aluminum wheels touched down with a soft mechanical shudder at ${siteStr}.`,
        `Pyrotechnic cut-bolts severed the landing bridles, and the descent stage flew away to crash safely in the distance.`,
        `The dust settled. Around me stretched a vast, silent, untouched extraterrestrial frontier. I had arrived!`,
      ],
      scientificContext:
        "Terminal landing dynamics require precision Doppler radar altimetry and retro-propulsion to ensure touchdown speeds under 1 meter per second.",
      cameraMode: "free",
      cameraPosition: [0, 0.8, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "landing",
      telemetry: makeTelemetry("MET 210d 08:21:00", 0.0, 225000000, 0, 0, "12m 32s", 5, 450, -84),
      highlightedComponentId: "rover-mobility",
      eventPills: ["Terminal Touchdown", "Bridles Severed", siteStr, "First Contact Beacon"],
      astroPrompts: [
        `What makes the landing site at ${siteStr} scientifically interesting?`,
        "How do rovers communicate their first confirmation signal back to Earth?",
        "What happens immediately after a rover touches down?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-7-deployment",
      chapterNumber: 7,
      title: "First Wheel Tracks",
      subtitle: "Mast Deployment & Surface Mobility Verification",
      historicalDate: `${artifact.arrivalDate ?? "Landing"} (+Sol 1–10)`,
      firstPersonVoice: [
        `My computers executed post-landing initialization: pyrotechnic actuators unlatched my camera mast and unfurled my power arrays.`,
        `My stereo cameras swiveled 360 degrees, capturing my very first panoramic portrait of the Martian landscape and beaming it home to Earth.`,
        `Drive actuators engaged. My six wheels rotated forward, carving the first crisp tracks into the pristine dust.`,
        `I was no longer just a landed machine — I was an autonomous explorer roaming another planet.`,
      ],
      scientificContext:
        "Initial surface operations include pyrotechnic releases, high-gain antenna pointing, hazard avoidance camera verification, and short test drives to verify wheel odometry.",
      cameraMode: "free",
      cameraPosition: [0, 0.8, 2.0],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("Sol 5 · 14:30 LMST", 0.005, 225000000, 0, 0, "12m 35s", 0, 520, -78),
      highlightedComponentId: "rover-mast",
      eventPills: ["Mast Unlatched", "First 360° Panorama", "First Wheel Drive", "Odometry Lock"],
      astroPrompts: [
        "How do rover drivers on Earth steer a rover on Mars with a 12-minute time delay?",
        "What do the first images sent from a landed rover look like?",
        "How fast do Mars rovers actually drive?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-8-science",
      chapterNumber: 8,
      title: "Geological Discoveries",
      subtitle: "Rock Abrasion, Drilling & Ancient Environments",
      historicalDate: "Primary & Extended Science Missions",
      firstPersonVoice: [
        `Sol after sol, I traversed crater rims, sand dunes, and layered rock outcrops.`,
        `My robotic arm deployed spectrometers directly against rocks, grinding through weather rinds and drilling deep cores from the ancient bedrock.`,
        `Inside my scientific instruments, minerals told an astonishing story: ancient ${targetBody} was once warm, wet, and possessed all the chemical building blocks of habitability.`,
        `I weathered fierce dust storms and bitter polar winters, pushing my hardware years beyond its original design limits.`,
      ],
      scientificContext: `${artifact.name}'s geological discoveries revolutionized planetary science, confirming past aqueous environments and hydrothermal activity on ${targetBody}.`,
      cameraMode: "free",
      cameraPosition: [1.8, 1.2, 1.8],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("Sol 842 · Extended", 0.003, 226000000, 0, 0, "12m 45s", 0, 480, -82),
      highlightedComponentId: "robotic-arm",
      eventPills: ["Rock Core Drilling", "Spectroscopic Analysis", "Aqueous Minerals", "Habitability Confirmed"],
      astroPrompts: [
        `What were the greatest scientific discoveries made by ${artifact.name}?`,
        "How do rovers survive Martian dust storms?",
        "What proof did rovers find of ancient water on Mars?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-9-legacy",
      chapterNumber: 9,
      title: "The Eternal Explorer",
      subtitle: `Monument at ${siteStr} · Abandoned but Not Forgotten`,
      historicalDate: artifact.lastSignal ?? "Permanent Museum Entry",
      firstPersonVoice: [
        `After completing millions of commands and driving kilometres across the alien desert, my mission drew to its documented conclusion.`,
        `My final radio packets beamed homeward across the void, leaving behind a treasure trove of scientific discoveries that permanently reshaped human knowledge.`,
        `Today, I rest quietly at ${artifact.finalLocation ?? siteStr}.`,
        `My tracks may eventually be swept away by alien winds, but I remain — abandoned, but never forgotten — an enduring testament to human curiosity.`,
      ],
      scientificContext: `${artifact.name} remains at ${artifact.finalLocation ?? siteStr} as a protected archaeological site preserving humanity's early interplanetary exploration heritage.`,
      cameraMode: "free",
      cameraPosition: [2.2, 1.2, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("MET CONCLUSION", 0.0, 225000000, 0, 0, "12m 40s", 0, 0, -145),
      highlightedComponentId: "central-bus",
      eventPills: ["Mission Complete", "Final Telemetry", "Preserved on Mars", "Eternal Explorer"],
      astroPrompts: [
        `What caused ${artifact.name}'s mission to finally conclude?`,
        "Will humans ever visit this rover on Mars in the future?",
        "How is space hardware preserved from degradation on the Martian surface?",
      ],
      sources: makeSources(artifact),
    },
  ];
}

/**
 * Planetary Landers (Viking 1, Viking 2, Mars Pathfinder, Phoenix, InSight, Surveyor-3, Beagle-2, Schiaparelli) — 8 Full Chapters
 */
function generateLanderLifecycle(
  artifact: Artifact,
  dossier: ReturnType<typeof getMissionDossier>,
  components: SpacecraftComponentInfo[],
): MissionChapter[] {
  const landingYear = artifact.launchDate ? new Date(artifact.launchDate).getFullYear() : 1976;
  const targetBody = artifact.bodyId ?? "mars";
  const siteStr = artifact.site ?? "Planetary Landing Site";

  return [
    {
      id: "ch-1-cleanroom",
      chapterNumber: 1,
      title: "Sterilized for Another World",
      subtitle: `${artifact.agency ?? "NASA"} Cleanroom Assembly · Planetary Protection`,
      historicalDate: `${landingYear - 1} (Assembly & Testing)`,
      firstPersonVoice: [
        `I was assembled in a class-10,000 cleanroom and baked in thermal vacuum ovens to meet strict planetary protection standards.`,
        `My creators engineered me with fixed cantilevered landing legs, delicate seismometer sensors, atmospheric weather masts, and robotic sampling scoops.`,
        `Unlike rovers, I was designed as an unmoving scientific fortress, built to listen, dig, and probe the planet from a single consecrated spot.`,
        `Every instrument was sterilized to ensure no Earth microbes could contaminate our search for extraterrestrial life.`,
      ],
      scientificContext:
        "Planetary landers undergo rigorous planetary protection protocols (heat microbial reduction) and thermal-vacuum qualification to operate reliably on alien worlds.",
      cameraMode: "free",
      cameraPosition: [3.2, 1.4, 3.2],
      cameraTarget: [0, 0, 0],
      environmentType: "cleanroom",
      telemetry: makeTelemetry("T- 00:00:00", 0.0, 0, 225000000, 0, "0.000s", 600, 700, -65),
      highlightedComponentId: "central-bus",
      eventPills: ["Bio-Burden Sterilization", "Cleanroom Assembly", "Planetary Protection", "Science Deck Stacking"],
      astroPrompts: [
        "Why must planetary landers be baked in ovens before launch?",
        "What is planetary protection?",
        "How are scientific instruments protected from contamination?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-2-launch",
      chapterNumber: 2,
      title: "Earth Escape",
      subtitle: "Heavy-Lift Rocket Ignition · Orbital Staging",
      historicalDate: artifact.launchDate ?? "Launch Day",
      firstPersonVoice: [
        `The rocket beneath me ignited with tremendous acoustic fury, climbing through the clouds on a column of incandescent flame.`,
        `High above the atmosphere, the payload fairings fell away into the ocean, revealing the black void of space.`,
        `With a second-stage restart burn, I gained orbital escape velocity and parted ways with Earth.`,
        `My solar wings generated power as I stabilized my orientation toward ${targetBody}.`,
      ],
      scientificContext:
        "The launch sequence accelerates the spacecraft through atmospheric transonics before placing it into a hyperbolic interplanetary trajectory.",
      cameraMode: "free",
      cameraPosition: [0, 2.2, 4.2],
      cameraTarget: [0, 0.6, -1.0],
      environmentType: "launch",
      telemetry: makeTelemetry("T+ 00:03:30", 8.2, 210, 224000000, 210, "0.001s", 580, 680, -70),
      highlightedComponentId: "terminal-engines",
      eventPills: ["Heavy-Lift Liftoff", "Fairing Separation", "Trans-Planetary Injection", "Solar Lock"],
      astroPrompts: [
        "What launch vehicle carried this lander into space?",
        "How is the spacecraft steered during ascent?",
        "What speed is needed to reach the target planet?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-3-cruise",
      chapterNumber: 3,
      title: "The Interplanetary Voyage",
      subtitle: "Heliocentric Cruise & Trajectory Trimming",
      historicalDate: "Interplanetary Cruise Phase",
      firstPersonVoice: [
        `For months, I drifted across the silent interplanetary expanse between Earth and ${targetBody}.`,
        `My star cameras locked onto bright celestial beacons to calculate my orbital state vector.`,
        `Periodic bursts from my attitude thrusters nudged my trajectory into perfect alignment with our planned landing corridor.`,
        `Deep space communication antennas kept a steady heartbeat link with Earth's tracking stations.`,
      ],
      scientificContext:
        "During interplanetary cruise, ground stations use radiometric Doppler and range tracking to determine spacecraft position within meters across millions of kilometres.",
      cameraMode: "free",
      cameraPosition: [2.5, 1.8, 3.5],
      cameraTarget: [0, 0, 0],
      environmentType: "cruise",
      telemetry: makeTelemetry("MET 150d 08:00:00", 30.5, 160000000, 22000000, 0, "09m 40s", 450, 600, -90),
      highlightedComponentId: "hga-antenna",
      eventPills: ["Heliocentric Transfer", "Doppler Ranging", "Star Tracker Guidance", "Cruise Telemetry"],
      astroPrompts: [
        "How do engineers keep spacecraft from freezing during the cruise to Mars?",
        "How do star trackers work?",
        "What is Doppler range tracking?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-4-entry",
      chapterNumber: 4,
      title: "Atmospheric Interface",
      subtitle: "Hypersonic Entry & Aeroshell Ablation",
      historicalDate: `${artifact.arrivalDate ?? "Landing Day"} (Entry)`,
      firstPersonVoice: [
        `I struck the upper atmosphere at Mach 20, compressing the thin gases ahead into an incandescent shockwave.`,
        `My heat shield bore temperatures exceeding 1,800°C, stripping away carbon layers to keep my science deck cool inside.`,
        `Deceleration peaked at over 10G, crushing my structure with immense aerodynamic drag.`,
        `Inside the plasma sheath, all communication with Earth was temporarily severed.`,
      ],
      scientificContext:
        "The blunt body aeroshell design generates high aerodynamic drag at hypersonic speeds, converting over 90% of kinetic energy into atmospheric heat.",
      cameraMode: "free",
      cameraPosition: [1.8, 1.2, 3.0],
      cameraTarget: [0, 0, 0],
      environmentType: "descent",
      telemetry: makeTelemetry("MET 220d 15:30:00", 4.2, 225000000, 35, 35, "12m 30s", 280, 500, -115),
      highlightedComponentId: "lander-legs",
      eventPills: ["Hypersonic Interface", "Mach 20 Shockwave", "Ablative Shield", "Radio Blackout"],
      astroPrompts: [
        "Why does a spacecraft experience radio blackout during atmospheric entry?",
        "How does a heat shield protect the lander inside?",
        "What is the maximum G-force experienced during entry?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-5-descent",
      chapterNumber: 5,
      title: "Parachute & Terminal Retro-Burn",
      subtitle: "Supersonic Canopy Deployment & Radar Guidance",
      historicalDate: `${artifact.arrivalDate ?? "Landing Day"} (Descent)`,
      firstPersonVoice: [
        `At 10 kilometres altitude, pyrotechnic mortars fired my supersonic parachute into the gale-force slipstream.`,
        `The heat shield separated and fell away, allowing my downward-looking radar altimeter to bounce microwave pulses off the ground.`,
        `At 1,500 metres altitude, I released from the parachute canopy and my pulsed hydrazine retro-rockets roared to life.`,
        `Throttleable engines killed our descent velocity meter by meter as I locked onto safe touchdown ground.`,
      ],
      scientificContext:
        "Terminal retro-propulsion uses closed-loop Doppler radar guidance to continuously adjust throttle settings, cancelling both vertical and lateral velocity.",
      cameraMode: "free",
      cameraPosition: [2.0, 1.2, 2.8],
      cameraTarget: [0, 0, 0],
      environmentType: "descent",
      telemetry: makeTelemetry("MET 220d 15:35:00", 0.15, 225000000, 1.2, 1.2, "12m 31s", 120, 480, -110),
      highlightedComponentId: "terminal-engines",
      eventPills: ["Parachute Mortar", "Radar Altimeter Lock", "Retro-Rocket Ignition", "Velocity Nulling"],
      astroPrompts: [
        "How does a Doppler radar altimeter measure ground distance?",
        "Why can't parachutes alone land a spacecraft on Mars?",
        "What propellants do lander descent engines use?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-6-touchdown",
      chapterNumber: 6,
      title: "Touchdown on Alien Soil",
      subtitle: `Engine Shutdown & Arrival at ${siteStr}`,
      historicalDate: artifact.arrivalDate ?? "Landing Day",
      firstPersonVoice: [
        `My crushable honeycomb footpads impacted the regolith, absorbing the final kinetic jolt with a muffled crunch.`,
        `Descent engines shut down instantly to avoid kicking up hazardous plumes of gravel.`,
        `I stood stable and proud upon the soil of ${siteStr}.`,
        `My high-gain dish swept the sky, acquired Earth's coordinates, and transmitted the carrier signal: touchdown confirmed!`,
      ],
      scientificContext:
        "Touchdown sensors in the footpads trigger engine shutdown milliseconds before or upon contact, avoiding vehicle tipping and ground debris ingestion.",
      cameraMode: "free",
      cameraPosition: [0, 0.8, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "landing",
      telemetry: makeTelemetry("MET 220d 15:37:00", 0.0, 225000000, 0, 0, "12m 32s", 15, 450, -82),
      highlightedComponentId: "lander-legs",
      eventPills: ["Touchdown Confirmed", "Honeycomb Compression", siteStr, "Carrier Lock"],
      astroPrompts: [
        `What makes the landing site at ${siteStr} unique?`,
        "How does the lander confirm it has safely landed?",
        "What is the first thing a lander does after touchdown?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-7-science",
      chapterNumber: 7,
      title: "Science on the Surface",
      subtitle: "Robotic Trenching, Seismology & Chemical Sampling",
      historicalDate: "Surface Science Operations",
      firstPersonVoice: [
        `My robotic arm unstowed, swung out over the soil, and began digging deep trenches into the untouched regolith.`,
        `My science deck analyzed samples in miniaturized chemical ovens, detecting soil minerals, salts, and atmospheric trace gases.`,
        `My seismometers rested on the ground, listening silently to the subtle rumbling pulse of interior quakes and meteorite impacts.`,
        `For hundreds of sols, I stood as humanity's dedicated scientific station on an alien world.`,
      ],
      scientificContext: `${artifact.name} conducted vital in-situ surface experiments, analyzing soil chemistry, atmospheric meteorology, and seismic vibrations on ${targetBody}.`,
      cameraMode: "free",
      cameraPosition: [0, 0.8, 2.0],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("Sol 120 · Surface", 0.0, 225000000, 0, 0, "12m 35s", 0, 480, -78),
      highlightedComponentId: "science-arm",
      eventPills: ["Robotic Trenching", "Seismic Monitoring", "Atmospheric Weather", "Chemical Analysis"],
      astroPrompts: [
        `What major scientific discoveries were made by ${artifact.name}?`,
        "How do landers detect marsquakes or moonquakes?",
        "How does a robotic arm scoop soil in alien gravity?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-8-monument",
      chapterNumber: 8,
      title: "The Silent Outpost",
      subtitle: `Monument at ${siteStr} · Abandoned but Not Forgotten`,
      historicalDate: artifact.lastSignal ?? "Permanent Monument",
      firstPersonVoice: [
        `After completing its planned scientific mission and enduring bitter seasons, my batteries and solar panels slowly fell silent.`,
        `My final telemetry packets beamed home, completing a historic legacy of scientific achievement.`,
        `Today, I stand at ${siteStr}, frozen in time under the alien sun.`,
        `Though silent now, I am abandoned but never forgotten — an eternal monument to human courage and curiosity.`,
      ],
      scientificContext: `${artifact.name} remains at ${siteStr} as a permanent archaeological station of humanity's early robotic exploration.`,
      cameraMode: "free",
      cameraPosition: [2.2, 1.2, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "surface",
      telemetry: makeTelemetry("MET CONCLUSION", 0.0, 225000000, 0, 0, "12m 40s", 0, 0, -145),
      highlightedComponentId: "central-bus",
      eventPills: ["Mission Complete", "Final Carrier Transmission", "Preserved on Surface", "Eternal Monument"],
      astroPrompts: [
        `What caused ${artifact.name}'s mission to finally conclude?`,
        "What condition is this lander in today?",
        "Why are planetary landers left on other planets instead of brought back?",
      ],
      sources: makeSources(artifact),
    },
  ];
}

/**
 * Orbiters & Mapping Spacecraft (Chandrayaan-1, Chandrayaan-2, SMART-1, MESSENGER, Magellan, Galileo, Cassini) — 8 Full Chapters
 */
function generateOrbiterLifecycle(
  artifact: Artifact,
  dossier: ReturnType<typeof getMissionDossier>,
  components: SpacecraftComponentInfo[],
): MissionChapter[] {
  const landingYear = artifact.launchDate ? new Date(artifact.launchDate).getFullYear() : 2008;
  const targetBody = artifact.bodyId ?? "moon";

  return [
    {
      id: "ch-1-cleanroom",
      chapterNumber: 1,
      title: "Assembled for Orbital Science",
      subtitle: `${artifact.agency ?? "NASA"} Satellite Integration · Sensor Calibration`,
      historicalDate: `${landingYear - 1} (Cleanroom Assembly)`,
      firstPersonVoice: [
        `I was built inside high-bay satellite integration facilities, engineered with precision optical instruments and lightweight carbon-composite decks.`,
        `Technicians installed high-resolution imaging cameras, synthetic aperture radar, infrared spectrometers, and magnetometer booms.`,
        `My gold MLI thermal blankets and optical solar reflectors were tuned to balance intense solar radiation with the freezing darkness of planetary eclipses.`,
        `I was built to orbit ${targetBody} from above, mapping its entire globe from pole to pole.`,
      ],
      scientificContext: `${artifact.name} was engineered by ${artifact.agency ?? "NASA"} as a three-axis stabilized orbital satellite equipped with remote sensing payloads.`,
      cameraMode: "free",
      cameraPosition: [3.2, 1.4, 3.2],
      cameraTarget: [0, 0, 0],
      environmentType: "cleanroom",
      telemetry: makeTelemetry("T- 00:00:00", 0.0, 0, 384400, 0, "0.000s", 850, 950, -65),
      highlightedComponentId: "central-bus",
      eventPills: ["Satellite Integration", "Optical Calibration", "Carbon Decks", "Spectrometer Stacking"],
      astroPrompts: [
        `What were the primary scientific goals of ${artifact.name}?`,
        "How do orbiters balance extreme heat and extreme cold in space?",
        "What instruments are mounted on planetary orbiters?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-2-launch",
      chapterNumber: 2,
      title: "Liftoff into Orbit",
      subtitle: "Launch Vehicle Ascent · Fairing Jettison",
      historicalDate: artifact.launchDate ?? "Launch Day",
      firstPersonVoice: [
        `The launch vehicle rocketed off the pad, lighting up the sky with millions of newtons of thrust.`,
        `Ascending past the dense layers of the atmosphere, aerodynamic drag peaked and then dropped to zero as we reached space.`,
        `The fairings separated cleanly. Staged into Earth parking orbit, my solar arrays deployed and locked onto the Sun.`,
        `I was awake, active, and prepared for the journey to ${targetBody}.`,
      ],
      scientificContext:
        "The launch sequence injects the satellite into an initial elliptical parking orbit, from which subsequent orbital transfer burns are executed.",
      cameraMode: "free",
      cameraPosition: [0, 2.2, 4.2],
      cameraTarget: [0, 0.6, -1.0],
      environmentType: "launch",
      telemetry: makeTelemetry("T+ 00:03:00", 7.8, 250, 384150, 250, "0.001s", 820, 900, -70),
      highlightedComponentId: "solar-arrays",
      eventPills: ["Rocket Liftoff", "Fairing Jettison", "Solar Array Unfurling", "Orbit Parking"],
      astroPrompts: [
        "What rocket launched this satellite into orbit?",
        "Why are solar panels deployed as soon as the fairing separates?",
        "What is an Earth parking orbit?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-3-slingshot",
      chapterNumber: 3,
      title: "Earth Departure & Slingshot",
      subtitle: "Perigee Engine Burns & Oberth Effect Acceleration",
      historicalDate: `${artifact.launchDate ?? "Launch"} (Departure)`,
      firstPersonVoice: [
        `My main liquid apogee motor ignited in a series of planned perigee burns, stretching my orbit higher and higher into the void.`,
        `Using the Oberth effect, each burn added maximum kinetic energy at closest approach, slingshotting me toward ${targetBody}.`,
        `Earth shrank into an iridescent sphere as I severed its gravitational grip and entered interplanetary transfer.`,
        `Star trackers confirmed my orientation as my high-gain antenna locked onto Earth.`,
      ],
      scientificContext:
        "Using progressive perigee burns allows orbiters to reach escape velocity efficiently with smaller rocket engines, maximizing payload mass.",
      cameraMode: "free",
      cameraPosition: [2.5, 1.2, 3.0],
      cameraTarget: [0, 0, 0],
      environmentType: "earth_orbit",
      telemetry: makeTelemetry("MET 12d 06:00:00", 10.4, 180000, 204400, 180000, "0.600s", 680, 880, -78),
      highlightedComponentId: "main-engine",
      eventPills: ["Perigee Burns", "Oberth Effect", "Trans-Planetary Track", "Star Tracker Alignment"],
      astroPrompts: [
        "What is the Oberth effect and why is it so efficient?",
        "How do orbiters use Earth's gravity to boost their speed?",
        "How does a liquid apogee motor work?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-4-cruise",
      chapterNumber: 4,
      title: "Interplanetary Cruise",
      subtitle: "Heliocentric Transit & Deep Space Communications",
      historicalDate: "Cruise Phase",
      firstPersonVoice: [
        `I soared through interplanetary space across hundreds of millions of kilometres.`,
        `Solar wind particles washed over my blankets as reaction wheels maintained micro-radian pointing accuracy.`,
        `My communications dish beamed health telemetry back to Earth's deep space antennas across minutes of light travel delay.`,
        `Ahead, the target world grew brighter in my narrow-angle optical sensors.`,
      ],
      scientificContext:
        "Three-axis attitude control during cruise is maintained via momentum wheels, unloaded periodically using cold gas or hydrazine reaction thrusters.",
      cameraMode: "free",
      cameraPosition: [2.5, 1.8, 3.5],
      cameraTarget: [0, 0, 0],
      environmentType: "cruise",
      telemetry: makeTelemetry("MET 140d 12:00:00", 28.5, 150000000, 25000000, 0, "08m 20s", 520, 840, -92),
      highlightedComponentId: "hga-dish",
      eventPills: ["Heliocentric Cruise", "Momentum Wheels", "DSN Comm Link", "Light-Delay Growth"],
      astroPrompts: [
        "How do reaction wheels orient a spacecraft without using fuel?",
        "How long do radio signals take to travel across the solar system?",
        "What hazards exist during the deep space cruise?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-5-approach",
      chapterNumber: 5,
      title: "Planetary Approach",
      subtitle: `Target Encounter with ${targetBody} · Terminal Alignment`,
      historicalDate: `${artifact.arrivalDate ?? "Arrival"} (-48 Hours)`,
      firstPersonVoice: [
        `As I drew close, ${targetBody} dominated my camera frames with breathtaking detail.`,
        `I tracked its polar ice, impact basins, and rugged ridges, calibrating optical navigation vectors against background star constellations.`,
        `Ground controllers calculated the critical insertion burn parameters and uploaded them into my flight memory.`,
        `The stage was set for the defining maneuver of the mission.`,
      ],
      scientificContext:
        "Optical navigation captures images of the target body against star fields, computing optical line-of-sight angles to refine the hyperbolic approach trajectory.",
      cameraMode: "free",
      cameraPosition: [2.2, 1.4, 2.8],
      cameraTarget: [0, 0, 0],
      environmentType: "approach",
      telemetry: makeTelemetry("MET 298d 04:00:00", 22.8, 220000000, 65000, 65000, "12m 15s", 420, 800, -105),
      highlightedComponentId: "science-payload",
      eventPills: ["Optical Navigation", "Terminal Vector", "Target Horizon", "Burn Upload"],
      astroPrompts: [
        "How does optical navigation help steer a spacecraft toward orbit?",
        "What happens if an orbiter misses its orbital insertion burn?",
        `What did ${targetBody} look like from approaching distance?`,
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-6-insertion",
      chapterNumber: 6,
      title: "Orbit Insertion Burn",
      subtitle: `The Critical Braking Burn · Capture around ${targetBody}`,
      historicalDate: artifact.arrivalDate ?? "Insertion Day",
      firstPersonVoice: [
        `Swinging behind the dark limb of ${targetBody}, total solar eclipse swallowed me and severed radio contact with Earth.`,
        `In absolute darkness and isolation, my autonomous onboard flight computer commanded engine ignition.`,
        `My high-thrust main engine roared for hundreds of seconds, killing kilometres per second of orbital velocity.`,
        `Gravity caught me. Emerging back into sunlight, my carrier signal burst through to Earth: orbit insertion was a total success!`,
      ],
      scientificContext:
        "Orbit Insertion requires a retrograde burn to reduce hyperbolic velocity below the target planet's escape velocity, capturing the spacecraft into a closed elliptical orbit.",
      cameraMode: "free",
      cameraPosition: [1.8, 1.2, 2.8],
      cameraTarget: [0, 0, 0],
      environmentType: "insertion",
      telemetry: makeTelemetry("MET 300d 02:15:00", 4.1, 225000000, 420, 420, "12m 30s", 120, 780, -112),
      highlightedComponentId: "main-engine",
      eventPills: ["Orbit Insertion Burn", "Autonomous Braking", "Gravitational Capture", "Occultation Signal"],
      astroPrompts: [
        "Why do orbit insertion burns often happen behind the planet?",
        "How much velocity must an orbiter lose to enter orbit?",
        "What computer systems guide the orbit insertion burn?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-7-science",
      chapterNumber: 7,
      title: "Global Orbital Science",
      subtitle: "High-Resolution Mapping & Atmospheric Discoveries",
      historicalDate: "Science Mapping Operations",
      firstPersonVoice: [
        `Revolving in a stable science orbit, I mapped ${targetBody} from pole to pole across thousands of revolutions.`,
        `My multispectral cameras photographed craters, ancient volcanic flows, and shadowed polar regions.`,
        `Spectrometers detected water ice molecules hidden in permanently shadowed craters, rewriting textbooks across the world.`,
        `I transmitted terabytes of irreplaceable science data that will guide future human explorers for generations.`,
      ],
      scientificContext: `${artifact.name} achieved landmark scientific discoveries, mapping surface mineralogy, elemental composition, and polar volatiles from orbit.`,
      cameraMode: "free",
      cameraPosition: [2.2, 1.5, 2.8],
      cameraTarget: [0, 0, 0],
      environmentType: "science_orbit",
      telemetry: makeTelemetry("Orbit 1,240 · Science", 1.8, 225000000, 200, 200, "12m 32s", 45, 820, -82),
      highlightedComponentId: "science-payload",
      eventPills: ["Pole-to-Pole Mapping", "Polar Water Ice", "Mineral Spectrometry", "Terabytes Returned"],
      astroPrompts: [
        `What were the most important discoveries made by ${artifact.name}?`,
        "How do orbiters find water ice from space?",
        "What is synthetic aperture radar?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-8-monument",
      chapterNumber: 8,
      title: "The Final Chapter & Monument",
      subtitle: "Mission Conclusion · Abandoned but Not Forgotten",
      historicalDate: artifact.lastSignal ?? "Mission Legacy",
      firstPersonVoice: [
        `After years of operating far beyond my intended lifespan, my propellant tanks ran dry and my electrical systems reached their final hour.`,
        `My mission concluded either with an intentional scientific impact into the surface or by entering a permanent, silent parking orbit.`,
        `My hardware remains preserved in the pristine vacuum of space — an enduring relic of humanity's golden age of discovery.`,
        `Though silent now, I am abandoned but never forgotten.`,
      ],
      scientificContext:
        "At the end of propellant reserves, orbiters are either decommissioned into stable graveyard orbits or intentionally de-orbited to prevent orbital debris collisions.",
      cameraMode: "free",
      cameraPosition: [2.2, 1.2, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: artifact.kind === "orbiter" ? "science_orbit" : "eclipse",
      telemetry: makeTelemetry("MET CONCLUSION", 1.6, 225000000, 200, 200, "12m 30s", 0, 0, -145),
      highlightedComponentId: "central-bus",
      eventPills: ["Propellant Depletion", "Final Science Packet", "Preserved in Orbit", "Eternal Monument"],
      astroPrompts: [
        `How did ${artifact.name}'s mission finally conclude?`,
        "What happens to orbiters when they run out of fuel?",
        "What is a graveyard orbit in planetary exploration?",
      ],
      sources: makeSources(artifact),
    },
  ];
}

/**
 * Deep Space & Interstellar Probes (Voyager 1 & 2, Pioneer 10 & 11, New Horizons) — 7 Full Chapters
 */
function generateDeepSpaceLifecycle(
  artifact: Artifact,
  dossier: ReturnType<typeof getMissionDossier>,
  components: SpacecraftComponentInfo[],
): MissionChapter[] {
  const landingYear = artifact.launchDate ? new Date(artifact.launchDate).getFullYear() : 1977;

  return [
    {
      id: "ch-1-cleanroom",
      chapterNumber: 1,
      title: "The Cosmic Vision & Assembly",
      subtitle: `${artifact.agency ?? "NASA"} Cleanroom Assembly · Nuclear RTG Integration`,
      historicalDate: `${landingYear - 1} (Assembly & Testing)`,
      firstPersonVoice: [
        `I was conceived during a rare planetary alignment that occurs only once every 175 years.`,
        `Engineers equipped me with a massive 3.7-metre parabolic high-gain dish, radiation-hardened electronics, and decaying plutonium-238 RTG nuclear batteries.`,
        `Fastened securely to my hull was a gold-plated copper record carrying the sounds, music, languages, and greetings of planet Earth.`,
        `I was built not merely as an explorer, but as humanity's eternal emissary to the cosmos.`,
      ],
      scientificContext: `${artifact.name} was engineered for the outer solar system and interstellar medium, using nuclear power and autonomous fault protection to survive decades in deep space.`,
      cameraMode: "free",
      cameraPosition: [3.2, 1.4, 3.2],
      cameraTarget: [0, 0, 0],
      environmentType: "cleanroom",
      telemetry: makeTelemetry("T- 00:00:00", 0.0, 0, 0, 0, "0.000s", 450, 470, -60),
      highlightedComponentId: "central-bus",
      eventPills: ["Grand Tour Concept", "Nuclear RTG Power", "Golden Record", "Radiation Hardening"],
      astroPrompts: [
        "What is the Golden Record and what is stored on it?",
        "What was the rare planetary alignment that made the Grand Tour possible?",
        "How do nuclear RTGs produce electricity in deep space?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-2-launch",
      chapterNumber: 2,
      title: "Direct Solar Escape",
      subtitle: "Titan-Centaur Launch · Maximum Hyperbolic Velocity",
      historicalDate: artifact.launchDate ?? "Launch Day",
      firstPersonVoice: [
        `A Titan IIIE-Centaur rocket ignited with explosive power, accelerating me off the launch pad at Cape Canaveral.`,
        `Breaking through the atmosphere, the solid boosters jettisoned and the liquid Centaur upper stage fired with full throttle.`,
        `I was hurled directly onto a solar escape trajectory at over 45,000 kilometres per hour — one of the fastest spacecraft launches in history.`,
        `Ahead lay Jupiter, Saturn, and the boundless depths of the outer solar system.`,
      ],
      scientificContext:
        "Direct injection onto a high-energy escape hyperbola provided the required energy to reach Jupiter in under two years without Earth gravity assists.",
      cameraMode: "free",
      cameraPosition: [0, 2.2, 4.2],
      cameraTarget: [0, 0.6, -1.0],
      environmentType: "launch",
      telemetry: makeTelemetry("T+ 00:05:00", 12.8, 450, 778000000, 450, "0.002s", 420, 465, -68),
      highlightedComponentId: "hga-dish",
      eventPills: ["Titan-Centaur Ignition", "Hyperbolic Escape", "45,000 km/h Liftoff", "Outer Solar Track"],
      astroPrompts: [
        "What rocket launched the Voyager and Pioneer probes?",
        "What speed is needed to escape the Sun's gravity?",
        "How fast do deep-space probes travel?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-3-asteroid",
      chapterNumber: 3,
      title: "Crossing the Asteroid Belt",
      subtitle: "Heliocentric Cruise & Planetary Transit",
      historicalDate: `${landingYear + 1} (Inner System Transit)`,
      firstPersonVoice: [
        `Crossing beyond the orbit of Mars, I sailed through the vast expanse of the Main Asteroid Belt.`,
        `Contrary to science fiction, asteroids were separated by millions of kilometres of empty space.`,
        `My cosmic ray sensors and plasma instruments sampled the expanding solar wind as the Sun dwindled behind me.`,
        `My radio transmitters sent crisp telemetry pulses back to NASA's Deep Space Network dishes on Earth.`,
      ],
      scientificContext:
        "The spacecraft measured interplanetary dust density and solar wind plasma across the asteroid belt, proving safe passage for future outer-planet missions.",
      cameraMode: "free",
      cameraPosition: [2.5, 1.8, 3.5],
      cameraTarget: [0, 0, 0],
      environmentType: "cruise",
      telemetry: makeTelemetry("MET 400d 00:00:00", 35.4, 450000000, 328000000, 0, "25m 00s", 280, 450, -88),
      highlightedComponentId: "science-payload",
      eventPills: ["Asteroid Belt Crossing", "Solar Wind Sampling", "Deep Space Cruise", "Cosmic Ray Detection"],
      astroPrompts: [
        "How dense is the Asteroid Belt between Mars and Jupiter?",
        "What instruments measured the solar wind?",
        "How cold does it get beyond Mars?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-4-flyby",
      chapterNumber: 4,
      title: "Giant Planet Gravity Assist",
      subtitle: "Close Encounter with the Gas Giants · Slingshot Acceleration",
      historicalDate: "Planetary Flyby Encounters",
      firstPersonVoice: [
        `The massive swirling bands of Jupiter and Saturn grew to fill my visual sensors with awe-inspiring grandeur.`,
        `I plunged deep into the giant planet's gravitational well, skimming past volcanic moons, swirling storms, and shimmering ice rings.`,
        `Using the planet's orbital momentum in a gravity assist slingshot, my velocity surged outward toward interstellar space.`,
        `My cameras captured iconic portraits: the sulfur volcanoes of Io, the cracked ice of Europa, and the golden haze of Titan.`,
      ],
      scientificContext:
        "Planetary gravity assists transfer orbital angular momentum from the planet to the spacecraft, dramatically increasing heliocentric velocity without burning propellant.",
      cameraMode: "free",
      cameraPosition: [2.2, 1.4, 2.8],
      cameraTarget: [0, 0, 0],
      environmentType: "approach",
      telemetry: makeTelemetry("Flyby Closest Approach", 42.1, 778000000, 200000, 200000, "43m 15s", 150, 430, -98),
      highlightedComponentId: "science-payload",
      eventPills: ["Gravity Assist Slingshot", "Active Cryovolcanoes", "Planetary Rings", "Iconic Photography"],
      astroPrompts: [
        "How does a gravity assist give a spacecraft extra speed?",
        "What surprising discoveries were made at Jupiter and Saturn?",
        "What moons have active volcanoes or oceans?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-5-discoveries",
      chapterNumber: 5,
      title: "Discoveries across the Void",
      subtitle: "Outer Planet Moons, Rings & The Pale Blue Dot",
      historicalDate: "Outer System Exploration",
      firstPersonVoice: [
        `Beyond Saturn, I explored Uranus and Neptune, revealing tilted magnetic fields, faint rings, and geysers erupting on frozen Triton.`,
        `Looking back one final time across 6 billion kilometres, I took the historic 'Family Portrait' of our solar system.`,
        `There, caught in a beam of scattered sunlight, was Earth: a tiny, fragile 'Pale Blue Dot' — every human who ever lived, existing on a mote of dust suspended in a sunbeam.`,
        `Cameras powered down forever. All remaining electrical power was directed to magnetic and particle sensors.`,
      ],
      scientificContext:
        "The 'Pale Blue Dot' photograph, suggested by Carl Sagan, captured Earth from a distance of 6 billion kilometres (40.5 AU) on 14 February 1990.",
      cameraMode: "free",
      cameraPosition: [2.5, 1.8, 3.5],
      cameraTarget: [0, 0, 0],
      environmentType: "cruise",
      telemetry: makeTelemetry("Distance 40 AU · Pale Blue Dot", 17.5, 6000000000, 0, 0, "05h 30m", 80, 380, -118),
      highlightedComponentId: "hga-dish",
      eventPills: ["Pale Blue Dot", "Family Portrait", "Outer Planets", "Cameras Powered Off"],
      astroPrompts: [
        "What is the story behind Carl Sagan's 'Pale Blue Dot'?",
        "Why were the cameras turned off on Voyager 1?",
        "How far is 40 Astronomical Units (AU)?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-6-heliopause",
      chapterNumber: 6,
      title: "Entering Interstellar Space",
      subtitle: "Crossing the Heliopause · The Edge of the Sun's Domain",
      historicalDate: "Heliopause Crossing Phase",
      firstPersonVoice: [
        `At a distance of 18 billion kilometres from the Sun, my plasma wave instrument detected a sudden sharp leap in density.`,
        `The solar wind ceased. The cosmic rays of deep space surged around me.`,
        `I had crossed the heliopause — the boundary where the Sun's magnetic bubble yields to the interstellar ocean of the Milky Way.`,
        `For the first time in history, a human-made spacecraft had entered interstellar space.`,
      ],
      scientificContext:
        "Crossing the heliopause was confirmed by plasma wave spectrometer (PWS) readings showing an 80-fold increase in electron plasma density from solar wind to interstellar medium.",
      cameraMode: "free",
      cameraPosition: [2.2, 1.2, 2.2],
      cameraTarget: [0, 0, 0],
      environmentType: "eclipse",
      telemetry: makeTelemetry("121 AU · Heliopause Crossing", 16.9, 18200000000, 0, 0, "16h 50m", 0, 240, -135),
      highlightedComponentId: "science-payload",
      eventPills: ["Heliopause Crossed", "Interstellar Plasma", "Cosmic Ray Surge", "First Human Craft in Interstellar Space"],
      astroPrompts: [
        "What is the heliopause and where does it lie?",
        "How did scientists prove Voyager entered interstellar space?",
        "What is the interstellar medium composed of?",
      ],
      sources: makeSources(artifact),
    },
    {
      id: "ch-7-eternity",
      chapterNumber: 7,
      title: "The Eternal Ambassador",
      subtitle: "Drifting among the Stars · Billions of Years into the Future",
      historicalDate: "Present & Eternity",
      firstPersonVoice: [
        `I am now more than 24 billion kilometres from the world that made me. My whisper of a radio signal takes over 22 hours to reach home at the speed of light.`,
        `My plutonium batteries are slowly dying; one by one, NASA powers down my heaters and sensors so I can continue calling home.`,
        `Around 2030, my transmitter will fall silent forever. But in 40,000 years, I will pass near star Gliese 445.`,
        `Carrying humanity's Golden Record, I will drift among the stars for billions of years — an immortal message in a bottle from humanity to the cosmos.`,
      ],
      scientificContext:
        "Voyager travels on a hyperbolic galactic trajectory at 16.9 km/s (3.6 AU/year). With no atmospheric friction or gravitational capture, it will wander the Milky Way galaxy indefinitely.",
      cameraMode: "free",
      cameraPosition: [2.5, 1.5, 2.5],
      cameraTarget: [0, 0, 0],
      environmentType: "eclipse",
      telemetry: makeTelemetry(">160 AU · Interstellar", 16.9, 24000000000, 0, 0, "22h 30m", 0, 190, -148),
      highlightedComponentId: "central-bus",
      eventPills: [">24 Billion km Away", "22.5h Light Travel Time", "Golden Record on Board", "Eternal Ambassador"],
      astroPrompts: [
        "How long will the Golden Record survive in space?",
        "What star will Voyager 1 pass in 40,000 years?",
        "Can we ever send another spacecraft to catch up to Voyager?",
      ],
      sources: makeSources(artifact),
    },
  ];
}

/* ────────────────────────────────────────────────────────────────
   4. MAP STORY STAGES TO CHAPTERS (FOR CURATED STORIES >= 7 STAGES)
   ──────────────────────────────────────────────────────────────── */

function mapStoryStagesToChapters(
  artifact: Artifact,
  stages: NonNullable<MissionStoryMeta["stages"]>,
  components: SpacecraftComponentInfo[],
): MissionChapter[] {
  const stageCount = stages.length;

  return stages.map((stage, idx) => {
    const chNum = idx + 1;
    const titleLower = stage.title.toLowerCase();

    let envType: MissionChapter["environmentType"] = "cleanroom";
    let camPos: [number, number, number] = [3.2, 1.4, 3.2];

    if (idx === 0 || titleLower.includes("born") || titleLower.includes("assembly") || titleLower.includes("inception") || titleLower.includes("behemoth")) {
      envType = "cleanroom";
      camPos = [3.2, 1.4, 3.2];
    } else if (idx === 1 || titleLower.includes("launch") || titleLower.includes("liftoff") || titleLower.includes("roar") || titleLower.includes("bahubali")) {
      envType = "launch";
      camPos = [0, 2.2, 4.2];
    } else if (idx === stageCount - 1 || titleLower.includes("silent") || titleLower.includes("legacy") || titleLower.includes("monument") || titleLower.includes("eternal")) {
      envType = artifact.kind === "rover" || artifact.kind === "lander" ? "surface" : "eclipse";
      camPos = [2.2, 1.2, 2.2];
    } else if (titleLower.includes("entry") || titleLower.includes("descent") || titleLower.includes("terror") || titleLower.includes("parachute") || titleLower.includes("skycrane") || titleLower.includes("sky crane")) {
      envType = "descent";
      camPos = [1.8, 1.2, 3.0];
    } else if (titleLower.includes("landing") || titleLower.includes("touchdown") || titleLower.includes("contact") || titleLower.includes("bounce")) {
      envType = "landing";
      camPos = [0, 0.8, 2.2];
    } else if (titleLower.includes("surface") || titleLower.includes("explore") || titleLower.includes("roving") || titleLower.includes("rock") || titleLower.includes("mount") || titleLower.includes("crater") || titleLower.includes("trench")) {
      envType = "surface";
      camPos = [0, 0.8, 2.0];
    } else if (titleLower.includes("orbit") || titleLower.includes("insertion") || titleLower.includes("rendezvous")) {
      envType = "insertion";
      camPos = [1.8, 1.2, 2.8];
    } else {
      envType = "cruise";
      camPos = [2.5, 1.8, 3.5];
    }

    const voiceLines: string[] = [];
    if (stage.narration && stage.narration.length > 0) {
      stage.narration.forEach((line) => {
        if (line.toLowerCase().startsWith("i ") || line.toLowerCase().startsWith("my ")) {
          voiceLines.push(line);
        } else {
          voiceLines.push(`"${line}"`);
        }
      });
    } else {
      voiceLines.push(`I completed ${stage.title} during my journey into extraterrestrial space.`);
    }

    const distEarth = idx === 0 ? 0 : idx === 1 ? 250 : idx === stageCount - 1 ? 225000000 : 150000000;
    const speed = idx === 0 ? 0.0 : idx === 1 ? 7.8 : idx === stageCount - 1 ? 0.0 : 18.5;

    return {
      id: stage.id ?? `stage-${idx}`,
      chapterNumber: chNum,
      title: stage.title,
      subtitle: `${artifact.agency ?? "NASA"} · ${stage.date ?? artifact.launchDate ?? "Mission Operation"}`,
      historicalDate: stage.date ?? artifact.launchDate ?? "Historical Phase",
      firstPersonVoice: voiceLines,
      scientificContext: stage.science ?? artifact.summary,
      cameraMode: "free",
      cameraPosition: camPos,
      cameraTarget: [0, 0, 0],
      environmentType: envType,
      telemetry: makeTelemetry(
        idx === 0 ? "T- 00:00:00" : idx === 1 ? "T+ 00:03:00" : `Stage ${chNum} · ${stage.date ?? "Active"}`,
        speed,
        distEarth,
        Math.max(0, 225000000 - idx * 25000000),
        envType === "cleanroom" || envType === "surface" ? 0 : 250,
        distEarth === 0 ? "0.000s" : "12m 30s",
        Math.max(0, 500 - idx * 60),
        idx === stageCount - 1 ? 0 : 450,
        idx === stageCount - 1 ? -145 : -85,
      ),
      highlightedComponentId: components[Math.min(idx, components.length - 1)]?.id ?? "central-bus",
      eventPills: stage.facts && stage.facts.length > 0 ? stage.facts.slice(0, 4) : [stage.title, artifact.mission, artifact.agency ?? "NASA", artifact.kind],
      astroPrompts: [
        `Explain the significance of ${stage.title} during ${artifact.name}'s mission.`,
        `What engineering innovations made ${stage.title} possible?`,
        `What did science instruments discover during this phase?`,
      ],
      sources: makeSources(artifact),
    };
  });
}

/* ────────────────────────────────────────────────────────────────
   5. UTILITY BUILDERS
   ──────────────────────────────────────────────────────────────── */

function makeTelemetry(
  met: string,
  speedKmS: number,
  distEarthKm: number,
  distTargetKm: number,
  altitudeKm: number | undefined,
  lightTimeDelay: string,
  propellantMassKg: number,
  powerWatts: number,
  signalStrengthDb: number,
): TelemetryData {
  return {
    met,
    speedKmS,
    distEarthKm,
    distTargetKm,
    altitudeKm,
    lightTimeDelay,
    propellantMassKg,
    powerWatts,
    signalStrengthDb,
    provenance: "AUTHENTIC RECONSTRUCTION",
  };
}

function makeSources(artifact: Artifact): { title: string; url?: string; citation: string }[] {
  if (artifact.sources && artifact.sources.length > 0) {
    return artifact.sources.map((s) => ({
      title: s.label,
      url: s.url,
      citation: `${s.label} (${artifact.agency ?? "NASA"} Science Data Archive)`,
    }));
  }
  return [
    {
      title: `${artifact.agency ?? "NASA"} Master Archive — ${artifact.name}`,
      url: "https://science.nasa.gov/",
      citation: `NASA/NSSDC Master Catalog Record for ${artifact.name}`,
    },
  ];
}
