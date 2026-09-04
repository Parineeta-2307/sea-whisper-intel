import { ArrowLeft, Check, MapPin, ShieldCheck } from "lucide-react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { evidenceItems, vessels } from "@/data/vessels";

export const Route = createFileRoute("/vessel/$id")({
  loader: ({ params }) => {
    const vessel = vessels.find((candidate) => candidate.id === params.id);
    if (!vessel) throw notFound();
    return vessel;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.name ?? "Vessel"} | SEA WHISPER` }],
  }),
  component: VesselDetail,
});

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-field">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function VesselDetail() {
  const vessel = Route.useLoaderData();
  return (
    <main className="dashboard-shell detail-shell">
      <header className="dashboard-header">
        <Link to="/dashboard" className="brand">
          <span className="brand-mark">
            <span>SW</span>
          </span>
          <span>
            <strong>SEA WHISPER</strong>
            <small>Maritime Oil Spill Intelligence</small>
          </span>
        </Link>
        <div className="header-status">
          <span className="status-dot" /> ANALYSIS COMPLETE
        </div>
      </header>
      <div className="detail-content">
        <Link to="/dashboard" className="back-link">
          <ArrowLeft size={17} /> Back to Dashboard
        </Link>
        <div className="detail-hero">
          <div>
            <span className="eyebrow">CANDIDATE PROFILE / {vessel.id}</span>
            <h1>{vessel.name}</h1>
            <p>Probable Source Vessel</p>
          </div>
          <div className={`hero-score ${vessel.risk.toLowerCase()}`}>
            <small>ATTRIBUTION SCORE</small>
            <strong>{vessel.attributionScore}%</strong>
            <span>{vessel.risk} RISK</span>
          </div>
        </div>
        <section className="identity-panel panel-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">VESSEL IDENTITY</span>
              <h2>Registered details</h2>
            </div>
            <span className="verified">
              <ShieldCheck size={16} /> AIS VERIFIED
            </span>
          </div>
          <div className="detail-fields">
            <DetailField label="MMSI" value={vessel.mmsi} />
            <DetailField label="IMO" value={vessel.imo} />
            <DetailField label="CALLSIGN" value={vessel.callsign} />
            <DetailField label="FLAG" value={vessel.flag} />
            <DetailField label="VESSEL TYPE" value={vessel.type} />
            <DetailField
              label="COORDINATES"
              value={`${vessel.latitude}°N, ${vessel.longitude}°E`}
            />
            <DetailField label="DETECTION TIME" value={vessel.detectionTime} />
            <DetailField label="STATUS" value="Active candidate" />
          </div>
        </section>
        <section className="why-section">
          <div className="why-copy">
            <span className="eyebrow">EVIDENCE FUSION</span>
            <h2>WHY WAS THIS VESSEL SELECTED?</h2>
            <p>{vessel.whySelected}</p>
            <div className="mini-location">
              <MapPin size={16} />
              <span>
                Candidate position
                <br />
                <strong>
                  {vessel.latitude}°N, {vessel.longitude}°E
                </strong>
              </span>
            </div>
          </div>
          <div className="evidence-panel panel-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">INDEPENDENT SIGNALS</span>
                <h2>Evidence breakdown</h2>
              </div>
              <span className="evidence-total">{vessel.attributionScore}% overall</span>
            </div>
            {evidenceItems.map(([label, key, explanation]) => {
              const value = vessel[key];
              return (
                <div className="evidence-item" key={key}>
                  <div className="evidence-label">
                    <strong>{label}</strong>
                    <b>{value}%</b>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: `${value}%` }} />
                  </div>
                  <p>{explanation}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section className="attribution-summary panel-card">
          <div>
            <span className="eyebrow">CONCLUSION</span>
            <h2>Attribution Summary</h2>
            <p>Multiple independent signals converge on the same source corridor.</p>
          </div>
          <div className="fusion-chain">
            <span>
              <Check size={14} /> Satellite Evidence
            </span>
            <i>+</i>
            <span>
              <Check size={14} /> AIS Track
            </span>
            <i>+</i>
            <span>
              <Check size={14} /> Drift Hindcast
            </span>
            <i>+</i>
            <span>
              <Check size={14} /> Temporal Match
            </span>
            <i>+</i>
            <span>
              <Check size={14} /> Spatial Proximity
            </span>
          </div>
          <div className="overall-score">
            <strong>{vessel.attributionScore}%</strong>
            <span>
              OVERALL
              <br />
              ATTRIBUTION
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
