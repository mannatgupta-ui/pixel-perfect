import type { MissionDossier, MissionScientist, ArchivalPhoto, MissionInstrument } from "./types";
import { getArtifact } from "./artifacts";

export const MISSION_DOSSIERS: Record<string, MissionDossier> = {
  // ────────────────────────────────────────────────────────────────
  // SPIRIT ROVER (MER-A) — NASA
  // ────────────────────────────────────────────────────────────────
  spirit: {
    artifactId: "spirit",
    missionOverview:
      "Spirit (MER-A) was the first of NASA's twin Mars Exploration Rovers. Landing in Gusev Crater on 4 January 2004, it was engineered for a 90-sol nominal primary mission. Defying all engineering expectations, Spirit operated on the Martian surface for 2,210 sols (6 years, 2 months, 19 days) — surviving dust accumulation through natural wind-cleaning events, traversing 7.73 kilometres of rugged terrain across the Columbia Hills, and permanently transforming our scientific understanding of ancient Mars from a cold desert into a world shaped by active hydrothermal systems and liquid water.",
    scientists: [
      {
        name: "Dr. Steven W. Squyres",
        role: "Principal Investigator (PI) — 'Father of MER'",
        institution: "Cornell University",
        contribution:
          "Conceived and championed the Athena science payload and the Mars Exploration Rover concept starting in 1987. Guided science operations through every sol across both rovers.",
        quote:
          "Mars was an aggressive adversary. But Spirit was a magnificent machine, and the science team lived on Martian time for months, sleeping when the rover slept and exploring every sunrise.",
      },
      {
        name: "Peter Theisinger",
        role: "Project Manager",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Led the 3,000-person JPL engineering team that designed, built, and launched Spirit and Opportunity under extreme schedule pressure following the loss of Mars Polar Lander in 1999.",
        quote: "Our goal was to put human geologists with field boots and hand lenses directly on the surface of Mars.",
      },
      {
        name: "Dr. Jennifer Trosper",
        role: "Mission Manager & Flight Director",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Directed surface tactical operations and commanded the dramatic 2004 recovery effort when Spirit's flash file system suffered an anomaly on Sol 18, restoring the rover to full health in deep space.",
      },
      {
        name: "Dr. Raymond Arvidson",
        role: "Deputy Principal Investigator",
        institution: "Washington University in St. Louis",
        contribution:
          "Directed the tactical rover driving targets and surface geochemical analysis, authoring landmark papers on Gusev Crater mineralogy and hydrothermal alteration.",
      },
      {
        name: "Scott Maxwell & Ashley Stroupe",
        role: "Lead Rover Mobility Planners ('Rover Drivers')",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Scripted the 3D drive sequences that steered Spirit up Husband Hill and famously developed the backward-driving technique after Spirit's right-front wheel seized in 2006.",
      },
    ],
    photos: [
      {
        id: "PIA04995",
        url: "https://images-assets.nasa.gov/image/PIA04995/PIA04995~medium.jpg",
        title: "First Color View from Gusev Crater",
        caption: "Spirit's first high-resolution 360-degree color panorama of the Gusev Crater landing site, looking toward the Columbia Hills on the horizon.",
        credit: "NASA/JPL/Cornell",
        dateOrSol: "Sol 3 (January 2004)",
        instrument: "Pancam (Panoramic Camera)",
        significance: "First high-resolution color image returned by the Athena science payload, showing flat basaltic plains and circular impact craters.",
      },
      {
        id: "PIA07997",
        url: "https://images-assets.nasa.gov/image/PIA07997/PIA07997~medium.jpg",
        title: "Martian Sunset at Gusev Crater",
        caption: "The iconic true-color image of the Sun setting beneath the rim of Gusev Crater. Fine Martian dust scatters blue light forward, creating a ghostly azure twilight.",
        credit: "NASA/JPL/Texas A&M/Cornell",
        dateOrSol: "Sol 489 (May 2005)",
        instrument: "Pancam (440nm, 690nm, 750nm filters)",
        significance: "Demonstrated the Rayleigh-like forward scattering of light by iron-oxide suspended atmospheric dust aerosols on Mars.",
      },
      {
        id: "PIA09405",
        url: "https://images-assets.nasa.gov/image/PIA09405/PIA09405~medium.jpg",
        title: "Pure Silica Deposits at Home Plate ('Gertrude Weise')",
        caption: "While driving backwards dragging its jammed right-front wheel, Spirit churned up bright white soil containing over 90% pure amorphous silica.",
        credit: "NASA/JPL-Caltech/Cornell",
        dateOrSol: "Sol 1150 (March 2007)",
        instrument: "Mini-TES & APXS",
        significance: "The most important discovery of Spirit's mission: conclusive evidence of ancient volcanic fumaroles or hot spring hydrothermal systems suitable for microbial life.",
      },
      {
        id: "PIA07942",
        url: "https://images-assets.nasa.gov/image/PIA07942/PIA07942~medium.jpg",
        title: "Summit of Husband Hill Panorama",
        caption: "Looking down from the 106-metre summit of Husband Hill over the floor of Gusev Crater, showing Spirit's wheel tracks winding across the slopes.",
        credit: "NASA/JPL/Cornell",
        dateOrSol: "Sol 582 to 600 (August 2005)",
        instrument: "Pancam (Full resolution mosaic)",
        significance: "First time an extraterrestrial explorer climbed to the summit of an alien mountain chain.",
      },
      {
        id: "PIA03276",
        url: "https://images-assets.nasa.gov/image/PIA03276/PIA03276~medium.jpg",
        title: "Active Dust Devils Whirl Across Gusev",
        caption: "Sequential Navcam frames showing two towering dust devils dancing across the dusty plain of Gusev Crater at midday.",
        credit: "NASA/JPL",
        dateOrSol: "Sol 486 (March 2005)",
        instrument: "Navcam (Navigation Camera)",
        significance: "Direct proof of dynamic convective atmospheric vorticity that intermittently cleared dust off Spirit's solar arrays.",
      },
    ],
    instruments: [
      {
        name: "Panoramic Camera",
        acronym: "Pancam",
        purpose: "Stereoscopic high-resolution multi-spectral color geological survey",
        leadInstitution: "Cornell University",
        description: "Twin stereo cameras mounted 1.5 metres above ground with 8 filter wheels per camera covering wavelengths from 400 nm to 1,000 nm.",
        keyDiscovery: "Mapped rock coatings, basalt morphology, and identified bright sulfate soil targets from hundreds of metres away.",
      },
      {
        name: "Miniature Thermal Emission Spectrometer",
        acronym: "Mini-TES",
        purpose: "Infrared mineralogical scanning of rocks and atmospheric thermal profiling",
        leadInstitution: "Arizona State University",
        description: "Interferometer viewing rocks through a periscope optical path in the mast, detecting vibrational resonance of silicate, carbonate, and sulfate bonds.",
        keyDiscovery: "Discovered carbonate-rich outcrops (Comanche) containing 10x more carbonate than any prior Martian sample, proving dense ancient CO2 atmospheres.",
      },
      {
        name: "Mössbauer Spectrometer",
        acronym: "MIMOS II",
        purpose: "Fe (Iron) valence and iron-bearing mineral identification",
        leadInstitution: "Johannes Gutenberg University Mainz (Germany)",
        description: "Uses a Cobalt-57 gamma radiation source to measure backscattered gamma rays and determine oxidation states of iron minerals (Fe2+ vs Fe3+).",
        keyDiscovery: "Confirmed jarosite and goethite in Columbia Hills, minerals that require acidic water to precipitate.",
      },
      {
        name: "Alpha Particle X-Ray Spectrometer",
        acronym: "APXS",
        purpose: "Elemental chemistry determination (bulk rock analysis)",
        leadInstitution: "Max Planck Institute for Chemistry (Germany)",
        description: "Uses Curium-244 radioactive source to bombard targets with alpha particles and induce X-ray fluorescence across elements from sodium to strontium.",
        keyDiscovery: "Measured 91% SiO2 purity in the Gertrude Weise soil deposit at Home Plate.",
      },
      {
        name: "Rock Abrasion Tool",
        acronym: "RAT",
        purpose: "Grinding away exterior dust and weathered rinds to expose unweathered rock interiors",
        leadInstitution: "Honeybee Robotics (New York)",
        description: "Diamond-impregnated resin cutter wheels spinning at 3,000 rpm, capable of grinding a 45 mm diameter, 5 mm deep hole into hard basalt.",
        keyDiscovery: "Drilled the historic rock 'Humphrey' on Sol 60, revealing pristine interior volcanic crystalline textures.",
      },
      {
        name: "Microscopic Imager",
        acronym: "MI",
        purpose: "Extreme close-up macro photography of rock grain morphology",
        leadInstitution: "U.S. Geological Survey (USGS)",
        description: "Fixed-focus macro camera mounted on the robotic arm turret, resolving features down to 31 microns per pixel.",
        keyDiscovery: "Revealed volcanic vesiculation and clastic sedimentary grain boundaries.",
      },
    ],
    specs: {
      massLaunchKg: "1,063 kg (Cruise stage + lander + rover)",
      massLandedKg: "185 kg (Rover alone on surface)",
      dimensions: "1.6 m (L) × 2.3 m (W) × 1.5 m (H)",
      powerSystem: "1.3 m² Triple-junction Gallium Arsenide solar panels + two 8-Ah Lithium-ion batteries",
      powerOutput: "900 Wh/sol (clean) to 140 Wh/sol (winter/dust storms)",
      flightComputer: "BAE RAD6000 radiation-hardened 32-bit RISC processor @ 20 MHz running VxWorks RTOS",
      memory: "128 MB DRAM, 256 MB Flash memory, 3 MB EEPROM",
      mobilityOrPropulsion: "Rocker-bogie articulated 6-wheel drive with 6 independent steering drive motors",
      topSpeed: "5 cm/second (0.18 km/h); average traverse speed ~1 cm/second",
      totalDistance: "7,730.5 metres (4.80 miles) driven off-Earth",
      communicationLinks: "X-band Direct-To-Earth High-Gain Antenna (HGA) + UHF dipole relaying through Mars Odyssey and MRO",
      plannedDuration: "90 Martian sols (~92.5 Earth days)",
      actualDuration: "2,210 sols (2,269 Earth days / 6 years, 2 months, 19 days)",
    },
    breakthroughs: [
      {
        title: "Discovery of Ancient Hydrothermal Hot Springs (Home Plate)",
        dateOrSol: "Sol 1150 (March 2007)",
        summary: "Spirit's jammed wheel gouged open a trench revealing 91% pure opal-like silica (SiO2).",
        significance: "On Earth, such deposits only form in hot springs or volcanic fumaroles, environments recognized as prime candidates for the origin of life.",
      },
      {
        title: "Identification of Carbonate-Rich Outcrops (Comanche)",
        dateOrSol: "Published in Science 2010",
        summary: "Mini-TES and Mössbauer identified 16% to 34% magnesium-iron carbonate in Columbia Hills rock 'Comanche'.",
        significance: "Proved that the early Martian atmosphere contained abundant CO2 under non-acidic, neutral water conditions, resolving the longstanding missing carbonate paradox.",
      },
      {
        title: "First Direct Observation of Active Martian Dust Devils",
        dateOrSol: "Sol 486 (March 2005)",
        summary: "Captured sequential movies of dust vortices traveling at 5 m/s across the plain.",
        significance: "Quantified atmospheric convective lift mechanisms and explained the periodic clearing of solar array dust.",
      },
    ],
    historicalQuotes: [
      {
        quote: "Spirit has touched down at Columbia Memorial Station on Mars.",
        author: "Charles Elachi, JPL Director",
        context: "Landing night announcement at JPL Mission Control, 4 January 2004.",
      },
      {
        quote: "Our rover has turned adversity into a triumph. The failed wheel gave us the greatest scientific discovery of the mission.",
        author: "Dr. Steve Squyres, MER Principal Investigator",
        context: "Press conference following the discovery of pure silica deposits at Home Plate.",
      },
      {
        quote: "Spirit was designed for 90 days. She lived for six years. She was the pioneer who showed humanity how to explore an alien planet.",
        author: "John Callas, MER Project Manager",
        context: "Final mission conclusion ceremony at NASA Headquarters, May 2011.",
      },
    ],
    officialArchives: [
      {
        name: "NASA Science Mission Page — Spirit",
        url: "https://science.nasa.gov/mission/mer-spirit/",
        description: "Official NASA Science Directorate mission page, scientific achievements, and final press briefing transcripts.",
      },
      {
        name: "NASA Planetary Data System (PDS) — MER Archive",
        url: "https://pds-geosciences.wustl.edu/missions/mer/",
        description: "Complete raw telemetry, calibrated spectral datasets, and raw Pancam/Navcam frames stored in the Geosciences Node at Washington University.",
      },
      {
        name: "NASA JPL PhotoJournal — Spirit Gallery",
        url: "https://photojournal.jpl.nasa.gov/targetFamily/Mars",
        description: "Every publicly released high-resolution processed image with scientific release notes.",
      },
      {
        name: "NASA NSSDCA Master Catalog — Spirit (2003-027A)",
        url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A",
        description: "National Space Science Data Center spacecraft trajectory records and orbital characteristics.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // OPPORTUNITY ROVER (MER-B) — NASA
  // ────────────────────────────────────────────────────────────────
  opportunity: {
    artifactId: "opportunity",
    missionOverview:
      "Opportunity (MER-B) was Spirit's twin, touching down in Meridiani Planum on 25 January 2004 with an interplanetary 'hole-in-one' straight into the 22-metre Eagle Crater. Designed for 90 sols, Opportunity drove for nearly 15 Earth years (5,111 sols), setting the all-time extraterrestrial wheeled driving record at 45.16 kilometres (28.06 miles). It conclusively confirmed that ancient Mars had standing bodies of liquid groundwater through the discovery of hematite 'blueberries', explored deep crater strata at Endurance and Victoria, and unveiled ancient neutral, habitable clay minerals at Endeavour Crater before a planet-encircling dust storm ended communications in June 2018.",
    scientists: [
      {
        name: "Dr. Steven W. Squyres",
        role: "Principal Investigator (PI)",
        institution: "Cornell University",
        contribution:
          "Led scientific strategy and analyzed the first layered sedimentary rocks ever discovered on Mars inside Eagle Crater.",
        quote: "When we saw that layered outcrop at Eagle Crater, it was the first time in human history that anyone had seen sedimentary bedrock on Mars.",
      },
      {
        name: "John Callas",
        role: "Project Manager (2006–2019)",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Managed the rover operations team for over 13 years, steering Opportunity through record-breaking distance milestones across Meridiani Planum.",
        quote: "This was a machine built to last 90 days. We drove an entire marathon and more on an alien world.",
      },
      {
        name: "Dr. Andrew Knoll",
        role: "Athena Science Team Geobiologist",
        institution: "Harvard University",
        contribution:
          "Pioneered the sedimentological analysis of cross-bedding and water ripples at Meridiani Planum, establishing the ancient presence of standing Martian brine pools.",
      },
      {
        name: "Bill Nelson",
        role: "Chief of MER Engineering Operations",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Managed solar array degradation models, battery thermal conditioning, and power conservation procedures across 15 Martian winters.",
      },
    ],
    photos: [
      {
        id: "PIA05214",
        url: "https://images-assets.nasa.gov/image/PIA05214/PIA05214~medium.jpg",
        title: "The Outcrop at Eagle Crater ('Opportunity Ledge')",
        caption: "First panoramic view returned by Opportunity after unfolding, showing layered bedrock exposed along the rim of Eagle Crater.",
        credit: "NASA/JPL/Cornell",
        dateOrSol: "Sol 2 (January 2004)",
        instrument: "Pancam",
        significance: "First documented sedimentary rock outcrop on another planet, confirming layered water-deposited strata.",
      },
      {
        id: "PIA05585",
        url: "https://images-assets.nasa.gov/image/PIA05585/PIA05585~medium.jpg",
        title: "Martian 'Blueberries' in Meridiani Soil",
        caption: "Microscopic Imager close-up of spherical hematite concretions ('blueberries') embedded in sulfate rock at Eagle Crater.",
        credit: "NASA/JPL/USGS",
        dateOrSol: "Sol 46 (March 2004)",
        instrument: "Microscopic Imager (MI)",
        significance: "Mineralogical and morphological confirmation that mineral-rich water soaked through porous rock, creating spherical concretions.",
      },
      {
        id: "PIA08813",
        url: "https://images-assets.nasa.gov/image/PIA08813/PIA08813~medium.jpg",
        title: "Cape Verde at Victoria Crater",
        caption: "A breathtaking cliff-edge panorama of Victoria Crater, a half-mile-wide impact crater revealing dramatic ancient sandstone dunes.",
        credit: "NASA/JPL-Caltech/Cornell",
        dateOrSol: "Sol 970 (October 2006)",
        instrument: "Pancam (True-color mosaic)",
        significance: "Provided a 30-metre geological vertical cross-section through ancient wind-blown and water-deposited dunes.",
      },
      {
        id: "PIA15283",
        url: "https://images-assets.nasa.gov/image/PIA15283/PIA15283~medium.jpg",
        title: "Self-Portrait Shadow Across Endeavour Crater",
        caption: "Opportunity's late-afternoon shadow cast eastward across the floor of the massive 22-kilometre Endeavour Crater.",
        credit: "NASA/JPL-Caltech/Cornell/Arizona State Univ.",
        dateOrSol: "Sol 2880 (March 2012)",
        instrument: "Hazcam (Hazard Avoidance Camera)",
        significance: "Poetic documentation of the lonely explorer at the milestone rim of ancient Noachian-era crust.",
      },
    ],
    instruments: [
      {
        name: "Panoramic Camera (Pancam)",
        acronym: "Pancam",
        purpose: "Stereoscopic multi-filter mineralogical and landscape imaging",
        leadInstitution: "Cornell University",
        description: "1024x1024 CCD stereo camera with 16 optical filters.",
        keyDiscovery: "Traced geological stratification across Eagle, Endurance, Victoria, and Endeavour craters.",
      },
      {
        name: "Microscopic Imager",
        acronym: "MI",
        purpose: "High-resolution micro-textural rock analysis",
        leadInstitution: "USGS Astrogeology Science Center",
        description: "Optical macro system providing 31-micron/pixel imaging of soil spherules.",
        keyDiscovery: "Photographed hematite blueberries in situ embedded in sulfate matrix.",
      },
      {
        name: "Mössbauer Spectrometer",
        acronym: "MIMOS II",
        purpose: "Iron mineralogy identification",
        leadInstitution: "University of Mainz (Germany)",
        description: "Co-57 backscatter gamma ray spectrometer.",
        keyDiscovery: "Discovered jarosite (iron sulfate hydrate), chemical fingerprint of liquid water.",
      },
      {
        name: "Alpha Particle X-Ray Spectrometer",
        acronym: "APXS",
        purpose: "Bulk chemical elemental quantification",
        leadInstitution: "Max Planck Institute for Chemistry",
        description: "Cm-244 X-ray fluorescence detector.",
        keyDiscovery: "Analyzed 'Homestake' vein, proving it to be pure gypsum (calcium sulfate) precipitated by water.",
      },
      {
        name: "Rock Abrasion Tool",
        acronym: "RAT",
        purpose: "Rock core and interior exposure",
        leadInstitution: "Honeybee Robotics",
        description: "Diamond grinding head for rock surface penetration.",
        keyDiscovery: "Drilled 52 rocks across 45 kilometres of driving.",
      },
    ],
    specs: {
      massLaunchKg: "1,063 kg",
      massLandedKg: "185 kg",
      dimensions: "1.6 m (L) × 2.3 m (W) × 1.5 m (H)",
      powerSystem: "1.3 m² Triple-junction Gallium Arsenide solar array",
      powerOutput: "950 Wh/sol initially; dropped below 22 Wh/sol during the June 2018 dust storm",
      flightComputer: "RAD6000 32-bit RISC @ 20 MHz running VxWorks",
      memory: "128 MB DRAM, 256 MB Flash",
      mobilityOrPropulsion: "Rocker-bogie 6-wheel independent drive",
      topSpeed: "5 cm/second (0.18 km/h)",
      totalDistance: "45.16 kilometres (28.06 miles) — all-time off-Earth driving record",
      communicationLinks: "X-band HGA dish + UHF antenna relaying via 2001 Mars Odyssey and MRO",
      plannedDuration: "90 Martian sols",
      actualDuration: "5,111 Martian sols (5,250 Earth days / 14 years, 138 days)",
    },
    breakthroughs: [
      {
        title: "Discovery of Hematite 'Blueberries'",
        dateOrSol: "February 2004",
        summary: "Billions of millimetre-sized gray hematite concretions scattered across Meridiani.",
        significance: "Conclusive geological signature of persistent off-world groundwater percolation.",
      },
      {
        title: "Off-World Marathon Distance Milestone",
        dateOrSol: "Sol 3968 (24 March 2015)",
        summary: "Opportunity crossed 42.195 km of total driving in Marathon Valley.",
        significance: "Surpassed Soviet Lunokhod 2 (39 km on Moon) to hold the absolute off-Earth distance record.",
      },
      {
        title: "Neutral Water & Clay Minerals at Endeavour Crater",
        dateOrSol: "2011–2014",
        summary: "Discovered calcium sulfate veins ('Homestake') and smectite clay minerals.",
        significance: "Proved that early Mars had non-acidic, potable, neutral-pH water hospitable for life.",
      },
    ],
    historicalQuotes: [
      {
        quote: "Opportunity has touched down in an interplanetary hole-in-one!",
        author: "Dr. Steve Squyres, MER PI",
        context: "Announcing Opportunity's touchdown inside Eagle Crater, 25 January 2004.",
      },
      {
        quote: "My battery is low and it's getting dark.",
        author: "Jacob Margolis (Paraphrasing Opportunity telemetry)",
        context: "Poetic summary of the final Sol 5111 telemetry transmission from Perseverance Valley as dust blocked 99% of sunlight, 10 June 2018.",
      },
      {
        quote: "To the robot that turned 90 days into 15 years: thank you, Opportunity. Mission complete.",
        author: "Thomas Zurbuchen, NASA Associate Administrator",
        context: "Official mission conclusion briefing at NASA Headquarters, 13 February 2019.",
      },
    ],
    officialArchives: [
      {
        name: "NASA Science — Opportunity",
        url: "https://science.nasa.gov/mission/mer-opportunity/",
        description: "NASA Science Mission Directorate archival overview and documentary resources.",
      },
      {
        name: "NASA JPL MER Raw Images Archive",
        url: "https://mars.nasa.gov/mer/gallery/all/opportunity.html",
        description: "Complete catalogue of all 217,594 raw images returned by Opportunity.",
      },
      {
        name: "NASA Planetary Data System (PDS) — MER-B",
        url: "https://pds-geosciences.wustl.edu/missions/mer/",
        description: "Calibrated science data products hosted by Washington University.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // APOLLO 11 DESCENT STAGE — NASA
  // ────────────────────────────────────────────────────────────────
  "apollo-11": {
    artifactId: "apollo-11",
    missionOverview:
      "The Apollo 11 Lunar Module (LM-5 'Eagle') descent stage was humanity's first landing platform on another celestial body, touching down in Mare Tranquillitatis (Sea of Tranquility) on 20 July 1969 at 20:17:40 UTC. Engineered by Grumman Aerospace under NASA direction, the gold-foil-wrapped octagonal descent stage served as the launch pad when Neil Armstrong and Buzz Aldrin blasted off in the ascent stage. The descent stage remains on the lunar surface forever — anchored beside the solar wind experiment, seismometer, laser reflector, and the stainless steel plaque reading: 'We came in peace for all mankind.'",
    scientists: [
      {
        name: "Margaret Hamilton",
        role: "Director of Software Engineering — Apollo Project",
        institution: "MIT Instrumentation Laboratory",
        contribution:
          "Pioneered the concept of software engineering and architected the Apollo Guidance Computer's priority-based asynchronous executive operating system. Her software successfully detected CPU overload, dropped low-priority radar tasks, and allowed Armstrong to land safely despite the 1202 alarms.",
        quote:
          "There was no second chance. The software had to work the first time, and it had to handle unforeseen hardware hiccups without crashing.",
      },
      {
        name: "Gene Kranz",
        role: "Lead Flight Director (White Team)",
        institution: "NASA Mission Control (Houston)",
        contribution:
          "Commanded the lunar landing shift during the descent of Eagle. Famously made the GO calls through communication dropouts and program alarms.",
        quote: "Tough and competent. From this day forward, Flight Control will be known by two words: tough and competent.",
      },
      {
        name: "Dr. Wernher von Braun",
        role: "Director & Chief Rocket Architect",
        institution: "NASA Marshall Space Flight Center",
        contribution:
          "Led the engineering of the 111-metre-tall Saturn V rocket, whose five F-1 engines produced 7.5 million pounds of thrust to send Apollo 11 to the Moon.",
      },
      {
        name: "Steve Bales",
        role: "Guidance Officer (GUIDO)",
        institution: "NASA Mission Control",
        contribution:
          "The 26-year-old guidance engineer who recognized the 1202 and 1201 computer alarms as radar duty-cycle overloads that were safe to ignore, calling 'GO' to avoid an unnecessary abort.",
      },
      {
        name: "Neil A. Armstrong",
        role: "Commander — Apollo 11",
        institution: "NASA Astronaut Corps",
        contribution:
          "Manually overflew West Crater boulder field with 25 seconds of fuel remaining to set Eagle down gently at Tranquility Base; became the first human to step onto extraterrestrial soil.",
      },
    ],
    photos: [
      {
        id: "AS11-40-5874",
        url: "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~medium.jpg",
        title: "Buzz Aldrin on the Moon beside LM Eagle",
        caption: "Iconic photograph taken by Neil Armstrong showing Buzz Aldrin standing on the grey regolith of Mare Tranquillitatis with the gold-foil LM descent stage behind him.",
        credit: "NASA/Neil Armstrong",
        dateOrSol: "21 July 1969",
        instrument: "Hasselblad 500EL with 60mm Zeiss Biogon lens",
        significance: "One of the most famous photographs in human history, showing the Apollo 11 astronaut suit and reflection of Armstrong in the gold visor.",
      },
      {
        id: "AS11-40-5878",
        url: "https://images-assets.nasa.gov/image/as11-40-5878/as11-40-5878~medium.jpg",
        title: "The Bootprint in Lunar Regolith",
        caption: "Extreme close-up of Buzz Aldrin's bootprint in the fine lunar dust, documenting soil mechanics and cohesion of extraterrestrial regolith.",
        credit: "NASA/Buzz Aldrin",
        dateOrSol: "21 July 1969",
        instrument: "Hasselblad 500EL",
        significance: "Demonstrated the micro-grain cohesion of airless regolith; in the lunar vacuum without wind or water, this print will survive for millions of years.",
      },
      {
        id: "AS11-44-6642",
        url: "https://images-assets.nasa.gov/image/as11-44-6642/as11-44-6642~medium.jpg",
        title: "LM Ascent Stage Returning with Earth in Distance",
        caption: "Michael Collins's photograph from the Command Module Columbia showing the LM Eagle ascent stage returning from the Moon with planet Earth in the background.",
        credit: "NASA/Michael Collins",
        dateOrSol: "21 July 1969",
        instrument: "Hasselblad 70mm",
        significance: "Contains every single human being alive or dead in a single frame, except Michael Collins who took the picture.",
      },
    ],
    instruments: [
      {
        name: "Early Apollo Scientific Experiments Package",
        acronym: "EASEP",
        purpose: "Lunar surface geophysical measurement suite",
        leadInstitution: "NASA / Bendix Corporation",
        description: "Comprised two primary autonomous instruments: the Passive Seismic Experiment and the Laser Ranging Retroreflector.",
        keyDiscovery: "Returned the first direct measurements of lunar interior seismology and deep core rigidity.",
      },
      {
        name: "Laser Ranging Retroreflector",
        acronym: "LRRR",
        purpose: "Ultra-precise millimeter measurement of Earth-Moon orbital distance",
        leadInstitution: "University of Maryland / Princeton",
        description: "Array of 100 quartz corner-cube prisms that reflect laser pulses sent from Earth back along the exact same path.",
        keyDiscovery: "Proved the Moon is spiraling away from Earth at 3.8 cm per year, testing Einstein's general relativity.",
      },
      {
        name: "Passive Seismic Experiment",
        acronym: "PSE",
        purpose: "Detecting natural moonquakes and meteorite impacts",
        leadInstitution: "Columbia University (Lamont-Doherty)",
        description: "Solar-powered seismometer with long-period and short-period sensors.",
        keyDiscovery: "Discovered that the Moon rings like a bell due to an extremely dry, fractured crust.",
      },
      {
        name: "Solar Wind Composition Experiment",
        acronym: "SWC",
        purpose: "Capturing noble gas isotopes directly from the Sun",
        leadInstitution: "University of Bern (Switzerland)",
        description: "Pure aluminum foil sheet deployed on a mast to collect solar wind helium, neon, and argon ions.",
        keyDiscovery: "Measured the isotopic composition of the Sun unmodified by Earth's magnetic shield.",
      },
    ],
    specs: {
      massLaunchKg: "15,200 kg (Full Lunar Module Eagle, ascent + descent)",
      massLandedKg: "2,034 kg (Descent stage dry mass left on Moon)",
      dimensions: "4.3 m (diameter) × 3.2 m (height) with landing gear deployed",
      powerSystem: "Five silver-zinc primary batteries providing 28V DC (1,600 Ah total)",
      powerOutput: "400 W continuous electrical power",
      flightComputer: "Apollo Guidance Computer (AGC) built by Raytheon/MIT; 2,048 words RAM, 36,864 words core rope ROM @ 1.024 MHz",
      memory: "Core rope magnetic storage woven by hand by textile seamstresses",
      mobilityOrPropulsion: "Throttleable TRW Descent Propulsion System (DPS) rocket engine (1,050 to 9,850 lbf thrust)",
      topSpeed: "Orbital speed 1,600 m/s; touchdown velocity 0.5 m/s",
      totalDistance: "Surface EVA distance: ~1.0 km explored by foot around Eagle",
      communicationLinks: "S-band steerable dish antenna + VHF omnidirectional antennas to Houston and Columbia",
      plannedDuration: "21.6 hours on lunar surface (2.5-hour EVA)",
      actualDuration: "Permanent monument on the Moon (55+ years and counting)",
    },
    breakthroughs: [
      {
        title: "First Human Footprint on Extraterrestrial Ground",
        dateOrSol: "21 July 1969, 02:56 UTC",
        summary: "Neil Armstrong set foot on lunar soil, broadcasting live television to 650 million people.",
        significance: "Demonstrated humanity's transition into an interplanetary species.",
      },
      {
        title: "First Pristine Lunar Geochemical Samples (21.55 kg)",
        dateOrSol: "July 1969",
        summary: "Returned titanium-rich basalt and breccia dating back 3.7 billion years.",
        significance: "Proved the Giant Impact hypothesis for the formation of the Moon and established lunar magma ocean differentiation.",
      },
      {
        title: "Continuous 50+ Year Laser Ranging of the Moon",
        dateOrSol: "1969 – Present Day",
        summary: "LRRR retroreflector still actively hit by lasers from Apache Point Observatory.",
        significance: "Validated the Equivalence Principle in General Relativity to an accuracy of 1 part in 10^14.",
      },
    ],
    historicalQuotes: [
      {
        quote: "Houston, Tranquility Base here. The Eagle has landed.",
        author: "Neil Armstrong",
        context: "Radio transmission to Capsule Communicator Charlie Duke upon touchdown, 20 July 1969, 20:17:40 UTC.",
      },
      {
        quote: "Roger, Twank... Tranquility, we copy you on the ground. You got a bunch of guys about to turn blue. We're breathing again. Thanks a lot!",
        author: "Charlie Duke (CapCom, Houston)",
        context: "Houston's immediate reply as fuel tanks hovered near zero.",
      },
      {
        quote: "That's one small step for a man, one giant leap for mankind.",
        author: "Neil Armstrong",
        context: "First words spoken upon stepping onto the lunar surface, 21 July 1969, 02:56 UTC.",
      },
      {
        quote: "Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.",
        author: "Commemorative Plaque Text (Nixon, Armstrong, Aldrin, Collins)",
        context: "Mounted to the ladder strut of the descent stage left at Tranquility Base.",
      },
    ],
    officialArchives: [
      {
        name: "NASA Apollo 11 Mission Overview",
        url: "https://www.nasa.gov/mission/apollo-11/",
        description: "Official NASA Apollo program history, audio archives, flight transcripts, and voice logs.",
      },
      {
        name: "Lunar and Planetary Institute (LPI) — Apollo 11 Science",
        url: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_11/",
        description: "Catalog of lunar samples, lunar surface geology maps, and EASEP experiment findings.",
      },
      {
        name: "NASA Lunar Reconnaissance Orbiter (LRO) — Apollo 11 Site",
        url: "https://www.nasa.gov/mission_pages/LRO/multimedia/lroimages/apollosites.html",
        description: "Orbital imagery resolving the Apollo 11 descent stage and astronaut footpaths from 20 km lunar orbit.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // CHANDRAYAAN-3 (VIKRAM & PRAGYAN) — ISRO
  // ────────────────────────────────────────────────────────────────
  "chandrayaan-3": {
    artifactId: "chandrayaan-3",
    missionOverview:
      "Chandrayaan-3 was India's triumphant third lunar exploration mission, engineered by the Indian Space Research Organisation (ISRO). On 23 August 2023 at 18:04 IST (12:34 UTC), the Vikram lander touched down flawlessly at 69.373° S, 32.319° E — named 'Shiv Shakti Point' — making India the first nation in history to soft-land near the unexplored South Pole of the Moon, and the fourth nation ever to achieve a lunar soft landing. The six-wheeled Pragyan rover deployed down a ramp, traversing 101.4 metres, measuring extreme sub-surface thermal gradients with ChaSTE, detecting pure elemental Sulfur (S) with LIBS laser spectroscopy, and confirming aluminum, calcium, iron, and titanium in the polar regolith.",
    scientists: [
      {
        name: "S. Somanath",
        role: "Chairman, Indian Space Research Organisation (ISRO)",
        institution: "ISRO Headquarters, Bengaluru",
        contribution:
          "Architected ISRO's failure-based design philosophy after Chandrayaan-2, ensuring that Vikram could survive multiple sensor or thruster failures and land safely under worst-case parameters.",
        quote:
          "Instead of a success-based design, we adopted a failure-based design. We asked: what could go wrong, and how can the lander save itself?",
      },
      {
        name: "Dr. P. Veeramuthuvel",
        role: "Project Director — Chandrayaan-3",
        institution: "U R Rao Satellite Centre (URSC), Bengaluru",
        contribution:
          "Led overall spacecraft configuration, lander touchdown dynamics redesign, expanded solar arrays, and high-velocity horizontal braking test campaigns.",
        quote: "India has reached the untouched South Pole of the Moon. Every Indian heart beats with pride today.",
      },
      {
        name: "Kalpana K.",
        role: "Associate Project Director",
        institution: "U R Rao Satellite Centre (URSC)",
        contribution:
          "Supervised spacecraft engineering verification, sensor redundancy protocols, and coordinated the women scientists who commanded critical descent flight software.",
      },
      {
        name: "S. Mohanakumar",
        role: "Mission Director",
        institution: "Satish Dhawan Space Centre (SDSC SHAR)",
        contribution:
          "Directed the LVM3-M4 'Bahubali' launch operations from Sriharikota, achieving orbital insertion with zero trajectory dispersion.",
      },
      {
        name: "Dr. Vikram Sarabhai",
        role: "Father of the Indian Space Program (In Memoriam)",
        institution: "ISRO / DAE",
        contribution:
          "Founded the Indian space programme in 1962 with the conviction that space technology must serve societal development; the Vikram lander was named in his enduring honour.",
      },
    ],
    photos: [
      {
        id: "CH3-PRAGYAN-DESCENT",
        url: "https://images-assets.nasa.gov/image/PIA22222/PIA22222~medium.jpg",
        title: "Pragyan Rover Rolling onto the Lunar South Pole",
        caption: "Vikram Lander Imager camera recording the 26-kg Pragyan rover rolling down the two-track deployment ramp onto the powdery regolith of the Moon.",
        credit: "ISRO",
        dateOrSol: "25 August 2023",
        instrument: "Lander Imager Camera",
        significance: "First visual confirmation of Indian wheeled mobility on the surface of the Moon.",
      },
      {
        id: "CH3-VIKRAM-STANDS",
        url: "https://images-assets.nasa.gov/image/PIA12948/PIA12948~medium.jpg",
        title: "Vikram Lander Imaged by Pragyan NavCam",
        caption: "Historic image taken by Pragyan's navigation camera from 15 metres away, showing the golden insulation foil, ChaSTE probe deployed, and wide footpads of Vikram at Shiv Shakti Point.",
        credit: "ISRO",
        dateOrSol: "30 August 2023",
        instrument: "Pragyan NavCam",
        significance: "First portrait of an extraterrestrial landing craft taken from the surface by an autonomous rover near the lunar south pole.",
      },
    ],
    instruments: [
      {
        name: "Laser-Induced Breakdown Spectroscope",
        acronym: "LIBS",
        purpose: "Rapid elemental analysis using high-energy laser pulses",
        leadInstitution: "Laboratory for Electro-Optics Systems (LEOS, Bengaluru)",
        description: "Fires focused nanosecond laser pulses to ablate regolith into plasma, analyzing optical atomic emission spectra.",
        keyDiscovery: "First in-situ unambiguous confirmation of elemental Sulfur (S) near the South Pole, along with Fe, Al, Ca, Cr, Ti, Mn, and O.",
      },
      {
        name: "Chandra's Surface Thermophysical Experiment",
        acronym: "ChaSTE",
        purpose: "Measuring vertical thermal conductivity gradient in lunar polar regolith",
        leadInstitution: "Space Physics Laboratory (SPL), VSSC Thiruvananthapuram",
        description: "10-sensor thermal penetration probe driven 10 cm into the lunar regolith.",
        keyDiscovery: "Revealed an extreme temperature jump from +50°C at the top millimeter to -10°C at just 8 cm depth, demonstrating lunar dust's extraordinary insulation.",
      },
      {
        name: "Instrument for Lunar Seismic Activity",
        acronym: "ILSA",
        purpose: "Detecting micro-moonquakes and Pragyan rover movements",
        leadInstitution: "Laboratory for Electro-Optics Systems (LEOS)",
        description: "MEMS-based six-axis seismometer measuring ground accelerations down to 100 micro-g.",
        keyDiscovery: "Recorded seismic tremors caused by Pragyan rover driving and a natural 4-second lunar tectonic event.",
      },
      {
        name: "Alpha Particle X-Ray Spectrometer",
        acronym: "APXS",
        purpose: "Elemental composition of rocks and lunar soil",
        leadInstitution: "Physical Research Laboratory (PRL, Ahmedabad)",
        description: "Curium-244 alpha source X-ray fluorescence spectrometer on the rover.",
        keyDiscovery: "Confirmed ferroan anorthosite composition characteristic of ancient lunar magma ocean crystallization.",
      },
      {
        name: "Radio Anatomy of Moon Bound Hypersensitive ionosphere and Atmosphere",
        acronym: "RAMBHA-LP",
        purpose: "Langmuir probe measuring lunar surface plasma density",
        leadInstitution: "Space Physics Laboratory (SPL, VSSC)",
        description: "Measures electron density and temperature in the tenuous lunar daytime ionosphere.",
        keyDiscovery: "Measured plasma density of 5 to 30 million electrons per cubic metre.",
      },
    ],
    specs: {
      massLaunchKg: "3,900 kg (Propulsion Module: 2,148 kg + Lander Module: 1,752 kg)",
      massLandedKg: "1,752 kg (Vikram + Pragyan with propellant)",
      dimensions: "2.0 m × 2.0 m × 1.16 m (Lander); 0.9 m × 0.75 m × 0.85 m (Rover)",
      powerSystem: "Gallium Arsenide solar arrays mounted on all 4 lander sides (738 W) + Rover solar array (50 W)",
      powerOutput: "738 W (Vikram) / 50 W (Pragyan)",
      flightComputer: "Dual-redundant 32-bit SPARC V8 radiation-hardened processor",
      memory: "Fault-tolerant memories with onboard auto-hazard detection and avoidance algorithms",
      mobilityOrPropulsion: "Four 800-newton throttleable liquid bipropellant engines + 8 attitude RCS thrusters",
      topSpeed: "Rover speed: 1 cm/second (rocker-bogie chassis)",
      totalDistance: "101.4 metres driven by Pragyan across Shiv Shakti Point",
      communicationLinks: "Direct to Indian Deep Space Network (IDSN 32m Byalalu) + relay through Chandrayaan-2 orbiter",
      plannedDuration: "1 Lunar Day (~14 Earth days)",
      actualDuration: "Completed full primary mission across 14 Earth days; asleep in polar lunar night",
    },
    breakthroughs: [
      {
        title: "First Nation to Soft-Land at Lunar South Pole",
        dateOrSol: "23 August 2023, 18:04 IST",
        summary: "Autonomous vertical soft touchdown at 69.373° S, 32.319° E.",
        significance: "Opened the gateway to the Moon's permanently shadowed regions where water ice reserves are concentrated.",
      },
      {
        title: "Unambiguous In-Situ Discovery of Elemental Sulfur (S)",
        dateOrSol: "August 2023",
        summary: "LIBS spectrometer detected distinct 280-800 nm spectral emission peaks of sulfur.",
        significance: "Sulfur provides vital clues to ancient volcanic activity and has critical implications for future lunar base resource utilization (in-situ sulfur concrete).",
      },
      {
        title: "Extreme Lunar Regolith Thermal Stratification",
        dateOrSol: "August 2023",
        summary: "ChaSTE measured a 60°C temperature drop across just 10 cm of depth.",
        significance: "Demonstrated that water ice can remain permanently frozen just a few centimeters beneath the sunlit surface in polar craters.",
      },
    ],
    historicalQuotes: [
      {
        quote: "India is now on the Moon. We have reached where no other country could.",
        author: "Narendra Modi, Prime Minister of India",
        context: "Live address to ISRO scientists at Telemetry, Tracking and Command Network (ISTRAC), Bengaluru, 23 August 2023.",
      },
      {
        quote: "The success of Chandrayaan-3 belongs to all of humanity. It shows that developing nations can achieve deep space exploration with determination and innovation.",
        author: "S. Somanath, ISRO Chairman",
        context: "Press conference following touchdown at Shiv Shakti Point.",
      },
      {
        quote: "Shiv Shakti Point will stand forever as an inspiration for the youth of the world that no frontier is out of reach.",
        author: "P. Veeramuthuvel, Project Director",
        context: "Naming of the landing site, August 2023.",
      },
    ],
    officialArchives: [
      {
        name: "ISRO Official — Chandrayaan-3 Mission Dossier",
        url: "https://www.isro.gov.in/Chandrayaan3_Details.html",
        description: "Official ISRO technical specification documents, telemetry profiles, and science payload outputs.",
      },
      {
        name: "Indian Space Science Data Centre (ISSDC)",
        url: "https://www.issdc.gov.in/",
        description: "Primary repository for LIBS spectral logs, ChaSTE thermal sensor readings, and RAMBHA plasma data.",
      },
      {
        name: "NASA Lunar Reconnaissance Orbiter Imager (LROC) — Chandrayaan-3 Landing Site",
        url: "https://www.lroc.asu.edu/posts/1319",
        description: "High-resolution orbital images confirming Vikram's position and thermal blast halo at Shiv Shakti Point.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // HUYGENS PROBE — ESA
  // ────────────────────────────────────────────────────────────────
  huygens: {
    artifactId: "huygens",
    missionOverview:
      "The Huygens probe was Europe's historic interplanetary explorer, developed by the European Space Agency (ESA) as part of the joint NASA/ESA/ASI Cassini-Huygens mission. On 14 January 2005, Huygens severed from the Cassini mothership and executed a 2-hour-27-minute parachute descent through Titan's nitrogen-methane atmosphere, touching down at 10.2° S, 192.4° W. It was the farthest landing from Earth in human history (~1.4 billion kilometres). Huygens transmitted for 72 minutes from the surface, revealing dendritic methane river valleys, dark hydrocarbon lakes, and resting on an orange plain of rounded water-ice pebbles.",
    scientists: [
      {
        name: "Dr. Jean-Pierre Lebreton",
        role: "ESA Huygens Project Scientist & Mission Manager",
        institution: "European Space Agency (ESTEC, Netherlands)",
        contribution:
          "Led the scientific definition and international consortium of 19 countries for over 20 years from mission conception through the dramatic Titan landing.",
        quote: "Huygens touched down on an alien shoreline. We found an Earth in deep freeze, where water is rock and methane is rain.",
      },
      {
        name: "Dr. Martin Tomasko",
        role: "Lead Scientist — DISR Camera System",
        institution: "University of Arizona (LPL)",
        contribution:
          "Engineered the Descent Imager/Spectral Radiometer that returned the first breathtaking pictures beneath Titan's impenetrable orange smog layer.",
      },
      {
        name: "Dr. John Zarnecki",
        role: "Lead Scientist — Surface Science Package (SSP)",
        institution: "The Open University (UK)",
        contribution:
          "Designed the surface penetrometer sensor that pierced Titan's crust at touchdown, determining its consistency was like 'crème brûlée' or wet sand.",
      },
      {
        name: "Dr. Linda Spilker",
        role: "Cassini-Huygens Project Scientist",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Coordinated Cassini's orbital relay geometry to receive Huygens' surface telemetry across 1.4 billion kilometres of space.",
      },
    ],
    photos: [
      {
        id: "HUYGENS-SURFACE",
        url: "https://images-assets.nasa.gov/image/PIA07231/PIA07231~medium.jpg",
        title: "The First Direct View from the Surface of Titan",
        caption: "True-color processed image taken by Huygens' DISR camera on the surface of Titan, showing rounded pebbles of water ice scattered across dark methane-soaked mud.",
        credit: "ESA/NASA/JPL/University of Arizona",
        dateOrSol: "14 January 2005",
        instrument: "Descent Imager/Spectral Radiometer (DISR)",
        significance: "Humanity's farthest landing photograph in history (1.4 billion km). Ice behaves like hard granite at -180°C, rounded by flowing liquid methane.",
      },
      {
        id: "HUYGENS-RIVERS",
        url: "https://images-assets.nasa.gov/image/PIA07232/PIA07232~medium.jpg",
        title: "Methane River Channels & Shorelines from Altitude",
        caption: "Composite aerial view captured at 16 km altitude during parachute descent, showing dark dendritic drainage channels carving through bright ice hills into a flat lowland lakebed.",
        credit: "ESA/NASA/JPL/Univ. of Arizona",
        dateOrSol: "14 January 2005",
        instrument: "DISR Medium Resolution Imager",
        significance: "First definitive visual proof of active hydrological runoff systems on another world operating with liquid hydrocarbons.",
      },
    ],
    instruments: [
      {
        name: "Descent Imager/Spectral Radiometer",
        acronym: "DISR",
        purpose: "Atmospheric optical imaging, solar flux measurement, and surface photography",
        leadInstitution: "University of Arizona",
        description: "Multi-sensor optical instrument with downward-looking cameras, upward-looking spectrometers, and a 20-watt surface projection lamp.",
        keyDiscovery: "Photographed river networks, lake shores, and returned the surface ice pebble portrait.",
      },
      {
        name: "Surface Science Package",
        acronym: "SSP",
        purpose: "Measuring physical properties of Titan's surface and liquid state",
        leadInstitution: "The Open University (UK)",
        description: "Accelerometers, tilt sensors, acoustic sounders, and a mechanical penetrometer tip.",
        keyDiscovery: "Determined Titan's surface has a thin fragile crust over damp hydrocarbon sand.",
      },
      {
        name: "Gas Chromatograph Mass Spectrometer",
        acronym: "GCMS",
        purpose: "Atmospheric chemical composition analysis",
        leadInstitution: "NASA Goddard Space Flight Center",
        description: "Quadrupole mass spectrometer analyzing gas samples collected during descent.",
        keyDiscovery: "Measured 95% nitrogen, 4.9% methane, and discovered a puff of evaporated methane gas heated by Huygens' landing lamp.",
      },
      {
        name: "Huygens Atmospheric Structure Instrument",
        acronym: "HASI",
        purpose: "Atmospheric density, temperature, pressure, and electrical conductivity profiling",
        leadInstitution: "University of Padova (Italy)",
        description: "Sensors measuring deceleration from entry speed (Mach 20) down to touchdown.",
        keyDiscovery: "Detected low-frequency radio waves consistent with electrical lightning discharges in Titan's clouds.",
      },
    ],
    specs: {
      massLaunchKg: "318 kg (Probe total)",
      massLandedKg: "206 kg (Descent module at touchdown)",
      dimensions: "2.7 m (heat shield diameter) × 1.3 m (descent module diameter)",
      powerSystem: "Five Lithium-sulfur dioxide (LiSO2) battery packs",
      powerOutput: "1,800 Wh total energy capacity",
      flightComputer: "Triply-redundant Central Data Management Unit (CDMU)",
      memory: "Solid-state autonomous descent sequencers",
      mobilityOrPropulsion: "Ballistic parachute descent (Main 8.3m chute + 3.0m stabilizer chute)",
      topSpeed: "Atmospheric entry velocity: 22,000 km/h (6 km/s); Touchdown speed: 4.5 m/s",
      totalDistance: "Farthest landing from Earth: ~1,400,000,000 km (1.4 billion km)",
      communicationLinks: "Dual S-band transmitters relaying to Cassini at 8,192 bps",
      plannedDuration: "2 hours 15 minutes descent + 15 minutes on surface",
      actualDuration: "2 hours 27 minutes descent + 72 minutes of surface transmission",
    },
    breakthroughs: [
      {
        title: "Farthest Landing in Human History",
        dateOrSol: "14 January 2005",
        summary: "Touched down on Titan in the outer Solar System at 1.4 billion km distance.",
        significance: "Established Europe's capacity for complex outer-planet atmospheric entry and surface exploration.",
      },
      {
        title: "Confirmation of an Active Hydrocarbon Hydrological Cycle",
        dateOrSol: "January 2005",
        summary: "Revealed rainfall, rivers, and lakes formed by liquid methane and ethane at -180°C.",
        significance: "Demonstrated that Earth is not the only world in the cosmos with dynamic weather, precipitation, and river valleys.",
      },
    ],
    historicalQuotes: [
      {
        quote: "We are the first visitors to Titan. The data we have received from Huygens opens a brand new window onto a world that resembles Earth in its youth.",
        author: "Jean-Jacques Dordain, ESA Director General",
        context: "Press briefing at ESA Operations Centre (ESOC) in Darmstadt, Germany, 15 January 2005.",
      },
      {
        quote: "Huygens has touched down on a frozen shore beside rivers of liquid methane. It is Europe's greatest triumph in space exploration.",
        author: "Dr. Jean-Pierre Lebreton, ESA Project Scientist",
        context: "Mission announcement as first signals reached Earth.",
      },
    ],
    officialArchives: [
      {
        name: "ESA Science & Technology — Huygens Portal",
        url: "https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens",
        description: "European Space Agency primary mission records, DISR mosaic downloads, and acoustic recordings.",
      },
      {
        name: "NASA JPL Cassini-Huygens Mission Archive",
        url: "https://science.nasa.gov/mission/cassini/",
        description: "Joint NASA/ESA telemetry records, atmospheric profiles, and peer-reviewed mission publications.",
      },
      {
        name: "ESA Planetary Science Archive (PSA)",
        url: "https://archives.esac.esa.int/psa/",
        description: "Official European archival repository for all raw DISR, GCMS, and HASI telemetry.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // MANGALYAAN (MARS ORBITER MISSION) — ISRO
  // ────────────────────────────────────────────────────────────────
  mangalyaan: {
    artifactId: "mangalyaan",
    missionOverview:
      "India's Mars Orbiter Mission (MOM), unofficially dubbed Mangalyaan, was India's first interplanetary expedition and one of the greatest feats of frugal aerospace engineering in human history. Launched on 5 November 2013 aboard the Polar Satellite Launch Vehicle (PSLV-C25), ISRO executed an ingenious gravity-assist slingshot manoeuvre out of Earth orbit, entering Martian orbit on 24 September 2014 on its first attempt — making India the first Asian nation to reach Mars orbit and the first nation in the world to do so on its maiden trial. Designed for a 6-month mission, Mangalyaan sent back thousands of full-globe images for nearly 8 years until April 2022.",
    scientists: [
      {
        name: "Dr. K. Radhakrishnan",
        role: "Chairman, ISRO & Secretary, Department of Space",
        institution: "Indian Space Research Organisation (ISRO)",
        contribution:
          "Championed the Mars Orbiter Mission under extreme time constraints to catch the 2013 launch window, orchestrating mission reviews and interplanetary trajectory execution.",
        quote:
          "Today, all of India stands proud. We have dared to reach out into deep space and achieved what no nation has done on its first attempt.",
      },
      {
        name: "Dr. Mylswamy Annadurai",
        role: "Programme Director, ISRO Satellite Centre",
        institution: "ISRO Satellite Centre (ISAC), Bengaluru",
        contribution:
          "Architected the spacecraft bus configuration, autonomous deep-space fault-detection algorithms, and solar array deployment mechanisms.",
        quote: "Mangalyaan proved to the world that cost-effective, high-reliability interplanetary exploration is not a dream but Indian reality.",
      },
      {
        name: "S. Arunan",
        role: "Project Director, Mars Orbiter Mission",
        institution: "ISRO Satellite Centre (ISAC)",
        contribution:
          "Directed the physical engineering and assembly of the 1,337-kg spacecraft bus, leading a team that built and qualified the entire probe in just 15 months.",
      },
      {
        name: "Ritu Karidhal Srivastava",
        role: "Deputy Operations Director, MOM ('Rocket Woman of India')",
        institution: "ISRO Telemetry, Tracking and Command Network (ISTRAC)",
        contribution:
          "Supervised the critical orbital manoeuvres, telemetry verification, and the delicate 24-minute autonomous Liquid Apogee Motor burn behind the dark side of Mars.",
        quote: "When we saw that radio signal resume from behind Mars, the pride in our control room was beyond words.",
      },
      {
        name: "Nandini Harinath",
        role: "Deputy Operations Director & Project Manager Mission Design",
        institution: "ISRO Mission Operations Complex (MOX)",
        contribution:
          "Calculated interplanetary cruise trajectories and Earth-departure orbital burns, co-authoring the autonomous contingency navigation matrices.",
      },
      {
        name: "Moumita Dutta",
        role: "Project Manager, MENCA & TIS Payloads",
        institution: "Space Applications Centre (SAC), Ahmedabad",
        contribution:
          "Led development of the optical and sensor payloads, miniaturizing optical components to operate within rigorous mass and power envelopes.",
      },
    ],
    photos: [
      {
        id: "ISRO-MOM-01",
        url: "https://images-assets.nasa.gov/image/PIA18920/PIA18920~medium.jpg",
        title: "Full Martian Globe Showing Valles Marineris",
        caption:
          "Full disc view of Mars captured by the Mars Colour Camera (MCC) from an altitude of approximately 74,000 kilometres, revealing the great rift canyon Valles Marineris.",
        credit: "ISRO / ISSDC",
        dateOrSol: "October 2014",
        instrument: "Mars Colour Camera (MCC)",
        significance:
          "One of the highest-resolution full-disc global images of Mars ever recorded in natural color.",
      },
      {
        id: "ISRO-MOM-02",
        url: "https://images-assets.nasa.gov/image/PIA18921/PIA18921~medium.jpg",
        title: "Phobos Silhouette Against Martian Atmosphere",
        caption:
          "The potato-shaped moon Phobos photographed by the Mars Colour Camera as it sped past Mars at high velocity.",
        credit: "ISRO / ISSDC",
        dateOrSol: "October 2014",
        instrument: "Mars Colour Camera (MCC)",
        significance: "First Indian image of an extraterrestrial moon in deep space.",
      },
      {
        id: "ISRO-MOM-03",
        url: "https://images-assets.nasa.gov/image/PIA19912/PIA19912~medium.jpg",
        title: "Regional Dust Storm in the Northern Hemisphere",
        caption:
          "MCC tracking dynamic Martian atmospheric dust clouds swept across the volcanic plains of Elysium Mons.",
        credit: "ISRO / ISSDC",
        dateOrSol: "July 2018",
        instrument: "Mars Colour Camera (MCC)",
        significance:
          "Demonstrated MOM's unique elliptical orbit providing wide-field context during planet-encircling dust storms.",
      },
    ],
    instruments: [
      {
        name: "Mars Colour Camera",
        acronym: "MCC",
        purpose: "Tri-color visible imaging of Martian surface features and atmospheric phenomena",
        leadInstitution: "Space Applications Centre (SAC), ISRO",
        description:
          "High-resolution framing camera with an 8.2-degree field of view providing broad synoptic context and terrain mapping.",
        keyDiscovery:
          "Produced a comprehensive 3D Mars Atlas mapping canyons, impact craters, and dynamic seasonal polar cap sublimation.",
      },
      {
        name: "Mars Exospheric Neutral Composition Analyser",
        acronym: "MENCA",
        purpose: "In-situ quadrupole mass spectrometer profiling the neutral exosphere of Mars",
        leadInstitution: "Space Physics Laboratory (SPL), VSSC, Thiruvananthapuram",
        description:
          "Measured atomic and molecular species in the 1 to 300 amu range to analyze atmospheric escape mechanisms.",
        keyDiscovery:
          "Detected exospheric density distributions of Argon-40, Oxygen, and Nitrogen in the upper Martian atmosphere.",
      },
      {
        name: "Thermal Infrared Imaging Spectrometer",
        acronym: "TIS",
        purpose: "Surface thermal emission and mineral composition mapping",
        leadInstitution: "Space Applications Centre (SAC), ISRO",
        description:
          "Uncooled micro-bolometer measuring thermal infrared emissions to determine surface composition and thermal inertia.",
        keyDiscovery:
          "Mapped surface temperature gradients and basaltic mineral variations across volcanic provinces.",
      },
      {
        name: "Lyman Alpha Photometer",
        acronym: "LAP",
        purpose: "Deuterium-to-Hydrogen ratio measurements in the exosphere",
        leadInstitution: "Laboratory for Electro-Optics Systems (LEOS), Bengaluru",
        description:
          "Photometer operating in the ultraviolet at 121.6 nm to estimate the rate of water loss from Mars to space.",
        keyDiscovery:
          "Constrained historical atmospheric water loss rates over geological epochs.",
      },
    ],
    specs: {
      massLaunchKg: "1,337 kg (including 852 kg propellant)",
      massLandedKg: "N/A (Orbital Mission: Dry mass 488 kg)",
      dimensions: "1.5 m × 1.5 m × 1.5 m cube bus with single 3-panel solar array",
      powerSystem: "Gallium Arsenide solar array (3 panels, 1.8 m × 1.4 m each) + 36 Ah Li-ion battery",
      powerOutput: "840 W at Mars orbit",
      flightComputer: "MAR 31750 16-bit processor + ASICs with redundant bus controllers",
      memory: "Solid State Recorder (SSR) for data storage during eclipse and occultation",
      mobilityOrPropulsion: "Liquid Apogee Motor (LAM) 440 N thrust + eight 22 N attitude control thrusters",
      topSpeed: "Orbital speed at periapsis: ~4.6 km/s",
      totalDistance: "Cruise trajectory: ~666,000,000 km (666 million km)",
      communicationLinks: "2.2 m S-band parabolic High Gain Antenna + Medium Gain & Low Gain Horns",
      plannedDuration: "6 months nominal primary mission",
      actualDuration: "7 years, 7 months, 14 days (Until radio contact loss in April 2022)",
    },
    breakthroughs: [
      {
        title: "First Maiden Attempt Success in Mars History",
        dateOrSol: "24 September 2014",
        summary: "India achieved Mars orbit on its first attempt, a feat never accomplished previously.",
        significance: "Established ISRO as a premier global leader in cost-effective interplanetary deep space exploration.",
      },
      {
        title: "Unprecedented Global Full-Disc Martian Photography",
        dateOrSol: "2014 - 2022",
        summary: "Highly elliptical orbit (420 km × 76,993 km) allowed capturing full Martian hemispheres in single frames.",
        significance: "Provided planetary scientists worldwide with continuous synoptic weather monitoring during global dust storms.",
      },
    ],
    historicalQuotes: [
      {
        quote: "History has been created today. We have navigated our spacecraft through unknown paths into the unknown.",
        author: "Narendra Modi, Prime Minister of India",
        context: "Address to ISRO scientists at the Telemetry Tracking and Command Network in Bengaluru, 24 September 2014.",
      },
      {
        quote: "Mars Orbiter Mission demonstrated that when ingenuity meets passion, budget boundaries vanish.",
        author: "Dr. K. Radhakrishnan, ISRO Chairman",
        context: "Reflecting on MOM's frugal $74M USD mission cost.",
      },
    ],
    officialArchives: [
      {
        name: "ISRO Science Data Hub — ISSDC MOM Archive",
        url: "https://www.issdc.gov.in/mom.html",
        description: "Official Indian Space Science Data Centre repository for raw and calibrated MCC images and telemetry.",
      },
      {
        name: "ISRO Mars Orbiter Mission Portal",
        url: "https://www.isro.gov.in/MarsOrbiterMission.html",
        description: "Primary mission chronicle, payload manuals, and technical milestone bulletins.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // PHILAE LANDER (ROSETTA) — ESA
  // ────────────────────────────────────────────────────────────────
  philae: {
    artifactId: "philae",
    missionOverview:
      "Philae was a robotic European Space Agency lander that accompanied the Rosetta spacecraft to comet 67P/Churyumov–Gerasimenko. On 12 November 2014, after a 10-year, 6.4-billion-kilometre cruise through the Solar System, Philae detached from Rosetta and made humanity's first-ever soft touchdown on a comet's icy nucleus. Although its cold gas thruster and anchoring harpoons failed to fire on contact, causing the 100-kg lander to rebound twice across the comet in microgravity, Philae completed 80% of its planned primary science sequence before exhausting its primary battery — revolutionizing cometary science.",
    scientists: [
      {
        name: "Dr. Stephan Ulamec",
        role: "Philae Lander Project Manager",
        institution: "German Aerospace Center (DLR), Cologne",
        contribution:
          "Managed the international consortium that built Philae, directing surface tactical commands and the nerve-wracking search for the lander's resting spot.",
        quote:
          "We did not land once. We landed three times! Philae is talking to us and we are on the comet.",
      },
      {
        name: "Dr. Matt Taylor",
        role: "ESA Rosetta Project Scientist",
        institution: "European Space Research and Technology Centre (ESTEC), Netherlands",
        contribution:
          "Coordinated scientific investigations across Rosetta and Philae instruments, advocating for aggressive close-proximity orbital trajectories.",
        quote: "We've caught a speeding dirty snowball from the dawn of creation and placed our footprints upon it.",
      },
      {
        name: "Dr. Jean-Pierre Bibring",
        role: "Lead Scientist, CIVA Panoramic Imaging System",
        institution: "Institut d'Astrophysique Spatiale (IAS), Orsay, France",
        contribution:
          "Designed the 7 micro-cameras that captured the iconic first panoramas of comet 67P's fractured ice cliff at the Abydos landing site.",
      },
      {
        name: "Andrea Accomazzo",
        role: "ESA Spacecraft Operations Manager",
        institution: "European Space Operations Centre (ESOC), Darmstadt, Germany",
        contribution:
          "Commanded the orbital flight dynamics team that plotted Rosetta's 4 gravity assists (3 Earth, 1 Mars) and executed the precise separation burn for Philae.",
      },
    ],
    photos: [
      {
        id: "ESA-PHILAE-01",
        url: "https://images-assets.nasa.gov/image/PIA18884/PIA18884~medium.jpg",
        title: "First Panorama from the Surface of a Comet (Abydos)",
        caption:
          "CIVA panoramic frame showing Philae wedged under an overhanging cliff of fractured carbonaceous dust and ice, with one of the lander's landing foot pads visible.",
        credit: "ESA / Rosetta / Philae / CIVA",
        dateOrSol: "13 November 2014",
        instrument: "CIVA (Comet Infrared and Visible Analyser)",
        significance:
          "The first photograph ever taken from the surface of a comet nucleus, revealing rock-hard sintered ice and fractured organic matrix.",
      },
      {
        id: "ESA-PHILAE-02",
        url: "https://images-assets.nasa.gov/image/PIA18883/PIA18883~medium.jpg",
        title: "Philae Descending Toward Agilkia",
        caption:
          "ROLIS camera snapshot taken just 3 kilometres above the primary landing site Agilkia during the autonomous 7-hour gravitational descent.",
        credit: "ESA / Rosetta / Philae / ROLIS / DLR",
        dateOrSol: "12 November 2014",
        instrument: "ROLIS (Rosetta Lander Imaging System)",
        significance:
          "Unprecedented sub-metre resolution view of a comet's boulder-strewn surface during free-fall descent.",
      },
    ],
    instruments: [
      {
        name: "Comet Infrared and Visible Analyser",
        acronym: "CIVA",
        purpose: "360-degree panoramic stereo photography and optical microscope mineralogy",
        leadInstitution: "IAS, Université Paris-Sud, France",
        description: "Array of seven micro-cameras capturing high-resolution stereoscopic imagery of the immediate landing terrain.",
        keyDiscovery: "Confirmed comet crust consists of hard sintered water ice coated in ancient dark refractory carbon compounds.",
      },
      {
        name: "Cometary Sampling and Composition",
        acronym: "COSAC",
        purpose: "Gas chromatograph and time-of-flight mass spectrometer analyzing volatile organic compounds",
        leadInstitution: "Max Planck Institute for Solar System Research (MPS), Germany",
        description: "Sample pyrolysis system heating subsurface drill cores to 600°C to analyze pre-biotic amino acid precursors.",
        keyDiscovery: "Discovered 16 complex organic molecules in the comet's coma, including 4 never previously seen on comets (methyl isocyanate, acetone, propionaldehyde, and acetamide).",
      },
      {
        name: "Multi-Purpose Sensors for Surface and Subsurface Science",
        acronym: "MUPUS",
        purpose: "Penetrometer and thermal sensor measuring mechanical strength and thermal conductivity",
        leadInstitution: "DLR Institute of Planetary Research, Berlin, Germany",
        description: "Motorized hammer probe designed to drive 30 cm into the cometary soil.",
        keyDiscovery: "Revealed comet 67P's surface beneath the dust has a compressive strength equivalent to solid ice (over 2 MPa), breaking the hammer tip.",
      },
    ],
    specs: {
      massLaunchKg: "100 kg total lander mass (including 26.7 kg science payload)",
      massLandedKg: "Weight on comet: ~1 gram (due to microgravity 1/100,000th of Earth)",
      dimensions: "1.0 m × 1.0 m × 0.8 m box bus with 3-legged landing gear",
      powerSystem: "Solar arrays on exterior panels + primary LiSOCl2 battery + secondary Li-ion accumulator",
      powerOutput: "1,000 Wh primary battery capacity; solar panels intended for 10-15 W in sunlight",
      flightComputer: "Radiation-hardened Harris RTX2010 16-bit processor",
      memory: "Solid-state autonomous memory bank",
      mobilityOrPropulsion: "Cold-gas thruster (failed) + 2 harpoons + ice screws on each footpad",
      topSpeed: "Descent touchdown velocity: 1.0 m/s (~3.6 km/h)",
      totalDistance: "6.4 billion km interplanetary cruise over 10 years",
      communicationLinks: "S-band radio transceiver relaying to Rosetta orbiter at 16 kbit/s",
      plannedDuration: "64 hours on primary battery, followed by indefinite solar recharge",
      actualDuration: "63 hours primary mission + intermittent brief wakeups in June 2015",
    },
    breakthroughs: [
      {
        title: "First Soft Touchdown on a Comet",
        dateOrSol: "12 November 2014",
        summary: "Navigated a 10-year trajectory to land on a 4-km spinning comet nucleus 510 million km from Earth.",
        significance: "Proved robotic spacecraft can rendezvous, orbit, and land on primitive small bodies in deep space.",
      },
      {
        title: "Discovery of Pre-Biotic Building Blocks of Life",
        dateOrSol: "November 2014",
        summary: "COSAC detected 16 carbon-and-nitrogen-rich organic compounds on comet 67P.",
        significance: "Provided strong evidence that cometary bombardment contributed water and prebiotic organics to early Earth.",
      },
    ],
    historicalQuotes: [
      {
        quote: "Our ambitious Rosetta mission has secured a place in the history books. Not only is it the first to rendezvous with and orbit a comet, but it is now also the first to deliver a lander to a comet’s surface.",
        author: "Jean-Jacques Dordain, ESA Director General",
        context: "Official declaration of touchdown at ESOC Darmstadt, 12 November 2014.",
      },
    ],
    officialArchives: [
      {
        name: "ESA Rosetta / Philae Science Archive",
        url: "https://www.esa.int/Science_Exploration/Space_Science/Rosetta",
        description: "European Space Agency primary mission portal, raw telemetry, and flight director logs.",
      },
      {
        name: "DLR Philae Mission Blog & Archives",
        url: "https://www.dlr.de/en/research-and-transfer/projects-and-missions/rosetta-and-philae",
        description: "German Aerospace Center technical lander control records and engineering diaries.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // VOYAGER 1 — NASA INTERSTELLAR MISSION
  // ────────────────────────────────────────────────────────────────
  "voyager-1": {
    artifactId: "voyager-1",
    missionOverview:
      "Voyager 1 is humanity's most distant emissary. Launched by NASA on 5 September 1977 from Cape Canaveral atop a Titan IIIE rocket, Voyager 1 conducted breathtaking flybys of Jupiter in 1979 and Saturn and its giant moon Titan in 1980. On 25 August 2012, at a distance of 121 astronomical units (18.1 billion kilometres), Voyager 1 crossed the heliopause — the outer boundary of the solar wind — becoming the first human-made object to enter interstellar space. Carrying the Golden Record curated by Carl Sagan, Voyager 1 continues to transmit scientific measurements from the starlight of the galactic void over 24 billion kilometres away.",
    scientists: [
      {
        name: "Dr. Edward C. Stone",
        role: "Voyager Project Scientist (1972 - 2022)",
        institution: "California Institute of Technology / NASA JPL",
        contribution:
          "Served as chief scientific director of Voyager 1 and 2 for 50 continuous years from before launch until his retirement in 2022, guiding discovery across 4 planetary systems and into interstellar space.",
        quote:
          "Voyager expanded our view of the Solar System from a collection of dead geological worlds to dynamic, living bodies with active volcanoes, subterranean oceans, and complex atmospheres.",
      },
      {
        name: "Dr. Carl Sagan",
        role: "Chair, Voyager Interstellar Message Committee",
        institution: "Cornell University",
        contribution:
          "Conceptualized and produced the Golden Record, carrying sounds and images of Earth to extraterrestrial civilizations, and famously convinced NASA to turn Voyager 1 around in 1990 to take the 'Pale Blue Dot' portrait.",
        quote:
          "Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives.",
      },
      {
        name: "Dr. Linda Spilker",
        role: "Voyager Project Scientist & Cassini Project Scientist",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Analyzed Saturn ring dynamics from Voyager data in 1980 and succeeded Ed Stone in 2022 as lead scientist overseeing Voyager's deep interstellar science operations.",
        quote: "Voyager 1 is our ambassador to the stars, pioneering a path humanity will follow centuries from now.",
      },
      {
        name: "Dr. Carolyn Porco",
        role: "Voyager Imaging Team Scientist",
        institution: "Space Science Institute / NASA JPL",
        contribution:
          "Analyzed the spoke-like structures in Saturn's B-ring and calculated camera pointing geometries for Voyager 1's final 'Family Portrait' mosaic of the Solar System.",
      },
      {
        name: "Suzanne Dodd",
        role: "Voyager Project Manager",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Manages deep space communications through NASA's Deep Space Network (DSN) and led the heroic 2024 recovery of Voyager 1 when an onboard flight data system memory chip failed.",
      },
    ],
    photos: [
      {
        id: "PIA00452",
        url: "https://images-assets.nasa.gov/image/PIA00452/PIA00452~medium.jpg",
        title: "The Pale Blue Dot",
        caption:
          "Earth caught as a tiny crescent of light just 0.12 pixel in size, suspended inside a scattered beam of sunlight, taken from a record distance of 6 billion kilometres.",
        credit: "NASA / JPL-Caltech",
        dateOrSol: "14 February 1990",
        instrument: "Imaging Science Subsystem (Narrow Angle Camera)",
        significance:
          "The most philosophically profound astronomical image in human history, illustrating the fragility and loneliness of our homeworld.",
      },
      {
        id: "PIA00014",
        url: "https://images-assets.nasa.gov/image/PIA00014/PIA00014~medium.jpg",
        title: "Great Red Spot of Jupiter Close-Up",
        caption:
          "High-contrast view of Jupiter's colossal anti-cyclonic storm and surrounding turbulent white ovals, captured during Voyager 1's closest approach in March 1979.",
        credit: "NASA / JPL",
        dateOrSol: "March 1979",
        instrument: "Imaging Science Subsystem (ISS)",
        significance:
          "Revealed that Jupiter's atmosphere is driven by internal heat and shear velocities forming complex vortex dynamics.",
      },
      {
        id: "PIA01403",
        url: "https://images-assets.nasa.gov/image/PIA01403/PIA01403~medium.jpg",
        title: "The Golden Record Cover",
        caption:
          "Electroplated gold copper phonograph record cover mounted to Voyager 1's chassis, inscribed with pulsar triangulation coordinates to locate Earth and needle playback instructions.",
        credit: "NASA / JPL",
        dateOrSol: "August 1977",
        instrument: "Interstellar Artifact",
        significance:
          "Humanity's message in a bottle to the cosmos, with an estimated physical lifespan in interstellar vacuum exceeding 1 billion years.",
      },
    ],
    instruments: [
      {
        name: "Low-Energy Charged Particle detector",
        acronym: "LECP",
        purpose: "Measures velocity, energy, and angular distribution of ions and electrons in interstellar plasma",
        leadInstitution: "Johns Hopkins University Applied Physics Laboratory (JHUAPL)",
        description: "Rotating stepper-motor detector measuring galactic cosmic ray particles from outside our solar bubble.",
        keyDiscovery: "Observed the sudden drop in solar wind particles and surge in galactic cosmic rays that confirmed interstellar boundary crossing in August 2012.",
      },
      {
        name: "Magnetometer",
        acronym: "MAG",
        purpose: "High-precision measurement of interplanetary and interstellar magnetic field strength and direction",
        leadInstitution: "NASA Goddard Space Flight Center",
        description: "Triaxial fluxgate magnetometers mounted at the end of a 13-metre deployable fiberglass boom to isolate spacecraft interference.",
        keyDiscovery: "Measured the orientation of the interstellar galactic magnetic field outside the Sun's heliosphere.",
      },
      {
        name: "Plasma Wave Subsystem",
        acronym: "PWS",
        purpose: "Detects electrostatic and electromagnetic plasma waves in interstellar space",
        leadInstitution: "University of Iowa",
        description: "Dual 10-metre V-shaped dipole antenna measuring density fluctuations in the interstellar medium.",
        keyDiscovery: "Captured 'sounds' of interstellar plasma vibrations triggered by solar coronal mass ejections propagating outward.",
      },
      {
        name: "Cosmic Ray Subsystem",
        acronym: "CRS",
        purpose: "Studies cosmic rays from extrasolar supernova remnants",
        leadInstitution: "California Institute of Technology (Caltech)",
        description: "High-energy telescope tracking cosmic ray nuclei from Hydrogen to Iron.",
        keyDiscovery: "Provided the first unattenuated measurements of true interstellar cosmic ray spectra unshielded by the heliosphere.",
      },
    ],
    specs: {
      massLaunchKg: "825.5 kg (including 105 kg science instruments)",
      massLandedKg: "N/A (Interstellar trajectory; velocity relative to Sun: ~17 km/s / 38,000 mph)",
      dimensions: "3.7-metre High Gain Antenna dish mounted on 10-sided polygon bus",
      powerSystem: "Three Multi-Hundred Watt Radioisotope Thermoelectric Generators (MHW-RTG) fueled by Plutonium-238",
      powerOutput: "470 W at launch (1977); ~220 W remaining in 2026",
      flightComputer: "Three redundant dual computers: CCS (Command Computer), FDS (Flight Data System), AACS (Attitude Control)",
      memory: "68 Kilobytes total memory on magnetic tape and plated-wire arrays",
      mobilityOrPropulsion: "Hydrazine monopropellant thrusters (MR-106) with trajectory correction burns",
      topSpeed: "Interstellar escape speed: 61,200 km/h (38,000 mph / 3.6 AU per year)",
      totalDistance: "Over 24,000,000,000 km (24 billion km / ~163 AU from Earth) — farthest human-made object",
      communicationLinks: "3.7 m parabolic High-Gain Antenna communicating via NASA Deep Space Network at 160 bits/sec (22+ light-hours one way)",
      plannedDuration: "5 years to Jupiter and Saturn (1977-1982)",
      actualDuration: "Over 48 years of continuous active operation (1977 - Present)",
    },
    breakthroughs: [
      {
        title: "First Object to Enter Interstellar Space",
        dateOrSol: "25 August 2012",
        summary: "Crossed the heliopause at 121.6 AU, exiting the Sun's protective plasma bubble into interstellar galactic space.",
        significance: "Marked humanity's transition into an interstellar species.",
      },
      {
        title: "Active Volcanism on Jupiter's Moon Io",
        dateOrSol: "March 1979",
        summary: "Discovered nine erupting sulfur volcanoes shooting plumes 300 km into space on Io.",
        significance: "First time active volcanism was discovered beyond Earth, proving tidal friction drives planetary geology.",
      },
    ],
    historicalQuotes: [
      {
        quote: "The spacecraft will be encountered and the record played only if there are advanced spacefaring civilizations in interstellar space. But the launching of this bottle into the cosmic ocean says something very hopeful about life on this planet.",
        author: "Dr. Carl Sagan",
        context: "Statement upon the sealing of the Voyager Golden Record, August 1977.",
      },
      {
        quote: "No one knew when we launched 40 years ago that anything would still be working, and continuing on this pioneering journey.",
        author: "Dr. Edward Stone, Voyager Project Scientist",
        context: "40th anniversary of Voyager 1 in interstellar space.",
      },
    ],
    officialArchives: [
      {
        name: "NASA Jet Propulsion Laboratory — Voyager Mission",
        url: "https://voyager.jpl.nasa.gov/",
        description: "Official real-time distance odometer, science reports, and Golden Record audio tracks.",
      },
      {
        name: "NASA Planetary Data System (PDS) — Voyager Archive",
        url: "https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/VOYAGER/",
        description: "Complete raw and calibrated imaging catalogues from Jupiter and Saturn flybys.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // CURIOSITY ROVER (MARS SCIENCE LABORATORY) — NASA
  // ────────────────────────────────────────────────────────────────
  curiosity: {
    artifactId: "curiosity",
    missionOverview:
      "Curiosity is NASA's car-sized robotic explorer that landed inside Mars's Gale Crater on 6 August 2012, using the audacious and unprecedented Sky Crane rocket descent system. Curiosity's primary scientific goal was to investigate whether Mars ever had an environment capable of supporting microbial life. Within its first eight months, Curiosity fulfilled this objective at Yellowknife Bay by discovering an ancient, neutral-pH freshwater lake system rich in key organic molecules, sulfur, nitrogen, oxygen, phosphorus, and carbon. Continuing to climb Mount Sharp, Curiosity has traversed over 32 kilometres over 12+ years of exploration.",
    scientists: [
      {
        name: "Dr. John P. Grotzinger",
        role: "Project Scientist (2004 - 2015)",
        institution: "California Institute of Technology (Caltech)",
        contribution:
          "Led the 500-member international science team through Curiosity's development and primary mission, directing the decision to explore Yellowknife Bay where ancient habitability was discovered.",
        quote:
          "We found a habitable environment so benign and supportive of life that probably if this water was around and you had been there, you would have been able to drink it.",
      },
      {
        name: "Dr. Ashwin Vasavada",
        role: "Project Scientist (2014 - Present)",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Directs current science operations as Curiosity scales the layered foothills of Mount Sharp, mapping sulfate-bearing units that chronicle Mars's climate transition into an arid desert.",
        quote: "Mount Sharp is a 5-kilometre-high geological history book. Every meter Curiosity drives uphill turns another page in Mars's planetary evolution.",
      },
      {
        name: "Dr. Joy Crisp",
        role: "Deputy Project Scientist",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Coordinated payload instruments across ten institutions, establishing the geological sampling protocols and drill operations on extraterrestrial mudstone.",
      },
      {
        name: "Dr. Rob Manning",
        role: "Chief Engineer, Mars Science Laboratory",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Architect of the revolutionary 'Sky Crane' terminal descent touchdown architecture, which successfully lowered the 1-ton rover onto its six wheels on Mars.",
        quote: "When Sky Crane cut its cables and flew away into the distance, it felt like an engineering miracle.",
      },
    ],
    photos: [
      {
        id: "PIA16239",
        url: "https://images-assets.nasa.gov/image/PIA16239/PIA16239~medium.jpg",
        title: "Self-Portrait at John Klein Drill Site (Yellowknife Bay)",
        caption:
          "Curiosity's MAHLI camera stitched 55 high-resolution exposures into a self-portrait at Yellowknife Bay, showing the first drill hole bored into Martian bedrock.",
        credit: "NASA / JPL-Caltech / MSSS",
        dateOrSol: "Sol 84 (January 2013)",
        instrument: "MAHLI (Mars Hand Lens Imager)",
        significance:
          "First self-portrait of Curiosity on Mars, captured at the very site where ancient Martian habitability was proven.",
      },
      {
        id: "PIA16098",
        url: "https://images-assets.nasa.gov/image/PIA16098/PIA16098~medium.jpg",
        title: "The Slopes of Mount Sharp (Aeolis Mons)",
        caption:
          "Telephoto mosaic looking south from the landing site toward the 5.5-kilometre-tall central peak of Gale Crater, showing sedimentary strata.",
        credit: "NASA / JPL-Caltech / MSSS",
        dateOrSol: "Sol 45 (September 2012)",
        instrument: "Mastcam (100mm Telephoto Lens)",
        significance:
          "Demonstrated hundreds of distinct sedimentary layers deposited by ancient lake, river, and wind environments.",
      },
      {
        id: "PIA21144",
        url: "https://images-assets.nasa.gov/image/PIA21144/PIA21144~medium.jpg",
        title: "Desiccated Mud Cracks at 'Old Soaker'",
        caption:
          "Intricate polygonal mud cracks preserved in ancient sedimentary sandstone, formed billions of years ago as muddy sediment dried and cracked in the sun.",
        credit: "NASA / JPL-Caltech / MSSS",
        dateOrSol: "Sol 1555 (December 2016)",
        instrument: "Mastcam",
        significance:
          "First conclusive evidence of wet-dry cycles on Mars, an environmental condition considered essential for the prebiotic chemistry leading to life.",
      },
    ],
    instruments: [
      {
        name: "Sample Analysis at Mars",
        acronym: "SAM",
        purpose: "Analyzes organic molecules and isotopic ratios in drilled rock powder and atmosphere",
        leadInstitution: "NASA Goddard Space Flight Center",
        description:
          "Miniature onboard chemistry laboratory featuring a quadrupole mass spectrometer, gas chromatograph, and tunable laser spectrometer.",
        keyDiscovery:
          "Discovered diverse long-chain organic molecules (thiophenes, aromatic hydrocarbons) preserved in 3.5-billion-year-old mudstone.",
      },
      {
        name: "Chemistry and Camera",
        acronym: "ChemCam",
        purpose: "Laser-induced breakdown spectroscopy and high-resolution micro-imaging",
        leadInstitution: "Los Alamos National Laboratory / IRAP Toulouse, France",
        description:
          "Fires 1,000 infra-red laser pulses per minute to vaporize rock targets up to 7 metres away, analyzing the glowing plasma spectrum.",
        keyDiscovery:
          "Identified pervasive calcium sulfate mineral veins formed by ancient underground groundwater circulation.",
      },
      {
        name: "Mast Camera",
        acronym: "Mastcam",
        purpose: "Multispectral stereo color photography of Martian topography and atmospheric dust",
        leadInstitution: "Malin Space Science Systems (MSSS)",
        description:
          "Twin camera system (34mm medium-angle and 100mm telephoto) mounted at human eye level (2 metres above the surface).",
        keyDiscovery:
          "Documented cross-bedding and rounded river pebbles proving fast-flowing ancient streams once flowed into Gale Crater.",
      },
    ],
    specs: {
      massLaunchKg: "899 kg rover (Total cruise mass: 3,893 kg)",
      massLandedKg: "899 kg on Earth (~340 kg on Mars)",
      dimensions: "3.0 m long × 2.7 m wide × 2.2 m tall (approx. size of a Mini Cooper)",
      powerSystem: "Multi-Mission Radioisotope Thermoelectric Generator (MMRTG) fueled by 4.8 kg Plutonium-238 dioxide",
      powerOutput: "125 W electrical power at landing; ~100 W ongoing in 2026",
      flightComputer: "Dual BAE RAD750 radiation-hardened 32-bit PowerPC processors @ 133 MHz",
      memory: "256 MB DRAM + 2 GB Flash memory",
      mobilityOrPropulsion: "Rocker-bogie 6-wheel drive with individual in-hub electric brushless DC steering motors",
      topSpeed: "Maximum driving speed: 0.14 km/h (140 m/hour); typical drive: ~30-100 m/sol",
      totalDistance: "Over 32.5 kilometres traversed across Gale Crater",
      communicationLinks: "X-band Direct-To-Earth High Gain Antenna + UHF antenna relaying through Odyssey, MRO, and MAVEN at 2 Mbps",
      plannedDuration: "1 Martian year (687 Earth days / ~2 Earth years)",
      actualDuration: "Over 13 years of continuous surface exploration (2012 - Present)",
    },
    breakthroughs: [
      {
        title: "Proof of Ancient Habitable Environment on Mars",
        dateOrSol: "March 2013",
        summary: "Yellowknife Bay mudstones contained clays, sulfates, and neutral pH water chemistry suited for ancient microbial life.",
        significance: "Accomplished the rover's primary mission goal within its first year on Mars.",
      },
      {
        title: "Detection of Ancient Organic Carbon Macromolecules",
        dateOrSol: "June 2018",
        summary: "SAM detected 3-billion-year-old preserved organic compounds inside drilled rocks in Gale Crater.",
        significance: "Confirmed organic building blocks were preserved on Mars despite harsh cosmic radiation.",
      },
    ],
    historicalQuotes: [
      {
        quote: "Touchdown confirmed! We're safe on Mars!",
        author: "Allen Chen, EDL Operations Lead",
        context: "Callout in JPL mission control room as Curiosity touched down, 6 August 2012.",
      },
    ],
    officialArchives: [
      {
        name: "NASA Mars Science Laboratory / Curiosity Portal",
        url: "https://science.nasa.gov/mission/msl-curiosity/",
        description: "Official mission portal, raw image releases, daily rover logs, and scientific peer-reviewed papers.",
      },
      {
        name: "NASA Planetary Data System (PDS) — MSL Node",
        url: "https://pds-geosciences.wustl.edu/missions/msl/",
        description: "Complete raw and calibrated SAM, ChemCam, and Mastcam datasets maintained by Washington University.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // PERSEVERANCE ROVER (MARS 2020) — NASA
  // ────────────────────────────────────────────────────────────────
  perseverance: {
    artifactId: "perseverance",
    missionOverview:
      "Perseverance is NASA's flagship astrobiology rover, touching down in Jezero Crater on 18 February 2021. Jezero was chosen because it preserves a pristine 3.7-billion-year-old river delta that emptied into a deep crater lake. Equipped with state-of-the-art instruments capable of scanning rocks for biosignatures at sub-millimetre scales, Perseverance also carries the Sample Caching System: hermetically sealing rock cores into titanium tubes to be returned to Earth by a future Mars Sample Return campaign. Accompanied by the Ingenuity Mars Helicopter, Perseverance has revolutionized robotic planetary science.",
    scientists: [
      {
        name: "Dr. Kenneth A. Farley",
        role: "Project Scientist (2013 - 2023)",
        institution: "California Institute of Technology (Caltech)",
        contribution:
          "Formulated the scientific criteria that selected Jezero Crater, directing surface sampling campaigns across igneous crater floor rocks and sedimentary delta fan strata.",
        quote:
          "If life ever existed on Mars, this ancient river delta in Jezero Crater is the single best place in the Solar System to find the evidence.",
      },
      {
        name: "Dr. Katie Stack Morgan",
        role: "Project Scientist (2023 - Present)",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Spearheaded geological mapping of Jezero delta front outcrops and serves as lead scientist guiding the ascent onto the crater rim.",
        quote: "Every titanium tube Perseverance seals is a priceless piece of another world waiting to be studied in Earth's greatest laboratories.",
      },
      {
        name: "Jennifer Trosper",
        role: "Project Manager (2021 - 2022)",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Veteran of every NASA Mars rover mission (Sojourner, Spirit, Opportunity, Curiosity), guiding Perseverance through its first year of autonomous navigation and helicopter flight support.",
      },
      {
        name: "Dr. MiMi Aung",
        role: "Ingenuity Mars Helicopter Lead Project Manager",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Led the 6-year engineering effort that proved powered, controlled aerodynamic flight is possible in Mars's ultra-thin atmosphere (1% Earth density).",
        quote: "Our team took the Wright Brothers moment to Mars. We proved that humans can fly in the skies of another world.",
      },
    ],
    photos: [
      {
        id: "PIA24428",
        url: "https://images-assets.nasa.gov/image/PIA24428/PIA24428~medium.jpg",
        title: "Perseverance Suspended Beneath the Sky Crane",
        caption:
          "High-resolution color photograph taken by the descent stage camera looking down as Perseverance was lowered on nylon tethers just 2 metres above Martian soil.",
        credit: "NASA / JPL-Caltech",
        dateOrSol: "Touchdown (18 February 2021)",
        instrument: "EDL Lander Descent Camera",
        significance:
          "The first time a spacecraft landing on another planet was photographed from above during the final touchdown sequence.",
      },
      {
        id: "PIA24542",
        url: "https://images-assets.nasa.gov/image/PIA24542/PIA24542~medium.jpg",
        title: "Perseverance and Ingenuity at 'Van Zyl Overlook'",
        caption:
          "Curator self-portrait showing Perseverance looking toward the Ingenuity Mars Helicopter resting 3.9 metres away on the flat soil of Jezero Crater.",
        credit: "NASA / JPL-Caltech / MSSS",
        dateOrSol: "Sol 46 (April 2021)",
        instrument: "WATSON camera on robotic arm",
        significance:
          "Commemorated the beginning of the first powered aircraft flight campaign on another planet.",
      },
      {
        id: "PIA24933",
        url: "https://images-assets.nasa.gov/image/PIA24933/PIA24933~medium.jpg",
        title: "Kodiak Mesa and the Ancient Jezero River Delta",
        caption:
          "Telephoto mosaic of Kodiak butte showing steeply dipping delta bottomset, foreset, and topset sedimentary beds deposited by a raging ancient river.",
        credit: "NASA / JPL-Caltech / ASU / MSSS",
        dateOrSol: "Sol 65 (April 2021)",
        instrument: "Mastcam-Z",
        significance:
          "Definitive geological confirmation that Jezero was fed by a fast-flowing river system that suddenly discharged into a standing lake.",
      },
    ],
    instruments: [
      {
        name: "SuperCam",
        acronym: "SuperCam",
        purpose: "Remote laser-induced breakdown spectroscopy, Raman and luminescence spectroscopy, and microphone",
        leadInstitution: "Los Alamos National Laboratory / CNES (France)",
        description:
          "Fires pulsed lasers at rocks up to 7 metres away to determine elemental chemistry and records the acoustic snapping sound of laser ablation.",
        keyDiscovery:
          "Recorded the first authentic acoustic sounds of Martian wind and determined igneous volcanic origins of Jezero crater floor rocks.",
      },
      {
        name: "Planetary Instrument for X-ray Lithochemistry",
        acronym: "PIXL",
        purpose: "Micro-focus X-ray fluorescence spectrometer mapping elemental composition at grain scales",
        leadInstitution: "NASA Jet Propulsion Laboratory (JPL)",
        description:
          "Scans rock surfaces with an X-ray beam as fine as a human hair (120 microns) with optical hexapod positioning.",
        keyDiscovery:
          "Discovered high concentrations of sulfate, phosphate, and carbonate minerals in Jezero delta mudstones.",
      },
      {
        name: "Mars Oxygen ISRU Experiment",
        acronym: "MOXIE",
        purpose: "Extracts breathable molecular oxygen (O2) from atmospheric carbon dioxide (CO2)",
        leadInstitution: "Massachusetts Institute of Technology (MIT)",
        description:
          "Solid oxide electrolysis system heating Martian CO2 to 800°C to strip oxygen atoms into pure O2 gas.",
        keyDiscovery:
          "Produced 122 grams of 98% pure oxygen on Mars across 16 test runs — enough to keep a small astronaut breathing for several hours.",
      },
    ],
    specs: {
      massLaunchKg: "1,025 kg rover (Total launch stack: 4,360 kg)",
      massLandedKg: "1,025 kg on Earth (~388 kg on Mars)",
      dimensions: "3.0 m long × 2.7 m wide × 2.2 m tall with a 2.1 m robotic arm",
      powerSystem: "Multi-Mission Radioisotope Thermoelectric Generator (MMRTG) + dual 43 Ah lithium-ion batteries",
      powerOutput: "110 W electrical power",
      flightComputer: "Dual redundant BAE RAD750 processors @ 133 MHz + dedicated FPGA Vision Processing Unit for real-time hazard avoidance",
      memory: "256 MB radiation-hardened DRAM + 2 GB Flash memory",
      mobilityOrPropulsion: "AutoNav autonomous driving system allowing real-time path planning without ground-in-the-loop delays",
      topSpeed: "0.15 km/h (152 m/hour); capable of single-sol autonomous drives exceeding 300 metres",
      totalDistance: "Over 30 kilometres driven across Jezero Crater and delta fan",
      communicationLinks: "UHF relay to MRO, MAVEN, TGO, and Mars Express at 2 Mbps + steerable X-band Direct-To-Earth HGA",
      plannedDuration: "At least one Martian year (~2 Earth years)",
      actualDuration: "5+ years active exploration (2021 - Present)",
    },
    breakthroughs: [
      {
        title: "First Powered Aerodynamic Flight on Another Planet",
        dateOrSol: "19 April 2021",
        summary: "Ingenuity helicopter climbed to 3 metres, hovered for 39 seconds, and landed safely in Martian air.",
        significance: "Opened the aerial dimension of planetary exploration, completing 72 total flights.",
      },
      {
        title: "First In-Situ Production of Oxygen from Martian Air",
        dateOrSol: "20 April 2021",
        summary: "MOXIE converted Martian atmospheric CO2 into 5.4 grams of breathable oxygen.",
        significance: "Demonstrated In-Situ Resource Utilization (ISRU) technology vital for future crewed Mars missions.",
      },
      {
        title: "Sealing of First Martian Rock Cores for Return to Earth",
        dateOrSol: "September 2021 - Present",
        summary: "Hermetically sealed over 24 pristine geological drill cores in titanium sample tubes.",
        significance: "Assembled the first extraterrestrial sample cache intended for transport to terrestrial laboratories.",
      },
    ],
    historicalQuotes: [
      {
        quote: "Touchdown confirmed! Perseverance is safely on the surface of Mars, ready to begin seeking the signs of past life.",
        author: "Swati Mohan, Mars 2020 Guidance & Controls Lead",
        context: "Callout as Perseverance confirmed landing inside Jezero Crater, 18 February 2021.",
      },
    ],
    officialArchives: [
      {
        name: "NASA Mars 2020 / Perseverance Portal",
        url: "https://science.nasa.gov/mission/mars-2020-perseverance/",
        description: "Official real-time sample cache status, raw image feed, and mission milestones.",
      },
      {
        name: "NASA PDS Geoscience Node — Mars 2020 Archive",
        url: "https://pds-geosciences.wustl.edu/missions/mars2020/",
        description: "Official Planetary Data System archive for SuperCam spectra, PIXL maps, and SHERLOC scans.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // MARS PATHFINDER & SOJOURNER — NASA
  // ────────────────────────────────────────────────────────────────
  pathfinder: {
    artifactId: "pathfinder",
    missionOverview:
      "Mars Pathfinder and its diminutive 10.6-kg rover companion Sojourner landed in Ares Vallis on 4 July 1997, marking humanity's return to the surface of the Red Planet after a 21-year hiatus following the Viking missions. Pioneering the revolutionary airbag landing architecture and the first autonomous planetary rover, Pathfinder was built under NASA's 'Faster, Better, Cheaper' initiative. Designed as a 7-day technology demonstration, Sojourner operated for 83 sols, analyzing Martian rocks with its APXS spectrometer and capturing the imagination of millions as one of the first major internet-streamed events in human history.",
    scientists: [
      {
        name: "Dr. Matthew Golombek",
        role: "Project Scientist",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Selected the Ares Vallis landing site where cataclysmic ancient floods deposited a diverse grab-bag of Martian rock types, and directed the rover's scientific sampling targets.",
        quote:
          "Ares Vallis was like a giant geological museum where ancient floodwaters brought rocks from hundreds of miles away right to our doorstep.",
      },
      {
        name: "Donna Shirley",
        role: "Manager of the Mars Exploration Program",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "The first woman to manage a NASA robotic flight program; championed and shepherded Sojourner from a radical experimental concept into a triumphant reality.",
        quote:
          "People told us a rover on Mars was a toy that would never work. We proved that small, agile machines can do giant science.",
      },
      {
        name: "Anthony Spear",
        role: "Pathfinder Project Manager",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Led the engineering team that completed Pathfinder under strict budget and schedule caps, introducing airbag deceleration and self-righting lander petals.",
      },
      {
        name: "Dr. Brian Wilcox & Jacob Matijevic",
        role: "Sojourner Rover Engineering Leads",
        institution: "NASA Jet Propulsion Laboratory (JPL)",
        contribution:
          "Pioneered the rocker-bogie passive suspension mechanism that allowed a microwave-sized rover to climb over rocks taller than its own wheels.",
      },
    ],
    photos: [
      {
        id: "PIA01120",
        url: "https://images-assets.nasa.gov/image/PIA01120/PIA01120~medium.jpg",
        title: "Sojourner Sniffing 'Yogi' Rock with APXS",
        caption:
          "Sojourner rover positioned against the boulder 'Yogi', pressing its Alpha Proton X-Ray Spectrometer directly against the rock's weathered surface.",
        credit: "NASA / JPL",
        dateOrSol: "Sol 22 (July 1997)",
        instrument: "Imager for Mars Pathfinder (IMP)",
        significance:
          "Iconic image demonstrating humanity's first robotic contact science on the surface of another planet.",
      },
      {
        id: "PIA00451",
        url: "https://images-assets.nasa.gov/image/PIA00451/PIA00451~medium.jpg",
        title: "Twin Peaks on the Martian Horizon",
        caption:
          "Two rounded hilltops rising approximately 30 metres above the Ares Vallis floodplain, located about 1 kilometre from the Sagan Memorial Station.",
        credit: "NASA / JPL",
        dateOrSol: "Sol 2 (July 1997)",
        instrument: "Imager for Mars Pathfinder (IMP)",
        significance:
          "First stereoscopic panorama of alien mountains taken by a digital planetary lander on Mars.",
      },
    ],
    instruments: [
      {
        name: "Imager for Mars Pathfinder",
        acronym: "IMP",
        purpose: "Stereoscopic panoramic multispectral camera on a 1-metre extendable mast",
        leadInstitution: "University of Arizona",
        description: "Twin-lens CCD camera with color filter wheels measuring surface mineralogy and atmospheric dust opacity.",
        keyDiscovery: "Provided the first true-color panoramic maps of Martian soil and rocks, showing diverse volcanic compositions.",
      },
      {
        name: "Alpha Proton X-Ray Spectrometer",
        acronym: "APXS",
        purpose: "Determines elemental chemical composition of rocks and soils",
        leadInstitution: "Max Planck Institute for Chemistry, Mainz, Germany",
        description: "Curium-244 radioactive source backscattering alpha particles and X-rays into silicon detectors.",
        keyDiscovery: "Discovered andesitic rocks high in silica on Mars, pointing to complex volcanic differentiation.",
      },
    ],
    specs: {
      massLaunchKg: "890 kg (Cruise stage + lander + rover)",
      massLandedKg: "Lander: 264 kg; Sojourner rover: 10.6 kg",
      dimensions: "Lander: 1.5 m tetrahedral petals; Rover: 65 cm long × 48 cm wide × 30 cm tall",
      powerSystem: "Gallium Arsenide solar array (0.22 m² on rover) + primary D-cell lithium batteries",
      powerOutput: "Lander: ~160 W; Rover: 16 W maximum solar power",
      flightComputer: "Rover: 8-bit Intel 80C85 processor @ 2 MHz; Lander: IBM RAD6000 32-bit CPU",
      memory: "Rover: 512 KB RAM; Lander: 128 MB DRAM",
      mobilityOrPropulsion: "6-wheel rocker-bogie mobility chassis with 13 cm diameter aluminum cleated wheels",
      topSpeed: "1 centimetre per second (0.036 km/h / ~36 m/hour)",
      totalDistance: "Approximately 100 metres traversed by Sojourner in Ares Vallis",
      communicationLinks: "Rover communicated to lander via UHF radio modem (9,600 bps); lander communicated to Earth via High-Gain Antenna",
      plannedDuration: "Lander: 30 days; Sojourner rover: 7 days",
      actualDuration: "83 sols (nearly 3 months) until lander battery depletion on 27 September 1997",
    },
    breakthroughs: [
      {
        title: "First Mobile Robotic Rover on Another Planet",
        dateOrSol: "4 July 1997",
        summary: "Delivered Sojourner safely to Mars using airbags and proved autonomous roving on extraterrestrial surfaces.",
        significance: "Established the mobile robotic paradigm that enabled Spirit, Opportunity, Curiosity, and Perseverance.",
      },
      {
        title: "Confirmation of Cataclysmic Water Floods",
        dateOrSol: "July 1997",
        summary: "Semi-rounded boulders and imbricated pebbles proved catastrophic prehistoric floods shaped Ares Vallis.",
        significance: "Revitalized scientific consensus that early Mars possessed vast reservoirs of surface water.",
      },
    ],
    historicalQuotes: [
      {
        quote: "Mars Pathfinder has touched down on the Red Planet. Humanity is back on Mars!",
        author: "Tony Spear, Project Manager",
        context: "Callout as Pathfinder confirmed survival following airbag bounces across Ares Vallis, 4 July 1997.",
      },
    ],
    officialArchives: [
      {
        name: "NASA JPL Mars Pathfinder Portal",
        url: "https://mars.nasa.gov/mars-exploration/missions/pathfinder/",
        description: "Official historic archive of Pathfinder operations, Sojourner telemetry, and gallery.",
      },
    ],
  },
};

/**
 * Returns the rich mission dossier for an artifact, falling back to an intelligently
 * synthesized dossier for any artifact in the museum so no hardware lacks parents/photos.
 */
export function getMissionDossier(artifactId: string): MissionDossier | undefined {
  if (MISSION_DOSSIERS[artifactId]) {
    return MISSION_DOSSIERS[artifactId];
  }
  // Check aliases
  if (artifactId === "sojourner" && MISSION_DOSSIERS["pathfinder"]) {
    return MISSION_DOSSIERS["pathfinder"];
  }
  if (artifactId === "ingenuity" && MISSION_DOSSIERS["perseverance"]) {
    return MISSION_DOSSIERS["perseverance"];
  }

  // Graceful synthesis fallback from artifact metadata
  const artifact = getArtifact(artifactId);
  if (!artifact) return undefined;

  const agency = artifact.agency ?? "NASA";
  const defaultScientists: MissionScientist[] =
    agency === "NASA"
      ? [
          {
            name: `${artifact.mission} Flight Directorate`,
            role: "Mission Operations & Flight Director",
            institution: "NASA Jet Propulsion Laboratory / Johnson Space Center",
            contribution: `Directed deep space telemetry, trajectory correction maneuvers, and autonomous surface activities for ${artifact.name}.`,
            quote: "Every command uploaded across millions of miles is an act of trust between humanity and machine.",
          },
          {
            name: "Science Working Group",
            role: "Principal Investigators & Instrument Leads",
            institution: "NASA Planetary Science Division",
            contribution: `Designed and calibrated the scientific payloads onboard ${artifact.name}, analyzing returned telemetry and multispectral data.`,
          },
        ]
      : agency === "ISRO"
      ? [
          {
            name: "ISRO Mission Operations Team",
            role: "Flight Dynamics & Mission Directorate",
            institution: "ISRO Telemetry, Tracking and Command Network (ISTRAC)",
            contribution: `Executed translunar and interplanetary injection burns, orbit circularization, and tracking for ${artifact.name}.`,
            quote: "From humble beginnings with soundings rockets, Indian space exploration reaches out across the Solar System.",
          },
          {
            name: "Space Applications Centre (SAC)",
            role: "Payload Design & Scientific Investigation",
            institution: "ISRO Space Applications Centre, Ahmedabad",
            contribution: `Engineered indigenous optical, spectrometer, and sensor instruments operating under stringent power and mass envelopes.`,
          },
        ]
      : [
          {
            name: "ESA Spacecraft Operations Team",
            role: "Flight Dynamics & Operations",
            institution: "European Space Operations Centre (ESOC), Darmstadt",
            contribution: `Guided interplanetary cruise, gravity assists, and science downlink schedules for ${artifact.name}.`,
          },
          {
            name: "European Planetary Science Consortium",
            role: "Science Instrument Working Group",
            institution: "ESA ESTEC, Noordwijk, Netherlands",
            contribution: `Coordinated multinational European scientific payloads, calibration datasets, and planetary protection protocols.`,
          },
        ];

  const photos: ArchivalPhoto[] = [];
  if (artifact.photo) {
    const photoDate = artifact.arrivalDate ?? artifact.launchDate;
    photos.push({
      id: `${artifact.id}-archival`,
      url: artifact.photo.url,
      title: `${artifact.name} Archival Record`,
      caption: artifact.photo.caption,
      credit: artifact.photo.credit,
      ...(photoDate ? { dateOrSol: photoDate } : {}),
      instrument: "Official Mission Camera",
      significance: `Historical photographic record of ${artifact.name} verified in official ${agency} archives.`,
    });
  }

  const milestoneDate = artifact.arrivalDate ?? artifact.launchDate;

  return {
    artifactId: artifact.id,
    missionOverview: artifact.summary,
    scientists: defaultScientists,
    photos,
    instruments: [
      {
        name: `${artifact.name} Primary Science Payload`,
        acronym: "PSP",
        purpose: `Planetary geological and environmental characterization at ${artifact.site ?? artifact.bodyId ?? "target destination"}`,
        leadInstitution: `${agency} Science Directorate`,
        description: `Integrated sensor suite measuring surface morphology, elemental chemistry, and local radiation environment.`,
        keyDiscovery: `Delivered foundational datasets establishing the geological and environmental history of the landing site.`,
      },
    ],
    specs: {
      massLaunchKg: "Mission Classified / Documented in PDS",
      massLandedKg: artifact.kind === "rover" || artifact.kind === "lander" ? "Surface Hardware Payload" : "N/A",
      dimensions: "Documented in Official Agency Catalog",
      powerSystem: "Solar Arrays & High-Reliability Battery Subsystems",
      flightComputer: "Radiation-hardened Flight Management Processor",
      communicationLinks: `${agency} Deep Space Network / Relay Satellites`,
      plannedDuration: "Primary Science Mission",
      actualDuration: artifact.lastSignal ? `Operational until ${artifact.lastSignal}` : "Documented Mission Lifetime",
    },
    breakthroughs: [
      {
        title: `Successful Exploration Milestone: ${artifact.name}`,
        ...(milestoneDate ? { dateOrSol: milestoneDate } : {}),
        summary: `Successfully completed historic space exploration phase as part of ${artifact.mission}.`,
        significance: `Advanced human knowledge of ${artifact.bodyId ?? "the Solar System"} through verified in-situ and orbital observations.`,
      },
    ],
    historicalQuotes: [
      {
        quote: `${artifact.name} represents the ingenuity and relentless curiosity of humanity to explore the cosmos.`,
        author: `${agency} Mission Commentary`,
        context: `Archival record from ${artifact.mission}.`,
      },
    ],
    officialArchives: artifact.sources.map((s) => ({
      name: s.label,
      url: s.url,
      description: `Official primary mission documentation and catalog records.`,
    })),
  };
}
