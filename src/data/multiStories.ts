import { SPIRIT_STORY, STORY_DISCLAIMER, type StoryStage } from "./spirit";
import { MARS_EXTRA_STORIES } from "./stories/marsStories";
import { MOON_EXTRA_STORIES } from "./stories/moonStories";
import { DEEP_SPACE_EXTRA_STORIES } from "./stories/deepSpaceStories";
import { getArtifact } from "./artifacts";
import type { Artifact } from "./types";

export interface MissionStoryMeta {
  artifactId: string;
  title: string;
  subtitle: string;
  agency: "NASA" | "ISRO" | "ESA";
  heroTagline: string;
  stagesCount: number;
  durationMinutes: string;
  destination: string;
  stages: StoryStage[];
}

export const CHANDRAYAAN3_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "Born in Bengaluru",
    date: "2019 – 2023",
    narration: [
      "I was engineered at the U R Rao Satellite Centre in Bengaluru, India. My creators learned every lesson from Chandrayaan-2.",
      "They strengthened my legs to survive landing velocities of 3 metres per second, expanded my solar panels to all four sides, and gave me hazard detection cameras to seek safe ground near the Moon's South Pole.",
      "My mission was ambitious: go where no nation had ever touched down before — the unexplored lunar southern latitudes.",
    ],
    scienceTitle: "South Polar Engineering Architecture",
    science:
      "ISRO redesigned the Vikram lander with wider landing legs, increased fuel capacity, laser doppler velocimeters, and redundant guidance sensors to handle slopes up to 12 degrees in the rugged cratered terrain of the lunar south pole.",
    facts: [
      "Developed by: Indian Space Research Organisation (ISRO)",
      "Lander: Vikram (named after Dr. Vikram Sarabhai, father of Indian space program)",
      "Rover: Pragyan (meaning 'Wisdom' in Sanskrit, mass 26 kg)",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Vikram Lander", text: "Sturdy four-legged platform with four throttleable liquid rocket engines." },
      { x: 75, y: 65, label: "Pragyan Rover", text: "Six-wheeled solar rover stowed inside the lander chassis." },
    ],
  },
  {
    id: "launch",
    number: "02",
    title: "Roar of Bahubali",
    date: "14 July 2023",
    narration: [
      "On 14 July 2023, the skies over the Bay of Bengal erupted. India's heaviest rocket — the LVM3-M4, nicknamed 'Bahubali' — launched from Sriharikota.",
      "With 10 million newtons of thrust, solid rocket boosters S200 lifted me into space, tracing an elliptical parking orbit around the Earth.",
      "Over the next three weeks, five Earth-bound orbit maneuvers steadily boosted my orbit, slingshotting me toward the Moon.",
    ],
    scienceTitle: "Earth Orbit Elevation Trajectory",
    science:
      "Unlike high-thrust direct translunar trajectories, ISRO utilized an energy-efficient series of perigee burns to gradually raise the apogee using Earth's gravity assist, saving massive quantities of propellant.",
    facts: [
      "Launch Vehicle: LVM3-M4 (Geosynchronous Satellite Launch Vehicle Mk III)",
      "Launch Site: Second Launch Pad, SDSC SHAR, Sriharikota",
      "Total Launch Mass: 3,900 kg",
    ],
    hotspots: [
      { x: 50, y: 30, label: "LVM3-M4 Rocket", text: "India's heavy-lift launch vehicle carrying Chandrayaan-3 into orbit." },
      { x: 50, y: 85, label: "Sriharikota Coast", text: "Barrier island launchpad on India's eastern coast." },
    ],
  },
  {
    id: "journey",
    number: "03",
    title: "The Lunar Rendezvous",
    date: "August 2023",
    narration: [
      "On 5 August 2023, I fired my liquid propulsion engines for Lunar Orbit Insertion. The Moon's gravity captured me.",
      "Orbit by orbit, retro-burns reduced my altitude until I circled in a tight 25-kilometre by 134-kilometre orbit.",
      "My cameras mapped the shadowed rims of craters below, identifying a flat plain between Manzinus C and Simpelius N.",
    ],
    scienceTitle: "Lunar Orbit Lowering and Terrain Mapping",
    science:
      "The Lander Hazard Detection and Avoidance Camera (LHDAC) scanned thousands of square meters in real-time, matching onboard optical elevation maps with orbital photography from Chandrayaan-2's high-resolution orbiter.",
    facts: [
      "Lunar Orbit Insertion: 5 August 2023",
      "De-orbit burn: Lowered perilune to ~25 km above lunar surface",
      "Target Landing Site: 69.373° S, 32.319° E",
    ],
    hotspots: [
      { x: 25, y: 55, label: "Lunar Surface", text: "Heavily cratered highlands near the Moon's South Pole." },
      { x: 75, y: 35, label: "Orbital Track", text: "Precision polar orbit aligning Vikram with the landing target." },
    ],
  },
  {
    id: "descent",
    number: "04",
    title: "15 Minutes of Terror",
    date: "23 August 2023, 17:44 IST",
    narration: [
      "At 17:44 IST, the automatic landing sequence engaged. Four 800-newton throttleable engines fired in unison.",
      "In the rough braking phase, I plummeted from 30 kilometres altitude, shedding 1.68 kilometres per second of orbital speed.",
      "At 800 metres, I hovered. Lasers bounced off the grey regolith, confirming no boulders lay in my path. I throttled down for the final vertical touchdown.",
    ],
    scienceTitle: "Autonomous Braking & Hover Phase",
    science:
      "The final 15-minute descent was fully autonomous without human intervention. Vikram used closed-loop guidance, switching from rough braking to attitude hold, then to vertical descent with laser doppler velocimeters.",
    facts: [
      "Rough Braking: Reduced horizontal speed from 1,680 m/s to 358 m/s",
      "Hover Altitude: 800 m and 150 m for hazard verification",
      "Vertical Touchdown Velocity: Less than 2 m/s",
    ],
    hotspots: [
      { x: 50, y: 65, label: "Throttleable Engines", text: "Four bi-propellant engines throttling dynamically to brake the descent." },
      { x: 50, y: 20, label: "Hazard Detection Sensors", text: "Real-time laser sensors scanning for rocks taller than 20 cm." },
    ],
  },
  {
    id: "landing",
    number: "05",
    title: "Touchdown at Shiv Shakti Point",
    date: "23 August 2023, 18:04 IST",
    narration: [
      "At 18:04 IST, my four footpads touched lunar regolith. A cloud of fine moon dust settled in the vacuum.",
      "Telemetry reached Earth: 'India is on the Moon!' The landing site was officially christened Shiv Shakti Point.",
      "India became the fourth nation to soft-land on the Moon, and the very first in human history to land near the South Pole.",
    ],
    scienceTitle: "Historic South Polar Achievement",
    science:
      "Landing at 69.373° S proved humanity could access the Moon's south polar region — where deep permanently shadowed craters hold massive reserves of ancient water ice crucial for future deep space exploration.",
    facts: [
      "Touchdown Time: 23 August 2023, 12:34 UTC (18:04 IST)",
      "Site Name: Shiv Shakti Point (approved by IAU)",
      "Coordinates: 69.373° S, 32.319° E",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Vikram at Rest", text: "Upright lander transmitting telemetry and first surface photos." },
      { x: 75, y: 40, label: "Shiv Shakti Point", text: "The historical landing plain in the southern lunar highlands." },
    ],
  },
  {
    id: "discoveries",
    number: "06",
    title: "Pragyan's Golden Footsteps",
    date: "August – September 2023",
    narration: [
      "Vikram lowered a two-segment ramp. My six-wheeled rover Pragyan rolled down onto the virgin soil, imprinting the Ashoka Lion national emblem in the dust.",
      "Pragyan drove 103 metres across the regolith, dodging craters. Its Laser-Induced Breakdown Spectroscope (LIBS) zapped the soil with lasers and confirmed the presence of elemental Sulfur (S).",
      "Meanwhile, the ChaSTE temperature probe drilled into the surface, discovering that while the surface was 50°C, just 8 centimetres deep the temperature plummeted to -10°C!",
    ],
    scienceTitle: "Direct In-Situ Science Discoveries",
    science:
      "LIBS and APXS detected Sulfur, Iron, Calcium, and Aluminum in the south polar regolith. ChaSTE revealed the Moon's surface dust is an extraordinary thermal insulator with unprecedented temperature gradients.",
    facts: [
      "Total distance driven by Pragyan: 103 metres (338 ft)",
      "Elemental confirmation: Sulfur (S) definitively detected by LIBS",
      "Thermal discovery: 60°C temperature drop within just 8 cm of depth",
    ],
    hotspots: [
      { x: 40, y: 65, label: "Pragyan Tracks", text: "Twin cleated tire tracks stretching 103 meters across the regolith." },
      { x: 65, y: 50, label: "ChaSTE Thermal Probe", text: "Penetrated 8 cm into the soil to measure the thermal gradient." },
    ],
  },
  {
    id: "legacy",
    number: "07",
    title: "Eternal Sleep under Southern Stars",
    date: "September 2023 – Forever",
    narration: [
      "As the two-week lunar daylight drew to an end, the Sun dipped below the horizon. Temperatures plunged to -180°C.",
      "Engineers oriented Pragyan's solar panel to catch the first rays of the next sunrise and put its systems into sleep mode.",
      "We did not wake when morning came, but our mission was triumphant. We remain at Shiv Shakti Point — India's eternal lunar ambassadors.",
    ],
    scienceTitle: "Enduring Monument of Exploration",
    science:
      "Chandrayaan-3 completed 100% of its mission objectives within 14 Earth days. Vikram and Pragyan remain intact on the lunar south pole as humanity prepares for crewed Artemis and international lunar base expeditions.",
    facts: [
      "Mission Duration: 1 Lunar Day (14 Earth days) of active surface science",
      "Current Status: Silent at Shiv Shakti Point, intact under the lunar vacuum",
      "Global Impact: Opened the lunar south pole for worldwide science campaigns",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Shiv Shakti Monument", text: "Vikram and Pragyan resting permanently on the lunar surface." },
      { x: 80, y: 20, label: "Southern Stars", text: "The deep cosmos visible through the airless lunar sky." },
    ],
  },
];

