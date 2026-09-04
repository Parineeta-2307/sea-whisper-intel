import { createFileRoute } from "@tanstack/react-router";

import { CinematicOpening } from "@/components/CinematicOpening";
import { SarScene } from "@/components/SarScene";
import { VesselReveal } from "@/components/VesselReveal";
import { HindcastScene } from "@/components/HindcastScene";
import { AttributionScene } from "@/components/AttributionScene";
import { EvidenceScene } from "@/components/EvidenceScene";
import { ImageryUpload } from "@/components/ImageryUpload";
import { ProgressRail } from "@/components/ProgressRail";
import { ImageryProvider } from "@/lib/imagery";

const TITLE = "Maritime Intelligence — SAR Oil-Spill Attribution";
const DESCRIPTION =
  "A cinematic walkthrough of AI-assisted maritime oil-spill detection and vessel attribution using Sentinel-1 SAR, drift hindcasting and AIS reconstruction.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ImageryProvider>
      <main className="relative bg-void">
        <ProgressRail />
        <CinematicOpening />
        <SarScene />
        <VesselReveal />
        <HindcastScene />
        <AttributionScene />
        <EvidenceScene />
        <ImageryUpload />
      </main>
    </ImageryProvider>
  );
}
