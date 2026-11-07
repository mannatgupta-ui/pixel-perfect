import type { StoryStage } from "../spirit";
import type { MissionStoryMeta } from "../multiStories";

/* ────────────────────────────────────────────────────────────────
 * Moon Mission Stories: Curated first-person narratives
 * ──────────────────────────────────────────────────────────────── */

export const CHANDRAYAAN2_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "India's Moonshot",
    date: "2018 – 2019",
    narration: [
      "I was the Vikram lander of Chandrayaan-2, carrying Pragyan the rover inside my chest.",
      "Engineered by ISRO under Chairman Dr. K. Sivan, my mission was daring: to attempt the first soft landing by any nation within 600 kilometers of the Moon's South Pole.",
      "On 22 July 2019, India's GSLV Mk III rocket launched us into space, beginning our long translunar journey.",
    ],
    scienceTitle: "Chandrayaan-2 Integrated Mission Architecture",
    science:
      "Chandrayaan-2 comprised an Orbiter (carrying OHRC, CLASS, and IIRS) and an integrated Vikram Lander/Pragyan Rover. The Orbiter continues to operate successfully today with the highest resolution optical camera in lunar orbit.",
    facts: [
      "Launch: 22 July 2019 from SDSC SHAR, Sriharikota",
      "Launch Mass: 3,850 kg (Orbiter + Lander)",
      "Target Landing: 70.9° S, 22.7° E between Simpelius N and Manzinus C",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Vikram Lander", text: "Four throttleable 800N liquid rocket engines with central braking motor." },
    ],
  },
  {
    id: "descent",
    number: "02",
    title: "The Final Two Kilometers",
    date: "6 September 2019",
    narration: [
      "At 01:38 IST on 7 September 2019, my autonomous braking engines ignited over the lunar south pole.",
      "The rough braking phase was flawless, bringing me from 30 kilometers down to 2.1 kilometers above the cratered regolith.",
      "During the fine braking transition, a software timing glitch caused my thrusters to exceed their maximum control parameters. As telemetry froze in Bengaluru, I impacted the lunar highland soil at 70° South.",
    ],
    scienceTitle: "Descent Telemetry and Fine Braking Anomaly",
    science:
      "An ISRO Failure Analysis Committee found that software logic in the closed-loop guidance could not compensate for unexpected velocity errors within the narrow corridor, causing trajectory deviation in the final 2.1 km.",
    facts: [
      "Loss of Signal: 2.1 km above the lunar surface",
      "Impact Site: 70.8810° S, 22.7840° E (located by NASA LRO and Shanmuga Subramanian)",
      "Orbiter Status: Fully functional in lunar orbit, returning 0.32 m resolution photography",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Tiranga Point", text: "Honorable impact site of Vikram on the lunar south pole highlands." },
    ],
  },
  {
    id: "legacy",
    number: "03",
    title: "The Foundation of Victory",
    date: "2019 – 2023 & Forever",
    narration: [
      "That night, a nation wept — and then resolved to try again.",
      "My sacrifice taught ISRO every vital lesson: stronger legs, laser velocimeters, more fuel, wider software margins.",
      "Four years later, Chandrayaan-3 used my high-resolution orbital maps to touch down victoriously at Shiv Shakti Point. I was the bridge that carried India to the Moon.",
    ],
    scienceTitle: "Paving the Way for Chandrayaan-3 Success",
    science:
      "Chandrayaan-2's orbiter provided critical landing site hazard maps for Chandrayaan-3, and its failure analysis directly drove the redundant sensor and wider velocity margin upgrades of Vikram-2.",
    facts: [
      "Orbiter Lifespan: Designed for 1 year; operating for 7+ years",
      "Resolution: OHRC captures 32 cm per pixel (sharper than any other orbiter)",
      "Site Name: Designated Tiranga Point by Prime Minister Narendra Modi",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Lunar Southern Highlands", text: "The rugged terrain where India's lunar journey began." },
    ],
  },
];