export const HUYGENS_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "The European Voyager",
    date: "1990 – 1997",
    narration: [
      "I was conceived by the European Space Agency and named after Dutch astronomer Christiaan Huygens, who discovered Saturn's giant moon Titan in 1655.",
      "Engineers wrapped me in thermal blankets and an aerodynamic heat shield designed to endure an alien atmosphere four times denser than Earth's.",
      "Bolted to NASA's flagship Cassini orbiter, we prepared to embark on a 3.5-billion-kilometre voyage into the outer Solar System.",
    ],
    scienceTitle: "Engineering an Atmospheric Penetrator",
    science:
      "Huygens was designed as an entry probe to penetrate Titan's cryogenic nitrogen-methane atmosphere. It carried six sophisticated instrument packages to measure atmospheric structure, chemistry, wind, and surface physical properties.",
    facts: [
      "Space Agency: European Space Agency (ESA) in partnership with NASA/ASI",
      "Probe Mass: 318 kg (701 lb), Diameter: 2.7 metres",
      "Destination: Titan, Saturn's largest moon (5,150 km diameter)",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Front Heat Shield", text: "2.7m diameter beryllium and tiles designed for 12,000°C friction." },
      { x: 50, y: 70, label: "Cassini Orbiter", text: "The mothership that carried Huygens across billions of kilometers." },
    ],
  },
  {
    id: "journey",
    number: "02",
    title: "Seven Years Across the Rings",
    date: "1997 – 2004",
    narration: [
      "For seven years, I slept in deep space, hitching a ride behind Cassini's giant white radio dish.",
      "We swung past Venus twice, zipped past Earth, and slingshotted around Jupiter, using gravity assists to build the incredible speed needed to reach Saturn.",
      "On Christmas Day 2004, Cassini fired explosive release bolts. With a gentle push of three coil springs, I was released into the void, drifting alone toward Titan.",
    ],
    scienceTitle: "The Christmas Day Separation",
    science:
      "Huygens separated from Cassini on 25 December 2004 at a relative speed of 0.35 m/s while spinning at 7 rpm for gyroscopic stability. It coasted for 20 days toward Titan without active propulsion.",
    facts: [
      "Separation Date: 25 December 2004",
      "Coasting Duration: 21 days in free flight",
      "Spin Rate: 7.5 revolutions per minute for orientation stability",
    ],
    hotspots: [
      { x: 40, y: 50, label: "Huygens Coasting", text: "Spinning probe coasting across the void toward Saturn's moon." },
      { x: 75, y: 35, label: "Saturn and Rings", text: "The ringed giant glowing in the distance." },
    ],
  },
  {
    id: "arrival",
    number: "03",
    title: "Piercing the Orange Shroud",
    date: "14 January 2005",
    narration: [
      "On 14 January 2005, I plunged into Titan's upper atmosphere at 22,000 kilometres per hour.",
      "My front shield withstood a fiery wall of orange plasma. The thick nitrogen-methane smog was dense, cold, and impenetrable to telescopes.",
      "At 120 kilometres above the surface, a small pilot chute deployed, pulling away my back cover and blooming my 8.3-metre main parachute.",
    ],
    scienceTitle: "Hypersonic Entry into Titan's Smog",
    science:
      "Titan's atmosphere is 95% nitrogen and 5% methane, with complex organic tholins creating an opaque orange haze. Atmospheric entry reduced velocity from 6 km/s to 400 m/s in under three minutes.",
    facts: [
      "Entry Velocity: ~6 km/s (22,000 km/h / 13,700 mph)",
      "Atmospheric Pressure at Surface: 1.45 atmospheres (50% higher than Earth)",
      "Main Parachute Deploy Altitude: ~160 km",
    ],
    hotspots: [
      { x: 50, y: 30, label: "Main Parachute", text: "Decelerated Huygens to subsonic speeds in Titan's dense air." },
      { x: 50, y: 65, label: "Orange Smog", text: "Photochemical haze produced by sunlight interacting with methane." },
    ],
  },
  {
    id: "descent",
    number: "04",
    title: "Descent Through Methane Clouds",
    date: "14 January 2005, 10:15 UTC",
    narration: [
      "For two hours and twenty-seven minutes, I drifted downward through an eerie, frozen world.",
      "My cameras scanned the landscape beneath the haze: I saw mountain ridges carved by liquid rivers, branching river deltas, and dry shorelines.",
      "It wasn't water carving those valleys — it was liquid methane rain at -179 degrees Celsius. I was witnessing a mirror image of Earth, cast in hydrocarbons.",
    ],
    scienceTitle: "The Hydrocarbon Hydrological Cycle",
    science:
      "The Descent Imager/Spectral Radiometer (DISR) returned humanity's first direct views of Titan's surface, proving that Titan undergoes active weather: methane clouds, methane rain, and methane rivers feeding into vast lakes.",
    facts: [
      "Descent Duration: 2 hours 27 minutes",
      "Temperature at Surface: -179.16°C (-290.5°F)",
      "Atmospheric Composition: 95% Nitrogen, 4.9% Methane",
    ],
    hotspots: [
      { x: 35, y: 60, label: "Methane River Channels", text: "Dendritic drainage networks carved by liquid methane runoff." },
      { x: 70, y: 45, label: "DISR Cameras", text: "Imaged the alien terrain during the two-hour parachute descent." },
    ],
  },
  {
    id: "landing",
    number: "05",
    title: "Touchdown on Liquid Mud",
    date: "14 January 2005, 12:43 UTC",
    narration: [
      "At 12:43 UTC, I landed with a soft, sliding thud at 4.5 metres per second.",
      "My penetrometer sank 15 centimetres into the ground. The texture was like wet sand or damp clay covered by a thin crust.",
      "I turned on my surface lamp. Right before me lay rounded pebbles of solid water ice, smoothed by rivers of liquid methane. I had reached the farthest shore in human history.",
    ],
    scienceTitle: "Farthest Landing in Human History",
    science:
      "Huygens touched down at 10.2° S, 192.4° W. The surface consistence was compared to crème brûlée or wet snow. The heat from Huygens' landing lamp caused a small puff of methane gas to evaporate from the moist regolith.",
    facts: [
      "Landing Speed: 4.5 m/s (10 mph)",
      "Landing Coordinates: 10.2° S, 192.4° W (boundary of Xanadu)",
      "Pebbles: Composed of frozen rock-hard water ice rounded by methane rivers",
    ],
    hotspots: [
      { x: 45, y: 75, label: "Ice Pebbles", text: "Water ice behaves like rock at -180°C, rounded by flowing hydrocarbons." },
      { x: 55, y: 50, label: "Huygens on Titan", text: "The golden probe resting on the dark methane-damp plain." },
    ],
  },
  {
    id: "legacy",
    number: "06",
    title: "Titan's Eternal Sentinel",
    date: "2005 – Forever",
    narration: [
      "I transmitted telemetry to Cassini overhead for 72 minutes after landing, far exceeding expectations until the mothership dipped below Titan's horizon.",
      "My batteries finally exhausted in the bitter -180°C cold. But I am still there, resting on that orange plain under the dim glow of Saturn's rings.",
      "I showed humanity that oceans, rain, and river valleys exist on other worlds. I was Europe's daring leap — and I remain the most distant landing humankind has ever made.",
    ],
    scienceTitle: "Enduring Science Legacy",
    science:
      "Huygens transformed our understanding of prebiotic chemistry and ocean worlds. Its findings paved the way for NASA's upcoming Dragonfly rotorcraft mission to Titan.",
    facts: [
      "Surface Lifetime: 72 minutes of direct surface telemetry transmission",
      "Distance from Earth: ~1.4 billion kilometres (farthest landing ever)",
      "Current Status: Intact, frozen forever on the surface of Titan",
    ],
    hotspots: [
      { x: 50, y: 65, label: "Titan Resting Site", text: "Humanity's farthest technological footprint in the cosmos." },
      { x: 75, y: 25, label: "Saturnian Skies", text: "The thick orange atmosphere shielding Titan from the vacuum of space." },
    ],
  },
];

