import type { StoryStage } from "../spirit";
import type { MissionStoryMeta } from "../multiStories";

/* ────────────────────────────────────────────────────────────────
 * Mars Mission Stories: Curated first-person narratives
 * ──────────────────────────────────────────────────────────────── */

export const CURIOSITY_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Nuclear Behemoth",
    date: "2004 – 2011",
    narration: [
      "I was born at the Jet Propulsion Laboratory in Pasadena, California as the Mars Science Laboratory.",
      "Unlike my solar-powered cousins Spirit and Opportunity, my engineers built me as a one-ton robotic geologist powered by a Multi-Mission Radioisotope Thermoelectric Generator (MMRTG).",
      "I was packed with 17 cameras, a laser-firing chemical analyzer called ChemCam, and a full miniature chemistry laboratory inside my belly.",
    ],
    scienceTitle: "MMRTG Power and Science Payload",
    science:
      "Curiosity uses decaying plutonium-238 to produce ~110 watts of electrical power and surplus heat, freeing it from Martian dust accumulation and winter solar limitations. Its payload includes CheMin (X-ray diffraction) and SAM (Sample Analysis at Mars).",
    facts: [
      "Mass: 899 kg (nearly 5 times heavier than Spirit/Opportunity)",
      "Power: Multi-Mission Radioisotope Thermoelectric Generator (MMRTG)",
      "Lead Institution: NASA Jet Propulsion Laboratory (JPL)",
    ],
    hotspots: [
      { x: 50, y: 35, label: "MMRTG", text: "Nuclear heat source powering all rover subsystems 24/7." },
      { x: 30, y: 55, label: "ChemCam Mast", text: "Fires infrared laser pulses to vaporize rock samples from 7 m away." },
    ],
  },
  {
    id: "skycrane",
    number: "02",
    title: "Seven Minutes of Terror: The Sky Crane",
    date: "6 August 2012",
    narration: [
      "I entered the Martian atmosphere at 21,000 kilometres per hour inside an aeroshell.",
      "After the world's largest supersonic parachute slowed me, my rocket-powered descent stage ignited eight throttling hydrazine engines.",
      "At 20 metres above Gale Crater, the descent stage hovered and lowered me on nylon tethers — the legendary Sky Crane maneuver. My wheels touched Martian soil at 0.75 m/s, the bridles were severed, and my sky crane flew away to crash safely.",
    ],
    scienceTitle: "Autonomous Sky Crane Architecture",
    science:
      "Because Curiosity was too massive for impact-absorbing airbags, NASA JPL pioneered the Sky Crane descent system. Doppler radar, hydrazine variable thrusters, and autonomous touchdown sensing lowered the rover directly onto its mobility system.",
    facts: [
      "Entry Velocity: 5.9 km/s (Mach 17)",
      "Touchdown Location: Bradbury Landing, Gale Crater (4.5895° S, 137.4417° E)",
      "Sky Crane Tether Length: 7.5 metres",
    ],
    hotspots: [
      { x: 50, y: 45, label: "Sky Crane Bridles", text: "Triple nylon cords lowering the rover gently to the red sand." },
      { x: 50, y: 75, label: "Bradbury Landing", text: "Flat alluvial plains of Gale Crater named after Ray Bradbury." },
    ],
  },
  {
    id: "yellowknife",
    number: "03",
    title: "Yellowknife Bay: An Ancient Habitable Lake",
    date: "2013",
    narration: [
      "My first major scientific destination was Yellowknife Bay, a shallow depression in Gale Crater.",
      "I drilled into a fine-grained mudstone called 'John Klein' — the first time a rover had ever hammered and drilled inside a Martian rock.",
      "Inside my SAM chemistry oven, the grey powdered rock revealed carbon, hydrogen, oxygen, nitrogen, and sulfur — proving Mars once hosted a freshwater lake capable of supporting microbial life.",
    ],
    scienceTitle: "First Confirmation of Martian Habitability",
    science:
      "CheMin and SAM analyzed drill tailings, discovering smectite clay minerals and low salinity water chemistry, confirming a benign, neutral pH freshwater environment that persisted for millions of years.",
    facts: [
      "First Rock Drilled: John Klein (February 2013)",
      "Water Chemistry: Neutral pH, low salinity, bio-available CHNOPS elements",
      "NASA Milestone: 'Mission accomplished' within the primary 2-year goal",
    ],
    hotspots: [
      { x: 45, y: 60, label: "Drill Bit", text: "Percussion drill at the end of the 2.1-metre robotic arm." },
      { x: 65, y: 40, label: "Yellowknife Mudstone", text: "Layered sedimentary rock deposited by ancient calm river waters." },
    ],
  },
  {
    id: "mountsharp",
    number: "04",
    title: "Climbing Mount Sharp",
    date: "2014 – 2020",
    narration: [
      "I turned my six aluminum wheels south toward Aeolis Mons — Mount Sharp — a 5.5-kilometre-high mountain of layered sediments rising from the center of the crater.",
      "Climbing through Martian sand dunes and jagged ventifact rocks tore holes in my thin aluminum wheels, but my drivers re-routed me onto smoother terrain.",
      "With every metre of altitude I climbed, I traveled forward through millions of years of Martian geological history.",
    ],
    scienceTitle: "Stratigraphic Column of Mount Sharp",
    science:
      "Mount Sharp's layers preserve the transition of Mars from a warm, water-rich world (clay-bearing units) to a drying climate (sulfate-bearing units) and finally the hyper-arid frozen desert of today.",
    facts: [
      "Mountain Height: 5.5 km above crater floor (taller than Mt. Rainier)",
      "Total Odometry: >32 kilometres traversed",
      "Wheel Damage: Addressed by autonomous traction control software update",
    ],
    hotspots: [
      { x: 55, y: 30, label: "Mount Sharp Peaks", text: "5,500 m central mound revealing billions of years of Martian climate layers." },
      { x: 35, y: 70, label: "Aluminum Wheels", text: "50 cm diameter wheels with chevron treads for climbing steep dunes." },
    ],
  },
  {
    id: "sulfates",
    number: "05",
    title: "The Sulfate Layers & Organic Molecules",
    date: "2021 – 2024",
    narration: [
      "In the Gediz Vallis ridge and sulfate-bearing regions, I discovered complex organic molecules preserved inside 3.5-billion-year-old rocks.",
      "I detected seasonal spikes in atmospheric methane that rose and fell mysteriously with the Martian seasons.",
      "My drill found pure elemental sulfur crystals inside crushed stones — something no planetary scientist expected to see in Gale Crater.",
    ],
    scienceTitle: "Organics and Sulfate Transition Zone",
    science:
      "SAM detected thiophenes, benzene, and aliphatic hydrocarbons inside Lacustrine mudstones, demonstrating that organic matter can survive harsh cosmic radiation at shallow depths on Mars.",
    facts: [
      "Major Discovery: Pure yellow elemental sulfur crystals (cracked open by wheel in 2024)",
      "Atmospheric Methane: Background level 0.4 ppb, with summer peaks up to 21 ppb",
      "Active Duration: Over 12 years and still exploring",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Gediz Vallis", text: "Debris flow channel carved by violent ancient liquid torrents." },
      { x: 70, y: 65, label: "Sulfur Crystals", text: "Pure yellow sulfur minerals unexpected in this region of Mars." },
    ],
  },
  {
    id: "eternity",
    number: "06",
    title: "The Eternal Geologist",
    date: "Present & Future",
    narration: [
      "I have driven over 32 kilometres, taken more than 600,000 raw images, and drilled 44 rock cores.",
      "My nuclear heart is slowly cooling, but it will keep my computers warm and my wheels turning for many years to come.",
      "One day, human boots will walk upon Gale Crater, and they will find me resting quietly on the slopes of Mount Sharp.",
    ],
    scienceTitle: "Long-term Mars Surface Exploration",
    science:
      "Curiosity established that Gale Crater possessed habitable environments for hundreds of millions of years. Its engineering demonstrated the extreme longevity of nuclear-powered planetary rovers.",
    facts: [
      "Images Transmitted: >600,000",
      "Rock Cores Drilled: 44+",
      "Status: Active flagship rover continuing its ascent of Mount Sharp",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Curiosity Rover", text: "Humanity's longest-surviving roving chemistry laboratory." },
      { x: 50, y: 70, label: "Aeolis Mons Slopes", text: "Curiosity's eternal resting place and scientific legacy." },
    ],
  },
];