export const CHANDRAYAAN1_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "India's First Step to the Stars",
    date: "2003 – 2008",
    narration: [
      "I was Chandrayaan-1, India's very first interplanetary mission, conceptualized under Dr. K. Kasturirangan and launched under Dr. G. Madhavan Nair.",
      "Carried atop the reliable PSLV-C11 rocket on 22 October 2008, I carried eleven scientific instruments from India, NASA, and ESA.",
      "Mounted on my top deck was a 34-kilogram projectile: the Moon Impact Probe (MIP), painted proudly with the Indian tricolor.",
    ],
    scienceTitle: "Chandrayaan-1 International Scientific Suite",
    science:
      "Chandrayaan-1 hosted NASA's Moon Mineralogy Mapper (M3) and Miniature Synthetic Aperture Radar (Mini-SAR), along with ISRO's Terrain Mapping Camera (TMC) and Moon Impact Probe (MIP).",
    facts: [
      "Launch: 22 October 2008 atop PSLV-C11 from Sriharikota",
      "Total Launch Mass: 1,380 kg",
      "Instruments: 11 payloads (5 Indian, 6 international)",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Moon Impact Probe", text: "34 kg probe painted with the Indian flag mounted on top." },
    ],
  },
  {
    id: "impact",
    number: "02",
    title: "Striking the South Pole",
    date: "14 November 2008",
    narration: [
      "On 14 November 2008, at 20:06 IST, the Moon Impact Probe detached from my orbiter.",
      "As it plummeted for 25 minutes toward the lunar south pole, its mass spectrometer sniffed the tenuous lunar atmosphere, detecting water vapor escaping from the regolith.",
      "At 20:31 IST, it struck the rim of Shackleton Crater. The site was named Jawahar Point — India had planted its tricolor on the Moon.",
    ],
    scienceTitle: "Moon Impact Probe Atmospheric Mass Spectrometry",
    science:
      "The Chandra's Alternative Composition Explorer (CHACE) quadrupole mass spectrometer on MIP recorded 650 mass spectra during descent, providing the first in-situ signatures of lunar water molecules.",
    facts: [
      "Impact Site: Shackleton Crater rim, South Pole (89.9° S)",
      "Site Name: Jawahar Point",
      "Descent Duration: 25 minutes of continuous atmospheric data",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Shackleton Crater", text: "Permanently shadowed south polar crater harboring water ice." },
    ],
  },
  {
    id: "water",
    number: "03",
    title: "Discovering Water on the Moon",
    date: "2008 – 2009 & Legacy",
    narration: [
      "From orbit, the Moon Mineralogy Mapper (M3) detected absorption features at 2.8 to 3.0 microns across polar latitudes — the unmistakable spectral signature of hydroxyl and water molecules.",
      "For four decades, the Moon was thought to be bone-dry. My mission proved that the Moon holds billions of tons of water ice locked inside permanently shadowed polar craters.",
      "That single discovery transformed the Moon from a barren wasteland into humanity's future stepping stone to Mars.",
    ],
    scienceTitle: "Discovery of Lunar Water Ice and Hydration",
    science:
      "Data published in Science (September 2009) by ISRO and NASA scientists confirmed widespread hydroxyl (OH) and water (H2O) molecules on the lunar surface, concentrated toward high latitudes.",
    facts: [
      "Key Discovery: Water molecules across lunar surface and ice in polar cold traps",
      "Impact on Space Exploration: Reoriented global lunar exploration toward the South Pole (Artemis, Chandrayaan-3)",
      "Orbits Completed: Over 3,400 orbits before communication ended in August 2009",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Lunar Water Signatures", text: "Infrared 3-micron absorption bands confirming water molecules." },
    ],
  },
];

