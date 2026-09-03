import sarImg from "@/assets/sar-scene.jpg";
import { investigationData } from "@/data/investigation";
import { Disclaimer, Metric, Reveal, SectionHeader, Tag } from "@/components/ui/instrument";
import { useInView } from "@/lib/scroll";

const MASK_POINTS =
  "31,26 42,22 55,29 63,41 72,52 76,64 70,73 58,74 47,66 39,54 33,42";

export function SarScene() {
  const { sar, investigation } = investigationData;
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section id="locate" className="relative border-t border-border bg-void py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeader
          chapter="03 · SAR OBSERVATION"
          title="SENTINEL-1 SAR"
          subtitle="Single-look grayscale backscatter over the observation region. A low-backscatter (dark) region has been segmented as a candidate anomaly."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div ref={ref} className="relative overflow-hidden border border-border">
              <img
                src={sarImg}
                alt="Sentinel-1 SAR grayscale backscatter image of the ocean surface with a dark anomaly"
                width={1280}
                height={1280}
                loading="lazy"
                className="aspect-square w-full object-cover grayscale"
              />
              <div className="pointer-events-none absolute inset-0 scanline opacity-40" />
              <div className="pointer-events-none absolute inset-0 grid-field opacity-25" />

              <svg
                viewBox="0 0 100 100"
                className="pointer-events-none absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <polygon
                  points={MASK_POINTS}
                  fill="oklch(0.82 0.108 205 / 12%)"
                  stroke="oklch(0.82 0.108 205 / 85%)"
                  strokeWidth="0.35"
                  strokeDasharray="180"
                  strokeDashoffset={inView ? 0 : 180}
                  style={{ transition: "stroke-dashoffset 2.4s ease-out, opacity .8s", opacity: inView ? 1 : 0 }}
                />
                <line x1="63" y1="41" x2="88" y2="18" stroke="oklch(0.82 0.108 205 / 55%)" strokeWidth="0.2" />
                <circle cx="88" cy="18" r="0.7" fill="oklch(0.82 0.108 205)" />
              </svg>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-sweep bg-gradient-to-b from-transparent via-signal/10 to-transparent" />

              <div className="absolute top-3 left-3">
                <Tag>REGION {sar.regionId}</Tag>
              </div>
              <div className="absolute right-3 bottom-3 text-right">
                <p className="tele-sm text-foreground/70">VV POLARIZATION · IW</p>
                <p className="tele-sm text-muted-foreground/70">
                  {investigation.latitude.toFixed(4)}N {investigation.longitude.toFixed(4)}E
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <Metric label="Observation time" value="2026-08-25 01:02" unit="UTC" />
                <Metric label="Region ID" value={String(sar.regionId)} />
                <Metric label="Candidate area" value={String(sar.areaPixels)} unit="pixels" />
                <Metric label="VV median" value={sar.vvMedianDb.toFixed(2)} unit="dB" />
                <Metric label="Background median" value={sar.backgroundMedianDb.toFixed(2)} unit="dB" />
                <Metric label="Dark contrast" value={sar.darkContrastDb.toFixed(2)} unit="dB" />
                <Metric label="Contrast Z" value={sar.contrastZ.toFixed(2)} />
                <Metric label="Sensor" value="SENTINEL-1" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="panel p-5">
                <p className="tele-sm text-muted-foreground">STATUS</p>
                <p className="font-display mt-2 text-lg font-light tracking-[0.16em] text-signal">
                  PLAUSIBLE SAR SLICK CANDIDATE
                </p>
                <Disclaimer>
                  Dark SAR anomalies can have multiple causes. Detection alone does not establish
                  oil contamination.
                </Disclaimer>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
