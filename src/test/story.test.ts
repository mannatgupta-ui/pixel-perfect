import { describe, expect, it } from "vitest";
import { SPIRIT_STORY, SPIRIT_TIMELINE, SPIRIT_PARTS } from "@/data/spirit";
import { generateContextualAnswer } from "@/lib/astroKnowledge";

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
});
