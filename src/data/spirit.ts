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
      "Nights at Gusev dropped far below freezing. Insulation, heaters and small radioisotope heater units kept the rover's 'organs' inside a safe temperature range. Inside also sat the Mini-TES infrared spectrometer, which looked out through a mirror in the mast.",
  },
  {
    id: "solar",
    name: "Solar Arrays",
    short: "Power",
    purpose: "Turn sunlight into electricity and recharge the rover's batteries.",
    detail:
      "Dust settling on the panels steadily reduced power. In March 2005, passing dust devils swept the panels clean and raised power from about 60% to 93% — one of the lucky events that kept Spirit alive for years.",
  },
  {
    id: "mast",
    name: "Pancam Mast Assembly",
    short: "Eyes",
    purpose: "Holds the Pancam colour cameras and Navcam navigation cameras about 1.5 m above the ground.",
    detail:
      "From this height Spirit took 360° stereo panoramas — like a person's eye level. The mast also hosted the periscope mirror for the Mini-TES infrared spectrometer, which identified minerals from a distance.",
  },
  {
    id: "wheels",
    name: "Six Wheels & Rocker-Bogie",
    short: "Legs",
    purpose: "A rocker-bogie suspension lets all six wheels stay on the ground over rocks and slopes.",
    detail:
      "In 2006 the right-front wheel stopped working, so Spirit drove backwards, dragging it. That dragging wheel scraped up bright, almost pure silica in 2007 — one of the mission's biggest discoveries.",
  },
  {
    id: "arm",
    name: "Instrument Deployment Device",
    short: "Robotic arm",
    purpose: "Places science instruments directly against rocks and soil.",
    detail:
      "The arm's turret carried the Microscopic Imager (a close-up camera), the Alpha Particle X-ray Spectrometer (APXS) and the Mössbauer spectrometer, which measured what rocks are made of — especially iron-bearing minerals.",
  },
  {
    id: "rat",
    name: "Rock Abrasion Tool (RAT)",
    short: "Rock grinder",
    purpose: "Grinds away a rock's dusty, weathered skin to expose fresh rock inside.",
    detail:
      "On 6 Feb 2004 Spirit ground into a rock called Adirondack — the first time a rock had ever been ground open on Mars. Fresh surfaces let the arm's instruments read the rock's true composition.",
  },
  {
    id: "hga",
    name: "High-Gain Antenna",
    short: "Voice to Earth",
    purpose: "A dish-shaped antenna that sends data directly to NASA's Deep Space Network on Earth.",
    detail:
      "It had to be pointed precisely at Earth. Most of Spirit's data actually travelled home via orbiters like Mars Odyssey, using a separate UHF antenna.",
  },
  {
    id: "lga",
    name: "Low-Gain Antenna",
    short: "Backup voice",
    purpose: "A simple antenna that can send and receive slowly without being pointed.",
    detail:
      "Useful when the rover can't aim its dish — for example while recovering from a fault, like the flash-memory problem of January 2004.",
  },
];

export const SPIRIT_PART_BY_ID = Object.fromEntries(SPIRIT_PARTS.map((p) => [p.id, p])) as Record<
  SpiritPartId,
  SpiritPart
>;

/* ────────────────────────────────────────────────────────────────
 * First-person story. The narration is a creative storytelling device
 * based on NASA mission records — not real words from the rover.
 * ──────────────────────────────────────────────────────────────── */

export type SceneKey =
  | "creation"
  | "launch"
  | "journey"
  | "arrival"
  | "first-steps"
  | "discoveries"
  | "challenges"
  | "last-days"
  | "legacy";

export interface Hotspot {
  /** Percent of scene width / height. */
  x: number;
  y: number;
  label: string;
  text: string;
}

