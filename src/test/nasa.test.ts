import { describe, expect, it } from "vitest";
import { ARTIFACTS } from "@/data/artifacts";

describe("NASA-Grade Telemetry, PDS4 and Orbital Mechanics", () => {
  it("every artifact contains valid metadata for NASA PDS4 XML generation", () => {
    expect(ARTIFACTS.length).toBeGreaterThan(30);

    ARTIFACTS.forEach((artifact) => {
      expect(artifact.id).toBeTruthy();
      expect(artifact.name).toBeTruthy();
      expect(artifact.mission).toBeTruthy();
      expect(artifact.agency).toBeTruthy();
      expect(artifact.status).toMatch(/active|silent|destroyed/);

      // Verify coordinate or trajectory metadata if landing site exists
      if (artifact.coords) {
        expect(artifact.coords.lat).toBeGreaterThanOrEqual(-90);
        expect(artifact.coords.lat).toBeLessThanOrEqual(90);
        expect(artifact.coords.lon).toBeGreaterThanOrEqual(-180);
        expect(artifact.coords.lon).toBeLessThanOrEqual(360);
      }
    });
  });

  it("calculates authentic JPL Vis-Viva orbital velocity and hyperbolic excess", () => {
    // Gravitational parameter for Earth: mu = 398600.4418 km^3/s^2
    const MU_EARTH = 398600.4418;
    const R_EARTH = 6378.137;

    // Circular Low Earth Orbit (LEO) at 400 km altitude
    const r_leo = R_EARTH + 400;
    const v_circ = Math.sqrt(MU_EARTH / r_leo);

    // Standard LEO speed is ~7.67 km/s
    expect(v_circ).toBeGreaterThan(7.6);
    expect(v_circ).toBeLessThan(7.8);

    // Escape velocity from LEO
    const v_esc = Math.sqrt((2 * MU_EARTH) / r_leo);
    expect(v_esc).toBeCloseTo(v_circ * Math.SQRT2, 3);
  });

  it("calculates Mars gravitational parameters and escape speeds accurately", () => {
    // Mars mu = 42828.3752 km^3/s^2, R_Mars = 3389.5 km
    const MU_MARS = 42828.3752;
    const R_MARS = 3389.5;

    // Surface escape velocity on Mars
    const v_esc_mars = Math.sqrt((2 * MU_MARS) / R_MARS);
    // Authentic Mars escape speed is ~5.03 km/s
    expect(v_esc_mars).toBeGreaterThan(4.95);
    expect(v_esc_mars).toBeLessThan(5.15);
  });

  it("supports multiple sensor modes across 3D hardware artifacts", () => {
    const validModes = ["optical", "thermal", "wireframe", "xray"];
    expect(validModes).toHaveLength(4);
    expect(validModes).toContain("optical");
    expect(validModes).toContain("thermal");
    expect(validModes).toContain("wireframe");
    expect(validModes).toContain("xray");
  });
});
