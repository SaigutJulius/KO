# Kap Ossen Logo Asset Register

**Asset family:** KO ceremonial orbital crest  
**Version:** Draft V1  
**Created:** 1 August 2026  
**Status:** Internal design draft; technically usable but not a final registered or publicly approved family mark  
**Required final authority:** Family Assembly and approved Kap Ossen brand custodian  
**Design and production workflow:** Engineer Saigut Julius Kipkorir / ST-Firm project with OpenAI-assisted image generation and local derivative production

## 1. Canonical direction

The canonical design direction is the orbital KO crest seen in `public/og-family-embassy.png`, because that is the identity explicitly selected by Engineer Saigut Julius Kipkorir for the Family Embassy.

The master emblem contains:

- the exact monogram `KO`;
- a circular midnight-plum ceremonial core;
- legacy-gold letters and linework;
- a double ring;
- restrained ARROR-inspired geometric patterning; and
- exactly twelve outer nodes representing the twelve strategic pillars.

The canonical crest contains no small perimeter wording and no end date. This keeps the emblem legible and usable beyond 2035 and 2050. `KAP OSSEN`, `FAMILY EMBASSY`, `ARROR`, `EST. 2026` and `FROM HERITAGE TO LEGACY` belong in separately typeset wordmark and ceremonial lockups.

The **flat transparent crest** is the canonical operational mark. The **3D crest** is a supporting ceremonial treatment and must never replace the flat master in legal, monochrome, small-size or registration contexts.

## 2. Source chain

| Source | Purpose | SHA-256 |
|---|---|---|
| `public/og-family-embassy.png` | Approved visual-reference artwork | `5E9BE944BFF74A844306142CCB8E4A707E8DF22E0182C19F865443658C40508C` |
| `brand-source/kap-ossen/ko-crest-chroma-source-v1.png` | Built-in image-generation flat crest on chroma background | `991763AA4B8BF2CB2B00272A94735F2542A80730243EA6760F788AD5B86FAA7E` |
| `brand-source/kap-ossen/ko-crest-flat-transparent-source-v1.png` | Background-extracted flat RGBA source | `DF8F5DCD38D9C34DD06C05483CB3D98A2A58FBF6AD42FD174FCB3FA7F5965335` |
| `brand-source/kap-ossen/ko-crest-3d-source-v1.png` | Built-in image-generation 3D ceremonial source | `099726010DA3C767F5CC478150F2808811309B43E556CF7C4E40D5F3CAC7BEC9` |

The full derivative list, dimensions, colour modes, byte sizes and SHA-256 hashes are generated in `public/brand/kap-ossen/manifest.json`.

## 3. Production files

### Canonical transparent crest

- `public/brand/kap-ossen/ko-crest-primary-transparent.png`
- `public/brand/kap-ossen/ko-crest-primary-transparent-1024.png`
- `public/brand/kap-ossen/ko-crest-primary-transparent-1024.webp`

### Header and icon monogram

- `public/brand/kap-ossen/ko-monogram-header-512.png`
- `public/brand/kap-ossen/ko-monogram-header-256.webp`
- `public/brand/kap-ossen/ko-monogram-512.png`
- `public/brand/kap-ossen/ko-monogram-512.webp`
- `public/brand/kap-ossen/ko-monogram-256.png`
- `public/brand/kap-ossen/ko-monogram-128.png`
- `public/brand/kap-ossen/ko-monogram-64.png`
- `public/brand/kap-ossen/ko-monogram-32.png`
- `public/brand/kap-ossen/ko-apple-touch-icon-180.png`
- `public/brand/kap-ossen/ko-app-icon-512.png`

### Flat JPEG previews

- `public/brand/kap-ossen/ko-crest-flat-plum-1200.jpg`
- `public/brand/kap-ossen/ko-crest-flat-ivory-1200.jpg`

JPEG cannot contain transparency. These are presentation and office-document previews, not masters.

### 3D ceremonial treatment

- `public/brand/kap-ossen/ko-crest-3d-plum.png`
- `public/brand/kap-ossen/ko-crest-3d-plum-1024.png`
- `public/brand/kap-ossen/ko-crest-3d-plum-1024.webp`
- `public/brand/kap-ossen/ko-crest-3d-plum-1200.jpg`

### Reproducible builder

- `scripts/build_kap_ossen_logo_pack.py`
- `public/brand/kap-ossen/logo-motion-preview.html` — local 3D ceremonial bounce laboratory with hover/focus pause, hidden-tab pause and reduced-motion fallback

The builder resizes, crops and flattens approved sources. It does not redraw or invent crest geometry.

## 4. Image-generation record

The two source images were created with the built-in image-generation workflow. No CLI/API fallback and no native-transparency model were used.

### Flat master prompt

