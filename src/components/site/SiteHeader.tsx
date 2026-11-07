import { Link } from "@tanstack/react-router";
import { Orbit } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/explore", label: "Solar System" },
  { to: "/planet/$planetId", params: { planetId: "mars" }, label: "Mars" },
  { to: "/planet/$planetId", params: { planetId: "moon" }, label: "Moon" },
  { to: "/artifact/$artifactId", params: { artifactId: "spirit" }, label: "Spirit" },
  { to: "/story/$artifactId", params: { artifactId: "spirit" }, label: "Story" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
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
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              params={"params" in n ? n.params : undefined}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
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
        {NAV.map((n) => (
          <Link
            key={n.label}
            to={n.to}
            params={"params" in n ? n.params : undefined}
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
