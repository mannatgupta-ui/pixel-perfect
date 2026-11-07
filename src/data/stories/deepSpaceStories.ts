import type { StoryStage } from "../spirit";
import type { MissionStoryMeta } from "../multiStories";

/* ────────────────────────────────────────────────────────────────
 * Outer Planets & Deep Space Mission Stories: Curated narratives
 * ──────────────────────────────────────────────────────────────── */

export const CASSINI_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Flagship of the Outer Solar System",
    date: "1989 – 1997",
    narration: [
      "I was Cassini-Huygens, a joint flagship created by NASA, the European Space Agency, and the Italian Space Agency.",
      "As tall as a two-story school bus and weighing nearly six metric tons, I was powered by three radioisotope thermoelectric generators fueled by 33 kilograms of plutonium.",
      "Mounted to my flank was the European Huygens probe, ready to dive into the thick nitrogen clouds of Saturn's largest moon, Titan.",
    ],
    scienceTitle: "Cassini-Huygens Integrated Architecture",
    science:
      "Cassini carried 12 orbiter science instruments and Huygens carried 6. Three GPHS-RTGs provided 885 watts of power, while a 4-metre high-gain antenna served for communications, radar mapping, and radio science.",
    facts: [
      "Total Launch Mass: 5,712 kg",
      "Participating Agencies: NASA, ESA, ASI (Italy)",
      "Launch Date: 15 October 1997 atop Titan IVB/Centaur",
    ],
    hotspots: [
      { x: 50, y: 35, label: "4m High-Gain Dish", text: "Multi-frequency dish used for radar imaging and Earth link." },
      { x: 75, y: 60, label: "Huygens Probe Bay", text: "Mounted the 318 kg European Titan atmospheric probe." },
    ],
  },
  {
    id: "insertion",
    number: "02",
    title: "Slipping Between the Rings",
    date: "1 July 2004",
    narration: [
      "After a seven-year interplanetary voyage across two billion kilometers, I reached Saturn.",
      "On 1 July 2004, I turned my high-gain antenna forward as a shield and threaded the needle between Saturn's F and G rings.",
      "My main rocket engine fired for 96 minutes, braking me into orbit. For the first time, human eyes hovered over the glittering, razor-thin ice rings of the ringed jewel of our solar system.",
    ],
    scienceTitle: "Saturn Orbit Insertion (SOI) and Ring Plane Crossing",
    science:
      "Cassini executed SOI at periapsis within 20,000 km of Saturn's cloud tops, burning 40% of its total propellant. The 4m dish blocked micro-meteoroids while traversing the hazardous ring gap.",
    facts: [
      "Main Engine Burn: 96 minutes, consuming 830 kg of propellant",
      "Ring Clearance: Passed within 158,000 km of Saturn's center",
      "Total Orbits Completed: 294 orbits over 13 years",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Saturn's Rings", text: "Composed of 99% pure water ice particles from pebbles to house-sized boulders." },
    ],
  },
  {
    id: "enceladus",
    number: "03",
    title: "The Geysers of Enceladus",
    date: "2005 – 2015",
    narration: [
      "At tiny Enceladus — a frozen moon just 500 kilometers wide — I discovered something staggering.",
      "From deep fractures nicknamed the 'Tiger Stripes' at its south pole, colossal geysers were blasting plumes of water ice, salt, and organic molecules hundreds of kilometers into space.",
      "I dove directly through the plumes at 30,000 km/h, tasting the spray: underneath that icy crust lies a warm, global, saltwater ocean heated by hydrothermal vents — an ideal habitat for life.",
    ],
    scienceTitle: "Hydrothermal Ocean and Tiger Stripe Plumes",
    science:
      "Cassini's INMS (Ion and Neutral Mass Spectrometer) detected molecular hydrogen (H2) in Enceladus' plumes, direct geochemical proof of serpentinization reactions at hydrothermal vents on an alien ocean floor.",
    facts: [
      "Plume Velocity: 2,180 km/h ejecting into the E Ring",
      "Ocean Composition: Liquid water, salts, methane, CO2, and complex organics",
      "Significance: One of the most promising locations for life in the solar system",
    ],
    hotspots: [
      { x: 45, y: 55, label: "Tiger Stripe Fractures", text: "Four parallel thermal rifts venting oceanic vapor into space." },
      { x: 65, y: 35, label: "Cassini Plume Dive", text: "Flew just 49 km above the icy surface through the geysers." },
    ],
  },
  {
    id: "finale",
    number: "04",
    title: "The Grand Finale and Cloud Plunge",
    date: "April – 15 September 2017",
    narration: [
      "After 13 glorious years, my hydrazine was nearly spent. To protect the pristine, habitable oceans of Enceladus and Titan from future contamination, NASA ordered my ultimate sacrifice.",
      "For my Grand Finale, I made 22 daring dives through the unexplored 2,000-kilometer gap between Saturn and its innermost rings, measuring Saturn's internal magnetic field.",
      "On 15 September 2017, I plunged into Saturn's churning clouds at 120,000 km/h. My attitude thrusters fired at 100% to keep my antenna pointed at Earth, streaming data until friction melted my alloy skeleton into the atmosphere.",
    ],
    scienceTitle: "Grand Finale Dives and Planetary Protection Plunge",
    science:
      "Cassini determined Saturn's rings are young (~100 to 400 million years old, massing ~40% of Mimas) and ring material ('ring rain') is falling into the planet at 10,000 kg/second. The deliberate plunge complied with COSPAR planetary protection rules.",
    facts: [
      "Grand Finale Dives: 22 dives between the rings and atmosphere",
      "Plunge Speed: 120,000 km/h (34 km/s)",
      "Final Signal: 15 September 2017 (11:55:46 UTC)",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Saturn's Clouds", text: "Cassini's atoms vaporized and became part of the planet forever." },
    ],
  },
];