export const OPPORTUNITY_STORY: StoryStage[] = [
  {
    id: "launch",
    number: "01",
    title: "Twin of Spirit",
    date: "7 July 2003",
    narration: [
      "I was born as MER-B, the second of NASA's twin Mars Exploration Rovers. Three weeks after Spirit launched, a Delta II Heavy rocket propelled me into the darkness.",
      "Our mission was to follow the water: to search for evidence of ancient lakes, hot springs, or seas where life might once have taken root.",
      "I sped across 456 million kilometres of interplanetary vacuum, aimed directly for a smooth dark plain called Meridiani Planum.",
    ],
    scienceTitle: "Delta II Heavy Launch & Cruise",
    science:
      "Opportunity launched aboard a Delta II 7925H rocket, equipped with nine larger solid rocket boosters (GEM-46) to provide additional impulse required for the late launch window.",
    facts: [
      "Mass: 185 kg (identical twin to Spirit)",
      "Launch Site: Cape Canaveral Air Force Station SLC-17B",
      "Target: Meridiani Planum (high concentration of hematite detected from orbit)",
    ],
    hotspots: [
      { x: 50, y: 35, label: "MER-B Cruise Stage", text: "Solar array and thrusters steering Opportunity across interplanetary space." },
      { x: 50, y: 75, label: "Delta II Heavy", text: "Three-stage rocket delivering escape velocity from Earth." },
    ],
  },
  {
    id: "landing",
    number: "02",
    title: "Hole-in-One at Eagle Crater",
    date: "25 January 2004",
    narration: [
      "Cocooned inside an airbag shell, I bounced across the flat basalt sands of Meridiani Planum for hundreds of metres.",
      "When the airbags deflated and the lander petals unfolded, my cameras peered out: I had rolled straight into a small, 22-metre crater.",
      "Right in front of my wheels stood exposed bedrock — the very first layered sedimentary rock outcrop ever seen on Mars. Geologists called it an interplanetary hole-in-one.",
    ],
    scienceTitle: "Eagle Crater Outcrop Discovery",
    science:
      "Landing directly inside Eagle Crater exposed bedrock strata that had been protected from surface weathering, allowing immediate chemical analysis of pristine Martian sedimentary layers.",
    facts: [
      "Landing Site: Eagle Crater, Meridiani Planum (1.95° S, 354.47° E)",
      "Bounces: Approximately 26 bounces before rolling to rest inside the crater",
      "Airbag System: Multilayer Vectran synthetic fabric cushions",
    ],
    hotspots: [
      { x: 55, y: 65, label: "Eagle Crater Rim", text: "22-metre-wide crater rim exposing ancient layered bedrock." },
      { x: 45, y: 40, label: "Lander Petals", text: "Folded triangular petals that protected Opportunity during landing." },
    ],
  },
  {
    id: "blueberries",
    number: "03",
    title: "Martian Blueberries",
    date: "February – March 2004",
    narration: [
      "I brought my Microscopic Imager close to the bedrock and ground into the rock with my Rock Abrasion Tool.",
      "Scattered across the soil were billions of tiny spherical concretions, just a few millimetres wide. The science team affectionately named them 'blueberries'.",
      "My Mössbauer spectrometer revealed their true composition: pure hematite. These concretions could only have formed by minerals precipitating out of standing, mildly acidic groundwater.",
    ],
    scienceTitle: "Hematite Concretions & Groundwater Proof",
    science:
      "Hematite (Fe2O3) spherules form on Earth when mineral-rich water percolates through porous sedimentary rock. Opportunity provided the first definitive proof of past liquid groundwater on Mars.",
    facts: [
      "Size: 1 to 4 mm in diameter",
      "Composition: Crystalline gray hematite",
      "Significance: Conclusive geological signature of past liquid water",
    ],
    hotspots: [
      { x: 40, y: 60, label: "Hematite Spherules", text: "Microscopic spherical concretions precipitated from ancient Martian water." },
      { x: 65, y: 45, label: "Microscopic Imager", text: "Camera mounted on instrument arm providing extreme macro photography." },
    ],
  },
  {
    id: "endurance",
    number: "04",
    title: "Into the Depths of Endurance",
    date: "April – December 2004",
    narration: [
      "With my 90-sol primary mission completed, NASA sent me toward a much larger crater: Endurance, spanning 130 metres wide.",
      "Scientists debated whether to send me down its steep 25-degree slopes — fearing I might never climb back out.",
      "We took the risk. I crept down layer by layer, reading millions of years of Martian history preserved in the sandstone cliffs, before successfully reversing out backwards.",
    ],
    scienceTitle: "Stratigraphic Column of Endurance Crater",
    science:
      "Opportunity measured over 7 meters of sedimentary rock, documenting cross-bedding created by migrating water ripples and ancient wind-blown sand dunes.",
    facts: [
      "Slope Angle: Up to 25 to 30 degrees",
      "Drive Technique: Backward ascent to prevent front wheel slip",
      "Crater Depth: 20 metres deep",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Endurance Slopes", text: "Steep crater cliffs showing fine-scale ripple lamination." },
      { x: 30, y: 70, label: "Rocker-Bogie Wheels", text: "Articulated 6-wheel suspension maintaining traction on 25-degree slopes." },
    ],
  },
  {
    id: "marathon",
    number: "05",
    title: "The 45-Kilometre Marathon",
    date: "2005 – 2015",
    narration: [
      "Year after year, I kept rolling. Through Victoria Crater, across the treacherous ripple sand dune fields of Meridiani, and southward across the open plains.",
      "On 24 March 2015, my odometer ticked past 42.195 kilometres. I had officially completed the first marathon driven by any human machine on another celestial body.",
      "By the end of my journey, I had traveled 45.16 kilometres — holding the all-time distance record for off-Earth wheeled exploration.",
    ],
    scienceTitle: "Off-World Distance Record & Autonomous Navigation",
    science:
      "Opportunity surpassed the Soviet Lunokhod 2 lunar rover distance record (39 km), relying on visual odometry and autonomous hazard avoidance algorithms (AutoNav) to navigate hazardous Martian dunes.",
    facts: [
      "Total Distance: 45.16 km (28.06 miles)",
      "Marathon Distance Reached: 24 March 2015",
      "Previous Record: Lunokhod 2 (39 km on Moon, 1973)",
    ],
    hotspots: [
      { x: 45, y: 65, label: "Marathon Valley", text: "Valley on the rim of Endeavour Crater named in honor of the milestone." },
      { x: 60, y: 40, label: "Pancam Mast", text: "Panoramic camera logging tens of thousands of landscape frames." },
    ],
  },
  {
    id: "endeavour",
    number: "06",
    title: "Endeavour Crater & Neutral Waters",
    date: "2011 – 2017",
    narration: [
      "In 2011, I reached the grand prize: the 22-kilometre-wide Endeavour Crater, whose rims dated back to the oldest Noachian era of Mars.",
      "Here, I discovered bright veins of calcium sulfate (gypsum) and ancient smectite clay minerals.",
      "Unlike the acidic waters of Eagle Crater, this water was neutral and benign — water that could have supported microscopic living organisms billions of years ago.",
    ],
    scienceTitle: "Clay Mineralogy & Habitable Environments",
    science:
      "Compact Reconnaissance Imaging Spectrometer (CRISM) data from Mars Reconnaissance Orbiter guided Opportunity to Phyllosilicate clay deposits, demonstrating that early Mars possessed pH-neutral, habitable water environments.",
    facts: [
      "Crater Diameter: 22 km (13.7 miles)",
      "Gypsum Vein 'Homestake': Pure CaSO4·2H2O deposited by flowing water",
      "Era: Noachian Period (>3.7 billion years ago)",
    ],
    hotspots: [
      { x: 55, y: 50, label: "Cape York Rim", text: "Exposed ancient Noachian crust along the rim of Endeavour Crater." },
      { x: 40, y: 65, label: "Homestake Vein", text: "Bright calcium sulfate mineral vein protruding from the rock." },
    ],
  },
  {
    id: "duststorm",
    number: "07",
    title: "The Sky Turns Black",
    date: "June 2018",
    narration: [
      "In May 2018, atmospheric sensors detected a storm brewing in Arabia Terra. Within days, it grew into a colossal, planet-encircling dust storm.",
      "Dust filled the Martian sky until the Sun vanished completely. The atmospheric opacity (tau) soared above 10.8 — the darkest skies ever recorded on Mars.",
      "Without sunlight, my solar panels could generate almost no electricity. My power plummeted from 645 watt-hours to less than 22 watt-hours. I had to enter deep sleep to keep my internal electronics from freezing.",
    ],
    scienceTitle: "Global Planet-Encircling Dust Event",
    science:
      "Martian global dust storms heat the middle atmosphere and induce planetary-scale thermal circulation. Sunlight levels at Meridiani dropped by over 99%, making solar-powered operations impossible.",
    facts: [
      "Tau Level: Exceeded 10.8 (complete day-time darkness)",
      "Power Output: Dropped below 22 Wh per sol",
      "Temperature: Dropped below -40°C in the electronics module",
    ],
    hotspots: [
      { x: 50, y: 30, label: "Dusty Martian Sky", text: "Fine reddish dust blotting out over 99% of all incoming solar radiation." },
      { x: 50, y: 70, label: "Solar Panels", text: "Covered by layers of airborne dust preventing power generation." },
    ],
  },
  {
    id: "legacy",
    number: "08",
    title: "Perseverance Valley: My Final Rest",
    date: "10 June 2018 – Forever",
    narration: [
      "On 10 June 2018, I transmitted my final packet of telemetry from Perseverance Valley. The mission team poetically summarized my status: 'My battery is low and it's getting dark.'",
      "For eight months, NASA sent over a thousand recovery commands, calling out into the silence. But the bitter Martian winter was too harsh; my internal clock and survival heaters had frozen.",
      "On 13 February 2019, NASA declared my mission complete. I was built for 90 days; I served humanity for 15 years. I rest forever overlooking Endeavour Crater, knowing we found the water.",
    ],
    scienceTitle: "15-Year Legacy of Discovery",
    science:
      "Opportunity operated for 5,111 sols (14 years, 138 days), returned 217,594 raw images, abraded 52 rock targets, and permanently proved that Mars was once a warm, wet, habitable world.",
    facts: [
      "Operational Lifespan: 5,111 sols (nearly 55 times its planned 90-sol mission)",
      "Final Location: Perseverance Valley, Endeavour Crater (-2.22° S, 354.67° E)",
      "Total Photos: 217,594 images returned to Earth",
    ],
    hotspots: [
      { x: 50, y: 65, label: "Perseverance Valley", text: "Final resting site overlooking the sweeping floor of Endeavour Crater." },
      { x: 75, y: 35, label: "Martian Horizon", text: "Silent red horizon where Opportunity drove for over 15 years." },
    ],
  },
];

