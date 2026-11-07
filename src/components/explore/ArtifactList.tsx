import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { KIND_LABEL } from "@/data/artifacts";
import type { Artifact } from "@/data/types";
import { formatDate } from "@/lib/geo";
import { StatusBadge } from "@/components/site/StatusBadge";
import { cn } from "@/lib/utils";

export function ArtifactList({ items }: { items: Artifact[] }) {
  return (
    <ul className="space-y-2">
      {items.map((a) => (
        <li key={a.id}>
          <Link
            to="/artifact/$artifactId"
            params={{ artifactId: a.id }}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-background/40 p-3 transition-colors hover:border-primary/50 hover:bg-muted"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate font-medium">{a.name}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider",
                    a.agency === "ISRO"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      : a.agency === "ESA"
                      ? "bg-teal/15 text-teal border border-teal/30"
                      : "bg-blue-500/15 text-blue-400 border border-blue-500/30",
                  )}
                >
                  {a.agency ?? "NASA"}
                </span>
                {a.id === "mangalyaan" && (
                  <span className="rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-glow animate-pulse">
                    🚀 Experience
                  </span>
                )}
                {a.hasStory && a.id !== "mangalyaan" && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-glow">
                    Story
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {KIND_LABEL[a.kind]} · {a.mission}
                {a.arrivalDate ? ` · ${formatDate(a.arrivalDate)}` : a.launchDate ? ` · launched ${formatDate(a.launchDate)}` : ""}
              </p>
              <StatusBadge status={a.status} label={a.statusLabel} className="mt-2" />
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary-glow" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