export const NEWHORIZONS_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Fastest Bullet from Earth",
    date: "2001 – 2006",
    narration: [
      "Pluto was the last uncharted frontier of the classic solar system. No spacecraft had ever dared to make the five-billion-kilometer crossing.",
      "I was New Horizons. Weighing just 478 kilograms, I was launched on 19 January 2006 on an Atlas V rocket boosted by five solid motors and a Star 48B third stage.",
      "I blasted away from Earth at 58,536 km/h — the fastest launch speed of any human-made object in history. I passed the orbit of the Moon in just nine hours.",
    ],
    scienceTitle: "Direct Hyperbolic Injection and Science Payload",
    science:
      "New Horizons carried 7 compact low-power instruments: Ralph (visible/IR imaging), Alice (UV spectrometer), LORRI (long-range optical camera), SWAP, PEPSSI, SDC, and REX, powered by an 240W RTG.",
    facts: [
      "Launch Speed: 16.26 km/s (58,536 km/h) relative to Earth",
      "Earth-to-Moon Time: 9 hours (Apollo took 3 days)",
      "Power Source: General Purpose Heat Source Radioisotope Thermoelectric Generator (GPHS-RTG)",
    ],
    hotspots: [
      { x: 50, y: 40, label: "2.1m Antenna Dish", text: "High-gain antenna beaming data across 5 billion km of void." },
      { x: 30, y: 60, label: "LORRI Telescope", text: "20.8 cm aperture panchromatic telescopic camera." },
    ],
  },
  {
    id: "jupiter",
    number: "02",
    title: "The Jupiter Slingshot",
    date: "February 2007",
    narration: [
      "Just thirteen months after launch, I arrived at Jupiter.",
      "I dipped close to the gas giant's roaring radiation belts, stealing orbital momentum that boosted my speed by 14,000 km/h and shaved three full years off my cruise to Pluto.",
      "During flyby, my cameras caught Io's volcanic volcano Tvashtar erupting a spectacular 330-kilometer-high umbrella plume of sulfur gas into space.",
    ],
    scienceTitle: "Jupiter Gravity Assist (JGA)",
    science:
      "The flyby used Jupiter's gravity to increase heliocentric velocity while testing New Horizons' entire instrument suite on Jupiter's atmosphere, ring system, and Galilean satellites.",
    facts: [
      "Closest Approach: 2.3 million km from Jupiter on 28 February 2007",
      "Velocity Added: 4 km/s (14,400 km/h)",
      "Io Volcano Discovery: 330 km high volcanic plume of Tvashtar",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Tvashtar Plume", text: "Sulfur volcanic eruption on Jupiter's volcanic moon Io." },
    ],
  },
  {
    id: "pluto",
    number: "03",
    title: "The Heart of Pluto",
    date: "14 July 2015",
    narration: [
      "For nine years, I hibernated in the frigid blackness between Saturn and Neptune.",
      "On 14 July 2015, I roared awake and sped past Pluto at 49,600 km/h, flying just 12,500 kilometers above its surface.",
      "Instead of a dead, cratered ball of ice, Pluto was gloriously alive! I revealed a colossal, brilliant white heart of nitrogen ice named Tombaugh Regio, towering water-ice mountain ranges as tall as the Rockies, and a baby blue sky created by hydrocarbon hazes.",
    ],
    scienceTitle: "Pluto Flyby Science and Sputnik Planitia",
    science:
      "Pluto exhibits active convective glacial flows in Sputnik Planitia (a 1,000-km nitrogen ice glacier), uncratered young plains (<10 million years old), methane snowpeaks, and cryovolcanoes like Wright Mons.",
    facts: [
      "Closest Approach: 12,500 km (7,750 miles) on 14 July 2015",
      "The Heart: 1,000 km wide nitrogen-ice glacier named Tombaugh Regio",
      "Mountains: Water-ice peaks (Norgay Montes) rising 3,500 metres",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Tombaugh Regio", text: "The vast glowing nitrogen-ice heart on Pluto's surface." },
      { x: 75, y: 40, label: "Charon", text: "Pluto's giant companion moon with a reddish north polar cap named Mordor Macula." },
    ],
  },
  {
    id: "arrokoth",
    number: "04",
    title: "Arrokoth: The Edge of the Kuiper Belt",
    date: "1 January 2019 & Forever",
    narration: [
      "On New Year's Day 2019, four billion miles from Earth, I flew past Arrokoth — a pristine contact binary shaped like a cosmic snowman.",
      "It is the most primitive, most distant primordial relic of planetary creation ever visited by humankind.",
      "Now I am flying outward toward interstellar space, exploring the Kuiper Belt's outer boundaries, carrying humanity's curiosity into the eternal dark.",
    ],
    scienceTitle: "First Flyby of a Cold Classical Kuiper Belt Object",
    science:
      "Arrokoth (2014 MU69) revealed two flattened lobes gently merged at low speed, proving planets form via pebble accretion and gentle streaming instabilities rather than violent catastrophic collisions.",
    facts: [
      "Arrokoth Encounter: 1 January 2019 (6.6 billion km from Earth)",
      "Shape: 36-km long pristine contact binary (bi-lobed 'snowman')",
      "Current Status: Operational in outer Kuiper Belt (>58 AU from the Sun)",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Arrokoth Contact Binary", text: "Two primordial planetesimals fused together at the dawn of time." },
    ],
  },
];

