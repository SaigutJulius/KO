# Kap Ossen Top-Banner Logo Race — Design and Implementation Plan

**Status:** Draft V1 flat, transparent, JPEG, WebP, icon and 3D logo assets produced locally; identity approval, vector refinement and website integration remain pending.  
**Reference studied:** Existing ST-Firm × KENAFF header, logo tiles and motion choreography.  
**Goal:** Give the Kap Ossen family website the same memorable racing-logo energy while creating an original, premium family identity.

## 1. What the reference currently does

The ST-Firm × KENAFF header contains:

- a programme/market ticker at the top;
- a sticky navigation bar below it;
- KENAFF and ST-Firm logos placed inside white, shining logo chips;
- four motion routines named dash-dance, centre-stage, relay-chase and leapfrog;
- staggered timing so one logo leads and the second follows;
- dust, spark and motion-trail particles;
- transform/opacity animation to prevent layout movement;
- a static, safe presentation on small screens and for people who request reduced motion.

The Kap Ossen version should reuse this interaction idea and engineering logic, but it should not simply paste the KENAFF partnership identity into the family brand.

## 2. Brand hierarchy

### Permanent primary identity

**Kap Ossen Family** must remain the permanent top-level identity.

### Supporting identities

- ST-Firm may appear as a technology/enabling identity where the relationship is approved.
- SCOF may appear inside the SCOF development section.
- KENAFF should appear only in an approved partnership or agriculture context. Its logo must not be used in a way that suggests an endorsement, ownership or formal Kap Ossen partnership that has not been confirmed.

## 3. Proposed Kap Ossen crest

### Core shape

- Circular family seal representing unity and continuity.
- Interlocking **K** and **O** monogram at the centre.
- Twelve restrained outer markers representing the twelve family-development pillars.
- A subtle lower contour inspired by the land and hills of ARROR/Baringo.
- A small growth/coffee-leaf detail representing agriculture and future prosperity.

### Crest wording

Primary wordmark:

**KAP OSSEN**

Supporting line:

**KAP OSSEN · ARROR · EST. 2026**

The canonical crest itself should contain only the **KO** monogram. Keep “KAP OSSEN,” “FAMILY EMBASSY,” “ARROR,” “EST. 2026” and the motto in controlled wordmark or ceremonial lockups so the core emblem remains timeless, legible and reusable through 2050 and beyond.

Possible ceremonial motto version:

**UNITED IN HERITAGE · BUILDING THE FUTURE TOGETHER**

### Colour system

- Heritage plum: `#351052`
- Deep ceremonial plum: `#210835`
- Kinetic violet: `#7C3AED`
- Legacy gold: `#D3A745`
- Warm ivory: `#FFFDF9`
- Land/coffee forest: `#194A38`

### Logo asset set to prepare

1. Full ceremonial crest.
2. Simplified KO monogram for the moving header chip.
3. Horizontal Kap Ossen wordmark.
4. One-colour dark version.
5. One-colour light version.
6. Transparent high-resolution PNG/WebP assets for the site.
7. Social-card and favicon treatments.

### Draft V1 asset pack produced on 1 August 2026

The local project now contains:

- canonical transparent crest PNG/WebP derivatives;
- header and icon monogram sizes;
- plum and ivory JPEG previews;
- premium 3D plum PNG/WebP/JPEG treatments;
- a JSON manifest with dimensions, modes, sizes and hashes;
- a reproducible raster-derivative builder;
- an internal Logo Asset Register containing prompts, provenance, rights status and motion rules; and
- a standalone local 3D ceremonial bounce preview.

Primary locations:

- `public/brand/kap-ossen/`
- `brand-source/kap-ossen/ASSET_REGISTER.md`
- `scripts/build_kap_ossen_logo_pack.py`

These files are technically usable Draft V1 assets, not a final registered mark. Family Assembly symbolism approval, brand custodianship, chain-of-title, trademark review and human-refined vector masters remain required before final release.

The current CSS “KO” circle can remain as a temporary fallback until the final crest is approved.

## 4. Top-banner composition

### Layer 1 — SCOF intelligence rail

Retain the existing 50–56 pixel dark scrolling rail showing:

- SCOF official issuer-set price: KSh 165;
- strategic checkpoint: KSh 545;
- checkpoint date: 29 October 2029;
- value movement: +KSh 380 / 3.30×;
- separate long-horizon aspiration: EUR 45 per SCOF, not guaranteed;
- family opportunity and development updates.

### Layer 2 — Kap Ossen navigation and race lane

Proposed desktop order:

```text
[KO CREST]  KAP OSSEN FAMILY      Vision · Heritage · Land Vision · SCOF · Roadmap      [SITUATION ROOM]
```

The KO crest and compact wordmark will sit in polished ivory/glass logo chips. The navigation itself will remain still and usable while the decorative logo elements animate in a separate protected layer.

### Mobile order

```text
[KO CREST] KAP OSSEN                                      [MENU]
```

Mobile animation will be limited to a soft gold shine or a tiny ceremonial lift. No full-width racing movement should occur on narrow screens.

## 5. Logo-race story

The animation should communicate family history and forward movement rather than looking like a random game.

### Routine 1 — Legacy Launch

