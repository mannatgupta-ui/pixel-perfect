import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Wifi, Compass, Globe, X, RefreshCw, Zap, ArrowUpRight, ArrowDownLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DsnDish {
  id: string;
  name: string;
  diameter: string;
  complex: "Goldstone" | "Madrid" | "Canberra";
  location: string;
  azimuth: number;
  elevation: number;
  activeTarget: string;
  band: "X-Band" | "S-Band" | "Ka-Band";
  freqGhz: number;
  uplinkKw: number;
  downlinkDbm: number;
  owltSeconds: number; // One-Way Light Time
  dataRate: string;
}

export const DSN_DISHES: DsnDish[] = [
  {
    id: "DSS-14",
    name: "Mars Antenna (DSS-14)",
    diameter: "70 metres",
    complex: "Goldstone",
    location: "Mojave Desert, California (35°25'N 116°53'W)",
    azimuth: 142.4,
    elevation: 38.6,
    activeTarget: "Perseverance Rover (Mars)",
    band: "X-Band",
    freqGhz: 8.419,
    uplinkKw: 18.5,
    downlinkDbm: -132.4,
    owltSeconds: 787, // ~13.1 min
    dataRate: "2.0 Mbps (via MRO Relay)",
  },
  {
    id: "DSS-43",
    name: "Southern Giant (DSS-43)",
    diameter: "70 metres",
    complex: "Canberra",
    location: "Tidbinbilla, Australia (35°24'S 148°58'E)",
    azimuth: 228.1,
    elevation: 54.2,
    activeTarget: "Voyager 2 (Interstellar)",
    band: "S-Band",
    freqGhz: 2.114,
    uplinkKw: 20.0,
    downlinkDbm: -159.8,
    owltSeconds: 68045, // ~18.9 hours
    dataRate: "160 bps",
  },
  {
    id: "DSS-63",
    name: "Madrid Flagship (DSS-63)",
    diameter: "70 metres",
    complex: "Madrid",
    location: "Robledo de Chavela, Spain (40°25'N 04°14'W)",
    azimuth: 89.7,
    elevation: 41.2,
    activeTarget: "Voyager 1 (Interstellar)",
    band: "X-Band",
    freqGhz: 8.421,
    uplinkKw: 20.0,
    downlinkDbm: -161.2,
    owltSeconds: 81379, // ~22.6 hours
    dataRate: "160 bps",
  },
  {
    id: "DSS-24",
    name: "Beam Waveguide (DSS-24)",
    diameter: "34 metres",
    complex: "Goldstone",
    location: "Mojave Desert, California",
    azimuth: 168.3,
    elevation: 49.0,
    activeTarget: "Curiosity Rover (Mars)",
    band: "X-Band",
    freqGhz: 8.415,
    uplinkKw: 2.0,
    downlinkDbm: -134.1,
    owltSeconds: 787,
    dataRate: "500 kbps",
  },
  {
    id: "DSS-54",
    name: "Apollo Heritage (DSS-54)",
    diameter: "34 metres",
    complex: "Madrid",
    location: "Robledo de Chavela, Spain",
    azimuth: 110.2,
    elevation: 62.5,
    activeTarget: "New Horizons (Kuiper Belt)",
    band: "X-Band",
    freqGhz: 8.438,
    uplinkKw: 2.0,
    downlinkDbm: -152.0,
    owltSeconds: 29546, // ~8.2 hours
    dataRate: "1.0 kbps",
  },
  {
    id: "DSS-34",
    name: "Canberra BWG (DSS-34)",
    diameter: "34 metres",
    complex: "Canberra",
    location: "Tidbinbilla, Australia",
    azimuth: 312.4,
    elevation: 27.8,
    activeTarget: "Chandrayaan-3 (Moon / ISRO)",
    band: "Ka-Band",
    freqGhz: 32.05,
    uplinkKw: 1.0,
    downlinkDbm: -98.4,
    owltSeconds: 1.28,
    dataRate: "10.0 Mbps",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NasaDsnModal({ open, onClose }: Props) {
  const [selectedDish, setSelectedDish] = useState<DsnDish>(DSN_DISHES[0]!);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTicker((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatOwlt = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${seconds.toFixed(2)} sec`;
  };

  const getDistanceAu = (seconds: number) => {
    // Speed of light: 299,792.458 km/s; 1 AU = 149,597,870.7 km
    const km = seconds * 299792.458;
    const au = km / 149597870.7;
    return {
      au: au.toFixed(3),
      km: km > 1e9 ? `${(km / 1e9).toFixed(3)} Billion km` : `${(km / 1e6).toFixed(2)} Million km`,
    };
  };

  const dist = getDistanceAu(selectedDish.owltSeconds);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-primary/40 bg-panel/95 p-6 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary-glow border border-primary/30">
                  <Radio className="size-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      NASA Deep Space Network (DSN) Now
                    </h3>
                    <span className="flex items-center gap-1 rounded-full bg-teal/20 px-2 py-0.5 font-mono text-[10px] text-teal border border-teal/30">
                      <span className="inline-block size-1.5 rounded-full bg-teal animate-ping" />
                      LIVE CARRIER LOCK
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    JPL Real-Time Deep Space Communications Array · Goldstone · Madrid · Canberra
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Main Interactive Grid */}
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: Ground Dish Selection */}
              <div className="lg:col-span-5 space-y-2.5">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mb-1">
                  <span>ACTIVE TRACKING DISHES:</span>
                  <span>{DSN_DISHES.length} ANTENNAS</span>
                </div>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {DSN_DISHES.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDish(d)}
                      className={`w-full text-left rounded-2xl border p-3.5 transition-all ${
                        selectedDish.id === d.id
                          ? "border-primary bg-primary/15 text-foreground shadow-glow"
                          : "border-border/70 bg-background/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-primary-glow">
                          {d.id} ({d.diameter})
                        </span>
                        <span className="rounded-full bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground border border-border">
                          {d.complex}
                        </span>
                      </div>
                      <div className="mt-1 font-display text-xs font-medium text-foreground">
                        {d.activeTarget}
                      </div>
                      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                        <span>{d.band} · {d.freqGhz} GHz</span>
                        <span className="text-teal font-semibold">{d.dataRate}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Link Telemetry Display */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-border bg-space p-5">
                <div>
                  {/* Top Target Status Bar */}
                  <div className="flex items-center justify-between border-b border-border/70 pb-3">
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        Linked Spacecraft
                      </div>
                      <h4 className="font-display text-base font-bold text-foreground">
                        {selectedDish.activeTarget}
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        Ground Station
                      </div>
                      <div className="font-mono text-xs font-bold text-teal">
                        {selectedDish.name}
                      </div>
                    </div>
                  </div>

                  {/* Visual Dish & Pulsing Radio Beam */}
                  <div className="relative my-4 h-36 w-full overflow-hidden rounded-xl bg-space-deep border border-border/60 flex items-center justify-center">
                    <svg viewBox="0 0 600 160" className="w-full h-full">
                      {/* Deep Space Starfield */}
                      {Array.from({ length: 30 }).map((_, i) => (
                        <circle key={i} cx={(i * 37) % 600} cy={(i * 23) % 160} r="1" fill="#ffffff" opacity="0.4" />
                      ))}

                      {/* Ground Station Dish on Left */}
                      <g transform="translate(80, 110)">
                        <polygon points="-15,0 15,0 0,-30" fill="#475569" />
                        <ellipse cx="0" cy="-30" rx="35" ry="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" transform="rotate(-35)" />
                        <line x1="0" y1="-30" x2="30" y2="-50" stroke="#0ea5e9" strokeWidth="2" />
                        <circle cx="30" cy="-50" r="3" fill="#38bdf8" />
                        <text x="0" y="20" textAnchor="middle" fill="#94a3b8" fontFamily="IBM Plex Mono" fontSize="9">
                          {selectedDish.id}
                        </text>
                      </g>

                      {/* Pulsing Radio Waves Traveling Across Space */}
                      <motion.g
                        animate={{ x: [110, 480], opacity: [0.8, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      >
                        <path d="M 0 30 Q 15 70 0 110" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                        <path d="M 12 35 Q 27 70 12 105" fill="none" stroke="#38bdf8" strokeWidth="2" />
                      </motion.g>

                      {/* Spacecraft Target on Right */}
                      <g transform="translate(510, 60)">
                        <rect x="-15" y="-15" width="30" height="30" rx="4" fill="#d97706" stroke="#f59e0b" strokeWidth="1.5" />
                        <line x1="-35" y1="0" x2="-15" y2="0" stroke="#60a5fa" strokeWidth="3" />
                        <line x1="15" y1="0" x2="35" y2="0" stroke="#60a5fa" strokeWidth="3" />
                        <ellipse cx="0" cy="-22" rx="14" ry="6" fill="#f8fafc" stroke="#94a3b8" />
                        <circle cx="0" cy="0" r="3" fill="#22c55e" className="animate-ping" />
                      </g>
                    </svg>

                    <div className="absolute bottom-2 left-3 font-mono text-[10px] text-muted-foreground">
                      AZ: {selectedDish.azimuth}° · EL: {selectedDish.elevation}°
                    </div>
                    <div className="absolute bottom-2 right-3 font-mono text-[10px] text-teal font-semibold">
                      DATA RATE: {selectedDish.dataRate}
                    </div>
                  </div>

                  {/* Telemetry Metrics 4-Box Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border/80 bg-background/40 p-3">
                      <div className="font-mono text-[10px] text-muted-foreground uppercase">
                        One-Way Light Time (OWLT)
                      </div>
                      <div className="mt-1 font-mono text-sm font-bold text-primary-glow">
                        {formatOwlt(selectedDish.owltSeconds)}
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                        RTLT: {formatOwlt(selectedDish.owltSeconds * 2)}
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/80 bg-background/40 p-3">
                      <div className="font-mono text-[10px] text-muted-foreground uppercase">
                        Distance from Earth
                      </div>
                      <div className="mt-1 font-mono text-sm font-bold text-foreground">
                        {dist.au} AU
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                        {dist.km}
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/80 bg-background/40 p-3">
                      <div className="font-mono text-[10px] text-muted-foreground uppercase">
                        Carrier Frequency & Power
                      </div>
                      <div className="mt-1 font-mono text-xs font-semibold text-foreground">
                        {selectedDish.band} · {selectedDish.freqGhz} GHz
                      </div>
                      <div className="font-mono text-[10px] text-teal mt-0.5">
                        Uplink: {selectedDish.uplinkKw} kW EIRP
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/80 bg-background/40 p-3">
                      <div className="font-mono text-[10px] text-muted-foreground uppercase">
                        Signal Level & Coding
                      </div>
                      <div className="mt-1 font-mono text-xs font-semibold text-foreground">
                        {selectedDish.downlinkDbm} dBm (RSSI)
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                        Turbo / Reed-Solomon (BER &lt; 10⁻⁶)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Station Details */}
                <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>Location: {selectedDish.location}</span>
                  <span className="text-primary-glow font-bold">NASA-JPL DSN REALTIME</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
