# Kap Ossen Two-Scene Landing Carousel Plan

## A Cinematic Family Embassy Entrance

**Document type:** Private design and implementation specification  
**Document ID:** KOF-UX-HERO-2026-01  
**Version:** Draft v1.0  
**Planning date:** 1 August 2026  
**Owner:** Engineer Saigut Julius Kipkorir / ST-Firm  
**Classification:** Private Family Working Document  
**Implementation status:** Planned; not yet built or approved for public release

## 1. Decision

The Kap Ossen landing page will open with **exactly two full-screen cinematic scenes** inside one premium device-style frame:

1. **Scene One — One Family:** the current living Family Embassy message, rebuilt as an immersive editorial hero.
2. **Scene Two — From Heritage to Legacy:** the existing Kap Ossen artwork in `public/og-family-embassy.png`, presented as the visual future statement.

The two scenes slide horizontally. They must feel like two chapters of one story—not two unrelated adverts.

The four strategic statistics and the **Roots → Knowledge → Opportunity → Prosperity → Legacy** journey remain directly below the carousel as the second movement of the landing page.

## 2. Design research translated into Kap Ossen principles

Current premium streaming interfaces use a dominant above-the-fold feature rotator, cinematic imagery, strong safe zones, obvious calls to action and content rows immediately below. Prime Video's official Feature Rotator specification describes a nearly full-screen carousel and distinct mobile creative requirements. Disney+'s 2026 redesign describes a dynamic hero carousel followed by more cinematic content and brand rows.

Kap Ossen will use those principles without copying Amazon, Prime Video, Disney, Apple, their logos, their exact layouts or their protected visual identities.

### What we adopt

- A first viewport dominated by one story at a time.
- Full-bleed cinematic artwork.
- Minimal controls that remain discoverable.
- Two clear calls to action, not a crowded menu inside the scene.
- A visible progress indicator.
- A content “shelf” immediately below the hero.
- Separate desktop and mobile composition rules.
- Clear visual status and section labels.

### What we reject

- Five or more rotating banners.
- Fast advertising-style rotation.
- Unreadable text over busy imagery.
- Automatic video or audio.
- Random continuous bouncing.
- Hidden controls.
- Destructive mobile cropping.
- Streaming-service logos or copied interface assets.

### 2.1 SCOF reference integration

The live SCOF website at <https://saigutjulius.github.io/SCOF/> is now an explicit internal reference for ST-Firm's visual family language.

Observed SCOF strengths:

- a full-height coffee-farm hero with strong foreground/background separation;
- fixed transparent navigation that becomes a dark blurred surface after scrolling;
- forest, cream, lime, clay and gold colour discipline;
- large Georgia-style editorial headings paired with modern interface typography;
- two clear hero calls to action;
- a three-part proof band immediately below the main hero message;
- a vertical scroll cue;
- real agricultural photography rather than generic illustration;
- a sticky manifesto quotation and structured proof list;
- slow image enlargement on gallery hover;
- an operating-loop rail that explains Capture → Context → Prioritise → Learn;
- IntersectionObserver-based one-time entrance reveals;
- responsive navigation and a reduced-motion path;
- ST-Firm presented as the technology and engineering backbone.

The Kap Ossen landing page should inherit the following principles from SCOF:

1. **Evidence immediately after emotion.** The four Kap Ossen Legacy Signals replace SCOF's hero proof band.
2. **Editorial dignity.** Heritage scenes use an elegant serif/sans pairing instead of dashboard typography everywhere.
3. **Real-world foundation.** ARROR, family, land, education and enterprise remain visible beneath the futuristic surface.
4. **One-time reveals.** Statistics and journey stages animate once when first entering the viewport.
5. **Clear operating sequence.** SCOF's operating-loop clarity informs Roots → Knowledge → Opportunity → Prosperity → Legacy.
6. **Technology as service.** ST-Firm appears as the enabling backbone, not as a logo competing with Kap Ossen.
7. **Motion restraint.** Slow zoom, depth, light and spring settling are preferred to continuous bouncing.

