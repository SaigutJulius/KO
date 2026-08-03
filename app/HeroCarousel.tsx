"use client";

/* eslint-disable @next/next/no-img-element -- local artwork intentionally bypasses Vinext's unavailable preview optimizer */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import ArrorFireworks, { type ArrorCeremonyPhase } from "./ArrorFireworks";
import { Crest } from "./BrandRace";
import KoLegacySequence from "./KoLegacySequence";
import LegacySignalDetector from "./LegacySignalDetector";
import { withBasePath } from "./sitePaths";

const orbitNodes = ["Heritage", "Family", "Land", "Knowledge", "Enterprise"] as const;
const SCENE_DURATIONS = [5_200, 9_500] as const;
const SWIPE_THRESHOLD = 45;
const IDLE_TRIGGER_TIME = 24_000;
const SIGNAL_WARNING_TIME = 18_000;
const SCENE_TRANSITION_MS = 760;
const ARTWORK_DECODE_TIMEOUT_MS = 900;
const ARROR_STILLNESS_MS = 10_000;
const ARROR_SHOW_DURATION_MS = 25_700;
const ARROR_COOLDOWN_MS = 10_000;

type SceneIndex = 0 | 1;
type SceneTransitionPhase = "settled" | "preparing" | "transitioning";
type SceneTransitionDirection = "forward" | "backward";
type SceneTransition = {
  phase: SceneTransitionPhase;
  from: SceneIndex;
  to: SceneIndex;
  direction: SceneTransitionDirection;
};

const ARROR_CEREMONY_TIMELINE: ReadonlyArray<{ at: number; phase: ArrorCeremonyPhase; cycle: number }> = [
  { at: 0, phase: "gather", cycle: 1 },
  { at: 1_100, phase: "form", cycle: 1 },
  { at: 3_500, phase: "break", cycle: 1 },
  { at: 4_200, phase: "fireworks", cycle: 1 },
  { at: 6_600, phase: "gather", cycle: 2 },
  { at: 7_700, phase: "form", cycle: 2 },
  { at: 10_100, phase: "break", cycle: 2 },
  { at: 10_800, phase: "fireworks", cycle: 2 },
  { at: 13_400, phase: "gather", cycle: 3 },
  { at: 14_500, phase: "form", cycle: 3 },
  { at: 17_700, phase: "break", cycle: 3 },
  { at: 18_400, phase: "fireworks", cycle: 3 },
  { at: 22_000, phase: "afterglow", cycle: 3 },
  { at: 23_100, phase: "return", cycle: 3 },
];

const arrorEagles = Array.from({ length: 6 }, (_, index) => index + 1);
const arrorSnowflakes = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  x: 4 + ((index * 37) % 92),
  y: 8 + ((index * 53) % 84),
  fromX: -46 + ((index * 29) % 192),
  fromY: -38 + ((index * 43) % 176),
  delay: Number(((index % 12) * 0.045).toFixed(3)),
  size: 0.62 + (index % 5) * 0.12,
}));