```text
Use case: logo-brand
Asset type: Kap Ossen master emblem for website header, favicon, print and transparent logo pack
Input images: Image 1 is the approved visual reference; preserve its KO ceremonial-medallion identity and plum-and-gold character, but create a clean standalone logo rather than cropping the whole banner.
Primary request: Create one original, centered circular Kap Ossen family emblem with a bold interlocking monogram reading exactly "KO". Surround it with a refined double ceremonial ring, restrained ARROR-inspired geometric patterning, and exactly twelve small outward network markers representing the twelve strategic pillars. The emblem should communicate heritage, unity, stewardship and future systems.
Style/medium: vector-friendly flat brand mark with extremely clean edges, strong silhouette, symmetrical geometry, minimal fine detail, premium institutional finish.
Composition/framing: single centered emblem only, generous equal padding on all sides, perfectly front-facing, no perspective.
Color palette: deep midnight plum and heritage plum within the emblem, rich legacy gold linework and lettering, tiny restrained forest accent only if essential.
Text (verbatim): "KO" only. Render exactly these two letters once. No other words or numbers.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for local background removal. The background must be one uniform color with no shadows, gradients, texture, reflections, floor plane or lighting variation.
Constraints: do not use #00ff00 anywhere in the emblem; no cast shadow, no contact shadow, no reflection, no mockup, no watermark, no extra text, no crowns, no animals, no national emblems, no copied commercial branding. Keep the full emblem separated from the background with crisp edges and generous padding.
```

### 3D ceremonial prompt

```text
Use case: stylized-concept
Asset type: premium 3D ceremonial Kap Ossen logo for hero, presentation cover and motion-ready website treatment
Input images: Image 1 is the approved flat KO emblem reference. Preserve the exact central "KO" monogram, circular proportions, double ceremonial ring, geometric ARROR-inspired pattern and exactly twelve outer network markers.
Primary request: Render the same Kap Ossen emblem as a luxurious, front-facing three-dimensional medallion. Use polished brushed legacy-gold metal for the KO letters and linework, deep midnight-plum enamel for the core, and subtle darker plum insets. The dimensional depth should feel engineered and dignified, not flashy.
Scene/backdrop: seamless deep midnight-plum studio background with a restrained radial violet glow; no floor line.
Composition/framing: single centered emblem, perfectly front-facing, generous equal padding, full outer markers visible, square composition.
Lighting/mood: precise museum-quality rim lighting, restrained warm highlights, gentle dimensional shadow directly behind the medallion, premium family-institution mood.
Text (verbatim): "KO" only. Render exactly these two letters once. No other words or numbers.
Constraints: no crowns, animals, flags, national emblems, gemstones, extra symbols, extra text, watermark, mockup objects or unrelated logos. Keep exactly twelve outer markers and maintain a clean silhouette suitable for a controlled CSS hover/bounce animation.
```

## 5. Transparency process

The flat source used a removable chroma background. Local removal used the installed OpenAI image-generation helper with border sampling, soft matte, despill, transparent threshold `10` and opaque threshold `80`.

The first extraction attempt used a wider matte and removed too much of the gold KO monogram. It was rejected and removed from the public asset folder. The accepted source was visually validated with the KO letters, plum field, gold rings and twelve nodes intact.

## 6. Bouncing and 3D motion policy

The bouncing version is not a GIF or a second logo identity. It is a controlled CSS/Web Animations API treatment applied to an approved transparent PNG or WebP.

Recommended ceremonial bounce:

1. **Rest:** front-facing at `translateY(0)` and `rotateX(0deg)`.
2. **Anticipation:** compress to `scale3d(1.035, .965, 1)` for 140ms.
3. **Lift:** rise 12–18px, rotateX by 4deg and rotateY by -3deg.
4. **Apex:** one restrained gold highlight crosses the metal.
5. **Landing:** return through a small 2–3px overshoot.
6. **Settle:** stop completely; no continuous bouncing.

Timing:

- total active motion: 900–1200ms;
- idle period: at least 8 seconds;
- header race and hero carousel never run major motion simultaneously;
- hover/focus pauses motion;
- hidden tabs pause immediately;
- `prefers-reduced-motion` receives a static image and no moving shadow.

The contact shadow should be a separate CSS pseudo-element. Do not bake a shadow into the transparent canonical asset.

## 7. Rights and approval status

Before final public or trademark use, record:

- Family Assembly approval of the exact emblem and twelve-node meaning;
- the lawful Kap Ossen identity/trademark custodian;
- the distinction between family identity ownership and Julius/ST-Firm design/code copyright;
- an assignment or durable exclusive licence for the core mark;
- prompt, model, reference-artwork and human-production provenance;
- originality and trademark searches;
- colour and typeface approval;
- authorised contexts for ST-Firm or partner marks;
- versioned family and publication approval; and
- withdrawal, enforcement and correction contacts.

Pending that approval, use this line internally:

> Kap Ossen name and crest custodianship pending Family Assembly approval; draft design implementation by Engineer Saigut Julius Kipkorir, trading as ST-Firm.

Do not use `®`. Use `™` only after the responsible owner approves that policy.

## 8. Remaining human design work

The V1 raster pack is complete. Before calling the identity final, commission or produce:

- a human-refined vector master in SVG/PDF/EPS or editable design format;
- optical cleanup at 16px, 24px, 32px and 48px;
- one-colour positive and reverse versions;
- wordmark lockups typeset outside image generation;
- a controlled brand guide;
- print proofs;
- monochrome and emboss tests; and
- a signed final-release record.