The Kap Ossen landing page should not copy:

- SCOF's forest/lime palette as its dominant identity;
- SCOF's exact hero photograph, logo placement or page composition;
- SCOF's agricultural proof labels;
- SSOS, SCOF coin or traceability messaging inside the family hero;
- any farm photograph until its ownership and cross-project reuse rights are confirmed.

### 2.2 Sibling-brand distinction

| Experience | Emotional role | Dominant palette | Primary visual material | Motion character |
|---|---|---|---|---|
| SCOF | Agriculture becoming a visible digital system | Forest, cream, lime, clay | Real coffee-farm photography | Quiet scroll reveals and slow image zoom |
| Kap Ossen | Heritage becoming an intergenerational institution | Plum, mineral black, gold, forest | Family/legacy artwork and approved archive media | Two-scene cinematic slide, depth settle and legacy-route illumination |
| ST-Firm | Engineering, trust and execution | Mineral black, violet, white | Systems, diagrams and evidence | Precise signal motion |
| Solomon Ops | Campaign readiness and accountable field operations | Separately approved campaign palette | Candidate, constituency and verified field evidence | Functional status and command motion |

The common ST-Firm DNA is visible through spacing, typography discipline, evidence bands, rounded material surfaces, restrained animation and strong accessibility—not through making every project look identical.

## 3. Landing-page composition

```text
SCOF Intelligence Rail
↓
Static Kap Ossen Navigation + Decorative Logo Race
↓
Premium Device Frame
├── Scene 01: One Family / current written hero
└── Scene 02: Kap Ossen Family Embassy artwork
↓
Carousel Control Dock
↓
Strategic Statistics Super Shelf
↓
Roots-to-Legacy Journey Rail
↓
Next main page section
```

The ticker and navigation remain outside the sliding scenes. They never move with the carousel.

## 4. Viewport and premium device frame

### 4.1 Desktop frame

The carousel should look like a future premium screen or phone enlarged into an architectural display.

- Width: `calc(100vw - 32px)` with a controlled maximum aligned to the site's widest canvas.
- Height: `calc(100svh - ticker height - header height - 24px)`.
- Minimum useful height: approximately 640px.
- Maximum height: approximately 980px on very large displays.
- Outer corner radius: 36–44px.
- Inner screen radius: 28–34px.
- Outer material: mineral-black/titanium gradient with a subtle gold-violet edge.
- Inner bezel: 6–10px, visually dark and quiet.
- Shadow: broad plum-black shadow, not a bright neon glow.
- Top-centre camera capsule: optional, small and abstract; no Apple logo and no exact iPhone hardware reproduction.
- Bottom reflection: faint warm-gold floor reflection at less than 10% opacity.

The frame is inspired by premium-device craftsmanship. Public copy should call it a **cinematic frame** or **legacy display**, not an official Apple/iPhone component.

### 4.2 Tablet frame

- Reduce radius and bezel.
- Use approximately 88–92svh of vertical space.
- Keep the control dock inside the lower safe area.
- Reduce parallax and background movement.

### 4.3 Mobile frame

The user's real phone becomes the frame.

- Remove the simulated outer bezel and camera capsule.
- Use an edge-to-edge screen with small 18–24px rounding only where it improves continuity.
- Height: at least `calc(100svh - ticker - mobile header)`.
- Respect safe-area insets.
- Keep buttons and controls reachable with one thumb.
- Never allow the fixed ticker/header and carousel controls to consume most of the mobile viewport.

## 5. Scene One — One Family

### 5.1 Exact content hierarchy

**Eyebrow**

> Descendants of the late Dickson Ossen Cherogony

**Headline**

> One family. *Shared roots.* A future we build together.

**Supporting statement**

> A living family embassy for heritage, education, agriculture, technology, enterprise and a proposed 30-acre legacy destination.

**Primary action**

> Enter the land vision

**Secondary action**

> Explore our heritage

**Identity chips**