export const APOLLO11_STORY: StoryStage[] = [
  {
    id: "launch",
    number: "01",
    title: "The Saturn V Behemoth",
    date: "16 July 1969, 13:32 UTC",
    narration: [
      "Standing 111 metres tall on Launch Complex 39A at Kennedy Space Center, the Saturn V rocket stood fueled with 2,000 tonnes of liquid oxygen and kerosene.",
      "At 13:32 UTC, five giant F-1 engines ignited with 34.5 million newtons of thrust, rattling windows 100 miles away. Neil Armstrong, Buzz Aldrin, and Michael Collins were on their way to the Moon.",
      "The rocket climbed into low Earth orbit before the S-IVB third stage fired for Translunar Injection, pushing the spacecraft out of Earth's gravity well.",
    ],
    scienceTitle: "Saturn V Propulsion & Translunar Injection",
    science:
      "The Saturn V generated 7.5 million pounds of thrust at liftoff. The S-IVB stage re-ignited in orbit to accelerate the command and lunar modules to 39,000 km/h (escape velocity toward the Moon).",
    facts: [
      "Total Height: 110.6 metres (363 ft)",
      "Launch Mass: 2,970,000 kg",
      "Crew: Neil Armstrong (Commander), Buzz Aldrin (Lunar Module Pilot), Michael Collins (Command Module Pilot)",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Saturn V Stack", text: "The most powerful rocket ever successfully flown at the time." },
      { x: 50, y: 80, label: "Pad 39A Flame Trench", text: "Diverting millions of horsepower of rocket exhaust into the Atlantic sky." },
    ],
  },
  {
    id: "orbit",
    number: "02",
    title: "In the Shadow of the Moon",
    date: "19 July 1969",
    narration: [
      "After a three-day voyage across 384,000 kilometres of space, Apollo 11 swung behind the Moon.",
      "Out of radio contact with Earth, the Service Propulsion System engine fired for Lunar Orbit Insertion, settling the spacecraft into a 111-kilometre circular lunar orbit.",
      "On orbit 13, Armstrong and Aldrin entered the Lunar Module 'Eagle' and undocked from Michael Collins in the Command Module 'Columbia'.",
    ],
    scienceTitle: "Orbital Mechanics & Undocking",
    science:
      "Lunar orbit insertion occurred behind the Moon's far side without Houston telemetry. The LM 'Eagle' used reaction control thrusters to perform separation inspection before beginning descent.",
    facts: [
      "Lunar Orbit Altitude: ~111 km above the surface",
      "Orbital Velocity: ~1.63 km/s",
      "Lunar Module Call Sign: 'Eagle' (Command Module: 'Columbia')",
    ],
    hotspots: [
      { x: 45, y: 40, label: "Lunar Module Eagle", text: "Two-stage spacecraft designed strictly for flight in the vacuum of space." },
      { x: 65, y: 60, label: "Lunar Far Side", text: "Rugged cratered terrain where Apollo 11 orbited out of radio contact." },
    ],
  },
  {
    id: "descent",
    number: "03",
    title: "1202 Alarm & The Boulder Field",
    date: "20 July 1969, 20:05 UTC",
    narration: [
      "The descent propulsion system ignited. Eagle began falling out of lunar orbit toward the Sea of Tranquility.",
      "At 6,000 feet, the guidance computer sounded a 1202 program alarm, followed by a 1201 alarm — the processor was overloaded with radar data. In Houston, 26-year-old Steve Bales gave the call: 'We're GO on that alarm!'",
      "Looking out the triangular window, Armstrong realized the autopilot was steering them into a football-field-sized crater filled with car-sized boulders. He grabbed the manual controls and flew past it.",
    ],
    scienceTitle: "Apollo Guidance Computer & Real-Time Abort Avoidance",
    science:
      "The Apollo Guidance Computer (AGC) executive operating system automatically dropped low-priority rendezvous radar tasks to prioritize thruster firing commands, allowing the landing to proceed safely.",
    facts: [
      "Descent Engine: Throttleable TRW rocket engine (1,050 to 9,850 lbf thrust)",
      "Computer Alarms: 1202 and 1201 (radar duty-cycle overload)",
      "West Crater: The boulder-strewn crater Armstrong manually overflew",
    ],
    hotspots: [
      { x: 45, y: 45, label: "Descent Window", text: "Triangular window where Neil Armstrong spotted the hazardous boulders." },
      { x: 70, y: 65, label: "West Crater Boulders", text: "Field of car-sized rocks that forced manual pilot override." },
    ],
  },
  {
    id: "landing",
    number: "04",
    title: "The Eagle Has Landed",
    date: "20 July 1969, 20:17:40 UTC",
    narration: [
      "Low on propellant, Eagle drifted laterally across the grey regolith, blowing dust into the black sky.",
      "A 67-inch contact probe dangling beneath the landing footpad touched the Moon. Aldrin called out: 'Contact light!' Seconds later: 'Engine stop.'",
      "With barely 25 seconds of fuel remaining in the descent tank, Armstrong radioed the words that echoed across planet Earth: 'Houston, Tranquility Base here. The Eagle has landed.'",
    ],
    scienceTitle: "Lunar Touchdown Dynamics",
    science:
      "Touchdown occurred at 0.5 m/s. The crushable aluminum honeycomb cartridges inside the four landing struts absorbed landing kinetic energy, settling Eagle safely on the regolith.",
    facts: [
      "Landing Time: 20 July 1969, 20:17:40 UTC",
      "Landing Site: Mare Tranquillitatis (0.674° N, 23.473° E)",
      "Remaining Propellant: ~25 seconds before mandatory abort",
    ],
    hotspots: [
      { x: 50, y: 60, label: "Tranquility Base", text: "Humanity's first extraterrestrial landing site." },
      { x: 50, y: 80, label: "Contact Probes", text: "67-inch wire sensors that illuminated the 'Contact' indicator in the cockpit." },
    ],
  },
  {
    id: "step",
    number: "05",
    title: "One Giant Leap",
    date: "21 July 1969, 02:56 UTC",
    narration: [
      "At 02:56 UTC, Neil Armstrong descended the nine-rung aluminum ladder of the descent stage and set his left boot into the lunar dust.",
      "'That's one small step for a man, one giant leap for mankind.'",
      "Over the next two and a half hours, Armstrong and Aldrin deployed the Early Apollo Scientific Experiments Package (EASEP), gathered 21.5 kilograms of lunar rock, and planted the United States flag.",
    ],
    scienceTitle: "First Lunar Surface Extravehicular Activity (EVA)",
    science:
      "The crew deployed a passive seismometer to detect moonquakes and a Laser Ranging Retroreflector (LRRR) that scientists still use today with Earth-based lasers to measure the Moon's distance to millimeter accuracy.",
    facts: [
      "EVA Duration: 2 hours, 31 minutes, 40 seconds",
      "Samples Collected: 21.55 kg (47.5 lb) of rock and soil",
      "Suit System: Apollo A7L spacesuit with liquid cooling garment",
    ],
    hotspots: [
      { x: 40, y: 70, label: "Bootprint in Regolith", text: "Footprint preserved for millions of years in the airless lunar vacuum." },
      { x: 65, y: 55, label: "Laser Retroreflector", text: "Corner-cube prism array still used to measure lunar distance today." },
    ],
  },
  {
    id: "liftoff",
    number: "06",
    title: "Ascent Stage Liftoff",
    date: "21 July 1969, 17:54 UTC",
    narration: [
      "After 21 hours and 36 minutes on the Moon, it was time to leave. The Lunar Module Ascent Stage fired its hypergolic engine.",
      "The explosive guillotine severed the umbilical connections between the ascent and descent stages.",
      "Eagle leaped upward into the sky, leaving the gold-foil-wrapped Descent Stage behind on the lunar plain — its landing legs firmly anchored in Tranquility Base forever.",
    ],
    scienceTitle: "Lunar Ascent Stage Mechanics",
    science:
      "The ascent engine used Aerozine 50 and nitrogen tetroxide (hypergolic propellants that ignite on contact without an electric spark), ensuring maximum reliability for the single-chance liftoff from the lunar surface.",
    facts: [
      "Ascent Engine Thrust: 3,500 lbf (16 kN)",
      "Time on Lunar Surface: 21 hours, 36 minutes, 20 seconds",
      "Left on Surface: LM Descent Stage, EASEP, flag, and astronaut gear",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Ascent Stage Exhaust", text: "Hypergolic plume launching Armstrong and Aldrin back to orbit." },
      { x: 50, y: 75, label: "Descent Stage Base", text: "Serving as the launch pad for the departing ascent stage." },
    ],
  },
  {
    id: "legacy",
    number: "07",
    title: "We Came in Peace for All Mankind",
    date: "1969 – Forever",
    narration: [
      "The Apollo 11 descent stage still stands in the Sea of Tranquility, exactly where Neil and Buzz left it over half a century ago.",
      "Mounted to the forward landing strut is a stainless steel plaque signed by the three astronauts and President Richard Nixon.",
      "It reads: 'Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.' It remains humanity's greatest technological monument.",
    ],
    scienceTitle: "Tranquility Base Heritage & Preservation",
    science:
      "In the vacuum of the Moon, without wind, rain, or volcanic activity, the Apollo 11 hardware and the footprints beside it will remain essentially pristine for millions of years, slowly eroded only by micrometeorite rain.",
    facts: [
      "Plaque Text: 'Here men from the planet Earth first set foot upon the Moon... We came in peace for all mankind.'",
      "Coordinates: 0.67416° N, 23.47314° E (Mare Tranquillitatis)",
      "Heritage Status: Listed in the National Register of Historic Places",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Commemorative Plaque", text: "Stainless steel plaque attached to the ladder strut." },
      { x: 50, y: 80, label: "Descent Engine Bell", text: "Engine nozzle pointing down at the scorched lunar dust." },
    ],
  },
];

