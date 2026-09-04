# Ocean Watch

BUILD PROMPT — SIH 26143 MARITIME INTELLIGENCE FRONTEND



Build a polished, premium frontend prototype for Smart India Hackathon 2026 — Problem Statement 26143, NTRO.



The application is an AI-assisted maritime oil-spill detection and vessel-attribution system using Sentinel-1 SAR imagery, ocean/wind hindcasting, and AIS vessel data.



IMPORTANT SCOPE



This is frontend only.



Do NOT build:



- Backend

- API

- Database

- Authentication

- Real-time services

- Python integration

- FastAPI

- External API calls

- Supabase

- Firebase



Use hardcoded local demo data inside the frontend.



Structure the code so the hardcoded data can easily be replaced with API responses later.



The objective is to create an impressive working visual prototype for judges.



---



1. OVERALL EXPERIENCE



Do NOT make this look like a conventional admin dashboard.



The experience should feel like:



satellite mission control + maritime intelligence platform + scientific investigation system



The first impression should be cinematic.



The user should initially see a satellite orbiting above Earth.



As the user scrolls:



SATELLITE → EARTH → INDIAN OCEAN → WESTERN INDIA → TARGET REGION → VESSEL → INCIDENT RECONSTRUCTION → SAR → HINDCAST → AIS → ATTRIBUTION → EVIDENCE → SUSPECT RANKING



The first ~20–30 seconds should NOT show tables or dashboards.



The system should feel like the user is travelling from space into a real maritime investigation.



---



2. VISUAL STYLE



Use a sophisticated dark interface.



Colors:



- Near black

- Charcoal

- Deep navy

- Muted ocean blue

- White / off-white typography

- Restrained cyan/blue highlights



Avoid:



- Purple AI gradients

- Excessive neon

- Cartoon graphics

- Generic SaaS dashboard styling

- Excessive glassmorphism

- Huge glowing text everywhere

- Random animations



Typography should feel like a combination of:



- aerospace

- intelligence

- scientific instrumentation



Use thin technical lines, subtle grids, coordinates, telemetry text, small labels and precise UI elements.



Animations should communicate the investigation rather than simply decorate the page.



---



3. TECHNOLOGY



Use:



- React

- Vite

- Tailwind CSS

- GSAP + ScrollTrigger

- Three.js / React Three Fiber where useful

- Lucide icons



Keep dependencies reasonable.



Desktop-first.



Make the experience responsive enough for smaller screens, but prioritize desktop because this will be demonstrated to judges.



---



4. SCENE 01 — SATELLITE ORBIT



This is the opening screen.



Do NOT show an oil spill.



Show:



A realistic-looking Earth partially illuminated in darkness with a satellite orbiting above it.



The satellite should slowly rotate.



Very subtle stars/background particles are acceptable.



Center/foreground typography:



MARITIME INTELLIGENCE



Below:



Satellite-driven maritime anomaly detection & vessel attribution



Small text:



SIH 26143 · NTRO



And:



SCROLL TO INVESTIGATE ↓



Small technical telemetry can appear around the edges:



"SAR PLATFORM"

"ORBITAL OBSERVATION"

"PASS 004275"

"INDIAN OCEAN REGION"



Keep it elegant.



---



5. SCROLL CAMERA MOVEMENT



Use GSAP ScrollTrigger.



As the user scrolls down:



0–20%



Satellite rotates.



Camera slowly moves toward Earth.



20–35%



Earth becomes larger.



Camera approaches the Indian Ocean.



India begins to become visible.



35–45%



Camera moves toward the western coast of India.



Subtle geographic grid appears.



Show:



"18°–20° N"

"72°–74° E"



Do NOT show the oil spill yet.



45–55%



Zoom into the investigation region.



A subtle target marker appears.



Text:



OBSERVATION REGION



WESTERN INDIA · ARABIAN SEA



Then transition toward a vessel.



---



6. SCENE 02 — VESSEL REVEAL



Reveal a realistic maritime vessel from an aerial/oblique angle.



This should be visually impressive.



The vessel should appear to be moving through the ocean.



Do not invent a cargo type.



Use the vessel information provided below.



Show a small label:



VESSEL OBSERVATION



VESSEL 047



AIS TRACK AVAILABLE



