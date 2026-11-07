import type { Photo } from "./types";

/* ────────────────────────────────────────────────────────────────
 * Spirit Rover — components for the illustrative 3D inspection model.
 * Facts from NASA's Spirit mission page (science.nasa.gov/mission/mer-spirit).
 * ──────────────────────────────────────────────────────────────── */

export type SpiritPartId =
  | "body"
  | "solar"
  | "mast"
  | "wheels"
  | "arm"
  | "rat"
  | "hga"
  | "lga";

export interface SpiritPart {
  id: SpiritPartId;
  name: string;
  short: string;
  purpose: string;
  detail: string;
}

export const SPIRIT_PARTS: SpiritPart[] = [
  {
    id: "body",
    name: "Warm Electronics Box",
    short: "Body & brain",
    purpose: "Keeps the computer, batteries and electronics warm enough to survive Martian nights.",
    detail:
      "Nights at Gusev dropped far below freezing (often below -100°C). Aerogel insulation, electrical heaters and small radioisotope heater units (RHUs) kept the rover's vital computer and lithium-ion batteries inside a safe operating temperature range. Inside also sat the Mini-TES infrared spectrometer, which looked out through an optical periscope in the mast.",
  },
  {
    id: "solar",
    name: "Solar Arrays",
    short: "Power generation",
    purpose: "Turn sunlight into electricity and recharge the rover's lithium-ion batteries.",
    detail:
      "Covering 1.3 square metres across the main deck and deployable wings, the multi-junction solar cells produced around 700 to 900 watt-hours per sol at the start. Dust steadily accumulated on the panels, but periodic passing Martian dust devils swept them clean — raising power from 60% back to 93% in March 2005 and extending the 90-day mission into years.",
  },
  {
    id: "mast",
    name: "Pancam Mast Assembly",
    short: "Panoramic eyes",
    purpose: "Holds the Pancam colour cameras and Navcam navigation cameras about 1.5 m above the ground.",
    detail:
      "Standing at human eye level (1.5 m), the mast carried high-resolution stereo Panoramic Cameras (Pancam) with multi-wavelength filters to determine mineralogy, wide-field stereo Navigation Cameras (Navcam), and a periscope mirror for the Mini-TES thermal infrared spectrometer.",
  },
  {
    id: "wheels",
    name: "Six Wheels & Rocker-Bogie",
    short: "Mobility & suspension",
    purpose: "A rocker-bogie suspension lets all six wheels stay on the ground over rocks and steep slopes.",
    detail:
      "Each aluminum wheel had its own drive motor, with cleated treads for climbing sand and rocks. When the right-front wheel motor failed in March 2006, NASA engineers commanded Spirit to drive backwards, dragging the dead wheel. In 2007, that dragging wheel unexpectedly churned up soil that was 90% pure silica — proving ancient hot spring activity.",
  },
  {
    id: "arm",
    name: "Instrument Deployment Device",
    short: "Robotic arm",
    purpose: "Places science instruments directly against rocks and soil targets.",
    detail:
      "With five degrees of freedom, the 1.5-metre robotic arm maneuvered a 4-instrument turret directly against geological targets. It carried the Microscopic Imager, Alpha Particle X-ray Spectrometer (APXS) for chemical elements, Mössbauer Spectrometer for iron mineralogy, and the Rock Abrasion Tool.",
  },
  {
    id: "rat",
    name: "Rock Abrasion Tool (RAT)",
    short: "Diamond rock grinder",
    purpose: "Grinds away a rock's dusty, weathered skin to expose fresh unweathered rock inside.",
    detail:
      "Using diamond-tipped resin grinding teeth spinning at high speeds, the RAT created a shallow circular borehole 45 mm in diameter and up to 5 mm deep. On 6 February 2004, Spirit ground into Adirondack rock — making history as the first machine ever to grind open a rock on another world.",
  },
  {
    id: "hga",
    name: "High-Gain Antenna",
    short: "Direct voice to Earth",
    purpose: "A steerable dish antenna that sends high-speed telemetry and photos directly to NASA's Deep Space Network.",
    detail:
      "A 28-centimetre steerable parabolic reflector operating in the X-band. Spirit tracked Earth's position across the Martian sky and aimed the dish directly at NASA's 70-metre and 34-metre antennas in California, Spain, and Australia.",
  },
  {
    id: "lga",
    name: "Low-Gain Antenna",
    short: "Omnidirectional backup",
    purpose: "A simple omnidirectional antenna that sends and receives signals at lower rates without needing to be pointed.",
    detail:
      "Essential during critical events or unexpected safe-mode transitions when the rover lost attitude orientation. It saved the mission during the January 2004 flash-memory anomaly when Spirit stopped responding via the dish.",
  },
];

