import sarImg from "@/assets/sar-scene.jpg";
import vesselImg from "@/assets/vessel.jpg";
import earthImg from "@/assets/earth-map.jpg";
import { investigationData, pipelineStages } from "@/data/investigation";
import { Disclaimer, Reveal, SectionHeader, Tag } from "@/components/ui/instrument";
import { useImagerySrc } from "@/lib/imagery";

export function EvidenceScene() {
  const { investigation, sar, hindcast, vessels } = investigationData;
  const sarSrc = useImagerySrc("sar", sarImg);
  const vesselSrc = useImagerySrc("vessel", vesselImg);
  const chartSrc = useImagerySrc("chart", earthImg);

  const frames = [
    {
      src: sarSrc,
      code: "EV-01",
      title: "SAR OBSERVATION",
      caption: `Region ${sar.regionId} · dark contrast ${sar.darkContrastDb.toFixed(2)} dB`,
      alt: "Sentinel-1 SAR frame showing the detected dark anomaly",
    },
    {
      src: chartSrc,
      code: "EV-02",
      title: "DRIFT RECONSTRUCTION",
      caption: `${hindcast.durationHours} h backward · ${hindcast.particles} particles`,
      alt: "Regional chart used for the backward drift reconstruction",
    },
    {
      src: vesselSrc,
      code: "EV-03",
      title: "CANDIDATE VESSEL",
      caption: `${vessels[0]!.name} · MMSI ${vessels[0]!.mmsi}`,
      alt: "Aerial imagery of the highest-ranked candidate vessel",
    },
  ];

  return (
    <section id="evidence" className="relative border-t border-border bg-void py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeader
          chapter="06 · INVESTIGATION DOSSIER"
          title="EVIDENCE PACKAGE"
          subtitle="The chain of observations assembled for analyst review, with the processing pipeline that produced them."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {frames.map((f, i) => (
            <Reveal key={f.code} delay={i * 0.08}>
              <figure className="border border-border">
                <div className="relative overflow-hidden">
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 scanline opacity-30" />
                  <div className="absolute top-3 left-3">
                    <Tag tone="muted">{f.code}</Tag>
                  </div>
                </div>
                <figcaption className="px-4 py-3">
                  <p className="tele-sm text-signal/80">{f.title}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                    {f.caption}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="panel mt-12 p-6">
            <p className="tele-sm text-muted-foreground">PROCESSING PIPELINE</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
              {pipelineStages.map((s, i) => (
                <span key={s} className="flex items-center gap-3">
                  <span className="tele-sm border border-border px-2.5 py-1.5 text-foreground/75">
                    <span className="mr-2 text-signal/60">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </span>
                  {i < pipelineStages.length - 1 ? (
                    <span className="text-signal/40">→</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 grid gap-6 border-t border-border pt-10 md:grid-cols-3">
            <div>
              <p className="tele-sm text-muted-foreground/60">INVESTIGATION</p>
              <p className="mt-2 font-mono text-sm tracking-[0.12em] text-foreground">
                {investigation.id}
              </p>
              <p className="tele-sm mt-1 text-muted-foreground">{investigation.region}</p>
            </div>
            <div>
              <p className="tele-sm text-muted-foreground/60">OBSERVATION</p>
              <p className="mt-2 font-mono text-sm tracking-[0.12em] text-foreground">
                {investigation.observationTime.replace("T", " ").replace("Z", " UTC")}
              </p>
              <p className="tele-sm mt-1 text-muted-foreground">
                {investigation.latitude.toFixed(4)}N {investigation.longitude.toFixed(4)}E
              </p>
            </div>
            <div>
              <p className="tele-sm text-muted-foreground/60">STATUS</p>
              <p className="mt-2 font-display text-sm font-light tracking-[0.16em] text-signal">
                {sar.status.toUpperCase()}
              </p>
              <p className="tele-sm mt-1 text-muted-foreground">ANALYST REVIEW REQUIRED</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Disclaimer>
            Prototype for SIH 2026 · Problem Statement 26143. All values shown are local demo data.
            Outputs are decision support for human analysts and do not constitute proof of a
            pollution offence.
          </Disclaimer>
        </Reveal>
      </div>
    </section>
  );
}
