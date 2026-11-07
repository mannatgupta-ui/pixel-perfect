import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orbit, Compass, Calculator, X, Sparkles, ArrowRight, Zap, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NasaOrbitalDynamicsModal({ open, onClose }: Props) {
  const [approachVelocity, setApproachVelocity] = useState(14); // km/s
  const [flybyBody, setFlybyBody] = useState<"jupiter" | "saturn" | "earth" | "venus">("jupiter");
  const [periapsisAltitude, setPeriapsisAltitude] = useState(200000); // km

  const BODIES_DATA = {
    jupiter: { name: "Jupiter", gm: 126686534, orbitalVelocity: 13.07, radiusKm: 69911, color: "#ca8a04" },
    saturn: { name: "Saturn", gm: 37931187, orbitalVelocity: 9.68, radiusKm: 58232, color: "#d97706" },
    earth: { name: "Earth", gm: 398600, orbitalVelocity: 29.78, radiusKm: 6371, color: "#38bdf8" },
    venus: { name: "Venus", gm: 324859, orbitalVelocity: 35.02, radiusKm: 6052, color: "#f59e0b" },
  };

  const body = BODIES_DATA[flybyBody];

  // Calculate gravity assist boost:
  // r_peri = radius + altitude
  const rPeri = body.radiusKm + periapsisAltitude;
  // Bending angle delta: sin(delta / 2) = 1 / (1 + (r_peri * v_inf^2 / GM))
  const vInf = approachVelocity;
  const denom = 1 + (rPeri * (vInf ** 2)) / body.gm;
  const deltaRad = 2 * Math.asin(Math.min(1, Math.max(0, 1 / denom)));
  const deltaDeg = (deltaRad * 180) / Math.PI;

  // Maximum theoretical velocity gained from trailing hemisphere flyby:
  const deltaVGain = 2 * body.orbitalVelocity * Math.sin(deltaRad / 2);
  const finalVelocity = approachVelocity + deltaVGain;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-primary/40 bg-panel/95 p-6 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary-glow border border-primary/30">
                  <Orbit className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                    NASA JPL Horizons Orbital Dynamics & Gravity Slingshot Simulator
                  </h3>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Planetary Gravitational Assists · Vis-Viva Velocity · Hyperbolic Escape
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

            {/* Visual Gravity Assist Vector Canvas */}
            <div className="mt-5 relative h-40 w-full overflow-hidden rounded-2xl border border-border bg-space flex items-center justify-center">
              <svg viewBox="0 0 700 160" className="w-full h-full">
                {/* Starfield */}
                {Array.from({ length: 40 }).map((_, i) => (
                  <circle key={i} cx={(i * 31) % 700} cy={(i * 17) % 160} r="1" fill="#ffffff" opacity="0.3" />
                ))}

                {/* Central Gravity Assist Planet */}
                <g transform="translate(350, 95)">
                  <circle cx="0" cy="0" r="32" fill={body.color} />
                  <ellipse cx="0" cy="0" rx="34" ry="12" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
                  <text x="0" y="48" textAnchor="middle" fill="#fed7aa" fontFamily="IBM Plex Mono" fontSize="10" fontWeight="bold">
                    {body.name.toUpperCase()} (v = {body.orbitalVelocity} km/s)
                  </text>
                </g>

                {/* Incoming & Outgoing Hyperbolic Slingshot Arc */}
                <motion.path
                  animate={{ pathLength: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  d="M 80 130 C 240 130 320 60 350 50 C 380 40 450 15 620 20"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="6 3"
                />

                {/* Trajectory Arrow Heads */}
                <line x1="120" y1="130" x2="160" y2="130" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                <line x1="520" y1="20" x2="570" y2="20" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />

                <text x="140" y="115" textAnchor="middle" fill="#f59e0b" fontFamily="IBM Plex Mono" fontSize="9">
                  v_in = {approachVelocity} km/s
                </text>
                <text x="540" y="42" textAnchor="middle" fill="#22c55e" fontFamily="IBM Plex Mono" fontSize="10" fontWeight="bold">
                  v_out = {finalVelocity.toFixed(1)} km/s (+{deltaVGain.toFixed(1)})
                </text>
              </svg>

              <div className="absolute top-2.5 left-4 font-mono text-[10px] text-teal">
                HYPERBOLIC DEFLECTION ANGLE: δ = {deltaDeg.toFixed(1)}°
              </div>
            </div>

            {/* Interactive Inputs */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Flyby Body Select */}
              <div className="rounded-xl border border-border/80 bg-background/40 p-3">
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1.5">
                  Gravity Assist Body:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["jupiter", "saturn", "earth", "venus"] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFlybyBody(b)}
                      className={`rounded-lg py-1 px-2 text-xs font-mono uppercase transition-colors ${
                        flybyBody === b ? "bg-primary text-primary-foreground font-bold" : "border border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Approach Velocity Slider */}
              <div className="rounded-xl border border-border/80 bg-background/40 p-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase mb-1">
                  <span>Approach Speed (v_inf):</span>
                  <span className="text-primary-glow font-bold">{approachVelocity} km/s</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={approachVelocity}
                  onChange={(e) => setApproachVelocity(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer mt-2"
                />
              </div>

              {/* Periapsis Altitude Slider */}
              <div className="rounded-xl border border-border/80 bg-background/40 p-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase mb-1">
                  <span>Closest Approach (h_p):</span>
                  <span className="text-teal font-bold">{(periapsisAltitude / 1000).toFixed(0)}k km</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="25000"
                  value={periapsisAltitude}
                  onChange={(e) => setPeriapsisAltitude(Number(e.target.value))}
                  className="w-full accent-teal cursor-pointer mt-2"
                />
              </div>
            </div>

            {/* Physics Formulation & Explanation */}
            <div className="mt-4 rounded-xl border border-border/70 bg-space p-3.5 font-mono text-[11px] text-foreground/80 leading-relaxed">
              <div className="text-primary-glow font-semibold mb-1">Vis-Viva Orbital Equation & Slingshot Mechanics:</div>
              $$v = \sqrt{'{'}\mu \left(\frac{'{'}2{'}'}{'{'}r{'}'} - \frac{'{'}1{'}'}{'{'}a{'}'}\right){'}'} \qquad \Delta v_{'{'}boost{'}'} = 2 v_{'{'}planet{'}'} \sin\left(\frac{'{'}\delta{'}'}{'{'}2{'}'}\right)$$
              <div className="mt-2 text-muted-foreground text-[10px]">
                Spacecraft steals kinetic energy from the planet's heliocentric orbit without burning rocket fuel, accelerating toward solar system escape velocity. Used by Voyager 1/2, Cassini, and New Horizons.
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