export interface StoryStage {
  id: SceneKey;
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
    title: "My Creation",
    date: "2000 – 2003",
    narration: [
      "I was built on Earth, at NASA's Jet Propulsion Laboratory in California. Engineers gave me a purpose, a destination, and a limited amount of time: 90 Martian days.",
      "I have a twin. We were built side by side. They called us the Mars Exploration Rovers — and a nine-year-old girl named Sofi Collis gave us our names: Spirit and Opportunity.",
    ],
    scienceTitle: "Why send a robot geologist?",
    science:
      "Our job was to look for clues that liquid water once shaped Mars. Water leaves fingerprints in rocks — particular minerals, layers and textures — so I was given cameras, spectrometers, a microscope and a rock grinder.",
    facts: ["Mass: about 185 kg — roughly the weight of a large motorbike", "Size: about as big as a golf cart", "Planned mission: 90 sols (Martian days)"],
    photo: nasaImg("PIA04413", "medium", "Artist's concept of a Mars Exploration Rover at work.", "NASA/JPL/Cornell"),
    hotspots: [
      { x: 52, y: 30, label: "Camera mast", text: "My eyes: colour and navigation cameras about 1.5 m off the ground." },
      { x: 30, y: 46, label: "Solar arrays", text: "My power: solar panels charging two batteries." },
      { x: 72, y: 62, label: "Robotic arm", text: "My hand: instruments that touch rocks directly." },
    ],
  },
  {
    id: "launch",
    title: "My Departure",
    date: "10 June 2003",
    narration: [
      "Folded inside a protective shell on top of a Delta II rocket, I waited at Cape Canaveral, Florida.",
      "Then, one day, I left the only world I had ever known. The Earth grew smaller below me until it was just a blue dot.",
    ],
    scienceTitle: "Escaping Earth's gravity",
    science:
      "The rocket first put me in a parking orbit around Earth. Then an upper stage fired again to fling me onto a path around the Sun that would cross paths with Mars months later.",
    facts: ["Launch: 10 June 2003, 17:58:47 UTC", "Rocket: Delta II 7925", "Pad: Space Launch Complex 17A, Cape Canaveral"],
    photo: nasaImg("KSC-03pd1900", "medium", "The Delta II rocket carrying Spirit lifts off, 10 June 2003.", "NASA/KSC"),
    hotspots: [
      { x: 50, y: 30, label: "Delta II", text: "A three-stage rocket. I rode in its nose, folded up like origami." },
      { x: 50, y: 85, label: "Earth", text: "From orbit, the planet I came from slowly shrank away." },
    ],
  },
  {
    id: "journey",
    title: "My Journey",
    date: "June 2003 – Jan 2004",
    narration: [
      "For seven months I drifted through the dark, carried by a cruise stage with its own solar panels.",
      "Engineers on Earth nudged my path several times — four small course corrections — aiming me at a crater named Gusev.",
    ],
    scienceTitle: "You don't fly straight to Mars",
    science:
      "Spacecraft follow a curved path around the Sun, called a transfer orbit. Launch is timed so that Mars arrives at the same point in space at the same moment we do — like throwing a ball to where a friend will be.",
    facts: ["Cruise: about 7 months", "Course corrections: 1 at 10 days after launch, then 3 more", "Destination: Gusev Crater, a possible ancient lake bed"],
    hotspots: [
      { x: 18, y: 62, label: "Earth", text: "Where I started. Earth keeps moving along its own orbit." },
      { x: 82, y: 38, label: "Mars", text: "Where I was going — Mars would be waiting there in January 2004." },
    ],
  },
  {
    id: "arrival",
    title: "My Arrival",
    date: "4 January 2004 (UTC)",
    narration: [
      "I hit the top of the Martian atmosphere at thousands of kilometres per hour. My heat shield glowed. A parachute snapped open.",
      "Rockets fired, airbags inflated around me — and I fell, bouncing 28 times across the ground before rolling to a stop.",
    ],
    scienceTitle: "Landing inside a bouncing ball",
    science:
      "Mars' air is less than 1% as dense as Earth's, so a parachute alone can't slow you enough. After the parachute, retrorockets braked the fall, then giant airbags — the same type used by Mars Pathfinder — absorbed the impact at about 14 m/s.",
    facts: [
      "Parachute opened ~6–7.5 km above the ground",
      "Retrorockets fired until ~8.5 m above the ground",
      "Rolled 250–300 m from the first impact",
      "Landed ~13.4 km from the planned target",
    ],
    hotspots: [
      { x: 50, y: 18, label: "Parachute", text: "Opened about 6 to 7.5 km above the ground." },
      { x: 50, y: 52, label: "Retrorockets", text: "Fired at the base of the parachute to slow the final fall." },
      { x: 50, y: 78, label: "Airbags", text: "Four airbag clusters surrounded the lander like a beach ball." },
    ],
  },
  {
    id: "first-steps",
    title: "My First Steps",
    date: "January 2004",
    narration: [
      "When the airbags deflated, my lander opened its petals like a flower. I unfolded my solar panels and lifted my camera mast.",
      "I saw a wide, dusty plain scattered with rocks. My landing place was named Columbia Memorial Station, for the seven astronauts lost on the space shuttle Columbia.",
    ],
    scienceTitle: "Why Gusev Crater?",
    science:
      "From orbit, Gusev looked like it might once have held a lake, fed by a long valley called Ma'adim Vallis. Scientists hoped its floor held sediments laid down by water.",
    facts: [
      "Landing coordinates: 14.5692° S, 175.4729° E",
      "Rolled off the lander onto Martian soil on 15 Jan 2004",
      "First colour image released within days of landing",
    ],
    photo: nasaImg("PIA04995", "medium", "The first colour image from Spirit at Gusev Crater."),
    hotspots: [
      { x: 30, y: 72, label: "Lander petals", text: "The lander's triangular petals opened to let me roll off." },
      { x: 70, y: 40, label: "Columbia Hills", text: "Hills on the horizon — later named after the Columbia crew." },
    ],
  },
  {
    id: "discoveries",
    title: "My Discoveries",
    date: "2004 – 2007",
    narration: [
      "I ground into rocks, sniffed them with my spectrometers and climbed the hills on the horizon — all the way to the summit of Husband Hill.",
      "And then, by accident, my broken wheel dug up something remarkable: soil made almost entirely of silica.",
    ],
    scienceTitle: "Clues of a wetter Mars",
    science:
      "Nearly pure silica forms where hot water interacts with rock — like hot springs or steam vents on Earth. Finding it was strong evidence that ancient Mars was much wetter than it is now, with environments that could have been friendly to microbes.",
    facts: [
      "6 Feb 2004: first rock ever ground open on Mars (Adirondack)",
      "29 Sep 2005: reached the summit of Husband Hill",
      "2006: evidence of an ancient explosion at Home Plate",
      "2007: nearly pure silica patch nicknamed 'Gertrude Weise'",
    ],
    photo: nasaImg("PIA09491", "small", "Bright silica-rich soil churned up by Spirit's dragging wheel, 2007."),
    hotspots: [
      { x: 38, y: 64, label: "Rock Abrasion Tool", text: "Ground a shallow circle into rock to expose its fresh interior." },
      { x: 70, y: 76, label: "Silica soil", text: "Bright soil — nearly pure silica, the main ingredient of glass." },
    ],
  },
  {
    id: "challenges",
    title: "My Challenges",
    date: "2004 – 2009",
    narration: [
      "Just 18 sols after landing, my memory filled up and I went silent. Engineers on Earth fixed me from 200 million kilometres away.",
      "Then my right-front wheel stopped turning, and I learned to drive backwards. Dust storms dimmed my Sun. Every winter, I parked on a slope to catch the light.",
    ],
    scienceTitle: "Dust is a solar rover's enemy",
    science:
      "Dust settling on solar panels blocks sunlight. At the end of 2008 Spirit's panels produced only about 89 watt-hours per day, compared with roughly 700 normally — so lucky gusts of wind that blew the dust away were life-saving.",
    facts: [
      "21 Jan 2004: flash-memory fault — normal operations resumed 5 Feb",
      "2006: right-front wheel stopped working",
      "2007: massive dust storms reduced power",
      "Late 2008: power fell to ~89 Wh per sol",
    ],
    photo: nasaImg("PIA07075", "small", "The track left by Spirit's dragging right wheel (3D view)."),
    hotspots: [
      { x: 30, y: 30, label: "Dust storm", text: "Dust in the sky and on the panels cut my power." },
      { x: 62, y: 70, label: "Stuck wheel", text: "My right-front wheel stopped in 2006. I dragged it behind me." },
    ],
  },
  {
    id: "last-days",
    title: "My Last Days",
    date: "May 2009 – March 2010",
    narration: [
      "On 1 May 2009, driving beside a plateau called Home Plate, my wheels broke through a crust into soft sand. I could not climb out.",
      "Engineers tried for months. Then they gave me a new job: stay still and do science. But winter came, my panels faced the wrong way, and the cold grew too strong. After 22 March 2010, I could no longer answer.",
    ],
    scienceTitle: "Why couldn't Spirit survive the winter?",
    science:
      "To survive winter, Spirit needed its panels tilted north toward the low Sun. Stuck in the sand, it could not achieve that tilt. With too little power, its survival heaters probably could not keep it warm — NASA's most probable cause for the loss of contact.",
    facts: [
      "1 May 2009: stuck in soft soil at a site nicknamed 'Troy'",
      "28 Nov 2009: right-rear wheel stopped working",
      "Jan 2010: re-tasked as a stationary science platform",
      "22 Mar 2010: last communication",
      "25 May 2011: NASA ends recovery efforts after 1,300+ commands",
    ],
    photo: nasaImg("PIA12203", "medium", "Spirit's view from 'Troy', where it became embedded in soft soil."),
    hotspots: [
      { x: 50, y: 78, label: "Soft sand", text: "A thin crust hid loose, sulfate-rich sand underneath." },
      { x: 78, y: 22, label: "Low winter Sun", text: "The Sun sat low in the northern sky — and my panels faced the wrong way." },
    ],
  },
  {
    id: "legacy",
    title: "My Legacy",
    date: "Today",
    narration: [
      "I was meant to last 90 sols. I lasted six years, two months and nineteen days, and drove 7.73 kilometres.",
      "I still sit at Troy, beside Home Plate, dusty and silent. But the rovers that came after me — Curiosity and Perseverance — carry forward what I learned.",
    ],
    scienceTitle: "What Spirit gave science",
    science:
      "Spirit showed that Gusev's volcanic plains had been touched by water — through altered rocks, sulfur-rich soils and silica from hot springs or steam vents. It also proved that rovers could outlive their plans many times over.",
    facts: [
      "Operated more than 25 times its planned lifetime",
      "Distance driven: 7.73 km (4.8 miles)",
      "Final location: 'Troy', west of Home Plate, Columbia Hills",
    ],
    photo: nasaImg("PIA05547", "small", "Earth as seen from Mars by Spirit, March 2004 — 'you are here'.", "NASA/JPL/Cornell/Texas A&M"),
    hotspots: [
      { x: 48, y: 70, label: "Troy", text: "My final resting place, next to the plateau Home Plate." },
      { x: 80, y: 20, label: "Earth", text: "A small bright dot in the Martian sky — home." },
    ],
  },
];