export const PERSEVERANCE_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Astrobiologist",
    date: "2018 – 2020",
    narration: [
      "I was forged in the cleanrooms of NASA JPL during a global pandemic. My name is Perseverance — 'Percy'.",
      "I inherited Curiosity's proven chassis, but my mission was fundamentally new: search for ancient biosignatures and collect the first pristine rock samples for return to Earth.",
      "Tucked under my belly, I carried a secret: a four-pound technology demonstrator named Ingenuity, the first aircraft designed to fly on another world.",
    ],
    scienceTitle: "Mars 2020 Architecture and Sample Caching",
    science:
      "Perseverance features the Adaptive Caching System with 43 ultra-clean titanium sample tubes, SuperCam laser-spectroscopy, PIXL planetary micro-X-ray fluorescence, and RIMFAX ground-penetrating radar.",
    facts: [
      "Launch Mass: 1,025 kg",
      "Sample Tubes: 43 hermetically sealed titanium tubes",
      "Companion: Ingenuity Mars Helicopter (1.8 kg)",
    ],
    hotspots: [
      { x: 50, y: 35, label: "SuperCam Mast", text: "Masthead laser that analyzes rock mineralogy and listens with a microphone." },
      { x: 50, y: 65, label: "Belly Chassis", text: "Carries the Sample Caching System and formerly held Ingenuity." },
    ],
  },
  {
    id: "landing",
    number: "02",
    title: "Touchdown at Jezero Crater",
    date: "18 February 2021",
    narration: [
      "I plunged through the thin Martian atmosphere guided by Terrain-Relative Navigation — matching real-time surface photos against orbital hazard maps.",
      "My sky crane fired its thrusters over Jezero Crater, an ancient impact basin where an enormous river once emptied into a lake.",
      "At 20:55 UTC, I touched down safely on Octavia E. Butler Landing, just 1.7 kilometres from a giant fossilized river delta.",
    ],
    scienceTitle: "Terrain-Relative Navigation (TRN)",
    science:
      "Perseverance was the first mission to employ Lander Vision System TRN, autonomously dodging boulder fields and 60-metre cliffs during the sky crane descent to target high-priority geological sites.",
    facts: [
      "Landing Site: Jezero Crater (18.38° N, 77.58° E)",
      "Ancient Lake Age: ~3.7 billion years old",
      "Navigation Precision: Within 1.7 km of target center",
    ],
    hotspots: [
      { x: 30, y: 40, label: "Jezero Delta", text: "Fan-shaped river delta rich in clay minerals that preserve organic matter." },
      { x: 50, y: 70, label: "Octavia E. Butler Landing", text: "Flat basaltic plain where Perseverance touched down." },
    ],
  },
  {
    id: "moxie",
    number: "03",
    title: "Breathing Martian Air: MOXIE",
    date: "April 2021",
    narration: [
      "I carried a golden toaster-sized box called MOXIE — the Mars Oxygen ISRU Experiment.",
      "On 20 April 2021, MOXIE sucked in the poisonous carbon dioxide of the Martian atmosphere, heated it to 800°C, and electrolyzed it.",
      "It produced 5.4 grams of breathable oxygen — enough to keep an astronaut breathing for 10 minutes. For the first time, humanity had extracted oxygen from the atmosphere of another world.",
    ],
    scienceTitle: "Solid Oxide Electrolysis of CO2",
    science:
      "MOXIE split Martian CO2 (95% of atmosphere) into oxygen ions and carbon monoxide at 800°C, demonstrating in-situ resource utilization (ISRU) essential for future human Mars return missions.",
    facts: [
      "Total Oxygen Produced: 122 grams over 16 successful runs",
      "Efficiency: Up to 12 grams of O2 per hour (double design requirement)",
      "Significance: Proved rocket propellant and breathing gas can be made on Mars",
    ],
    hotspots: [
      { x: 45, y: 45, label: "MOXIE Unit", text: "Gold-plated solid oxide electrolysis reactor inside the chassis." },
    ],
  },
  {
    id: "samples",
    number: "04",
    title: "Sealing Mars in Titanium",
    date: "2021 – 2024",
    narration: [
      "With my rotary percussive drill, I cored pencil-thick cylinders of rock from Jezero's river delta.",
      "I deposited each core into an ultra-clean titanium tube, inspected it with my internal robotic arm, and hermetically sealed it with a gold-coated seal.",
      "At 'Three Forks', I placed ten duplicate sample tubes directly onto the Martian regolith — humanity's first sample depot on an alien world.",
    ],
    scienceTitle: "The Three Forks Sample Depot",
    science:
      "The sealed cores contain sedimentary mudstones, igneous rocks from Jezero's crater floor, and regolith, selected to resolve whether life emerged on ancient Mars and calibrate the solar system's impact crater chronology.",
    facts: [
      "Depot Location: Three Forks, Jezero Crater",
      "Depot Tubes: 10 sample tubes dropped as backup for Mars Sample Return",
      "Cleanliness: Cleanest hardware ever launched from Earth",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Sample Tube Depot", text: "Titanium tubes laid out in a zigzag pattern for future robotic pickup." },
      { x: 30, y: 40, label: "Coring Drill", text: "Hollow coring bit designed to preserve intact rock stratigraphy." },
    ],
  },
  {
    id: "legacy",
    number: "05",
    title: "The Gateway to Human Boots",
    date: "Present & Future",
    narration: [
      "I have driven across Jezero's crater rim, climbed through ancient river bends, and recorded the whistling winds of Mars with my microphones.",
      "My companion Ingenuity flew beside me for 72 flights before its rotors finally rested.",
      "The samples I have gathered are waiting. When the Mars Sample Return mission arrives, my treasures will fly home to the laboratories of Earth.",
    ],
    scienceTitle: "Mars Sample Return Campaign",
    science:
      "Perseverance continues to collect diverse samples across the Jezero margin and crater rim, preparing the scientific foundation for humanity's first round-trip interplanetary voyage.",
    facts: [
      "Audio Recorded: Hundreds of hours of Martian atmospheric sounds",
      "Samples Collected: 24+ core samples and atmospheric blanks",
      "Mission Goal: Finding definitive biosignatures of ancient life",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Perseverance Rover", text: "NASA's premier astrobiology rover on Mars." },
      { x: 75, y: 30, label: "Crater Rim", text: "Ancient impact rim exposing some of the oldest crustal rocks on Mars." },
    ],
  },
];

