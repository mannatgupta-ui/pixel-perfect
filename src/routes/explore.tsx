import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  FastForward,
  Info,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Telescope,
  X,
  Radio,
  Orbit,
  Volume2,
} from "lucide-react";
import { lazy, useState, useEffect } from "react";

import { ArtifactList } from "@/components/explore/ArtifactList";
import { ClientScene } from "@/components/site/ClientScene";
import { Button } from "@/components/ui/button";
import { artifactsForBody } from "@/data/artifacts";
import { BODIES, BODY_BY_ID, isBodyId, SCALE_NOTE } from "@/data/bodies";
import type { BodyId } from "@/data/types";
import { useAstro } from "@/components/astro/AstroContext";
import { cn } from "@/lib/utils";
import { NasaDsnModal } from "@/components/nasa/NasaDsnModal";
import { NasaOrbitalDynamicsModal } from "@/components/nasa/NasaOrbitalDynamicsModal";
import { NasaAudioModal } from "@/components/nasa/NasaAudioModal";

const SolarSystemScene = lazy(() => import("@/components/three/SolarSystemScene"));

type Focus = BodyId | "deep-space";
interface ExploreSearch {
  body?: Focus;
}

const ASTRO_PHYSICS: Record<string, { au: string; lightTime: string; orbitalVelocity: string }> = {
  mercury: { au: "0.39 AU", lightTime: "3.2 min", orbitalVelocity: "47.4 km/s" },
  venus: { au: "0.72 AU", lightTime: "6.0 min", orbitalVelocity: "35.0 km/s" },
  earth: { au: "1.00 AU", lightTime: "8.3 min", orbitalVelocity: "29.8 km/s" },
  moon: { au: "1.00 AU", lightTime: "8.3 min", orbitalVelocity: "1.02 km/s (orbit)" },
  mars: { au: "1.52 AU", lightTime: "12.6 min", orbitalVelocity: "24.1 km/s" },
  jupiter: { au: "5.20 AU", lightTime: "43.2 min", orbitalVelocity: "13.1 km/s" },
  saturn: { au: "9.58 AU", lightTime: "1.33 hours", orbitalVelocity: "9.7 km/s" },
  uranus: { au: "19.22 AU", lightTime: "2.66 hours", orbitalVelocity: "6.8 km/s" },
  neptune: { au: "30.05 AU", lightTime: "4.16 hours", orbitalVelocity: "5.4 km/s" },
  sun: { au: "0.00 AU", lightTime: "0.0 sec", orbitalVelocity: "220 km/s (Galactic)" },
};

