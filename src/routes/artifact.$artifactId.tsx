import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { lazy, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Radio,
  Clock,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  Play,
  RotateCw,
  ExternalLink,
  Bot,
  Info,
} from "lucide-react";

import { ClientScene } from "@/components/site/ClientScene";
import { StatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import { ARTIFACTS, getArtifact, KIND_LABEL } from "@/data/artifacts";
import { SPIRIT_PARTS, SPIRIT_TIMELINE, type SpiritPartId } from "@/data/spirit";
import { formatDate, formatCoords } from "@/lib/geo";
import { useAstro } from "@/components/astro/AstroContext";
import { cn } from "@/lib/utils";

const MuseumHardwareModel = lazy(() => import("@/components/three/MuseumHardwareModel"));

export const Route = createFileRoute("/artifact/$artifactId")({
  loader: ({ params }) => {
    const artifact = getArtifact(params.artifactId);
    if (!artifact) throw notFound();
    return { artifact };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.artifact?.name ?? "Hardware";
    return {
      meta: [
        { title: `${name} — 3D Mission Hardware Museum` },
        {
          name: "description",
          content: `Inspect 3D technical model, components, timeline, and final signal of ${name}.`,
        },
        { property: "og:title", content: `${name} — Abandoned but Not Forgotten` },
        { property: "og:description", content: loaderData?.artifact?.summary ?? "Museum Artifact" },
      ],
    };
  },
  component: ArtifactDetailPage,
});

function ArtifactDetailPage() {
  const { artifact } = Route.useLoaderData();
  const navigate = useNavigate();
  const { updateContext, openWithPrompt } = useAstro();

  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"inspect" | "lastSignal" | "timeline">("inspect");
  const [ready, setReady] = useState(false);

  const isSpirit = artifact.id === "spirit";
  const spiritPart = isSpirit && selectedPart ? SPIRIT_PARTS.find((p) => p.id === selectedPart) : null;

  // Sync ASTRO context when artifact or component changes
  useEffect(() => {
    updateContext({
      selectedArtifact: artifact.name,
      selectedMission: artifact.mission,
      selectedPlanet: artifact.bodyId ?? "Deep Space",
      selectedComponent: spiritPart?.name ?? selectedPart ?? null,
      coordinates: artifact.coords ? { lat: artifact.coords.lat, lon: artifact.coords.lon } : null,
    });
  }, [artifact, selectedPart, spiritPart]);

  const handleSelectPart = (part: string | null) => {
    setSelectedPart(part);
    if (part) setActiveTab("inspect");
  };

  return (
    <main className="relative min-h-[100svh] bg-background pt-14 pb-20">
      {/* 3D Hardware Viewport */}
      <section className="relative h-[62svh] sm:h-[68svh] w-full overflow-hidden border-b border-border bg-space starfield">
        <div className="absolute inset-0" data-scene-ready={ready ? "true" : undefined}>
          <ClientScene label={`Loading 3D model of ${artifact.name}…`}>
            <MuseumHardwareModel
              artifact={artifact}
              selectedPart={selectedPart}
              onSelectPart={handleSelectPart}
              onReady={() => setReady(true)}
            />
          </ClientScene>
        </div>

        {/* Top Overlay Badge & Title */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-10 px-4 sm:px-8 flex justify-between items-start">
          <div className="pointer-events-auto max-w-lg">
            <div className="flex items-center gap-2">
              <span className="eyebrow">{KIND_LABEL[artifact.kind]}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono text-xs text-muted-foreground">{artifact.mission}</span>
            </div>
            <h1 className="mt-1 font-display text-3xl font-semibold sm:text-4xl text-foreground">
              {artifact.name}
            </h1>
            <div className="mt-2.5 flex items-center gap-2">
              <StatusBadge status={artifact.status} label={artifact.statusLabel} />
              {artifact.hasStory && (
                <Link
                  to="/story/$artifactId"
                  params={{ artifactId: artifact.id }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-mars-gradient px-3 py-0.5 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                >
                  <Play className="size-3 fill-current" /> Hear Story
                </Link>
              )}
            </div>
          </div>

          <div className="pointer-events-auto hidden md:flex items-center gap-2 rounded-2xl border border-border bg-panel/80 p-2 backdrop-blur">
            <span className="font-mono text-xs text-muted-foreground px-2">Drag to rotate · Scroll to zoom</span>
          </div>
        </div>

        {/* Component Selector Quick Bar (For Spirit) */}
        {isSpirit && (
          <div className="pointer-events-auto absolute bottom-4 inset-x-4 z-10 flex justify-center">
            <div className="flex max-w-full overflow-x-auto gap-1.5 rounded-2xl border border-border bg-panel/90 p-1.5 backdrop-blur shadow-panel">
              <button
                type="button"
                onClick={() => handleSelectPart(null)}
                className={cn(
                  "whitespace-nowrap rounded-xl px-3 py-1 font-mono text-xs transition-colors",
                  selectedPart === null
                    ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                Overview
              </button>
              {SPIRIT_PARTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPart(p.id)}
                  className={cn(
                    "whitespace-nowrap rounded-xl px-3 py-1 font-mono text-xs transition-colors",
                    selectedPart === p.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {p.short}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Main Content Area: Tabs & Details */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border/80 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("inspect")}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2",
              activeTab === "inspect"
                ? "border-primary text-primary-glow"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Layers className="size-4" /> Component Inspection
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("lastSignal")}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2",
              activeTab === "lastSignal"
                ? "border-primary text-primary-glow"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Radio className="size-4" /> The Last Signal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2",
              activeTab === "timeline"
                ? "border-primary text-primary-glow"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Clock className="size-4" /> Mission Timeline
          </button>
        </div>

        {/* Tab 1: Component Inspection */}
        {activeTab === "inspect" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              {spiritPart ? (
                <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
                  <span className="eyebrow">Active Component</span>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-primary-glow">
                    {spiritPart.name}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">Category: {spiritPart.short}</p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-teal">
                        Primary Purpose
                      </h3>
                      <p className="mt-1 text-base text-foreground/90 leading-relaxed">
                        {spiritPart.purpose}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-teal">
                        Technical Engineering & Mission Record
                      </h3>
                      <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                        {spiritPart.detail}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={() =>
                        openWithPrompt(`Tell me more about Spirit's ${spiritPart.name}. How was it designed and what did it discover?`)
                      }
                      className="gap-2"
                    >
                      <Bot className="size-4" /> Ask ASTRO about this part
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => setSelectedPart(null)}
                    >
                      Reset selection
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
                  <span className="eyebrow">Mission Overview</span>
                  <h2 className="mt-1 font-display text-2xl font-semibold">{artifact.name}</h2>
                  <p className="mt-3 text-base text-foreground/90 leading-relaxed">
                    {artifact.summary}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Tap any highlighted component in the 3D model above or select from the list below to inspect individual engineering systems.
                  </p>

                  {isSpirit && (
                    <div className="mt-6 grid sm:grid-cols-2 gap-3">
                      {SPIRIT_PARTS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectPart(p.id)}
                          className="flex items-start gap-3 rounded-2xl border border-border/80 bg-background/40 p-3.5 text-left transition-colors hover:border-primary/50 hover:bg-muted"
                        >
                          <div className="grid size-7 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-glow font-mono text-xs">
                            {p.short[0]}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-foreground">{p.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{p.purpose}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {artifact.hasStory && (
                    <div className="mt-8 rounded-2xl bg-mars-gradient p-6 text-primary-foreground">
                      <h3 className="font-display text-xl font-semibold">
                        Experience Spirit's Entire Lifecycle
                      </h3>
                      <p className="mt-2 text-sm opacity-90 max-w-xl">
                        Watch an 11-stage animated story narrated in the rover's own voice — from launch at Cape Canaveral to its final days at Troy.
                      </p>
                      <Button asChild variant="secondary" className="mt-5 bg-background text-foreground hover:bg-background/90">
                        <Link to="/story/$artifactId" params={{ artifactId: artifact.id }}>
                          Launch First-Person Story <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Specifications */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-panel p-6 shadow-panel">
                <h3 className="font-display text-base font-semibold">Technical Specifications</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">Mission</dt>
                    <dd className="font-medium text-foreground">{artifact.mission}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium text-foreground">{KIND_LABEL[artifact.kind]}</dd>
                  </div>
                  {artifact.launchDate && (
                    <div className="flex justify-between border-b border-border/60 pb-2">
                      <dt className="text-muted-foreground">Launch Date</dt>
                      <dd className="font-mono text-xs text-foreground">{formatDate(artifact.launchDate)}</dd>
                    </div>
                  )}
                  {artifact.arrivalDate && (
                    <div className="flex justify-between border-b border-border/60 pb-2">
                      <dt className="text-muted-foreground">{artifact.arrivalLabel ?? "Arrival Date"}</dt>
                      <dd className="font-mono text-xs text-foreground">{formatDate(artifact.arrivalDate)}</dd>
                    </div>
                  )}
                  {artifact.site && (
                    <div className="flex justify-between border-b border-border/60 pb-2">
                      <dt className="text-muted-foreground">Landing Site</dt>
                      <dd className="font-medium text-foreground text-right">{artifact.site}</dd>
                    </div>
                  )}
                  {artifact.coords && (
                    <div className="flex justify-between border-b border-border/60 pb-2">
                      <dt className="text-muted-foreground">Coordinates</dt>
                      <dd className="font-mono text-xs text-foreground">
                        {formatCoords(artifact.coords.lat, artifact.coords.lon)}
                        {artifact.coords.precision === "approximate" && " (approx)"}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Verified Sources */}
              <div className="rounded-3xl border border-border bg-panel p-6 shadow-panel">
                <h3 className="font-display text-sm font-semibold flex items-center gap-2">
                  <ExternalLink className="size-4 text-teal" /> NASA Official Archives
                </h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {artifact.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between text-muted-foreground hover:text-primary-glow"
                      >
                        <span className="truncate">{s.label}</span>
                        <ExternalLink className="size-3 shrink-0 ml-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: The Last Signal */}
        {activeTab === "lastSignal" && (
          <div className="mt-8 rounded-3xl border border-border bg-panel p-6 sm:p-10 shadow-panel">
            <div className="max-w-3xl">
              <span className="eyebrow">Mission Conclusion</span>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl text-foreground">
                The Last Signal
              </h2>
              <p className="mt-4 text-base text-foreground/90 leading-relaxed">
                Every space explorer reaches its horizon. Here are the historical facts surrounding the conclusion of {artifact.name}'s mission.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {artifact.lastSignal && (
                  <div className="rounded-2xl border border-border/80 bg-background/50 p-5">
                    <dt className="font-mono text-xs uppercase tracking-wider text-teal">
                      {artifact.lastSignalLabel ?? "Last Documented Transmission"}
                    </dt>
                    <dd className="mt-2 font-display text-xl font-semibold text-foreground">
                      {formatDate(artifact.lastSignal)}
                    </dd>
                  </div>
                )}
                {artifact.finalLocation && (
                  <div className="rounded-2xl border border-border/80 bg-background/50 p-5">
                    <dt className="font-mono text-xs uppercase tracking-wider text-teal">
                      Final Resting Location
                    </dt>
                    <dd className="mt-2 text-sm text-foreground/90">
                      {artifact.finalLocation}
                    </dd>
                  </div>
                )}
              </div>

              {artifact.finalCondition && (
                <div className="mt-6 rounded-2xl border border-border/80 bg-background/50 p-5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-gold">
                    Final Known Operating Condition
                  </h3>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                    {artifact.finalCondition}
                  </p>
                </div>
              )}

              {artifact.endReason && (
                <div className="mt-4 rounded-2xl border border-border/80 bg-background/50 p-5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-primary-glow">
                    Actual Cause of Mission Conclusion
                  </h3>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                    {artifact.endReason}
                  </p>
                </div>
              )}

              {artifact.remains && (
                <div className="mt-4 rounded-2xl border border-border/80 bg-background/50 p-5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Physical Remains on the Surface
                  </h3>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                    {artifact.remains}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <Button
                  variant="hero"
                  onClick={() =>
                    openWithPrompt(`Why did ${artifact.name}'s mission end? Tell me what happened on ${artifact.lastSignal ? formatDate(artifact.lastSignal) : "its final sol"}.`)
                  }
                >
                  <Bot className="size-4" /> Ask ASTRO about this conclusion
                </Button>
                {artifact.hasStory && (
                  <Button asChild variant="glass">
                    <Link to="/story/$artifactId" params={{ artifactId: artifact.id }} search={{ stage: 9 }}>
                      View Animated Stage: "My Final Days" <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mission Timeline */}
        {activeTab === "timeline" && (
          <div className="mt-8 rounded-3xl border border-border bg-panel p-6 sm:p-10 shadow-panel">
            <span className="eyebrow">Milestones</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground">
              Mission Lifecycle Timeline
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow key milestones from launch to the final signal. Click any milestone to jump directly to its animated stage or ask ASTRO.
            </p>

            <div className="mt-8 space-y-6">
              {isSpirit ? (
                SPIRIT_TIMELINE.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-background/40 p-4 transition-colors hover:border-primary/50 hover:bg-muted"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-mars-gradient text-primary-foreground font-mono text-xs font-semibold shadow-glow">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-teal/20 px-2 py-0.5 font-mono text-[10px] text-teal uppercase">
                            {item.phase}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {formatDate(item.date)}
                          </span>
                        </div>
                        <h3 className="mt-1 font-display text-base font-medium text-foreground">
                          {item.label}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="glass" size="sm">
                        <Link
                          to="/story/$artifactId"
                          params={{ artifactId: artifact.id }}
                          search={{ stage: item.stageIndex }}
                        >
                          Watch Stage <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          openWithPrompt(`Tell me about the ${item.label} milestone on ${formatDate(item.date)}.`)
                        }
                      >
                        <Bot className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-4">
                  {artifact.launchDate && (
                    <div className="rounded-2xl border border-border bg-background/50 p-4 flex justify-between items-center">
                      <div>
                        <span className="eyebrow">Launch</span>
                        <h3 className="font-display text-base mt-1">Liftoff from Earth</h3>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{formatDate(artifact.launchDate)}</span>
                    </div>
                  )}
                  {artifact.arrivalDate && (
                    <div className="rounded-2xl border border-border bg-background/50 p-4 flex justify-between items-center">
                      <div>
                        <span className="eyebrow">{artifact.arrivalLabel ?? "Arrival"}</span>
                        <h3 className="font-display text-base mt-1">Arrival at Destination</h3>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{formatDate(artifact.arrivalDate)}</span>
                    </div>
                  )}
                  {artifact.lastSignal && (
                    <div className="rounded-2xl border border-border bg-background/50 p-4 flex justify-between items-center">
                      <div>
                        <span className="eyebrow">Conclusion</span>
                        <h3 className="font-display text-base mt-1">Final Transmission</h3>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{formatDate(artifact.lastSignal)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Explore More Historical Hardware Switcher */}
        <div className="mt-16 border-t border-border pt-10">
          <p className="eyebrow">Museum Collection</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Other Historical Spacecraft</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {ARTIFACTS.filter((a) => a.id !== artifact.id).map((other) => (
              <Link
                key={other.id}
                to="/artifact/$artifactId"
                params={{ artifactId: other.id }}
                className="group rounded-2xl border border-border bg-panel p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-teal">
                  {other.bodyId ?? "Deep Space"}
                </span>
                <h3 className="mt-1 font-medium text-sm text-foreground group-hover:text-primary-glow">
                  {other.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground truncate">{other.mission}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