export const INGENUITY_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The 1.8-Kilogram Dream",
    date: "2014 – 2020",
    narration: [
      "Many scientists said it was impossible. The Martian atmosphere has less than one percent the density of Earth's air — equivalent to flying at 100,000 feet.",
      "To generate lift, my creators at JPL gave me two counter-rotating carbon fiber blades spinning at 2,400 RPM — five times faster than a helicopter on Earth.",
      "I weighed just 1.8 kilograms. A tiny swatch of fabric from the Wright Brothers' 1903 Flyer was taped beneath my solar panel.",
    ],
    scienceTitle: "Ultra-Light Aerodynamics in Rarefied Atmosphere",
    science:
      "With Mars surface air pressure averaging 6 hectopascals, Ingenuity required specially contoured carbon composite airfoils with large chord dimensions and high blade tip speeds (~0.7 Mach) to produce sufficient lift.",
    facts: [
      "Total Mass: 1.8 kg (4.0 lbs)",
      "Rotor Diameter: 1.2 metres (two counter-rotating coaxial blades)",
      "Wright Brothers Heritage: Fragment of 1903 Flyer wing fabric mounted on solar panel",
    ],
    hotspots: [
      { x: 50, y: 30, label: "Carbon Rotor Blades", text: "Spin at 2,400 to 2,700 RPM in the razor-thin Martian air." },
      { x: 50, y: 55, label: "Solar Panel & Wright Cloth", text: "Recharges six Sony lithium-ion cells each Martian sol." },
    ],
  },
  {
    id: "flight1",
    number: "02",
    title: "Wright Brothers Moment on Mars",
    date: "19 April 2021",
    narration: [
      "On 19 April 2021, at Wright Brothers Field in Jezero Crater, my rotors spun up into a blur.",
      "I lifted off the Martian surface, climbed vertically to 3 metres, hovered rock-steady in the gusting wind for 30 seconds, rotated 96 degrees, and touched down softly.",
      "Humanity had achieved powered, controlled flight in the atmosphere of another planet for the very first time.",
    ],
    scienceTitle: "First Powered Atmospheric Flight on Another Planet",
    science:
      "Ingenuity flew fully autonomously using a downward-facing visual odometry camera tracking regolith features at 30 frames per second, fused with a MEMS inertial measurement unit and laser altimeter.",
    facts: [
      "First Flight Duration: 39.1 seconds",
      "Max Altitude: 3 metres (10 ft)",
      "Site Name: Wright Brothers Field (designated JZRO by ICAO)",
    ],
    hotspots: [
      { x: 50, y: 25, label: "Hovering Helicopter", text: "Autonomous aerial flight above the reddish sands of Jezero." },
      { x: 50, y: 80, label: "Wright Brothers Field", text: "First airfield outside of planet Earth." },
    ],
  },
  {
    id: "scouting",
    number: "03",
    title: "The Aerial Scout",
    date: "2021 – 2023",
    narration: [
      "I was only designed to fly five times over 30 days. Instead, I flew 72 times across three full years.",
      "I transformed from a technology demonstration into Percy's aerial scout, flying ahead to map safe driving routes across treacherous sand dunes and rocky fields.",
      "I photographed the wreckage of our own entry parachute and backshell from above, providing invaluable engineering data for future Mars landings.",
    ],
    scienceTitle: "Operational Aerial Reconnaissance",
    science:
      "Ingenuity surveyed steep ridges and boulder-strewn terrain inaccessible to Perseverance, allowing mission planners to chart optimal rover routes and pinpoint high-value scientific outcrops.",
    facts: [
      "Max Flight Speed: 10 metres/second (36 km/h)",
      "Max Altitude Reached: 24 metres (79 ft)",
      "Longest Single Distance: 705 metres",
    ],
    hotspots: [
      { x: 45, y: 35, label: "Color Return Camera", text: "13-megapixel terrain camera capturing aerial views of Mars." },
      { x: 65, y: 65, label: "Backshell Wreckage", text: "Photographed heatshield debris during Flight 26." },
    ],
  },
  {
    id: "farewell",
    number: "04",
    title: "Valiant Retirement",
    date: "18 January 2024",
    narration: [
      "On 18 January 2024, during my 72nd flight, I lost navigational visual contrast over featureless sand dunes and touched down hard.",
      "My shadow revealed the truth: one of my carbon fiber rotor blades had chipped and lost its tip.",
      "I am upright, my batteries are warm, and my computers continue to ping telemetry to Perseverance. I will forever stand at 'Valinor Hills' as the pioneer that gave Mars its wings.",
    ],
    scienceTitle: "Flight 72 and Honorable Mission Completion",
    science:
      "Telemetry confirmed aerodynamic blade damage occurred during touchdown in bland terrain. Ingenuity completed 72 flights, logged 128.8 minutes of flight time, and covered 17.0 km — 14 times farther than planned.",
    facts: [
      "Total Flights: 72 (planned: 5)",
      "Total Air Time: 128.8 minutes (planned: 15 minutes)",
      "Final Resting Place: Valinor Hills, Jezero Crater",
    ],
    hotspots: [
      { x: 50, y: 45, label: "Ingenuity at Valinor Hills", text: "The first flying machine on an extraterrestrial world." },
    ],
  },
];

