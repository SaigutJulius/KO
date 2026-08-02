import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

async function fetchPublicAsset(request) {
  const pathname = decodeURIComponent(new URL(request.url).pathname);
  if (pathname.includes("..")) return new Response("Bad request", { status: 400 });
  const extension = pathname.slice(pathname.lastIndexOf(".")).toLowerCase();
  try {
    const bytes = await readFile(new URL(`../public${pathname}`, import.meta.url));
    return new Response(bytes, {
      status: 200,
      headers: { "Content-Type": mimeTypes[extension] ?? "application/octet-stream" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function fetchWorker(path = "/", env = { ASSETS: { fetch: fetchPublicAsset } }) {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: path === "/" ? "text/html" : "*/*" } }),
    env,
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Kap Ossen Family Embassy", async () => {
  const response = await fetchWorker();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Kap Ossen Family Embassy \| From Heritage to Legacy<\/title>/i);
  assert.match(html, /Descendants of the late Dickson Ossen Cherogony/i);
  assert.match(html, /One living legacy/i);
  assert.match(html, /ST-Firm systems layer/i);
  assert.match(html, /Five gateways\. Clear status\. One connected legacy\./i);
  assert.match(html, /ARROR City Legacy · 2050/i);
  assert.match(html, /Heritage · Technology · Legacy/i);
  assert.match(html, /Proposed technology &amp; design partner/i);
  assert.match(html, /29 October 2029/i);
  assert.match(html, /KSh 545/i);
  assert.match(html, /€45/i);
  assert.match(html, /Proposed Patron/i);
  assert.match(html, /Berlin, Deutschland/i);
  assert.match(html, /INTERNAL REVIEW/i);
  assert.doesNotMatch(html, /\/_vinext\/image/i);
});

test("serves every visible brand asset directly with the correct media type", async () => {
  const assets = [
    ["/brand/kap-ossen/ko-monogram-header-256.webp", "image/webp"],
    ["/st-firm-logo.png", "image/png"],
    ["/brand/kap-ossen/ko-crest-primary-transparent-1024.png", "image/png"],
    ["/og-family-embassy.png", "image/png"],
    ["/brand/kap-ossen/ko-crest-3d-plum-1200.jpg", "image/jpeg"],
    ["/showcase/st-firm-partner.webp", "image/webp"],
    ["/showcase/ssos-symbol.webp", "image/webp"],
    ["/showcase/green-ki-desktop.webp", "image/webp"],
    ["/showcase/green-ki-mobile.webp", "image/webp"],
    ["/showcase/ssos-desktop.webp", "image/webp"],
    ["/showcase/ssos-mobile.webp", "image/webp"],
    ["/showcase/scof-coin-desktop.webp", "image/webp"],
    ["/showcase/scof-coin-mobile.webp", "image/webp"],
    ["/showcase/scof-coin-transparent.png", "image/png"],
    ["/showcase/scof-coin-transparent.webp", "image/webp"],
    ["/showcase/scof-coin-transparent-mobile.webp", "image/webp"],
  ];

  for (const [path, expectedType] of assets) {
    const response = await fetchWorker(path);
    assert.equal(response.status, 200, `${path} should load`);
    assert.equal(response.headers.get("content-type"), expectedType);
    assert.ok((await response.arrayBuffer()).byteLength > 1_000, `${path} should not be blank`);
  }
});

test("keeps the SCOF coin as a real transparent cut-out", async () => {
  const input = fileURLToPath(new URL("../public/showcase/scof-coin-transparent.png", import.meta.url));
  const image = sharp(input);
  const metadata = await image.metadata();
  assert.equal(metadata.hasAlpha, true);
  assert.equal(metadata.width, 1254);
  assert.equal(metadata.height, 1254);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const alphaAt = (x, y) => data[(y * info.width + x) * 4 + 3];
  assert.equal(alphaAt(0, 0), 0);
  assert.equal(alphaAt(info.width - 1, 0), 0);
  assert.equal(alphaAt(0, info.height - 1), 0);
  assert.equal(alphaAt(info.width - 1, info.height - 1), 0);
});

test("returns a controlled response when the optional image binding is absent", async () => {
  const response = await fetchWorker(
    "/_vinext/image?url=%2Fst-firm-logo.png&w=256&q=75",
    {},
  );
  assert.equal(response.status, 503);
  assert.match(await response.text(), /unavailable in this preview/i);
});