- ARROR roots.
- Global knowledge.
- Shared prosperity.
- Future generations.

### 5.2 Visual composition

Desktop layout:

- 60–65% editorial content zone on the left.
- 35–40% ceremonial zone on the right.
- The KO crest/motto object floats in the ceremonial zone with restrained depth.
- A deep-plum background carries subtle topographic lines, twelve-marker geometry and a soft ARROR forest glow.
- The headline stays within three lines at common desktop widths.
- Buttons sit together on one line where space permits.
- Identity chips sit below the calls to action and are treated as small chapters, not hashtags.

### 5.3 Scene One entrance choreography

When Scene One becomes active:

1. Background light rises gently over 700ms.
2. Eyebrow enters with a 12px upward settle.
3. Headline reveals by line, not by individual letter.
4. Supporting text fades in.
5. Buttons settle with a soft spring.
6. Identity chips arrive in a short four-item stagger.
7. Crest rotates no more than 2–3 degrees and settles; it must not spin continuously.

Total choreography completes within approximately 1.2 seconds.

## 6. Scene Two — From Heritage to Legacy artwork

### 6.1 Source asset

Use the existing project artwork:

`public/og-family-embassy.png`

Current asset dimensions: **1659 × 948 pixels**.

The image includes:

- KAP OSSEN FAMILY EMBASSY title.
- “FROM HERITAGE TO LEGACY” statement.
- Large ceremonial KO mark.
- ARROR/land silhouette and rooted tree.
- illuminated route from the roots toward the future city.
- Berlin and future-city visual references.
- proposed development landscape.

### 6.2 Desktop treatment

- Use the image as the entire screen of Scene Two.
- Prefer `object-fit: cover` only when the tested viewport preserves the title, crest, tree and future city.
- Otherwise use `object-fit: contain` over a matching deep-plum background.
- Keep the title-side safe zone and KO emblem fully visible.
- Add only a restrained vignette at the extreme edges.
- Do not place a second large headline over the title already embedded in the artwork.
- Use an optional glass control strip at the bottom containing:
  - `Explore ARROR City Legacy`;
  - `Open the Family Gallery`;
  - an accessible description trigger.
- The strip must avoid the tree, route and principal development details.

### 6.3 Wide-screen treatment

For screens substantially wider than the asset:

- Place a blurred, enlarged duplicate behind the sharp contained artwork.
- Keep the sharp original centred.
- Blur layer opacity stays low and cannot make the embedded text harder to read.
- Do not stretch the original image.

### 6.4 Mobile treatment

The desktop image cannot simply be centre-cropped because that would lose either the title or the KO crest.

Use a deliberate mobile composition:

1. Top 55–60%: artwork window focused on the KO emblem and illuminated future city.
2. Bottom 40–45%: HTML-rendered title and statement over a plum-to-forest continuation background.
3. Include a smaller approved crop showing the rooted tree/ARROR path where space permits.
4. Keep the original complete image available through an “View full artwork” lightbox.
5. Build a dedicated 9:16 derivative later if the original layered design source becomes available.

Do not use AI to invent missing portions of the family artwork without explicit approval.

### 6.5 Scene Two motion

- Begin with the image at 102% scale and settle to 100% over the active interval.
- Give the gold route a very subtle light-follow effect using a separate CSS overlay only where it aligns naturally.
- The KO outer nodes may receive a slow sequential glow once per scene appearance.
- The future-city horizon may brighten gently.
- No continuous spinning of the KO emblem.
- No fake moving vehicles or people.
- No automatic audio.

## 7. Carousel behaviour

### 7.1 Timing

- Scene One first-load reading time: 9 seconds.
- Scene Two display time: 8 seconds.
- Transition duration: 650–800ms.
- After a manual interaction, pause automatic rotation for at least 15 seconds.
- If the user presses pause, remain paused for the session.
- Stop when the browser tab is hidden.
- Stop while any link/control inside the carousel has keyboard focus.
- Stop while pointer hover is active on desktop.

Two scenes are enough. Do not add a third scene without a new content and performance review.