export const GALILEO_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Voyage to the Giant",
    date: "1977 – 1989",
    narration: [
      "I was Galileo, named after the Florentine father of observational astronomy who first discovered Jupiter's four giant moons in 1610.",
      "Launched on 18 October 1989 from Space Shuttle Atlantis, I carried a 339-kilogram atmospheric probe designed to plunge into Jupiter's crushing clouds.",
      "When my giant 4.8-meter high-gain antenna failed to unfold, my engineers back on Earth brilliantly reprogrammed my computers to compress data through my tiny low-gain antenna, saving the mission.",
    ],
    scienceTitle: "Galileo Dual-Spin Spacecraft and Telemetry Triumph",
    science:
      "Galileo used a dual-spin design (spinning rotor for field sensors, despun platform for cameras). Ground engineers at JPL developed custom Lossless and JPEG data compression to operate across low-gain radio links at 160 bits/second.",
    facts: [
      "Launch: 18 October 1989 on STS-34 Atlantis",
      "Total Mass: 2,562 kg",
      "Mission Innovation: Rescued entire scientific mission using reprogrammed software compression",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Jupiter Atmospheric Probe", text: "Mounted to the spinning bus, designed for Mach 50 entry." },
    ],
  },
  {
    id: "probe",
    number: "02",
    title: "Diving into the Abyss",
    date: "7 December 1995",
    narration: [
      "On 7 December 1995, my atmospheric probe slammed into Jupiter's atmosphere at 170,000 km/h — experiencing deceleration forces of 228 Gs.",
      "Its heat shield glowed brighter than the surface of the Sun as it withstood temperatures of 15,000°C.",
      "For 58 minutes, it parachuted down through 150 kilometers of swirling hydrogen and helium clouds, measuring howling 600 km/h winds and terrifying lightning storms before being crushed by 23 atmospheres of pressure.",
    ],
    scienceTitle: "First In-Situ Entry into a Gas Giant Atmosphere",
    science:
      "The Galileo probe measured atmospheric composition, finding helium abundance (24% by mass) matching solar nebular models, helium depletion in upper layers, and unexpectedly dry conditions in a local downdraft hotspot.",
    facts: [
      "Entry Velocity: 47.4 km/s (170,000 km/h) — fastest planetary entry ever",
      "Deceleration Peak: 228 Gs",
      "Telemetry Return: 58 minutes of data down to 23 bars (156 km depth)",
    ],
    hotspots: [
      { x: 50, y: 60, label: "Jupiter Cloud Tops", text: "Parachute descent into churning hydrogen-helium storms." },
    ],
  },
  {
    id: "ocean",
    number: "03",
    title: "Discovering Europa's Hidden Ocean",
    date: "1996 – 2003 & Legacy",
    narration: [
      "In orbit around Jupiter, I made a discovery that transformed planetary biology forever.",
      "As I skimmed past icy Europa, my magnetometer detected induced magnetic fields from an electrical conductor beneath the ice: a warm, global, saltwater ocean containing more liquid water than all of Earth's oceans combined!",
      "On 21 September 2003, having spent my fuel, NASA deliberately plunged me into Jupiter's atmosphere to ensure I would never crash into Europa and contaminate its alien ocean.",
    ],
    scienceTitle: "Discovery of Europa's Subsurface Ocean and End of Mission",
    science:
      "Galileo proved Europa possesses a 100-km-deep liquid saltwater ocean beneath an icy shell, confirmed active sulfur volcanism on Io with 100+ active volcanic centers, and discovered Ganymede possesses its own intrinsic magnetic dynamo.",
    facts: [
      "Major Breakthrough: Proof of global liquid ocean beneath Europa's ice",
      "Other Moons: Discovered Ganymede's intrinsic magnetic field; photographed volcanic eruptions on Io",
      "End of Mission: Intentional atmospheric impact into Jupiter on 21 September 2003",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Europa's Fractured Ice", text: "Crisscrossing red cycloids overlying a warm liquid ocean." },
    ],
  },
];

