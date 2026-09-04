import { useRef, useState } from "react";
import sarImg from "@/assets/sar-scene.jpg";
import vesselImg from "@/assets/vessel.jpg";
import earthImg from "@/assets/earth-map.jpg";
import { Disclaimer, Reveal, SectionHeader, Tag } from "@/components/ui/instrument";
import { useImagery, type ImagerySlot } from "@/lib/imagery";

const SLOTS: {
  slot: ImagerySlot;
  code: string;
  title: string;
  hint: string;
  fallback: string;
}[] = [
  {
    slot: "sar",
    code: "IMG-01",
    title: "SAR OBSERVATION",
    hint: "Sentinel-1 GRD scene used in the SAR observation chapter.",
    fallback: sarImg,
  },
  {
    slot: "vessel",
    code: "IMG-02",
    title: "VESSEL IMAGERY",
    hint: "Optical / aerial vessel frame used in the identification chapter.",
    fallback: vesselImg,
  },
  {
    slot: "chart",
    code: "IMG-03",
    title: "REGIONAL CHART",
    hint: "Basemap or chart used behind the drift reconstruction.",
    fallback: earthImg,
  },
];

function Slot({
  slot,
  code,
  title,
  hint,
  fallback,
}: {
  slot: ImagerySlot;
  code: string;
  title: string;
  hint: string;
  fallback: string;
}) {
  const { images, setImage, clearImage } = useImagery();
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const current = images[slot];

  const accept = (files: FileList | null) => {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) setImage(slot, file);
  };

  return (
    <div className="panel flex flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="tele-sm text-signal/80">
          {code} · {title}
        </p>
        <Tag tone={current ? "signal" : "muted"}>{current ? "UPLOADED" : "DEMO"}</Tag>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          accept(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        aria-label={`Upload image for ${title}`}
        className={`relative cursor-pointer overflow-hidden transition-colors ${
          over ? "bg-signal/10" : "bg-transparent"
        }`}
      >
        <img
          src={current?.url ?? fallback}
          alt={`${title} preview`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover opacity-80"
        />
        <div className="pointer-events-none absolute inset-0 scanline opacity-30" />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4">
          <span className="tele-sm border border-signal/40 bg-void/70 px-3 py-1.5 text-signal">
            {over ? "RELEASE TO LOAD" : "DROP OR CLICK TO REPLACE"}
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => accept(e.target.files)}
        />
      </div>

      <div className="flex-1 px-4 py-3">
        <p className="text-[11px] leading-relaxed text-muted-foreground">{hint}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.12em] text-foreground/60">
            {current
              ? `${current.name.slice(0, 24)} · ${(current.size / 1024).toFixed(0)} KB`
              : "USING BUNDLED DEMO FRAME"}
          </p>
          {current ? (
            <button
              type="button"
              onClick={() => clearImage(slot)}
              className="tele-sm border border-border px-2.5 py-1 text-muted-foreground transition-colors hover:border-signal/40 hover:text-signal"
            >
              RESET
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ImageryUpload() {
  return (
    <section id="imagery" className="relative border-t border-border bg-charcoal/40 py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeader
          chapter="07 · IMAGERY INTAKE"
          title="IMAGE UPLOAD CONSOLE"
          subtitle="The single place to load your own frames into the walkthrough. Uploads replace the bundled demo imagery across every chapter for this session."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SLOTS.map((s, i) => (
            <Reveal key={s.slot} delay={i * 0.08}>
              <Slot {...s} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Disclaimer>
            Prototype intake only. Images are held in browser memory, are never uploaded to a
            server, and are cleared on reload. No detection is run on uploaded frames — the
            analytics shown throughout remain fixed demo values.
          </Disclaimer>
        </Reveal>
      </div>
    </section>
  );
}
