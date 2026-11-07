import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, Download, Copy, Check, ShieldCheck, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Artifact } from "@/data/types";

interface Props {
  artifact: Artifact;
  open: boolean;
  onClose: () => void;
}

export function NasaPdsModal({ artifact, open, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"pds4" | "json">("pds4");

  const pdsXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-model href="https://pds.nasa.gov/pds4/pds/v1/PDS4_PDS_1G00.sch" schematypens="http://purl.oclc.org/dsdl/schematron"?>
<Product_Ancillary xmlns="http://pds.nasa.gov/pds4/pds/v1"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://pds.nasa.gov/pds4/pds/v1 https://pds.nasa.gov/pds4/pds/v1/PDS4_PDS_1G00.xsd">
    <Identification_Area>
        <logical_identifier>urn:nasa:pds:space_apps:abandoned_heritage:${artifact.id}::1.0</logical_identifier>
        <version_id>1.0</version_id>
        <title>${artifact.name} — NASA Extraterrestrial Cultural Relic Record</title>
        <information_model_version>1.16.0.0</information_model_version>
        <product_class>Product_Ancillary</product_class>
        <Modification_History>
            <Modification_Detail>
                <modification_date>${new Date().toISOString().split("T")[0]}</modification_date>
                <version_id>1.0</version_id>
                <description>Cataloged for NASA Space Apps Challenge 2026: Abandoned but Not Forgotten.</description>
            </Modification_Detail>
        </Modification_History>
    </Identification_Area>
    <Observation_Area>
        <Time_Coordinates>
            <start_date_time>${artifact.launchDate ? `${artifact.launchDate}T00:00:00Z` : "UNKNOWN"}</start_date_time>
            <stop_date_time>${artifact.lastSignal ? `${artifact.lastSignal}T00:00:00Z` : "PERMANENT_ON_SITE"}</stop_date_time>
        </Time_Coordinates>
        <Investigation_Area>
            <name>${artifact.mission}</name>
            <type>Mission</type>
            <Internal_Reference>
                <lid_reference>urn:nasa:pds:context:investigation:mission.${artifact.mission.toLowerCase().replace(/[^a-z0-9]/g, "_")}</lid_reference>
                <reference_type>data_to_investigation</reference_type>
            </Internal_Reference>
        </Investigation_Area>
        <Target_Identification>
            <name>${artifact.bodyId ?? "Deep Space"}</name>
            <type>${artifact.bodyId === "moon" ? "Satellite" : artifact.bodyId ? "Planet" : "Interstellar"}</type>
        </Target_Identification>
    </Observation_Area>
    <Property_Maps>
        <Property_Map>
            <identifier>planetary_cartography</identifier>
            <title>Landing Site Coordinates & Heritage Protection</title>
            <property_map_entry>
                <property_name>landing_site_name</property_name>
                <property_value>${artifact.site ?? "In-Flight Trajectory"}</property_value>
            </property_map_entry>
            <property_map_entry>
                <property_name>latitude_deg</property_name>
                <property_value>${artifact.coords?.lat ?? "N/A"}</property_value>
            </property_map_entry>
            <property_map_entry>
                <property_name>longitude_deg</property_name>
                <property_value>${artifact.coords?.lon ?? "N/A"}</property_value>
            </property_map_entry>
            <property_map_entry>
                <property_name>heritage_act_protection</property_name>
                <property_value>Protected under U.S. Public Law 116-275 and UN Outer Space Treaty Article VIII</property_value>
            </property_map_entry>
            <property_map_entry>
                <property_name>archaeological_condition</property_name>
                <property_value>${artifact.finalCondition ?? "Hardware preserved intact on planetary surface"}</property_value>
            </property_map_entry>
        </Property_Map>
    </Property_Maps>
</Product_Ancillary>`;

  const pdsJson = JSON.stringify(
    {
      "@context": "https://pds.nasa.gov/context/pds4.jsonld",
      "@type": "Product_Ancillary",
      urn: `urn:nasa:pds:space_apps:abandoned_heritage:${artifact.id}::1.0`,
      name: artifact.name,
      mission: artifact.mission,
      agency: artifact.agency,
      targetBody: artifact.bodyId ?? "Deep Space",
      site: artifact.site ?? "Deep Space Trajectory",
      coordinates: artifact.coords ?? null,
      launchDate: artifact.launchDate,
      arrivalDate: artifact.arrivalDate,
      lastSignal: artifact.lastSignal,
      status: artifact.status,
      heritageProtection: {
        legalFramework: "U.S. One Small Step to Protect Human Heritage in Space Act (PL 116-275)",
        internationalTreaty: "UN Outer Space Treaty (1967) Article VIII (Jurisdiction and Ownership)",
        cosparCategory: "Category IVb / IVc (Decommissioned Planetary Artifact)",
      },
      archaeologicalState: {
        remains: artifact.remains,
        finalCondition: artifact.finalCondition,
        finalLocation: artifact.finalLocation,
      },
    },
    null,
    2
  );

  const activeContent = format === "pds4" ? pdsXml : pdsJson;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${artifact.id}_nasa_pds4.${format === "pds4" ? "xml" : "json"}`;
    const blob = new Blob([activeContent], { type: format === "pds4" ? "application/xml" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="relative w-full max-w-3xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] flex flex-col rounded-3xl border border-primary/40 bg-panel/95 shadow-2xl backdrop-blur-xl my-auto overflow-hidden"
          >
            {/* Header (Pinned) */}
            <div className="flex items-center justify-between border-b border-border/70 p-4 sm:p-5 pb-3 shrink-0 bg-panel/95 backdrop-blur z-20">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary-glow border border-primary/30">
                  <FileCode className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                    NASA PDS4 & Heritage Dossier Export
                  </h3>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Planetary Data System 4 Product Label & U.S. Heritage Act Registry
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-mono text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                title="Close (Esc)"
              >
                <span>Esc</span>
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-5 pt-3 scrollbar-thin space-y-4">

            {/* Legal Heritage Protection Banner */}
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-teal/40 bg-teal/10 p-3.5">
              <ShieldCheck className="size-5 text-teal shrink-0 mt-0.5" />
              <div className="text-xs text-foreground/90 leading-relaxed">
                <strong className="text-teal font-semibold">Protected Extraterrestrial Cultural Relic: </strong>
                Registered under the <em>One Small Step to Protect Human Heritage in Space Act</em> (PL 116-275) and Article VIII of the 1967 UN Outer Space Treaty. Deemed an inviolable historical monument of human civilization.
              </div>
            </div>

            {/* Format Toggle & Action Buttons */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-xl bg-background/60 p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setFormat("pds4")}
                  className={`rounded-lg px-3 py-1 text-xs font-mono transition-colors ${
                    format === "pds4" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  NASA PDS4 XML
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("json")}
                  className={`rounded-lg px-3 py-1 text-xs font-mono transition-colors ${
                    format === "json" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  JSON-LD Metadata
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-1.5 rounded-xl text-xs font-mono"
                >
                  {copied ? <Check className="size-3.5 text-teal" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="gap-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono hover:bg-primary/90"
                >
                  <Download className="size-3.5" /> Download .{format === "pds4" ? "xml" : "json"}
                </Button>
              </div>
            </div>

            {/* Code / Text Viewer */}
            <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-border bg-space p-4 font-mono text-[11px] leading-relaxed text-slate-300">
              <pre className="h-full overflow-auto pr-2 scrollbar-thin">
                <code>{activeContent}</code>
              </pre>
            </div>
          </div>

          {/* Footer (Pinned) */}
          <div className="shrink-0 border-t border-border/70 p-3 sm:p-4 flex items-center justify-between bg-panel/90 text-xs">
            <span className="font-mono text-[10px] text-muted-foreground">Press Esc or click outside to dismiss</span>
            <Button size="sm" variant="glass" onClick={onClose} className="text-xs h-7">
              Close Dossier
            </Button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
}