export const MESSENGER_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Into the Sun's Cauldron",
    date: "1999 – 2004",
    narration: [
      "Mercury was the least explored terrestrial world in the solar system. To orbit the innermost planet, a spacecraft must battle the fierce gravitational pull of the Sun.",
      "I was MESSENGER — Mercury Surface, Space Environment, Geochemistry, and Ranging.",
      "To survive solar radiation eleven times more intense than at Earth, my engineers wrapped me in a ceramic fabric sunshade that withstood temperatures of 450°C, while keeping my scientific instruments operating at room temperature behind it.",
    ],
    scienceTitle: "Thermal Protection Sunshade and Orbital Insertion Maneuver",
    science:
      "MESSENGER used a Nextel ceramic fabric sunshade to shield instruments from solar fluxes up to 11 kW/m2. Achieving Mercury orbit required six complex gravity assist flybys (1 Earth, 2 Venus, 3 Mercury).",
    facts: [
      "Launch: 3 August 2004 aboard Delta II Heavy",
      "Sunshade Temperature: 450°C on sunlit side; +20°C behind shade",
      "Gravity Assists: 6 planetary flybys across 7.9 billion km to decelerate",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Nextel Sunshade", text: "Ceramic thermal shield facing the blazing Sun." },
    ],
  },
  {
    id: "ice",
    number: "02",
    title: "Water Ice in the Hell of Mercury",
    date: "2011 – 2015",
    narration: [
      "On 18 March 2011, I became the first spacecraft to enter orbit around Mercury.",
      "On a planet where daytime temperatures soar to 430°C, my neutron spectrometer peered into the pitch-black shadows of deep polar impact craters where the Sun never shines.",
      "There, in eternal darkness at -180°C, I discovered billions of metric tons of pure water ice and dark carbonaceous organic compounds delivered by comets.",
    ],
    scienceTitle: "Confirmation of Permanent Polar Water Ice",
    science:
      "MESSENGER's Neutron Spectrometer and Mercury Laser Altimeter (MLA) confirmed that radar-bright features in permanently shadowed craters (like Prokofiev and Kandinsky) consist of water ice topped by organic volatiles.",
    facts: [
      "Polar Ice Mass: Estimated 100 billion to 1 trillion tons of water ice",
      "Crater Temperatures: Stable at -173°C in permanent shadows",
      "Surprise Finding: High surface volatile content (potassium, sulfur, chlorine) disproved high-temperature formation models",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Polar Shadow Craters", text: "Freezing craters holding frozen water ice next to scorching plains." },
    ],
  },
  {
    id: "impact",
    number: "03",
    title: "Impact on the Scorched Plains",
    date: "30 April 2015 & Legacy",
    narration: [
      "Over four years in orbit, I completed 4,104 orbits, mapping 100% of Mercury's cratered surface in high resolution.",
      "On 30 April 2015, having consumed every drop of my hydrazine propellant, I plunged into the northern volcanic plains of Mercury at 14,000 km/h.",
      "I carved a fresh 16-meter impact crater near Shakespeare Basin, leaving behind my final mark on the innermost world.",
    ],
    scienceTitle: "End of Mission Impact and Scientific Legacy",
    science:
      "MESSENGER proved Mercury has a huge iron core occupying 85% of planetary radius, possesses an active offset magnetic dynamo, and experienced widespread ancient volcanic flooding.",
    facts: [
      "Total Orbits: 4,104 orbits around Mercury",
      "Impact Speed: 14,000 km/h (3.91 km/s)",
      "Impact Location: 54.4° N, 210.1° E on the northern volcanic plains",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Shakespeare Basin Plains", text: "Final resting site of MESSENGER on Mercury." },
    ],
  },
];

