/**
 * Local demo data for the SIH 26143 maritime intelligence prototype.
 * This module is the single source of truth for the UI. Replacing these
 * exports with API responses (same shapes) requires no component changes.
 */

export type EvidenceStrength = "Strong" | "Moderate" | "Weak";

export interface VesselEvidence {
  spatialProximity: EvidenceStrength;
  temporalConsistency: EvidenceStrength;
  trajectoryConsistency: EvidenceStrength;
  aisPersistence: EvidenceStrength;
}

export interface Vessel {
  rank: number;
  name: string;
  mmsi: string;
  imo: string;
  callsign: string;
  flag: string;
  type: string;
  /** null = score pending final hindcast. Never fabricate a probability. */
  score: number | null;
  evidence: VesselEvidence;
  /** normalized demo AIS track in candidate-origin local space (-1..1) */
  track: [number, number][];
  relevance: "strong" | "weak" | "background";
}

export interface InvestigationData {
  investigation: {
    id: string;
    observationTime: string;
    latitude: number;
    longitude: number;
    region: string;
  };
  sar: {
    regionId: number;
    areaPixels: number;
    vvMedianDb: number;
    backgroundMedianDb: number;
    darkContrastDb: number;
    contrastZ: number;
    status: string;
  };
  hindcast: {
    durationHours: number;
    particles: number;
    currents: string;
    wind: string;
    candidateOrigin: {
      latitude: number;
      longitude: number;
      uncertainty: string;
    };
  };
  vessels: Vessel[];
}

export const investigationData: InvestigationData = {
  investigation: {
    id: "SIH-26143-001",
    observationTime: "2026-08-25T01:02:00Z",
    latitude: 19.077446,
    longitude: 72.980077,
    region: "Arabian Sea · Western India",
  },

  sar: {
    regionId: 1371,
    areaPixels: 481,
    vvMedianDb: -11.15,
    backgroundMedianDb: -8.23,
    darkContrastDb: 2.91,
    contrastZ: 0.5,
    status: "Plausible SAR slick candidate",
  },

  hindcast: {
    durationHours: 6,
    particles: 100,
    currents: "CMEMS",
    wind: "ERA5",
    candidateOrigin: {
      latitude: 19.03,
      longitude: 72.91,
      uncertainty: "±0.08°",
    },
  },

  vessels: [
    {
      rank: 1,
      name: "APS 05",
      mmsi: "419344000",
      imo: "9172181",
      callsign: "VTZO",
      flag: "IND",
      type: "OTHER",
      score: null,
      evidence: {
        spatialProximity: "Strong",
        temporalConsistency: "Strong",
        trajectoryConsistency: "Moderate",
        aisPersistence: "Strong",
      },
      track: [
        [-0.85, 0.42],
        [-0.55, 0.3],
        [-0.28, 0.14],
        [-0.06, 0.02],
        [0.14, -0.08],
        [0.42, -0.2],
        [0.72, -0.34],
      ],
      relevance: "strong",
    },
    {
      rank: 2,
      name: "THERA",
      mmsi: "419001531",
      imo: "9351177",
      callsign: "VTGH",
      flag: "IND",
      type: "OTHER",
      score: null,
      evidence: {
        spatialProximity: "Moderate",
        temporalConsistency: "Strong",
        trajectoryConsistency: "Moderate",
        aisPersistence: "Moderate",
      },
      track: [
        [-0.9, -0.35],
        [-0.6, -0.28],
        [-0.32, -0.16],
        [-0.1, -0.16],
        [0.2, -0.24],
        [0.55, -0.4],
        [0.86, -0.52],
      ],
      relevance: "strong",
    },
    {
      rank: 3,
      name: "MALAVIYA SIXTEEN",
      mmsi: "419026600",
      imo: "9249415",
      callsign: "ATSE",
      flag: "IND",
      type: "OTHER",
      score: null,
      evidence: {
        spatialProximity: "Moderate",
        temporalConsistency: "Moderate",
        trajectoryConsistency: "Strong",
        aisPersistence: "Moderate",
      },
      track: [
        [-0.7, 0.82],
        [-0.42, 0.6],
        [-0.2, 0.38],
        [0.02, 0.2],
        [0.26, 0.12],
        [0.58, 0.18],
        [0.88, 0.3],
      ],
      relevance: "weak",
    },
    {
      rank: 4,
      name: "MP AHTS1",
      mmsi: "419001491",
      imo: "9320910",
      callsign: "VTEL",
      flag: "IND",
      type: "OTHER",
      score: null,
      evidence: {
        spatialProximity: "Weak",
        temporalConsistency: "Moderate",
        trajectoryConsistency: "Moderate",
        aisPersistence: "Weak",
      },
      track: [
        [-0.95, -0.82],
        [-0.6, -0.78],
        [-0.25, -0.7],
        [0.12, -0.66],
        [0.5, -0.72],
        [0.9, -0.8],
      ],
      relevance: "weak",
    },
    {
      rank: 5,
      name: "KHADEEJA",
      mmsi: "419002079",
      imo: "9365568",
      callsign: "ATFU2",
      flag: "IND",
      type: "OTHER",
      score: null,
      evidence: {
        spatialProximity: "Weak",
        temporalConsistency: "Weak",
        trajectoryConsistency: "Moderate",
        aisPersistence: "Moderate",
      },
      track: [
        [-0.92, 0.95],
        [-0.55, 0.92],
        [-0.15, 0.86],
        [0.3, 0.9],
        [0.72, 0.96],
      ],
      relevance: "background",
    },
  ],
};

/** Vessel highlighted in the cinematic vessel-reveal scene. */
export const focusVessel = investigationData.vessels[0];

export const chapters = [
  { id: "observe", index: "01", label: "OBSERVE" },
  { id: "locate", index: "02", label: "LOCATE" },
  { id: "identify", index: "03", label: "IDENTIFY" },
  { id: "reconstruct", index: "04", label: "RECONSTRUCT" },
  { id: "attribute", index: "05", label: "ATTRIBUTE" },
  { id: "evidence", index: "06", label: "EVIDENCE" },
] as const;

export const pipelineStages = [
  "SENTINEL-1 SAR",
  "SAR PREPROCESSING",
  "SLICK DETECTION",
  "SLICK GEOMETRY",
  "BACKWARD HINDCAST",
  "CANDIDATE ORIGIN",
  "GFW AIS",
  "VESSEL RECONSTRUCTION",
  "SPATIOTEMPORAL MATCHING",
  "EVIDENCE FUSION",
  "RANKED SUSPECT VESSELS",
] as const;

export const fusionChain = [
  "VESSEL TRACK",
  "TEMPORAL CONSISTENCY",
  "SPATIAL PROXIMITY",
  "TRAJECTORY CONSISTENCY",
  "AIS PERSISTENCE",
  "ENVIRONMENTAL CONSISTENCY",
  "EVIDENCE FUSION",
  "ATTRIBUTION CANDIDATE",
] as const;