Then gradually introduce technical callouts connected to the vessel with thin dotted lines.



Callouts:



IDENTITY



"MMSI: 419344000"

"IMO: 9172181"

"CALLSIGN: VTZO"



CHARACTERISTICS



"FLAG: INDIA"

"TYPE: OTHER"



NAVIGATION



"AIS TRACK"

"COURSE"

"SPEED"

"HISTORICAL POSITIONS"



INVESTIGATION



"TEMPORAL MATCH"

"SPATIAL PROXIMITY"

"TRAJECTORY CONSISTENCY"



These should animate in one by one.



Do not overload the scene.



---



7. TRANSITION INTO INVESTIGATION



As the user continues scrolling:



The vessel slowly fades.



The callout lines disappear.



The ocean background transitions into almost complete black.



The interface becomes more analytical.



Large understated title:



INCIDENT RECONSTRUCTION



Small subtitle:



From satellite observation to probable source attribution



Then begin the scientific investigation.



---



8. SCENE 03 — SAR OBSERVATION



Show a large Sentinel-1-style SAR image.



Use a local visual placeholder/demo image if necessary.



The image should look like genuine grayscale SAR imagery.



Do not claim the image is a confirmed oil spill.



Overlay a subtle detected-region polygon/mask.



Show technical measurements:



SENTINEL-1 SAR



"Observation time"

"2026-08-25 01:02 UTC"



"Region ID"

"1371"



"Candidate area"

"481 pixels"



"VV median"

"-11.15 dB"



"Background median"

"-8.23 dB"



"Dark contrast"

"2.91 dB"



"Contrast Z"

"0.50"



Status:



PLAUSIBLE SAR SLICK CANDIDATE



Add a scientific disclaimer:



Dark SAR anomalies can have multiple causes. Detection alone does not establish oil contamination.



Animate the mask appearing over the SAR image.



---



9. SCENE 04 — WHERE COULD IT HAVE COME FROM?



Large question:



WHERE COULD IT HAVE COME FROM?



Then show the observed slick location on a dark map.



Animate multiple particles moving backward from the observed location.



Label:



BACKWARD HINDCAST



"Duration: 6 hours"

"Particles: 100"



Environmental forcing:



"CMEMS · Surface currents"

"ERA5 · 10 m wind"



The particles should move backwards toward a region.



Do not present the simulated origin as an exact source.



Use:



CANDIDATE ORIGIN REGION



not:



EXACT SOURCE



Show a highlighted uncertainty region.



---



10. HINDCAST DEMO VALUES



Use these values in the interface:



Observed latitude: 19.077446° N

Observed longitude: 72.980077° E



Backward duration: 6 hours

Particles: 100



Currents: CMEMS

Wind: ERA5



Candidate origin:

Latitude: 19.03° N

Longitude: 72.91° E



Origin uncertainty:

±0.08°



Clearly label these as:



DEMO RECONSTRUCTION



Do not imply that these numbers are validated ground truth.



---



11. SCENE 05 — AIS RECONSTRUCTION



Title:



WHO WAS THERE?



Show a dark maritime map.



Animate multiple vessel tracks.



Some tracks should pass near the candidate origin region.



Other tracks should clearly remain outside.



Use different visual emphasis for:



- strong spatial match

- weak match

- irrelevant traffic



Display:



AIS TRAFFIC RECONSTRUCTION



Historical vessel positions reconstructed around candidate origin window



Use the following vessels.



---



12. VESSEL DATA



VESSEL 01



APS 05



MMSI: 419344000

IMO: 9172181

Callsign: VTZO

Flag: IND

Type: OTHER



Attribution score:



PENDING FINAL HINDCAST



Evidence:



- Spatial proximity: Strong

- Temporal consistency: Strong

- Trajectory consistency: Moderate

- AIS persistence: Strong



---



VESSEL 02



THERA



MMSI: 419001531

IMO: 9351177

Callsign: VTGH

Flag: IND

Type: OTHER



Attribution score:



PENDING FINAL HINDCAST



Evidence:



- Spatial proximity: Moderate

- Temporal consistency: Strong

- Trajectory consistency: Moderate

- AIS persistence: Moderate



---



VESSEL 03



MALAVIYA SIXTEEN



MMSI: 419026600

IMO: 9249415

Callsign: ATSE

Flag: IND

