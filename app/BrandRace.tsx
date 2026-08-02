"use client";

/* eslint-disable @next/next/no-img-element -- local brand assets intentionally bypass Vinext's unavailable preview optimizer */

import { useEffect, useState } from "react";

export function Crest({
  className = "",
  ceremonial = false,
}: {
  className?: string;
  ceremonial?: boolean;
}) {
  const src = ceremonial
    ? "/brand/kap-ossen/ko-crest-primary-transparent-1024.png"
    : "/brand/kap-ossen/ko-monogram-header-256.webp";

  return (
    <span className={`koAsset ${ceremonial ? "ceremonial" : ""} ${className}`.trim()}>
      <img src={src} alt="" width={ceremonial ? 1024 : 256} height={ceremonial ? 1024 : 256} decoding="async" />
      <span className="logoShine" aria-hidden="true" />
    </span>
  );
}

export default function BrandRace() {
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [routine, setRoutine] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncVisibility = () => setHidden(document.hidden);
    const syncMotion = () => setReducedMotion(media.matches);
    document.addEventListener("visibilitychange", syncVisibility);
    media.addEventListener("change", syncMotion);
    syncVisibility();
    syncMotion();
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      media.removeEventListener("change", syncMotion);
    };
  }, []);

  const paused = hidden || reducedMotion || interacting;

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      if (running) {
        setRunning(false);
        setRoutine((value) => (value + 1) % 4);
      } else {
        setRunning(true);
      }
    }, running ? 8400 : 4600);
    return () => window.clearTimeout(timer);
  }, [paused, running]);

  return (
    <a
      className={`brandRace routine${routine + 1} ${running ? "isRacing" : ""} ${paused ? "isPaused" : ""}`}
      href="#top"
      aria-label="Kap Ossen Family Embassy - home"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      <span className="raceLane" aria-hidden="true"><Crest /></span>
      <span className="brandWords"><strong>Kap Ossen</strong><small>Family Embassy · ARROR</small></span>
      <span className="partnerCue" aria-label="ST-Firm, proposed technology partner">
        <i aria-hidden="true">×</i>
        <img src="/st-firm-logo.png" alt="" width="260" height="280" decoding="async" />
        <span><b>ST-Firm</b><small>Proposed tech partner</small></span>
      </span>

      <span className={`raceEffects ${running ? "isRunning" : ""}`} aria-hidden="true">
        <span className="raceRunner runnerKo"><Crest /></span>
        <span className="raceRunner runnerSt"><img src="/st-firm-logo.png" alt="" width="260" height="280" decoding="async" /></span>
        <span className="magicCross">×</span>
        <span className="energyRelay" />
        {[1, 2, 3].map((star) => <span className={`shootingStar star${star}`} key={`star-${star}`} />)}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((bubble) => <span className={`glassBubble bubble${bubble}`} key={`bubble-${bubble}`} />)}
        {[1, 2, 3].map((point) => <span className={`journeyPoint point${point}`} key={`point-${point}`} />)}
        <span className="raceFinale"><b>KAP OSSEN × ST-FIRM</b><small>Heritage powered by technology</small></span>
      </span>
    </a>
  );
}
