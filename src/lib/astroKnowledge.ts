import { ARTIFACTS } from "@/data/artifacts";
import { BODIES } from "@/data/bodies";
import { SPIRIT_PARTS, SPIRIT_STORY } from "@/data/spirit";
import type { AstroContextState } from "@/components/astro/AstroContext";

export interface KnowledgeSnippet {
  topic: string;
  category: "artifact" | "planet" | "component" | "story" | "science";
  content: string;
  source: string;
  keywords: string[];
}

export const KNOWLEDGE_BASE: KnowledgeSnippet[] = [
  ...ARTIFACTS.map((a) => ({
    topic: a.name,
    category: "artifact" as const,
    content: `${a.name} was part of the ${a.mission} mission. ${a.summary} ${
      a.site ? `Landing site: ${a.site}. ` : ""
    }${a.statusLabel}. ${a.finalCondition ? `Condition: ${a.finalCondition} ` : ""}${
      a.endReason ? `Why the mission ended: ${a.endReason} ` : ""
    }${a.finalLocation ? `Final known location: ${a.finalLocation}. ` : ""}${
      a.remains ? `Physical remains: ${a.remains}` : ""
    }`,
    source: a.sources[0]?.label ?? "NASA Mission Archives",
    keywords: [
      a.name.toLowerCase(),
      a.id.toLowerCase(),
      a.mission.toLowerCase(),
      a.kind.toLowerCase(),
      a.bodyId ?? "deep space",
      "status",
      "mission",
    ],
  })),
  ...SPIRIT_PARTS.map((p) => ({
    topic: `Spirit Rover: ${p.name}`,
    category: "component" as const,
    content: `${p.name} (${p.short}): ${p.purpose} Detailed engineering: ${p.detail}`,
    source: "NASA JPL MER-A Engineering Records",
    keywords: [
      p.id.toLowerCase(),
      p.name.toLowerCase(),
      p.short.toLowerCase(),
      "component",
      "hardware",
      "spirit",
      "instrument",
    ],
  })),
  ...SPIRIT_STORY.map((s) => ({
    topic: `Spirit Mission Stage ${s.number}: ${s.title}`,
    category: "story" as const,
    content: `Stage ${s.number} (${s.title}, ${s.date}): ${s.narration.join(" ")} Scientific context (${
      s.scienceTitle
    }): ${s.science} Key facts: ${s.facts.join("; ")}`,
    source: "NASA Mars Exploration Rover Official Archives",
    keywords: [
      s.id.toLowerCase(),
      s.title.toLowerCase(),
      `stage ${s.number}`,
      "story",
      "history",
      "mission stage",
      ...s.facts.map((f) => f.toLowerCase()),
    ],
  })),
  ...BODIES.map((b) => ({
    topic: b.name,
    category: "planet" as const,
    content: `${b.name}: ${b.tagline} Diameter: ${b.diameterKm.toLocaleString()} km. Distance: ${
      b.distance
    }. Day length: ${b.dayLength}. ${b.noHardwareNote ?? "Explorable celestial body holding historical NASA hardware."}`,
    source: "NASA Solar System Exploration",
    keywords: [b.id.toLowerCase(), b.name.toLowerCase(), "planet", "world", "solar system"],
  })),
];

export interface AnswerResult {
  answer: string;
  sources: string[];
  contextUsed: string[];
}