### 7.2 Transition language

Preferred transition: **cinematic push and depth settle**.

Outgoing scene:

- translate 0 → -7%;
- scale 1 → 0.985;
- fade 1 → 0.35;
- optional blur 0 → 2px.

Incoming scene:

- translate 8% → 0;
- scale 1.015 → 1;
- fade 0 → 1.

The transition should feel weighted and elegant. Use spring-like easing for the final settle, but no elastic overshoot that makes text wobble.

### 7.3 Controls

Control dock contents:

- Previous scene button.
- Two numbered indicators: `01` and `02`.
- Current scene title.
- Progress bar for the active interval.
- Pause/play button.
- Next scene button.

Desktop dock position: bottom-centre inside the frame safe area.  
Mobile dock position: bottom safe area above browser/device controls.

### 7.4 Touch and pointer interaction

- Swipe left/right with a clear movement threshold.
- Do not switch scenes during vertical page scrolling.
- Allow trackpad horizontal gestures only when intent is clear.
- Arrow buttons are always available on desktop.
- Clicking an inactive numbered indicator switches directly.
- Never use hover as the only way to reveal controls.

### 7.5 URL and navigation state

- Carousel state does not need to change the URL.
- Buttons link to stable page sections/routes.
- Browser Back must not unexpectedly rotate the carousel.
- A local device preference may remember pause state, but it is not authoritative user data.

## 8. Strategic statistics “Super Shelf”

Directly below the two-scene display, convert the current four statistics into wide cinematic tiles inspired by premium content shelves.

### 8.1 Tiles

1. **12 — Strategic pillars**  
   Visual language: twelve-marker orbit / plum-violet.  
   Destination: Pillars.

2. **≈30 — Acres in the vision**  
   Visual language: land contour / forest-gold.  
   Destination: Gateway vision.

3. **2029 — SCOF target review**  
   Visual language: disciplined numeric command / mineral-black-gold.  
   Destination: SCOF evidence page.

4. **All — Generations included**  
   Visual language: connected branches / warm ivory-plum.  
   Destination: Heritage and family participation.

### 8.2 Shelf design

- Desktop: four cards visible together.
- Tablet: two and a half cards, indicating horizontal discovery.
- Mobile: one and a quarter cards with scroll snapping.
- Each card has a large numeral, label, quiet icon and one-line meaning.
- Cards must not look like entertainment posters; they are institutional story portals.
- Include section heading: **“The legacy in four signals.”**

### 8.3 “Dancing” interaction

Use controlled life:

- On first scroll into view, the shelf settles upward in a four-card stagger.
- Hover/focus lifts a card 6–8px and increases its border glow.
- The icon makes one small 2–4-degree or 2px response.
- The numeral gains a soft illuminated edge.
- The active card may expand by 2–3%, while neighbours remain stable.
- On touch, use pressed depth rather than hover animation.
- No continuous bounce.

## 9. Roots-to-Legacy journey rail

Transform the existing text flow into a five-chapter cinematic rail:

```text
ROOTS → KNOWLEDGE → OPPORTUNITY → PROSPERITY → LEGACY
```

### 9.1 Chapter cards

**Roots**

- ARROR, Guga, family history and land stewardship.
- Forest/plum background.
- Rooted-tree or contour icon.

**Knowledge**

- Education, mentorship, Akademie and global learning.
- Ivory/violet background.
- Open-book icon.

**Opportunity**

- Careers, diaspora, technology, agriculture and enterprise.
- Mineral-blue/violet background.
- Compass/path icon.

**Prosperity**

- Productive businesses, market access and responsible value creation.
- Forest/gold background.
- Growth/market icon.

**Legacy**

- Future generations, ARROR City vision and durable institutions.
- Deep plum/gold background.
- Horizon/heritage mark.

### 9.2 Desktop behaviour

- Five connected cards remain visible across the width.
- The connecting arrow is a gold line that illuminates from left to right once when entering the viewport.
- Hover/focus raises one chapter and reveals a one-sentence explanation.
- Clicking moves to the corresponding part of the website.
- Preserve a clear linear reading order.