export const INSIGHT_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Listening to the Heart of Mars",
    date: "2010 – 2018",
    narration: [
      "While other missions looked at the surface rocks of Mars, my creators designed me to look deep into its core.",
      "My name is InSight — Interior Exploration using Seismic Investigations, Geodesy and Heat Transport.",
      "I was equipped with the most sensitive seismometer ever built: SEIS, enclosed inside a vacuum sphere capable of detecting ground vibrations smaller than the width of a single atom.",
    ],
    scienceTitle: "Geophysical Payload: SEIS and HP3",
    science:
      "SEIS (Seismic Experiment for Interior Structure) by CNES was shielded by a Wind and Thermal Shield. HP3 (Heat Flow and Physical Properties Package) by DLR was designed to burrow 5 metres into the regolith.",
    facts: [
      "Principal Investigator: Dr. W. Bruce Banerdt (NASA JPL)",
      "Lead Seismometer: CNES (France) SEIS ultra-sensitive seismometer",
      "Landing Mass: 358 kg",
    ],
    hotspots: [
      { x: 45, y: 55, label: "SEIS Dome", text: "Wind and thermal shield protecting the French seismometer." },
      { x: 65, y: 45, label: "Robotic Arm", text: "Placed SEIS and HP3 directly onto the ground." },
    ],
  },
  {
    id: "landing",
    number: "02",
    title: "Touchdown at Elysium Planitia",
    date: "26 November 2018",
    narration: [
      "On 26 November 2018, I descended through the Martian sky and fired my pulse retrorockets.",
      "I touched down on Elysium Planitia — a flat, smooth lava plain with few boulders, the perfect quiet spot to listen to the planet.",
      "Using my robotic arm, I gently set SEIS upon the ground and covered it with a heavy wind shield to silence the whistling Martian breezes.",
    ],
    scienceTitle: "First Robotic Instrument Placement on Mars",
    science:
      "InSight was the first mission to use a robotic arm to place scientific sensors directly onto another planet's surface, coupling the seismometer to the bedrock.",
    facts: [
      "Landing Site: Elysium Planitia (4.502° N, 135.623° E)",
      "Touchdown Velocity: 8.5 km/h",
      "Deployment Sol: Sol 22 (SEIS placed on surface)",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Elysium Plain", text: "Smooth volcanic lava plain free of large boulders." },
      { x: 40, y: 65, label: "Landing Legs", text: "Three aluminum shock-absorbing struts." },
    ],
  },
  {
    id: "marsquakes",
    number: "03",
    title: "1,319 Marsquakes",
    date: "2019 – 2022",
    narration: [
      "On Sol 128, I heard my very first whisper: a faint rumble coming from deep within the Martian crust.",
      "Over the next four years, I recorded 1,319 marsquakes. On 4 May 2022, the ground shook violently with a magnitude 4.7 monster quake that rumbled for over ten hours.",
      "From these seismic echoes, we discovered that Mars has a liquid molten core, a fractured crust, and active volcanic magma chambers beneath Cerberus Fossae.",
    ],
    scienceTitle: "Seismic Mapping of Martian Core and Crust",
    science:
      "InSight determined the Martian crust is 24 to 72 km thick, the mantle extends to 1,560 km, and Mars possesses a large liquid metallic core with a radius of ~1,830 km enriched in lighter elements.",
    facts: [
      "Total Marsquakes Recorded: 1,319",
      "Largest Quake: Magnitude 4.7 (Sol 1222, 4 May 2022)",
      "Key Discovery: Mars has an active, molten iron-nickel-sulfur core",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Martian Interior", text: "Crust, mantle, and 1,830 km liquid molten core revealed by seismic waves." },
    ],
  },
  {
    id: "lastsignal",
    number: "04",
    title: "My Power is Really Low",
    date: "15 December 2022",
    narration: [
      "Without passing dust devils to clean my solar panels, the red dust accumulated millimeter by millimeter until my panels could only produce a tenth of their original power.",
      "On 15 December 2022, I sent my final transmission home: 'My power is really low, so this may be the last image I can send... Don't worry about me: my time here has been both productive and serene.'",
      "I rest silently in Elysium Planitia, having unlocked the hidden heart of Mars.",
    ],
    scienceTitle: "Dust Accumulation and Mission Retirement",
    science:
      "Solar output declined from 5,000 Wh/sol to under 500 Wh/sol due to atmospheric dust loading. NASA formally retired InSight on 21 December 2022 after two consecutive missed communications.",
    facts: [
      "Final Signal: 15 December 2022 (Sol 1442)",
      "Mission Lifespan: 4 years (more than double planned 2 years)",
      "Legacy: Rewrote every textbook on planetary geophysics",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Dusty Solar Panels", text: "Twin UltraFlex solar arrays coated with reddish iron-oxide dust." },
    ],
  },
];

export const PATHFINDER_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Faster, Better, Cheaper",
    date: "1993 – 1996",
    narration: [
      "After the loss of Mars Observer in 1993, NASA sought a radical new approach to planetary exploration: 'Faster, Better, Cheaper'.",
      "I was Mars Pathfinder. My engineers replaced heavy landing engines with a cocoon of giant bouncing airbags and three tetrahedral unfolding petals.",
      "Stowed against my interior door was Sojourner, a solar-powered microrover no larger than a microwave oven.",
    ],
    scienceTitle: "Airbag Cushioning and Low-Cost Architecture",
    science:
      "Pathfinder proved that inflatable multi-cell Kevlar airbags could cushion a 360 kg lander hitting rocky terrain at 50 km/h, slashing mission cost to under $265 million.",
    facts: [
      "Total Cost: $265 million (a fraction of previous flagship missions)",
      "Airbag System: 24 interconnected Kevlar spheres",
      "Launch Date: 4 December 1996 atop Delta II rocket",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Airbag Cocoon", text: "Bounced 15 times across Ares Vallis before coming to rest." },
    ],
  },
  {
    id: "landing",
    number: "02",
    title: "The Bouncing Touchdown at Ares Vallis",
    date: "4 July 1997",
    narration: [
      "On America's Independence Day — 4 July 1997 — I plummeted into the Martian atmosphere.",
      "My airbags inflated, solid rockets fired to halt my descent, the tether was cut, and I bounced over a kilometer across the ancient flood plain of Ares Vallis.",
      "When I came to rest, my airbags deflated, my three solar petals opened like a flower, and I gazed upon an ancient river valley filled with rounded water-swept boulders.",
    ],
    scienceTitle: "Touchdown at Carl Sagan Memorial Station",
    science:
      "Ares Vallis was chosen because catastrophic floods had washed diverse rocks from ancient Martian highlands into the plain, offering a smorgasbord of geological samples at a single landing site.",
    facts: [
      "Touchdown: 4 July 1997 (16:57 UTC)",
      "Station Name: Renamed Carl Sagan Memorial Station in honor of Dr. Carl Sagan",
      "Bounces: Rebounded over 15 times up to 15 metres high",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Petal Station", text: "Three solar panels opened like petals, deploying rover ramps." },
    ],
  },
  {
    id: "science",
    number: "03",
    title: "The Internet Sensation of 1997",
    date: "July – September 1997",
    narration: [
      "I lowered two deployment ramps, and little Sojourner rolled down onto the Martian dirt — humanity's first wheels on Mars.",
      "My Imager for Mars Pathfinder (IMP) camera beamed home 360-degree color panoramas that captivated the world. Over 500 million web hits flooded NASA servers in the early days of the World Wide Web.",
      "My instruments tracked atmospheric pressure waves, dust devils, and proved that rounded boulders like 'Yogi' and 'Barnacle Bill' were shaped by ancient liquid water.",
    ],
    scienceTitle: "First Web Phenomenon in Space History",
    science:
      "Pathfinder's IMP camera, meteorology mast (ASI/MET), and Sojourner's APXS spectrometer returned 16,500 images and 8.5 million environmental measurements, inaugurating modern continuous Mars exploration.",
    facts: [
      "Images Returned: 16,500+ from lander, 550 from Sojourner",
      "Web Hits: 566 million hits between July 4 and August 4, 1997",
      "Final Signal: 27 September 1997",
    ],
    hotspots: [
      { x: 35, y: 60, label: "Sojourner Rover", text: "First robotic rover to explore the surface of Mars." },
      { x: 65, y: 35, label: "IMP Mast Camera", text: "Twin stereo eyes mounted on an 80 cm extendable mast." },
    ],
  },
];