export const MAGELLAN_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Peering Through the Sulfuric Veil",
    date: "1985 – 1989",
    narration: [
      "Venus is Earth's twisted twin — wrapped in crushing clouds of sulfuric acid with surface pressures 92 times that of Earth and temperatures that melt lead.",
      "Optical cameras could only see a featureless white haze. I was Magellan, equipped with Synthetic Aperture Radar (SAR) designed to beam radar pulses right through the clouds and photograph the hidden land beneath.",
      "To save cost, my engineers assembled me from spare parts: my 3.7-meter antenna came from Voyager, and my computers came from Galileo.",
    ],
    scienceTitle: "Synthetic Aperture Radar (SAR) Mapping Architecture",
    science:
      "Magellan's radar operated at 12.6 cm wavelength (2.38 GHz), functioning as SAR (mapping 120m resolution), radar altimeter (topography), and radiometer (thermal emissivity).",
    facts: [
      "Launch: 4 May 1989 on STS-30 Space Shuttle Atlantis",
      "Spacecraft Mass: 3,460 kg",
      "Spare Parts Heritage: High-gain antenna from Voyager; thruster module from Galileo",
    ],
    hotspots: [
      { x: 50, y: 40, label: "3.7m Radar Dish", text: "Beamed 2.38 GHz radar pulses through the sulfuric clouds." },
    ],
  },
  {
    id: "mapping",
    number: "02",
    title: "Revealing the Volcanic World",
    date: "1990 – 1994",
    narration: [
      "On 10 August 1990, I slipped into Venusian orbit. Over four years, my radar stripped away the veil, mapping 98% of the surface with astonishing clarity.",
      "I revealed a nightmare paradise of volcanism: towering shield volcanoes like Maat Mons, giant circular crown structures called 'coronae', rivers of molten lava thousands of miles long, and pancake lava domes.",
      "I found surprisingly few impact craters across the globe, proving that a massive catastrophic resurfacing event repaved the entire planet within the last 500 million years.",
    ],
    scienceTitle: "Venusian Global Resurfacing and Geodynamics",
    science:
      "Magellan revealed over 85% of Venus is covered by volcanic plains with ~1,000 impact craters randomly distributed, leading to the hypothesis of episodic catastrophic global crustal overturn.",
    facts: [
      "Global Coverage: 98% of Venus mapped at 100m to 300m resolution",
      "Volcanic Features: Over 1,600 major volcanoes and volcanic fields identified",
      "Longest Lava Channel: Baltis Vallis (6,800 km long, longer than the Nile River)",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Maat Mons Volcano", text: "8-km high massive shield volcano with recent lava flows." },
      { x: 70, y: 65, label: "Pancake Domes", text: "Steep-sided viscous volcanic mounds found only on Venus." },
    ],
  },
  {
    id: "aerobraking",
    number: "03",
    title: "The Windmill Plunge",
    date: "1994 & Legacy",
    narration: [
      "In 1993, I performed the first planetary aerobraking maneuver in history, dipping into the upper fringes of the Venusian atmosphere to circularize my orbit without burning propellant.",
      "In October 1994, with my mission triumphant, my controllers commanded the 'Windmill Experiment': tilting my solar panels like windmill sails to measure aerodynamic drag.",
      "On 13 October 1994, I dove deep into the furnace of Venus. The dense atmosphere ripped away my solar wings, and I vaporized into the clouds, forever immortalized as the mapper of Venus.",
    ],
    scienceTitle: "First Demonstration of Planetary Aerobraking",
    science:
      "Magellan demonstrated that atmospheric drag can circularize eccentric orbits, saving hundreds of kilograms of fuel. This technique was subsequently adopted by Mars Global Surveyor, Odyssey, and MRO.",
    facts: [
      "Aerobraking Demonstration: First operational planetary aerobraking (1993)",
      "Final Plunge: 13 October 1994",
      "Legacy: Returned more data than all previous planetary missions combined",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Venusian Atmosphere", text: "Magellan vaporized in the dense CO2 and sulfuric acid skies." },
    ],
  },
];

export const PIONEER_VENUS_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Five-in-One Fleet",
    date: "1977 – 1978",
    narration: [
      "To unravel the mystery of Venus' runaway greenhouse climate, NASA planned a daring multi-probe assault.",
      "I was the Pioneer Venus Multiprobe. I consisted of a mother carrier bus holding four detachable probes: one Large Probe and three identical Small Probes nicknamed North, Day, and Night.",
      "Launched on 8 August 1978 atop an Atlas-Centaur rocket, our fleet headed directly for the morning star.",
    ],
    scienceTitle: "Pioneer Venus Multiprobe Architecture",
    science:
      "The carrier bus carried two mass spectrometers. The Large Sounder Probe carried 7 instruments (including cloud particle spectrometers and nephelometers), and the three Small Probes each carried 3 atmospheric sensors.",
    facts: [
      "Launch: 8 August 1978 from Cape Canaveral",
      "Probes: 1 Large Probe (315 kg), 3 Small Probes (90 kg each), 1 Bus (290 kg)",
      "Target: Simultaneous multipoint atmospheric entry across the planet",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Carrier Bus", text: "Cylindrical bus carrying the four aerodynamic entry probes." },
      { x: 35, y: 65, label: "Large Probe", text: "Equipped with parachute, carbon-carbon nosecone, and mass spectrometers." },
    ],
  },
  {
    id: "entry",
    number: "02",
    title: "Simultaneous Descent into Hell",
    date: "9 December 1978",
    narration: [
      "On 9 December 1978, all four probes plunged into the Venusian atmosphere within eleven minutes of each other, scattered across thousands of miles.",
      "Our sensors braved 460°C heat, sulfuric acid haze droplets, and crushing atmospheric pressures.",
      "We discovered that Venus' dense atmosphere is 96.5% carbon dioxide, confirmed a catastrophic runaway greenhouse effect, and detected high deuterium-to-hydrogen ratios — proving Venus once possessed an ocean of liquid water that evaporated away into space.",
    ],
    scienceTitle: "Discovery of Ancient Venusian Water Oceans",
    science:
      "Pioneer Venus detected a D/H ratio 150 times higher than Earth, demonstrating massive atmospheric water loss and proving Venus was once a temperate world with ancient oceans before runaway greenhouse warming.",
    facts: [
      "Entry Speed: 41,600 km/h (11.6 km/s)",
      "Atmospheric Finding: 96.5% CO2, sulfuric acid cloud layers at 48 to 68 km altitude",
      "Surface Survival: The 'Day Probe' survived impact at 35 km/h and transmitted for 67 minutes from the scorching ground!",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Venusian Cloud Decks", text: "Three distinct sulfuric acid cloud layers sampled during descent." },
    ],
  },
];

