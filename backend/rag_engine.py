"""
NASA Mission RAG (Retrieval-Augmented Generation) Engine.
Grounded in authentic NASA mission archives, NSSDCA, and JPL telemetry logs.
"""

from typing import List, Dict, Any, Optional
import os
import re
import json
import time

from dotenv import load_dotenv

# Always load the .env file located inside the backend folder or workspace root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

# Optional cloud LLM SDKs
try:
    from google import genai
    from google.genai import types
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

try:
    from openai import OpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False


class KnowledgeDocument:
    def __init__(
        self,
        doc_id: str,
        title: str,
        category: str,
        content: str,
        source: str,
        metadata: Dict[str, Any]
    ):
        self.doc_id = doc_id
        self.title = title
        self.category = category
        self.content = content
        self.source = source
        self.metadata = metadata


# Comprehensive verified NASA Mission Knowledge Archive
NASA_DOCUMENTS = [
    # ── SPIRIT ROVER ──
    KnowledgeDocument(
        doc_id="mer-a-overview",
        title="Spirit Rover (MER-A) Mission Overview",
        category="rover",
        content="""Spirit (MER-A) was NASA's first Mars Exploration Rover. Launched June 10, 2003 on a Delta II rocket, 
it landed at Gusev Crater (14.5692° S, 175.4729° E) on January 4, 2004 UTC using an innovative 28-bounce airbag landing system. 
Spirit was designed for a 90-sol primary mission but operated for 2,210 sols (6 years, 2 months, 19 days), driving 7.73 km. 
Spirit's mission proved that ancient Mars possessed active hydrothermal systems and liquid water.""",
        source="NASA Science — MER Spirit Archive (science.nasa.gov/mission/mer-spirit)",
        metadata={"body": "mars", "mission": "MER-A", "status": "silent", "dates": "2003-2010"}
    ),
    KnowledgeDocument(
        doc_id="spirit-hardware-parts",
        title="Spirit Rover Engineering Systems & Science Instruments",
        category="engineering",
        content="""Spirit Rover Subsystems & Athena Science Payload:
1. Rock Abrasion Tool (RAT): Diamonds-impregnated resin cutter spinning at 3000 RPM, created by Honeybee Robotics, grinds 5mm deep into Martian basalt.
2. Mössbauer Spectrometer (MIMOS II): Developed by Mainz University; uses 57Co radioactive source to detect iron-bearing mineral oxidation states.
3. Alpha Particle X-Ray Spectrometer (APXS): Developed by Max Planck Institute; irradiates rocks with Curium-244 to measure elemental composition.
4. Panoramic Camera (Pancam): Mast-mounted high-resolution stereo imaging system with 16 optical filter wheels.
5. Miniature Thermal Emission Spectrometer (Mini-TES): Infrared spectrometer identifying carbonates, silicates, and thermal inertia.
6. High Gain Antenna (HGA): Steerable 0.28-meter parabolic dish communicating directly with Deep Space Network (DSN) on X-band.
7. Low Gain Antenna (LGA): Omnidirectional backup antenna transmitting at 10-40 bps.
8. Solar Array Wings: Triple-junction gallium arsenide cells producing up to 900 Wh/sol initially, declining to ~140 Wh/sol in dust seasons.""",
        source="NASA JPL MER Engineering Design Specifications",
        metadata={"rover": "Spirit", "components": ["wheels", "mast", "arm", "solar", "rat", "hga", "lga", "body"]}
    ),
    KnowledgeDocument(
        doc_id="spirit-silica-discovery",
        title="Discovery of Pure Silica Hydrothermal Deposits",
        category="discovery",
        content="""In May 2007 near Home Plate in the Columbia Hills, Spirit's jammed right-front wheel was dragged backwards, 
gouge-trenching the soil. It churned up bright white soil composed of 90% pure amorphous silica (SiO2). 
On Earth, this concentration only forms in hot boiling springs or fumarolic steam vents. 
This proved that ancient Gusev had both liquid water and intense geothermal volcanic heat simultaneously, forming a habitable zone for ancient microbes.""",
        source="Science Journal (Squyres et al., 'Detection of Silica-Rich Deposits on Mars by the Spirit Rover')",
        metadata={"body": "mars", "sol": "1150", "year": "2007"}
    ),
    KnowledgeDocument(
        doc_id="spirit-last-signal",
        title="The Final Signal and Conclusion of Spirit Rover",
        category="conclusion",
        content="""On May 1, 2009 (Sol 1892), Spirit broke through a crust into loose sulfate-rich sand at 'Troy' west of Home Plate. 
Engineers commanded hundreds of maneuvers, but in November 2009 the right-rear wheel failed as well. 
Spirit was converted to a stationary science station. With its solar panels stuck at a 9° southern tilt, it could not face the low winter Sun in the north. 
Power dropped below heating thresholds. Spirit sent its last communication on March 22, 2010 (Sol 2210). 
On May 25, 2011, after transmitting over 1,200 recovery commands via the Deep Space Network, NASA formally concluded the mission.""",
        source="NASA JPL MER-A Mission Archive Press Release 2011-156",
        metadata={"body": "mars", "sol": "2210", "status": "silent", "final_coords": "-14.5684, 175.4785"}
    ),

    # ── OPPORTUNITY ROVER ──
    KnowledgeDocument(
        doc_id="mer-b-overview",
        title="Opportunity Rover (MER-B) Mission",
        category="rover",
        content="""Opportunity (MER-B) was Spirit's twin rover, landing at Meridiani Planum on January 25, 2004 UTC. 
Opportunity famously scored a 'hole-in-one' by rolling into Eagle Crater. 
Over an unprecedented 14 years and 138 days (5,352 sols), Opportunity drove 45.16 km — the longest off-world driving record of any wheeled vehicle in human history. 
Opportunity discovered 'blueberries' (hematite-rich concretions formed in neutral water) and explored endurance craters including Victoria and Endeavour. 
A catastrophic planet-encircling dust storm in June 2018 severed solar power; the mission was officially concluded on February 13, 2019.""",
        source="NASA JPL MER Opportunity Official Log (science.nasa.gov)",
        metadata={"body": "mars", "distance_km": 45.16, "sols": 5352, "status": "silent"}
    ),

    # ── APOLLO LUNAR HARDWARE ──
    KnowledgeDocument(
        doc_id="apollo-11-descent-stage",
        title="Apollo 11 Lunar Module Descent Stage and Surface Experiments",
        category="apollo",
        content="""On July 20, 1969, Apollo 11's Lunar Module 'Eagle' touched down at Mare Tranquillitatis (0.67408° N, 23.47297° E). 
The descent stage, powered by the TRW Descent Propulsion System (DPS) throttling between 1,050 to 9,850 lbf, served as the launch platform for the ascent stage and remains on the Moon today. 
Surrounding Eagle are the Early Apollo Scientific Experiments Package (EASEP):
1. Passive Seismic Experiment Package (PSEP): Monitored moonquakes.
2. Laser Ranging Retroreflector (LRRR): A 100-corner-cube quartz reflector array still actively used by Earth observatories to measure Moon distance to millimetre accuracy.
Also remaining: television camera, solar wind composition experiment foil, solar battery, Neil Armstrong and Buzz Aldrin's commemorative plaque: 'Here men from the planet Earth first set foot upon the Moon...'""",
        source="NASA History Division — Apollo 11 Mission Report (SP-214)",
        metadata={"body": "moon", "site": "Mare Tranquillitatis", "year": "1969", "mass_kg": 2034}
    ),
    KnowledgeDocument(
        doc_id="apollo-lrv",
        title="Apollo Lunar Roving Vehicles (LRV 1, 2, 3)",
        category="apollo",
        content="""Boeing and General Motors built three Lunar Roving Vehicles for Apollo 15, 16, and 17. 
Each LRV massed 210 kg on Earth (35 kg on Moon) with an open tubular aluminium chassis, four independent 0.25-horsepower DC electric motors inside each wheel, 
and woven zinc-coated steel wire mesh tires with titanium chevrons. 
LRV-1 (Apollo 15, Hadley-Apennine) drove 27.76 km; LRV-2 (Apollo 16, Descartes Highlands) drove 26.55 km; LRV-3 (Apollo 17, Taurus-Littrow) drove 35.89 km. 
All three LRVs remain parked on the Moon, left precisely aimed so their color television cameras could broadcast the liftoff of the Lunar Module Ascent Stages into lunar orbit.""",
        source="NASA SP-287 — What Made Apollo A Success: Lunar Roving Vehicle",
        metadata={"body": "moon", "missions": ["Apollo 15", "Apollo 16", "Apollo 17"]}
    ),

    # ── DEEP SPACE & OUTER PLANETS ──
    KnowledgeDocument(
        doc_id="voyager-interstellar",
        title="Voyager 1 & 2 Interstellar Probes",
        category="probe",
        content="""Launched in 1977, Voyager 1 and Voyager 2 are humanity's most distant explorers. 
Voyager 1 entered interstellar space on August 25, 2012; Voyager 2 crossed into interstellar space on November 5, 2018. 
Each carries the Golden Record: a 12-inch gold-plated copper disc containing 115 images, sounds of Earth, 90 minutes of music, and greetings in 55 languages. 
Powered by Plutonium-238 Radioisotope Thermoelectric Generators (RTGs), both probes continue transmitting scientific data across more than 24 billion kilometres. 
They will drift through the Milky Way indefinitely, surviving for millions of years as cultural and technological monuments of our civilization.""",
        source="NASA JPL Interstellar Mission Archive",
        metadata={"body": "interstellar", "launch": "1977", "distance_au": ">160 AU"}
    ),

    # ── MANGALYAAN (ISRO MARS ORBITER MISSION) ──
    KnowledgeDocument(
        doc_id="mangalyaan-overview",
        title="Mars Orbiter Mission (Mangalyaan) Overview & Frugal Engineering",
        category="orbiter",
        content="""India's Mars Orbiter Mission (MOM), unofficially dubbed Mangalyaan, was India's first interplanetary expedition 
and one of the greatest feats of frugal aerospace engineering in human history. Built in a record 15 months for ₹450 crore 
(~$74 million USD), it launched on 5 November 2013 on a PSLV-XL rocket and entered Mars orbit on 24 September 2014 on its very 
first attempt — making India the first Asian nation to reach Mars and the first in the world to succeed on a maiden trial. 
Designed for 6 months, Mangalyaan operated for nearly 8 years until April 2022.""",
        source="ISRO Mars Orbiter Mission Official Archive (isro.gov.in/MarsOrbiterMission.html)",
        metadata={"body": "mars", "agency": "ISRO", "cost_usd": 74000000, "launch": "2013-11-05", "orbit_insertion": "2014-09-24"}
    ),
    KnowledgeDocument(
        doc_id="mangalyaan-engineering",
        title="Mangalyaan Spacecraft Engineering, Bus & 5 Scientific Payloads",
        category="engineering",
        content="""Mangalyaan was built on an adapted I-1K satellite bus with a total launch mass of 1,337 kg. 
Key subsystems:
1. 440N Liquid Apogee Motor (LAM): Bipropellant engine burning Monomethylhydrazine (MMH) and MON-3 oxidiser.
2. Solar Array: Single wing of 3 solar panels (1.8m × 1.4m) generating 840W at Mars.
3. 2.2-meter High Gain Parabolic Reflector Antenna operating on S-band and X-band.
4. Scientific Payloads (15 kg total):
   - Mars Colour Camera (MCC): High-resolution tri-colour imager producing over 1,000 global Martian portraits.
   - Thermal Infrared Imaging Spectrometer (TIS): Measures thermal emissions to map surface mineral composition.
   - Methane Sensor for Mars (MSM): Fabry-Pérot etalon measuring methane absorption lines at 1.65 µm.
   - Lyman-Alpha Photometer (LAP): Photometer measuring deuterium-to-hydrogen ratio to quantify atmospheric water loss.
   - Mars Exospheric Neutral Composition Analyser (MENCA): Quadrupole mass spectrometer measuring exospheric particle density.""",
        source="ISRO Satellite Centre (ISAC) Engineering Specifications",
        metadata={"bus": "I-1K", "mass_kg": 1337, "payload_kg": 15, "instruments": ["MCC", "TIS", "MSM", "LAP", "MENCA"]}
    ),
    KnowledgeDocument(
        doc_id="mangalyaan-trajectory",
        title="Oberth Slingshot Trajectory and 24-Minute Mars Orbit Insertion Burn",
        category="trajectory",
        content="""Because the PSLV-XL lacked the thrust for direct Trans-Mars Injection, ISRO used an ingenious orbital slingshot manoeuvre: 
Mangalyaan remained in elliptical Earth parking orbit for 25 days, firing its 440N LAM at perigee 6 successive times to raise its apogee 
from 23,000 km to nearly 193,000 km before Trans-Mars Injection on 1 December 2013. 
On 24 September 2014, after 298 days of deep space cruise, the main 440N engine was reignited behind the dark side of Mars 
during total radio blackout, firing for 1,388 seconds to decelerate the probe by 1,098 m/s into a 421 km × 76,993 km elliptical orbit.""",
        source="ISRO Mission Operations Complex (MOX) Flight Telemetry",
        metadata={"body": "mars", "moi_date": "2014-09-24", "delta_v": "1098 m/s", "burn_duration": "1388s"}
    ),
]


