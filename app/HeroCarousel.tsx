"use client";

/* eslint-disable @next/next/no-img-element -- local artwork intentionally bypasses Vinext's unavailable preview optimizer */

import { useCallback, useEffect, useRef, useState } from "react";
import { Crest } from "./BrandRace";
import KoLegacySequence from "./KoLegacySequence";
import LegacySignalDetector from "./LegacySignalDetector";

const orbitNodes = ["Heritage", "Family", "Land", "Knowledge", "Enterprise"] as const;
const SCENE_DURATION = 3_800;
const SWIPE_THRESHOLD = 45;
const IDLE_TRIGGER_TIME = 24_000;
const SIGNAL_WARNING_TIME = 18_000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [legacyActive, setLegacyActive] = useState(false);
  const [legacyTakeover, setLegacyTakeover] = useState(false);
  const [legacyPlayed, setLegacyPlayed] = useState(false);
  const [legacyHoldMs, setLegacyHoldMs] = useState(4_000);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [signalActive, setSignalActive] = useState(false);
  const [signalResetting, setSignalResetting] = useState(false);
  const [signalSeconds, setSignalSeconds] = useState(6);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const carouselRef = useRef<HTMLElement>(null);
  const orbitCoreRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const signalActiveRef = useRef(false);

  const paused = userPaused || documentHidden || !inView || reducedMotion || legacyActive;
  const move = (direction: -1 | 1) => {
    setActive((value) => (value + direction + 2) % 2);
    setCycle((value) => value + 1);
  };
  const selectScene = (index: number) => {
    setActive(index);
    setCycle((value) => value + 1);
  };

  const beginLegacy = useCallback(() => {
    if (legacyActive || reducedMotion) return;
    setLegacyHoldMs(activeRef.current === 0 ? 4_000 : 4_600);
    setActive(0);
    setCycle((value) => value + 1);
    setLegacyTakeover(false);
    signalActiveRef.current = false;
    setSignalActive(false);
    setSignalResetting(false);
    setLegacyPlayed(true);
    setLegacyActive(true);
  }, [legacyActive, reducedMotion]);

  const finishLegacy = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setLegacyTakeover(false);
    setLegacyActive(false);
    setActive(1);
    setCycle((value) => value + 1);
  }, []);

  const takeOverLegacy = useCallback(() => setLegacyTakeover(true), []);

  const enableSound = useCallback(async () => {
    const AudioContextConstructor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;
    const context = audioContext ?? new AudioContextConstructor();
    if (context.state === "suspended") await context.resume();
    setAudioContext(context);
    setSoundEnabled(true);
  }, [audioContext]);

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
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (!carouselRef.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.18 });
    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setActive((value) => (value + 1) % 2);
      setCycle((value) => value + 1);
    }, SCENE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, cycle, paused]);

  useEffect(() => {
    if (userPaused || documentHidden || !inView || reducedMotion || legacyActive || legacyPlayed) return;
    let triggerTimer = 0;
    let warningTimer = 0;
    let countdownTimer = 0;
    let resetTimer = 0;
    let lastPointerMove = 0;
    const clearSchedule = () => {
      window.clearTimeout(triggerTimer);
      window.clearTimeout(warningTimer);
      window.clearTimeout(countdownTimer);
    };
    const arm = () => {
      clearSchedule();
      warningTimer = window.setTimeout(() => {
        let remaining = 6;
        signalActiveRef.current = true;
        setSignalSeconds(remaining);
        setSignalResetting(false);
        setSignalActive(true);
        const tick = () => {
          remaining -= 1;
          setSignalSeconds(Math.max(0, remaining));
          if (remaining > 0) countdownTimer = window.setTimeout(tick, 1_000);
        };
        countdownTimer = window.setTimeout(tick, 1_000);
      }, SIGNAL_WARNING_TIME);
      triggerTimer = window.setTimeout(beginLegacy, IDLE_TRIGGER_TIME);
    };
    const noteActivity = (event: Event) => {
      if (event.type === "pointermove") {
        const now = performance.now();
        if (now - lastPointerMove < 450) return;
        lastPointerMove = now;
      }
      if (signalActiveRef.current) {
        signalActiveRef.current = false;
        setSignalActive(false);
        setSignalResetting(true);
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => setSignalResetting(false), 450);
      }
      arm();
    };
    const events: Array<keyof WindowEventMap> = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"];
    events.forEach((eventName) => window.addEventListener(eventName, noteActivity, { passive: true }));
    window.addEventListener("legacy-signal-reset", noteActivity);
    arm();
    return () => {
      clearSchedule();
      window.clearTimeout(resetTimer);
      events.forEach((eventName) => window.removeEventListener(eventName, noteActivity));
      window.removeEventListener("legacy-signal-reset", noteActivity);
    };
  }, [beginLegacy, documentHidden, inView, legacyActive, legacyPlayed, reducedMotion, userPaused]);

  return (
    <section
      ref={carouselRef}
      className={`heroCarousel scene${active + 1} ${paused ? "carouselPaused" : "carouselRunning"} ${legacyTakeover ? "legacyTakeover" : ""}`}
      id="top"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Kap Ossen Family Embassy introduction"
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("a, button")) return;
        pointerStart.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        if (!pointerStart.current) return;
        const dx = event.clientX - pointerStart.current.x;
        const dy = event.clientY - pointerStart.current.y;
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.25) move(dx > 0 ? -1 : 1);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        pointerStart.current = null;
      }}
      onPointerCancel={() => { pointerStart.current = null; }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight") move(1);
        if (event.key === "ArrowLeft") move(-1);
      }}
    >
      <p className="srOnly" aria-live="polite">Scene {active + 1} of 2</p>
      <div className="deviceFrame">
        <div className="sceneViewport">
          <article className={`heroScene familyScene ${active === 0 ? "isActive" : ""}`} aria-hidden={active !== 0} inert={active !== 0}>
            <div className="heroCopy">
              <p className="heroEyebrow">Kap Ossen · ARROR roots</p>
              <h1>One family.<em>One living legacy.</em></h1>
              <p className="heroLead">Turning heritage into knowledge, opportunity and shared prosperity.</p>
              <div className="heroActions">
                <a className="button primary" href="#legacy-map">Explore the legacy <span aria-hidden="true">→</span></a>
                <a className="heroTextLink" href="#land-vision">View the 30-acre vision <span aria-hidden="true">↗</span></a>
              </div>
            </div>

            <aside className="legacyOrbitPanel" aria-label="Kap Ossen legacy orbit: heritage, family, land, knowledge and enterprise">
              <div className="legacyOrbit">
                <div className="orbitRing ringOuter" aria-hidden="true" />
                <div className="orbitRing ringInner" aria-hidden="true" />
                <div className="orbitSweep" aria-hidden="true" />
                <div className="orbitCore" ref={orbitCoreRef}><Crest ceremonial /></div>
                <div className="orbitNodes">
                  {orbitNodes.map((label, index) => <span className={`orbitNode node${index + 1}`} key={label}><i aria-hidden="true" />{label}</span>)}
                </div>
              </div>
              <div className="orbitCaption"><b>Descendants of the late Dickson Ossen Cherogony</b><small>Concept identity · EST. 2026</small></div>
            </aside>
          </article>

          <article className={`heroScene artworkScene ${active === 1 ? "isActive" : ""}`} aria-hidden={active !== 1} inert={active !== 1}>
            <img src="/og-family-embassy.png" alt="Kap Ossen artwork linking ARROR roots, a glowing path and a future legacy destination" width="1659" height="948" loading="eager" fetchPriority="high" decoding="async" />
            <div className="artworkShade" />
            <div className="artworkCaption"><p className="visionPill">ARROR City Legacy · 2050</p><a className="button primary" href="#land-vision">Enter the vision <span aria-hidden="true">→</span></a></div>
          </article>
        </div>

        <div className="carouselControls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous scene">←</button>
          <div className="sceneDots" aria-label="Choose a scene">
            {[0, 1].map((index) => <button type="button" className={active === index ? "isActive" : ""} onClick={() => selectScene(index)} aria-label={`Show scene ${index + 1}`} aria-current={active === index ? "true" : undefined} key={index}><span aria-hidden="true">0{index + 1}</span><i aria-hidden="true" /></button>)}
          </div>
          <span className="carouselProgress" aria-hidden="true"><i key={`${active}-${cycle}-${paused ? "paused" : "running"}`} /></span>
          <button type="button" onClick={() => setUserPaused((value) => !value)} aria-label={userPaused ? "Resume automatic scenes" : "Pause automatic scenes"}>{userPaused ? "▶" : "Ⅱ"}</button>
          <button type="button" className={`ceremonySound ${soundEnabled ? "isEnabled" : ""}`} onClick={enableSound} aria-label={soundEnabled ? "Ceremonial sound enabled" : "Enable ceremonial sound"}>{soundEnabled ? "🔊" : "🔇"}</button>
          {legacyPlayed && <button type="button" className="ceremonyReplay" onClick={beginLegacy} aria-label="Replay Kap Ossen ceremony">↻</button>}
          <button type="button" onClick={() => move(1)} aria-label="Next scene">→</button>
        </div>
      </div>
      {legacyActive && <KoLegacySequence active holdMs={legacyHoldMs} originRef={orbitCoreRef} soundEnabled={soundEnabled} audioContext={audioContext} onTakeover={takeOverLegacy} onComplete={finishLegacy} onEnableSound={enableSound} />}
      <LegacySignalDetector active={signalActive && !documentHidden && inView && !userPaused} resetting={signalResetting && !documentHidden && inView} seconds={signalSeconds} soundEnabled={soundEnabled} audioContext={audioContext} onReset={() => window.dispatchEvent(new Event("legacy-signal-reset"))} />
    </section>
  );
}
