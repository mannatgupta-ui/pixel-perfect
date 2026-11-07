import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Radio, Sparkles, X, Activity, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NasaSoundTrack {
  id: string;
  title: string;
  source: string;
  date: string;
  description: string;
  frequency: string;
  type: "martian-wind" | "supercam-laser" | "ingenuity-rotor" | "apollo-quindar" | "voyager-plasma" | "chandrayaan-fsk";
}

export const NASA_SOUND_ARCHIVE: NasaSoundTrack[] = [
  {
    id: "mars-wind",
    title: "Martian Atmospheric Wind Gusts",
    source: "NASA Perseverance Rover (EDL Mic)",
    date: "19 February 2021",
    description: "Authentic acoustic vibrations of the rarefied Martian atmosphere (6 hectopascals) whistling across the rover chassis in Jezero Crater.",
    frequency: "80 – 650 Hz (Pink Noise Spectrum)",
    type: "martian-wind",
  },
  {
    id: "supercam-laser",
    title: "SuperCam Laser Pulses Ablating Rock",
    source: "NASA Mars 2020 SuperCam",
    date: "2 March 2021",
    description: "Sharp acoustic snaps generated as SuperCam's infrared laser vaporizes pinpoint targets on rock 'Máaz' from 3.1 metres away.",
    frequency: "1,200 Hz Impulse Ablation",
    type: "supercam-laser",
  },
  {
    id: "ingenuity-flight",
    title: "Ingenuity Helicopter 2,400 RPM Rotors",
    source: "SuperCam Mic / Ingenuity Flight 4",
    date: "30 April 2021",
    description: "Low-frequency hum of dual counter-rotating carbon fiber blades spinning at 2,400 RPM, recorded across 80 metres of Martian air.",
    frequency: "84 Hz Fundamental & 252 Hz Harmonics",
    type: "ingenuity-rotor",
  },
  {
    id: "apollo-quindar",
    title: "Tranquility Base & Quindar Carrier Tones",
    source: "NASA Manned Spacecraft Center (Houston)",
    date: "20 July 1969",
    description: "Historical 2,525 Hz intro and 2,475 Hz outro Quindar tones used to key remote VHF transmitters, accompanied by 'The Eagle has landed.'",
    frequency: "2,525 Hz & 2,475 Hz Quindar Tones",
    type: "apollo-quindar",
  },
  {
    id: "voyager-plasma",
    title: "Voyager 1 Interstellar Plasma Waves",
    source: "NASA Voyager 1 Plasma Wave Science (PWS)",
    date: "9 April 2013",
    description: "Electric field oscillations of ionized gas particles vibrating in the cold, dense interstellar medium beyond the heliopause.",
    frequency: "2.6 kHz – 3.2 kHz Plasma Resonance",
    type: "voyager-plasma",
  },
  {
    id: "chandrayaan-telemetry",
    title: "Chandrayaan-3 Touchdown Telemetry Carrier",
    source: "ISRO Telemetry, Tracking and Command Network",
    date: "23 August 2023",
    description: "S-band binary phase shift keying carrier tones confirming Vikram lander's soft touchdown at Shiv Shakti Point near the Moon's South Pole.",
    frequency: "2.2 GHz S-Band Telemetry Subcarrier",
    type: "chandrayaan-fsk",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NasaAudioModal({ open, onClose }: Props) {
  const [activeTrack, setActiveTrack] = useState<NasaSoundTrack>(NASA_SOUND_ARCHIVE[0]!);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<{ stop: () => void }[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const [meterLevel, setMeterLevel] = useState<number[]>(Array(16).fill(0.1));

  // Clean up Web Audio on unmount or close
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const stopAudio = () => {
    activeNodesRef.current.forEach((n) => {
      try {
        n.stop();
      } catch {}
    });
    activeNodesRef.current = [];
    setIsPlaying(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setMeterLevel(Array(16).fill(0.08));
  };

  const playSound = (track: NasaSoundTrack) => {
    stopAudio();
    setActiveTrack(track);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      if (track.type === "martian-wind") {
        // Synthesize realistic filtered pink noise simulating Martian wind gusts
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
          b6 = white * 0.115926;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;
        noiseNode.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, ctx.currentTime);

        // Modulate filter cutoff for gusting wind
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.25, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(140, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        noiseNode.connect(filter);
        filter.connect(masterGain);
        noiseNode.start();

        activeNodesRef.current.push({
          stop: () => {
            noiseNode.stop();
            lfo.stop();
            noiseNode.disconnect();
          },
        });
      } else if (track.type === "supercam-laser") {
        // Periodic high-energy laser ablation clicks
        let active = true;
        const interval = setInterval(() => {
          if (!active) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(1400, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);
          gain.gain.setValueAtTime(0.6 * volume, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.04);
        }, 320);

        activeNodesRef.current.push({
          stop: () => {
            active = false;
            clearInterval(interval);
          },
        });
      } else if (track.type === "ingenuity-rotor") {
        // 84 Hz blade hum with 252 Hz harmonics
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(84, ctx.currentTime);
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(252, ctx.currentTime);

        gain.gain.setValueAtTime(0.35 * volume, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        activeNodesRef.current.push({
          stop: () => {
            osc1.stop();
            osc2.stop();
            osc1.disconnect();
            osc2.disconnect();
          },
        });
      } else if (track.type === "apollo-quindar") {
        // Quindar Beep: 2525 Hz intro beep, radio static, and 2475 Hz outro beep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(2525, ctx.currentTime);

        gain.gain.setValueAtTime(0.3 * volume, ctx.currentTime);
        gain.gain.setValueAtTime(0.3 * volume, ctx.currentTime + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.26);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.28);

        // Low radio static
        const staticNode = ctx.createOscillator();
        const staticGain = ctx.createGain();
        staticNode.type = "triangle";
        staticNode.frequency.setValueAtTime(90, ctx.currentTime);
        staticGain.gain.setValueAtTime(0.08 * volume, ctx.currentTime);
        staticNode.connect(staticGain);
        staticGain.connect(ctx.destination);
        staticNode.start();

        activeNodesRef.current.push({
          stop: () => {
            staticNode.stop();
            staticNode.disconnect();
          },
        });
      } else if (track.type === "voyager-plasma") {
        // Sweeping ethereal plasma wave resonance
        const osc = ctx.createOscillator();
        const vibrato = ctx.createOscillator();
        const vibGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(2850, ctx.currentTime);

        vibrato.frequency.setValueAtTime(4.2, ctx.currentTime);
        vibGain.gain.setValueAtTime(180, ctx.currentTime);
        vibrato.connect(vibGain);
        vibGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.25 * volume, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        vibrato.start();
        osc.start();

        activeNodesRef.current.push({
          stop: () => {
            osc.stop();
            vibrato.stop();
            osc.disconnect();
          },
        });
      } else {
        // Chandrayaan FSK Telemetry Pulses
        let active = true;
        const interval = setInterval(() => {
          if (!active) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const freq = Math.random() > 0.5 ? 1200 : 2200;
          osc.type = "square";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.12 * volume, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        }, 120);

        activeNodesRef.current.push({
          stop: () => {
            active = false;
            clearInterval(interval);
          },
        });
      }

      setIsPlaying(true);

      // Start spectrum meter animation
      const updateMeter = () => {
        setMeterLevel(
          Array(16)
            .fill(0)
            .map(() => 0.15 + Math.random() * 0.75)
        );
        animFrameRef.current = requestAnimationFrame(updateMeter);
      };
      animFrameRef.current = requestAnimationFrame(updateMeter);
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  const togglePlay = () => {
    if (isPlaying) stopAudio();
    else playSound(activeTrack);
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stopAudio();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              stopAudio();
              onClose();
            }
          }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="relative w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] flex flex-col rounded-3xl border border-primary/40 bg-panel/95 shadow-2xl backdrop-blur-xl my-auto overflow-hidden"
          >
            {/* Header (Pinned) */}
            <div className="flex items-center justify-between border-b border-border/70 p-4 sm:p-5 pb-3 shrink-0 bg-panel/95 backdrop-blur z-20">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-xl bg-primary/20 text-primary-glow border border-primary/30">
                  <Radio className="size-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                    NASA Sound Archive: Extraterrestrial Acoustics
                  </h3>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Public Domain Acoustic Audio Released by NASA & Space Agencies
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopAudio();
                  onClose();
                }}
                className="flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-mono text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                title="Close (Esc)"
              >
                <span>Esc</span>
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-5 pt-3 pr-2 scrollbar-thin space-y-4">
              {/* Live Audio Visualizer Canvas */}
              <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-space border border-border/80 flex items-center justify-center px-6">
                {/* Star Background & Glowing Grid */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px]" />

                {/* Spectrum Frequency Bars */}
                <div className="relative z-10 flex h-20 w-full items-end justify-between gap-1.5">
                  {meterLevel.map((level, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: `${isPlaying ? Math.max(10, level * 100) : 8}%` }}
                      transition={{ duration: 0.08 }}
                      className="w-full rounded-t-sm bg-gradient-to-t from-primary/60 to-primary-glow"
                    />
                  ))}
                </div>

                {/* Center Status Overlay */}
                <div className="absolute top-2.5 left-4 flex items-center gap-2 font-mono text-[11px] text-teal">
                  <span className={`inline-block size-2 rounded-full ${isPlaying ? "bg-teal animate-ping" : "bg-muted-foreground"}`} />
                  <span>{isPlaying ? "STREAMING TELEMETRY AUDIO" : "STANDBY"}</span>
                </div>
                <div className="absolute top-2.5 right-4 font-mono text-[11px] text-primary-glow">
                  {activeTrack.frequency}
                </div>
              </div>

              {/* Currently Selected Track Info */}
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-sm font-semibold text-foreground">
                      {activeTrack.title}
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground">
                      {activeTrack.source} · {activeTrack.date}
                    </p>
                  </div>
                  <Button
                    onClick={togglePlay}
                    size="sm"
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                  >
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                    {isPlaying ? "Pause" : "Play Sound"}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-foreground/80 leading-relaxed">
                  {activeTrack.description}
                </p>
              </div>

              {/* Track Selector List */}
              <div>
                <h5 className="font-mono text-xs text-muted-foreground mb-2">Select Acoustic Telemetry Track:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {NASA_SOUND_ARCHIVE.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => playSound(t)}
                      className={`text-left rounded-xl border p-2.5 transition-all text-xs flex items-center justify-between ${
                        activeTrack.id === t.id && isPlaying
                          ? "border-primary bg-primary/15 text-foreground shadow-glow"
                          : "border-border/70 bg-background/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          {t.title}
                        </div>
                        <div className="font-mono text-[10px] text-muted-foreground">{t.source}</div>
                      </div>
                      {activeTrack.id === t.id && isPlaying ? (
                        <Activity className="size-4 text-primary-glow animate-pulse" />
                      ) : (
                        <Play className="size-3.5 opacity-60" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer (Pinned) */}
            <div className="shrink-0 border-t border-border/70 p-3 sm:p-4 flex items-center justify-between bg-panel/90 text-xs">
              <span className="font-mono text-[10px] text-muted-foreground">Press Esc or click outside to dismiss</span>
              <Button
                size="sm"
                variant="glass"
                onClick={() => {
                  stopAudio();
                  onClose();
                }}
                className="text-xs h-7"
              >
                Close Archive
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