### 9.3 Mobile behaviour

- Horizontal scroll-snap rail.
- One full card plus a visible edge of the next.
- A small “Swipe the family journey” instruction appears once.
- Arrows remain semantic separators within each card or are visually represented without being announced repeatedly by screen readers.
- The rail must not auto-scroll.

### 9.4 Choreography

- Roots begins with a quiet gold pulse.
- The connector travels toward Knowledge.
- Each chapter settles as the line reaches it.
- Legacy receives one final gold halo.
- Entire sequence lasts no more than 1.6 seconds and runs once per page visit unless replayed intentionally.

### 9.5 Institutional proof band

Immediately after the journey rail, add the proof that the vision is governed and sustainable:

> **Built for generations, governed for trust.**  
> Patron-led family stewardship. Independent financial control. Measurable sustainability. Technology and execution by ST-Firm.

Four evidence cards:

1. **Patron** — Hon. Solomon Saigut Cherogony, only after formal Family Assembly appointment and written acceptance.
2. **Governance** — Family Charter, Family Assembly and accountable Development Council.
3. **Sustainability** — five capitals: heritage, natural, human/social, productive/financial and institutional/digital.
4. **Execution** — ST-Firm systems, evidence and approved delivery scopes.

The band links to `/governance-sustainability`. It does not include a UDA logo, campaign endorsement, voter form, donation button or Solomon Ops call to action. If the Patron has not yet been formally appointed, the card must read **Proposed Patron**.

Visual treatment:

- midnight-plum foundation with a restrained gold governance line;
- KO crest at the institutional centre;
- four cards reveal in reading order, not as spinning ornaments;
- evidence-status chips show `Approved`, `Baseline in progress` or `Report due` only when accurate;
- mobile becomes a semantic vertical stack; and
- reduced-motion mode shows all content without animated dependencies.

## 10. Background continuity

The two-scene carousel, statistics shelf and journey rail should feel like one opening chapter.

### Scene One background

- Deep ceremonial plum.
- Faint topographic texture.
- Violet light from upper left.
- Forest glow from lower left.

### Scene Two background

- Derived directly from the artwork's plum, forest and gold colours.
- Sharp original artwork stays visually dominant.

### Statistics transition

- Device frame visually “lands” into a dark mineral shelf.
- A thin gold line carries the viewer into the statistics.

### Journey transition

- Mineral shelf warms toward ivory/forest chapter surfaces.
- The route/light motif from the artwork continues through the five-stage arrow.

No hard white gap should break the story between carousel, statistics and Roots-to-Legacy rail.

## 11. Responsive content rules

### Large desktop, 1440px and wider

- Full premium frame.
- Scene One 60/40 split.
- Scene Two full artwork.
- Four statistic cards visible.
- All five journey chapters visible.

### Standard laptop, 1024–1439px

- Reduce frame radius and side padding.
- Scene One approximately 58/42.
- Keep headline within three lines.
- Four statistic cards may reduce internal copy.
- Journey remains five columns if readable; otherwise becomes a scroll rail.

### Tablet, 768–1023px

- Scene One becomes layered: text first, crest behind/right at lower opacity.
- Device bezel thins.
- Statistics become two-column or horizontal shelf.
- Journey becomes scroll-snap.

### Mobile, below 768px

- No simulated phone bezel.
- Scene One stacks text, buttons and chips.
- Scene Two uses the deliberate split composition described above.
- Controls remain at least 44×44px.
- Statistics and journey both use manual horizontal scrolling.
- Disable parallax and complex depth effects.

### Short screens

- Reduce decorative space before reducing text legibility.
- Allow the carousel to extend below the fold rather than squeezing content into an unreadable viewport.
- Keep both calls to action reachable.

## 12. Accessibility specification