export const STORY_DISCLAIMER =
  "First-person narration is a creative storytelling device based on NASA mission records. These are not real words or thoughts from the rover.";

/* Interactive timeline — each milestone maps to a story stage. */
export interface Milestone {
  date: string;
  phase: "Launch" | "Arrival" | "Landing" | "Exploration" | "Discovery" | "Conclusion" | "Legacy";
  label: string;
  stage: SceneKey;
}

export const SPIRIT_TIMELINE: Milestone[] = [
  { date: "2003-06-10", phase: "Launch", label: "Launch from Cape Canaveral", stage: "launch" },
  { date: "2004-01-04", phase: "Arrival", label: "Entry, descent & airbag landing", stage: "arrival" },
  { date: "2004-01-15", phase: "Landing", label: "Rolls off the lander", stage: "first-steps" },
  { date: "2004-02-06", phase: "Exploration", label: "First rock ground open on Mars", stage: "discoveries" },
  { date: "2005-09-29", phase: "Exploration", label: "Summit of Husband Hill", stage: "discoveries" },
  { date: "2007-05-21", phase: "Discovery", label: "Silica-rich soil announced", stage: "discoveries" },
  { date: "2009-05-01", phase: "Conclusion", label: "Stuck at Troy", stage: "last-days" },
  { date: "2010-03-22", phase: "Conclusion", label: "Last communication", stage: "last-days" },
  { date: "2011-05-25", phase: "Legacy", label: "Mission declared complete", stage: "legacy" },
];