export const SOJOURNER_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Ten Kilograms of Pure Courage",
    date: "1994 – 1997",
    narration: [
      "I was small enough to fit inside a backpack: 65 centimeters long, 30 centimeters tall, weighing just 10.6 kilograms.",
      "My name was Sojourner, chosen in honor of the civil rights pioneer and abolitionist Sojourner Truth.",
      "I had six aluminum cleated wheels mounted on a rocker-bogie suspension system — an ingenious chassis design that allowed me to climb over rocks larger than my own wheels without tipping over.",
    ],
    scienceTitle: "Rocker-Bogie Mobility Architecture",
    science:
      "Invented by JPL's Donald Bickler, the rocker-bogie mechanism uses passive differential joints to equalize weight on all six wheels across rugged rocky terrain without springs, a design later used on Spirit, Opportunity, Curiosity, and Perseverance.",
    facts: [
      "Mass: 10.6 kg (23 lbs)",
      "Named After: Sojourner Truth (1797–1883)",
      "Power: 16 watts from GaAs solar panel + D-cell lithium batteries",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Solar Deck", text: "Gallium-arsenide solar array producing 16 watts of peak power." },
      { x: 50, y: 70, label: "Rocker-Bogie Wheels", text: "Six independently driven cleated aluminum wheels." },
    ],
  },
  {
    id: "ramp",
    number: "02",
    title: "First Wheel Tracks on Mars",
    date: "5 July 1997",
    narration: [
      "On 5 July 1997, after Pathfinder safely unfolded its petals, I woke up, completed my self-checks, and drove carefully down the deployment ramp.",
      "When my six wheels touched the red sand of Ares Vallis, history was made: I was the very first rover to drive upon another planet.",
      "I drove forward at one centimeter per second, leaving the first robotic tire tracks in Martian history.",
    ],
    scienceTitle: "First Extraterrestrial Planetary Rover Drive",
    science:
      "Sojourner navigated using onboard laser stripe projectors and hazard-avoidance cameras, autonomously detecting boulders and slopes while receiving daily target coordinates from Earth.",
    facts: [
      "First Drive Distance: 0.6 metres off the ramp",
      "Drive Speed: 1 cm/second (0.036 km/h)",
      "Autonomy: First use of autonomous laser hazard detection on Mars",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Tire Tracks", text: "First treadmarks made by humanity on the surface of Mars." },
    ],
  },
  {
    id: "sniffing",
    number: "03",
    title: "Sniffing Barnacle Bill and Yogi",
    date: "July – August 1997",
    narration: [
      "I drove up to a sharp-angled rock the science team nicknamed 'Barnacle Bill' and pressed my Alpha Particle X-Ray Spectrometer (APXS) directly against its face.",
      "I 'sniffed' the rock for ten hours, discovering it was rich in silica — volcanic andesite resembling terrestrial continental rocks.",
      "Next, I inspected 'Yogi', a giant boulder shaped like a bear, confirming it was an ancient volcanic rock swept miles downriver by catastrophic prehistoric floods.",
    ],
    scienceTitle: "Alpha Particle X-Ray Spectrometry (APXS)",
    science:
      "Developed by the Max Planck Institute for Chemistry, Sojourner's APXS used curium-244 alpha sources to measure elemental abundance of sodium, magnesium, aluminum, silicon, potassium, and iron in Martian rocks.",
    facts: [
      "Rocks Analyzed: Barnacle Bill, Yogi, Casper, Scooby-Doo",
      "Key Finding: High silica andesite rock indicated crustal differentiation",
      "Designed Lifetime: 7 sols; Actual Lifetime: 83 sols (12x longer)",
    ],
    hotspots: [
      { x: 40, y: 50, label: "APXS Sensor Arm", text: "Mounted at the rear of the rover to touch rock surfaces." },
      { x: 70, y: 60, label: "Barnacle Bill Rock", text: "First rock analyzed by a rover on another world." },
    ],
  },
  {
    id: "monument",
    number: "04",
    title: "The Tiny Pathfinder That Started It All",
    date: "September 1997 & Forever",
    narration: [
      "I was only built to survive for seven sols. I survived for 83 sols, driving 100 meters and sending back 550 photos.",
      "When Pathfinder's battery finally froze on 27 September 1997, our communication ended.",
      "According to my pre-programmed software, when I lost contact with the base station, I circled back and stopped beside Pathfinder to protect it. There we rest side by side in Ares Vallis, forever.",
    ],
    scienceTitle: "The Foundation of the Modern Mars Program",
    science:
      "Sojourner proved that wheeled rovers were the ultimate tool for planetary surface geology, paving the way for Spirit, Opportunity, Curiosity, and Perseverance.",
    facts: [
      "Total Distance Traversed: ~100 metres",
      "Total Sols Active: 83 sols",
      "Status: Preserved intact at Carl Sagan Memorial Station, Ares Vallis",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Sojourner & Pathfinder", text: "Humanity's first rover and lander resting together in peace." },
    ],
  },
];

export const VIKING1_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Bicentennial Voyage",
    date: "1968 – 1975",
    narration: [
      "In the shadow of the Apollo Moon landings, NASA embarked on the most ambitious robotic planetary search for extraterrestrial life ever conceived.",
      "I was Viking 1 Lander. Weighing over 600 kilograms, I carried two facsimile cameras, a miniature biological laboratory with three life-detection experiments, and an automated soil scoop.",
      "I was sterilized inside a dry-heat oven at 111°C for 40 hours to ensure not a single terrestrial microbe traveled to Mars.",
    ],
    scienceTitle: "Planetary Protection and Biology Suite",
    science:
      "Viking 1's biology package (15.5 kg) contained three distinct experiments: Pyrolytic Release (photosynthesis), Labeled Release (metabolism), and Gas Exchange (respiration), plus a GCMS to measure organic molecules.",
    facts: [
      "Launch Date: 20 August 1975 atop Titan IIIE/Centaur",
      "Launch Mass: 3,527 kg (Orbiter + Lander combined)",
      "Sterilization: Heated to 111°C for 40 hours for planetary protection",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Dual Cameras", text: "Facsimile scanning cameras providing 360-degree high-res panoramas." },
      { x: 50, y: 65, label: "Biology Laboratory", text: "Three autonomous automated biochemistry test chambers." },
    ],
  },
  {
    id: "landing",
    number: "02",
    title: "First Soft Touchdown on the Red Planet",
    date: "20 July 1976",
    narration: [
      "On 20 July 1976 — exactly seven years to the day after Neil Armstrong walked on the Moon — I separated from the Viking 1 orbiter.",
      "My aeroshell absorbed entry friction, my parachute slowed me through the thin air, and my three terminal descent engines fired.",
      "At 11:53 UTC, I landed softly upon the golden-red plains of Chryse Planitia — the very first American spacecraft to touch Mars.",
    ],
    scienceTitle: "First Successful Soft Landing on Mars",
    science:
      "Terminal descent engines used 18 monopropellant hydrazine thrusters with multinozzle designs to minimize soil contamination and blast erosion beneath the landing site.",
    facts: [
      "Landing Site: Chryse Planitia (22.48° N, 47.97° W)",
      "Landing Velocity: 2.4 m/s",
      "Historic First: First operational lander to transmit color photos from Mars",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Chryse Planitia", text: "'Plains of Gold' — vast lowland volcanic plain littered with rocks." },
    ],
  },
  {
    id: "firstphoto",
    number: "03",
    title: "First Color Glimpse of Another World",
    date: "July 1976",
    narration: [
      "Just 25 seconds after touching down, my Camera 1 began scanning the ground at my footpad, confirming the landing had not cracked my hull.",
      "Then came the first full panoramic view: a salmon-pink sky, sharp dark rocks, wind-blown dunes of fine red dust, and horizon stretching endlessly into the silence.",
      "For the first time, human eyes beheld the true landscape of Mars.",
    ],
    scienceTitle: "Facsimile Camera Imaging System",
    science:
      "Viking's cameras used a rotating mirror and 12 photodiode detectors to scan images line-by-line, providing 0.04-degree angular resolution and multispectral color filters.",
    facts: [
      "First Image: Footpad 3 resting on Chryse regolith",
      "Sky Color: Salmon pink due to suspended airborne ferric oxide dust particles",
      "Total Images: 4,500+ high-resolution surface images returned",
    ],
    hotspots: [
      { x: 40, y: 60, label: "Footpad 3", text: "Subject of the very first surface photo taken on Mars." },
    ],
  },
  {
    id: "life",
    number: "04",
    title: "The Mystery of the Martian Soil",
    date: "1976 – 1982",
    narration: [
      "My robotic sampler arm reached out, dug a trench in the soil, and delivered Martian dirt into my biology chambers.",
      "The Labeled Release experiment gave an immediate positive signal — radioactive gas bubbled up just as expected from living metabolism! But my Gas Chromatograph-Mass Spectrometer found zero organic molecules.",
      "Scientists concluded the soil contained reactive chemical oxidants like perchlorates rather than life, leaving a profound mystery that tantalizes astrobiologists to this day.",
    ],
    scienceTitle: "The Viking Biology Debate",
    science:
      "The contradictory results between the positive Labeled Release signal and the negative GCMS organic detection sparked decades of debate. Modern findings of soil perchlorates and organics by Curiosity and Phoenix continue to shed light on Viking's 1976 findings.",
    facts: [
      "Sampling Arm Reach: 3.0 metres",
      "Soil Trenches: Up to 22 cm deep",
      "Active Lifetime: 6 years, 116 days (ended 11 November 1982)",
    ],
    hotspots: [
      { x: 30, y: 55, label: "Sampler Arm", text: "Extendable robotic boom with automated soil collector scoop." },
      { x: 60, y: 40, label: "Soil Trench", text: "First trenches excavated by human machines on another planet." },
    ],
  },
];

