import { TEXTURE_CREDIT } from "@/lib/textures";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-space-deep">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 text-sm text-muted-foreground md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-base text-foreground">Abandoned but Not Forgotten</p>
          <p className="mt-2 max-w-md">
            A NASA Space Apps Challenge 2026 project about the machines humanity left behind — and the stories they still tell.
          </p>
        </div>
        <div className="space-y-1.5 text-xs">
          <p>Mission photographs: NASA / JPL-Caltech and NASA Kennedy Space Center (public domain).</p>
          <p>
            <a href={TEXTURE_CREDIT.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">
              {TEXTURE_CREDIT.label}
            </a>
            .
          </p>
          <p>Rover 3D model and story illustrations are original illustrative reconstructions.</p>
        </div>
      </div>
    </footer>
  );
}
