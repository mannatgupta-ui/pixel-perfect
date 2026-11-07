import type { BodyId } from "@/data/types";
import sun from "@/assets/textures/sun.jpg.asset.json";
import mercury from "@/assets/textures/mercury.jpg.asset.json";
import venus from "@/assets/textures/venus.jpg.asset.json";
import earth from "@/assets/textures/earth.jpg.asset.json";
import moon from "@/assets/textures/moon.jpg.asset.json";
import mars from "@/assets/textures/mars.jpg.asset.json";
import jupiter from "@/assets/textures/jupiter.jpg.asset.json";
import saturn from "@/assets/textures/saturn.jpg.asset.json";
import uranus from "@/assets/textures/uranus.jpg.asset.json";
import neptune from "@/assets/textures/neptune.jpg.asset.json";
import saturnRing from "@/assets/textures/saturn-ring.png.asset.json";

/** Equirectangular colour maps (Solar System Scope, CC BY 4.0, based on NASA data). */
export const TEXTURES: Record<BodyId, string> = {
  sun: sun.url,
  mercury: mercury.url,
  venus: venus.url,
  earth: earth.url,
  moon: moon.url,
  mars: mars.url,
  jupiter: jupiter.url,
  saturn: saturn.url,
  uranus: uranus.url,
  neptune: neptune.url,
};

export const SATURN_RING_TEXTURE = saturnRing.url;

export const TEXTURE_CREDIT = {
  label: "Planet maps: Solar System Scope (CC BY 4.0), based on NASA mission data",
  url: "https://www.solarsystemscope.com/textures/",
};
