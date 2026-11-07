import { describe, expect, it } from "vitest";
import { SPIRIT_STORY, SPIRIT_TIMELINE, SPIRIT_PARTS } from "@/data/spirit";
import { generateContextualAnswer } from "@/lib/astroKnowledge";
import { ARTIFACTS } from "@/data/artifacts";
import { getStoryForArtifact, ALL_MISSION_STORIES } from "@/data/multiStories";

describe("Spirit Mission Story Data & Timeline", () => {
  it("contains all 11 sequential mission stages with required data", () => {
    expect(SPIRIT_STORY).toHaveLength(11);

    const expectedKeys = [
      "creation",
      "launch",
      "journey",
      "arrival",
      "descent",
      "landing",
      "exploration",
      "discoveries",
      "challenges",
      "last-days",
      "legacy",
    ];

    SPIRIT_STORY.forEach((stage, idx) => {
      expect(stage.id).toBe(expectedKeys[idx]);
      expect(stage.number).toBe(String(idx + 1).padStart(2, "0"));
      expect(stage.title.length).toBeGreaterThan(0);
      expect(stage.narration.length).toBeGreaterThan(0);
      expect(stage.science.length).toBeGreaterThan(0);
      expect(stage.facts.length).toBeGreaterThan(0);
      expect(stage.hotspots.length).toBeGreaterThan(0);
    });
  });

  it("has interactive timeline milestones synchronized with stages", () => {
    expect(SPIRIT_TIMELINE.length).toBeGreaterThanOrEqual(10);
    SPIRIT_TIMELINE.forEach((item) => {
      expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.stageIndex).toBeGreaterThanOrEqual(0);
      expect(item.stageIndex).toBeLessThan(11);
    });
  });

  it("contains all 8 Spirit Rover hardware components for 3D inspection", () => {
    expect(SPIRIT_PARTS).toHaveLength(8);
    const partIds = SPIRIT_PARTS.map((p) => p.id);
    expect(partIds).toContain("wheels");
    expect(partIds).toContain("body");
    expect(partIds).toContain("solar");
    expect(partIds).toContain("mast");
    expect(partIds).toContain("arm");
    expect(partIds).toContain("rat");
    expect(partIds).toContain("hga");
    expect(partIds).toContain("lga");
  });

  it("ASTRO contextual answer engine generates grounded responses with citations", () => {
    const res = generateContextualAnswer("What does the Rock Abrasion Tool do?", {
      selectedArtifact: "Spirit Rover",
      selectedComponent: "Rock Abrasion Tool (RAT)",
    });

    expect(res.answer).toContain("Rock Abrasion Tool");
    expect(res.sources.length).toBeGreaterThan(0);
  });

  it("ensures EVERY museum artifact has hasStory: true and a complete mission story", () => {
    expect(ARTIFACTS.length).toBeGreaterThanOrEqual(30);

    for (const artifact of ARTIFACTS) {
      expect(artifact.hasStory, `Artifact ${artifact.id} must have hasStory === true`).toBe(true);

      const story = getStoryForArtifact(artifact.id);
      expect(story, `Artifact ${artifact.id} must return a valid story`).toBeDefined();
      expect(story.artifactId).toBe(artifact.id);
      expect(story.title.length).toBeGreaterThan(0);
      expect(story.stagesCount).toBeGreaterThanOrEqual(2);
      expect(story.stages.length).toBeGreaterThanOrEqual(2);

      for (const stage of story.stages) {
        expect(stage.title.length).toBeGreaterThan(0);
        expect(stage.narration.length).toBeGreaterThan(0);
        expect(stage.science.length).toBeGreaterThan(0);
        expect(stage.facts.length).toBeGreaterThan(0);
      }
    }
  });

  it("contains all curated mission stories in ALL_MISSION_STORIES list", () => {
    expect(ALL_MISSION_STORIES.length).toBeGreaterThanOrEqual(30);
    const storyArtifactIds = ALL_MISSION_STORIES.map((s) => s.artifactId);
    expect(storyArtifactIds).toContain("spirit");
    expect(storyArtifactIds).toContain("opportunity");
    expect(storyArtifactIds).toContain("curiosity");
    expect(storyArtifactIds).toContain("perseverance");
    expect(storyArtifactIds).toContain("ingenuity");
    expect(storyArtifactIds).toContain("cassini");
    expect(storyArtifactIds).toContain("new-horizons");
    expect(storyArtifactIds).toContain("chandrayaan-3");
    expect(storyArtifactIds).toContain("chandrayaan-2");
    expect(storyArtifactIds).toContain("apollo-11");
    expect(storyArtifactIds).toContain("apollo-17");
  });
});