export function generateContextualAnswer(
  query: string,
  context: AstroContextState,
): AnswerResult {
  const q = query.trim().toLowerCase();
  const contextNotes: string[] = [];

  // Match based on active context first
  let primaryMatch: KnowledgeSnippet | null = null;
  const secondaryMatches: KnowledgeSnippet[] = [];

  if (context.selectedComponent) {
    const compMatch = KNOWLEDGE_BASE.find(
      (k) =>
        k.category === "component" &&
        k.keywords.some((kw) => kw.includes(context.selectedComponent!.toLowerCase())),
    );
    if (compMatch) {
      primaryMatch = compMatch;
      contextNotes.push(`Selected component: ${compMatch.topic}`);
    }
  }

  if (!primaryMatch && context.currentStoryStage) {
    const storyMatch = KNOWLEDGE_BASE.find(
      (k) =>
        k.category === "story" &&
        k.keywords.some((kw) => kw.includes(context.currentStoryStage!.toLowerCase())),
    );
    if (storyMatch) {
      primaryMatch = storyMatch;
      contextNotes.push(`Current story stage: ${storyMatch.topic}`);
    }
  }

  if (!primaryMatch && context.selectedArtifact) {
    const artMatch = KNOWLEDGE_BASE.find(
      (k) =>
        k.category === "artifact" &&
        k.keywords.some((kw) => kw.includes(context.selectedArtifact!.toLowerCase())),
    );
    if (artMatch) {
      primaryMatch = artMatch;
      contextNotes.push(`Selected artifact: ${artMatch.topic}`);
    }
  }

  // Keyword scoring across knowledge base
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  const scored = KNOWLEDGE_BASE.map((item) => {
    let score = 0;
    for (const token of tokens) {
      if (item.topic.toLowerCase().includes(token)) score += 5;
      if (item.content.toLowerCase().includes(token)) score += 2;
      if (item.keywords.some((kw) => kw.includes(token))) score += 3;
    }
    // Boost if matches current context
    if (context.selectedArtifact && item.keywords.includes(context.selectedArtifact.toLowerCase())) {
      score += 4;
    }
    if (context.selectedPlanet && item.keywords.includes(context.selectedPlanet.toLowerCase())) {
      score += 3;
    }
    return { item, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  for (const s of scored.slice(0, 3)) {
    if (!secondaryMatches.includes(s.item) && s.item !== primaryMatch) {
      secondaryMatches.push(s.item);
    }
  }

  const allRelevant = [primaryMatch, ...secondaryMatches].filter(Boolean) as KnowledgeSnippet[];

  if (allRelevant.length === 0) {
    return {
      answer: `Greetings, space explorer! I am **ASTRO**, your NASA Space Exploration Copilot. While I don't have a direct archive record matching "${query}", I can tell you about:

- **NASA's Discarded Equipment**: Rovers like *Spirit*, *Opportunity*, *Curiosity*, and *Perseverance*, or lunar descent stages from *Apollo 11* through *Apollo 17*.
- **Spirit Rover's Engineering**: Wheels & rocker-bogie, Pancam mast cameras, solar arrays, robotic arm, or Rock Abrasion Tool.
- **Mission Milestones**: The 2003 Delta II launch, the 28-bounce airbag landing at Gusev Crater, the discovery of ancient hot springs, or the final silent days at Troy.
- **The Last Signal**: How cold Martian winters and dust accumulation eventually ended Spirit's transmissions after 6 remarkable years.

Try asking: *"What does the Rock Abrasion Tool do?"*, *"Why did Spirit's mission end?"*, or *"How did the airbag landing work?"*`,
      sources: ["NASA Science Exploration Archives"],
      contextUsed: contextNotes,
    };
  }

  // Compose answer grounded in retrieved facts
  const target = allRelevant[0];
  if (!target) {
    return {
      answer: "No specific details could be retrieved.",
      sources: ["NASA Mission Records"],
      contextUsed: contextNotes,
    };
  }
  const supporting = allRelevant.slice(1);

  let formattedAnswer = `### ${target.topic}\n\n${target.content}`;

  if (supporting.length > 0) {
    formattedAnswer += `\n\n**Related NASA Mission Context:**\n`;
    for (const sup of supporting) {
      formattedAnswer += `- **${sup.topic}**: ${sup.content.slice(0, 160)}...\n`;
    }
  }

  if (contextNotes.length > 0) {
    formattedAnswer += `\n\n*(Grounded in your current exploration context: ${contextNotes.join(", ")})*`;
  }

  const sources = Array.from(new Set(allRelevant.map((r) => r.source)));

  return {
    answer: formattedAnswer,
    sources,
    contextUsed: contextNotes,
  };
}