- Use a labelled carousel region and identify it as a carousel for assistive technology.
- Give each scene an accessible name, such as “Scene 1 of 2: One Family.”
- Do not repeatedly announce automatic scene changes through an aggressive live region.
- Pause rotation when keyboard focus enters.
- Provide previous, next and pause buttons in the tab order.
- Indicators must be buttons, not decorative dots.
- Preserve strong focus styles over both light and dark scenes.
- Scene Two requires meaningful alternative text describing its relationship from ARROR roots through future development.
- Embedded image text must also exist in accessible HTML or an equivalent description.
- With reduced motion, replace sliding/parallax with an instant or short crossfade and disable all route pulses.
- With JavaScript unavailable, Scene One remains visible and Scene Two appears as a normal following feature.
- Do not make any content available only through animation.

## 13. Performance and asset plan

- Keep Scene One HTML/CSS-first.
- Optimise the 2.44MB PNG into a quality-controlled WebP/AVIF derivative for the hero while retaining the source asset.
- Preserve `og-family-embassy.png` for social preview unless a separate social card is approved.
- Generate exact responsive dimensions rather than downloading the full original on every phone.
- Preload only the initially visible scene-critical asset.
- Scene Two asset may preload after first render or during idle time if Scene One opens first.
- No automatic background video in Version 1.
- Avoid adding a large animation library for two slides; use CSS transforms and a small React controller.
- Animate only transform and opacity where possible.
- Reserve dimensions to eliminate layout shift.

## 14. Component plan

Proposed components:

```text
app/
├── LandingCarousel.tsx
├── LandingSceneFamily.tsx
├── LandingSceneArtwork.tsx
├── CarouselControls.tsx
├── LegacySignalShelf.tsx
├── RootsLegacyRail.tsx
└── useLandingCarousel.ts
```

Responsibilities:

### `LandingCarousel`

- Own scene list and viewport frame.
- Manage active scene and direction.
- Coordinate automatic timing and pause conditions.
- Provide accessible carousel labelling.

### `LandingSceneFamily`

- Render current family hero text as HTML.
- Keep calls to action and identity chips semantic.
- Render ceremonial crest zone.

### `LandingSceneArtwork`

- Render responsive artwork through `<picture>` or controlled image variants.
- Provide accessible description.
- Apply desktop/mobile compositions.

### `CarouselControls`

- Previous, next, direct indicators, progress and pause.
- Expose clear labels and focus state.

### `LegacySignalShelf`

- Render the four statistic portals.
- Provide manual horizontal scrolling at narrow widths.

### `RootsLegacyRail`

- Render five semantic stages and corresponding links.
- Run the one-time connector animation.

### `useLandingCarousel`

- Timing.
- Visibility pause.
- hover/focus pause.
- swipe intent.
- reduced-motion response.
- cleanup and event safety.

## 15. State model

Minimum state:

- active scene: 0 or 1;
- transition direction;
- paused by user;
- temporarily paused by hover/focus/visibility;
- touch start/end coordinates;
- progress interval start;
- reduced-motion preference.

Do not store private or durable data. Browser storage may remember only the user's carousel pause preference.

## 16. Interaction edge cases

- Rapid repeated next/previous presses must not queue broken transitions.
- Swiping during transition should be ignored until settle.
- Resizing should preserve the active scene.
- Background tab return should not jump immediately to another scene.
- Focus should never move when a scene rotates.
- A button clicked near the interval end must navigate, not lose the click to transition.
- The header logo race and hero carousel must not compete simultaneously; if the full logo routine runs, pause large hero decorative motion.
- If the artwork fails to load, show the Scene Two HTML title and a matching plum/forest fallback—not a broken-image icon.

## 17. Validation matrix

### Visual

- Title, KO emblem, rooted tree and future city remain legible on desktop.
- Mobile presentation does not crop away the story.
- No controls cover embedded artwork text.
- Device frame does not reduce useful mobile space.
- Statistics and journey feel connected to the hero.

### Functional

- Both buttons on Scene One work.
- Scene Two actions work.
- Previous/next/indicators/pause work.
- Swipe does not block vertical scrolling.
- Rotation pauses on focus, hover and hidden tab.
- Manual selection resets progress correctly.