export const VOYAGER2_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Grand Tour of the Solar System",
    date: "1977 – 1979",
    narration: [
      "Once every 176 years, the four giant outer planets — Jupiter, Saturn, Uranus, and Neptune — align in a geometric arc.",
      "I was Voyager 2, launched on 20 August 1977 — sixteen days before my twin Voyager 1. My mission was the legendary 'Grand Tour'.",
      "Like my twin, I carried the Golden Record: a phonograph of sounds, greetings in 55 human languages, and music from Bach to Chuck Berry, addressed to any intelligent civilization that might find me.",
    ],
    scienceTitle: "Planetary Alignment and Gravity Assist Trajectory",
    science:
      "Voyager 2 exploited the rare late-1970s geometric alignment, using successive gravity assists from Jupiter and Saturn to slingshot outward to Uranus and Neptune without needing large propulsion systems.",
    facts: [
      "Launch: 20 August 1977 on Titan IIIE/Centaur",
      "Unique Feat: Only spacecraft in human history to visit Uranus and Neptune",
      "Golden Record: 12-inch gold-plated copper disc containing humanity's story",
    ],
    hotspots: [
      { x: 50, y: 35, label: "3.7m High-Gain Antenna", text: "Parabolic reflector pointed continuously toward Earth." },
      { x: 70, y: 60, label: "Golden Record", text: "Gold-plated time capsule carrying human culture into eternity." },
    ],
  },
  {
    id: "icegiants",
    number: "02",
    title: "Uranus and Neptune: The Ice Giants",
    date: "1986 – 1989",
    narration: [
      "In January 1986, I became the first and only spacecraft to visit Uranus, discovering ten new moons, two new rings, and measuring its bizarre tilted magnetic field.",
      "In August 1989, I reached Neptune, twelve years after leaving Earth. I discovered the roaring 'Great Dark Spot' with 2,000 km/h winds — the fastest winds in the solar system.",
      "At Neptune's frozen moon Triton, I photographed active geysers erupting black nitrogen gas and dust eight kilometers up into the freezing vacuum.",
    ],
    scienceTitle: "First Reconnaissance of the Ice Giants",
    science:
      "Voyager 2 discovered that Uranus' magnetic dipole is tilted 59 degrees from its rotational axis, and Neptune possesses an internal heat source driving supersonic winds (up to 2,100 km/h) and cryovolcanism on Triton.",
    facts: [
      "Uranus Flyby: 24 January 1986 (discovered 10 new moons, 2 rings)",
      "Neptune Flyby: 25 August 1989 (discovered Great Dark Spot and 5 new moons)",
      "Triton Geysers: First active cryovolcanism photographed in the outer solar system",
    ],
    hotspots: [
      { x: 35, y: 50, label: "Neptune & Dark Spot", text: "Brilliant azure gas giant with supersonic storm systems." },
      { x: 65, y: 65, label: "Triton Nitrogen Geysers", text: "Erupting black plumes across cantaloupe terrain." },
    ],
  },
  {
    id: "interstellar",
    number: "03",
    title: "Into the Interstellar Void",
    date: "5 November 2018 & Forever",
    narration: [
      "On 5 November 2018, my instruments detected a sudden drop in solar wind particles and a dramatic surge in galactic cosmic rays.",
      "I had crossed the heliopause — the protective magnetic bubble blown by our Sun — and entered interstellar space, 18 billion kilometers from Earth.",
      "Because my plasma science instrument was still functioning (unlike Voyager 1's), I returned the first direct measurements of the interstellar medium's true density and temperature. I will drift through the Milky Way for billions of years.",
    ],
    scienceTitle: "Heliopause Crossing and Interstellar Plasma Measurements",
    science:
      "Voyager 2's functional PLS (Plasma Science) instrument proved that the heliopause is an extraordinarily sharp boundary where cold, dense interstellar plasma (~30,000K, 0.05 cm-3) collides with hot, tenuous solar wind.",
    facts: [
      "Heliopause Crossing: 5 November 2018 at 119 AU from the Sun",
      "Current Distance: >20 billion km (>135 AU)",
      "Future Encounter: Will pass star Ross 248 within 1.7 light-years in ~40,000 years",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Interstellar Medium", text: "The vast galactic void between the stars." },
    ],
  },
];