Type: OTHER



Attribution score:



PENDING FINAL HINDCAST



Evidence:



- Spatial proximity: Moderate

- Temporal consistency: Moderate

- Trajectory consistency: Strong

- AIS persistence: Moderate



---



VESSEL 04



MP AHTS1



MMSI: 419001491

IMO: 9320910

Callsign: VTEL

Flag: IND

Type: OTHER



Attribution score:



PENDING FINAL HINDCAST



Evidence:



- Spatial proximity: Weak

- Temporal consistency: Moderate

- Trajectory consistency: Moderate

- AIS persistence: Weak



---



VESSEL 05



KHADEEJA



MMSI: 419002079

IMO: 9365568

Callsign: ATFU2

Flag: IND

Type: OTHER



Attribution score:



PENDING FINAL HINDCAST



Evidence:



- Spatial proximity: Weak

- Temporal consistency: Weak

- Trajectory consistency: Moderate

- AIS persistence: Moderate



---



13. IMPORTANT ATTRIBUTION RULE



Do NOT show any vessel as:



"Responsible vessel"



Do NOT show:



"Confirmed culprit"



Do NOT show fake probability percentages.



Use terminology such as:



- Suspect vessel

- Candidate vessel

- Attribution candidate

- Evidence strength

- Supporting evidence

- Requires investigation



The system is an investigative decision-support prototype, not a legal attribution system.



---



14. SCENE 06 — EVIDENCE FUSION



Show the evidence building step-by-step.



Animation:



VESSEL TRACK



↓



TEMPORAL CONSISTENCY



↓



SPATIAL PROXIMITY



↓



TRAJECTORY CONSISTENCY



↓



AIS PERSISTENCE



↓



ENVIRONMENTAL CONSISTENCY



↓



EVIDENCE FUSION



↓



ATTRIBUTION CANDIDATE



Make this feel like an intelligence-analysis process.



Use subtle animated connecting lines.



---



15. SCENE 07 — SUSPECT RANKING



Title:



POTENTIAL SOURCE VESSELS



Subtitle:



Ranked by available spatiotemporal evidence



Create an elegant ranking interface.



Top candidate should visually stand out.



However, because this is demo data, display:



DEMO ATTRIBUTION



or



SCORE PENDING FINAL HINDCAST



Do not use the old 90.52% APS 05 score.



Do not invent numerical attribution scores.



Each vessel row/card should show:



- Rank

- Vessel name

- MMSI

- IMO

- Flag

- Spatial proximity

- Temporal consistency

- Trajectory consistency

- AIS persistence

- Evidence strength



Use bars or compact indicators rather than huge cards.



---



16. SCENE 08 — WHY THIS VESSEL?



When the top candidate is selected, transition to:



WHY THIS VESSEL?



Show a large vessel visual on one side.



On the other side show evidence.



Example:



SPATIAL PROXIMITY

Strong



TEMPORAL CONSISTENCY

Strong



TRAJECTORY CONSISTENCY

Moderate



AIS PERSISTENCE

Strong



Then show:



CURRENT ASSESSMENT



"Potential attribution candidate"



Small disclaimer:



"Assessment is based on available demonstration evidence and requires further investigation."



---



17. SCENE 09 — EVIDENCE GALLERY



Only AFTER the suspect ranking.



Create a cinematic evidence gallery.



Include visual panels for:



1. Sentinel-1 SAR observation

2. Detected anomaly / segmentation mask

3. Backward hindcast particle trajectories

4. Candidate origin region

5. AIS vessel track

6. Vessel passing near candidate origin

7. Environmental forcing

8. Irrelevant vessel track / comparison case



Each panel should have a small technical caption.



Example:



SAR OBSERVATION

"Sentinel-1 · VV polarization"



HINDCAST

"CMEMS + ERA5 · -6h"



AIS CORRELATION

"Historical vessel trajectory"



The gallery should feel like an intelligence evidence archive.



---



18. FINAL SECTION — SYSTEM PIPELINE



At the bottom, show the complete investigation pipeline.



Use a horizontal or vertical animated sequence:



SENTINEL-1 SAR



↓



SAR PREPROCESSING



↓



SLICK DETECTION



↓



SLICK GEOMETRY



↓



BACKWARD HINDCAST



↓