export const MANGALYAAN_STORY: StoryStage[] = [
  {
    id: "inception",
    number: "01",
    title: "India's Interplanetary Dream",
    date: "2012 – 2013",
    narration: [
      "In 2012, India's space program set its sights on deep space. We had explored the Moon with Chandrayaan-1; now Mars beckoned.",
      "ISRO engineers and scientists at ISITE in Bengaluru had just 15 months to design, fabricate, and test the Mars Orbiter Mission spacecraft.",
      "With an astonishingly frugal budget of $74 million — less than the cost of a Hollywood movie like Gravity — India proved that deep space exploration was within reach of the developing world.",
    ],
    scienceTitle: "Frugal Engineering & Modular Spacecraft Design",
    science:
      "Mangalyaan repurposed the flight-proven I-1K satellite bus with a modified liquid apogee motor (LAM) and autonomous fault detection algorithms to manage communication blackouts.",
    facts: [
      "Agency: Indian Space Research Organisation (ISRO)",
      "Budget: ₹450 crore (~$74 million USD)",
      "Development Timeline: Record 15 months from government approval to launch",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Mangalyaan Spacecraft", text: "1,337 kg spacecraft equipped with five indigenous scientific instruments." },
      { x: 70, y: 65, label: "Solar Array", text: "Three solar panels generating 840 watts of electrical power at Mars." },
    ],
  },
  {
    id: "launch",
    number: "02",
    title: "Liftoff on the Polar Workhorse",
    date: "5 November 2013, 09:08 UTC",
    narration: [
      "On 5 November 2013, the skies over the Sriharikota barrier island thundered. ISRO's legendary workhorse rocket — the PSLV-C25 (XL) — blasted off.",
      "Because the PSLV lacked the power to push Mangalyaan directly onto a trans-Mars trajectory, ISRO used an ingenious orbital strategy.",
      "Over the next 25 days, six progressive engine burns in Earth orbit raised the satellite's apogee from 23,000 km to nearly 193,000 km.",
    ],
    scienceTitle: "Earth Slingshot Orbital Trajectory",
    science:
      "Mangalyaan used the Oberth effect — firing its 440-newton engine at the perigee (closest point to Earth) to maximize the energy gain per kilogram of propellant.",
    facts: [
      "Launch Vehicle: PSLV-C25 (Polar Satellite Launch Vehicle in XL configuration)",
      "Launch Site: First Launch Pad, Satish Dhawan Space Centre, Sriharikota",
      "Total Maneuvers: Six Earth-bound burns to build orbital energy",
    ],
    hotspots: [
      { x: 50, y: 35, label: "PSLV-C25 Rocket", text: "India's reliable four-stage launcher carrying the nation's first Mars mission." },
      { x: 50, y: 80, label: "Bay of Bengal", text: "Downrange tracking ships Nalanda and Yamuna monitoring telemetry." },
    ],
  },
  {
    id: "trans-mars",
    number: "03",
    title: "Trans-Mars Injection",
    date: "1 December 2013",
    narration: [
      "On 1 December 2013, Mangalyaan fired its main 440-newton liquid engine for 22 minutes.",
      "Earth receded into a small blue marble as the probe severed gravitational bonds and entered an interplanetary heliocentric transfer orbit.",
      "For 298 days, Mangalyaan cruised through 666 million kilometres of silent solar space, keeping its sensors pointed toward the Red Planet.",
    ],
    scienceTitle: "Heliocentric Cruise & Trajectory Correction",
    science:
      "The spacecraft executed three planned Trajectory Correction Maneuvers (TCMs) using small attitude thrusters to refine its path and ensure an accurate approach to Mars.",
    facts: [
      "Cruise Duration: 298 days across deep space",
      "Distance Traveled: 666 million km along a Hohmann transfer ellipse",
      "Communication Delay: Grew to over 12 minutes one-way",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Heliocentric Orbit", text: "Elliptical transfer orbit matching Earth's speed to Mars's orbital speed." },
      { x: 75, y: 60, label: "High-Gain Antenna Dish", text: "2.2-metre dish communicating with Indian Deep Space Network in Byalalu." },
    ],
  },
  {
    id: "insertion",
    number: "04",
    title: "History on the First Attempt",
    date: "24 September 2014",
    narration: [
      "On 24 September 2014, after 300 days of slumber, the main liquid apogee motor re-ignited flawlessly for 1,388 seconds.",
      "Mars's gravity captured the spacecraft into an elliptical orbit. At ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru, scientists leaped to their feet in tears of joy.",
      "India had reached Mars! ISRO became the fourth space agency in the world to reach Mars, the first in Asia, and the very first in history to succeed on its maiden attempt.",
    ],
    scienceTitle: "Mars Orbit Insertion (MOI) & Global Recognition",
    science:
      "The restart of the liquid engine after a 300-day vacuum slumber was the mission's highest-risk event. Success placed Mangalyaan in a 420 km × 76,993 km elliptical orbit with a 72.8-hour period.",
    facts: [
      "Milestone: First Asian nation to reach Martian orbit",
      "World First: Succeeded on the maiden attempt (no prior failures)",
      "Initial Orbit: 421.7 km periareion by 76,993.6 km apoareion",
    ],
    hotspots: [
      { x: 45, y: 50, label: "Mars Limb", text: "The curve of the Red Planet as Mangalyaan entered Martian orbit." },
      { x: 60, y: 35, label: "Liquid Apogee Motor", text: "440N engine that performed the critical 24-minute braking burn." },
    ],
  },
  {
    id: "science",
    number: "05",
    title: "Eight Years of Science",
    date: "2014 – 2022",
    narration: [
      "Designed for just six months, Mangalyaan operated for an astounding eight years.",
      "Its Mars Colour Camera captured thousands of breathtaking full-disk portraits of Mars, tracking planetary dust storms, mapping the polar ice caps, and imaging Mars's tiny moon Phobos from afar.",
      "The Lyman Alpha Photometer measured atomic hydrogen escaping from the upper atmosphere, unlocking clues to how Mars lost its ancient water.",
    ],
    scienceTitle: "Atmospheric Escape & Full-Globe Imaging",
    science:
      "Mangalyaan's high apoapsis (~70,000 km) provided a unique viewpoint unavailable to NASA's low-altitude orbiters: full-disc photographs of the entire Martian hemisphere in a single frame.",
    facts: [
      "Design Life: 6 months (operated for 90 months / 7.5 years)",
      "Images Captured: Over 1,000 full-disk color portraits of Mars",
      "Instruments: MCC (Camera), LAP (Photometer), MSM (Methane Sensor), TIS (Thermal Sensor), MENCA (Exosphere Analyzer)",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Mars Colour Camera (MCC)", text: "Returned iconic wide-field full-disc photographs of Mars." },
      { x: 30, y: 65, label: "Phobos Moon", text: "Captured high-contrast photos of Mars's inner moon Phobos." },
    ],
  },
  {
    id: "farewell",
    number: "06",
    title: "The Silent Orbit",
    date: "April 2022 – Eternity",
    narration: [
      "In April 2022, consecutive long eclipses cut off sunlight from Mangalyaan's solar panels for over seven hours.",
      "The small 36-ampere-hour battery, which had dutifully sustained the craft across hundreds of orbits over eight years, drained past the point of recovery.",
      "In October 2022, ISRO formally declared the mission completed. Mangalyaan remains in orbit around Mars — India's pioneering interplanetary monument, silently circling the Red Planet forever.",
    ],
    scienceTitle: "End of Mission & Enduring Legacy",
    science:
      "The spacecraft ran out of propellant to maintain orientation after surviving consecutive solar eclipses. Its operational record established India as a global space power and paved the way for Mangalyaan-2.",
    facts: [
      "Total Active Lifetime: 7 years, 11 months",
      "Total Orbits Completed: Over 1,000 orbits around Mars",
      "Final Status: Silent in elliptical Martian orbit",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Martian Orbit", text: "Eternal elliptical orbit around Mars." },
      { x: 75, y: 25, label: "Solar Array in Eclipse", text: "The shadow of Mars blocking solar energy." },
    ],
  },
];

