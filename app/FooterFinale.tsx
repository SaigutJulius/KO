"use client";

/* eslint-disable @next/next/no-img-element -- controlled local brand and media assets bypass Vinext's unavailable image optimizer */

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { Crest } from "./BrandRace";
import ScofValueRoster from "./ScofValueRoster";
import {
  FINALE_TOTAL_SECONDS,
  ceremonyTimeFromSourceTime,
  finaleMediaSections,
  finalePhases,
  formatCeremonyTime,
  phaseAtCeremonyTime,
  rosterAtCeremonyTime,
} from "./finaleMediaTimeline";
import { withBasePath } from "./sitePaths";

type DisplayMode = "embedded" | "half" | "fullscreen" | "floating";
type SafariVideo = HTMLVideoElement & {
  webkitSupportsPresentationMode?: (mode: string) => boolean;
  webkitSetPresentationMode?: (mode: string) => void;
  webkitPresentationMode?: string;
};

const MEDIA_PATH = process.env.NEXT_PUBLIC_FINALE_TRACK?.trim() ?? "";
const fireworks = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const bubbles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const snowflakes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] as const;
const pillars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const circuits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export default function FooterFinale() {
  const footerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastReportedTimeRef = useRef(-1);
  const wasInViewRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const [ceremonyTime, setCeremonyTime] = useState(0);
  const [inView, setInView] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [ceremonyStarted, setCeremonyStarted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("embedded");
  const [pipSupported, setPipSupported] = useState(false);

  const phase = phaseAtCeremonyTime(ceremonyTime);
  const scene = rosterAtCeremonyTime(ceremonyTime);
  const phaseIndex = finalePhases.findIndex((item) => item.key === phase.key);
  const phaseClass = `phase${phase.key.charAt(0).toUpperCase()}${phase.key.slice(1)}`;
  const sceneClass = `scene-${scene.id}`;
  const phaseProgress = Math.max(0, Math.min(1, (ceremonyTime - phase.start) / (phase.end - phase.start)));
  const totalProgress = Math.max(0, Math.min(1, ceremonyTime / FINALE_TOTAL_SECONDS));
  const timelineActive = MEDIA_PATH ? playing : inView && !documentHidden && !reducedMotion;
  const paused = !timelineActive;

  const resetMedia = useCallback((playAfterReset = true) => {
    const video = videoRef.current;
    sectionIndexRef.current = 0;
    lastReportedTimeRef.current = -1;
    setCeremonyTime(0);
    if (!video) return;
    const startFromOpeningSection = () => {
      video.currentTime = finaleMediaSections[0].sourceStart;
      if (playAfterReset) void video.play().catch(() => setPlaying(false));
    };
    if (video.readyState >= 1) startFromOpeningSection();
    else video.addEventListener("loadedmetadata", startFromOpeningSection, { once: true });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    const syncVisibility = () => setDocumentHidden(document.hidden);
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    syncMotion();
    syncVisibility();
    return () => {
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current as SafariVideo | null;
    if (!video) return;
    const standard = Boolean(document.pictureInPictureEnabled && video.requestPictureInPicture);
    const safari = Boolean(video.webkitSupportsPresentationMode?.("picture-in-picture") && video.webkitSetPresentationMode);
    setPipSupported(standard || safari);
  }, []);

  useEffect(() => {
    if (!footerRef.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && !wasInViewRef.current && videoRef.current) {
        setCeremonyStarted(true);
        setManuallyPaused(false);
        const video = videoRef.current;
        if (video.currentTime < finaleMediaSections[0].sourceStart || video.currentTime >= finaleMediaSections[2].sourceEnd) resetMedia(false);
      }
      wasInViewRef.current = entry.isIntersecting;
    }, { threshold: 0.18, rootMargin: "220px 0px" });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [resetMedia]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !soundEnabled;
    if (!ceremonyStarted || documentHidden || manuallyPaused) {
      video.pause();
      return;
    }
    if (video.readyState >= 1 && video.currentTime === 0) video.currentTime = finaleMediaSections[0].sourceStart;
    void video.play()
      .then(() => setAutoplayBlocked(false))
      .catch(() => {
        setPlaying(false);
        if (soundEnabled) setAutoplayBlocked(true);
      });
  }, [ceremonyStarted, documentHidden, manuallyPaused, soundEnabled]);

  useEffect(() => {
    if (!playing) return;
    const sync = () => {
      const video = videoRef.current;
      if (!video) return;
      let sectionIndex = sectionIndexRef.current;
      let section = finaleMediaSections[sectionIndex];

      if (video.currentTime >= section.sourceEnd - 0.045) {
        sectionIndex = (sectionIndex + 1) % finaleMediaSections.length;
        sectionIndexRef.current = sectionIndex;
        section = finaleMediaSections[sectionIndex];
        video.currentTime = section.sourceStart;
      }

      const nextCeremonyTime = ceremonyTimeFromSourceTime(video.currentTime, sectionIndex);
      if (Math.abs(nextCeremonyTime - lastReportedTimeRef.current) >= 0.08 || nextCeremonyTime < lastReportedTimeRef.current) {
        lastReportedTimeRef.current = nextCeremonyTime;
        setCeremonyTime(nextCeremonyTime);
      }
      animationFrameRef.current = window.requestAnimationFrame(sync);
    };
    animationFrameRef.current = window.requestAnimationFrame(sync);
    return () => {
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };
  }, [playing]);

  useEffect(() => {
    if (MEDIA_PATH || !inView || documentHidden || reducedMotion) return;
    const startedAt = performance.now() - ceremonyTime * 1_000;
    const sync = (now: number) => {
      setCeremonyTime(((now - startedAt) / 1_000) % FINALE_TOTAL_SECONDS);
      animationFrameRef.current = window.requestAnimationFrame(sync);
    };
    animationFrameRef.current = window.requestAnimationFrame(sync);
    return () => {
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };
    // Resume the visual-only sequence from its current point when visibility changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentHidden, inView, reducedMotion]);

  useEffect(() => {
    if (displayMode !== "fullscreen") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDisplayMode("embedded");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [displayMode]);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    videoRef.current?.pause();
  }, []);

  const toggleSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!soundEnabled) {
      video.muted = false;
      setSoundEnabled(true);
      setManuallyPaused(false);
      await video.play()
        .then(() => setAutoplayBlocked(false))
        .catch(() => setAutoplayBlocked(true));
      return;
    }
    video.muted = true;
    setSoundEnabled(false);
    setAutoplayBlocked(false);
  }, [soundEnabled]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setManuallyPaused(false);
      void video.play()
        .then(() => setAutoplayBlocked(false))
        .catch(() => setAutoplayBlocked(true));
    } else {
      setManuallyPaused(true);
      video.pause();
    }
  }, []);

  const unlockFinaleSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    setCeremonyStarted(true);
    setManuallyPaused(false);
    setSoundEnabled(true);
    video.muted = false;
    if (video.readyState >= 1 && (video.currentTime < finaleMediaSections[0].sourceStart || video.currentTime >= finaleMediaSections[2].sourceEnd)) {
      video.currentTime = finaleMediaSections[0].sourceStart;
    }
    await video.play()
      .then(() => setAutoplayBlocked(false))
      .catch(() => setAutoplayBlocked(true));
  }, []);

  const replayFinale = useCallback(() => {
    setCeremonyStarted(true);
    setManuallyPaused(false);
    setAutoplayBlocked(false);
    resetMedia(true);
  }, [resetMedia]);

  const toggleNativePip = useCallback(async () => {
    const video = videoRef.current as SafariVideo | null;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else if (document.pictureInPictureEnabled && video.requestPictureInPicture) await video.requestPictureInPicture();
      else if (video.webkitSupportsPresentationMode?.("picture-in-picture") && video.webkitSetPresentationMode) {
        video.webkitSetPresentationMode(video.webkitPresentationMode === "picture-in-picture" ? "inline" : "picture-in-picture");
      }
    } catch {
      setDisplayMode("floating");
    }
  }, []);

  const onTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    touchStartYRef.current = event.changedTouches[0]?.clientY ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLButtonElement>) => {
    if (touchStartYRef.current === null) return;
    const distance = (event.changedTouches[0]?.clientY ?? touchStartYRef.current) - touchStartYRef.current;
    touchStartYRef.current = null;
    if (distance < -60) setDisplayMode(displayMode === "half" ? "fullscreen" : "half");
    if (distance > 60) setDisplayMode(displayMode === "fullscreen" ? "half" : "embedded");
  };

  return (
    <footer ref={footerRef} className={`siteFooter footerSpectacle ${phaseClass} ${sceneClass} ${paused ? "finalePaused" : ""}`}>
      <div className="footerAlliance">
        <span className="alliancePulse" aria-hidden="true" />
        <small>Kap Ossen Family Embassy · 1:34 Finale</small>
        <b>KAP OSSEN <i>×</i> ST‑FIRM</b>
        <em>Heritage · Technology · Legacy</em>
      </div>

      {MEDIA_PATH && ceremonyStarted && !inView && displayMode === "embedded" && (
        <aside className="finaleNowPlaying" aria-label="Kap Ossen finale now playing" aria-live="polite">
          <span className="nowPlayingPulse" aria-hidden="true" />
          <span><small>{autoplayBlocked ? "Sound permission needed" : playing ? "Now playing" : "Finale paused"}</small><b>Kap Ossen · 01:34 Finale</b></span>
          {autoplayBlocked
            ? <button type="button" className="nowPlayingUnlock" onClick={unlockFinaleSound}>Tap for sound</button>
            : <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause finale" : "Resume finale"}>{playing ? "Ⅱ" : "▶"}</button>}
          <button type="button" onClick={() => setDisplayMode("floating")} aria-label="Open floating finale">▣</button>
        </aside>
      )}

      <div className="footerCeremonyHome">
        <div className={`footerCeremonyShell display-${displayMode}`}>
          <button type="button" className="finaleDragHandle" aria-label="Swipe up to expand or down to close" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><span /></button>
          {displayMode !== "embedded" && <button type="button" className="finaleCloseMode" onClick={() => setDisplayMode("embedded")} aria-label="Return finale to the footer">×</button>}

          <div className="footerPerformanceStage" role="group" aria-label="SCOF, Kap Ossen and proposed ST-Firm 94-second relationship sequence">
            {MEDIA_PATH && <video
              ref={videoRef}
              className="footerVideoBackdrop"
              src={withBasePath(MEDIA_PATH)}
              poster={withBasePath("/og-family-embassy.png")}
              playsInline
              muted={!soundEnabled}
              preload="metadata"
              aria-hidden="true"
              onLoadedMetadata={() => {
                if (videoRef.current && videoRef.current.currentTime === 0) videoRef.current.currentTime = finaleMediaSections[0].sourceStart;
              }}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />}
            {MEDIA_PATH && autoplayBlocked && (
              <button type="button" className="finaleSoundGate" onClick={unlockFinaleSound}>
                <span aria-hidden="true">🔊</span>
                <b>Tap to start the finale with sound</b>
                <small>Chrome and iPhone require one touch before audible playback.</small>
              </button>
            )}
            <span className="footerVideoVeil" aria-hidden="true" />
            <div className="footerSky" aria-hidden="true">
              <span className="footerAurora auroraOne" /><span className="footerAurora auroraTwo" />
              <span className="footerHorizon" /><span className="footerReflection" />
              <span className="scofSnowfield">{snowflakes.map((item) => <i className={`scofSnowflake snowflake${item}`} key={`snowflake-${item}`} />)}</span>
              <span className="scofMonument"><span className="scofAura" /><img src={withBasePath("/showcase/scof-coin-transparent.webp")} alt="" width="900" height="900" decoding="async" /><span className="scofWord">SCOF</span></span>
              <span className="koPillarRing">{pillars.map((item) => <i className={`koPillar pillar${item}`} key={`pillar-${item}`} />)}<Crest ceremonial /></span>
              <span className="arrorRoots">{[1, 2, 3, 4, 5, 6, 7].map((item) => <i key={`root-${item}`} />)}</span>
              <span className="firmCircuitField">{circuits.map((item) => <i className={`firmCircuit circuit${item}`} key={`circuit-${item}`} />)}<img src={withBasePath("/st-firm-logo.png")} alt="" width="260" height="280" decoding="async" /></span>
              <span className="finaleScof"><img src={withBasePath("/showcase/scof-coin-transparent.webp")} alt="" width="900" height="900" decoding="async" /></span>
              <span className="footerRunner footerKoRunner"><Crest ceremonial /></span>
              <span className="footerRunner footerStRunner"><img src={withBasePath("/st-firm-logo.png")} alt="" width="260" height="280" decoding="async" /></span>
              <span className="footerInfinity" /><span className="footerPartnership">×</span>
              {fireworks.map((item) => <span className={`footerFirework firework${item}`} key={`firework-${item}`} />)}
              {bubbles.map((item) => <span className={`footerBubble footerBubble${item}`} key={`footer-bubble-${item}`} />)}
              <span className="footerShockwave shockwaveOne" /><span className="footerShockwave shockwaveTwo" />
            </div>
            <ScofValueRoster scene={scene.id} />
            <div className="footerStaticStageLockup" aria-hidden="true">
              <span className="staticScofMark"><img src={withBasePath("/showcase/scof-coin-transparent.webp")} alt="" width="900" height="900" decoding="async" /></span>
              <span className="staticKoMark"><Crest ceremonial /></span><i>×</i>
              <span className="staticFirmMark"><img src={withBasePath("/st-firm-logo.png")} alt="" width="260" height="280" decoding="async" /></span>
              <p><b>Kap Ossen</b><small>Heritage · Proposed technology relationship</small></p>
            </div>
          </div>

          <div className="footerPhaseRail" aria-live="polite" aria-atomic="true">
            <span className="phaseRailIcon" aria-hidden="true">{phase.icon}</span>
            <span className="phaseRailCopy" key={`${phase.key}-${scene.id}`}><b>{phase.label}</b><small>{phase.description}</small></span>
            <span className="finaleClock"><b>{formatCeremonyTime(ceremonyTime)}</b><small>/ 01:34</small></span>
            <span className="phaseRailSteps" aria-hidden="true">{finalePhases.map((item, index) => <i className={index === phaseIndex ? "isActive" : ""} key={item.key} />)}</span>
              {MEDIA_PATH && <div className="finaleMediaControls" aria-label="Finale media controls">
              <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause finale" : "Play finale"}>{playing ? "Ⅱ" : "▶"}</button>
              <button type="button" className={soundEnabled ? "isEnabled" : ""} onClick={toggleSound} aria-label={soundEnabled ? "Mute finale music" : "Play the 1 minute 34 second finale with music"}>{soundEnabled ? "🔊" : "🔇"}</button>
              <button type="button" onClick={replayFinale} aria-label="Replay finale">↻</button>
              <button type="button" className={displayMode === "half" ? "isEnabled" : ""} onClick={() => setDisplayMode(displayMode === "half" ? "embedded" : "half")} aria-label="Toggle half-screen finale">◧</button>
              <button type="button" className={displayMode === "fullscreen" ? "isEnabled" : ""} onClick={() => setDisplayMode(displayMode === "fullscreen" ? "embedded" : "fullscreen")} aria-label="Toggle full-screen finale">⛶</button>
              <button type="button" className={displayMode === "floating" ? "isEnabled" : ""} onClick={() => setDisplayMode(displayMode === "floating" ? "embedded" : "floating")} aria-label="Toggle floating finale">▣</button>
              {pipSupported && <button type="button" onClick={toggleNativePip} aria-label="Open native picture in picture">PiP</button>}
              </div>}
            <span className="phaseRailProgress" aria-hidden="true"><i style={{ transform: `scaleX(${phaseProgress})` }} /></span>
            <span className="finaleTotalProgress" aria-hidden="true"><i style={{ transform: `scaleX(${totalProgress})` }} /></span>
          </div>
        </div>
      </div>

      <div className="footerIdentityDeck">
        <a className="footerBrand footerIdentity" href="#top" aria-label="Kap Ossen Family Embassy - return to top"><span className="footerLogoHalo"><img src={withBasePath("/brand/kap-ossen/ko-monogram-header-256.webp")} alt="" width="256" height="256" loading="lazy" decoding="async" /></span><span><b>Kap Ossen</b><small>Family Embassy · From Heritage to Legacy</small></span></a>
        <div className="stFirmMark footerIdentity"><span className="footerLogoHalo stHalo"><img src={withBasePath("/st-firm-logo.png")} alt="ST-Firm" width="260" height="280" loading="lazy" decoding="async" /></span><p><b>Proposed technology &amp; design partner</b><span>ST-Firm · Berlin, Deutschland</span><em>Idee Meet’s Tech.</em></p></div>
      </div>

      <nav className="footerLinks footerNavigationDeck" aria-label="Footer navigation"><a href="#top">Top ↑</a><a href="#family-tree">Family tree</a><a href="#gallery">Gallery</a><a href="#governance">Governance</a></nav>

      <div className="footerLegal footerLegalChamber">
        <span className="legalSpark legalSparkOne" aria-hidden="true" /><span className="legalSpark legalSparkTwo" aria-hidden="true" />
        <p className="legalSignature">© 2026–2027 <strong>Engineer Saigut Julius Kipkorir</strong>, trading as <span className="entity entityFirm">ST-Firm</span>.</p>
        <p className="legalRights"><strong>Kap Ossen Family Heritage Project.</strong> All rights reserved, subject to underlying family and third-party rights.</p>
        <div className="legalRule" aria-hidden="true"><span /></div>
        <p className="legalStatus">Working family vision and concept identity. Proposed roles and development concepts require formal approval. <span className="entity entityKap">Kap Ossen</span>, <span className="entity entityFirm">ST-Firm</span>, <span className="entity entityArrror">ARROR City Legacy</span>, <span className="entity entitySolomon">Solomon Ops</span>, <span className="entity entityScof">SCOF</span>, <span className="entity entityKenaff">KENAFF</span> and any future <span className="entity entityGateway">Gateway</span> vehicle retain distinct ownership, authority, finance, data and publication controls.</p>
        <p className="scofStatusDisclosure">SCOF values distinguish a current issuer-set price, a strategic checkpoint and a separate long-horizon aspiration. Currency conversions are illustrative and may change with exchange rates. Targets are not guaranteed market outcomes or investment returns.</p>
      </div>
    </footer>
  );
}
