import { useMemo } from "react";
import { investigationData } from "@/data/investigation";
import { Disclaimer, Metric, Reveal, SectionHeader, Tag } from "@/components/ui/instrument";
import { useInView } from "@/lib/scroll";
import earthImg from "@/assets/earth-map.jpg";
import { useImagerySrc } from "@/lib/imagery";

/** Deterministic pseudo-random so SSR and client render identically. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

interface Particle {
  d: string;
  delay: number;
  dur: number;
}

function useParticles(count: number): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const sx = 62 + rand(i + 1) * 22;
        const sy = 34 + rand(i + 7) * 26;
        const cx = 44 + rand(i + 13) * 16;
        const cy = 26 + rand(i + 19) * 34;
        const ex = 20 + rand(i + 23) * 8;
        const ey = 52 + rand(i + 29) * 10;
        return {
          d: `M ${sx.toFixed(2)} ${sy.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`,
          delay: rand(i + 31) * 3.2,
          dur: 3.4 + rand(i + 37) * 2.6,
        };
      }),
    [count],
  );
}

export function HindcastScene() {
  const { hindcast, investigation } = investigationData;
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const particles = useParticles(48);
  const chart = useImagerySrc("chart", earthImg);

  return (
    <section id="reconstruct" className="relative border-t border-border bg-void py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeader
          chapter="04 · BACKWARD HINDCAST"
          title="DRIFT RECONSTRUCTION"
          subtitle="Detected slick geometry is seeded with virtual particles and advected backwards through ocean current and wind hindcast fields to estimate a candidate origin region."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div ref={ref} className="relative overflow-hidden border border-border bg-navy/30">
              <img
                src={chart}
                alt="Regional chart basemap of the Arabian Sea used for drift reconstruction"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover opacity-30 saturate-50"
              />
              <div className="pointer-events-none absolute inset-0 grid-fine opacity-50" />

              <svg
                viewBox="0 0 100 80"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                {/* current field hint */}
                {Array.from({ length: 7 }, (_, i) => (
                  <path
                    key={`f${i}`}
                    d={`M 96 ${8 + i * 10} C 70 ${12 + i * 10}, 44 ${4 + i * 10}, 4 ${10 + i * 10}`}
                    fill="none"
                    stroke="oklch(0.42 0.055 235 / 45%)"
                    strokeWidth="0.25"
                    strokeDasharray="2 3"
                  />
                ))}

                {inView
                  ? particles.map((p, i) => (
                      <g key={i}>
                        <path d={p.d} fill="none" stroke="oklch(0.82 0.108 205 / 14%)" strokeWidth="0.18" />
                        <circle r="0.55" fill="oklch(0.82 0.108 205 / 85%)">
                          <animateMotion
                            dur={`${p.dur}s`}
                            begin={`${p.delay}s`}
                            repeatCount="indefinite"
                            path={p.d}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;1;1;0"
                            dur={`${p.dur}s`}
                            begin={`${p.delay}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    ))
                  : null}

                {/* slick footprint */}
                <ellipse
                  cx="72"
                  cy="46"
                  rx="11"
                  ry="7"
                  fill="oklch(0.82 0.108 205 / 8%)"
                  stroke="oklch(0.82 0.108 205 / 70%)"
                  strokeWidth="0.3"
                />
                {/* candidate origin uncertainty */}
                <circle
                  cx="24"
                  cy="57"
                  r="9"
                  fill="oklch(0.78 0.12 75 / 8%)"
                  stroke="oklch(0.78 0.12 75 / 70%)"
                  strokeWidth="0.3"
                  strokeDasharray="1.6 1.6"
                />
                <circle cx="24" cy="57" r="0.9" fill="oklch(0.78 0.12 75)" />
              </svg>

              <div className="absolute top-3 left-3">
                <Tag>T-{hindcast.durationHours}H BACKWARD</Tag>
              </div>
              <div className="absolute right-3 bottom-3 text-right">
                <p className="tele-sm text-warn/80">CANDIDATE ORIGIN</p>
                <p className="tele-sm text-muted-foreground/70">
                  {hindcast.candidateOrigin.latitude.toFixed(3)}N{" "}
                  {hindcast.candidateOrigin.longitude.toFixed(3)}E {hindcast.candidateOrigin.uncertainty}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <Metric label="Hindcast window" value={String(hindcast.durationHours)} unit="hours" />
                <Metric label="Particles" value={String(hindcast.particles)} />
                <Metric label="Currents" value={hindcast.currents} />
                <Metric label="Wind" value={hindcast.wind} />
                <Metric label="Slick centroid" value={`${investigation.latitude.toFixed(3)}N`} />
                <Metric label="Origin estimate" value={`${hindcast.candidateOrigin.latitude.toFixed(3)}N`} />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="panel p-5">
                <p className="tele-sm text-muted-foreground">METHOD</p>
                <ol className="mt-3 space-y-2">
                  {[
                    "Seed particles across the detected slick polygon",
                    "Advect backwards with current + wind drift",
                    "Cluster terminal positions into an origin region",
                    "Propagate positional uncertainty into the search radius",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="tele-sm text-signal/70">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[12px] leading-relaxed text-foreground/80">{s}</span>
                    </li>
                  ))}
                </ol>
                <Disclaimer>
                  Hindcast output is an estimated region, not a point source. Drift error grows with
                  the reconstruction window.
                </Disclaimer>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