class RAGEngine:
    def __init__(self):
        self.docs = []
        json_path = os.path.join(os.path.dirname(__file__), "nasa_knowledge_base.json")
        if os.path.exists(json_path):
            try:
                with open(json_path, "r", encoding="utf-8") as f:
                    raw_docs = json.load(f)
                for d in raw_docs:
                    self.docs.append(
                        KnowledgeDocument(
                            doc_id=d.get("doc_id", ""),
                            title=d.get("title", ""),
                            category=d.get("category", "general"),
                            content=d.get("content", ""),
                            source=d.get("source", "NASA Mission Archives"),
                            metadata=d.get("metadata", {})
                        )
                    )
            except Exception as e:
                print(f"Warning: could not load {json_path}: {e}", flush=True)

        if not self.docs:
            self.docs = list(NASA_DOCUMENTS)
        else:
            # Also append any embedded documents not already in the list
            existing_ids = set(d.doc_id for d in self.docs)
            for d in NASA_DOCUMENTS:
                if d.doc_id not in existing_ids:
                    self.docs.append(d)

    def search(self, query: str, context: Optional[Dict[str, Any]] = None, top_k: int = 4) -> List[KnowledgeDocument]:
        query_lower = query.lower()
        tokens = set(re.findall(r"\w+", query_lower))

        # Check if the query is a deictic reference to current location/page
        deictic_phrases = [
            "the page", "this page", "current page", "here", "what is this",
            "what am i looking at", "tell me about this", "explain this",
            "explain me about the page", "what does this do", "about this mission",
            "this artifact", "this spacecraft", "this rover", "this lander",
            "this planet", "this body", "this stage", "this chapter"
        ]
        is_page_referral = any(p in query_lower for p in deictic_phrases) or len(tokens) <= 3

        # Extract context keywords
        artifact_name = str(context.get("selected_artifact") or "").strip().lower() if context else ""
        mission_name = str(context.get("selected_mission") or "").strip().lower() if context else ""
        planet_name = str(context.get("selected_planet") or "").strip().lower() if context else ""
        component_name = str(context.get("selected_component") or "").strip().lower() if context else ""
        stage_name = str(context.get("current_story_stage") or "").strip().lower() if context else ""

        stop_words = {
            "the", "a", "an", "is", "are", "was", "were", "in", "on", "at", "to",
            "for", "of", "with", "about", "me", "you", "it", "this", "that", "page",
            "what", "tell", "explain", "who", "why", "how", "and", "or", "from"
        }
        meaningful_query_tokens = [t for t in tokens if t not in stop_words and len(t) > 2]

        scored_docs = []
        for doc in self.docs:
            score = 0
            doc_text = f"{doc.title} {doc.content}".lower()
            doc_tokens = set(re.findall(r"\w+", doc_text))
            doc_meta = getattr(doc, "metadata", {}) or {}

            # 1. Meaningful query token overlap
            for t in meaningful_query_tokens:
                if t in doc_tokens:
                    score += 4
                if t in doc.title.lower():
                    score += 8

            # 2. Contextual alignment
            # A. Artifact match
            if artifact_name:
                doc_art_id = str(doc_meta.get("artifactId", "")).lower()
                doc_art_name = str(doc_meta.get("name", "")).lower()
                art_tokens = [t for t in re.findall(r"\w+", artifact_name) if t not in stop_words and len(t) > 2]

                if artifact_name in doc_art_name or (doc_art_id and doc_art_id in artifact_name):
                    score += 40 if is_page_referral else 16
                elif art_tokens and any(t in doc_art_name or t in doc.title.lower() for t in art_tokens):
                    score += 25 if is_page_referral else 12
                elif art_tokens and any(t in doc_tokens for t in art_tokens):
                    score += 12 if is_page_referral else 6

            # B. Component match
            if component_name:
                comp_tokens = [t for t in re.findall(r"\w+", component_name) if t not in stop_words and len(t) > 2]
                if component_name in doc_text:
                    score += 35
                elif comp_tokens and any(t in doc_tokens for t in comp_tokens):
                    score += 18

            # C. Story Stage / Chapter match
            if stage_name:
                stage_tokens = [t for t in re.findall(r"\w+", stage_name) if t not in stop_words and len(t) > 2]
                if stage_name in doc_text:
                    score += 20
                elif stage_tokens and any(t in doc_tokens for t in stage_tokens):
                    score += 10

            # D. Planet match
            if planet_name and planet_name not in ["solar system", "deep space", "home / overview"]:
                doc_planet = str(doc_meta.get("planet", "")).lower()
                doc_body_id = str(doc_meta.get("bodyId", "")).lower()
                planet_tokens = [t for t in re.findall(r"\w+", planet_name) if t not in stop_words and len(t) > 2]

                # If visitor is on a planet page without a specific artifact selected
                if not artifact_name and is_page_referral:
                    if planet_name in doc_planet or planet_name in doc_body_id:
                        score += 35
                    elif planet_tokens and any(t in doc.title.lower() for t in planet_tokens):
                        score += 25
                    elif planet_tokens and any(t in doc_tokens for t in planet_tokens):
                        score += 10
                else:
                    if planet_name in doc_planet or planet_name in doc_body_id:
                        score += 8
                    elif planet_tokens and any(t in doc_tokens for t in planet_tokens):
                        score += 3

            if score > 0:
                scored_docs.append((score, doc))

        scored_docs.sort(key=lambda x: x[0], reverse=True)
        results = [doc for _, doc in scored_docs[:top_k]]
        return results if results else self.docs[:top_k]

    def answer_query(self, query: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Retrieves NASA archive knowledge and generates a grounded response.
        Supports both OpenRouter and Google Gemini APIs with automatic transient retries.
        Falls back to local archive synthesis if external APIs are unavailable.
        """
        retrieved_docs = self.search(query, context, top_k=4)
        sources = list(dict.fromkeys(d.source for d in retrieved_docs))

        # Extract rich location string from context
        active_location = []
        if context:
            if context.get("selected_artifact"):
                active_location.append(f"Artifact: {context['selected_artifact']}")
            if context.get("selected_mission"):
                active_location.append(f"Mission: {context['selected_mission']}")
            if context.get("selected_component"):
                active_location.append(f"Selected Component/Subsystem: {context['selected_component']}")
            if context.get("selected_planet"):
                active_location.append(f"Celestial Body: {context['selected_planet']}")
            if context.get("current_story_stage"):
                active_location.append(f"Mission Stage: {context['current_story_stage']}")
            if context.get("page_title"):
                active_location.append(f"Page Title: {context['page_title']}")
            if context.get("current_path"):
                active_location.append(f"URL: {context['current_path']}")

        location_str = " · ".join(active_location) if active_location else "NASA Museum Overview Deck"
        context_str = "\n\n".join([f"[{d.title}]: {d.content}" for d in retrieved_docs])

        prompt = f"""You are ASTRO, an intelligent NASA Space Exploration Copilot and scientific guide for the 'Abandoned but Not Forgotten' museum.

VISITOR'S CURRENT LOCATION & VIEW:
{location_str}

RELEVANT ARCHIVE KNOWLEDGE:
{context_str}

VISITOR QUESTION:
{query}

CRITICAL INSTRUCTIONS:
1. You are fully contextually aware of where the visitor is right now ({location_str}).
2. If the visitor asks 'explain me about the page', 'what is this?', 'what am I looking at?', or asks any general question, directly explain the specific artifact, celestial body, mission stage, or hardware shown at their current location ({location_str}). Never claim you do not know about their current location if archive documents are provided.
3. Adopt ASTRO's warm, knowledgeable, inspiring Kurzgesagt-style scientific storytelling voice.
4. Ground your answer in the provided NASA archive records. Mention key engineering details, why the mission was launched, scientific discoveries made, and why the hardware was ultimately left behind or concluded.
5. If the visitor asks about a specific subsystem or instrument, explain its purpose, specifications, and what it achieved.
6. Emphasize why this piece of humanity's space legacy is unforgettable."""

        openrouter_key = os.getenv("OPENROUTER_API_KEY")
        gemini_key = os.getenv("GEMINI_API_KEY")
        last_error = None

        # 1. Try OpenRouter if configured
        if openrouter_key and HAS_OPENAI:
            try:
                print("Sending request to OpenRouter...", flush=True)
                client = OpenAI(
                    api_key=openrouter_key,
                    base_url="https://openrouter.ai/api/v1"
                )
                model_name = os.getenv("OPENROUTER_MODEL", "openrouter/free")
                response = client.chat.completions.create(
                    model=model_name,
                    messages=[{"role": "user", "content": prompt}],
                    timeout=60
                )
                print("OpenRouter response received!", flush=True)
                if response.choices and response.choices[0].message.content:
                    return {
                        "answer": response.choices[0].message.content,
                        "sources": sources,
                        "model": f"{response.model or model_name} (OpenRouter NASA RAG)"
                    }
            except Exception as e:
                last_error = e
                print("OPENROUTER FAILED:", repr(e), flush=True)

        # 2. Try Google Gemini if configured
        if gemini_key and HAS_GENAI:
            try:
                client = genai.Client(
                    api_key=gemini_key,
                    http_options=types.HttpOptions(timeout=120000)
                )

                candidate_models = []
                user_model = os.getenv("GEMINI_MODEL")
                if user_model:
                    candidate_models.append(user_model)
                for fallback_m in ["gemini-2.5-flash", "gemini-3.5-flash-lite"]:
                    if fallback_m not in candidate_models:
                        candidate_models.append(fallback_m)

                for model_candidate in candidate_models:
                    for attempt in range(2):
                        try:
                            print(f"sending request to gemini ({model_candidate}) [attempt {attempt + 1}]...", flush=True)
                            response = client.models.generate_content(
                                model=model_candidate,
                                contents=prompt,
                                config={"http_options": {"timeout": 30000}}
                            )
                            print("gemini response received", flush=True)
                            if response and response.text:
                                return {
                                    "answer": response.text,
                                    "sources": sources,
                                    "model": f"{model_candidate} (Live NASA RAG)"
                                }
                        except Exception as err:
                            last_error = err
                            err_str = str(err).lower()
                            print(f"Model {model_candidate} attempt {attempt + 1} failed: {err}", flush=True)

                            # If invalid API key or permission denied, stop retrying this key
                            if "api key not valid" in err_str or "permission" in err_str or "unauthenticated" in err_str:
                                return {
                                    "answer": f"Gemini API authentication failed: {str(err)}. Please verify your GEMINI_API_KEY.",
                                    "sources": sources,
                                    "model": "API Key Error Diagnostic"
                                }

                            # For 503 UNAVAILABLE or 429 high demand / rate limit, wait briefly before retrying
                            if attempt == 0 and ("503" in err_str or "unavailable" in err_str or "429" in err_str or "demand" in err_str):
                                time.sleep(1.2)

                if last_error:
                    print(f"All Gemini models temporarily unavailable ({last_error}). Falling back to verified archives.", flush=True)

            except Exception as e:
                last_error = e
                print("GEMINI FAILED:", repr(e), flush=True)

        # 3. Grounded Archive Synthesis fallback
        primary = retrieved_docs[0]
        secondary = retrieved_docs[1:] if len(retrieved_docs) > 1 else []

        answer_parts = []
        if last_error:
            answer_parts.append(
                "> 🛰️ *Note: Cloud satellite neural link is experiencing temporary high demand (503). Transmitting directly from verified NASA telemetry archives:*\n"
            )

        answer_parts.append(f"**{primary.title}**\n\n{primary.content}")

        if secondary:
            answer_parts.append("\n**Related Mission Context:**")
            for sec in secondary:
                answer_parts.append(
                    f"- **{sec.title}**: {sec.content[:200]}..."
                )

        if location_str:
            answer_parts.append(
                f"\n*(Grounded in current exploration context: {location_str})*"
            )

        return {
            "answer": "\n".join(answer_parts),
            "sources": sources,
            "model": "NASA Mission Archive Knowledge Engine (Grounded Telemetry Fallback)" if last_error else "NASA Mission Archive Knowledge Engine (Grounded RAG)"
        }


rag_engine = RAGEngine()
