import { useState } from "react";
import { fusionChain, investigationData } from "@/data/investigation";
import { Disclaimer, Reveal, SectionHeader, StrengthBar, Tag } from "@/components/ui/instrument";

const trackColor = {
  strong: "oklch(0.82 0.108 205 / 90%)",
  weak: "oklch(0.72 0.075 225 / 55%)",
  background: "oklch(0.5 0.03 240 / 45%)",
} as const;

function toPath(track: [number, number][]) {
  return track
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${(50 + x * 44).toFixed(2)} ${(50 + y * 44).toFixed(2)}`)
    .join(" ");
}

export function AttributionScene() {
  const { vessels } = investigationData;
  const [activeMmsi, setActiveMmsi] = useState(vessels[0]!.mmsi);
  const active = vessels.find((v) => v.mmsi === activeMmsi) ?? vessels[0]!;

  return (
    <section id="attribute" className="relative border-t border-border bg-charcoal/40 py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeader
          chapter="05 · SPATIOTEMPORAL MATCHING"
          title="VESSEL ATTRIBUTION"
          subtitle="AIS tracks intersecting the candidate origin region within the hindcast window are reconstructed and ranked by fused evidence strength."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <div className="relative overflow-hidden border border-border bg-void">
              <svg viewBox="0 0 100 100" className="aspect-square w-full">
                <rect width="100" height="100" fill="oklch(0.12 0.008 250)" />
                {Array.from({ length: 9 }, (_, i) => (
                  <g key={i}>
                    <line x1={(i + 1) * 10} y1="0" x2={(i + 1) * 10} y2="100" stroke="oklch(0.98 0.005 240 / 7%)" strokeWidth="0.2" />
                    <line x1="0" y1={(i + 1) * 10} x2="100" y2={(i + 1) * 10} stroke="oklch(0.98 0.005 240 / 7%)" strokeWidth="0.2" />
                  </g>
                ))}

                <circle cx="50" cy="50" r="16" fill="oklch(0.78 0.12 75 / 7%)" stroke="oklch(0.78 0.12 75 / 60%)" strokeWidth="0.3" strokeDasharray="1.6 1.6" />
                <circle cx="50" cy="50" r="1" fill="oklch(0.78 0.12 75)" />

                {vessels.map((v) => {
                  const isActive = v.mmsi === active.mmsi;
                  const last = v.track[v.track.length - 1]!;
                  return (
                    <g
                      key={v.mmsi}
                      onMouseEnter={() => setActiveMmsi(v.mmsi)}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        d={toPath(v.track)}
                        fill="none"
                        stroke={trackColor[v.relevance]}
                        strokeWidth={isActive ? 0.7 : 0.35}
                        strokeDasharray={isActive ? undefined : "2 2"}
                        opacity={isActive ? 1 : 0.6}
                      />
                      <circle
                        cx={50 + last[0] * 44}
                        cy={50 + last[1] * 44}
                        r={isActive ? 1.3 : 0.8}
                        fill={trackColor[v.relevance]}
                      />
                      <text
                        x={50 + last[0] * 44}
                        y={50 + last[1] * 44 - 2.4}
                        fontSize="2.4"
                        textAnchor="middle"
                        fill={isActive ? "oklch(0.95 0.004 240)" : "oklch(0.66 0.016 245 / 70%)"}
                        style={{ letterSpacing: "0.12em" }}
                      >
                        {v.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute top-3 left-3">
                <Tag>AIS RECONSTRUCTION · GFW</Tag>
              </div>
              <div className="absolute right-3 bottom-3">
                <p className="tele-sm text-muted-foreground/70">LOCAL FRAME · ORIGIN-CENTRED</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="panel overflow-hidden">
                <div className="grid grid-cols-[2.2rem_1fr_6rem_5rem] gap-2 border-b border-border px-4 py-3">
                  {["#", "VESSEL", "MMSI", "SCORE"].map((h) => (
                    <span key={h} className="tele-sm text-muted-foreground/60">
                      {h}
                    </span>
                  ))}
                </div>
                {vessels.map((v) => {
                  const isActive = v.mmsi === active.mmsi;
                  return (
                    <button
                      key={v.mmsi}
                      type="button"
                      onClick={() => setActiveMmsi(v.mmsi)}
                      className={`grid w-full grid-cols-[2.2rem_1fr_6rem_5rem] items-center gap-2 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0 ${
                        isActive ? "bg-signal/10" : "hover:bg-accent/40"
                      }`}
                    >
                      <span className={`font-mono text-xs ${isActive ? "text-signal" : "text-muted-foreground"}`}>
                        {String(v.rank).padStart(2, "0")}
                      </span>
                      <span className="truncate font-mono text-[12px] tracking-[0.1em] text-foreground">
                        {v.name}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">{v.mmsi}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {v.score === null ? "PENDING" : v.score.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="panel p-5">
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-lg font-light tracking-[0.18em] text-foreground">
                    {active.name}
                  </p>
                  <Tag tone="muted">
                    {active.flag} · {active.type}
                  </Tag>
                </div>
                <p className="tele-sm mt-1 text-muted-foreground">
                  IMO {active.imo} · CALLSIGN {active.callsign}
                </p>

                <div className="mt-5 space-y-4">
                  <StrengthBar label="Spatial proximity" value={active.evidence.spatialProximity} />
                  <StrengthBar label="Temporal consistency" value={active.evidence.temporalConsistency} />
                  <StrengthBar label="Trajectory consistency" value={active.evidence.trajectoryConsistency} />
                  <StrengthBar label="AIS persistence" value={active.evidence.aisPersistence} />
                </div>

                <Disclaimer>
                  Evidence strengths are qualitative indicators. No numeric guilt probability is
                  produced, and ranking is not an accusation of discharge.
                </Disclaimer>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {fusionChain.map((s, i) => (
                  <span key={s} className="tele-sm flex items-center gap-2">
                    <span className="border border-border px-2 py-1 text-muted-foreground">{s}</span>
                    {i < fusionChain.length - 1 ? <span className="text-signal/50">→</span> : null}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