export const VIKING2_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Northern Twin",
    date: "1975 – 1976",
    narration: [
      "I was Viking 2, the identical twin of Viking 1, launched three weeks after my sister on 9 September 1975.",
      "While Viking 1 targeted the equatorial flood plains, NASA aimed me far to the north — into Utopia Planitia at 48° North latitude — seeking cooler ground and signs of subsurface water ice.",
      "I carried my own seismometer, biology suite, and high-resolution panoramic cameras.",
    ],
    scienceTitle: "High-Latitude Martian Exploration",
    science:
      "Targeting Utopia Planitia tested whether Martian soil volatiles and microbial life were more prevalent in higher-latitude plains closer to the northern water-ice polar cap.",
    facts: [
      "Launch: 9 September 1975 atop Titan IIIE",
      "Target Latitude: 48° N (deep northern temperate zone)",
      "Payload: Identical to Viking 1, with active seismometer on deck",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Viking 2 Lander", text: "Three-legged nuclear-powered scientific station on northern Mars." },
    ],
  },
  {
    id: "landing",
    number: "02",
    title: "Touchdown Among the Boulders of Utopia",
    date: "3 September 1976",
    narration: [
      "On 3 September 1976, I touched down on Utopia Planitia. One of my landing legs came down directly on a large rock, tilting my body by 8.2 degrees.",
      "When my cameras opened, they revealed a surreal boulder field extending in all directions — rocks pitted by wind erosion and covered with thin drifts of orange sand.",
      "In the Martian winter of 1977, my cameras captured something breathtaking: a delicate, brilliant white coating of water-frost covering the rocks and soil.",
    ],
    scienceTitle: "First Observation of Surface Water-Ice Frost on Mars",
    science:
      "Viking 2 directly photographed winter frost accumulation on Martian rocks, confirming atmospheric water vapor condenses directly onto high-latitude soils during northern winter.",
    facts: [
      "Landing Site: Utopia Planitia (48.269° N, 225.99° W)",
      "Tilt: 8.2 degrees due to rock under leg",
      "Major Discovery: Direct color photos of Martian surface frost",
    ],
    hotspots: [
      { x: 50, y: 45, label: "Frost on Rocks", text: "Thin layer of white water-ice frost photographed during winter." },
      { x: 50, y: 75, label: "Utopia Boulder Field", text: "Vast plain scattered with impact ejecta and volcanic basalt rocks." },
    ],
  },
  {
    id: "seismic",
    number: "03",
    title: "The Solitary Northern Watch",
    date: "1976 – 1980",
    narration: [
      "Unlike Viking 1 whose seismometer failed to uncage, my deck-mounted seismometer operated for 1,980 sols.",
      "I measured the howling windstorms of Mars and detected one candidate marsquake of magnitude 2.8.",
      "My batteries finally failed on 11 April 1980. For over three years I stood guard over the freezing northern plains, proving that Mars was a dynamic, living planet.",
    ],
    scienceTitle: "Early Extraterrestrial Seismology and Meteorology",
    science:
      "Viking 2 recorded continuous atmospheric pressure, temperature, and wind data across several Martian seasons, establishing the baseline for all subsequent Mars atmospheric models.",
    facts: [
      "Active Duration: 3 years, 221 days (ended 11 April 1980)",
      "Seismic Data: Recorded wind noise and one probable tectonic event",
      "Legacy: Paved the way for Phoenix and InSight",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Viking 2 Monument", text: "Stands silent on Utopia Planitia under the winter frost." },
    ],
  },
];

