import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CloudUpload,
  Compass,
  Radio,
  ScanLine,
  Ship,
  Waves,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import earthMap from "@/assets/earth-map.jpg";
import { useImagery } from "@/lib/imagery";

const stages = [
  { icon: ScanLine, label: "Satellite Observation", detail: "Detect the dark-water signature" },
  { icon: Compass, label: "Oil Spill Detection", detail: "Isolate the slick region" },
  { icon: Waves, label: "Drift / Hindcast Analysis", detail: "Reconstruct source corridors" },
  { icon: Radio, label: "AIS Correlation", detail: "Match vessel movement" },
  { icon: Ship, label: "Vessel Attribution", detail: "Rank probable sources" },
];

export function InvestigationLanding() {
  const navigate = useNavigate();
  const { images, setImage } = useImagery();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const uploaded = images.sar;

  const acceptImage = (file: File | undefined) => {
    if (file?.type.startsWith("image/")) setImage("sar", file);
  };

  const startInvestigation = () => {
    if (!uploaded || isStarting) return;
    setIsStarting(true);
    window.setTimeout(() => navigate({ to: "/dashboard" }), 650);
  };

  return (
    <main className="landing-shell">
      <nav className="landing-nav">
        <a className="landing-brand" href="#top">
          <span className="landing-mark">
            <Waves size={18} />
          </span>
          <span>
            <strong>SEA WHISPER</strong>
            <small>Maritime Oil Spill Intelligence</small>
          </span>
        </a>
        <a className="landing-nav-link" href="#upload">
          BEGIN INSPECTION <ArrowRight size={14} />
        </a>
      </nav>

      <section id="top" className="landing-hero">
        <div className="hero-copy">
          <span className="landing-kicker">
            <span className="live-pip" /> MARITIME INTELLIGENCE SYSTEM · ONLINE
          </span>
          <h1>
            Read the sea.
            <br />
            <em>Trace the source.</em>
          </h1>
          <p>
            A focused intelligence workflow for detecting oil spills and attributing them to
            probable source vessels.
          </p>
          <a className="scroll-cue" href="#pipeline">
            <span>EXPLORE THE INVESTIGATION</span>
            <ArrowDown size={17} />
          </a>
        </div>
        <div className="globe-stage" aria-label="Earth viewed over the Arabian Sea">
          <div className="globe-halo" />
          <div className="globe">
            <img src={earthMap} alt="Satellite view of Earth" />
          </div>
          <div className="orbit-line orbit-a" />
          <div className="orbit-line orbit-b" />
          <div className="globe-label label-top">
            WESTERN INDIA
            <br />
            <b>ARABIAN SEA</b>
          </div>
          <div className="globe-label label-bottom">
            <span className="signal-line" /> OCEAN OBSERVATION / 12.84°N · 74.72°E
          </div>
        </div>
        <div className="hero-bottom">
          <span>SW / 01</span>
          <span>OIL-SPILL ATTRIBUTION</span>
          <span>04 SEP 2026</span>
        </div>
      </section>

      <section id="pipeline" className="landing-section pipeline-section">
        <div className="section-intro">
          <span className="landing-kicker">01 / INVESTIGATION PIPELINE</span>
          <h2>
            From observation
            <br />
            <em>to attribution.</em>
          </h2>
          <p>
            Every conclusion is built from independent signals that can be inspected, compared, and
            explained.
          </p>
        </div>
        <div className="pipeline-list">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <a className="pipeline-step" key={stage.label} href="#upload">
                <span className="step-number">0{index + 1}</span>
                <span className="step-icon">
                  <Icon size={19} />
                </span>
                <div>
                  <strong>{stage.label}</strong>
                  <small>{stage.detail}</small>
                </div>
                {index < stages.length - 1 ? (
                  <ArrowRight className="step-arrow" size={17} />
                ) : (
                  <Check className="step-check" size={17} />
                )}
              </a>
            );
          })}
        </div>
      </section>

      <section className="landing-section attribution-section">
        <div className="attribution-visual">
          <div className="radar-ring ring-one" />
          <div className="radar-ring ring-two" />
          <div className="radar-sweep" />
          <div className="radar-vessel vessel-a">047</div>
          <div className="radar-vessel vessel-b">021</div>
          <div className="radar-vessel vessel-c">083</div>
          <span className="radar-core">
            <Waves size={20} />
          </span>
        </div>
        <div className="section-intro">
          <span className="landing-kicker">02 / VESSEL ATTRIBUTION</span>
          <h2>
            The slick is
            <br />
            <em>only the beginning.</em>
          </h2>
          <p>
            SEA WHISPER correlates the detected spill with vessel movement, drift history, and
            timing. Candidates are ranked by how strongly their tracks agree with the reconstructed
            source corridor.
          </p>
          <div className="attribution-stats">
            <span>
              <strong>03</strong> CANDIDATE VESSELS
            </span>
            <span>
              <strong>06</strong> EVIDENCE SIGNALS
            </span>
          </div>
        </div>
      </section>

      <section id="upload" className="landing-section upload-section">
        <div className="section-intro">
          <span className="landing-kicker">03 / IMAGERY INTAKE</span>
          <h2>
            Satellite
            <br />
            <em>observation.</em>
          </h2>
          <p>Upload a satellite image to begin the investigation.</p>
        </div>
        <div className="upload-console">
          <div
            className={`drop-zone ${isDragging ? "is-dragging" : ""} ${uploaded ? "has-image" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              acceptImage(event.dataTransfer.files[0]);
            }}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => acceptImage(event.target.files?.[0])}
            />
            {uploaded ? (
              <img src={uploaded.url} alt="Uploaded satellite observation preview" />
            ) : (
              <div className="empty-upload">
                <span className="upload-icon">
                  <CloudUpload size={25} />
                </span>
                <strong>CHOOSE SATELLITE IMAGE</strong>
                <small>Drop an image here or click to browse</small>
                <span className="file-types">JPG · PNG · WEBP</span>
              </div>
            )}
            <div className="upload-overlay" />
          </div>
          {uploaded ? (
            <div className="upload-meta">
              <span className="uploaded-state">
                <Check size={15} /> IMAGE UPLOADED ✓
              </span>
              <span title={uploaded.name}>
                {uploaded.name} · {(uploaded.size / 1024).toFixed(0)} KB
              </span>
            </div>
          ) : (
            <div className="upload-meta muted-upload">
              <span>NO IMAGE SELECTED</span>
              <span>LOCAL BROWSER PREVIEW</span>
            </div>
          )}
          <button
            type="button"
            className="inspect-button"
            disabled={!uploaded || isStarting}
            onClick={startInvestigation}
          >
            {isStarting ? "OPENING ANALYSIS..." : "INSPECT / START"}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
      <footer className="landing-footer">
        <span>SEA WHISPER / MARITIME INTELLIGENCE</span>
        <span>STATIC DEMO DATA · SAR · AIS · HINDCAST</span>
        <span>ANALYSIS READY</span>
      </footer>
    </main>
  );
}
