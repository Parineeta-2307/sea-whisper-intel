import { ArrowRight, ChevronRight, MapPin, Radio, Ship, Waves } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { vessels, type RiskLevel, type Vessel } from "@/data/vessels";
import sarScene from "@/assets/sar-scene.jpg";

const riskClass: Record<RiskLevel, string> = {
  HIGH: "risk-high",
  MEDIUM: "risk-medium",
  LOW: "risk-low",
};

function RiskBadge({ risk }: { risk: RiskLevel }) {
  return <span className={`risk-badge ${riskClass[risk]}`}>{risk}</span>;
}

function VesselRow({ vessel }: { vessel: Vessel }) {
  return (
    <Link to="/vessel/$id" params={{ id: vessel.id }} className="vessel-row">
      <div className="vessel-identity">
        <span className="vessel-dot" />{" "}
        <span>
          <strong>{vessel.name}</strong>
          <small>
            {vessel.callsign} · {vessel.mmsi}
          </small>
        </span>
      </div>
      <span className="muted-cell">{vessel.type}</span>
      <span>{vessel.flag}</span>
      <span className="location-cell">
        <MapPin size={14} /> {vessel.latitude.toFixed(2)}°N, {vessel.longitude.toFixed(2)}°E
      </span>
      <strong className="score-cell">{vessel.attributionScore}%</strong>
      <RiskBadge risk={vessel.risk} />
      <ChevronRight className="row-arrow" size={18} />
    </Link>
  );
}

function IncidentMap() {
  const markerPosition = (vessel: Vessel) => ({
    left: `${((vessel.longitude - 74.15) / 1.2) * 100}%`,
    top: `${100 - ((vessel.latitude - 12.15) / 1.5) * 100}%`,
  });

  return (
    <section className="map-panel panel-card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">SAR PLOT</span>
          <h2>Incident Map</h2>
        </div>
        <span className="map-coordinates">12.84°N · 74.72°E</span>
      </div>
      <div
        className="incident-map"
        role="img"
        aria-label="Incident map showing three vessels and the oil spill detection area"
      >
        <img
          className="map-sar-image"
          src={sarScene}
          alt="SAR texture showing ocean and an elongated slick"
        />
        <div className="map-grid" />
        <div className="spill-zone">
          <span>DETECTED SLICK</span>
        </div>
        {vessels.map((vessel) => (
          <Link
            key={vessel.id}
            to="/vessel/$id"
            params={{ id: vessel.id }}
            className={`map-marker marker-${vessel.id}`}
            style={markerPosition(vessel)}
            title={`Open ${vessel.name}`}
          >
            <span>{vessel.id}</span>
          </Link>
        ))}
        <div className="map-axis axis-lat">13.5°N</div>
        <div className="map-axis axis-lon">75.5°E</div>
      </div>
      <div className="map-legend">
        <span>
          <i className="legend-vessel" /> VESSEL
        </span>
        <span>
          <i className="legend-spill" /> OIL SPILL AREA
        </span>
        <span>
          <i className="legend-corridor" /> DRIFT CORRIDOR
        </span>
      </div>
    </section>
  );
}

export function Dashboard() {
  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <Link to="/dashboard" className="brand">
          <span className="brand-mark">
            <Waves size={18} />
          </span>
          <span>
            <strong>SEA WHISPER</strong>
            <small>Maritime Oil Spill Intelligence</small>
          </span>
        </Link>
        <div className="header-status">
          <span className="status-dot" /> ANALYSIS COMPLETE <span className="header-divider" /> 04
          SEP 2026 · 09:00 UTC
        </div>
      </header>
      <div className="dashboard-content">
        <div className="page-intro">
          <div>
            <span className="eyebrow">INVESTIGATION / SW-260904</span>
            <h1>Vessel attribution dashboard</h1>
            <p>Review all maritime candidates identified around the detected slick.</p>
          </div>
          <div className="incident-chip">
            <Radio size={16} /> SAR EVENT · ARABIAN SEA
          </div>
        </div>
        <section className="summary-grid" aria-label="Investigation summary">
          <div className="summary-card">
            <span className="summary-icon blue">
              <Ship size={19} />
            </span>
            <div>
              <small>VESSELS IDENTIFIED</small>
              <strong>3</strong>
              <span className="summary-note">All candidates reviewed</span>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon red">
              <span>!</span>
            </span>
            <div>
              <small>HIGH PROBABILITY</small>
              <strong>1</strong>
              <span className="summary-note">Requires priority review</span>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon amber">
              <span>~</span>
            </span>
            <div>
              <small>MEDIUM PROBABILITY</small>
              <strong>1</strong>
              <span className="summary-note">Supporting candidate</span>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon teal">
              <span>−</span>
            </span>
            <div>
              <small>LOW PROBABILITY</small>
              <strong>1</strong>
              <span className="summary-note">Limited evidence</span>
            </div>
          </div>
        </section>
        <div className="dashboard-main-grid">
          <section className="vessels-panel panel-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">CANDIDATE FLEET</span>
                <h2>Detected Vessels</h2>
              </div>
              <span className="table-count">3 MATCHES</span>
            </div>
            <div className="vessel-table">
              <div className="table-head">
                <span>VESSEL</span>
                <span>TYPE</span>
                <span>FLAG</span>
                <span>LOCATION</span>
                <span>SCORE</span>
                <span>RISK</span>
                <span />
              </div>
              {vessels.map((vessel) => (
                <VesselRow key={vessel.id} vessel={vessel} />
              ))}
            </div>
            <p className="table-hint">
              Select a vessel to inspect the supporting evidence and attribution rationale.
            </p>
          </section>
          <IncidentMap />
        </div>
        <footer className="dashboard-footer">
          <span>
            <span className="status-dot" /> DATASET SYNCHRONIZED
          </span>
          <span>STATIC DEMONSTRATION DATA · AIS / SAR / HINDCAST FUSION</span>
          <span>
            <ArrowRight size={14} /> INTERNAL REVIEW
          </span>
        </footer>
      </div>
    </main>
  );
}