export default function HeroCarousel() {
  const [active, setActive] = useState<SceneIndex>(0);
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
  const [arrorCeremony, setArrorCeremony] = useState<{ phase: ArrorCeremonyPhase; cycle: number }>({ phase: "patrol", cycle: 0 });
  const [arrorCountdown, setArrorCountdown] = useState<number | null>(null);
  const [arrorIdleNonce, setArrorIdleNonce] = useState(0);
  const [arrorShowSequence, setArrorShowSequence] = useState(0);
  const [sceneTransition, setSceneTransition] = useState<SceneTransition>({ phase: "settled", from: 0, to: 0, direction: "forward" });
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const carouselRef = useRef<HTMLElement>(null);
  const orbitCoreRef = useRef<HTMLDivElement>(null);
  const arrorArtworkImageRef = useRef<HTMLImageElement>(null);
  const activeRef = useRef(active);
  const signalActiveRef = useRef(false);
  const sceneTransitionPhaseRef = useRef<SceneTransitionPhase>("settled");
  const sceneTransitionTokenRef = useRef(0);
  const sceneTransitionTimerRef = useRef<number | null>(null);
  const arrorArtworkReadyRef = useRef(false);

  const transitionBusy = sceneTransition.phase !== "settled";
  const paused = userPaused || documentHidden || !inView || reducedMotion || legacyActive || transitionBusy;

  const clearSceneTransitionTimer = useCallback(() => {
    if (sceneTransitionTimerRef.current !== null) {
      window.clearTimeout(sceneTransitionTimerRef.current);
      sceneTransitionTimerRef.current = null;
    }
  }, []);

  const prepareArrorArtwork = useCallback(async () => {
    if (arrorArtworkReadyRef.current) return;
    const image = arrorArtworkImageRef.current;
    if (!image) return;
    const selectedSource = image.currentSrc || image.src;
    if (!selectedSource) return;

    await new Promise<void>((resolve) => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(timeout);
        if (image.complete && image.naturalWidth > 0) arrorArtworkReadyRef.current = true;
        resolve();
      };
      const timeout = window.setTimeout(finish, ARTWORK_DECODE_TIMEOUT_MS);
      if (typeof image.decode === "function") image.decode().catch(() => undefined).finally(finish);
      else if (image.complete) finish();
      else {
        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
      }
    });
  }, []);

  const settleSceneImmediately = useCallback((target: SceneIndex) => {
    sceneTransitionTokenRef.current += 1;
    clearSceneTransitionTimer();
    sceneTransitionPhaseRef.current = "settled";
    activeRef.current = target;
    setActive(target);
    setSceneTransition({ phase: "settled", from: target, to: target, direction: target === 1 ? "forward" : "backward" });
    setCycle((value) => value + 1);
  }, [clearSceneTransitionTimer]);

  const transitionToScene = useCallback(async (target: SceneIndex, direction: SceneTransitionDirection) => {
    const from = activeRef.current;
    if (target === from || sceneTransitionPhaseRef.current !== "settled") return;

    const token = sceneTransitionTokenRef.current + 1;
    sceneTransitionTokenRef.current = token;
    sceneTransitionPhaseRef.current = "preparing";
    setSceneTransition({ phase: "preparing", from, to: target, direction });

    if (target === 1) await prepareArrorArtwork();
    if (sceneTransitionTokenRef.current !== token) return;

    if (reducedMotion) {
      sceneTransitionPhaseRef.current = "settled";
      activeRef.current = target;
      setActive(target);
      setSceneTransition({ phase: "settled", from: target, to: target, direction });
      setCycle((value) => value + 1);
      return;
    }

    sceneTransitionPhaseRef.current = "transitioning";
    activeRef.current = target;
    setActive(target);
    setSceneTransition({ phase: "transitioning", from, to: target, direction });
    setCycle((value) => value + 1);
    clearSceneTransitionTimer();
    sceneTransitionTimerRef.current = window.setTimeout(() => {
      if (sceneTransitionTokenRef.current !== token) return;
      sceneTransitionTimerRef.current = null;
      sceneTransitionPhaseRef.current = "settled";
      setSceneTransition({ phase: "settled", from: target, to: target, direction });
    }, SCENE_TRANSITION_MS);
  }, [clearSceneTransitionTimer, prepareArrorArtwork, reducedMotion]);

  const move = useCallback((direction: -1 | 1) => {
    const target = ((activeRef.current + direction + 2) % 2) as SceneIndex;
    void transitionToScene(target, direction === 1 ? "forward" : "backward");
  }, [transitionToScene]);

  const selectScene = useCallback((index: SceneIndex) => {
    const direction: SceneTransitionDirection = index >= activeRef.current ? "forward" : "backward";
    void transitionToScene(index, direction);
  }, [transitionToScene]);

  const beginLegacy = useCallback(() => {
    if (legacyActive || reducedMotion) return;
    setLegacyHoldMs(activeRef.current === 0 ? 4_000 : 4_600);
    settleSceneImmediately(0);
    setLegacyTakeover(false);
    signalActiveRef.current = false;
    setSignalActive(false);
    setSignalResetting(false);
    setLegacyPlayed(true);
    setLegacyActive(true);
  }, [legacyActive, reducedMotion, settleSceneImmediately]);

  const finishLegacy = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setLegacyTakeover(false);
    setLegacyActive(false);
    settleSceneImmediately(1);
  }, [settleSceneImmediately]);

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
    void prepareArrorArtwork();
    return () => {
      sceneTransitionTokenRef.current += 1;
      clearSceneTransitionTimer();
    };
  }, [clearSceneTransitionTimer, prepareArrorArtwork]);

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
      const target = ((activeRef.current + 1) % 2) as SceneIndex;
      void transitionToScene(target, "forward");
    }, SCENE_DURATIONS[active]);
    return () => window.clearTimeout(timer);
  }, [active, cycle, paused, transitionToScene]);

  useEffect(() => {
    if (active !== 1 || !userPaused || documentHidden || !inView || legacyActive || sceneTransition.phase !== "settled") return;
    let lastPointerMove = 0;
    const noteAdmirationActivity = (event: Event) => {
      if (event.type === "pointermove") {
        const now = performance.now();
        if (now - lastPointerMove < 600) return;
        lastPointerMove = now;
      }
      setArrorIdleNonce((value) => value + 1);
    };
    const events: Array<keyof WindowEventMap> = ["pointermove", "pointerdown", "touchstart", "keydown", "wheel", "focusin"];
    events.forEach((eventName) => window.addEventListener(eventName, noteAdmirationActivity, { passive: true }));
    return () => events.forEach((eventName) => window.removeEventListener(eventName, noteAdmirationActivity));
  }, [active, documentHidden, inView, legacyActive, sceneTransition.phase, userPaused]);

  useEffect(() => {
    const timers: number[] = [];
    let cancelled = false;
    const eligible = active === 1 && userPaused && !documentHidden && inView && !legacyActive && sceneTransition.phase === "settled";
    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
      timers.push(timer);
    };
    const resetToPatrol = () => {
      setArrorCeremony({ phase: "patrol", cycle: 0 });
      setArrorCountdown(null);
    };
    schedule(resetToPatrol, 0);
    if (!eligible) return () => timers.forEach((timer) => window.clearTimeout(timer));

    const scheduleCountdown = (phase: "countdown" | "cooldown") => {
      setArrorCeremony({ phase, cycle: phase === "cooldown" ? 3 : 0 });
      for (let elapsed = 0; elapsed < 10; elapsed += 1) {
        schedule(() => setArrorCountdown(10 - elapsed), elapsed * 1_000);
      }
    };

    const beginShow = () => {
      setArrorCountdown(null);
      setArrorShowSequence((value) => value + 1);
      ARROR_CEREMONY_TIMELINE.forEach((moment) => {
        schedule(() => setArrorCeremony({ phase: moment.phase, cycle: moment.cycle }), moment.at);
      });
      schedule(() => {
        scheduleCountdown("cooldown");
        schedule(beginShow, ARROR_COOLDOWN_MS);
      }, ARROR_SHOW_DURATION_MS);
    };

    scheduleCountdown("countdown");
    schedule(beginShow, ARROR_STILLNESS_MS);
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, arrorIdleNonce, documentHidden, inView, legacyActive, sceneTransition.phase, userPaused]);

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

  const arrorTvMode = arrorCountdown !== null
    ? "countdown"
    : arrorCeremony.phase === "gather" || arrorCeremony.phase === "form"
      ? "live"
      : arrorCeremony.phase === "break" || arrorCeremony.phase === "fireworks"
        ? "transmit"
        : arrorCeremony.phase === "afterglow" || arrorCeremony.phase === "return"
          ? "complete"
          : "ambient";
  const arrorTvPrimary = arrorTvMode === "live"
    ? "KAP OSSEN"
    : arrorTvMode === "transmit"
      ? "SKY SIGNAL"
      : arrorTvMode === "complete"
        ? "LEGACY SIGNAL"
        : arrorTvMode === "countdown"
          ? "LEGACY SIGNAL"
          : "WEB3 · 2050";
  const arrorTvStatus = arrorTvMode === "live"
    ? "CEREMONY LIVE"
    : arrorTvMode === "transmit"
      ? `ACT 0${arrorCeremony.cycle} TRANSMITTING`
      : arrorTvMode === "complete"
        ? "SIGNAL COMPLETE"
        : arrorTvMode === "countdown"
          ? `CEREMONY IN ${String(arrorCountdown).padStart(2, "0")}`
          : userPaused ? "PATROL ACTIVE" : "SYSTEM READY";

  return (
    <section
      ref={carouselRef}
      className={`heroCarousel scene${active + 1} carousel${sceneTransition.phase[0].toUpperCase()}${sceneTransition.phase.slice(1)} transition${sceneTransition.direction[0].toUpperCase()}${sceneTransition.direction.slice(1)} ${paused ? "carouselPaused" : "carouselRunning"} ${legacyTakeover ? "legacyTakeover" : ""}`}
      data-transition-phase={sceneTransition.phase}
      data-transition-direction={sceneTransition.direction}
      style={{ "--scene-duration": `${SCENE_DURATIONS[active]}ms` } as CSSProperties}
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
          <article className={`heroScene familyScene ${active === 0 ? "isActive" : ""} ${sceneTransition.phase === "transitioning" && sceneTransition.from === 0 ? "isLeaving" : ""} ${sceneTransition.phase === "transitioning" && sceneTransition.to === 0 ? "isEntering" : ""}`} aria-hidden={active !== 0} inert={active !== 0}>
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

          <article className={`heroScene artworkScene arrorCeremony-${arrorCeremony.phase} ${active === 1 ? "isActive" : ""} ${sceneTransition.phase === "transitioning" && sceneTransition.from === 1 ? "isLeaving" : ""} ${sceneTransition.phase === "transitioning" && sceneTransition.to === 1 ? "isEntering" : ""}`} data-arror-cycle={arrorCeremony.cycle} data-arror-sequence={arrorShowSequence} aria-hidden={active !== 1} inert={active !== 1}>
            <img className="artworkBackdrop" src={withBasePath("/og-family-embassy.png")} alt="" aria-hidden="true" width="1659" height="948" loading="eager" decoding="async" />
            <div className="arrorArtworkStage">
              <picture className="arrorArtworkMedia">
                <source media="(max-width: 620px) and (orientation: portrait)" type="image/avif" srcSet={withBasePath("/artwork/arror-city-mobile-portrait-v1.avif")} />
                <source media="(max-width: 620px) and (orientation: portrait)" type="image/webp" srcSet={withBasePath("/artwork/arror-city-mobile-portrait-v1.webp")} />
                <source media="(max-width: 860px) and (orientation: portrait)" type="image/avif" srcSet={withBasePath("/artwork/arror-city-tablet-portrait-v1.avif")} />
                <source media="(max-width: 860px) and (orientation: portrait)" type="image/webp" srcSet={withBasePath("/artwork/arror-city-tablet-portrait-v1.webp")} />
                <img ref={arrorArtworkImageRef} className="artworkHero" src={withBasePath("/og-family-embassy.png")} alt="Kap Ossen artwork linking ARROR roots, a glowing path and a future legacy destination" width="1659" height="948" loading="eager" fetchPriority="high" decoding="async" />
              </picture>
              <div className="artworkShade" />
              <ArrorFireworks active={active === 1 && sceneTransition.phase === "settled" && inView} cycle={arrorCeremony.cycle} phase={arrorCeremony.phase} reducedMotion={reducedMotion} sequence={arrorShowSequence} />
              <div className="arrorFloodlightRig" aria-hidden="true">
                {[1, 2, 3].map((light) => (
                  <span className={`arrorFloodlight floodlight${light}`} key={light}>
                    <i className="floodlightArm" />
                    <b className="floodlightHead"><i /></b>
                    <em className="floodlightBeam" />
                  </span>
                ))}
              </div>
              <div className="arrorEaglePatrols" aria-hidden="true" style={{ "--eagle-sprite": `url("${withBasePath("/artwork/golden-eagle-wingbeat-v2.webp")}")` } as CSSProperties}>
                {arrorEagles.map((eagle) => (
                  <span className={`arrorEagle eagle${eagle}`} key={eagle}>
                    <span className="eagleBank"><i className="eagleWingbeat" /></span>
                  </span>
                ))}
              </div>
              <div className="arrorSnowCeremony" aria-hidden="true">
                <div className="arrorSnowWord"><span>KAP</span><span>OSSEN</span></div>
                <div className="arrorSnowField">
                  {arrorSnowflakes.map((flake) => (
                    <i
                      className="arrorSnowflake"
                      key={flake.id}
                      style={{
                        "--flake-x": `${flake.x}%`,
                        "--flake-y": `${flake.y}%`,
                        "--flake-from-x": `${flake.fromX}vw`,
                        "--flake-from-y": `${flake.fromY}vh`,
                        "--flake-delay": `${flake.delay}s`,
                        "--flake-size": flake.size,
                      } as CSSProperties}
                    >❄</i>
                  ))}
                </div>
              </div>
              <div className={`arrorSmartDisplay tv-${arrorTvMode}`} aria-hidden="true">
                <div className="arrorTvHover">
                  <div className="arrorTvAerials">
                    <i className="arrorTvAerial aerialLeft"><b /></i>
                    <span className="arrorTvAerialMount" />
                    <i className="arrorTvAerial aerialRight"><b /></i>
                  </div>
                  <div className="arrorTvCabinet">
                    <div className="arrorTvScreen">
                      <small>ARROR NODE // LIVE</small>
                      <strong>{arrorTvPrimary}</strong>
                      <span>{arrorTvStatus}</span>
                      <i className="arrorTvSignalBars"><b /><b /><b /></i>
                    </div>
                    <i className="arrorTvStatusLed" />
                  </div>
                </div>
              </div>
            </div>
            <p className="srOnly" aria-live="polite">{arrorCeremony.phase === "form" ? `Kap Ossen snowflake formation ${arrorCeremony.cycle} of 3` : arrorCeremony.phase === "fireworks" ? `Kap Ossen fireworks act ${arrorCeremony.cycle} of 3` : ""}</p>
            <div className="artworkCaption">
              <div className="arrorCaptionCopy">
                <p className="visionPill">ARROR City Legacy · 2050</p>
                <strong>A living road from heritage to a shared future.</strong>
              </div>
              <a className="button primary" href="#land-vision">Enter the vision <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <div className="sceneTransitionVeil" aria-hidden="true" />
        </div>

        <div className="carouselControls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous scene">←</button>
          <div className="sceneDots" aria-label="Choose a scene">
            {([0, 1] as const).map((index) => <button type="button" className={active === index ? "isActive" : ""} onClick={() => selectScene(index)} aria-label={`Show scene ${index + 1}`} aria-current={active === index ? "true" : undefined} key={index}><span aria-hidden="true">0{index + 1}</span><i aria-hidden="true" /></button>)}
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