- The KO crest rests and pulses once.
- It crouches slightly, accelerates across the safe header lane and returns.
- A restrained plum-and-gold trail represents movement from heritage into opportunity.

### Routine 2 — ARROR to the World

- The KO crest begins at the family-home position.
- It travels through three subtle waypoints representing Kenya, Europe and the wider diaspora.
- It finishes back at the family-home position, communicating knowledge returning home.

### Routine 3 — Heritage × Technology Relay

- The KO crest completes the first leg.
- The ST-Firm mark completes the technology leg only when the ST-Firm relationship is approved for public display.
- The two marks finish together rather than competing, communicating partnership and knowledge transfer.

### Routine 4 — Twelve-Pillar Orbit

- Twelve small gold/violet signals appear around the KO crest.
- The crest performs a short centre-stage movement.
- The signals collapse into one family seal, representing many pillars and one connected future.

### Routine 5 — Homecoming Finish

- The crest makes one elegant leap.
- It lands with a very small gold particle burst.
- The motto briefly becomes more visible:

**United in Heritage. Building the Future Together.**

## 6. Treatment of the ST-Firm and KENAFF logos

### ST-Firm

- May be used in the approved Heritage × Technology relay.
- Presented with a label such as **Technology and Systems** or **Powered by ST-Firm** only after the exact relationship wording is confirmed.
- The existing transparent ST-Firm web asset can be reused from the KENAFF project rather than redownloaded.

### KENAFF

- Should not permanently lead the Kap Ossen family header.
- May appear in an approved agricultural-partnership moment, SCOF section or partner carousel.
- If a header cameo is approved, it should be introduced as **Agricultural Partnership Vision** or another precise approved label.
- The existing KENAFF web asset can be reused locally, but public use still requires correct relationship and permission language.

## 7. Visual effects

### Logo chips

- Warm-white or ivory surface.
- Thin violet/gold border.
- Soft contact shadow.
- Convex highlight across the top edge.
- Correct optical sizing for circular and horizontal marks.

### Trails and particles

- Plum energy trail.
- Gold landing sparks.
- Forest-green agriculture particles when KENAFF/SCOF context is active.
- Small particle limits to preserve performance.
- No heavy smoke obscuring navigation or text.

### Shine

- A controlled metallic highlight crosses the KO crest periodically.
- No constant flashing.
- Animation pauses when the browser tab is hidden.

## 8. Timing and motion rules

- Each full routine: approximately 10–13 seconds.
- Rest period between routines: approximately 4–7 seconds.
- Use a shuffled rotation so the same routine does not repeat consecutively.
- Animate only transform and opacity where possible.
- The race must never move the actual navigation links.
- The logo must always return precisely to its home chip.
- Header animation pauses on hover/focus when it might distract from navigation.
- Animation stops when the page is not visible.

## 9. Accessibility and device behaviour

- Full choreography on larger desktop screens only.
- Short in-place ceremonial movement on tablets.
- Static or shine-only presentation on phones.
- Honour `prefers-reduced-motion` with a fully static logo.
- Decorative particles hidden from screen readers.
- Logo link receives the accessible name **Kap Ossen Family — Home**.
- Do not allow animation to change the clickable target or cause content reflow.
- Maintain sufficient contrast, readable navigation and 44-pixel minimum touch targets.

## 10. Proposed technical structure

When implementation is approved, create:

- a dedicated client-side `BrandRace` component;
- a fixed race-effects layer inside the sticky header;
- reusable logo-chip components;
- a motion-routine library adapted from the existing KENAFF logic;
- strict particle and timing limits;
- reduced-motion and mobile fallbacks;
- no live network dependency for logo assets.

The Kap Ossen component will be written for the current React/vinext project rather than pasting the old static JavaScript directly into the new site.

## 11. Implementation sequence

### Step 1 — Approve identity direction

- Confirm crest wording.
- Use the confirmed public spelling **ARROR**.
- Confirm use of the coffee leaf and twelve-pillar markers.

### Step 2 — Produce logo assets

- Full crest.
- Moving KO monogram.
- Horizontal wordmark.
- Light/dark variants.

### Step 3 — Build the static header

- Insert crest and wordmark.
- Add appropriate navigation.
- Confirm desktop/mobile spacing before motion.

### Step 4 — Build the race choreography

- Legacy Launch.
- ARROR to the World.
- Heritage × Technology relay.
- Twelve-Pillar Orbit.
- Homecoming Finish.

### Step 5 — Add supporting marks carefully

- Add ST-Firm only with approved wording.
- Add KENAFF only in its confirmed partnership context.
- Add SCOF inside its own value-development context.

### Step 6 — Validate

- Desktop and mobile layout.
- Reduced-motion presentation.
- Keyboard access.
- Performance and smoothness.
- No overlap with the SCOF ticker.
- No accidental partnership or endorsement claim.

## 12. Recommended final direction

Use a **two-piece Kap Ossen identity** in the permanent header:

1. the circular KO family crest;
2. the horizontal KAP OSSEN wordmark.

These two family marks perform the normal racing sequences. ST-Firm receives an occasional, approved technology-relay role. KENAFF remains in the agricultural partnership/SCOF context unless its permanent header use is formally approved.

This preserves the memorable energy of the ST-Firm × KENAFF site while making the Kap Ossen website feel like its own powerful family institution.