export const SMART1_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Europe's Ion Drive Pioneer",
    date: "1999 – 2003",
    narration: [
      "I was SMART-1 — Small Missions for Advanced Research in Technology 1 — the European Space Agency's first mission to the Moon.",
      "I didn't carry huge chemical rocket tanks. Instead, my heart was a futuristic solar-electric Hall-effect ion thruster powered by just 82 kilograms of xenon gas.",
      "My thruster produced just 70 millinewtons of thrust — the equivalent force of holding a single sheet of paper on your palm. But it could burn continuously for months on end.",
    ],
    scienceTitle: "Hall-Effect Solar Electric Propulsion (PPS-1350)",
    science:
      "SMART-1 demonstrated the Snecma PPS-1350 Hall-effect thruster, ionizing xenon gas with 1,350 watts of solar power to achieve an exhaust velocity of 16.4 km/s, far exceeding chemical rockets.",
    facts: [
      "Launch: 27 September 2003 on Ariane 5 from Kourou",
      "Dry Mass: 287 kg; Xenon Propellant: 82.5 kg",
      "Agency: European Space Agency (ESA)",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Ion Thruster Glow", text: "Electric blue beam of accelerated xenon ions." },
      { x: 25, y: 35, label: "Solar Wings", text: "Twin solar wings producing 1.85 kW of electrical power." },
    ],
  },
  {
    id: "spiral",
    number: "02",
    title: "The 14-Month Cosmic Spiral",
    date: "2003 – 2004",
    narration: [
      "For fourteen months, my electric blue ion engine fired silently in the void, slowly expanding my orbit around the Earth.",
      "Riding gravity assists from the Moon, I gracefully slipped into lunar orbit in November 2004 using only 60 kilograms of propellant.",
      "My X-ray spectrometer D-CIXS mapped the chemical elements of the lunar crust, detecting magnesium, aluminum, and silicon across the highlands.",
    ],
    scienceTitle: "Lunar Capture and Elemental Mapping",
    science:
      "SMART-1 proved that low-thrust electric propulsion could navigate complex Earth-Moon Lagrange point manifolds, paving the way for missions like BepiColombo and Hayabusa.",
    facts: [
      "Travel Time: 14 months (slowest and most fuel-efficient lunar journey)",
      "Propellant Used: Only ~60 kg of xenon to reach lunar orbit",
      "Instruments: D-CIXS X-ray spectrometer and AMIE compact camera",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Spiral Trajectory", text: "Gradual spiral expansion using continuous ion propulsion." },
    ],
  },
  {
    id: "impact",
    number: "03",
    title: "Impact in the Lake of Excellence",
    date: "3 September 2006",
    narration: [
      "On 3 September 2006, after completing over 2,000 lunar orbits, my planned mission reached its dramatic conclusion.",
      "At 05:42 UTC, I struck the basaltic plain of Lacus Excellentiae at a shallow grazing angle of 1 degree, traveling at 2 kilometres per second.",
      "The kinetic impact created a flash of light visible to ground telescopes on Earth, kicking up subsurface dust and sealing my legacy as Europe's lunar trailblazer.",
    ],
    scienceTitle: "Controlled Kinetic Impact Science",
    science:
      "SMART-1's grazing impact excavated fresh subsurface basalt from Lacus Excellentiae. The Canada-France-Hawaii Telescope (CFHT) photographed the impact flash and dust plume.",
    facts: [
      "Impact Site: Lacus Excellentiae (34.3° S, 46.2° W)",
      "Impact Speed: 2 km/s (7,200 km/h) at a 1° angle",
      "Impact Flash: Observed live by observatories across Earth",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Lacus Excellentiae", text: "'Lake of Excellence' basalt plain where SMART-1 rests." },
    ],
  },
];

export const SURVEYOR3_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Scouting for Apollo",
    date: "1966 – 1967",
    narration: [
      "Before Apollo astronauts could walk on the Moon, scientists had a terrifying fear: what if the lunar surface was covered in deep dust quicksand that would swallow spacecraft whole?",
      "I was Surveyor 3. My mission was to land softly, dig into the lunar dirt with a motorized scoop, and test whether the surface could support the weight of human boots.",
      "I was launched on 17 April 1967 aboard an Atlas-Centaur rocket.",
    ],
    scienceTitle: "Surveyor Program Robotic Engineering",
    science:
      "Built by Hughes Aircraft for JPL, Surveyor landers used solid retrorockets and throttleable vernier engines with radar altimeters to execute the first American automated soft lunar landings.",
    facts: [
      "Launch: 17 April 1967 from Cape Canaveral",
      "Landing Mass: 296 kg",
      "Mission Goal: Test soil bearing strength for Apollo lunar module landings",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Surveyor Frame", text: "Open tubular aluminum tripod with solar mast and high-gain antenna." },
      { x: 35, y: 65, label: "Surface Sampler Scoop", text: "Motorized pantograph scoop that dug the first human trenches on the Moon." },
    ],
  },
  {
    id: "landing",
    number: "02",
    title: "Three Bounces into the Crater",
    date: "20 April 1967",
    narration: [
      "On 20 April 1967, I descended into Oceanus Procellarum — the Ocean of Storms.",
      "Highly reflective rocks confused my landing radar, preventing my vernier engines from cutting off at the programmed height.",
      "I bounced 10 metres high! Then bounced a second time, and finally came to rest tilted at 14 degrees on the gentle inner slope of a small crater.",
    ],
    scienceTitle: "Oceanus Procellarum Touchdown Dynamics",
    science:
      "Surveyor 3 bounced twice before ground controllers manually shut down vernier engines, demonstrating the robust structural resilience of the tripod landing gear on lunar slopes.",
    facts: [
      "Landing Site: Oceanus Procellarum (3.016° S, 23.418° W)",
      "Bounces: Rebounded twice (10m and 3m) before final rest",
      "Slope: Rested on a 14-degree crater slope",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Surveyor Crater", text: "200-metre wide impact crater where Surveyor 3 came to rest." },
    ],
  },
  {
    id: "apollovisit",
    number: "03",
    title: "Visited by Apollo 12",
    date: "19 November 1969 & Forever",
    narration: [
      "For two and a half years, I sat alone in the silent lunar dust.",
      "Then, on 19 November 1969, a golden flying machine descended right beside my crater rim: the Apollo 12 Lunar Module Intrepid.",
      "Astronauts Pete Conrad and Alan Bean walked down into my crater, took photos beside me, and used bolt cutters to remove my TV camera and robotic scoop to carry them back to Earth.",
      "I am the only robotic probe on another world ever visited by human beings.",
    ],
    scienceTitle: "Apollo 12 Pinpoint Landing and Materials Science",
    science:
      "Apollo 12 landed within 160 metres of Surveyor 3. Analysis of the retrieved camera at NASA Ames revealed how space radiation, micro-meteoroids, and solar wind degrade engineering materials over multi-year lunar exposure.",
    facts: [
      "Unique Honor: Only robotic probe on another celestial body visited by humans",
      "Distance to Intrepid: Just 160 metres",
      "Hardware Retrieved: Television camera and soil scoop (now at Smithsonian Air and Space Museum)",
    ],
    hotspots: [
      { x: 45, y: 45, label: "Surveyor 3", text: "Visited by astronauts Pete Conrad and Alan Bean." },
      { x: 70, y: 30, label: "Apollo 12 Intrepid", text: "Landed just 160 metres away on the crater rim." },
    ],
  },
];