const TOUR_STEPS = [
  { title: "The Sun & Coronal Solar Winds", desc: "Our 4.6-billion-year-old yellow dwarf star holding 99.8% of the Solar System's mass." },
  { title: "Mercury — Swift & Cratered", desc: "The smallest planet, scorched by solar radiation and explored by MESSENGER and BepiColombo." },
  { title: "Venus — Runaway Greenhouse", desc: "A dense carbon dioxide furnace at 465°C where Soviet Venera and NASA Magellan visited." },
  { title: "Earth & Moon — Humanity's Cradle", desc: "Home to Apollo 11, Lunar Orbiters, Surveyor, and India's historic Chandrayaan-3." },
  { title: "Mars — The Red Planet", desc: "The graveyard and museum of Spirit, Opportunity, Curiosity, Perseverance, and Mangalyaan." },
  { title: "Main Asteroid Belt & Ceres", desc: "Millions of primordial rocky fragments and dwarf planet Ceres, explored by NASA's Dawn mission." },
  { title: "Jupiter — The Gas Giant", desc: "King of the planets with its Great Red Spot and icy moons Io, Europa, Ganymede, and Callisto." },
  { title: "Saturn — The Ringed Wonder", desc: "Surrounded by billions of icy particles, visited by Cassini and ESA's Huygens probe on Titan." },
  { title: "Kuiper Belt, Comets & Beyond", desc: "The frozen frontier of dwarf planet Pluto, Comet 67P, and Voyager 1 entering interstellar space." },
];

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): ExploreSearch => {
    const b = typeof s["body"] === "string" ? s["body"] : "";
    return isBodyId(b) || b === "deep-space" ? { body: b } : {};
  },
  head: () => ({
    meta: [
      { title: "3D Deep Space Solar System — Abandoned but Not Forgotten" },
      { name: "description", content: "Explore an interactive 3D Solar System featuring the Asteroid Belt, Kuiper Belt, sweeping comets, and discarded NASA, ISRO, and ESA hardware." },
      { property: "og:title", content: "Explore the 3D Deep Space Solar System" },
      { property: "og:description", content: "Discover rovers, landers and probes left across the Moon, Mars, and interstellar space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const { body } = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });
  const { updateContext } = useAstro();
  const [ready, setReady] = useState(false);
  const focus: Focus | null = body ?? null;
  const select = (id: Focus | null) => navigate({ search: id ? { body: id } : {}, replace: true });
  const sceneSelected = focus && focus !== "deep-space" ? focus : null;

  // Sandbox simulation settings
  const [timeSpeed, setTimeSpeed] = useState<number>(1);
  const [showAsteroidBelt, setShowAsteroidBelt] = useState(true);
  const [showKuiperBelt, setShowKuiperBelt] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showNebulae, setShowNebulae] = useState(true);
  const [showComet, setShowComet] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dsnOpen, setDsnOpen] = useState(false);
  const [orbitOpen, setOrbitOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);

  // Cinematic Auto-Tour state
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  useEffect(() => {
    updateContext({
      selectedPlanet: focus ? (focus === "deep-space" ? "Deep Space" : BODY_BY_ID[focus]?.name) : "Solar System",
      selectedArtifact: null,
      selectedComponent: null,
      currentStoryStage: null,
    });
  }, [focus]);

  // Auto-advance cinematic tour
  useEffect(() => {
    if (!tourActive) return;
    const interval = setInterval(() => {
      setTourStep((prev) => (prev + 1) % TOUR_STEPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [tourActive]);

  const startTour = () => {
    select(null);
    setTourStep(0);
    setTourActive(true);
  };

  const stopTour = () => {
    setTourActive(false);
  };

  const nextTourStep = () => {
    setTourStep((prev) => (prev + 1) % TOUR_STEPS.length);
  };

  return (
    <main className="relative h-[100svh] overflow-hidden bg-background pt-[84px]">
      <div className="absolute inset-0 top-[84px]" data-scene-ready={ready ? "true" : undefined}>
        <ClientScene label="Rendering Deep Space Solar System…">
          <SolarSystemScene
            selected={sceneSelected}
            onSelect={(id) => {
              if (tourActive) setTourActive(false);
              select(id);
            }}
            onReady={() => setReady(true)}
            settings={{
              timeSpeed,
              showAsteroidBelt,
              showKuiperBelt,
              showOrbits,
              showLabels,
              showNebulae,
              showComet,
              tourActive,
              tourStep,
            }}
          />
        </ClientScene>
      </div>

      {/* Intro + quick picks */}
      <div className="pointer-events-none absolute inset-x-0 top-[84px] z-10 p-4 sm:p-6">
        <div className="pointer-events-auto max-w-md">
          <div className="flex items-center gap-2">
            <p className="eyebrow">Deep space sandbox</p>
            <span className="rounded-full bg-teal/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal">
              NASA · ISRO · ESA
            </span>
          </div>
          <h1 className="mt-1.5 text-2xl font-medium sm:text-3xl">Where did we leave them?</h1>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            Drag to rotate · scroll to zoom · tap any world or explore the Asteroid and Kuiper belts.
          </p>
        </div>

        {/* Planet quick selector bar */}
        <div className="pointer-events-auto mt-3 flex max-w-2xl flex-wrap items-center gap-1.5">
          {BODIES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                if (tourActive) setTourActive(false);
                select(b.id);
              }}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs transition-colors",
                focus === b.id
                  ? "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border bg-background/50 text-muted-foreground backdrop-blur hover:text-foreground",
              )}
            >
              {b.name.replace("The ", "")}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              if (tourActive) setTourActive(false);
              select("deep-space");
            }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors",
              focus === "deep-space"
                ? "border-teal bg-teal text-primary-foreground"
                : "border-teal/40 bg-background/50 text-teal backdrop-blur hover:border-teal",
            )}
          >
            <Telescope className="size-3.5" /> Deep space
          </button>
        </div>
      </div>

      {/* CINEMATIC TOUR HUD OVERLAY */}
      <AnimatePresence>
        {tourActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto absolute inset-x-4 top-40 z-30 mx-auto max-w-lg rounded-2xl border border-teal/40 bg-panel/90 p-4 shadow-panel backdrop-blur-md sm:top-20"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-teal animate-spin" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-teal">
                  Cinematic Deep Space Tour ({tourStep + 1} / {TOUR_STEPS.length})
                </span>
              </div>
              <button
                type="button"
                onClick={stopTour}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Exit tour"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <h3 className="mt-1 font-display text-base font-semibold text-foreground">
              {TOUR_STEPS[tourStep]?.title}
            </h3>
            <p className="mt-1 text-xs text-foreground/80 leading-relaxed">
              {TOUR_STEPS[tourStep]?.desc}
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-xs">
              <span className="text-[11px] text-muted-foreground font-mono">Auto-advancing every 8s</span>
              <div className="flex gap-2">
                <Button size="sm" variant="glass" className="h-7 text-xs px-2.5" onClick={nextTourStep}>
                  Next Stop <ArrowRight className="size-3" />
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs px-2.5" onClick={stopTour}>
                  Exit Tour
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING SANDBOX CONTROLS TOOLBAR (BOTTOM BAR) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-panel/85 p-2 shadow-panel backdrop-blur-md">
          {/* Time speed presets */}
          <div className="flex items-center gap-1 border-r border-border/60 pr-2">
            <button
              type="button"
              onClick={() => setTimeSpeed(timeSpeed === 0 ? 1 : 0)}
              title={timeSpeed === 0 ? "Resume time" : "Pause orbital clock"}
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                timeSpeed === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {timeSpeed === 0 ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
            {[0.5, 1, 2, 5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setTimeSpeed(spd)}
                className={cn(
                  "rounded-lg px-2 py-1 font-mono text-[11px] transition-colors",
                  timeSpeed === spd
                    ? "bg-primary text-primary-foreground font-bold shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Sandbox layer toggles popover trigger */}
          <button
            type="button"
            onClick={() => setSettingsOpen((p) => !p)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
              settingsOpen
                ? "border-primary bg-primary/15 text-primary-glow"
                : "border-border bg-background/50 text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            <Layers className="size-3.5" /> Sandbox Layers
          </button>

          {/* Cinematic Tour Toggle */}
          <Button
            size="sm"
            variant={tourActive ? "default" : "glass"}
            className="h-8 text-xs gap-1.5 font-medium"
            onClick={tourActive ? stopTour : startTour}
          >
            <Sparkles className="size-3.5 text-teal" />
            {tourActive ? "Stop Tour" : "Cinematic Tour"}
          </Button>

          {/* NASA Deep Space Network & Mechanics Tools */}
          <div className="flex items-center gap-1 border-l border-border/60 pl-2">
            <button
              type="button"
              onClick={() => setDsnOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[11px] font-medium text-primary-glow hover:bg-primary/20 transition-colors"
              title="NASA Deep Space Network Live Carrier Dish Console"
            >
              <Radio className="size-3" /> DSN
            </button>
            <button
              type="button"
              onClick={() => setOrbitOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-gold/10 px-2 py-1 font-mono text-[11px] font-medium text-gold hover:bg-gold/20 transition-colors hidden sm:inline-flex"
              title="JPL Horizons Orbital Mechanics & Gravity Slingshot Simulator"
            >
              <Orbit className="size-3" /> Slingshot
            </button>
            <button
              type="button"
              onClick={() => setAudioOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-teal/40 bg-teal/10 px-2 py-1 font-mono text-[11px] font-medium text-teal hover:bg-teal/20 transition-colors"
              title="NASA Extraterrestrial Acoustic Sound Archive"
            >
              <Volume2 className="size-3" /> Audio
            </button>
          </div>
        </div>
      </div>

      {/* SANDBOX LAYERS SETTINGS DRAWER / POPOVER */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="pointer-events-auto absolute bottom-20 left-1/2 z-30 w-72 -translate-x-1/2 rounded-2xl border border-border bg-panel p-4 shadow-panel backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="font-display text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Compass className="size-3.5 text-teal" /> Deep Space Simulation
              </span>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-foreground/90">Main Asteroid Belt (2,200)</span>
                <input
                  type="checkbox"
                  checked={showAsteroidBelt}
                  onChange={(e) => setShowAsteroidBelt(e.target.checked)}
                  className="rounded border-border accent-primary size-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-foreground/90">Kuiper Belt & Pluto (3,200)</span>
                <input
                  type="checkbox"
                  checked={showKuiperBelt}
                  onChange={(e) => setShowKuiperBelt(e.target.checked)}
                  className="rounded border-border accent-primary size-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-foreground/90">Active Comet 1P/Halley</span>
                <input
                  type="checkbox"
                  checked={showComet}
                  onChange={(e) => setShowComet(e.target.checked)}
                  className="rounded border-border accent-primary size-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-foreground/90">Planetary Orbit Lines</span>
                <input
                  type="checkbox"
                  checked={showOrbits}
                  onChange={(e) => setShowOrbits(e.target.checked)}
                  className="rounded border-border accent-primary size-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-foreground/90">Body & Belt Labels</span>
                <input
                  type="checkbox"
                  checked={showLabels}
                  onChange={(e) => setShowLabels(e.target.checked)}
                  className="rounded border-border accent-primary size-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-foreground/90">Cosmic Dust & Nebulae</span>
                <input
                  type="checkbox"
                  checked={showNebulae}
                  onChange={(e) => setShowNebulae(e.target.checked)}
                  className="rounded border-border accent-primary size-4"
                />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="pointer-events-none absolute bottom-3 left-4 z-10 flex max-w-sm items-start gap-1.5 text-[11px] text-muted-foreground sm:left-6">
        <Info className="mt-px size-3.5 shrink-0" /> {SCALE_NOTE}
      </p>

      <AnimatePresence>{focus && <FocusPanel key={focus} focus={focus} onClose={() => select(null)} />}</AnimatePresence>

      {/* NASA Modals */}
      <NasaDsnModal open={dsnOpen} onClose={() => setDsnOpen(false)} />
      <NasaOrbitalDynamicsModal open={orbitOpen} onClose={() => setOrbitOpen(false)} />
      <NasaAudioModal open={audioOpen} onClose={() => setAudioOpen(false)} />
    </main>
  );
}

function FocusPanel({ focus, onClose }: { focus: Focus; onClose: () => void }) {
  const isDeep = focus === "deep-space";
  const body = isDeep ? null : BODY_BY_ID[focus];
  const items = artifactsForBody(isDeep ? null : focus);
  const physics = body ? ASTRO_PHYSICS[body.id] : null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-3 bottom-16 z-20 max-h-[58svh] overflow-y-auto rounded-3xl border border-border bg-panel p-5 shadow-panel sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-20 sm:max-h-none sm:w-[410px]"
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
          ? "Probes that never landed anywhere. They are still travelling outward through the Kuiper Belt and interstellar space — carrying humanity's greeting to the stars."
          : body?.tagline}
      </p>

      {/* Planetary Astronomical Dimensions */}
      {body && (
        <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <Fact k="Diameter" v={`${body.diameterKm.toLocaleString("en-US")} km`} />
          <Fact k="Distance" v={body.distance} />
          <Fact k="Day" v={body.dayLength} />
        </dl>
      )}

      {/* Real Astrophysics & Light-Travel Scale */}
      {physics && (
        <div className="mt-3 rounded-2xl border border-teal/30 bg-teal/5 p-3">
          <div className="flex items-center gap-1.5 text-teal text-[10px] font-mono uppercase tracking-wider">
            <Telescope className="size-3" /> Astrophysical Scale
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-[10px] text-muted-foreground font-mono">Sun Distance</div>
              <div className="font-semibold text-foreground mt-0.5">{physics.au}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-mono">Light-Travel</div>
              <div className="font-semibold text-foreground mt-0.5">{physics.lightTime}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-mono">Orbital Speed</div>
              <div className="font-semibold text-foreground mt-0.5">{physics.orbitalVelocity}</div>
            </div>
          </div>
        </div>
      )}

      {body?.explorable && (
        <Button asChild variant="hero" className="mt-4 w-full">
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