test("keeps required experience, governance and mobile safeguards in source", async () => {
  const [page, chrome, hero, signal, ceremony, brandRace, footer, css, layout, timeline, scofConfig, roster] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/HeroCarousel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/LegacySignalDetector.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/KoLegacySequence.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/BrandRace.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/FooterFinale.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/finaleMediaTimeline.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/scofValueConfig.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ScofValueRoster.tsx", import.meta.url), "utf8"),
  ]);

  for (const id of ["family-tree", "gallery", "land-vision", "governance", "sustainability", "scof-value"]) {
    assert.match(page, new RegExp(`id=["']${id}["']`));
  }
  assert.match(chrome, /className="stickyShell"/);
  assert.match(chrome, /aria-expanded=\{open\}/);
  assert.match(hero, /aria-roledescription="carousel"/);
  assert.match(hero, /prefers-reduced-motion/);
  assert.match(hero, /IntersectionObserver/);
  assert.match(hero, /const SCENE_DURATION = 3_800/);
  assert.match(hero, /const SWIPE_THRESHOLD = 45/);
  assert.match(hero, /const IDLE_TRIGGER_TIME = 24_000/);
  assert.match(hero, /const SIGNAL_WARNING_TIME = 18_000/);
  assert.match(hero, /LegacySignalDetector/);
  assert.match(hero, /legacy-signal-reset/);
  assert.match(hero, /KoLegacySequence/);
  assert.match(hero, /webkitAudioContext/);
  assert.match(hero, /ceremonyReplay/);
  assert.match(hero, /window\.setTimeout/);
  assert.doesNotMatch(hero, /setInterval/);
  assert.doesNotMatch(hero, /\bhovered\b|\bfocusWithin\b/);
  assert.match(hero, /loading="eager" fetchPriority="high"/);
  assert.match(hero, /className="carouselProgress"/);
  assert.match(hero, /className=\{`heroCarousel scene\$\{active \+ 1\}/);
  assert.match(hero, /className="legacyOrbit"/);
  assert.match(hero, /const orbitNodes = \["Heritage", "Family", "Land", "Knowledge", "Enterprise"\]/);
  assert.doesNotMatch(hero, /heroTags/);
  assert.doesNotMatch(hero, /Shared roots/);
  assert.match(signal, /LEGACY SIGNAL ACTIVE/);
  assert.match(signal, /Kap Ossen identity detected/);
  assert.match(signal, /SIGNAL RESET/);
  assert.match(signal, /signalTick/);
  assert.doesNotMatch(signal, /Math\.random/);
  assert.match(ceremony, /KAP OSSEN/);
  assert.match(ceremony, /TAAAAAAAAAAAAAI/);
  assert.match(ceremony, /KIBENDIIIIIIIIIIII!/);
  assert.match(ceremony, /SpeechSynthesisUtterance/);
  assert.match(ceremony, /createOscillator/);
  assert.match(ceremony, /Array\.from\(\{ length: 36 \}/);
  assert.doesNotMatch(ceremony, /Math\.random/);
  for (const phase of ["foundation", "st-firm", "green-ki", "ssos", "scof", "ecosystem", "declaration", "return"]) {
    assert.match(ceremony, new RegExp(`phase: "${phase}"`));
  }
  for (const asset of ["st-firm-partner.webp", "green-ki-desktop.webp", "ssos-desktop.webp", "scof-coin-transparent.webp"]) {
    assert.match(ceremony, new RegExp(asset.replace(".", "\\.")));
  }
  assert.match(ceremony, /Berlin, Deutschland ↔ ARROR, Kenya/);
  assert.match(ceremony, /29 October 2029/);
  assert.match(ceremony, /scof-coin-transparent\.webp/);
  assert.match(ceremony, /scof-coin-transparent-mobile\.webp/);
  assert.doesNotMatch(ceremony, /\bGermany\b|ST-Firm GmbH/);
  assert.match(brandRace, /setRoutine\(\(value\) => \(value \+ 1\) % 4\)/);
  assert.match(brandRace, /className=\{`raceEffects/);
  assert.match(brandRace, /className=\{`shootingStar star\$\{star\}`\}/);
  assert.match(brandRace, /className=\{`glassBubble bubble\$\{bubble\}`\}/);
  assert.match(brandRace, /prefers-reduced-motion/);
  assert.doesNotMatch(brandRace, /Math\.random/);
  assert.match(footer, /IntersectionObserver/);
  assert.match(footer, /threshold: 0\.18/);
  assert.match(footer, /FINALE_TOTAL_SECONDS/);
  assert.match(footer, /ceremonyTimeFromSourceTime/);
  assert.match(footer, /NEXT_PUBLIC_FINALE_TRACK/);
  assert.doesNotMatch(footer, /vidssave\.com BIEN X ALIKIBA_ FINALE OFFICIAL MUSIC VIDEO 720P\.mp4/);
  assert.match(footer, /playsInline/);
  assert.match(footer, /pictureInPictureEnabled/);
  assert.match(footer, /displayMode === "half"/);
  assert.match(footer, /displayMode === "fullscreen"/);
  assert.match(footer, /displayMode === "floating"/);
  assert.doesNotMatch(footer, /playOscillatorCue|createOscillator/);
  assert.match(timeline, /FINALE_TOTAL_SECONDS = 94/);
  for (const range of ["sourceStart: 5", "sourceEnd: 16", "sourceStart: 55", "sourceEnd: 87", "sourceStart: 109", "sourceEnd: 160"]) assert.match(timeline, new RegExp(range));
  for (const phase of ["scof", "kap", "firm", "finale", "rest"]) assert.match(timeline, new RegExp(`key: "${phase}"`));
  assert.match(scofConfig, /kes: 165/);
  assert.match(scofConfig, /kes: 545/);
  assert.match(scofConfig, /dateIso: "2029-10-29"/);
  assert.match(scofConfig, /eur: 45/);
  assert.match(scofConfig, /eurKes: 148\.12/);
  assert.match(roster, /Current price · Strategic checkpoint · Long-horizon aspiration/);
  assert.match(footer, /prefers-reduced-motion/);
  assert.match(footer, /className="footerSky" aria-hidden="true"/);
  assert.match(footer, /className="footerAlliance"/);
  assert.match(footer, /className="footerPerformanceStage"/);
  assert.match(footer, /className="footerPhaseRail"/);
  assert.match(footer, /className="finaleMediaControls"/);
  assert.match(footer, /className="footerStaticStageLockup"/);
  assert.match(footer, /proposed ST-Firm 94-second relationship sequence/);
  assert.match(footer, /className="footerIdentityDeck"/);
  assert.match(footer, /className="footerLinks footerNavigationDeck"/);
  assert.match(footer, /className="footerLegal footerLegalChamber"/);
  assert.match(footer, /KAP OSSEN <i>×<\/i> ST‑FIRM/);
  assert.match(footer, /scofSnowflake/);
  assert.match(footer, /scofMonument/);
  assert.match(footer, /koPillar/);
  assert.match(footer, /firmCircuit/);
  assert.match(footer, /ScofValueRoster/);
  assert.doesNotMatch(footer, /footerShowTitle/);
  assert.doesNotMatch(footer, /Math\.random/);
  assert.match(page, /className="productDock"/);
  assert.match(page, /className="legacySnapshot"/);
  assert.match(css, /position:sticky/);
  assert.match(css, /\.legacyOrbit\{/);
  assert.match(css, /\.orbitNodes\{position:absolute;inset:0/);
  assert.match(css, /\.orbitCore\{[\s\S]*?left:50%;[\s\S]*?top:50%;[\s\S]*?translate\(-50%,-50%\)/);
  assert.match(css, /\.koLegacySequence\{[\s\S]*?min-height:100svh;[\s\S]*?height:100dvh/);
  assert.match(css, /Elephant,var\(--font-heritage\)/);
  assert.match(css, /@keyframes koFragmentBreak/);
  assert.match(css, /@keyframes koShockwave/);
  assert.match(css, /\.koEcosystemStage\{/);
  assert.match(css, /\.legacySignalDetector\{/);
  assert.match(css, /@keyframes signalHunterArrive/);
  assert.match(css, /@keyframes signalBorderHunt/);
  assert.match(css, /@keyframes greenKiScan/);
  assert.match(css, /@keyframes scofCoinFloat/);
  assert.match(css, /@keyframes koPartnerArrive/);
  assert.match(css, /@keyframes koEcosystemSet/);
  assert.match(css, /\.phase-declaration \.koFinalDeclaration/);
  assert.match(css, /\.productDock\{/);
  assert.match(css, /\.artworkScene\.isActive>img\{animation:artworkBreathe/);
  assert.match(css, /@keyframes artworkShine/);
  assert.match(css, /\.scene1 \.artworkScene:not\(\.isActive\)/);
  assert.match(css, /\.scene2 \.familyScene:not\(\.isActive\)/);
  assert.match(css, /\.carouselRunning \.carouselProgress>i\{animation:carouselProgressFill 3\.8s/);
  assert.match(css, /artworkBreathe 6\.5s/);
  assert.match(css, /artworkShine 4\.8s/);
  assert.match(css, /filter:brightness\(1\.24\)/);
  for (const routine of [1, 2, 3, 4]) assert.match(css, new RegExp(`\\.brandRace\\.routine${routine}`));
  for (const animation of ["legacyChaseKo", "relayStar", "bubbleRise", "homecomingKo"]) assert.match(css, new RegExp(`@keyframes ${animation}`));
  assert.match(css, /\.raceEffects\{[\s\S]*?pointer-events:none/);
  assert.match(css, /@media\(max-width:620px\)\{[\s\S]*?--race-distance:72px/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?\.raceEffects\{display:none!important\}/);
  assert.match(css, /font-family:var\(--font-display\)/);
  assert.match(css, /font-family:var\(--font-heritage\)/);
  assert.match(css, /font-synthesis:none/);
  assert.match(css, /font-optical-sizing:auto/);
  assert.match(css, /-webkit-font-smoothing:antialiased/);
  assert.match(css, /\.branchGrid h3\{[^}]*font-size:clamp\(1rem/);
  for (const animation of ["scofSnowFall", "koPillarFire", "circuitLaunch", "finaleKoFlight", "footerBurst", "footerShockwave"]) assert.match(css, new RegExp(`@keyframes ${animation}`));
  assert.match(css, /\.footerSpectacle \.footerPerformanceStage\{[\s\S]*?height:clamp\(440px,38vw,560px\)/);
  assert.match(css, /\.footerSpectacle \.footerPhaseRail\{/);
  assert.match(css, /\.footerSpectacle \.scofWord\{[^}]*font-size:clamp\(3\.2rem,5vw,5\.6rem\)/);
  assert.match(css, /\.footerSpectacle \.koPillarRing\{[\s\S]*?width:clamp\(360px,34vw,430px\)/);
  assert.match(css, /\.footerSpectacle \.firmCircuitField\{[\s\S]*?width:clamp\(390px,39vw,480px\)/);
  assert.match(css, /--spectacle-pink:#f7c9e8/);
  assert.match(css, /\.footerCeremonyShell\.display-half/);
  assert.match(css, /\.footerCeremonyShell\.display-fullscreen/);
  assert.match(css, /\.footerCeremonyShell\.display-floating/);
  assert.match(css, /@keyframes protectedKoFinale/);
  assert.match(css, /@keyframes protectedStFinale/);
  assert.match(css, /\.scofValueRoster/);
  assert.match(css, /@keyframes spectacleBurst/);
  assert.match(css, /\.footerIdentityDeck\{[^}]*display:grid/);
  assert.match(css, /\.footerNavigationDeck\{[^}]*display:flex/);
  assert.match(css, /\.stHalo\{[^}]*background:#fffdf7/);
  assert.match(css, /\.legalSignature\{[^}]*font-family:var\(--font-display\)/);
  assert.match(css, /\.legalRights\{[^}]*font-family:var\(--font-heritage\)/);
  assert.match(css, /\.legalStatus\{[^}]*font-family:var\(--font-sans\)/);
  assert.match(css, /safe-area-inset-right/);
  assert.match(css, /@media\(forced-colors:active\)/);
  assert.match(css, /\.footerSky\{[^}]*pointer-events:none/);
  assert.match(css, /\.footerAlliance\{/);
  assert.doesNotMatch(css, /\.footerAlliance\{[^}]*opacity:0/);
  assert.match(css, /\.productRail\{display:flex;[^}]*overflow-x:auto/);
  assert.match(css, /\.orbitSweep,\.orbitCore \.ceremonial,\.networkPulse,\.artworkScene\.isActive>img,\.artworkScene\.isActive:after\{animation:none!important\}/);
  assert.match(css, /env\(safe-area-inset-top\)/);
  assert.match(css, /@media\(max-width:620px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(layout, /viewportFit:\s*"cover"/);
  assert.match(layout, /<body[\s\S]*suppressHydrationWarning/);
  assert.match(layout, /Bodoni_Moda/);
  assert.match(layout, /Fraunces/);
  assert.match(layout, /--font-display/);
  assert.match(layout, /--font-heritage/);
  assert.doesNotMatch(page, /\bGermany\b|\bGerman\b/);
});
