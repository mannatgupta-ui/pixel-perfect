"""
NASA Mission RAG (Retrieval-Augmented Generation) Engine.
Grounded in authentic NASA mission archives, NSSDCA, and JPL telemetry logs.
"""

from typing import List, Dict, Any, Optional
import os
import re

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
]

class RAGEngine:
    def __init__(self):
        self.docs = NASA_DOCUMENTS

    def search(self, query: str, context: Optional[Dict[str, Any]] = None, top_k: int = 3) -> List[KnowledgeDocument]:
        tokens = set(re.findall(r"\w+", query.lower()))
        if not tokens:
            return self.docs[:top_k]

        scored_docs = []
        for doc in self.docs:
            score = 0
            doc_text = f"{doc.title} {doc.content}".lower()
            doc_tokens = set(re.findall(r"\w+", doc_text))

            # Token overlap
            overlap = tokens.intersection(doc_tokens)
            score += len(overlap) * 3

            # Exact title matches
            for token in tokens:
                if len(token) > 2 and token in doc.title.lower():
                    score += 5

            # Context boost
            if context:
                if context.get("selected_artifact") and context["selected_artifact"].lower() in doc_text:
                    score += 6
                if context.get("selected_component") and context["selected_component"].lower() in doc_text:
                    score += 8
                if context.get("selected_planet") and context["selected_planet"].lower() in doc_text:
                    score += 4

            if score > 0:
                scored_docs.append((score, doc))

        scored_docs.sort(key=lambda x: x[0], reverse=True)
        results = [doc for _, doc in scored_docs[:top_k]]
        return results if results else self.docs[:top_k]

    def answer_query(self, query: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Retrieves knowledge and formats an authentic response.
        If LLM API is available in environment (GEMINI_API_KEY), queries the model;
        otherwise synthesizes a grounded response directly from verified archives.
        """
        retrieved_docs = self.search(query, context, top_k=3)
        sources = list(set(d.source for d in retrieved_docs))

        # Check for Gemini API key
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=api_key)
                model = genai.GenerativeModel("gemini-1.5-flash")

                context_str = "\n\n".join([f"[{d.title}]: {d.content}" for d in retrieved_docs])
                prompt = f"""You are ASTRO, an intelligent NASA Space Exploration Copilot for the 'Abandoned but Not Forgotten' museum.
Context Knowledge from NASA Archives:
{context_str}

Visitor Context: {context}
Visitor Question: {query}

Instructions:
1. Answer accurately using only verified facts from the context.
2. Maintain a knowledgeable, inspiring, Kurzgesagt-style scientific storytelling tone.
3. If referring to a component or mission, explain what happened and why it matters.
4. State sources clearly."""
                resp = model.generate_content(prompt)
                return {
                    "answer": resp.text,
                    "sources": sources,
                    "model": "gemini-1.5-flash (Live NASA RAG)"
                }
            except Exception as e:
                # Graceful fallback to grounded archive retrieval
                pass

        # Grounded Archive Synthesis
        primary = retrieved_docs[0]
        secondary = retrieved_docs[1:] if len(retrieved_docs) > 1 else []

        answer_parts = [
            f"**{primary.title}**\n\n{primary.content}"
        ]

        if secondary:
            answer_parts.append("\n**Related Mission Context:**")
            for sec in secondary:
                answer_parts.append(f"- **{sec.title}**: {sec.content[:160]}...")

        if context and any(context.values()):
            ctx_items = [f"{k}: {v}" for k, v in context.items() if v]
            answer_parts.append(f"\n*(Grounded in current exploration context: {', '.join(ctx_items)})*")

        return {
            "answer": "\n".join(answer_parts),
            "sources": sources,
            "model": "NASA Mission Archive Knowledge Engine (Grounded RAG)"
        }

rag_engine = RAGEngine()