export const PIONEER10_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "First Beyond the Asteroid Belt",
    date: "1970 – 1972",
    narration: [
      "Before me, no human spacecraft had ever dared to venture beyond the orbit of Mars. Scientists feared the Asteroid Belt was an impassable wall of cosmic debris that would shred any probe.",
      "I was Pioneer 10. Weighing just 258 kilograms, I was launched on 2 March 1972 atop an Atlas-Centaur rocket.",
      "Mounted to my antenna strut was a gold-anodized aluminum plaque designed by Carl Sagan and Frank Drake, showing human figures, our solar system, and a map of pulsars locating Earth in space.",
    ],
    scienceTitle: "First Outer Solar System Explorer",
    science:
      "Pioneer 10 carried 11 instruments powered by four SNAP-19 RTGs, designed to measure interplanetary magnetic fields, cosmic rays, asteroid belt debris density, and Jupiter's radiation belts.",
    facts: [
      "Launch: 2 March 1972 from Cape Canaveral",
      "First Feat: First spacecraft to traverse the Asteroid Belt safely (1972–1973)",
      "Pioneer Plaque: Gold-anodized plaque carrying humanity's pictorial greeting",
    ],
    hotspots: [
      { x: 50, y: 35, label: "2.7m Parabolic Dish", text: "High-gain dish antenna keeping contact with Earth." },
      { x: 70, y: 60, label: "Pioneer Plaque", text: "Gold plaque with human figures and hydrogen atom transition map." },
    ],
  },
  {
    id: "jupiter",
    number: "02",
    title: "First Glimpse of the King of Planets",
    date: "3 December 1973",
    narration: [
      "On 3 December 1973, I passed safely through the Asteroid Belt and arrived at Jupiter, flying within 130,000 kilometers of its cloud tops.",
      "I survived radiation belts ten thousand times stronger than Earth's Van Allen belts, proving that robotic spacecraft could survive Jupiter's lethal magnetosphere.",
      "I beamed back the first close-up photographs of Jupiter's swirling Great Red Spot and discovered that the giant planet radiates twice as much heat as it receives from the Sun.",
    ],
    scienceTitle: "First Close-Up Exploration of Jupiter",
    science:
      "Pioneer 10 mapped Jupiter's magnetosphere, proved it is composed largely of liquid metallic hydrogen, and utilized Jupiter's gravity to achieve solar system escape velocity on a hyperbolic trajectory.",
    facts: [
      "Closest Approach: 132,252 km from Jupiter cloud tops",
      "Radiation Dose: Survived 1,000 times the lethal human dose of ionizing radiation",
      "Escape Trajectory: Accelerated to 132,000 km/h, heading toward the star Aldebaran",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Jupiter's Great Red Spot", text: "First close-up imaging of the ancient swirling anticyclone." },
    ],
  },
  {
    id: "voyage",
    number: "03",
    title: "Silent Drifter Toward Aldebaran",
    date: "1983 – 2003 & Forever",
    narration: [
      "On 13 June 1983, I crossed the orbit of Neptune — at the time the outermost planet — becoming the first human craft to leave the known planetary system.",
      "For thirty years I radioed scientific telemetry back to Earth. On 23 January 2003, my very last whisper — an unmodulated carrier tone — was detected by the Deep Space Network from 12 billion kilometers away.",
      "I am drifting silently toward the red giant star Aldebaran in the constellation Taurus. It will take me two million years to arrive. I carry humanity's eternal hello.",
    ],
    scienceTitle: "Longest Planetary Telemetry Link",
    science:
      "Pioneer 10 operated for over 30 years powered by decaying plutonium-238 RTGs. Its telemetry provided the first clues of the heliosphere's true scale and the Pioneer Anomaly.",
    facts: [
      "First Past Neptune: 13 June 1983",
      "Final Signal: 23 January 2003 (over 12 billion km away)",
      "Destination: Passing red giant Aldebaran in ~2,000,000 years",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Deep Interstellar Space", text: "Drifting toward the constellation Taurus with the Pioneer Plaque." },
    ],
  },
];

export const PIONEER11_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Sister Scout",
    date: "1972 – 1973",
    narration: [
      "I was Pioneer 11, the sister spacecraft of Pioneer 10, launched on 6 April 1973.",
      "My mission was even bolder: fly past Jupiter, use its immense gravity to perform a hairpin slingshot turn across the solar system, and fly to Saturn to scout its rings before Voyager arrived.",
      "I carried my own copy of the Golden Pioneer Plaque, bearing our greeting to the stars.",
    ],
    scienceTitle: "First Interplanetary Slingshot Between Giant Planets",
    science:
      "Pioneer 11 used Jupiter's gravity to boost its orbital inclination and reverse direction, executing the first successful gravity-assist retargeting between two different outer gas giants.",
    facts: [
      "Launch: 6 April 1973 on Atlas-Centaur",
      "Payload: 11 instruments including magnetometer, plasma analyzer, and imaging photopolarimeter",
      "Flight Path: Earth -> Asteroid Belt -> Jupiter -> Saturn -> Deep Space",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Pioneer 11 Bus", text: "Spin-stabilized probe with high-gain dish and RTG booms." },
    ],
  },
  {
    id: "saturn",
    number: "02",
    title: "First Touch with Saturn's Rings",
    date: "1 September 1979",
    narration: [
      "On 1 September 1979, I made history: I became the first spacecraft ever to visit Saturn.",
      "I passed just 21,000 kilometers above Saturn's cloud tops, dodging ring particles at 114,000 km/h.",
      "I discovered Saturn's narrow outermost F ring, mapped its magnetic field, and discovered two new moons — Epimetheus and Janus — clearing the safe pathway for the Voyager spacecraft following behind me.",
    ],
    scienceTitle: "First Reconnaissance of Saturn and Ring Discovery",
    science:
      "Pioneer 11 discovered Saturn's F-ring, measured Saturn's magnetic field as being nearly perfectly aligned with its rotational axis, and found that Titan has an atmosphere too cold to support liquid water.",
    facts: [
      "Closest Approach: 20,591 km from Saturn cloud tops",
      "Major Discovery: Discovered Saturn's F Ring and new moons Epimetheus and Janus",
      "Voyager Pathfinder: Proved passing near the rings was safe for Voyager 1 and 2",
    ],
    hotspots: [
      { x: 50, y: 45, label: "Saturn's F Ring", text: "Narrow dynamic outer ring discovered by Pioneer 11." },
    ],
  },
  {
    id: "legacy",
    number: "03",
    title: "Drifting Toward Aquila",
    date: "1995 & Forever",
    narration: [
      "On 30 September 1995, with my RTG power cells depleted and my orientation thrusters exhausted, NASA bade me farewell.",
      "I stopped transmitting, but my momentum carries me forward through the galaxy at eleven kilometers per second.",
      "I am traveling toward the constellation Aquila the Eagle. In four million years, I will pass near one of its stars, carrying humanity's mark into eternity.",
    ],
    scienceTitle: "End of Operations and Interstellar Trajectory",
    science:
      "Pioneer 11 completed 22 years of continuous scientific operations. It is on a hyperbolic escape trajectory at ~11.2 km/s (2.37 AU/year) toward the constellation Aquila.",
    facts: [
      "Final Contact: 30 September 1995",
      "Current Distance: >16 billion km from Earth",
      "Destination: Constellation Aquila (The Eagle)",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Constellation Aquila", text: "Pioneer 11's eternal journey into interstellar space." },
    ],
  },
];