export const APOLLO12_STORY: StoryStage[] = [
  {
    id: "launch",
    number: "01",
    title: "Struck by Lightning",
    date: "14 November 1969",
    narration: [
      "Just 36 seconds after our Saturn V rocket lifted off into a stormy sky, lightning struck our rocket, knocking our telemetry and electrical systems offline.",
      "In Mission Control, flight controller John Aaron gave the legendary command: 'Try SCE to AUX'. Pilot Alan Bean flipped the switch, restored telemetry, and saved the mission.",
      "We were on our way to Oceanus Procellarum.",
    ],
    scienceTitle: "Saturn V Atmospheric Electrical Discharge",
    science:
      "The ionic exhaust plume of the Saturn V triggered a cloud-to-ground lightning discharge, disengaging fuel cells. Switching the Signal Conditioning Equipment (SCE) to auxiliary power restored telemetry to ground controllers.",
    facts: [
      "Crew: Charles 'Pete' Conrad, Alan Bean, Richard Gordon",
      "Legendary Call: 'SCE to AUX' by flight controller John Aaron",
      "Launch: 14 November 1969 from Launch Complex 39A",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Saturn V Rocket", text: "363-foot Apollo launch vehicle struck by lightning." },
    ],
  },
  {
    id: "landing",
    number: "02",
    title: "Pinpoint Landing at Surveyor Crater",
    date: "19 November 1969",
    narration: [
      "Apollo 11 had landed four miles off target. NASA needed to prove we could land with surgical precision in mountainous terrain.",
      "Commander Pete Conrad guided our Lunar Module Intrepid manually during final descent, setting us down softly on the rim of Surveyor Crater.",
      "When Conrad hopped down onto the lunar dirt, he joked: 'Whoopie! Man, that may have been a small one for Neil, but that's a long one for me!'",
    ],
    scienceTitle: "First Precision Lunar Touchdown",
    science:
      "Apollo 12 achieved the world's first pinpoint landing within walking distance (160 metres) of a target landmark, validating optical terrain tracking for subsequent landing missions in rugged highlands.",
    facts: [
      "Landing Site: Oceanus Procellarum (3.01239° S, 23.42157° W)",
      "Accuracy: Touched down 160 metres from Surveyor 3",
      "EVA Time: 7 hours, 45 minutes across two moonwalks",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Intrepid Descent Stage", text: "Gold foil four-legged descent stage resting on Oceanus Procellarum." },
    ],
  },
  {
    id: "surveyor",
    number: "03",
    title: "Inspecting Surveyor 3 & ALSEP",
    date: "20 November 1969 & Legacy",
    narration: [
      "We deployed the first nuclear-powered Apollo Lunar Surface Experiments Package (ALSEP), which radioed seismic and solar wind data for eight years.",
      "Then we walked to Surveyor 3, inspected its solar panels, and cut off its camera to bring back to Earth.",
      "When we launched our Ascent Stage back to orbit, our gold descent stage stayed behind — a monument to humanity's growing mastery of precision space navigation.",
    ],
    scienceTitle: "ALSEP Deployment and Long-Term Geophysics",
    science:
      "Apollo 12 deployed the SNAP-27 radioisotope thermoelectric generator (RTG) powering a passive seismometer, lunar surface magnetometer, and solar wind spectrometer that operated until 1977.",
    facts: [
      "Lunar Samples Returned: 34.35 kg of Oceanus Procellarum basalts",
      "ALSEP Lifespan: Operated continuously for 7.8 years",
      "Descent Stage Status: Permanent monument in Oceanus Procellarum",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Intrepid Descent Stage", text: "Permanent monument at Ocean of Storms." },
    ],
  },
];

