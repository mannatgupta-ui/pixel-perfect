import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, Orbit, Radio } from "lucide-react";

import hero from "@/assets/hero-spirit-dusk.jpg";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { ARTIFACTS } from "@/data/artifacts";
import { STORY_DISCLAIMER } from "@/data/spirit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abandoned but Not Forgotten — Humanity's forgotten space explorers" },
      {
        name: "description",
        content:
          "An interactive 3D museum of the rovers, landers and probes left on the Moon, Mars and beyond — told in their own voice.",
      },
      { property: "og:title", content: "Abandoned but Not Forgotten" },
      {
        property: "og:description",
        content: "Travel the Solar System, find the machines we left behind, and hear Spirit Rover tell its story.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const counts = {
  moon: ARTIFACTS.filter((a) => a.bodyId === "moon").length,
  mars: ARTIFACTS.filter((a) => a.bodyId === "mars").length,
  silent: ARTIFACTS.filter((a) => a.status !== "active").length,
  deep: ARTIFACTS.filter((a) => a.bodyId === null).length,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }),
};

function Index() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <motion.img
          src={hero}
          alt="Illustration of a lone rover on a ridge in a Martian crater at dusk, with Earth a tiny blue dot in the sky"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 via-background/10 to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-32 sm:pb-28">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0} className="eyebrow">
            NASA Space Apps Challenge 2026
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Abandoned <span className="text-muted-foreground">but</span>{" "}
            <span className="text-gradient-mars">not forgotten.</span>
          </motion.h1>
          <motion.blockquote variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-6 max-w-xl">
            <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
              “I was built on Earth. Engineers gave me a purpose, a destination, and a limited amount of time. Then, one day, I
              left the only world I had ever known.”
            </p>
            <footer className="mt-2 font-mono text-xs text-muted-foreground">— Spirit Rover, as imagined. {STORY_DISCLAIMER.split(".")[0]}.</footer>
          </motion.blockquote>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/explore">
                Enter the Solar System <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/story/$artifactId" params={{ artifactId: "spirit" }}>
                Hear Spirit's story
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative border-y border-border bg-space starfield">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-medium leading-tight sm:text-4xl"
          >
            These machines may have stopped working — but their stories are still alive.
          </motion.h2>
          <dl className="grid grid-cols-2 gap-4">
            {[
              { n: counts.mars, l: "machines on Mars" },
              { n: counts.moon, l: "sites on the Moon" },
              { n: counts.silent, l: "voices gone silent" },
              { n: counts.deep, l: "probes in deep space" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="rounded-2xl border border-border bg-panel p-5"
              >
                <dt className="font-display text-4xl font-semibold text-primary-glow">{s.n}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.l}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow">Your journey</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium sm:text-4xl">Three ways in</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <JourneyCard
            icon={<Orbit />}
            step="01"
            title="Fly the Solar System"
            text="Spin the planets, pick a world and see every NASA machine that stayed behind."
            to="/explore"
            cta="Open the map"
          />
          <JourneyCard
            icon={<Globe2 />}
            step="02"
            title="Walk the red planet"
            text="Turn a 3D Mars and drop onto documented landing sites — from Viking to Perseverance."
            to="/planet/$planetId"
            params={{ planetId: "mars" }}
            cta="Visit Mars"
          />
          <JourneyCard
            icon={<Radio />}
            step="03"
            title="Meet Spirit"
            text="Inspect the rover piece by piece, then ride along from launch to its last signal."
            to="/artifact/$artifactId"
            params={{ artifactId: "spirit" }}
            cta="Inspect Spirit"
          />
        </div>
      </section>

      {/* LAST SIGNAL TEASER */}
      <section className="relative overflow-hidden border-t border-border bg-dusk">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="eyebrow">The last signal</p>
          <div className="mt-4 grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-mono text-sm text-muted-foreground">22 March 2010 · Gusev Crater, Mars</p>
              <h2 className="mt-3 text-3xl font-medium sm:text-5xl">“After that day, I could no longer answer.”</h2>
              <p className="mt-4 max-w-md text-foreground/80">
                NASA sent Spirit more than 1,300 commands over the next 14 months. None were answered.
              </p>
              <Button asChild variant="hero" className="mt-8">
                <Link to="/story/$artifactId" params={{ artifactId: "spirit" }} search={{ stage: 7 }}>
                  Read its last days <ArrowRight />
                </Link>
              </Button>
            </div>
            <SignalWave />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function JourneyCard({
  icon,
  step,
  title,
  text,
  to,
  params,
  cta,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  text: string;
  to: "/explore" | "/planet/$planetId" | "/artifact/$artifactId";
  params?: Record<string, string>;
  cta: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
    >
      <Link
        to={to}
        params={params as never}
        className="group flex h-full flex-col rounded-3xl border border-border bg-panel p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
      >
        <div className="flex items-center justify-between">
          <span className="grid size-11 place-items-center rounded-2xl bg-mars-gradient text-primary-foreground [&_svg]:size-5">{icon}</span>
          <span className="font-mono text-xs text-muted-foreground">{step}</span>
        </div>
        <h3 className="mt-8 text-xl font-medium">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-glow">
          {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

function SignalWave() {
  const path = "M0 60 " + Array.from({ length: 40 }, (_, i) => `Q ${i * 15 + 7.5} ${i % 2 ? 60 + (40 - i) : 60 - (40 - i)} ${(i + 1) * 15} 60`).join(" ");
  return (
    <svg viewBox="0 0 600 120" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="fade" x1="0" x2="1">
          <stop offset="0" style={{ stopColor: "var(--teal)" }} />
          <stop offset="0.7" style={{ stopColor: "var(--signal)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--signal)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke="url(#fade)"
        strokeWidth={2.5}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "easeOut" }}
      />
      <line x1="0" x2="600" y1="60" y2="60" className="stroke-border" strokeDasharray="4 6" />
    </svg>
  );
}
