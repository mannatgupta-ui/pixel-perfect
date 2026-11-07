import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Info, X } from "lucide-react";
import { lazy, useMemo, useState } from "react";

import { ClientScene } from "@/components/site/ClientScene";
import { StatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import { artifactsForBody, getArtifact, KIND_LABEL } from "@/data/artifacts";
import { BODY_BY_ID } from "@/data/bodies";
import type { GlobeSite } from "@/components/three/PlanetGlobe";
import { formatCoords, formatDate } from "@/lib/geo";
import { TEXTURE_CREDIT } from "@/lib/textures";
import { cn } from "@/lib/utils";

const PlanetGlobe = lazy(() => import("@/components/three/PlanetGlobe"));

export const Route = createFileRoute("/planet/$planetId")({
  validateSearch: (s: Record<string, unknown>): { site?: string } =>
    typeof s["site"] === "string" ? { site: s["site"] } : {},
  loader: ({ params }) => {
    if (params.planetId !== "mars" && params.planetId !== "moon") throw notFound();
    return { planetId: params.planetId as "mars" | "moon" };
  },
  head: ({ params }) => {
    const name = params.planetId === "moon" ? "the Moon" : "Mars";
    return {
      meta: [
        { title: `Explore ${name} in 3D — Abandoned but Not Forgotten` },
        { name: "description", content: `Turn a 3D globe of ${name} and visit documented landing sites of NASA hardware.` },
        { property: "og:title", content: `Explore ${name} in 3D` },
        { property: "og:description", content: `Documented landing sites of the machines left on ${name}.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PlanetPage,
});

function PlanetPage() {
  const { planetId } = Route.useLoaderData();
  const { site } = Route.useSearch();
  const navigate = useNavigate({ from: "/planet/$planetId" });
  const [ready, setReady] = useState(false);
  const body = BODY_BY_ID[planetId];
  const items = artifactsForBody(planetId);

  const sites = useMemo<GlobeSite[]>(() => {
    const map = new Map<string, GlobeSite>();
    for (const a of items) {
      if (!a.coords) continue;
      const key = `${a.coords.lat.toFixed(3)},${a.coords.lon.toFixed(3)}`;
      const existing = map.get(key);
      if (existing) {
        existing.artifactIds.push(a.id);
        if (a.coords.precision === "documented") existing.label = a.name;
        if (a.status === "active") existing.tone = "active";
      } else {
        map.set(key, {
          key,
          lat: a.coords.lat,
          lon: a.coords.lon,
          label: a.name,
          tone: a.status === "active" ? "active" : "silent",
          approximate: a.coords.precision === "approximate",
          artifactIds: [a.id],
        });
      }
    }
    for (const s of map.values()) {
      s.approximate = s.artifactIds.every((id) => getArtifact(id)?.coords?.precision === "approximate");
    }
    return [...map.values()];
  }, [items]);

  const selectedSite = sites.find((s) => site && s.artifactIds.includes(site)) ?? null;
  const selected = site ? getArtifact(site) : undefined;
  const select = (id: string | null) => navigate({ search: id ? { site: id } : {}, replace: true });

  return (
    <main className="relative h-[100svh] overflow-hidden bg-background pt-14">
      <div className="absolute inset-0 top-14" data-scene-ready={ready ? "true" : undefined}>
        <ClientScene label={`Mapping ${body.name}…`}>
          <PlanetGlobe
            bodyId={planetId}
            sites={sites}
            selectedKey={selectedSite?.key ?? null}
            onSelect={(key) => select(key ? (sites.find((s) => s.key === key)?.artifactIds[0] ?? null) : null)}
            onReady={() => setReady(true)}
          />
        </ClientScene>
      </div>

      <aside className="absolute left-3 top-[4.5rem] z-10 hidden max-h-[calc(100svh-6rem)] w-72 overflow-y-auto rounded-3xl border border-border bg-panel p-4 shadow-panel md:block">
        <p className="eyebrow">Surface map</p>
        <h1 className="mt-1 text-2xl font-medium">{body.name}</h1>
        <p className="mt-1 text-xs text-muted-foreground">Tap a marker or a site below to fly there.</p>
        <ul className="mt-4 space-y-1">
          {items.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => select(a.id)}
                className={cn(
                  "w-full rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                  site === a.id && "bg-muted text-primary-glow",
                )}
              >
                {a.name}
                {a.coords?.precision === "approximate" && <span className="ml-1.5 font-mono text-[10px] text-gold">≈</span>}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {selected && (
        <aside className="absolute inset-x-3 bottom-3 z-20 max-h-[55svh] overflow-y-auto rounded-3xl border border-border bg-panel p-5 shadow-panel sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-20 sm:max-h-none sm:w-[380px]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">{KIND_LABEL[selected.kind]} · {selected.mission}</p>
              <h2 className="mt-1 text-xl font-medium">{selected.name}</h2>
            </div>
            <button type="button" onClick={() => select(null)} aria-label="Close" className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
              <X className="size-4" />
            </button>
          </div>
          <StatusBadge status={selected.status} label={selected.statusLabel} className="mt-3" />
          <p className="mt-3 text-sm text-foreground/80">{selected.summary}</p>
          <dl className="mt-4 space-y-2 text-sm">
            {selected.site && <Row k="Site" v={selected.site} />}
            {selected.arrivalDate && <Row k={selected.arrivalLabel ?? "Arrived"} v={formatDate(selected.arrivalDate)} />}
            {selected.coords && (
              <Row
                k={selected.coords.precision === "approximate" ? "Location (approximate)" : "Coordinates"}
                v={formatCoords(selected.coords.lat, selected.coords.lon)}
              />
            )}
            {selected.lastSignal && <Row k={selected.lastSignalLabel ?? "Last signal"} v={formatDate(selected.lastSignal)} />}
          </dl>
          {selected.coords?.note && (
            <p className="mt-3 flex gap-1.5 rounded-xl bg-gold/10 p-3 text-xs text-gold">
              <Info className="mt-px size-3.5 shrink-0" /> {selected.coords.note}
            </p>
          )}
          {selectedSite && selectedSite.artifactIds.length > 1 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Also at this site:{" "}
              {selectedSite.artifactIds.filter((id) => id !== selected.id).map((id) => getArtifact(id)?.name).join(", ")}
            </p>
          )}
          <Button asChild variant="hero" className="mt-5 w-full">
            <Link to="/artifact/$artifactId" params={{ artifactId: selected.id }}>
              {selected.hasStory ? "Inspect & hear its story" : "Full mission record"} <ArrowRight />
            </Link>
          </Button>
        </aside>
      )}

      <p className="pointer-events-none absolute bottom-3 left-4 z-10 max-w-sm text-[11px] text-muted-foreground">
        {TEXTURE_CREDIT.label}. Surface colour map only — elevation relief not yet included. Markers use NASA-published landing coordinates.
      </p>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-mono text-xs leading-5">{v}</dd>
    </div>
  );
}
