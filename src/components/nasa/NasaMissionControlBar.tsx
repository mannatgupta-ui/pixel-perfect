import { useState, useEffect } from "react";
import { Radio, Volume2, Orbit, Clock, ShieldCheck, Activity, Compass } from "lucide-react";
import { NasaDsnModal } from "./NasaDsnModal";
import { NasaAudioModal } from "./NasaAudioModal";
import { NasaOrbitalDynamicsModal } from "./NasaOrbitalDynamicsModal";

export function NasaMissionControlBar() {
  const [utcTime, setUtcTime] = useState("");
  const [julianDate, setJulianDate] = useState("");
  const [marsSol, setMarsSol] = useState(1321);
  const [marsLmst, setMarsLmst] = useState("14:22:15");

  const [dsnOpen, setDsnOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [orbitOpen, setOrbitOpen] = useState(false);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();

      // UTC Atomic Format: HH:mm:ss UTC
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const mins = String(now.getUTCMinutes()).padStart(2, "0");
      const secs = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${mins}:${secs} UTC`);

      // Julian Date Calculation
      // JD = (time / 86400000) + 2440587.5
      const jd = now.getTime() / 86400000 + 2440587.5;
      setJulianDate(jd.toFixed(4));

      // Mars Sol & Local Mean Solar Time (Jezero Crater - Mars 2020 landing 18 Feb 2021)
      // MSD = (JD - 2451549.5) / 1.027491252 + 44796.0 - 0.00096
      const msd = (jd - 2451549.5) / 1.027491252 + 44796.0;
      const m2020LandingJd = 2459264.3715; // 18 Feb 2021
      const percySol = Math.floor((jd - m2020LandingJd) / 1.027491252);
      setMarsSol(percySol > 0 ? percySol : 1321);

      // Mars LMST for Jezero (77.45° E longitude):
      const jezeroLmstHrs = (msd * 24 + 77.45 / 15) % 24;
      const jH = String(Math.floor(jezeroLmstHrs)).padStart(2, "0");
      const jM = String(Math.floor((jezeroLmstHrs % 1) * 60)).padStart(2, "0");
      const jS = String(Math.floor((((jezeroLmstHrs % 1) * 60) % 1) * 60)).padStart(2, "0");
      setMarsLmst(`${jH}:${jM}:${jS}`);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-full border-b border-border/70 bg-panel/95 px-4 py-1.5 backdrop-blur-md text-[11px] font-mono text-muted-foreground select-none overflow-x-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 min-w-[340px]">
          {/* Left: DSN Status & Ground Network Status */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDsnOpen(true)}
              className="group flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-foreground hover:bg-muted transition-colors"
              title="Open NASA Deep Space Network Console"
            >
              <span className="relative flex size-2 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-teal" />
              </span>
              <span className="font-semibold text-teal group-hover:underline">DSN NOW</span>
              <span className="text-muted-foreground hidden sm:inline">· Goldstone / Madrid / Canberra</span>
            </button>

            <span className="text-border hidden sm:inline">|</span>

            {/* Mars Sol & LMST */}
            <div className="hidden md:flex items-center gap-1 text-foreground/80">
              <span className="text-primary-glow font-semibold">JEZERO SOL {marsSol}</span>
              <span className="text-muted-foreground">· LMST {marsLmst}</span>
            </div>
          </div>

          {/* Right: Atomic UTC Time & Interactive NASA Tools */}
          <div className="flex items-center gap-2.5">
            {/* UTC Clock */}
            <div className="flex items-center gap-1 text-foreground">
              <Clock className="size-3 text-muted-foreground" />
              <span className="font-semibold">{utcTime}</span>
              <span className="text-muted-foreground hidden lg:inline">· JD {julianDate}</span>
            </div>

            <span className="text-border">|</span>

            {/* NASA Extraterrestrial Audio Button */}
            <button
              type="button"
              onClick={() => setAudioOpen(true)}
              className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-foreground/90 hover:bg-primary/20 hover:text-primary-glow border border-border/60 hover:border-primary/40 transition-colors"
              title="Play real NASA audio from Mars & Deep Space"
            >
              <Volume2 className="size-3 text-primary-glow" />
              <span className="hidden sm:inline">NASA Sounds</span>
            </button>

            {/* NASA Orbital Dynamics Calculator */}
            <button
              type="button"
              onClick={() => setOrbitOpen(true)}
              className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-foreground/90 hover:bg-primary/20 hover:text-primary-glow border border-border/60 hover:border-primary/40 transition-colors"
              title="Open NASA JPL Horizons Orbital Dynamics Visualizer"
            >
              <Orbit className="size-3 text-teal" />
              <span className="hidden sm:inline">Orbital Dynamics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <NasaDsnModal open={dsnOpen} onClose={() => setDsnOpen(false)} />
      <NasaAudioModal open={audioOpen} onClose={() => setAudioOpen(false)} />
      <NasaOrbitalDynamicsModal open={orbitOpen} onClose={() => setOrbitOpen(false)} />
    </>
  );
}

