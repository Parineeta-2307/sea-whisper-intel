import type { ReactNode } from "react";
import { useInView } from "@/lib/scroll";
import type { EvidenceStrength } from "@/data/investigation";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  chapter,
  title,
  subtitle,
}: {
  chapter?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      {chapter ? <p className="tele-sm text-signal/70">{chapter}</p> : null}
      <h2 className="font-display mt-3 text-[clamp(1.5rem,3.6vw,2.8rem)] leading-tight font-light tracking-[0.14em] text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm font-light text-muted-foreground">{subtitle}</p>
      ) : null}
      <div className="mt-6 h-px w-full bg-gradient-to-r from-signal/40 via-border to-transparent" />
    </Reveal>
  );
}

export function Metric({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="border-l border-border pl-3">
      <p className="tele-sm text-muted-foreground/70">{label}</p>
      <p className="mt-1 font-mono text-sm tracking-[0.08em] text-foreground">
        {value}
        {unit ? <span className="ml-1 text-muted-foreground">{unit}</span> : null}
      </p>
    </div>
  );
}

const strengthLevel: Record<EvidenceStrength, number> = {
  Strong: 3,
  Moderate: 2,
  Weak: 1,
};

export function StrengthBar({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: EvidenceStrength;
  compact?: boolean;
}) {
  const level = strengthLevel[value];
  const color =
    value === "Strong" ? "bg-strong" : value === "Moderate" ? "bg-moderate" : "bg-weak";
  return (
    <div className={compact ? "" : "space-y-1.5"}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="tele-sm text-muted-foreground">{label}</span>
        <span
          className={`font-mono text-[11px] tracking-[0.14em] ${
            value === "Strong"
              ? "text-strong"
              : value === "Moderate"
                ? "text-moderate"
                : "text-muted-foreground"
          }`}
        >
          {value.toUpperCase()}
        </span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-[3px] flex-1 ${i <= level ? color : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 border-l-2 border-warn/50 pl-3 text-[11px] leading-relaxed text-muted-foreground/80 italic">
      {children}
    </p>
  );
}

export function Tag({ children, tone = "signal" }: { children: ReactNode; tone?: "signal" | "warn" | "muted" }) {
  const cls =
    tone === "warn"
      ? "border-warn/40 text-warn"
      : tone === "muted"
        ? "border-border text-muted-foreground"
        : "border-signal/40 text-signal";
  return (
    <span className={`tele-sm inline-block border px-2.5 py-1 ${cls}`}>{children}</span>
  );
}
