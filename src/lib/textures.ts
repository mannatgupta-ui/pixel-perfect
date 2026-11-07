import type { BodyId } from "@/data/types";

/**
 * High-resolution equirectangular planetary surface and atmospheric maps.
 * Served locally from /textures/ for fast, reliable offline and localhost performance.
 */
export const TEXTURES: Record<BodyId, string> = {
  sun: "/textures/sun.jpg",
  mercury: "/textures/mercury.jpg",
  venus: "/textures/venus.jpg",
  earth: "/textures/earth.jpg",
  moon: "/textures/moon.jpg",
  mars: "/textures/mars.jpg",
  jupiter: "/textures/jupiter.jpg",
  saturn: "/textures/saturn.jpg",
  uranus: "/textures/uranus.jpg",
  neptune: "/textures/neptune.jpg",
};

export const SATURN_RING_TEXTURE = "/textures/saturn-ring.png";

export const TEXTURE_CREDIT = {
  label: "Equirectangular planetary maps based on NASA mission datasets (JPL, USGS & Solar System Scope, CC BY 4.0)",
  url: "https://www.solarsystemscope.com/textures/",
};