CANDIDATE ORIGIN



↓



GFW AIS



↓



VESSEL RECONSTRUCTION



↓



SPATIOTEMPORAL MATCHING



↓



EVIDENCE FUSION



↓



RANKED SUSPECT VESSELS



Make this the final summary of the system.



---



19. DEMO DATA MODEL



Keep all data in one clean local object such as:



const investigationData = {

  investigation: {

    id: "SIH-26143-001",

    observationTime: "2026-08-25T01:02:00Z",

    latitude: 19.077446,

    longitude: 72.980077,

    region: "Arabian Sea · Western India"

  },



  sar: {

    regionId: 1371,

    areaPixels: 481,

    vvMedianDb: -11.15,

    backgroundMedianDb: -8.23,

    darkContrastDb: 2.91,

    contrastZ: 0.50,

    status: "Plausible SAR slick candidate"

  },



  hindcast: {

    durationHours: 6,

    particles: 100,

    currents: "CMEMS",

    wind: "ERA5",

    candidateOrigin: {

      latitude: 19.03,

      longitude: 72.91,

      uncertainty: "±0.08°"

    }

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

      score: null

    },

    {

      rank: 2,

      name: "THERA",

      mmsi: "419001531",

      imo: "9351177",

      callsign: "VTGH",

      flag: "IND",

      type: "OTHER",

      score: null

    },

    {

      rank: 3,

      name: "MALAVIYA SIXTEEN",

      mmsi: "419026600",

      imo: "9249415",

      callsign: "ATSE",

      flag: "IND",

      type: "OTHER",

      score: null

    },

    {

      rank: 4,

      name: "MP AHTS1",

      mmsi: "419001491",

      imo: "9320910",

      callsign: "VTEL",

      flag: "IND",

      type: "OTHER",

      score: null

    },

    {

      rank: 5,

      name: "KHADEEJA",

      mmsi: "419002079",

      imo: "9365568",

      callsign: "ATFU2",

      flag: "IND",

      type: "OTHER",

      score: null

    }

  ]

};



Keep this data isolated from UI components so it can later be replaced with API data.



---



20. NAVIGATION



Do not use a permanent sidebar during the cinematic opening.



Instead, have a tiny elegant progress indicator:



"01 OBSERVE"

"02 LOCATE"

"03 IDENTIFY"

"04 RECONSTRUCT"

"05 ATTRIBUTE"

"06 EVIDENCE"



It can remain discreetly in a corner.



After the cinematic section, normal navigation is acceptable.



---



21. MICRO-INTERACTIONS



Add polished details:



- slow satellite rotation

- camera zoom

- parallax stars

- subtle geographic grid

- coordinate transitions

- animated target acquisition

- vessel callout lines

- radar-like scanning effects used sparingly

- particle trajectories

- AIS tracks drawing themselves

- evidence indicators appearing sequentially

- smooth section transitions

- number counters

- hover states

- map markers

- subtle data-stream animations



Every animation should have a purpose.



Do NOT make the page chaotic.



---



22. IMPORTANT SCIENTIFIC LANGUAGE



Use careful wording throughout.



Correct:



Plausible SAR slick candidate



Candidate origin region



Potential attribution candidate



Supporting evidence



Spatiotemporal correlation



Requires further investigation



Avoid:



Confirmed oil spill



Exact spill source



Guilty vessel



Confirmed culprit



100% attribution



The prototype must communicate scientific uncertainty responsibly.



---



23. PERFORMANCE



The opening 3D scene should look impressive but remain performant.



If full 3D Earth/satellite rendering becomes too heavy, use a visually convincing simplified implementation.



Do not sacrifice smooth scrolling for unnecessary 3D complexity.



Lazy-load heavy sections where appropriate.



---



24. FINAL QUALITY BAR



When the page opens, the first impression should be:



«"This looks like a serious satellite/maritime intelligence investigation system."»



NOT:



«"This is a generic AI dashboard."»



The journey should visually communicate:



Observe → Locate → Identify → Reconstruct → Attribute → Investigate



The final product should look polished enough for an SIH judging presentation and should make the technical pipeline understandable even before the judges read the detailed text.



Build the complete frontend now using only local demo data.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sea-whisper-intel.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ab9f68e0-dc92-4fdb-b59e-8e8036f3c8f9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
