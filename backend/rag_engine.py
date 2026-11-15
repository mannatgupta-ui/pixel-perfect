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
from google import genai
from google.genai import types

# Always load the .env file located inside the backend folder or workspace root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

class KnowledgeDocument:
    def __init__(self, doc_id: str, title: str, category: str, content: str, source: str, metadata: Dict[str, Any]):
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
        category="hardware",
        content="""Spirit carried eight core hardware assemblies:
1. Warm Electronics Box (chassis): Aerogel insulation and RHU heaters protecting central electronics from -100°C nights.
2. Solar Arrays: 1.3 m² gallium arsenide cells producing up to 900 Wh/sol, cleaned periodically by dust devils.
3. Pancam Mast Assembly: 1.5 m tall mast with stereo Panoramic Cameras, Navcams, and periscope for Mini-TES.
4. Six Wheels & Rocker-Bogie: 6 cleated wheels with independent motors climbing up to 30° slopes. Front-right motor failed in 2006.
5. Robotic Arm (IDD): 5-joint arm deploying Microscopic Imager, Alpha Particle X-ray Spectrometer (APXS), and Mössbauer Spectrometer.
6. Rock Abrasion Tool (RAT): Diamond-tipped high-speed grinder that ground into rock Adirondack on Sol 34.
7. High-Gain Antenna: 28 cm steerable X-band dish communicating with NASA's Deep Space Network.
8. Low-Gain Antenna: Omnidirectional backup that saved the rover during the Sol 18 flash memory fault.""",
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
NASA transmitted more than 1,300 recovery commands before officially completing the mission on May 25, 2011.""",
        source="NASA JPL Official Mission Status Archive",
        metadata={"last_signal": "2010-03-22", "site": "Troy, Gusev Crater", "status": "silent"}
    ),

    # ── OPPORTUNITY ROVER ──
    KnowledgeDocument(
        doc_id="opportunity-overview",
        title="Opportunity Rover (MER-B) Mission",
        category="rover",
        content="""Opportunity landed at Meridiani Planum on January 25, 2004 UTC, bouncing into Eagle Crater. 
It discovered hematite spheres ('blueberries') formed in ancient standing groundwater. 
Opportunity operated for nearly 15 years, driving a record 45.16 km until a global dust storm cut off solar power in June 2018 at Perseverance Valley in Endeavour Crater.""",
        source="NASA Science — MER Opportunity Archive",
        metadata={"body": "mars", "distance": "45.16 km", "status": "silent"}
    ),

    # ── APOLLO LUNAR HARDWARE ──
    KnowledgeDocument(
        doc_id="apollo-11-hardware",
        title="Apollo 11 Lunar Module Descent Stage and Surface Experiments",
        category="lunar",
        content="""On July 20, 1969, Apollo 11 landed the Lunar Module 'Eagle' at the Sea of Tranquility (0.674° N, 23.473° E). 
While the ascent stage returned Neil Armstrong and Buzz Aldrin to orbit, the gold-insulated descent stage, landing radar, 
EASEP seismometer, and Lunar Laser Ranging Retroreflector (LRRR) remain on the Moon. Observatories on Earth still bounce laser pulses off the reflector today.""",
        source="NASA Apollo Surface Journal & Lunar Reconnaissance Orbiter Data",
        metadata={"body": "moon", "mission": "Apollo 11", "date": "1969-07-20"}
    ),
    KnowledgeDocument(
        doc_id="apollo-lunar-rovers",
        title="Apollo Lunar Roving Vehicles (LRV 1, 2, 3)",
        category="lunar",
        content="""NASA left three battery-powered Lunar Roving Vehicles on the Moon:
- Apollo 15 LRV-1 (Hadley-Apennine, July 1971): drove 27.8 km.
- Apollo 16 LRV-2 (Descartes Highlands, April 1972): drove 26.7 km.
- Apollo 17 LRV-3 (Taurus-Littrow, Dec 1972): drove 35.9 km.
Each rover featured four 1/4-horsepower DC electric motors inside woven steel wire mesh wheels with titanium chevrons.""",
        source="NASA Apollo Program Mission Reports",
        metadata={"body": "moon", "missions": ["Apollo 15", "Apollo 16", "Apollo 17"]}
    ),

    # ── DEEP SPACE EXPLORERS ──
    KnowledgeDocument(
        doc_id="voyager-probes",
        title="Voyager 1 & 2 Interstellar Probes",
        category="deep-space",
        content="""Launched in 1977, Voyager 1 and Voyager 2 are humanity's most distant explorers. 