export const PHILAE_STORY: StoryStage[] = [
  {
    id: "voyage",
    number: "01",
    title: "A Decade in the Void",
    date: "2004 – 2014",
    narration: [
      "I was ESA's boldest gamble: a 100-kilogram washing-machine-sized lander piggybacking on the Rosetta spacecraft.",
      "For ten years and eight months, we cruised 6.4 billion kilometres through the Solar System, swinging past Earth three times and Mars once for gravitational kicks.",
      "Our target was a primordial wanderer from the outer Solar System: Comet 67P/Churyumov–Gerasimenko.",
    ],
    scienceTitle: "Rosetta Gravity Assists & Hibernation",
    science:
      "Rosetta and Philae spent 31 months in deep-space hibernation to conserve power before waking up in January 2014 as they matched speed with Comet 67P.",
    facts: [
      "Agency: European Space Agency (ESA) with DLR, CNES, and ASI",
      "Lander Mass: 98 kg (Earth weight) / ~1 gram on the comet",
      "Target: Comet 67P/Churyumov–Gerasimenko",
    ],
    hotspots: [
      { x: 50, y: 40, label: "Philae Lander", text: "Cube-shaped lander clamped to the side of the Rosetta mothership." },
      { x: 70, y: 65, label: "Comet 67P", text: "Two-lobed comet nucleus shaped like a cosmic rubber duck." },
    ],
  },
  {
    id: "separation",
    number: "02",
    title: "Falling in Microgravity",
    date: "12 November 2014, 08:35 UTC",
    narration: [
      "At 08:35 UTC, Rosetta's mechanical latch released me. With a tiny mechanical push of just 18 centimetres per second, I began falling toward the comet.",
      "Gravity on Comet 67P is so faint that falling from 22 kilometres took seven nail-biting hours.",
      "As I descended, my ROLIS camera snapped dizzying, high-resolution views of fractured boulders, dust jets, and ancient organic crags rushing up to meet me.",
    ],
    scienceTitle: "Microgravity Ballistic Descent",
    science:
      "With a comet gravitational acceleration roughly 1/100,000th of Earth's, Philae fell at walking pace. Any excess rebound velocity would exceed the escape velocity (1 m/s) and eject the probe back into space.",
    facts: [
      "Descent Speed: ~1 m/s (2.2 mph)",
      "Descent Duration: 7 hours",
      "Separation Distance: 22.5 km from the comet nucleus",
    ],
    hotspots: [
      { x: 45, y: 45, label: "Descent Camera (ROLIS)", text: "Downward-looking camera capturing the approaching comet terrain." },
      { x: 60, y: 70, label: "Comet Boulders", text: "Craggy organic-rich terrain of the Agilkia landing zone." },
    ],
  },
  {
    id: "touchdown",
    number: "03",
    title: "The Triple Bounce",
    date: "12 November 2014, 15:34 UTC",
    narration: [
      "At 15:34 UTC, my three tripod feet made contact with Agilkia. But disaster struck simultaneously.",
      "My top thruster failed to push me into the ground, and both explosive ice harpoons failed to fire. Instead of latching on, I bounced off the comet surface like a trampoline.",
      "I rebounded one kilometre high into space, tumbling for nearly two hours above the comet before bouncing a second time, and finally settling wedged against a frozen cliff.",
    ],
    scienceTitle: "Harpoon Failure & Rebound Trajectory",
    science:
      "Because the nitrogen cold-gas thruster and anchor harpoons did not fire, Philae bounced at 38 cm/s. The low gravity resulted in a parabolic rebound lasting 1 hour and 50 minutes.",
    facts: [
      "First Bounce Altitude: ~1 km above the comet nucleus",
      "Second Touchdown: 17:25 UTC",
      "Final Rest: 17:32 UTC (the Abydos landing site)",
    ],
    hotspots: [
      { x: 50, y: 55, label: "Tripod Landing Gear", text: "Three articulated legs with ice screws designed to drill into comet crust." },
      { x: 30, y: 40, label: "Cold Gas Thruster", text: "Overhead thruster intended to counteract rebound momentum." },
    ],
  },
  {
    id: "abydos",
    number: "04",
    title: "The Shadowed Cliff of Abydos",
    date: "12 – 15 November 2014",
    narration: [
      "I came to rest in a bizarre, tilted orientation, wedged beneath an overhang of dark comet rock named Abydos.",
      "Two of my three feet touched the ground; one stuck out into empty space. Most critically, the cliff blocked 80% of sunlight from my solar panels.",
      "With only 64 hours of primary battery life, my science team worked around the clock. Every single instrument fired: we drilled the surface, snuffed organic vapors, and probed the comet's interior.",
    ],
    scienceTitle: "64-Hour Primary Science Sequence",
    science:
      "Philae's COSAC and Ptolemy instruments detected 16 organic compounds — including four nitrogen-bearing molecules never before found on a comet — supporting theories of prebiotic material delivery to early Earth.",
    facts: [
      "Battery Lifetime: 64 hours on primary lithium-thionyl chloride battery",
      "Organic Molecules: 16 compounds identified, including acetamide and acetone",
      "Surface Hardness: Measured by MUPUS hammering probe; the subsurface was hard as rock ice",
    ],
    hotspots: [
      { x: 45, y: 65, label: "Abydos Cliff Wall", text: "Overhanging frozen rock wall casting Philae in deep shadow." },
      { x: 65, y: 45, label: "MUPUS Hammer", text: "Subsurface thermal and penetrator probe hammering into rock-hard water ice." },
    ],
  },
  {
    id: "hibernation",
    number: "05",
    title: "Comet Hibernation",
    date: "15 November 2014 – July 2015",
    narration: [
      "On 15 November 2014 at 00:36 UTC, my battery voltage dropped below critical. I entered deep hibernation.",
      "Seven months later, in June 2015, as Comet 67P drew closer to the Sun at perihelion, warmth touched my solar panels. My computer rebooted! I transmitted eight brief packets of telemetry back to Rosetta.",
      "It was my final greeting to Earth: 'Hello from 67P! I am still here.'",
    ],
    scienceTitle: "Solar Re-Awakening at Perihelion",
    science:
      "As solar flux increased approaching perihelion (1.24 AU from the Sun), Philae's internal temperature rose from -170°C to -35°C, temporarily providing 24 watts to power the transmitter.",
    facts: [
      "Re-Awakening: 13 June 2015",
      "Telemetry Contacts: 8 brief signals received by Rosetta",
      "Final Contact: 9 July 2015",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Solar Array in Shadow", text: "Catching fleeting rays of sunlight as the comet approached perihelion." },
      { x: 70, y: 35, label: "Rosetta Radio Link", text: "S-band antenna communicating with the orbiter overhead." },
    ],
  },
  {
    id: "legacy",
    number: "06",
    title: "Riding the Comet for Eternity",
    date: "September 2016 – Eternity",
    narration: [
      "In September 2016, during Rosetta's final close passes before its own intentional landing, the OSIRIS high-resolution camera spotted me tucked beneath the crack in Abydos.",
      "There I was: intact, perched on the dark primordial ice that has circled the Sun since the birth of our Solar System 4.6 billion years ago.",
      "Humanity will never retrieve me. I am the comet rider — Europe's historic voyager, forever traveling with 67P through the cold corridors of the cosmos.",
    ],
    scienceTitle: "Final Optical Identification & Legacy",
    science:
      "Rosetta's OSIRIS camera captured Philae from an altitude of just 2.7 km on 2 September 2016, confirming its exact resting orientation and completing the scientific dataset of the mission.",
    facts: [
      "Discovered: 2 September 2016 by OSIRIS camera",
      "Location: Abydos, on the smaller lobe of Comet 67P",
      "First in History: First soft landing on a comet nucleus",
    ],
    hotspots: [
      { x: 50, y: 65, label: "Philae in Abydos Crack", text: "Spotted in OSIRIS imagery wedged against the ice overhang." },
      { x: 75, y: 25, label: "Comet Dust Tail", text: "Jets of gas and dust sublimating as 67P circles the Sun every 6.4 years." },
    ],
  },
];

