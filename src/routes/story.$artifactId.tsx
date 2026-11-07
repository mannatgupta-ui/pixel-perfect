import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Eye } from "lucide-react";
import { getStoryForArtifact } from "@/data/multiStories";
import { getArtifact } from "@/data/artifacts";
import { MissionStoryPlayer } from "@/components/story/MissionStoryPlayer";
import { Button } from "@/components/ui/button";

interface StorySearch {
  stage?: number;
}

export const Route = createFileRoute("/story/$artifactId")({
  validateSearch: (s: Record<string, unknown>): StorySearch => {
    const st = Number(s["stage"]);
    return !isNaN(st) && st >= 0 ? { stage: st } : {};
  },
  loader: ({ params }) => {
    const storyMeta = getStoryForArtifact(params.artifactId);
    const artifact = getArtifact(params.artifactId);
    if (!storyMeta || !artifact) throw notFound();
    return { storyMeta, artifact };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.storyMeta?.title ?? "Mission Story";
    const agency = loaderData?.storyMeta?.agency ?? "Space";
    return {
      meta: [
        { title: `${title} (${agency}) — Abandoned but Not Forgotten` },
        {
          name: "description",
          content: loaderData?.storyMeta?.heroTagline ?? "An interactive animated mission lifecycle story.",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData?.storyMeta?.heroTagline ?? "Mission Story" },
      ],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { artifact } = Route.useLoaderData();
  const { stage } = Route.useSearch();

  return (
    <main className="relative min-h-[100svh] bg-background pt-[84px] pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 pb-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Link to="/artifact/$artifactId" params={{ artifactId: artifact.id }}>
              <ArrowLeft className="size-4" /> Return to 3D {artifact.name} Inspection
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 font-bold text-white shadow-glow hover:scale-105 transition-all">
              <Link to="/experience/$artifactId" params={{ artifactId: artifact.id }}>
                <Eye className="size-3.5 mr-1.5" />
                Become the Spacecraft (3D Simulation)
              </Link>
            </Button>
            <span className="font-mono text-xs text-muted-foreground">
              {artifact.mission} · {artifact.agency}
            </span>
          </div>
        </div>

        <MissionStoryPlayer artifactId={artifact.id} initialStage={stage ?? 0} />
      </div>
    </main>
  );
}
