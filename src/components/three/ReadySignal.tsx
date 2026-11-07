import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/** Calls onReady once, after the first frame with loaded assets has drawn. */
export function ReadySignal({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(onReady);
  });
  return null;
}