export const DEEP_SPACE_EXTRA_STORIES: MissionStoryMeta[] = [
  {
    artifactId: "cassini",
    title: "Cassini: 20 Years at the Ringed Jewel",
    subtitle: "NASA / ESA / ASI · 1997–2017 · Saturn",
    agency: "NASA",
    heroTagline: "Discovered oceans inside Enceladus, mapped Titan's methane lakes, and completed the Grand Finale plunge.",
    stagesCount: 4,
    durationMinutes: "4 min",
    destination: "Saturn & Its Moons",
    stages: CASSINI_STORY,
  },
  {
    artifactId: "new-horizons",
    title: "New Horizons: Journey to Pluto and the Kuiper Belt",
    subtitle: "NASA · 2006–Present · Kuiper Belt",
    agency: "NASA",
    heroTagline: "Fastest launch from Earth. Revealed Pluto's frozen heart and flew past primitive Arrokoth.",
    stagesCount: 4,
    durationMinutes: "4 min",
    destination: "Pluto & Outer Kuiper Belt",
    stages: NEWHORIZONS_STORY,
  },
  {
    artifactId: "galileo",
    title: "Galileo: Revealing Jupiter's Ocean Moons",
    subtitle: "NASA · 1989–2003 · Jupiter",
    agency: "NASA",
    heroTagline: "Dropped a probe into Jupiter's clouds, discovered Europa's ocean, and plunged into Jupiter.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Jupiter & Europa",
    stages: GALILEO_STORY,
  },
  {
    artifactId: "messenger",
    title: "MESSENGER: Conquering the Furnace of Mercury",
    subtitle: "NASA · 2004–2015 · Mercury",
    agency: "NASA",
    heroTagline: "First Mercury orbiter. Discovered water ice inside permanent shadows of the scorching planet.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Mercury",
    stages: MESSENGER_STORY,
  },
  {
    artifactId: "magellan",
    title: "Magellan: Radar Mapping the Veiled Furnace",
    subtitle: "NASA · 1989–1994 · Venus",
    agency: "NASA",
    heroTagline: "Mapped 98% of Venus through sulfuric clouds using radar, revealing its violent volcanic crust.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Venus",
    stages: MAGELLAN_STORY,
  },
  {
    artifactId: "pioneer-venus-multiprobe",
    title: "Pioneer Venus: The Four-Probe Assault",
    subtitle: "NASA · 1978 · Venus",
    agency: "NASA",
    heroTagline: "Simultaneous 4-probe descent through Venus' clouds, discovering evidence of ancient oceans.",
    stagesCount: 2,
    durationMinutes: "2 min",
    destination: "Venus Atmosphere",
    stages: PIONEER_VENUS_STORY,
  },
  {
    artifactId: "voyager-2",
    title: "Voyager 2: The Grand Tour of Four Giants",
    subtitle: "NASA · 1977–Present · Interstellar Space",
    agency: "NASA",
    heroTagline: "The only spacecraft to visit Uranus and Neptune, now sailing beyond the heliopause.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Uranus, Neptune & Interstellar Space",
    stages: VOYAGER2_STORY,
  },
  {
    artifactId: "pioneer-10",
    title: "Pioneer 10: First Beyond the Asteroid Belt",
    subtitle: "NASA · 1972–2003 · Interstellar Space",
    agency: "NASA",
    heroTagline: "First across the Asteroid Belt, first past Jupiter, carrying Carl Sagan's Golden Plaque to Aldebaran.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Interstellar Space (Constellation Taurus)",
    stages: PIONEER10_STORY,
  },
  {
    artifactId: "pioneer-11",
    title: "Pioneer 11: First Explorer of Saturn's Rings",
    subtitle: "NASA · 1973–1995 · Interstellar Space",
    agency: "NASA",
    heroTagline: "Hairpin slingshot past Jupiter to become humanity's first scout at Saturn and its F-ring.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Saturn & Interstellar Space (Constellation Aquila)",
    stages: PIONEER11_STORY,
  },
];