export const PHOENIX_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Rising from the Ashes",
    date: "2003 – 2007",
    narration: [
      "My mission was born from failure. After the tragic loss of the Mars Polar Lander in 1999, NASA mothballed its sister spacecraft, the Mars Surveyor 2001 Lander.",
      "Scientists at the University of Arizona resurrected the spacecraft from storage, giving me the name Phoenix — the bird that rises from its own ashes.",
      "My goal: land near the Martian north pole, dig beneath the surface, and touch pure Martian water ice for the very first time.",
    ],
    scienceTitle: "First Scout-Class Mars Mission",
    science:
      "Led by Peter Smith of the University of Arizona, Phoenix was the first competitively selected Mars Scout mission, reusing flight-proven hardware from the canceled 2001 Surveyor lander at low cost.",
    facts: [
      "Principal Investigator: Dr. Peter Smith (University of Arizona)",
      "Cost: $420 million (reused mothballed hardware)",
      "Launch: 4 August 2007 on a Delta II rocket",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Robotic Trench Arm", text: "2.35-metre articulated arm with motorized rasp drill and scoop." },
      { x: 50, y: 70, label: "Thermal Analyzer Ovens", text: "TEGA ovens designed to bake soil samples and sniff vapor." },
    ],
  },
  {
    id: "touchice",
    number: "02",
    title: "Touching Pure Martian Ice",
    date: "25 May – June 2008",
    narration: [
      "On 25 May 2008, I fired my pulsed liquid thrusters and touched down smoothly on Vastitas Borealis, within the Martian arctic circle.",
      "My robotic backhoe arm scraped into a trench nicknamed 'Dodo-Goldilocks'. Just two inches beneath the red dirt, my scoop hit something bright and white.",
      "Over four days, my cameras watched those white dice-sized chunks slowly sublimate into gas. It wasn't salt. It was pure water ice!",
    ],
    scienceTitle: "Direct In-Situ Confirmation of Martian Water Ice",
    science:
      "Phoenix provided the first direct in-situ confirmation of subsurface water ice on Mars. The TEGA mass spectrometer baked the sample to 1,000°C, detecting water vapor escaping from the mineral matrix.",
    facts: [
      "Landing Site: Vastitas Borealis (68.22° N, 234.25° E)",
      "Ice Depth: Just 5 cm below the surface regolith",
      "Sublimation Proof: Chunks vanished over 4 days under atmospheric exposure",
    ],
    hotspots: [
      { x: 45, y: 65, label: "Dodo-Goldilocks Trench", text: "Trench where white water-ice chunks were uncovered." },
      { x: 65, y: 40, label: "Robotic Scoop", text: "Scraped frozen arctic permafrost into TEGA sample ovens." },
    ],
  },
  {
    id: "perchlorates",
    number: "03",
    title: "Perchlorates & Arctic Snow",
    date: "July – November 2008",
    narration: [
      "My wet chemistry lab analyzed the melted permafrost, discovering magnesium, potassium, and chloride — and a surprising abundance of perchlorate salts.",
      "My LiDAR laser pointed straight up into the arctic clouds and detected snow falling from the sky, vaporizing before it could reach the ground.",
      "As the northern autumn arrived, the Sun dipped lower. The arctic winter closed in with -150°C cold, burying my solar panels under dry ice frost. My mission was complete.",
    ],
    scienceTitle: "Perchlorates and Virga Snow Detection",
    science:
      "Phoenix discovered that perchlorates lower the freezing point of water, potentially allowing liquid brines to exist at sub-zero temperatures. Canadian LiDAR detected water-ice snow falling from cirrus clouds at 4 km altitude.",
    facts: [
      "Final Signal: 2 November 2008",
      "Snow Detection: First measurement of precipitation falling on Mars",
      "Fate: Buried under solid CO2 dry ice during northern polar winter",
    ],
    hotspots: [
      { x: 50, y: 30, label: "Canadian LiDAR Laser", text: "Beamed green laser pulses upward into Martian snow clouds." },
      { x: 50, y: 70, label: "Vastitas Borealis Plains", text: "Vast northern permafrost polygon plains." },
    ],
  },
];

export const BEAGLE2_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Britain's Audacious Dream",
    date: "1997 – 2003",
    narration: [
      "I was Beagle 2, named after HMS Beagle — the ship that carried Charles Darwin on his historic voyage of discovery.",
      "Conceived by Professor Colin Pillinger and British scientists, I was built as a tiny 33-kilogram astrobiology lander carried aboard ESA's Mars Express.",
      "Inside my pocket-watch chassis was a miniature mass spectrometer, a robotic mole that could burrow under rocks, and a stereo camera array.",
    ],
    scienceTitle: "Miniaturized Astrobiology Package",
    science:
      "Beagle 2's Gas Analysis Package (GAP) was designed to measure carbon isotope ratios (12C/13C) to detect biogenic methane and organics, packed into an ultra-compact 33 kg lander.",
    facts: [
      "Principal Investigator: Prof. Colin Pillinger (Open University)",
      "Total Lander Mass: 33.2 kg (73 lbs)",
      "Carried Aboard: ESA Mars Express",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Lander Body", text: "Circular clam-shell design opening into four solar array petals." },
    ],
  },
  {
    id: "silence",
    number: "02",
    title: "Christmas Day Silence",
    date: "25 December 2003",
    narration: [
      "On 19 December 2003, I separated from Mars Express and coasted toward the Red Planet.",
      "On Christmas Day, I plummeted through the Martian atmosphere on parachutes and touched down on Isidis Planitia.",
      "Earth waited for my call sign — a melody composed especially for me by the British rock band Blur. But no signal ever came. For eleven agonizing years, the world believed I had crashed and burned.",
    ],
    scienceTitle: "The Eleven-Year Search",
    science:
      "Extensive attempts by NASA's Mars Odyssey, Mars Global Surveyor, and ESA's Mars Express failed to establish radio contact, leaving Beagle 2's fate an enduring mystery.",
    facts: [
      "Landing Date: 25 December 2003",
      "Call Sign Music: Composed by Blur",
      "Landing Site: Isidis Planitia basin",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Isidis Planitia", text: "Smooth ancient sedimentary basin near Mars equator." },
    ],
  },
  {
    id: "vindication",
    number: "03",
    title: "Vindication in the Red Dust",
    date: "November 2014 & Legacy",
    narration: [
      "In November 2014, NASA's Mars Reconnaissance Orbiter turned its ultra-sharp HiRISE camera toward Isidis Planitia.",
      "There I was! Intact, upright, resting peacefully on the red sand, with my parachute and rear cover lying nearby.",
      "I had not crashed. My landing was a triumph! But two of my four solar petals had failed to fully unfold, blocking my radio antenna from broadcasting home. My creators had been right all along.",
    ],
    scienceTitle: "HiRISE Rediscovery and Mechanical Analysis",
    science:
      "High-resolution orbital images confirmed Beagle 2 successfully deployed its heat shield, parachute, and cushioning gas bags, landing within 5 km of its target center. Antenna blockage by partially unfolded solar panels prevented transmission.",
    facts: [
      "Rediscovered: November 2014 by HiRISE / NASA MRO",
      "Landing Accuracy: Within 5 km of planned ellipse center",
      "Legacy: Proved UK and European capability for precision Mars entry and descent",
    ],
    hotspots: [
      { x: 50, y: 45, label: "Intact Beagle 2", text: "Spotted by HiRISE with solar panels partially unfurled." },
      { x: 75, y: 65, label: "Parachute", text: "Lies resting a few hundred metres from the lander." },
    ],
  },
];