export const VOYAGER1_STORY: StoryStage[] = [
  {
    id: "alignment",
    number: "01",
    title: "A Once-in-175-Year Alignment",
    date: "5 September 1977",
    narration: [
      "In the late 1970s, Jupiter, Saturn, Uranus, and Neptune aligned in a rare orbital geometric arc that occurs only once every 175 years.",
      "NASA launched Voyager 1 from Cape Canaveral aboard a Titan IIIE rocket. By utilizing gravity assists from one planet to the next, we could tour all outer giants in a single decade.",
      "Strapped to my side was the Golden Record: a gold-plated copper phonograph carrying the sounds, languages, and music of planet Earth into the cosmic deep.",
    ],
    scienceTitle: "Planetary Gravity Assist Trajectory",
    science:
      "Gary Flandro discovered that the rare planetary alignment allowed spacecraft to rob orbital momentum from giant planets, accelerating toward the next world without consuming massive fuel.",
    facts: [
      "Launch: 5 September 1977 from Cape Canaveral LC-41",
      "Launch Vehicle: Titan IIIE-Centaur",
      "Power Source: Three Radioisotope Thermoelectric Generators (RTGs)",
    ],
    hotspots: [
      { x: 50, y: 35, label: "Voyager 1 Bus", text: "Decagonal bus containing 10 electronics compartments and star tracker." },
      { x: 75, y: 65, label: "The Golden Record", text: "Gold-plated 12-inch audio-visual disc containing greetings from Earth." },
    ],
  },
  {
    id: "jupiter",
    number: "02",
    title: "The Volcanic Storms of Jupiter",
    date: "March 1979",
    narration: [
      "In March 1979, I raced through Jupiter's radiation belts, flying within 350,000 kilometres of the giant planet.",
      "I discovered active sulfur volcanoes erupting on Io — the first active volcanoes ever found beyond Earth.",
      "I discovered a thin, glowing ring circling Jupiter and revealed the cracked, icy billiard-ball crust of Europa, hinting at an ocean beneath.",
    ],
    scienceTitle: "Jupiter Flyby & Io Volcanism",
    science:
      "Voyager 1 proved that tidal heating caused by gravitational tug-of-war with Jupiter and Europa could generate active volcanism on small icy moons.",
    facts: [
      "Closest Approach: 5 March 1979 (349,000 km)",
      "Discoveries: Volcanism on Io, Jovian ring system, moons Adrastea and Metis",
      "Speed: Accelerated to over 60,000 km/h by Jupiter's gravity",
    ],
    hotspots: [
      { x: 45, y: 55, label: "Great Red Spot", text: "Massive centuries-old cyclonic storm on Jupiter." },
      { x: 70, y: 40, label: "Io Volcano Plume", text: "Sulfur dioxide plume shooting 300 km above Io's surface." },
    ],
  },
  {
    id: "saturn",
    number: "03",
    title: "Saturn & Titan's Mystery",
    date: "November 1980",
    narration: [
      "In November 1980, I entered the Saturnian system, threading past thousands of concentric icy ringlets.",
      "Mission control directed me into a close flyby of Titan to inspect its thick orange atmosphere.",
      "Titan's gravity swung my trajectory upward out of the ecliptic plane, sending me climbing high above the orbital disc of our Solar System.",
    ],
    scienceTitle: "Titan Close Flyby & Polar Ejection",
    science:
      "The choice to pass close to Titan diverted Voyager 1 out of the solar plane, sacrificing flybys of Uranus and Neptune (which Voyager 2 later completed) to probe Titan's prebiotic atmosphere.",
    facts: [
      "Closest Approach: 12 November 1980 (124,000 km from Saturn)",
      "Titan Distance: 6,490 km flyby",
      "Trajectory Shift: Ejected 35 degrees northward out of the ecliptic plane",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Saturn's Rings", text: "Braided and spoke structures discovered in Saturn's icy ring system." },
      { x: 65, y: 30, label: "Titan's Orange Smog", text: "Dense nitrogen-methane haze shielding Titan's surface." },
    ],
  },
  {
    id: "pale-blue-dot",
    number: "04",
    title: "The Pale Blue Dot",
    date: "14 February 1990",
    narration: [
      "On Valentine's Day 1990, six billion kilometres from the Sun, Carl Sagan convinced NASA to command me to turn my cameras around one last time.",
      "I snapped a family portrait of the planets. In one single frame, caught in a beam of scattered sunlight, sat Earth.",
      "A lonely speck of light less than a single pixel across. As Sagan wrote: 'Look again at that dot. That's here. That's home. That's us.' Shortly after, my cameras were turned off forever to save power.",
    ],
    scienceTitle: "The Solar System Family Portrait",
    science:
      "Voyager 1 took 60 frames creating a mosaic of six planets from 40.5 AU (6.06 billion km). The Pale Blue Dot occupies only 0.12 of a pixel.",
    facts: [
      "Distance from Earth: 6.06 billion kilometres (40.5 AU)",
      "Photo Date: 14 February 1990",
      "Quote by Carl Sagan: 'On it everyone you love, everyone you know... lived out their lives.'",
    ],
    hotspots: [
      { x: 55, y: 45, label: "The Pale Blue Dot", text: "Planet Earth seen from 6 billion kilometres away: a single pixel in a sunbeam." },
      { x: 40, y: 70, label: "Sunlight Scatter Beam", text: "Ray of scattered sunlight within the camera optics." },
    ],
  },
  {
    id: "heliopause",
    number: "05",
    title: "Entering Interstellar Space",
    date: "25 August 2012",
    narration: [
      "For decades, I flew toward the outer edge of the bubble blown by the solar wind — the heliosphere.",
      "On 25 August 2012, at a distance of 18.2 billion kilometres (121 AU) from the Sun, my plasma wave instrument detected a sudden sharp jump in plasma density.",
      "The solar wind ceased. The cosmic rays of deep space surged. I had crossed the heliopause. For the first time in history, a human spacecraft had entered the interstellar ocean.",
    ],
    scienceTitle: "Crossing the Heliopause into Interstellar Medium",
    science:
      "Crossing the heliopause was confirmed by plasma oscillation measurements (PWS) showing an 80-fold increase in electron plasma density, from solar wind density (~0.002 cm⁻³) to interstellar density (~0.08 cm⁻³).",
    facts: [
      "Distance at Crossing: 121.6 AU (18.2 billion km / 11.3 billion miles)",
      "Crossing Date: 25 August 2012",
      "Significance: First human-made craft to touch the interstellar medium",
    ],
    hotspots: [
      { x: 50, y: 45, label: "The Heliopause", text: "Boundary where the pressure of solar wind balances the interstellar galactic wind." },
      { x: 70, y: 65, label: "Galactic Cosmic Rays", text: "High-energy particles originating from supernova explosions across the galaxy." },
    ],
  },
  {
    id: "eternity",
    number: "06",
    title: "The Eternal Ambassador",
    date: "Present – 40,000+ Years",
    narration: [
      "I am now more than 24 billion kilometres from Earth. My radio signals take more than 22 hours to reach home at the speed of light.",
      "My plutonium batteries produce less power every year; one by one, NASA turns off my heaters and instruments so I can continue transmitting.",
      "Around 2030, my transmitter will fall silent forever. But in 40,000 years, I will pass within 1.6 light-years of star Gliese 445 in Camelopardalis. Carrying the Golden Record, I will drift among the stars for billions of years — a message in a bottle from humanity to the cosmos.",
    ],
    scienceTitle: "Radioisotope Decay & Galactic Trajectory",
    science:
      "The plutonium-238 heat source decays at 0.78% per year. Voyager 1 is traveling on a hyperbolic galactic trajectory at 16.9 km/s (3.6 AU/year), never to return to the Solar System.",
    facts: [
      "Current Distance: >24 billion km (>160 AU)",
      "Light-Travel Time: ~22.5 hours each way",
      "Destination: Drifting in the Milky Way, passing star Gliese 445 in ~40,000 years",
    ],
    hotspots: [
      { x: 50, y: 50, label: "Interstellar Void", text: "The vacuum between the stars, billions of kilometres beyond Pluto." },
      { x: 75, y: 60, label: "Golden Record Cover", text: "Engraved with pulsar map and instructions to play humanity's message." },
    ],
  },
];

