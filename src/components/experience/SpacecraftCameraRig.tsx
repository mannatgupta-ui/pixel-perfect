import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import type { CameraMode } from "./types";

interface SpacecraftCameraRigProps {
  cameraMode: CameraMode;
  targetPosition: [number, number, number];
  targetLookAt: [number, number, number];
}

export function SpacecraftCameraRig({
  cameraMode,
  targetPosition,
  targetLookAt,
}: SpacecraftCameraRigProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const desiredPos = useRef(new THREE.Vector3(...targetPosition));
  const desiredLook = useRef(new THREE.Vector3(...targetLookAt));

  useEffect(() => {
    desiredPos.current.set(...targetPosition);
    desiredLook.current.set(...targetLookAt);

    if (controlsRef.current) {
      controlsRef.current.target.set(...targetLookAt);
    }
  }, [targetPosition, targetLookAt]);

  useFrame((_, delta) => {
    if (cameraMode === "free") return;

    // Smooth lerp to desired position
    const lerpSpeed = cameraMode === "first_person" ? 5.0 * delta : 3.0 * delta;
    camera.position.lerp(desiredPos.current, Math.min(lerpSpeed, 0.1));

    // Smooth lookAt
    if (cameraMode === "first_person") {
      camera.lookAt(desiredLook.current);
    } else if (controlsRef.current) {
      controlsRef.current.target.lerp(desiredLook.current, Math.min(lerpSpeed, 0.1));
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={cameraMode === "free"}
      enablePan={cameraMode === "free"}
      enableZoom={cameraMode !== "first_person"}
      minDistance={1.2}
      maxDistance={25}
      makeDefault
    />
  );
}

