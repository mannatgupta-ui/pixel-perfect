import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ARTIFACTS } from "../src/data/artifacts";
import { BODIES } from "../src/data/bodies";
import { MISSION_DOSSIERS } from "../src/data/missionDossiers";
import { getStoryForArtifact } from "../src/data/multiStories";
import { SPIRIT_PARTS, SPIRIT_STORY } from "../src/data/spirit";
import { MANGALYAAN_EXPERIENCE_CONFIG } from "../src/components/experience/MangalyaanMissionConfig";

interface KnowledgeDoc {
  doc_id: string;
  title: string;
  category: string;
  content: string;
  source: string;
  metadata: Record<string, any>;
}

const docs: KnowledgeDoc[] = [];

// 1. All 37 Artifacts
for (const a of ARTIFACTS) {
  const parts = [
    `Name: ${a.name} (Mission: ${a.mission}, Agency: ${a.agency}, Type: ${a.kind}).`,
    `Operating Body/Planet: ${a.bodyId ?? "Deep Space"}.`,
    `Launch Date: ${a.launchDate}. Arrival Date: ${a.arrivalDate} (${a.arrivalLabel}).`,
    `Status: ${a.status} (${a.statusLabel}).`,
    a.site ? `Landing/Impact Site: ${a.site}.` : "",
    a.finalLocation ? `Final Coordinates/Location: ${a.finalLocation}.` : "",
    a.finalCondition ? `Final Condition: ${a.finalCondition}.` : "",
    a.endReason ? `Why the Mission Concluded: ${a.endReason}` : "",
    a.remains ? `Physical Remains on Planetary Surface/Atmosphere: ${a.remains}` : "",
    `Mission Summary: ${a.summary}`,
  ].filter(Boolean);

  docs.push({
    doc_id: `artifact-${a.id}`,
    title: `${a.name} — NASA Archive Mission Overview`,
    category: "artifact",
    content: parts.join("\n"),
    source: a.sources[0]?.url ? `${a.sources[0].label} (${a.sources[0].url})` : (a.sources[0]?.label ?? "NASA Science & Planetary Data System"),
    metadata: {
      artifactId: a.id,
      name: a.name,
      mission: a.mission,
      agency: a.agency,
      planet: a.bodyId ?? "deep space",
      kind: a.kind,
      status: a.status,
    },
  });
}

// 2. All 10 Celestial Bodies
for (const b of BODIES) {
  const parts = [
    `Celestial Body: ${b.name} (${b.tagline}).`,
    `Physical Dimensions: Diameter ${b.diameterKm.toLocaleString()} km. Distance from Sun: ${b.distance}. Day Length: ${b.dayLength}.`,
    b.noHardwareNote ?? "Explorable celestial body holding historical NASA hardware.",
  ].filter(Boolean);

  docs.push({
    doc_id: `body-${b.id}`,
    title: `${b.name} — Solar System Exploration Profile`,
    category: "planet",
    content: parts.join("\n"),
    source: "NASA Solar System Exploration (science.nasa.gov)",
    metadata: {
      bodyId: b.id,
      name: b.name,
      planet: b.name.toLowerCase(),
    },
  });
}

// 3. Mission Dossiers (In-depth engineering & science)
for (const [key, dossier] of Object.entries(MISSION_DOSSIERS)) {
  const artifact = ARTIFACTS.find((a) => a.id === dossier.artifactId);
  const name = artifact ? artifact.name : key;

  const scientistText = dossier.scientists && dossier.scientists.length > 0
    ? "Key Mission Scientists & Engineers:\n" + dossier.scientists.map((s) => `- ${s.name} (${s.role}, ${s.institution}): ${s.contribution}`).join("\n")
    : "";

  const specsText = dossier.specs && dossier.specs.length > 0
    ? "Engineering Specifications:\n" + dossier.specs.map((sp) => `- ${sp.label}: ${sp.value}`).join("\n")
    : "";

  const instrumentsText = dossier.instruments && dossier.instruments.length > 0
    ? "Science Payloads & Instruments:\n" + dossier.instruments.map((ins) => `- ${ins.name} (${ins.short}): ${ins.purpose}`).join("\n")
    : "";

  const content = [
    `Mission: ${name} Deep Engineering Dossier`,
    dossier.missionOverview,
    scientistText,
    specsText,
    instrumentsText,
  ].filter(Boolean).join("\n\n");

  docs.push({
    doc_id: `dossier-${dossier.artifactId}`,
    title: `${name} — Scientific & Engineering Dossier`,
    category: "dossier",
    content,
    source: "NASA JPL & Mission Science Technical Documentation",
    metadata: {
      artifactId: dossier.artifactId,
      name,
      planet: artifact?.bodyId ?? "deep space",
    },
  });
}