export const ALL_MISSION_STORIES: MissionStoryMeta[] = [
  {
    artifactId: "spirit",
    title: "Spirit: The Rover That Wouldn't Quit",
    subtitle: "NASA MER-A · 2003–2010 · Mars (Gusev Crater)",
    agency: "NASA",
    heroTagline: "Designed for 90 days. Survived 6 years. Drilled the first rock on Mars.",
    stagesCount: 11,
    durationMinutes: "11 min",
    destination: "Mars (Gusev Crater)",
    stages: SPIRIT_STORY,
  },
  {
    artifactId: "opportunity",
    title: "Opportunity: 15 Years Across the Martian Plains",
    subtitle: "NASA MER-B · 2003–2018 · Mars (Meridiani Planum)",
    agency: "NASA",
    heroTagline: "Drove 45.16 kilometres, found hematite blueberries, and proved Mars was wet.",
    stagesCount: 8,
    durationMinutes: "8 min",
    destination: "Mars (Meridiani Planum)",
    stages: OPPORTUNITY_STORY,
  },
  {
    artifactId: "apollo-11",
    title: "Apollo 11 Descent Stage: One Giant Leap",
    subtitle: "NASA · 1969 · The Moon (Tranquility Base)",
    agency: "NASA",
    heroTagline: "Humanity's first extraterrestrial monument: 'We came in peace for all mankind'.",
    stagesCount: 7,
    durationMinutes: "7 min",
    destination: "The Moon (Mare Tranquillitatis)",
    stages: APOLLO11_STORY,
  },
  {
    artifactId: "chandrayaan-3",
    title: "Chandrayaan-3: Conquering the Lunar South Pole",
    subtitle: "ISRO · 2023 · The Moon (Shiv Shakti Point)",
    agency: "ISRO",
    heroTagline: "India's triumphant soft landing at the unexplored South Pole of the Moon.",
    stagesCount: 7,
    durationMinutes: "7 min",
    destination: "The Moon (Shiv Shakti Point)",
    stages: CHANDRAYAAN3_STORY,
  },
  {
    artifactId: "mangalyaan",
    title: "Mangalyaan: India's Maiden Interplanetary Leap",
    subtitle: "ISRO · 2013–2022 · Mars Orbit",
    agency: "ISRO",
    heroTagline: "First Asian nation to reach Mars, and first in the world on a maiden attempt.",
    stagesCount: 6,
    durationMinutes: "6 min",
    destination: "Mars Orbit",
    stages: MANGALYAAN_STORY,
  },
  {
    artifactId: "huygens",
    title: "Huygens: The Farthest Shore on Titan",
    subtitle: "ESA / NASA · 2005 · Titan (Saturn's Moon)",
    agency: "ESA",
    heroTagline: "Humanity's most distant landing, touching down beside liquid methane rivers.",
    stagesCount: 6,
    durationMinutes: "6 min",
    destination: "Saturn's Moon Titan",
    stages: HUYGENS_STORY,
  },
  {
    artifactId: "philae",
    title: "Philae: The Comet Hopper on 67P",
    subtitle: "ESA Rosetta · 2004–2015 · Comet 67P",
    agency: "ESA",
    heroTagline: "First spacecraft to accomplish a soft landing on a comet nucleus.",
    stagesCount: 6,
    durationMinutes: "6 min",
    destination: "Comet 67P/Churyumov–Gerasimenko",
    stages: PHILAE_STORY,
  },
  {
    artifactId: "voyager-1",
    title: "Voyager 1: Humanity's Interstellar Messenger",
    subtitle: "NASA · 1977–Present · Interstellar Space",
    agency: "NASA",
    heroTagline: "The most distant human artifact, carrying the Golden Record beyond the stars.",
    stagesCount: 6,
    durationMinutes: "6 min",
    destination: "Interstellar Space (>24 Billion km)",
    stages: VOYAGER1_STORY,
  },
  ...MARS_EXTRA_STORIES,
  ...MOON_EXTRA_STORIES,
  ...DEEP_SPACE_EXTRA_STORIES,
];

/**
 * Universal dynamic fallback generator for any artifact in the museum
 */
export function generateUniversalMissionStory(artifact: Artifact): MissionStoryMeta {
  const destName = artifact.site ?? artifact.bodyId ?? "Deep Space";
  const agency = (artifact.agency === "ISRO" || artifact.agency === "ESA" ? artifact.agency : "NASA") as "NASA" | "ISRO" | "ESA";

  const stages: StoryStage[] = [
    {
      id: "creation",
      number: "01",
      title: "Born on Earth",
      date: artifact.launchDate ? `Launched ${artifact.launchDate}` : "Mission Genesis",
      narration: [
        `I was built by ${artifact.agency} for the ${artifact.mission} mission.`,
        `My purpose was ambitious: venture across the solar system as a ${artifact.kind} to explore ${destName}.`,
        artifact.summary,
      ],
      scienceTitle: "Engineering Specifications & Mission Architecture",
      science: `${artifact.name} was engineered by ${artifact.agency} to withstand the extreme vacuum, radiation, and thermal extremes of space.`,
      facts: [
        `Agency: ${artifact.agency}`,
        `Mission: ${artifact.mission}`,
        `Hardware Class: ${artifact.kind}`,
      ],
      hotspots: [
        { x: 50, y: 40, label: artifact.name, text: `${artifact.name} flight vehicle hardware.` },
      ],
    },
    {
      id: "arrival",
      number: "02",
      title: "Journey & Arrival",
      date: artifact.arrivalDate ? `${artifact.arrivalLabel ?? "Arrival"}: ${artifact.arrivalDate}` : "Arrival in Space",
      narration: [
        `After crossing millions of kilometres of space, I arrived at my destination: ${destName}.`,
        `Every instrument began executing its programmed commands, transmitting valuable telemetry and observations home to Earth.`,
        `I became humanity's eyes and hands in this distant corner of the cosmos.`,
      ],
      scienceTitle: "Arrival Dynamics and Trajectory",
      science: `Navigating to ${destName} required orbital mechanics, high-gain communications, and autonomous operations across light-delay intervals.`,
      facts: [
        `Target Body: ${artifact.bodyId ?? "Deep Space"}`,
        `Operational Location: ${destName}`,
        `Status Record: ${artifact.statusLabel ?? artifact.status}`,
      ],
      hotspots: [
        { x: 50, y: 50, label: destName, text: `Operational area at ${destName}.` },
      ],
    },
    {
      id: "monument",
      number: "03",
      title: "Abandoned but Not Forgotten",
      date: artifact.lastSignal ? `Last Signal: ${artifact.lastSignal}` : "Eternal Monument",
      narration: [
        artifact.endReason ?? `Having completed my mission, my instruments fell silent.`,
        artifact.finalLocation ? `Today, I rest at ${artifact.finalLocation}` : `I remain at ${destName}, preserved in the clean vacuum of space.`,
        `I am abandoned, but never forgotten — an eternal testament to humanity's yearning to explore the unknown.`,
      ],
      scienceTitle: "Permanent Scientific Legacy",
      science: `The hardware remains as an extraterrestrial archaeological site, preserving humanity's early robotic and human space exploration heritage.`,
      facts: [
        `Final Condition: ${artifact.finalCondition ?? "Preserved intact on site"}`,
        `Historical Relic: ${artifact.remains ?? "Flight hardware intact"}`,
        `Museum Status: Permanent entry in Abandoned but Not Forgotten collection`,
      ],
      hotspots: [
        { x: 50, y: 50, label: "Eternal Monument", text: `The resting site of ${artifact.name}.` },
      ],
    },
  ];

  return {
    artifactId: artifact.id,
    title: `${artifact.name}: The Mission Story`,
    subtitle: `${artifact.agency} · ${artifact.mission} · ${destName}`,
    agency,
    heroTagline: artifact.summary,
    stagesCount: stages.length,
    durationMinutes: `${stages.length} min`,
    destination: destName,
    stages,
  };
}

export function getStoryForArtifact(id: string): MissionStoryMeta {
  const found = ALL_MISSION_STORIES.find((s) => s.artifactId === id);
  if (found) return found;

  const artifact = getArtifact(id);
  if (artifact) {
    return generateUniversalMissionStory(artifact);
  }

  return ALL_MISSION_STORIES[0]!;
}