### Accessibility

- Keyboard order is logical.
- Reduced-motion version works.
- Labels announce two scenes accurately.
- Focus remains visible.
- Artwork has a useful accessible description.

### Performance

- No layout shift when artwork arrives.
- Optimised asset is served at the appropriate size.
- Animations stay smooth on mid-range mobile hardware.
- No large dependency is added solely for the carousel.

## 18. Implementation sequence

### Step 1 — Content and asset lock

- Approve exact Scene One wording.
- Confirm rights and final text within the artwork.
- Confirm calls to action.
- Approve the “cinematic frame” wording and device treatment.

### Step 2 — Static two-scene structure

- Build frame, both scenes and responsive layout without automatic motion.
- Verify the artwork at all target aspect ratios.
- Approve desktop and mobile composition.

### Step 3 — Manual interaction

- Add indicators, arrows, pause and swipe.
- Validate links and keyboard behaviour.

### Step 4 — Controlled choreography

- Add scene transition.
- Add one-time entrance sequences.
- Add shelf lift and journey connector.
- Add reduced-motion fallbacks.

### Step 5 — Asset and performance pass

- Produce and compare responsive image derivatives.
- Confirm visual quality of the embedded typography.
- Measure loading and animation behaviour.

### Step 6 — Family preview gate

- Show desktop, tablet and mobile versions privately.
- Record corrections.
- Obtain public-release approval before deployment.

## 19. Acceptance criteria

The landing experience is complete only when:

1. It contains exactly two approved scenes.
2. Scene One preserves the supplied current family wording.
3. Scene Two uses the supplied Kap Ossen artwork prominently.
4. Each scene occupies the full landing viewport appropriately.
5. Desktop receives the premium cinematic/device frame.
6. Mobile avoids destructive cropping and unnecessary simulated hardware.
7. Carousel controls are obvious, keyboard accessible and touch friendly.
8. Automatic rotation is slow, pausable and respectful.
9. Reduced-motion behaviour works.
10. The four statistics appear immediately below as an interactive shelf.
11. Roots → Knowledge → Opportunity → Prosperity → Legacy appears as a five-stage journey rail.
12. Movement feels alive but never distracts from reading.
13. The ticker, navigation and logo race remain stable.
14. No Amazon, Disney or Apple branding or copied assets appear.
15. Performance, mobile and privacy checks pass.
16. The family publication authority approves the final result.
17. The institutional proof band correctly separates the Patron, Family Assembly/Council, ST-Firm, ARROR City Legacy and Solomon Ops.
18. Hon. Solomon Saigut Cherogony is shown as Patron only after the appointment and acceptance instruments are complete; otherwise the card says “Proposed Patron.”
19. The sustainability card links to real commitments and dated evidence states, not decorative unsupported scores.
20. No political call to action or campaign data collection appears in the family-governance band.

## 20. Rights and design-control notice

**© 2026–2027 ST-Firm | Kap Ossen Family Heritage Project. All Rights Reserved.**  
**ST-Firm — Idee Meet’s Tech.**

This plan uses general cinematic-carousel and content-discovery principles for design research. It does not authorise copying Amazon, Prime Video, Disney, Disney+, Apple or iPhone trademarks, protected artwork, software, interface assets or trade dress. The Kap Ossen artwork and its underlying elements remain subject to the project's documented ownership and approval rules.

## 21. Research references

- Prime Video Feature Rotator specification: <https://advertising.amazon.com/resources/ad-specs/prime-video/feature-rotator>
- Amazon description of immersive carousels and Super Carousel presentation: <https://www.aboutamazon.com/news/entertainment/prime-video-makes-it-easier-to-find-your-favorite-content>
- Disney+ 2026 homepage and hero-carousel redesign: <https://www.disneyplus.com/explore/articles/disney-plus-app-redesign-new-features>
- Disney+ accessibility overview: <https://help.disneyplus.com/es-US/article/disneyplus-accessibility>