export const APOLLO14_STORY: StoryStage[] = [
  {
    id: "landing",
    number: "01",
    title: "Redemption at Fra Mauro",
    date: "5 February 1971",
    narration: [
      "Fra Mauro was the destination Apollo 13 never reached. We were sent to finish their mission.",
      "Our Commander was Alan Shepard, America's first man in space, now walking on the Moon ten years after his first 15-minute suborbital hop.",
      "Our Lunar Module Antares touched down on the cratered ridges of Fra Mauro at 09:18 UTC.",
    ],
    scienceTitle: "Fra Mauro Formation Geomorphology",
    science:
      "Fra Mauro is composed of thick ejecta blanket material excavated by the catastrophic ancient asteroid impact that formed Mare Imbrium, offering access to deep lunar crustal layers.",
    facts: [
      "Crew: Alan Shepard, Edgar Mitchell, Stuart Roosa",
      "Commander: Alan Shepard (oldest man to walk on Moon at age 47)",
      "Landing Site: Fra Mauro highlands (3.6453° S, 17.4714° W)",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Antares Descent Stage", text: "Descent stage resting on the rolling ridges of Fra Mauro." },
    ],
  },
  {
    id: "cone",
    number: "02",
    title: "The Climb to Cone Crater & Lunar Golf",
    date: "6 February 1971 & Legacy",
    narration: [
      "We pulled our two-wheeled equipment cart, the Modular Equipment Transporter, up the steep slopes of Cone Crater, searching for the crater rim in the disorienting lunar glare.",
      "Before leaving, Alan Shepard pulled a modified six-iron golf club head from his pocket, attached it to a rock sample tool, and struck two golf balls.",
      "The second ball flew 'miles and miles and miles' in the one-sixth gravity. We collected 42 kilograms of ancient rocks, leaving Antares as Fra Mauro's eternal beacon.",
    ],
    scienceTitle: "Cone Crater Geology and MET Deployment",
    science:
      "Sample 14321 ('Big Bertha'), a 9-kg breccia collected near Cone Crater, was later discovered in 2019 to contain a 4-billion-year-old terrestrial zircon crystal — an Earth rock blasted to the Moon by an asteroid!",
    facts: [
      "Famous Moment: Alan Shepard golfing on the Moon",
      "Big Bertha Discovery: Contains the oldest known terrestrial rock fragment (4.0 Ga)",
      "Samples Returned: 42.28 kg",
    ],
    hotspots: [
      { x: 50, y: 45, label: "Fra Mauro Ridge", text: "Highland slopes near Cone Crater." },
    ],
  },
];

