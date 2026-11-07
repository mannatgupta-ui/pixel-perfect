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
  Camera,
  Users,
  Cpu,
  Maximize2,
  X,
  Award,
  ShieldCheck,
  Check,
  Download,
  Quote,
  Flame,
  Search,
} from "lucide-react";

import { ClientScene } from "@/components/site/ClientScene";
import { StatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import { ARTIFACTS, getArtifact, KIND_LABEL } from "@/data/artifacts";
import { SPIRIT_PARTS, SPIRIT_TIMELINE, type SpiritPartId } from "@/data/spirit";
import { formatDate, formatCoords } from "@/lib/geo";
import { useAstro } from "@/components/astro/AstroContext";
import { cn } from "@/lib/utils";
import { MissionStoryPlayer } from "@/components/story/MissionStoryPlayer";
import { getMissionDossier } from "@/data/missionDossiers";
import type { ArchivalPhoto } from "@/data/types";

const MuseumHardwareModel = lazy(() => import("@/components/three/MuseumHardwareModel"));

type ArtifactTab = "inspect" | "story" | "photos" | "scientists" | "instruments" | "lastSignal" | "timeline";

interface ArtifactSearch {
  view?: ArtifactTab;
  stage?: number;
}

export const Route = createFileRoute("/artifact/$artifactId")({
  validateSearch: (s: Record<string, unknown>): ArtifactSearch => {
    const v = s["view"] as ArtifactTab | undefined;
    const st = Number(s["stage"]);
    return {
      ...(v ? { view: v } : {}),
      ...(!isNaN(st) && st >= 0 ? { stage: st } : {}),
    };
  },
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
  const { view, stage } = Route.useSearch();
  const navigate = useNavigate({ from: "/artifact/$artifactId" });
  const { updateContext, openWithPrompt } = useAstro();

  const dossier = getMissionDossier(artifact.id);
  const [selectedPhoto, setSelectedPhoto] = useState<ArchivalPhoto | null>(null);
  const [photoFilter, setPhotoFilter] = useState<string>("all");

  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ArtifactTab>(
    view ?? (artifact.hasStory ? "inspect" : "inspect"),
  );
  const [heroMode, setHeroMode] = useState<"3d" | "story">(view === "story" ? "story" : "3d");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (view) {
      setActiveTab(view);
      if (view === "story") {
        setHeroMode("story");
      }
    }
  }, [view]);

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
      {/* 3D Hardware / Interactive Story Viewport */}
      <section className="relative min-h-[64svh] sm:min-h-[70svh] w-full overflow-hidden border-b border-border bg-space starfield">
        {heroMode === "story" && artifact.hasStory ? (
          <div className="w-full">
            <MissionStoryPlayer artifactId={artifact.id} initialStage={stage ?? 0} compact />
          </div>
        ) : (
          <>
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

            {/* Top Overlay Badge, Title & Mode Switcher */}
            <div className="pointer-events-none absolute inset-x-0 top-4 z-10 px-4 sm:px-8 flex flex-wrap justify-between items-start gap-4">
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
                    <button
                      type="button"
                      onClick={() => {
                        setHeroMode("story");
                        setActiveTab("story");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-mars-gradient px-3 py-0.5 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                    >
                      <Play className="size-3 fill-current" /> Watch Story Inside
                    </button>
                  )}
                </div>
              </div>

              {/* View Mode Toggle Pill (3D Model vs Animated Story) */}
              <div className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-border bg-panel/85 p-1 backdrop-blur shadow-panel">
                <button
                  type="button"
                  onClick={() => {
                    setHeroMode("3d");
                    setActiveTab("inspect");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors",
                    heroMode === "3d"
                      ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Layers className="size-3.5" /> 3D Model
                </button>
                {artifact.hasStory && (
                  <button
                    type="button"
                    onClick={() => {
                      setHeroMode("story");
                      setActiveTab("story");
                    }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors",
                      heroMode === "story"
                        ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Sparkles className="size-3.5 text-gold" /> Animated Story
                  </button>
                )}
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
          </>
        )}
      </section>

      {/* Main Content Area: Tabs & Details */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border/80 gap-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab("inspect");
              setHeroMode("3d");
            }}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 whitespace-nowrap",
              activeTab === "inspect"
                ? "border-primary text-primary-glow font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Layers className="size-4" /> Component Inspection
          </button>

          {artifact.hasStory && (
            <button
              type="button"
              onClick={() => {
                setActiveTab("story");
                setHeroMode("story");
              }}
              className={cn(
                "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 whitespace-nowrap",
                activeTab === "story"
                  ? "border-primary text-primary-glow font-bold shadow-glow"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Sparkles className="size-4 text-gold" /> Animated Mission Story
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setActiveTab("photos");
              setHeroMode("3d");
            }}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 whitespace-nowrap",
              activeTab === "photos"
                ? "border-primary text-primary-glow font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Camera className="size-4 text-teal" /> Actual Photos
            {dossier?.photos && dossier.photos.length > 0 && (
              <span className="rounded-full bg-teal/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-teal">
                {dossier.photos.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("scientists");
              setHeroMode("3d");
            }}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 whitespace-nowrap",
              activeTab === "scientists"
                ? "border-primary text-primary-glow font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Users className="size-4 text-primary" /> Scientists & "Parents"
            {dossier?.scientists && dossier.scientists.length > 0 && (
              <span className="rounded-full bg-primary/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
                {dossier.scientists.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("instruments");
              setHeroMode("3d");
            }}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 whitespace-nowrap",
              activeTab === "instruments"
                ? "border-primary text-primary-glow font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Cpu className="size-4 text-gold" /> Instruments & Specs
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("lastSignal");
              setHeroMode("3d");
            }}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 whitespace-nowrap",
              activeTab === "lastSignal"
                ? "border-primary text-primary-glow"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Radio className="size-4" /> The Last Signal
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("timeline");
              setHeroMode("3d");
            }}
            className={cn(
              "pb-3.5 font-display text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 whitespace-nowrap",
              activeTab === "timeline"
                ? "border-primary text-primary-glow"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Clock className="size-4" /> Mission Timeline
          </button>
        </div>

        {/* Tab: Animated Mission Story */}
        {activeTab === "story" && artifact.hasStory && (
          <div className="mt-8">
            <MissionStoryPlayer artifactId={artifact.id} initialStage={stage ?? 0} />
          </div>
        )}

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

        {/* Tab: Actual Archival Photography Captured by Hardware */}
        {activeTab === "photos" && (
          <div className="mt-8 space-y-8">
            <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="eyebrow">Planetary Imagery Archives</span>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                    Actual Photos Captured by {artifact.name}
                  </h2>
                  <p className="mt-2 text-sm text-foreground/80 max-w-2xl leading-relaxed">
                    Direct photographic telemetry returned across interplanetary space. These are the authentic raw and calibrated images captured by onboard cameras on the alien surfaces of Mars, the Moon, and the outer Solar System.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() =>
                      openWithPrompt(
                        `Tell me about the cameras and actual photos captured by ${artifact.name}. What did they look like and what did they discover?`
                      )
                    }
                    className="gap-2"
                  >
                    <Bot className="size-4" /> Ask ASTRO about these photos
                  </Button>
                </div>
              </div>

              {/* Photo Filter Chips */}
              {dossier?.photos && dossier.photos.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPhotoFilter("all")}
                    className={cn(
                      "rounded-xl px-3 py-1 font-mono text-xs transition-colors",
                      photoFilter === "all"
                        ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                        : "bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    All Imagery ({dossier.photos.length})
                  </button>
                  {Array.from(new Set(dossier.photos.map((p) => p.instrument).filter(Boolean))).map((inst) => (
                    <button
                      key={inst}
                      type="button"
                      onClick={() => setPhotoFilter(inst!)}
                      className={cn(
                        "rounded-xl px-3 py-1 font-mono text-xs transition-colors",
                        photoFilter === inst
                          ? "bg-primary text-primary-foreground font-semibold shadow-glow"
                          : "bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {inst}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Photos Grid */}
            {dossier?.photos && dossier.photos.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dossier.photos
                  .filter((p) => photoFilter === "all" || p.instrument === photoFilter)
                  .map((photo) => (
                    <motion.div
                      key={photo.id}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-panel shadow-panel transition-all hover:border-primary/60 hover:shadow-glow flex flex-col"
                    >
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-video w-full overflow-hidden bg-space">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Top Overlay Badges */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                          <span className="rounded-lg bg-panel/85 px-2 py-0.5 font-mono text-[10px] text-teal backdrop-blur border border-border/60">
                            {photo.id}
                          </span>
                          {photo.dateOrSol && (
                            <span className="rounded-lg bg-panel/85 px-2 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur border border-border/60">
                              {photo.dateOrSol}
                            </span>
                          )}
                        </div>

                        {/* Click to expand hover hint */}
                        <div className="absolute bottom-2 right-2 rounded-xl bg-panel/80 p-1.5 text-primary-glow opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                          <Maximize2 className="size-4" />
                        </div>
                      </div>

                      {/* Photo Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            {photo.instrument && (
                              <span className="font-mono text-[11px] uppercase tracking-wider text-teal">
                                {photo.instrument}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-1 font-display text-lg font-semibold text-foreground group-hover:text-primary-glow transition-colors">
                            {photo.title}
                          </h3>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {photo.caption}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="truncate">{photo.credit}</span>
                          <span className="text-primary-glow font-medium flex items-center gap-1 shrink-0">
                            Inspect <ChevronRight className="size-3" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-panel p-10 text-center">
                <Camera className="mx-auto size-10 text-muted-foreground/60" />
                <h3 className="mt-3 font-display text-lg font-semibold">No direct surface photos cataloged</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                  {artifact.name} operated primarily via radar, spectroscopy, or deep space telemetry.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab: Scientists & "Mission Parents" */}
        {activeTab === "scientists" && (
          <div className="mt-8 space-y-8">
            <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
              <span className="eyebrow">The Human Minds Behind the Exploration</span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                Scientists & "Mission Parents" of {artifact.name}
              </h2>
              <p className="mt-2 text-base text-foreground/85 max-w-3xl leading-relaxed">
                Spacecraft don't build or guide themselves. Behind every turn of a rover's wheel, every deep-space command burn, and every late-night crisis fix was a dedicated family of planetary scientists, flight directors, and software architects who poured decades of their lives into these missions.
              </p>

              {/* Featured Quote Callout */}
              {dossier?.historicalQuotes && dossier.historicalQuotes[0] && (
                <div className="mt-6 relative overflow-hidden rounded-2xl border border-gold/40 bg-gold/5 p-5 sm:p-6 backdrop-blur">
                  <Quote className="absolute -bottom-4 -right-4 size-24 text-gold/10 pointer-events-none" />
                  <p className="relative font-display text-base sm:text-lg italic text-foreground leading-relaxed">
                    "{dossier.historicalQuotes[0].quote}"
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="font-semibold text-gold">{dossier.historicalQuotes[0].author}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{dossier.historicalQuotes[0].context}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Scientists Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {dossier?.scientists.map((scientist, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-border bg-panel p-6 sm:p-7 shadow-panel flex flex-col justify-between transition-all hover:border-primary/50"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-primary-glow">
                          {scientist.role}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                          {scientist.name}
                        </h3>
                        <p className="mt-0.5 text-xs font-mono text-teal">
                          {scientist.institution}
                        </p>
                      </div>
                      <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-teal/20 border border-primary/30 font-display font-bold text-lg text-primary-glow">
                        {scientist.name
                          .split(" ")
                          .filter((w) => !w.startsWith("Dr.") && !w.startsWith("Prof."))
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>

                    {scientist.quote && (
                      <div className="mt-4 rounded-xl border-l-2 border-primary/60 bg-muted/30 py-2 px-3 text-xs italic text-foreground/90">
                        "{scientist.quote}"
                      </div>
                    )}

                    <div className="mt-4">
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        Mission Contribution
                      </h4>
                      <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                        {scientist.contribution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() =>
                        openWithPrompt(
                          `Tell me about ${scientist.name} and their contribution to ${artifact.name}. What did they do at ${scientist.institution}?`
                        )
                      }
                      className="gap-1.5 text-xs"
                    >
                      <Bot className="size-3.5 text-primary-glow" /> Ask ASTRO about {scientist.name.split(" ").slice(-1)[0]}
                    </Button>
                    <span className="font-mono text-[10px] text-muted-foreground">Verified Record</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Educational Kurzgesagt Philosophy Callout */}
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-panel to-teal/5 p-6 sm:p-8 shadow-panel">
              <div className="flex items-start gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/20 text-primary-glow shadow-glow">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Why Do Engineers Call Themselves "Rover Parents"?
                  </h3>
                  <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                    Robotic space missions take 10 to 20 years to design, build, and fly. During active surface operations on Mars, scientists must live on <strong>"Martian time"</strong> — shifting their work schedules 40 minutes forward every single Earth day to match the 24-hour, 39-minute Martian sol.
                  </p>
                  <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                    When dust storms blacked out the sky or robotic wheels jammed in Martian sand dunes, these engineers worked through hundreds of sleepless nights upload by upload across millions of miles of dark vacuum to save their machines. When Opportunity sent its final signal in 2018, hundreds of JPL engineers gathered in mission control in tears. These machines were not merely aluminum and wires — they were an extension of human courage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Instruments & Flight Specifications */}
        {activeTab === "instruments" && (
          <div className="mt-8 space-y-8">
            <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
              <span className="eyebrow">Flight Engineering & Scientific Payloads</span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                Scientific Instruments & Technical Specifications
              </h2>
              <p className="mt-2 text-base text-foreground/85 max-w-3xl leading-relaxed">
                Detailed telemetry, radiation-hardened flight computing architecture, power subsystems, and the precision analytical science instruments carried onboard {artifact.name}.
              </p>
            </div>

            {/* Flight Engineering Telemetry Matrix */}
            {dossier?.specs && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dossier.specs.massLandedKg && (
                  <div className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
                    <span className="font-mono text-xs uppercase tracking-wider text-teal">Mass (Landed / Dry)</span>
                    <p className="mt-1.5 font-display text-xl font-bold text-foreground">{dossier.specs.massLandedKg}</p>
                    {dossier.specs.massLaunchKg && (
                      <p className="mt-1 text-xs text-muted-foreground">Launch stack: {dossier.specs.massLaunchKg}</p>
                    )}
                  </div>
                )}
                {dossier.specs.powerSystem && (
                  <div className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
                    <span className="font-mono text-xs uppercase tracking-wider text-gold">Power Architecture</span>
                    <p className="mt-1.5 font-display text-lg font-bold text-foreground line-clamp-1">{dossier.specs.powerSystem}</p>
                    {dossier.specs.powerOutput && (
                      <p className="mt-1 text-xs text-muted-foreground">Output: {dossier.specs.powerOutput}</p>
                    )}
                  </div>
                )}
                {dossier.specs.flightComputer && (
                  <div className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
                    <span className="font-mono text-xs uppercase tracking-wider text-primary-glow">Onboard Flight Computer</span>
                    <p className="mt-1.5 font-display text-lg font-bold text-foreground line-clamp-1">{dossier.specs.flightComputer}</p>
                    {dossier.specs.memory && (
                      <p className="mt-1 text-xs text-muted-foreground">Memory: {dossier.specs.memory}</p>
                    )}
                  </div>
                )}
                {dossier.specs.mobilityOrPropulsion && (
                  <div className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
                    <span className="font-mono text-xs uppercase tracking-wider text-teal">Mobility / Propulsion</span>
                    <p className="mt-1.5 font-display text-lg font-bold text-foreground line-clamp-1">{dossier.specs.mobilityOrPropulsion}</p>
                    {dossier.specs.totalDistance && (
                      <p className="mt-1 text-xs text-muted-foreground">Total traversed: {dossier.specs.totalDistance}</p>
                    )}
                  </div>
                )}
                {dossier.specs.communicationLinks && (
                  <div className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">Deep Space Communications</span>
                    <p className="mt-1.5 text-xs text-foreground/90 leading-relaxed">{dossier.specs.communicationLinks}</p>
                  </div>
                )}
                {dossier.specs.actualDuration && (
                  <div className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
                    <span className="font-mono text-xs uppercase tracking-wider text-gold">Mission Duration</span>
                    <p className="mt-1.5 font-display text-lg font-bold text-foreground">{dossier.specs.actualDuration}</p>
                    {dossier.specs.plannedDuration && (
                      <p className="mt-1 text-xs text-muted-foreground">Planned: {dossier.specs.plannedDuration}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Scientific Instruments Breakdown */}
            {dossier?.instruments && dossier.instruments.length > 0 && (
              <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
                <span className="eyebrow">Analytical Science Suite</span>
                <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  Scientific Payload Instruments
                </h3>
                <div className="mt-6 space-y-4">
                  {dossier.instruments.map((inst, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border/80 bg-background/50 p-5 transition-colors hover:border-primary/50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 font-mono text-xs font-bold text-primary-glow border border-primary/20">
                            {inst.acronym}
                          </span>
                          <div>
                            <h4 className="font-display text-base font-semibold text-foreground">{inst.name}</h4>
                            <p className="font-mono text-xs text-teal">{inst.leadInstitution}</p>
                          </div>
                        </div>
                        <Button
                          variant="glass"
                          size="sm"
                          onClick={() =>
                            openWithPrompt(
                              `Explain how the ${inst.name} (${inst.acronym}) instrument works on ${artifact.name}. What did it discover?`
                            )
                          }
                          className="self-start sm:self-auto text-xs gap-1.5"
                        >
                          <Bot className="size-3.5 text-primary-glow" /> Ask ASTRO
                        </Button>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                        <div className="rounded-xl bg-background/60 p-3 border border-border/50">
                          <span className="font-mono uppercase tracking-wider text-muted-foreground">Scientific Purpose</span>
                          <p className="mt-1 text-foreground/90 leading-relaxed">{inst.purpose}</p>
                        </div>
                        <div className="rounded-xl bg-background/60 p-3 border border-border/50">
                          <span className="font-mono uppercase tracking-wider text-muted-foreground">Description & Principles</span>
                          <p className="mt-1 text-foreground/90 leading-relaxed">{inst.description}</p>
                        </div>
                      </div>

                      {inst.keyDiscovery && (
                        <div className="mt-3 rounded-xl bg-teal/10 p-3 border border-teal/20 text-xs">
                          <span className="font-mono uppercase tracking-wider text-teal font-semibold">Key Discovery</span>
                          <p className="mt-1 text-foreground/90 leading-relaxed">{inst.keyDiscovery}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scientific Breakthroughs */}
            {dossier?.breakthroughs && dossier.breakthroughs.length > 0 && (
              <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
                <span className="eyebrow">Discoveries That Changed Textbooks</span>
                <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  Major Scientific Breakthroughs
                </h3>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {dossier.breakthroughs.map((b, idx) => (
                    <div key={idx} className="rounded-2xl border border-border/80 bg-background/50 p-5">
                      <div className="flex items-center gap-2">
                        <Award className="size-4 text-gold" />
                        <h4 className="font-display text-base font-semibold text-foreground">{b.title}</h4>
                      </div>
                      {b.dateOrSol && (
                        <span className="mt-1 inline-block font-mono text-[11px] text-muted-foreground">
                          {b.dateOrSol}
                        </span>
                      )}
                      <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{b.summary}</p>
                      <div className="mt-3 rounded-xl bg-primary/10 p-2.5 text-xs text-primary-glow border border-primary/20">
                        <strong>Significance:</strong> {b.significance}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Primary Space Agency Portals */}
            {dossier?.officialArchives && dossier.officialArchives.length > 0 && (
              <div className="rounded-3xl border border-border bg-panel p-6 sm:p-8 shadow-panel">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <ExternalLink className="size-5 text-teal" /> Official Primary Space Agency Archives
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Verified data records, peer-reviewed science logs, and raw downlinks hosted by NASA, ISRO, and ESA.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {dossier.officialArchives.map((arc, idx) => (
                    <a
                      key={idx}
                      href={arc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-background/60 p-4 transition-all hover:border-primary/60 hover:bg-muted"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-primary-glow transition-colors">
                            {arc.name}
                          </h4>
                          <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-primary-glow" />
                        </div>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{arc.description}</p>
                      </div>
                      <span className="mt-3 font-mono text-[10px] text-teal truncate">{arc.url}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
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

      {/* Archival Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-panel shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-transform hover:scale-110 hover:bg-background"
                aria-label="Close photo preview"
              >
                <X className="size-5" />
              </button>

              {/* Photo Display */}
              <div className="relative aspect-video w-full overflow-hidden bg-space">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Photo Metadata & Scientific Significance */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-teal/20 px-2.5 py-1 font-mono text-xs font-semibold text-teal border border-teal/30">
                      ID: {selectedPhoto.id}
                    </span>
                    {selectedPhoto.instrument && (
                      <span className="rounded-lg bg-primary/20 px-2.5 py-1 font-mono text-xs font-semibold text-primary-glow border border-primary/30">
                        Camera: {selectedPhoto.instrument}
                      </span>
                    )}
                  </div>
                  {selectedPhoto.dateOrSol && (
                    <span className="font-mono text-xs text-muted-foreground">
                      Captured: {selectedPhoto.dateOrSol}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground">
                  {selectedPhoto.title}
                </h3>

                <p className="text-sm text-foreground/90 leading-relaxed">
                  {selectedPhoto.caption}
                </p>

                {selectedPhoto.significance && (
                  <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-xs sm:text-sm text-foreground/90">
                    <span className="font-mono uppercase tracking-wider text-primary-glow font-bold block mb-1">
                      Scientific Significance
                    </span>
                    {selectedPhoto.significance}
                  </div>
                )}

                <div className="pt-4 border-t border-border/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="text-muted-foreground font-mono">
                    Credit: <span className="text-foreground">{selectedPhoto.credit}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={() => {
                        const p = selectedPhoto;
                        setSelectedPhoto(null);
                        openWithPrompt(
                          `Tell me about the archival photo "${p.title}" (${p.id}) taken by ${artifact.name}. What scientific details does it show?`
                        );
                      }}
                      className="gap-1.5"
                    >
                      <Bot className="size-3.5" /> Ask ASTRO about this image
                    </Button>
                    <Button asChild variant="glass" size="sm">
                      <a href={selectedPhoto.url} target="_blank" rel="noreferrer" className="gap-1.5">
                        <ExternalLink className="size-3.5" /> Full-Resolution Link
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