export const SPIRIT_PART_BY_ID = Object.fromEntries(SPIRIT_PARTS.map((p) => [p.id, p])) as Record<
  SpiritPartId,
  SpiritPart
>;

/* ────────────────────────────────────────────────────────────────
 * First-person story: 11 sequential lifecycle stages.
 * The narration is a creative storytelling device based on NASA
 * mission records — not real spoken words from the rover.
 * ──────────────────────────────────────────────────────────────── */

export type SceneKey =
  | "creation"
  | "launch"
  | "journey"
  | "arrival"
  | "descent"
  | "landing"
  | "exploration"
  | "discoveries"
  | "challenges"
  | "last-days"
  | "legacy";

export interface Hotspot {
  x: number;
  y: number;
  label: string;
  text: string;
}

export interface StoryStage {
  id: SceneKey;
  number: string;
  title: string;
  date: string;
  narration: string[];
  scienceTitle: string;
  science: string;
  facts: string[];
  photo?: Photo;
  hotspots: Hotspot[];
}

const nasaImg = (id: string, size: "medium" | "small", caption: string, credit = "NASA/JPL"): Photo => ({
  url: `https://images-assets.nasa.gov/image/${id}/${id}~${size}.jpg`,
  caption,
  credit,
});

export const SPIRIT_STORY: StoryStage[] = [
  {
    id: "creation",
    number: "01",
    title: "My Creation",
    date: "2000 – 2003",
    narration: [
      "I was born inside a sterile cleanroom at NASA's Jet Propulsion Laboratory in Pasadena, California.",
      "Engineers gave me an aluminum chassis, six motorized wheels, a camera mast for eyes, and a robotic arm for hands. A nine-year-old girl named Sofi Collis won the naming contest and called my twin and me 'Spirit' and 'Opportunity'.",
      "We were given a design lifespan of 90 Martian days. None of us imagined how long the journey would truly last.",
    ],
    scienceTitle: "Engineering an Interplanetary Field Geologist",
    science:
      "Spirit was built to investigate whether liquid water was ever present in Mars' past. Water creates distinctive alteration minerals like sulfates, hematite, and carbonates. Spirit packed four analytical instruments, five camera systems, and a rock grinder into a 185-kilogram chassis powered by gallium arsenide solar cells.",
    facts: [
      "Total mass: 185 kg (408 lb) — roughly the size of a golf cart",
      "Chassis: Warm Electronics Box insulated with aerogel",
      "Target site: Gusev Crater, a 166-km wide crater suspected to be an ancient lake bed",
    ],
    photo: nasaImg("PIA04413", "medium", "Artist's concept of a Mars Exploration Rover at work on the surface.", "NASA/JPL/Cornell"),
    hotspots: [
      { x: 50, y: 32, label: "Pancam Mast", text: "Stereo color and navigation cameras mounted at human eye level." },
      { x: 32, y: 48, label: "Solar Arrays", text: "Triple-junction gallium arsenide cells providing up to 900 Wh per sol." },
      { x: 74, y: 64, label: "Robotic Arm", text: "5-jointed arm carrying the spectrometer turret and rock grinder." },
    ],
  },
  {
    id: "launch",
    number: "02",
    title: "My Launch",
    date: "10 June 2003",
    narration: [
      "I was folded tightly like mechanical origami inside a conical aeroshell and bolted to the top of a Boeing Delta II rocket.",
      "On 10 June 2003 at 17:58 UTC, the engines ignited at Space Launch Complex 17A in Cape Canaveral, Florida. Thunder shook the coast.",
      "The rocket broke free of Earth's gravity, and the brilliant blue planet that created me shrank into a distant crescent behind my cruise stage.",
    ],
    scienceTitle: "Escape Velocity and Orbital Insertion",
    science:
      "To break orbit and head toward Mars, the Delta II 7925 heavy launcher fired its first stage, nine solid rocket boosters, and a Star-48 solid-propellant third stage to achieve hyperbolic escape velocity of over 11.2 km/s (25,000 mph).",
    facts: [
      "Launch time: 10 June 2003, 17:58:47 UTC",
      "Launch vehicle: Delta II 7925 with 9 strap-on graphite epoxy motors",
      "Launch site: Cape Canaveral Space Force Station, Florida",
    ],
    photo: nasaImg("KSC-03pd1900", "medium", "The Delta II rocket carrying Spirit lifts off from Cape Canaveral.", "NASA/KSC"),
    hotspots: [
      { x: 50, y: 28, label: "Payload Fairing", text: "Spirit sat folded safely inside the protective aerodynamic nosecone." },
      { x: 50, y: 88, label: "Earth", text: "Home slowly receded as the cruise stage embarked on the transfer orbit." },
    ],
  },
  {
    id: "journey",
    number: "03",
    title: "My Journey",
    date: "June 2003 – Jan 2004",
    narration: [
      "For nearly seven months, I drifted across 487 million kilometres of silent interplanetary space.",
      "You do not aim straight at Mars; Mars is moving around the Sun at 24 kilometres per second. We flew a grand elliptical arc called a Hohmann transfer orbit.",
      "My cruise stage fired small thrusters four times for trajectory correction maneuvers, fine-tuning my trajectory until Gusev Crater was locked precisely in my crosshairs.",
    ],
    scienceTitle: "Interplanetary Orbital Mechanics",
    science:
      "A Hohmann transfer orbit is the most fuel-efficient trajectory between two planetary orbits. Launch windows only open roughly every 26 months when Earth and Mars reach the necessary relative alignment around the Sun.",
    facts: [
      "Total cruise distance: 487 million kilometres (302 million miles)",
      "Cruise duration: 208 days",
      "Trajectory correction burns: 4 precision TCM burns during transit",
    ],
    hotspots: [
      { x: 22, y: 65, label: "Earth Orbit", text: "Where the journey began in June 2003." },
      { x: 80, y: 35, label: "Mars Rendezvous", text: "Mars arriving at the orbital intersection in January 2004." },
    ],
  },
  {
    id: "arrival",
    number: "04",
    title: "My Arrival",
    date: "4 January 2004 (UTC)",
    narration: [
      "On 4 January 2004, interplanetary silence ended violently. I slammed into the upper Martian atmosphere at 19,300 kilometres per hour.",
      "My ablative heat shield reached temperatures exceeding 1,500°C, glowing red-hot and turning atmospheric gases into incandescent plasma.",
      "Inside the aeroshell, I experienced deceleration forces peaking at nearly 10 times Earth gravity.",
    ],
    scienceTitle: "Atmospheric Entry and Thermal Protection",
    science:
      "Mars' atmosphere is very thin (less than 1% of Earth's atmospheric pressure), but at hypersonic entry velocities of Mach 16, atmospheric friction and compression dissipate 99% of the spacecraft's kinetic energy before parachute deploy.",
    facts: [
      "Atmospheric entry speed: ~5.4 km/s (12,000 mph / Mach 16)",
      "Peak thermal load: ~1,500°C (2,732°F) on the phenolic-impregnated heat shield",
      "Peak deceleration: 9.8 g",
    ],
    hotspots: [
      { x: 50, y: 48, label: "Heat Shield", text: "Absorbed intense plasma friction, slowing Spirit from 19,300 km/h." },
      { x: 50, y: 22, label: "Backshell", text: "Protected the rover and contained the parachute pack." },
    ],
  },
  {
    id: "descent",
    number: "05",
    title: "My Descent",
    date: "4 January 2004, 04:31 UTC",
    narration: [
      "At 7.5 kilometres above the Martian ground, a massive 15-metre parachute deployed at supersonic speed with a sharp explosive crack.",
      "Twenty seconds later, my glowing heat shield dropped away. Radar altimeters pinged the ground, measuring my closing speed.",
      "Seconds before impact, giant airbags made of layered synthetic Vectran inflated all around me like a massive cluster of beach balls. Retrorockets on the backshell fired to halt my final vertical fall.",
    ],
    scienceTitle: "The Airbag Landing Architecture",
    science:
      "Pioneered by Mars Pathfinder, the airbag landing system eliminated the need for heavy throttling descent engines. 24 interconnected Vectran fabric lobes cushion impact forces of up to 40 g and withstand rolling over boulder-strewn terrain.",
    facts: [
      "Parachute deployment altitude: ~7.5 km above ground at Mach 1.7",
      "Airbag material: 4 layers of high-strength synthetic Vectran",
      "Retrorocket burn: RAD (Rocket Assisted Descent) motors fired ~10 m above the surface",
    ],
    hotspots: [
      { x: 50, y: 15, label: "Supersonic Parachute", text: "Slowed the lander from 1,600 km/h to about 300 km/h." },
      { x: 50, y: 55, label: "RAD Rockets", text: "Three solid motors fired to cancel remaining downward speed." },
      { x: 50, y: 82, label: "Vectran Airbags", text: "Inflated in less than one second into a 5-metre spherical cocoon." },
    ],
  },
  {
    id: "landing",
    number: "06",
    title: "My Landing",
    date: "4 January 2004, 04:35 UTC",
    narration: [
      "I hit the ground of Gusev Crater at 50 kilometres per hour and bounced into the sky.",
      "I bounced 28 times, leaping several stories high with each rebound and rolling nearly 300 metres across the plains before settling into a shallow depression.",
      "The airbags deflated and retracted. Three triangular petals slowly unfolded like a metal lotus blossom. I stood upright, opened my solar arrays, and transmitted my first telemetry beacon back to Earth: I had arrived.",
    ],
    scienceTitle: "Touchdown at Columbia Memorial Station",
    science:
      "Landing occurred at 14.5684° S, 175.4726° E. NASA named the landing site 'Columbia Memorial Station' to honor the seven crew members of the Space Shuttle Columbia lost in February 2003. Spirit's high-gain antenna transmitted the first full-resolution stereoscopic color mosaic within 72 hours.",
    facts: [
      "Touchdown time: 4 January 2004, 04:35 UTC (Earth received time)",
      "First impact velocity: ~14 m/s (31 mph / 50 km/h)",
      "Total bounces: 28 bounces over a distance of ~300 m",
      "Landing coordinates: 14.5692° S, 175.4729° E",
    ],
    photo: nasaImg("PIA04995", "medium", "Spirit's first panoramic color view from Columbia Memorial Station."),
    hotspots: [
      { x: 30, y: 72, label: "Lander Petals", text: "Pyramid-shaped petals folded open to provide an exit ramp." },
      { x: 72, y: 42, label: "Columbia Hills", text: "The distant mountain range ~3 km to the east that Spirit would later climb." },
    ],
  },
  {
    id: "exploration",
    number: "07",
    title: "My Exploration",
    date: "2004 – 2005",
    narration: [
      "On 15 January 2004, my wheels rolled off the lander ramp and made the first tire tracks in the virgin soil of Gusev Crater.",
      "The flat volcanic plains initially seemed dry and barren. My human drivers on Earth set our sights on the Columbia Hills, three kilometres away.",
      "Over months of steady driving, I crossed craters, navigated boulder fields, and climbed steep slopes of up to 30 degrees, eventually reaching the summit of Husband Hill 106 metres above the surrounding plain.",
    ],
    scienceTitle: "Crossing the Floor of Gusev Crater",
    science:
      "Spirit navigated with autonomous hazard avoidance software (AutoNav), processing stereo image pairs from front and rear Hazcams to plot safe paths around rocks larger than 25 cm. The climb up Husband Hill confirmed altered sedimentary rock layers that could not be seen from the plain.",
    facts: [
      "Surface rollout: 15 January 2004 (Sol 12)",
      "Summit reached: Husband Hill, 29 September 2005 (Sol 618)",
      "Elevation gained: 106 metres (348 feet) above the landing plain",
      "Maximum slope climbed: 30 degrees",
    ],
    photo: nasaImg("PIA07075", "small", "Spirit looks back at its own tracks across the Martian plains."),
    hotspots: [
      { x: 42, y: 78, label: "Wheel Tracks", text: "Six cleated tires leaving twin trenches in the iron-oxide dust." },
      { x: 68, y: 35, label: "Husband Hill", text: "Named after Rick Husband, commander of STS-107 Columbia." },
    ],
  },
  {
    id: "discoveries",
    number: "08",
    title: "My Discoveries",
    date: "2004 – 2007",
    narration: [
      "On Sol 34, I pressed my Rock Abrasion Tool into a basalt boulder named 'Adirondack', becoming the first machine to grind open a rock on Mars.",
      "Then came an extraordinary accident. In 2006, my right-front wheel jammed completely. I had to drag it backwards through the dirt like a wounded limb.",
      "In May 2007, near an ancient plateau called 'Home Plate', that dragging wheel gouged deep into the soil and unearthed something dazzling white: soil that was 90% pure amorphous silica.",
    ],
    scienceTitle: "Evidence of Hydrothermal Hot Springs",
    science:
      "On Earth, 90% pure silica only precipitates in active hydrothermal systems — hot springs, geysers, or acid fumaroles. This was groundbreaking proof that ancient Mars possessed both hot water and volcanic heat sources simultaneously: an ideal habitat where microbial life could have thrived.",
    facts: [
      "First rock drilled: 'Adirondack' basalt on 6 Feb 2004 (Sol 34)",
      "Discovery site: 'Gertrude Weise' trench near Home Plate",
      "Silica concentration: 90% pure SiO2 (amorphous opal-A silica)",
      "Volcanic discovery: Bomb sag impact structure at Home Plate proving explosive volcanic steam eruptions",
    ],
    photo: nasaImg("PIA09491", "small", "Bright silica-rich soil churned up by Spirit's dragging right-front wheel."),
    hotspots: [
      { x: 40, y: 65, label: "Rock Abrasion Tool", text: "Diamond teeth ground 45 mm wide windows into rock cores." },
      { x: 72, y: 78, label: "Pure Silica Soil", text: "Bright deposits left behind by ancient boiling hydrothermal springs." },
    ],
  },
  {
    id: "challenges",
    number: "09",
    title: "My Challenges",
    date: "2004 – 2009",
    narration: [
      "Mars tests every wire and weld. On Sol 18, my flash memory corrupted and I went into an endless reboot loop. From 150 million kilometres away, engineers diagnosed the operating system and saved my life.",
      "In March 2006, my right-front wheel motor died for good. In 2007, a massive planet-encircling dust storm blotted out 99% of the direct sunlight, plunging my solar power down to critical survival thresholds.",
      "Every winter, the Sun dipped low to the north. Without enough power to run internal survival heaters, I had to climb steep north-facing slopes and park there for months just to catch enough rays to avoid freezing to death.",
    ],
    scienceTitle: "Surviving Deep Winter and Global Dust Storms",
    science:
      "Spirit depended entirely on solar energy. Normal power output was 700 to 900 Wh/day; during the 2007 and 2008 dust storms and winters, it plummeted below 90 Wh/day — barely enough to run the clock and prevent the battery electrolyte from freezing solid at -40°C.",
    facts: [
      "Sol 18 flash memory crisis: Resolved by deleting thousands of cached files via Low-Gain Antenna",
      "March 2006 (Sol 779): Right-front wheel drive motor failed completely",
      "2007 global dust storm: Atmospheric opacity (tau) exceeded 4.0; power dropped to 128 Wh/sol",
      "Late 2008: Power dropped to a record low of 89 Wh/sol",
    ],
    hotspots: [
      { x: 30, y: 32, label: "Dust-Covered Solar Array", text: "Fine reddish dust choked off solar light, slashing available power." },
      { x: 64, y: 72, label: "Jammed Wheel", text: "Required Spirit to drive all remaining kilometers in reverse." },
    ],
  },
  {
    id: "last-days",
    number: "10",
    title: "My Final Days",
    date: "May 2009 – March 2010",
    narration: [
      "On 1 May 2009 (Sol 1892), while driving beside Home Plate, my wheels broke through a deceptively thin crust into hidden powdery sand.",
      "The site was named 'Troy'. The sand underneath was slippery iron sulfate with virtually no traction. For eight months, engineers used a sandbox replica at JPL to simulate every wheel turn.",
      "In November 2009, my right-rear wheel failed too. In January 2010, NASA transitioned me to a stationary science platform.",
      "Martian winter approached. Stuck at an unfavorable tilt of 9 degrees south, my solar panels could not tilt toward the low northern Sun. On 22 March 2010, after sending my final transmission, I went to sleep. I never woke up.",
    ],
    scienceTitle: "The Troy Sand Trap and Mission Conclusion",
    science:
      "Spirit became embedded in sulfate-rich soil at 14.6° S. Because it could not achieve the required northerly tilt for the 2010 winter solstice, temperatures inside the electronics box dropped below -55°C. NASA sent more than 1,300 recovery commands over 14 months via the Deep Space Network before officially ending the mission on 25 May 2011.",
    facts: [
      "1 May 2009 (Sol 1892): Stuck at 'Troy' west of Home Plate",
      "28 Nov 2009: Right-rear wheel motor failed",
      "22 March 2010 (Sol 2210): Final documented transmission to Earth",
      "25 May 2011: NASA concludes recovery efforts after sending 1,300+ commands",
    ],
    photo: nasaImg("PIA12203", "medium", "Spirit's view from 'Troy', where the rover became permanently stuck in soft sand."),
    hotspots: [
      { x: 50, y: 80, label: "Sulfate Sand Trap", text: "Soft, slippery iron sulfates with no shear strength beneath the thin crust." },
      { x: 80, y: 24, label: "Winter Sun", text: "Low on the northern horizon while Spirit was tilted south." },
    ],
  },
  {
    id: "legacy",
    number: "11",
    title: "My Legacy",
    date: "Today & Forever",
    narration: [
      "I was designed to explore for 90 days and drive 600 metres. Instead, I lived for six years, two months, and nineteen days, driving 7,730 metres across an alien world.",
      "I still sit at Troy beside Home Plate in the Columbia Hills. My solar panels are covered in Martian dust, and the wind whispers over my camera mast.",
      "I proved that water once bubbled on Mars. The lessons learned from my struggles — from wheels to dust to winter — were engineered into Curiosity and Perseverance. I was abandoned, but I will never be forgotten.",
    ],
    scienceTitle: "Enduring Contributions to Planetary Science",
    science:
      "Spirit proved that robotic field geologists can conduct complex, multi-year science campaigns on other planets. Its discoveries rewrote textbooks on Martian climate history, confirming that Mars transitioned from an early hydrothermal, wet environment into the dry, frozen desert of today.",
    facts: [
      "Operational duration: 2,210 sols (6 years, 2 months, 19 days) — 25x planned lifetime",
      "Total distance driven: 7.73 kilometres (4.8 miles)",
      "Raw images returned: 124,000+ scientific images",
      "Final resting coordinates: 14.5684° S, 175.4726° E (Columbia Hills, Mars)",
    ],
    photo: nasaImg("PIA05547", "small", "Earth seen as an evening star from Mars by Spirit — 'Pale Blue Dot'."),
    hotspots: [
      { x: 48, y: 72, label: "Troy Rest Site", text: "Spirit's permanent resting monument in the Columbia Hills of Mars." },
      { x: 80, y: 22, label: "Earth in the Sky", text: "The home world where Spirit was dreamed, designed, and remembered." },
    ],
  },
];