export const APOLLO15_STORY: StoryStage[] = [
  {
    id: "landing",
    number: "01",
    title: "Hadley Rille and the Lunar Grand Canyon",
    date: "30 July 1971",
    narration: [
      "We were the first 'J-mission' — dedicated to pure scientific exploration with longer surface stays and the first Lunar Roving Vehicle (LRV).",
      "Commander Dave Scott and Jim Irwin guided Falcon down beside Hadley Rille, a winding 1.5-kilometer-wide volcanic canyon flanked by the soaring 4,500-meter Apennine mountains.",
      "When the dust cleared, the lunar landscape looked grander than anything humans had ever seen off Earth.",
    ],
    scienceTitle: "Hadley-Apennine Geological Setting",
    science:
      "Apollo 15 explored both a massive volcanic sinuous rille (Hadley Rille) and the Montes Apenninus mountain front, sampling the deep boundary of the Imbrium impact basin.",
    facts: [
      "Crew: David Scott, James Irwin, Alfred Worden",
      "Landing Site: Hadley-Apennine (26.1322° N, 3.6339° E)",
      "Scientific Equipment: First LRV electric car, orbital sub-satellite, 3.0m deep drill",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Falcon Descent Stage", text: "Gold-foil base of the Lunar Module beside Hadley Rille." },
      { x: 75, y: 35, label: "Apennine Mountains", text: "Towering 4,500-metre peaks rising from the lunar plain." },
    ],
  },
  {
    id: "lrv",
    number: "02",
    title: "Driving the First Car on the Moon",
    date: "31 July – 2 August 1971",
    narration: [
      "We unfolded LRV-1 from the side of Falcon like origami. Powered by two 36-volt batteries and four electric wheel motors, it was humanity's first extraterrestrial car.",
      "We drove 28 kilometers across the slopes of Mount Hadley Delta, marveling at boulders perched over the deep drop of Hadley Rille.",
      "At Spur Crater, Dave Scott spotted something glowing white in the grey dirt: the 'Genesis Rock', a 4-billion-year-old piece of the Moon's original primordial anorthosite crust.",
    ],
    scienceTitle: "Genesis Rock (Sample 15415) and Deep Drilling",
    science:
      "The Genesis Rock (pure anorthosite composed of plagioclase feldspar) confirmed the Lunar Magma Ocean hypothesis, proving the early Moon was covered by a global ocean of molten rock.",
    facts: [
      "Lunar Rover Distance: 27.9 km driven across 3 EVAs",
      "Genesis Rock Age: 4.1 billion years old",
      "Rover Speed: Up to 13 km/h across the craters",
    ],
    hotspots: [
      { x: 35, y: 60, label: "Lunar Roving Vehicle", text: "Parked 90 metres east of Falcon with high-gain dish antenna." },
      { x: 65, y: 40, label: "Genesis Rock Site", text: "Found on the rim of Spur Crater." },
    ],
  },
  {
    id: "feather",
    number: "03",
    title: "The Hammer, the Feather, and the Fallen Astronaut",
    date: "2 August 1971 & Legacy",
    narration: [
      "Before entering Falcon for the last time, Dave Scott stood before our TV camera holding a geological hammer in one hand and a falcon feather in the other.",
      "He released them simultaneously. In the lunar vacuum, with no air resistance, Galileo's 400-year-old law of gravity was proven: both hit the dust at the exact same instant.",
      "Beside the Rover, Scott placed a small aluminum figurine and a plaque titled 'Fallen Astronaut', honoring the 14 American astronauts and Soviet cosmonauts who gave their lives for space exploration.",
    ],
    scienceTitle: "First Art on the Moon and Galileo's Physics",
    science:
      "David Scott dropped a 1.32-kg aluminum geological hammer and a 0.03-kg falcon feather to demonstrate that gravitational acceleration in a vacuum is independent of mass.",
    facts: [
      "Fallen Astronaut: The only authorized art sculpture on the Moon (by Paul Van Hoeydonck)",
      "Total Samples: 77.3 kg returned",
      "Status: Falcon descent stage and LRV-1 rest undisturbed at Hadley",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Fallen Astronaut Plaque", text: "Memorial tribute to fallen astronauts and cosmonauts." },
    ],
  },
];

export const APOLLO16_STORY: StoryStage[] = [
  {
    id: "landing",
    number: "01",
    title: "Voyage to the Descartes Highlands",
    date: "21 April 1972",
    narration: [
      "Geologists believed the Descartes Highlands were formed by ancient explosive volcanoes. We went to prove them wrong.",
      "Commander John Young and Charlie Duke landed Lunar Module Orion at 02:23 UTC on the high plateau between North Ray and South Ray craters.",
      "When John Young jumped off the ladder, he leaped into the air and saluted the American flag.",
    ],
    scienceTitle: "Descartes Highlands Volcanology vs Impact Hypothesis",
    science:
      "Apollo 16 was targeted to sample Cayley formation and Descartes material. Samples revealed impact breccias rather than volcanic rhyolites, proving highland plains are formed by basin ejecta.",
    facts: [
      "Crew: John Young, Charles Duke, Ken Mattingly",
      "Landing Site: Descartes Highlands (8.9730° S, 15.4981° E)",
      "Highland Elevation: 2,200 metres above lunar average (highest landing site)",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Orion Descent Stage", text: "Highest elevation Apollo landing site in the rugged lunar highlands." },
    ],
  },
  {
    id: "grandprix",
    number: "02",
    title: "The Lunar Grand Prix & House Rock",
    date: "22 – 23 April 1972 & Legacy",
    narration: [
      "John Young took our Lunar Rover on the 'Lunar Grand Prix', fishtailing through crater fields at 18 km/h while Charlie Duke filmed with the movie camera.",
      "At North Ray Crater, we drove up to 'House Rock' — a monster boulder as large as a four-story building blasted out from deep within the Moon's crust.",
      "Before leaving, Charlie Duke placed a plastic-sleeved photograph of his family on the lunar dust: 'This is the family of astronaut Charlie Duke from Planet Earth who landed on the Moon on April 20, 1972.'",
    ],
    scienceTitle: "North Ray Crater and Ejecta Excavation",
    science:
      "House Rock and Shadow Rock sampled at North Ray Crater revealed ancient shocked anorthositic impact breccias formed over 3.9 billion years ago during the Late Heavy Bombardment.",
    facts: [
      "House Rock Size: 12 metres tall, 16 metres wide (largest single rock sampled)",
      "Duke Family Photo: Placed on the Descartes regolith by Charlie Duke",
      "Total Samples: 95.7 kg of highland rocks returned",
    ],
    hotspots: [
      { x: 35, y: 65, label: "Duke Family Photo", text: "Left resting on the lunar soil beside footprints." },
      { x: 70, y: 40, label: "House Rock", text: "Giant four-story boulder sampled at North Ray Crater." },
    ],
  },
];