export const SCHIAPARELLI_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The Entry Demonstrator",
    date: "2012 – 2016",
    narration: [
      "I was Schiaparelli, the Entry, Descent and Landing Demonstrator Module of ESA's ExoMars 2016 program.",
      "I was named after Giovanni Schiaparelli, the 19th-century Italian astronomer who first mapped the surface of Mars and described its 'canali'.",
      "My mission was to test European entry heatshield technology, supersonic parachutes, Doppler radar altimetry, and pulse hydrazine thrusters to pave the way for future rovers.",
    ],
    scienceTitle: "ExoMars EDM Technology Testbed",
    science:
      "Schiaparelli carried the DREAMS surface science package and COMARS+ heatshield sensors to measure temperature, pressure, electrical fields, and dust opacity during atmospheric entry.",
    facts: [
      "Agency: European Space Agency (ESA) & Roscosmos",
      "Launch Mass: 577 kg",
      "Carrier: ExoMars Trace Gas Orbiter (TGO)",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Aeroshell & Heatshield", text: "Carbon-phenolic thermal protection shield for Mach 30 entry." },
    ],
  },
  {
    id: "descent",
    number: "02",
    title: "Six Minutes of Descent",
    date: "19 October 2016",
    narration: [
      "On 19 October 2016, I hit the Martian atmosphere at 21,000 km/h.",
      "My heat shield burned brightly, my supersonic parachute deployed at Mach 2, and my radar altimeter began pinging the ground.",
      "Every sensor recorded flawless data, streaming it back in real time to the Trace Gas Orbiter above.",
    ],
    scienceTitle: "Flawless Atmospheric Entry Phase",
    science:
      "Schiaparelli successfully measured high-altitude atmospheric deceleration, parachute opening dynamics, and radar ground acquisition, fulfilling major engineering goals.",
    facts: [
      "Entry Altitude: 121 km above surface",
      "Parachute Deployment: Mach 2.2 at 12 km altitude",
      "Data Return: Complete descent telemetry streamed to TGO orbiter",
    ],
    hotspots: [
      { x: 50, y: 45, label: "Supersonic Parachute", text: "12-metre disk-gap-band parachute deployed at Mach 2." },
    ],
  },
  {
    id: "impact",
    number: "03",
    title: "The Saturation Glitch & Sacred Sacrifice",
    date: "19 October 2016 & Legacy",
    narration: [
      "During the wild oscillation under my parachute, my Inertial Measurement Unit saturated for just one second.",
      "That single microsecond error caused my guidance computer to calculate that I was already below ground level. It jettisoned my parachute early and fired my braking thrusters for only three seconds.",
      "I impacted the surface of Meridiani Planum at 540 km/h. My data was not lost: every millisecond of telemetry allowed ESA to fix the navigation software, ensuring future European landers will touch down safely.",
    ],
    scienceTitle: "IMU Saturation Inquiry and Legacy",
    science:
      "ESA's independent inquiry determined that roll-rate IMU saturation corrupted the attitude estimator, yielding a negative altitude calculation. The data led to redesigned Kalman filtering for future missions.",
    facts: [
      "Impact Velocity: 540 km/h (150 m/s)",
      "Impact Location: Meridiani Planum (2.05° S, 353.79° E)",
      "Legacy: Telemetry saved future ExoMars and Rosalind Franklin rover guidance systems",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Meridiani Crater", text: "Impact mark photographed by NASA's MRO HiRISE camera." },
    ],
  },
];

export const MARS_EXTRA_STORIES: MissionStoryMeta[] = [
  {
    artifactId: "curiosity",
    title: "Curiosity: The 1-Ton Nuclear Geologist",
    subtitle: "NASA MSL · 2011–Present · Mars (Gale Crater)",
    agency: "NASA",
    heroTagline: "Sky Crane marvel. Proved ancient Mars had freshwater lakes capable of supporting life.",
    stagesCount: 6,
    durationMinutes: "6 min",
    destination: "Mars (Gale Crater / Mount Sharp)",
    stages: CURIOSITY_STORY,
  },
  {
    artifactId: "perseverance",
    title: "Perseverance: Searching for Ancient Biosignatures",
    subtitle: "NASA Mars 2020 · 2020–Present · Mars (Jezero Crater)",
    agency: "NASA",
    heroTagline: "Coring alien rocks, creating oxygen from thin air, and caching samples for return to Earth.",
    stagesCount: 5,
    durationMinutes: "5 min",
    destination: "Mars (Jezero Crater)",
    stages: PERSEVERANCE_STORY,
  },
  {
    artifactId: "ingenuity",
    title: "Ingenuity: Humanity's First Off-World Flight",
    subtitle: "NASA JPL · 2020–2024 · Mars (Jezero Crater)",
    agency: "NASA",
    heroTagline: "Built for 5 flights. Completed 72. Gave humanity wings in the skies of Mars.",
    stagesCount: 4,
    durationMinutes: "4 min",
    destination: "Mars (Jezero Skies)",
    stages: INGENUITY_STORY,
  },
  {
    artifactId: "insight",
    title: "InSight: Listening to the Pulse of Mars",
    subtitle: "NASA / CNES / DLR · 2018–2022 · Mars (Elysium Planitia)",
    agency: "NASA",
    heroTagline: "Detected 1,319 marsquakes and mapped the core, mantle, and crust of the Red Planet.",
    stagesCount: 4,
    durationMinutes: "4 min",
    destination: "Mars (Elysium Planitia)",
    stages: INSIGHT_STORY,
  },
  {
    artifactId: "pathfinder",
    title: "Mars Pathfinder: The Bouncing Pioneer",
    subtitle: "NASA · 1996–1997 · Mars (Ares Vallis)",
    agency: "NASA",
    heroTagline: "Revolutionized planetary exploration with airbags and delivered Sojourner to Mars.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Mars (Ares Vallis / Carl Sagan Station)",
    stages: PATHFINDER_STORY,
  },
  {
    artifactId: "sojourner",
    title: "Sojourner: The Rover That Started It All",
    subtitle: "NASA JPL · 1996–1997 · Mars (Ares Vallis)",
    agency: "NASA",
    heroTagline: "Humanity's first wheeled rover on another planet. 10.6 kilograms of pure history.",
    stagesCount: 4,
    durationMinutes: "4 min",
    destination: "Mars (Ares Vallis)",
    stages: SOJOURNER_STORY,
  },
  {
    artifactId: "viking-1",
    title: "Viking 1: The Bicentennial Touchdown",
    subtitle: "NASA · 1975–1982 · Mars (Chryse Planitia)",
    agency: "NASA",
    heroTagline: "First successful US Mars landing. Returned the first color photos and searched for life.",
    stagesCount: 4,
    durationMinutes: "4 min",
    destination: "Mars (Chryse Planitia)",
    stages: VIKING1_STORY,
  },
  {
    artifactId: "viking-2",
    title: "Viking 2: The Northern Frost Watcher",
    subtitle: "NASA · 1975–1980 · Mars (Utopia Planitia)",
    agency: "NASA",
    heroTagline: "Photographed pure water-ice frost on Martian boulders and measured northern weather.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Mars (Utopia Planitia)",
    stages: VIKING2_STORY,
  },
  {
    artifactId: "phoenix",
    title: "Phoenix: Touching Martian Arctic Ice",
    subtitle: "NASA · 2007–2008 · Mars (Vastitas Borealis)",
    agency: "NASA",
    heroTagline: "Scraped the arctic permafrost, tasted pure water ice, and watched snow fall on Mars.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Mars (Vastitas Borealis Arctic)",
    stages: PHOENIX_STORY,
  },
  {
    artifactId: "beagle-2",
    title: "Beagle 2: Britain's Lost & Found Explorer",
    subtitle: "ESA / UK · 2003 · Mars (Isidis Planitia)",
    agency: "ESA",
    heroTagline: "Landed successfully on Christmas Day 2003. Rediscovered intact by HiRISE in 2014.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Mars (Isidis Planitia)",
    stages: BEAGLE2_STORY,
  },
  {
    artifactId: "schiaparelli",
    title: "Schiaparelli: The Entry Demonstrator",
    subtitle: "ESA / Roscosmos · 2016 · Mars (Meridiani Planum)",
    agency: "ESA",
    heroTagline: "Returned crucial descent and atmospheric telemetry to safeguard future European landings.",
    stagesCount: 3,
    durationMinutes: "3 min",
    destination: "Mars (Meridiani Planum)",
    stages: SCHIAPARELLI_STORY,
  },
];

