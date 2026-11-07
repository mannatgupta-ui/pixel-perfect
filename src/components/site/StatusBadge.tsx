import type { ArtifactStatus } from "@/data/types";
import { cn } from "@/lib/utils";

const TONE: Record<ArtifactStatus, string> = {
  active: "border-signal/40 bg-signal/10 text-signal",
  silent: "border-gold/40 bg-gold/10 text-gold",
  destroyed: "border-primary/40 bg-primary/10 text-primary-glow",
};

export function StatusBadge({ status, label, className }: { status: ArtifactStatus; label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider", TONE[status], className)}>
      <span className={cn("size-1.5 rounded-full bg-current", status === "active" && "animate-pulse")} />
      {label}
    </span>
  );
}
