import { Suspense, lazy, useEffect, useState } from "react";
import { band, range, useSectionProgress } from "@/lib/scroll";
import { investigationData } from "@/data/investigation";

const EarthScene = lazy(() => import("./three/EarthScene"));

function Telemetry({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="tele-sm text-muted-foreground/50">{label}</span>
      {value ? <span className="tele-sm text-foreground/70">{value}</span> : null}
    </div>
  );
}

export function CinematicOpening() {
  const { ref, progress, progressRef } = useSectionProgress<HTMLDivElement>();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { investigation } = investigationData;

  const hero = 1 - range(progress, 0.05, 0.18);
  const coords = band(progress, 0.32, 0.4, 0.62, 0.72);
  const regionTag = band(progress, 0.46, 0.54, 0.82, 0.92);
  const gridOpacity = band(progress, 0.3, 0.42, 0.85, 0.95);
  const marker = band(progress, 0.5, 0.58, 0.88, 0.96);
  const blackout = range(progress, 0.9, 1);

  return (
    <section id="observe" ref={ref} className="relative h-[560vh] bg-void">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          {mounted ? (
            <Suspense fallback={<div className="h-full w-full bg-void" />}>
              <EarthScene progressRef={progressRef} />
            </Suspense>
          ) : (
            <div className="h-full w-full bg-void" />
          )}
        </div>

        {/* geographic grid */}
        <div
          className="pointer-events-none absolute inset-0 grid-fine transition-opacity duration-300"
          style={{ opacity: gridOpacity * 0.6 }}
        />

        {/* frame ticks */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-6 left-6 h-8 w-8 border-t border-l border-signal/30" />
          <div className="absolute top-6 right-6 h-8 w-8 border-t border-r border-signal/30" />
          <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-signal/30" />
          <div className="absolute right-6 bottom-6 h-8 w-8 border-r border-b border-signal/30" />
        </div>

        {/* telemetry corners */}
        <div className="pointer-events-none absolute inset-0 px-10 py-10">
          <div className="flex justify-between">
            <div className="space-y-1.5">
              <Telemetry label="SAR PLATFORM" value="SENTINEL-1" />
              <Telemetry label="ORBITAL OBSERVATION" />
              <Telemetry label="PASS" value="004275" />
            </div>
            <div className="space-y-1.5 text-right">
              <Telemetry label="INDIAN OCEAN REGION" />
              <Telemetry label="MODE" value="IW · VV" />
              <Telemetry label="INVESTIGATION" value={investigation.id} />
            </div>
          </div>
        </div>

        {/* hero copy */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: hero, transform: `translateY(${(1 - hero) * -24}px)` }}
        >
          <p className="tele mb-6 text-signal/80">SIH 26143 · NTRO</p>
          <h1 className="font-display text-[clamp(2.4rem,7vw,5.6rem)] leading-[0.95] font-light tracking-[0.12em] text-foreground">
            MARITIME
            <br />
            INTELLIGENCE
          </h1>
          <div className="my-6 h-px w-40 bg-gradient-to-r from-transparent via-signal/60 to-transparent" />
          <p className="max-w-xl text-sm font-light tracking-wide text-muted-foreground">
            Satellite-driven maritime anomaly detection &amp; vessel attribution
          </p>
          <p className="tele-sm mt-14 animate-blink-soft text-signal/70">
            SCROLL TO INVESTIGATE ↓
          </p>
        </div>

        {/* coordinate readout */}
        <div
          className="pointer-events-none absolute top-1/2 left-10 -translate-y-1/2 space-y-2"
          style={{ opacity: coords }}
        >
          <p className="font-mono text-xs tracking-[0.2em] text-signal/80">18°–20° N</p>
          <p className="font-mono text-xs tracking-[0.2em] text-signal/80">72°–74° E</p>
          <div className="h-px w-16 bg-signal/30" />
          <p className="tele-sm text-muted-foreground/60">GEODETIC FRAME · WGS84</p>
        </div>

        {/* target marker */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: marker }}
        >
          <div className="relative">
            <div className="absolute -inset-10 rounded-full border border-signal/25 animate-pulse-ring" />
            <div className="h-24 w-24 rounded-full border border-signal/50" />
            <div className="absolute top-1/2 left-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 bg-signal/25" />
            <div className="absolute top-1/2 left-1/2 h-40 w-px -translate-x-1/2 -translate-y-1/2 bg-signal/25" />
            <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
            <p className="tele-sm absolute top-full left-1/2 mt-6 w-56 -translate-x-1/2 text-center text-signal/70">
              {investigation.latitude.toFixed(4)}° N · {investigation.longitude.toFixed(4)}° E
            </p>
          </div>
        </div>

        {/* region tag */}
        <div
          className="pointer-events-none absolute right-10 bottom-24 text-right"
          style={{ opacity: regionTag }}
        >
          <p className="tele text-muted-foreground/60">OBSERVATION REGION</p>
          <p className="font-display mt-2 text-lg font-light tracking-[0.2em] text-foreground">
            WESTERN INDIA · ARABIAN SEA
          </p>
          <div className="mt-3 ml-auto h-px w-24 bg-signal/40" />
        </div>

        {/* fade to black for the handoff into the vessel scene */}
        <div
          className="pointer-events-none absolute inset-0 bg-void"
          style={{ opacity: blackout }}
        />
      </div>
    </section>
  );
}
