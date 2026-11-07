import { useEffect } from "react";
import * as THREE from "three";

export type SensorMode = "optical" | "thermal" | "wireframe" | "xray";

/**
 * Custom hook to dynamically apply NASA sensor rendering modes to Three.js models:
 * - optical: Authentic PBR space materials with realistic albedo and roughness
 * - thermal: FLIR longwave infrared (LWIR) false-color thermal simulation
 * - wireframe: NASA NASTRAN CAD finite element mesh (FEM) wireframe
 * - xray: High-energy Compton backscatter radiograph with refractive transmission
 */
export function useSensorMode(
  groupRef: React.RefObject<THREE.Group | null>,
  mode: SensorMode = "optical"
) {
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Cache original material
        if (!child.userData["__origMaterial"]) {
          child.userData["__origMaterial"] = child.material;
        }

        if (mode === "optical") {
          child.material = child.userData["__origMaterial"];
        } else if (mode === "wireframe") {
          child.material = new THREE.MeshStandardMaterial({
            wireframe: true,
            color: "#38bdf8",
            emissive: "#0284c7",
            emissiveIntensity: 0.45,
            roughness: 0.2,
            metalness: 0.9,
          });
        } else if (mode === "thermal") {
          // Compute pseudo-thermal false-color mapping based on 3D geometry coordinates
          const p = child.position;
          const hash = Math.abs(Math.sin(p.x * 3.14 + p.y * 6.28 + p.z * 1.57));
          let thermalHex = "#f59e0b"; // warm yellow-orange (~0°C)
          if (hash > 0.72) thermalHex = "#ef4444"; // hot red (+35°C)
          else if (hash > 0.48) thermalHex = "#f97316"; // warm orange (+15°C)
          else if (hash > 0.25) thermalHex = "#a855f7"; // cool purple (-45°C)
          else thermalHex = "#06b6d4"; // cryo cold cyan (-120°C)

          child.material = new THREE.MeshStandardMaterial({
            color: thermalHex,
            emissive: thermalHex,
            emissiveIntensity: 0.6,
            roughness: 0.35,
            metalness: 0.2,
          });
        } else if (mode === "xray") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: "#22d3ee",
            transparent: true,
            opacity: 0.36,
            roughness: 0.12,
            transmission: 0.88,
            ior: 1.25,
            depthWrite: false,
            emissive: "#0891b2",
            emissiveIntensity: 0.3,
          });
        }
      }
    });
  }, [mode, groupRef]);
}

