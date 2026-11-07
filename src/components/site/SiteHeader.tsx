import { Link } from "@tanstack/react-router";
import { Orbit } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NasaMissionControlBar } from "@/components/nasa/NasaMissionControlBar";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <NasaMissionControlBar />
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-full bg-mars-gradient text-primary-foreground shadow-glow transition-transform group-hover:rotate-45">
            <Orbit className="size-4" />
          </span>
          <span className="font-display text-[13px] font-semibold leading-tight tracking-tight">
            Abandoned <span className="text-muted-foreground">but</span> Not Forgotten
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/explore"
            className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Solar System
          </Link>
          <Link
            to="/planet/$planetId"
            params={{ planetId: "mars" }}
            className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Mars
          </Link>
          <Link
            to="/planet/$planetId"
            params={{ planetId: "moon" }}
            className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Moon
          </Link>
          <Link
            to="/artifact/$artifactId"
            params={{ artifactId: "spirit" }}
            className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Spirit
          </Link>
          <Link
            to="/story/$artifactId"
            params={{ artifactId: "spirit" }}
            className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Story
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-full border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          Menu
        </button>
      </div>
      <nav className={cn("border-t border-border/60 px-4 pb-3 md:hidden", open ? "block" : "hidden")}>
        <Link
          to="/explore"
          onClick={() => setOpen(false)}
          className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Solar System
        </Link>
        <Link
          to="/planet/$planetId"
          params={{ planetId: "mars" }}
          onClick={() => setOpen(false)}
          className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Mars
        </Link>
        <Link
          to="/planet/$planetId"
          params={{ planetId: "moon" }}
          onClick={() => setOpen(false)}
          className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Moon
        </Link>
        <Link
          to="/artifact/$artifactId"
          params={{ artifactId: "spirit" }}
          onClick={() => setOpen(false)}
          className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Spirit
        </Link>
        <Link
          to="/story/$artifactId"
          params={{ artifactId: "spirit" }}
          onClick={() => setOpen(false)}
          className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Story
        </Link>
      </nav>
    </header>
  );
}
