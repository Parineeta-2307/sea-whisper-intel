import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/VesselDashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | SEA WHISPER" },
      { name: "description", content: "Maritime oil spill vessel attribution dashboard." },
    ],
  }),
  component: Dashboard,
});
