export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export type Vessel = {
  id: "047" | "021" | "083";
  name: string;
  mmsi: string;
  imo: string;
  callsign: string;
  flag: string;
  type: string;
  latitude: number;
  longitude: number;
  detectionTime: string;
  attributionScore: number;
  risk: RiskLevel;
  satelliteConfidence: number;
  aisProximity: number;
  driftMatch: number;
  temporalMatch: number;
  spatialProximity: number;
  trajectoryConsistency: number;
  whySelected: string;
};

export const vessels: Vessel[] = [
  {
    id: "047",
    name: "Vessel 047",
    mmsi: "419001047",
    imo: "9382047",
    callsign: "VSL047",
    flag: "India",
    type: "Offshore Support Vessel",
    latitude: 12.84,
    longitude: 74.72,
    detectionTime: "2026-09-04 08:42 UTC",
    attributionScore: 91,
    risk: "HIGH",
    satelliteConfidence: 94,
    aisProximity: 89,
    driftMatch: 92,
    temporalMatch: 90,
    spatialProximity: 93,
    trajectoryConsistency: 88,
    whySelected:
      "Vessel 047 was identified as the highest-probability source because its AIS trajectory intersects the reconstructed oil-spill drift corridor during the relevant time window and remains spatially close to the detected slick.",
  },
  {
    id: "021",
    name: "Vessel 021",
    mmsi: "419000021",
    imo: "9213021",
    callsign: "VSL021",
    flag: "India",
    type: "Cargo Vessel",
    latitude: 13.21,
    longitude: 74.31,
    detectionTime: "2026-09-04 08:37 UTC",
    attributionScore: 67,
    risk: "MEDIUM",
    satelliteConfidence: 81,
    aisProximity: 64,
    driftMatch: 70,
    temporalMatch: 69,
    spatialProximity: 63,
    trajectoryConsistency: 65,
    whySelected:
      "Vessel 021 entered the broader investigation zone during the relevant time window, but its trajectory shows weaker agreement with the reconstructed spill movement.",
  },
  {
    id: "083",
    name: "Vessel 083",
    mmsi: "419000083",
    imo: "9451083",
    callsign: "VSL083",
    flag: "Panama",
    type: "Tanker",
    latitude: 12.52,
    longitude: 75.08,
    detectionTime: "2026-09-04 08:29 UTC",
    attributionScore: 43,
    risk: "LOW",
    satelliteConfidence: 72,
    aisProximity: 41,
    driftMatch: 45,
    temporalMatch: 48,
    spatialProximity: 39,
    trajectoryConsistency: 44,
    whySelected:
      "Vessel 083 was considered because it was operating within the wider surveillance region, but available trajectory evidence provides limited support for direct attribution.",
  },
];

export const evidenceItems = [
  [
    "Satellite / SAR Evidence",
    "satelliteConfidence",
    "The satellite observation provides the initial oil-spill detection and candidate region.",
  ],
  [
    "AIS Spatial Proximity",
    "aisProximity",
    "The vessel's reconstructed AIS position places it close to the detected slick.",
  ],
  [
    "Drift / Hindcast Match",
    "driftMatch",
    "Modeled drift movement is consistent with the vessel's position and the observed slick location.",
  ],
  [
    "Temporal Correlation",
    "temporalMatch",
    "The vessel was in the relevant area during the estimated spill window.",
  ],
  [
    "Spatial Proximity",
    "spatialProximity",
    "The vessel remained within the relevant geographic corridor.",
  ],
  [
    "Trajectory Consistency",
    "trajectoryConsistency",
    "The historical AIS trajectory is consistent with the reconstructed source corridor.",
  ],
] as const;
