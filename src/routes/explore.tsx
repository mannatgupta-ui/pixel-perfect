import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Info, Telescope, X } from "lucide-react";
import { lazy, useState } from "react";

import { ArtifactList } from "@/components/explore/ArtifactList";
import { ClientScene } from "@/components/site/ClientScene";
import { Button } from "@/components/ui/button";
import { artifactsForBody } from "@/data/artifacts";
import { BODIES, BODY_BY_ID, isBodyId, SCALE_NOTE } from "@/data/bodies";
import type { BodyId } from "@/data/types";
import { cn } from "@/lib/utils";

const SolarSystemScene = lazy(() => import("@/components/three/SolarSystemScene"));

type Focus = BodyId | "deep-space";
interface ExploreSearch {
  body?: Focus;
}

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): ExploreSearch => {
    const b = typeof s["body"] === "string" ? s["body"] : "";
    return isBodyId(b) || b === "deep-space" ? { body: b } : {};
  },
  head: () => ({
    meta: [
      { title: "3D Solar System — Abandoned but Not Forgotten" },
      { name: "description", content: "Rotate the Solar System, pick a planet and discover the NASA hardware left behind there." },
      { property: "og:title", content: "Explore the 3D Solar System" },
      { property: "og:description", content: "Pick a world and discover the rovers, landers and probes humanity left behind." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const { body } = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });
  const [ready, setReady] = useState(false);
  const focus: Focus | null = body ?? null;
  const select = (id: Focus | null) => navigate({ search: id ? { body: id } : {}, replace: true });
  const sceneSelected = focus && focus !== "deep-space" ? focus : null;

  return (
    <main className="relative h-[100svh] overflow-hidden bg-background pt-14">
      <div className="absolute inset-0 top-14" data-scene-ready={ready ? "true" : undefined}>
        <ClientScene label="Assembling the Solar System…">
          <SolarSystemScene selected={sceneSelected} onSelect={(id) => select(id)} onReady={() => setReady(true)} />
        </ClientScene>
      </div>

      {/* Intro + quick picks */}
      <div className="pointer-events-none absolute inset-x-0 top-14 z-10 p-4 sm:p-6">
        <div className="pointer-events-auto max-w-md">
          <p className="eyebrow">Interactive map</p>
          <h1 className="mt-2 text-2xl font-medium sm:text-3xl">Where did we leave them?</h1>
          <p className="mt-2 text-sm text-muted-foreground">Drag to rotate · scroll or pinch to zoom · tap a world.</p>
        </div>
        <div className="pointer-events-auto mt-4 flex max-w-2xl flex-wrap gap-1.5">
          {BODIES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => select(b.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                focus === b.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background/50 text-muted-foreground backdrop-blur hover:text-foreground",
              )}
            >
              {b.name.replace("The ", "")}
            </button>
          ))}
          <button
            type="button"
            onClick={() => select("deep-space")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
              focus === "deep-space"
                ? "border-teal bg-teal text-primary-foreground"
                : "border-teal/40 bg-background/50 text-teal backdrop-blur hover:border-teal",
            )}
          >
            <Telescope className="size-3.5" /> Deep space
          </button>
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-3 left-4 z-10 flex max-w-sm items-start gap-1.5 text-[11px] text-muted-foreground sm:left-6">
        <Info className="mt-px size-3.5 shrink-0" /> {SCALE_NOTE}
      </p>

      <AnimatePresence>{focus && <FocusPanel key={focus} focus={focus} onClose={() => select(null)} />}</AnimatePresence>
    </main>
  );
}

function FocusPanel({ focus, onClose }: { focus: Focus; onClose: () => void }) {
  const isDeep = focus === "deep-space";
  const body = isDeep ? null : BODY_BY_ID[focus];
  const items = artifactsForBody(isDeep ? null : focus);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-3 bottom-3 z-20 max-h-[55svh] overflow-y-auto rounded-3xl border border-border bg-panel p-5 shadow-panel sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-20 sm:max-h-none sm:w-[400px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{isDeep ? "Beyond the planets" : body?.parent ? "Moon of Earth" : focus === "sun" ? "Star" : "Planet"}</p>
          <h2 className="mt-1 text-2xl font-medium">{isDeep ? "Deep Space" : body?.name}</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>
      <p className="mt-2 text-sm text-foreground/80">
        {isDeep
          ? "Probes that never landed anywhere. They are still travelling outward — some still calling home, some silent for decades."
          : body?.tagline}
      </p>

      {body && (
        <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <Fact k="Diameter" v={`${body.diameterKm.toLocaleString("en-US")} km`} />
          <Fact k="Distance" v={body.distance} />
          <Fact k="Day" v={body.dayLength} />
        </dl>
      )}

      {body?.explorable && (
        <Button asChild variant="hero" className="mt-5 w-full">
          <Link to="/planet/$planetId" params={{ planetId: body.id }}>
            Land on {body.name.replace("The ", "the ")} <ArrowRight />
          </Link>
        </Button>
      )}

      <div className="mt-6 flex items-baseline justify-between">
        <h3 className="font-display text-sm font-medium">Hardware left behind</h3>
        <span className="font-mono text-xs text-muted-foreground">{items.length} {items.length === 1 ? "mission" : "missions"}</span>
      </div>
      <div className="mt-3">
        {items.length > 0 ? (
          <ArtifactList items={items} />
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">{body?.noHardwareNote}</p>
        )}
      </div>
    </motion.aside>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-background/50 p-2.5">
      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{k}</dt>
      <dd className="mt-1 leading-snug">{v}</dd>
    </div>
  );
}
