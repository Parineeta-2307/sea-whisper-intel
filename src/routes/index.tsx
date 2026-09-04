import { createFileRoute } from "@tanstack/react-router";
import { InvestigationLanding } from "@/components/InvestigationLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEA WHISPER | Maritime Oil Spill Intelligence" },
      {
        name: "description",
        content:
          "Trace probable oil-spill source vessels from satellite observation to attribution.",
      },
    ],
  }),
  component: InvestigationLanding,
});