export const APOLLO17_STORY: StoryStage[] = [
  {
    id: "landing",
    number: "01",
    title: "The Last Footprints of the 20th Century",
    date: "11 December 1972",
    narration: [
      "On 7 December 1972, Apollo 17 launched into the Florida night atop a blazing pillar of light — the only night launch of a Saturn V rocket.",
      "Commander Gene Cernan and Dr. Harrison 'Jack' Schmitt — the first professional geologist to travel to another world — piloted Challenger down into the magnificent Taurus-Littrow valley.",
      "Three-kilometer-high massifs enclosed our landing site on all sides, rising like colossal natural cathedrals above the dark valley floor.",
    ],
    scienceTitle: "Taurus-Littrow Valley Complex",
    science:
      "Taurus-Littrow offered an extraordinary dual target: ancient highland crust in the massifs, and young dark volcanic mantling material and pyroclastic deposits on the valley floor.",
    facts: [
      "Crew: Eugene Cernan, Ronald Evans, Harrison 'Jack' Schmitt",
      "Scientist-Astronaut: Dr. Harrison Schmitt (first professional scientist on Moon)",
      "Landing Site: Taurus-Littrow (20.1908° N, 30.7717° E)",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Challenger Descent Stage", text: "Final Apollo descent stage on the Moon." },
      { x: 75, y: 30, label: "South Massif", text: "Highland mountain soaring 2,500 m above the valley floor." },
    ],
  },
  {
    id: "orangesoil",
    number: "02",
    title: "Discovery of Orange Volcanic Glass",
    date: "12 December 1972",
    narration: [
      "At Shorty Crater, Jack Schmitt shouted into his radio: 'There is orange soil! It's all over, orange!'",
      "He scooped up the vibrant soil: microscopic droplets of orange titanium volcanic glass beads erupted from deep within the lunar mantle 3.6 billion years ago in fiery volcanic fountains.",
      "We drove 35.7 kilometers in our Lunar Rover, spent 22 hours outside the spacecraft, and gathered 110 kilograms of pristine lunar samples.",
    ],
    scienceTitle: "Shorty Crater Pyroclastic Orange Glass",
    science:
      "Sample 74220 ('Orange Soil') consists of sub-millimeter volcanic glass beads formed in explosive fire fountains. Modern analysis revealed water inclusions inside the glass, proving volatile water existed in the Moon's primordial interior.",
    facts: [
      "Shorty Crater Discovery: Orange volcanic glass beads rich in titanium and volatiles",
      "Total Driving Distance: 35.7 km (all-time Apollo rover record)",
      "Samples Collected: 110.5 kg (heaviest Apollo sample return)",
    ],
    hotspots: [
      { x: 45, y: 55, label: "Shorty Crater", text: "Impact crater where orange volcanic beads were discovered." },
      { x: 65, y: 40, label: "Orange Soil Sample", text: "Sub-millimeter volcanic glass beads from ancient fire fountains." },
    ],
  },
  {
    id: "farewell",
    number: "03",
    title: "We Leave as We Came: In Peace for All Mankind",
    date: "14 December 1972 & Legacy",
    narration: [
      "On 14 December 1972, Gene Cernan stood at the ladder of Challenger for the last time. He looked up at the blue jewel of Earth suspended in the black sky and spoke:",
      "'We leave as we came and, God willing, as we shall return, with peace and hope for all mankind.'",
      "For over fifty years, Cernan's bootprints remained the final human tracks upon the Moon. Our descent stage, our rover, and our commemorative plaque stand in Taurus-Littrow, waiting for humanity's return.",
    ],
    scienceTitle: "End of the Apollo Era and Enduring Monument",
    science:
      "Apollo 17 completed human lunar exploration in the 20th century. The ALSEP heat-flow and seismic stations recorded data until September 1977, revealing moonquakes triggered by Earth's tidal pull.",
    facts: [
      "Final Human Moonwalk: 14 December 1972 (Eugene Cernan)",
      "Commemorative Plaque: 'Here Man completed his first explorations of the Moon, December 1972 A.D.'",
      "Status: Challenger descent stage and LRV-3 stand at Taurus-Littrow",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Challenger Base & Rover", text: "Humanity's final 20th-century lunar monument." },
    ],
  },
];

