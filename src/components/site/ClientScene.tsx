import { ClientOnly } from "@tanstack/react-router";
import { Suspense, type ReactNode } from "react";

export function SceneLoading({ label = "Warming up the telescope…" }: { label?: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-background starfield">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-14">
          <span className="absolute inset-0 rounded-full border-2 border-primary/30" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
        </div>
        <p className="eyebrow">{label}</p>
      </div>
    </div>
  );
}

/** Renders 3D (browser-only) content after hydration, with a loading fallback. */
export function ClientScene({ children, label }: { children: ReactNode; label?: string }) {
  const fallback = <SceneLoading {...(label ? { label } : {})} />;
  return (
    <ClientOnly fallback={fallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ClientOnly>
  );
}