Voyager 1 entered interstellar space on August 25, 2012; Voyager 2 crossed into interstellar space on November 5, 2018. 
Both probes carry a 12-inch gold-plated copper phonograph record containing sounds, music, and images from Earth.""",
        source="NASA JPL Interstellar Mission Archive",
        metadata={"body": "deep-space", "voyager1": "interstellar", "voyager2": "interstellar"}
    ),

    # ── MANGALYAAN (MARS ORBITER MISSION) — ISRO ──
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
        metadata={"body": "mars", "agency": "ISRO", "launch": "2013-11-05", "arrival": "2014-09-24", "status": "silent"}
    ),
    KnowledgeDocument(
        doc_id="mangalyaan-instruments-hardware",
        title="Mangalyaan Spacecraft Engineering, Bus & 5 Scientific Payloads",
        category="hardware",
        content="""Mangalyaan was built on an adapted I-1K satellite bus with a total launch mass of 1,337 kg. 
Key subsystems:
1. 440N Liquid Apogee Motor (LAM): Bipropellant engine (MMH + MON-3) that completed the 1,388s Mars Orbit Insertion burn.
2. Solar Wing: Three panels (7.56 m² total) generating 840 W at Mars, backed by a 36 Ah lithium-ion battery.
3. 2.2m High-Gain Antenna (HGA): Steerable dual-axis parabolic dish for X-band communication across 400M km.
4. Mars Colour Camera (MCC): 3-color CCD returning >1,000 full-disk color portraits of Mars and Phobos.
5. Lyman Alpha Photometer (LAP): UV photometer measuring D/H ratio and hydrogen loss from the upper atmosphere.
6. Methane Sensor for Mars (MSM): Differential absorption Fabry-Pérot interferometer searching for biological/geothermal methane.
7. Thermal IR Spectrometer (TIS): Microbolometer measuring surface temperatures and mineral emissivity.
8. MENCA: Quadrupole mass spectrometer analyzing neutral exospheric composition.""",
        source="ISRO Satellite Centre (ISAC) Engineering Specifications",
        metadata={"spacecraft": "Mangalyaan", "subsystems": ["LAM", "HGA", "MCC", "LAP", "MSM", "TIS", "MENCA"]}
    ),
    KnowledgeDocument(
        doc_id="mangalyaan-moi-slingshot",
        title="Oberth Slingshot Trajectory and 24-Minute Mars Orbit Insertion Burn",
        category="trajectory",
        content="""Because the PSLV rocket lacked the power to push Mangalyaan directly onto a trans-Mars trajectory, 
ISRO utilized the Oberth effect. Over 25 days, six progressive engine firings at Earth perigee raised the spacecraft's apogee 
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
        Retrieves NASA archive knowledge and generates a grounded Gemini response.
        Falls back to local archive synthesis if Gemini is unavailable or not configured.
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

        # Check for Gemini API key
        api_key = os.getenv("GEMINI_API_KEY")

        if api_key:
            try:
                client = genai.Client(
                    api_key=api_key,
                    http_options=types.HttpOptions(
                        timeout=120000
                    )
                )

                context_str = "\n\n".join(
                    [f"[{d.title}]: {d.content}" for d in retrieved_docs]
                )

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

                candidate_models = []
                user_model = os.getenv("GEMINI_MODEL")
                if user_model:
                    candidate_models.append(user_model)
                for fallback_m in ["gemini-2.5-flash", "gemini-3.5-flash-lite"]:
                    if fallback_m not in candidate_models:
                        candidate_models.append(fallback_m)

                last_error = None
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

                # If all Gemini models encountered transient errors (e.g. 503 high demand), log and fall back to archives
                if last_error:
                    print(f"All Gemini models temporarily unavailable ({last_error}). Falling back to verified archives.", flush=True)

            except Exception as e:
                last_error = e
                print("GEMINI FAILED:", repr(e), flush=True)

        # Grounded Archive Synthesis fallback
        primary = retrieved_docs[0]
        secondary = retrieved_docs[1:] if len(retrieved_docs) > 1 else []

        answer_parts = []
        if last_error:
            answer_parts.append(
                "> 🛰️ *Note: Cloud satellite neural link is experiencing temporary high demand (Google 503). Transmitting directly from verified NASA telemetry archives:*\n"
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