export const MOON_EXTRA_STORIES: MissionStoryMeta[] = [
  {
    artifactId: "chandrayaan-2",
    title: "Chandrayaan-2: The Courageous Leap",
    subtitle: "ISRO · 2019 · Moon (Tiranga Point)",
    agency: "ISRO",
    heroTagline: "Paved the path to the South Pole. Its high-resolution orbiter guided Chandrayaan-3.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Moon (Tiranga Point, 70° S)",
    stages: CHANDRAYAAN2_STORY,
  },
  {
    artifactId: "chandrayaan-1",
    title: "Chandrayaan-1: Discoverer of Lunar Water",
    subtitle: "ISRO · 2008–2009 · Moon (Jawahar Point)",
    agency: "ISRO",
    heroTagline: "India's maiden lunar mission that proved the Moon harbors water ice.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Moon (Jawahar Point / Shackleton Crater)",
    stages: CHANDRAYAAN1_STORY,
  },
  {
    artifactId: "smart-1",
    title: "SMART-1: Europe's Electric Moon Pioneer",
    subtitle: "ESA · 2003–2006 · Moon (Lacus Excellentiae)",
    agency: "ESA",
    heroTagline: "Spiraled to the Moon on electric xenon thrusters, proving ion drive for deep space.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Moon (Lacus Excellentiae)",
    stages: SMART1_STORY,
  },
  {
    artifactId: "surveyor-3",
    title: "Surveyor 3: The Robotic Scout Visited by Man",
    subtitle: "NASA · 1967 · Moon (Oceanus Procellarum)",
    agency: "NASA",
    heroTagline: "The only robotic probe on another world visited and inspected by human astronauts.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Moon (Oceanus Procellarum)",
    stages: SURVEYOR3_STORY,
  },
  {
    artifactId: "apollo-12",
    title: "Apollo 12: Pinpoint Precision at Surveyor Crater",
    subtitle: "NASA · 1969 · Moon (Ocean of Storms)",
    agency: "NASA",
    heroTagline: "Struck by lightning, touched down 160m from Surveyor 3, and retrieved its camera.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Moon (Oceanus Procellarum)",
    stages: APOLLO12_STORY,
  },
  {
    artifactId: "apollo-14",
    title: "Apollo 14: Redemption at Fra Mauro",
    subtitle: "NASA · 1971 · Moon (Fra Mauro)",
    agency: "NASA",
    heroTagline: "Alan Shepard golfed on the Moon and returned the oldest known terrestrial rock.",
    stagesCount: 2,
    durationMinutes: "2 min",
    destination: "Moon (Fra Mauro Highlands)",
    stages: APOLLO14_STORY,
  },
  {
    artifactId: "apollo-15",
    title: "Apollo 15: Driving the Lunar Grand Canyon",
    subtitle: "NASA · 1971 · Moon (Hadley-Apennine)",
    agency: "NASA",
    heroTagline: "First Lunar Rover, the Genesis Rock, and the hammer-and-feather gravity drop.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Moon (Hadley-Apennine)",
    stages: APOLLO15_STORY,
  },
  {
    artifactId: "apollo-16",
    title: "Apollo 16: Grand Prix in the Descartes Highlands",
    subtitle: "NASA · 1972 · Moon (Descartes Plateau)",
    agency: "NASA",
    heroTagline: "Highest elevation Apollo landing, House Rock, and Duke's family photo in the dust.",
    stagesCount: 2,
    durationMinutes: "2 min",
    destination: "Moon (Descartes Highlands)",
    stages: APOLLO16_STORY,
  },
  {
    artifactId: "apollo-17",
    title: "Apollo 17: The Last Footprints of the 20th Century",
    subtitle: "NASA · 1972 · Moon (Taurus-Littrow)",
    agency: "NASA",
    heroTagline: "Orange volcanic glass, Harrison Schmitt, and humanity's final Apollo footsteps.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Moon (Taurus-Littrow Valley)",
    stages: APOLLO17_STORY,
  },
];