// 4. Mission Stories for each artifact
for (const a of ARTIFACTS) {
  try {
    const story = getStoryForArtifact(a.id);
    if (story && story.stages && story.stages.length > 0) {
      for (const st of story.stages) {
        const content = [
          `Mission: ${a.name} (${a.mission}). Stage ${st.number}: ${st.title} (${st.date}).`,
          `First-Person Journey & Narration: ${st.narration.join(" ")}`,
          `Scientific Discovery (${st.scienceTitle}): ${st.science}`,
          st.facts && st.facts.length > 0 ? `Historical Facts: ${st.facts.join("; ")}` : "",
        ].filter(Boolean).join("\n");

        docs.push({
          doc_id: `story-${a.id}-stage-${st.number}`,
          title: `${a.name} — Stage ${st.number}: ${st.title}`,
          category: "story",
          content,
          source: `${a.name} Historical Mission Logs`,
          metadata: {
            artifactId: a.id,
            name: a.name,
            mission: a.mission,
            planet: a.bodyId ?? "deep space",
            stage: st.number,
            stageTitle: st.title,
          },
        });
      }
    }
  } catch (e) {
    // skip if story unavailable
  }
}

// 5. Spirit Parts
for (const p of SPIRIT_PARTS) {
  docs.push({
    doc_id: `component-spirit-${p.id}`,
    title: `Spirit Rover Subsystem: ${p.name} (${p.short})`,
    category: "component",
    content: `${p.name} (${p.short}): ${p.purpose}. Engineering details: ${p.detail}`,
    source: "NASA JPL MER-A Engineering Specifications",
    metadata: {
      artifactId: "spirit",
      name: "Spirit Rover",
      planet: "mars",
      component: p.name,
    },
  });
}

// 6. Mangalyaan Components & Chapters
for (const c of MANGALYAAN_EXPERIENCE_CONFIG.components) {
  docs.push({
    doc_id: `component-mangalyaan-${c.id}`,
    title: `Mangalyaan Subsystem: ${c.name}`,
    category: "component",
    content: `${c.name} (${c.category} subsystem): ${c.description}. Technical specifications: ${c.specs.join("; ")}`,
    source: "ISRO Mars Orbiter Mission Engineering Specifications",
    metadata: {
      artifactId: "mangalyaan",
      name: "Mars Orbiter Mission (Mangalyaan)",
      planet: "mars",
      component: c.name,
    },
  });
}

for (const ch of MANGALYAAN_EXPERIENCE_CONFIG.chapters) {
  docs.push({
    doc_id: `mangalyaan-chapter-${ch.chapterNumber}`,
    title: `Mangalyaan Chapter ${ch.chapterNumber}: ${ch.title}`,
    category: "story",
    content: `Chapter ${ch.chapterNumber} (${ch.title}, ${ch.historicalDate}): ${ch.firstPersonVoice.join(" ")}. Scientific Context: ${ch.scientificContext}. Key events: ${ch.eventPills.join(", ")}. Telemetry: Speed ${ch.telemetry.speedKmS} km/s, Earth distance ${ch.telemetry.distEarthKm} km, Propellant ${ch.telemetry.propellantMassKg} kg.`,
    source: ch.sources[0]?.title ? `${ch.sources[0].title} (${ch.sources[0].url ?? ""})` : "ISRO Mars Orbiter Mission Archives",
    metadata: {
      artifactId: "mangalyaan",
      name: "Mars Orbiter Mission (Mangalyaan)",
      planet: "mars",
      chapter: ch.chapterNumber,
    },
  });
}

const outputPath = path.resolve("./backend/nasa_knowledge_base.json");
fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2), "utf-8");
console.log(`Successfully exported ${docs.length} knowledge documents to ${outputPath}`);
