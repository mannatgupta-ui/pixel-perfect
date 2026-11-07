import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { getArtifact } from "@/data/artifacts";
import { MissionExperience } from "@/components/experience/MissionExperience";

interface ExperienceSearch {
  chapter?: number;
  camera?: "first_person" | "chase" | "free";
}

export const Route = createFileRoute("/experience/$artifactId")({
  validateSearch: (s: Record<string, unknown>): ExperienceSearch => {
    const ch = Number(s["chapter"]);
    const cam = s["camera"] as "first_person" | "chase" | "free" | undefined;
    return {
      ...(cam ? { camera: cam } : {}),
      ...(!isNaN(ch) && ch >= 0 ? { chapter: ch } : {}),
    };
  },
  loader: ({ params }) => {
    const artifact = getArtifact(params.artifactId);
    if (!artifact) throw notFound();
    return { artifact };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.artifact?.name ?? "Mission";
    return {
      meta: [
        { title: `Become the Spacecraft: ${name} — Mission Experience` },
        {
          name: "description",
          content: `Experience the first-person journey of ${name} from launch pad to interplanetary space.`,
        },
      ],
    };
  },
  component: MissionExperiencePage,
});

function MissionExperiencePage() {
  const { artifact } = Route.useLoaderData();
  const { chapter, camera } = Route.useSearch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate({
      to: "/artifact/$artifactId",
      params: { artifactId: artifact.id },
    });
  };

  return (
    <main className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden bg-black">
      <MissionExperience
        initialChapterIndex={chapter ?? 0}
        initialCameraMode={camera ?? "chase"}
        onClose={handleClose}
      />
    </main>
  );
}
