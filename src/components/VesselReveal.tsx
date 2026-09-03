import { band, range, useSectionProgress } from "@/lib/scroll";
import vesselImg from "@/assets/vessel.jpg";
import { focusVessel } from "@/data/investigation";

interface Callout {
  title: string;
  rows: string[];
  side: "left" | "right";
  top: string;
  at: number;
}

const callouts: Callout[] = [
  {
    title: "IDENTITY",
    rows: [`MMSI: ${focusVessel.mmsi}`, `IMO: ${focusVessel.imo}`, `CALLSIGN: ${focusVessel.callsign}`],
    side: "left",
    top: "18%",
    at: 0.24,
  },
  {
    title: "CHARACTERISTICS",
    rows: ["FLAG: INDIA", "TYPE: OTHER"],
    side: "left",
    top: "56%",
    at: 0.36,
  },
  {
    title: "NAVIGATION",
    rows: ["AIS TRACK", "COURSE", "SPEED", "HISTORICAL POSITIONS"],
    side: "right",
    top: "16%",
    at: 0.48,
  },
  {
    title: "INVESTIGATION",
    rows: ["TEMPORAL MATCH", "SPATIAL PROXIMITY", "TRAJECTORY CONSISTENCY"],
    side: "right",
    top: "58%",
    at: 0.6,
  },
];

export function VesselReveal() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();

  const imgOpacity = Math.min(range(progress, 0.02, 0.14), 1 - range(progress, 0.78, 0.95));
  const scale = 1.16 - 0.14 * Math.min(1, progress / 0.8);
  const label = band(progress, 0.06, 0.16, 0.8, 0.9);
  const linesFade = 1 - range(progress, 0.72, 0.86);
  const outro = range(progress, 0.86, 1);

  return (
    <section id="identify" ref={ref} className="relative h-[420vh] bg-void">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          src={vesselImg}
          alt="Aerial view of an offshore support vessel underway in dark open water"
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: imgOpacity * 0.92, transform: `scale(${scale})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/20 to-void/90" />
        <div className="pointer-events-none absolute inset-0 grid-field opacity-30" />

        <div
          className="absolute top-[14%] left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: label }}
        >
          <p className="tele text-signal/80">VESSEL OBSERVATION</p>
          <p className="font-display mt-2 text-3xl font-light tracking-[0.25em] text-foreground">
            VESSEL 047
          </p>
          <p className="tele-sm mt-2 text-muted-foreground">AIS TRACK AVAILABLE</p>
        </div>

        {/* callouts */}
        <div className="absolute inset-0" style={{ opacity: linesFade }}>
          {callouts.map((c) => {
            const o = range(progress, c.at, c.at + 0.08);
            const isLeft = c.side === "left";
            return (
              <div
                key={c.title}
                className={`absolute w-[15rem] ${isLeft ? "left-[4%] md:left-[8%]" : "right-[4%] md:right-[8%]"}`}
                style={{
                  top: c.top,
                  opacity: o,
                  transform: `translateX(${(1 - o) * (isLeft ? -24 : 24)}px)`,
                }}
              >
                <div
                  className={`panel px-4 py-3 ${isLeft ? "text-left" : "text-right"}`}
                >
                  <p className="tele-sm text-signal/80">{c.title}</p>
                  <div className="mt-2 space-y-1">
                    {c.rows.map((r) => (
                      <p key={r} className="font-mono text-[11px] tracking-[0.12em] text-foreground/80">
                        {r}
                      </p>
                    ))}
                  </div>
                </div>
                <div
                  className={`absolute top-1/2 hidden h-px border-t border-dotted border-signal/50 md:block ${
                    isLeft ? "left-full" : "right-full"
                  }`}
                  style={{ width: `${o * 8}vw` }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-void px-6 text-center"
          style={{ opacity: outro }}
        >
          <h2 className="font-display text-[clamp(1.8rem,5vw,3.6rem)] font-light tracking-[0.18em] text-foreground">
            INCIDENT RECONSTRUCTION
          </h2>
          <div className="my-5 h-px w-32 bg-signal/40" />
          <p className="text-sm font-light text-muted-foreground">
            From satellite observation to probable source attribution
          </p>
        </div>
      </div>
    </section>
  );
}