export const STORY_DISCLAIMER =
  "First-person narration is a creative storytelling device based on NASA mission records. These are not real words or thoughts from the rover.";

/* Interactive timeline — each milestone maps to an exact story stage. */
export interface Milestone {
  date: string;
  phase: "Launch" | "Arrival" | "Landing" | "Exploration" | "Discovery" | "Conclusion" | "Legacy";
  label: string;
  stage: SceneKey;
  stageIndex: number;
}

export const SPIRIT_TIMELINE: Milestone[] = [
  { date: "2003-06-10", phase: "Launch", label: "Launch from Cape Canaveral", stage: "launch", stageIndex: 1 },
  { date: "2004-01-04", phase: "Arrival", label: "Hypersonic atmospheric entry", stage: "arrival", stageIndex: 3 },
  { date: "2004-01-04", phase: "Arrival", label: "Supersonic parachute & airbag deployment", stage: "descent", stageIndex: 4 },
  { date: "2004-01-04", phase: "Landing", label: "Airbag landing at Columbia Memorial Station", stage: "landing", stageIndex: 5 },
  { date: "2004-01-15", phase: "Exploration", label: "Rolls onto Martian soil", stage: "exploration", stageIndex: 6 },
  { date: "2004-02-06", phase: "Discovery", label: "First rock drilled on Mars (Adirondack)", stage: "discoveries", stageIndex: 7 },
  { date: "2005-09-29", phase: "Exploration", label: "Summit of Husband Hill conquered", stage: "exploration", stageIndex: 6 },
  { date: "2006-03-13", phase: "Conclusion", label: "Right-front wheel motor jams", stage: "challenges", stageIndex: 8 },
  { date: "2007-05-21", phase: "Discovery", label: "Pure silica hydrothermal springs discovered", stage: "discoveries", stageIndex: 7 },
  { date: "2009-05-01", phase: "Conclusion", label: "Embedded at Troy sand trap", stage: "last-days", stageIndex: 9 },
  { date: "2010-03-22", phase: "Conclusion", label: "Last documented transmission received", stage: "last-days", stageIndex: 9 },
  { date: "2011-05-25", phase: "Legacy", label: "NASA declares mission complete", stage: "legacy", stageIndex: 10 },
];
