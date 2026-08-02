"use client";

/* eslint-disable @next/next/no-img-element -- the sequence uses one local transparent crest as a deterministic shard sheet */

import { type CSSProperties, type RefObject, useEffect, useMemo, useState } from "react";
import { withBasePath } from "./sitePaths";

type Phase = "hold" | "center" | "expand" | "charge" | "fracture" | "suspend" | "reassemble" | "impact" | "foundation" | "st-firm" | "green-ki" | "ssos" | "scof" | "ecosystem" | "declaration" | "return";

type KoLegacySequenceProps = {
  active: boolean;
  holdMs: number;
  originRef: RefObject<HTMLDivElement | null>;
  soundEnabled: boolean;
  audioContext: AudioContext | null;
  onTakeover: () => void;
  onComplete: () => void;
  onEnableSound: () => void;
};

const CREST = withBasePath("/brand/kap-ossen/ko-crest-primary-transparent-1024.png");
const PHASES: ReadonlyArray<{ phase: Exclude<Phase, "hold">; duration: number }> = [
  { phase: "center", duration: 900 },
  { phase: "expand", duration: 900 },
  { phase: "charge", duration: 550 },
  { phase: "fracture", duration: 900 },
  { phase: "suspend", duration: 650 },
  { phase: "reassemble", duration: 1_450 },
  { phase: "impact", duration: 3_900 },
  { phase: "foundation", duration: 1_500 },
  { phase: "st-firm", duration: 1_800 },
  { phase: "green-ki", duration: 2_000 },
  { phase: "ssos", duration: 2_200 },
  { phase: "scof", duration: 2_200 },
  { phase: "ecosystem", duration: 3_000 },
  { phase: "declaration", duration: 3_000 },
  { phase: "return", duration: 1_150 },
];

const fragments = Array.from({ length: 36 }, (_, index) => {
  const row = Math.floor(index / 6);
  const column = index % 6;
  const angle = ((index * 137.508 + row * 17) * Math.PI) / 180;
  const distance = 90 + ((index * 29) % 175);
  return {
    index,
    row,
    column,
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance),
    rotation: ((index * 47) % 220) - 110,
    delay: (index % 9) * 13,
  };
});

const sparks = Array.from({ length: 64 }, (_, index) => ({
  index,
  angle: (index * 137.508) % 360,
  distance: 18 + ((index * 31) % 44),
  delay: (index % 16) * 24,
}));

function playTone(context: AudioContext, frequency: number, endFrequency: number, duration: number, volume = 0.075) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, endFrequency), now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + Math.min(0.08, duration / 4));
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function speakCeremony() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const lines = ["Kap Ossen", "Tai", "Kibendi"];
  lines.forEach((line, index) => {
    const utterance = new SpeechSynthesisUtterance(line);
    utterance.rate = index === 0 ? 0.55 : 0.42;
    utterance.pitch = index === 0 ? 0.72 : 0.58;
    utterance.volume = 0.95;
    window.speechSynthesis.speak(utterance);
  });
}

function speakDeclaration() {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance("Kap Ossen. Rooted in Arror. Powered by knowledge. Engineered through S T Firm.");
  utterance.rate = 0.68;
  utterance.pitch = 0.7;
  utterance.volume = 0.94;
  window.speechSynthesis.speak(utterance);
}

export default function KoLegacySequence({ active, holdMs, originRef, soundEnabled, audioContext, onTakeover, onComplete, onEnableSound }: KoLegacySequenceProps) {
  const [phase, setPhase] = useState<Phase>("hold");
  const [origin, setOrigin] = useState({ x: "75vw", y: "48dvh", size: "220px" });
  const [documentHidden, setDocumentHidden] = useState(false);

  const phaseStyle = useMemo(() => ({
    "--ko-origin-x": origin.x,
    "--ko-origin-y": origin.y,
    "--ko-origin-size": origin.size,
    "--ko-hold-time": `${holdMs}ms`,
  }) as CSSProperties, [holdMs, origin]);

  useEffect(() => {
    const syncVisibility = () => {
      setDocumentHidden(document.hidden);
      if ("speechSynthesis" in window) {
        if (document.hidden) window.speechSynthesis.pause();
        else window.speechSynthesis.resume();
      }
    };
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (!active || documentHidden) return;
    const phaseIndex = PHASES.findIndex((item) => item.phase === phase);
    const duration = phase === "hold" ? holdMs : PHASES[phaseIndex]?.duration;
    if (!duration) return;
    const timer = window.setTimeout(() => {
      if (phase === "hold") {
        const rect = originRef.current?.getBoundingClientRect();
        if (rect) setOrigin({ x: `${rect.left + rect.width / 2}px`, y: `${rect.top + rect.height / 2}px`, size: `${rect.width}px` });
        onTakeover();
        setPhase("center");
        return;
      }
      const next = PHASES[phaseIndex + 1]?.phase;
      if (next) setPhase(next);
      else onComplete();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [active, documentHidden, holdMs, onComplete, onTakeover, originRef, phase]);

  useEffect(() => {
    if (!active || !soundEnabled || !audioContext) return;
    if (audioContext.state === "suspended") void audioContext.resume();
    if (phase === "center") playTone(audioContext, 120, 280, 0.85, 0.045);
    if (phase === "expand") playTone(audioContext, 90, 440, 1.15, 0.06);
    if (phase === "fracture") {
      playTone(audioContext, 150, 42, 0.9, 0.09);
      window.setTimeout(() => playTone(audioContext, 780, 110, 0.68, 0.045), 90);
    }
    if (phase === "reassemble") playTone(audioContext, 75, 620, 1.35, 0.065);
    if (phase === "impact") {
      playTone(audioContext, 52, 38, 1.7, 0.11);
      playTone(audioContext, 220, 55, 1.2, 0.055);
      window.setTimeout(speakCeremony, 230);
    }
    if (phase === "foundation") playTone(audioContext, 66, 96, 1.35, 0.055);
    if (phase === "st-firm") playTone(audioContext, 210, 540, 1.25, 0.052);
    if (phase === "green-ki") playTone(audioContext, 174, 470, 1.4, 0.048);
    if (phase === "ssos") playTone(audioContext, 330, 660, 1.1, 0.045);
    if (phase === "scof") playTone(audioContext, 110, 340, 1.5, 0.063);
    if (phase === "ecosystem") {
      playTone(audioContext, 164, 328, 1.7, 0.04);
      window.setTimeout(() => playTone(audioContext, 246, 492, 1.45, 0.035), 180);
    }
    if (phase === "declaration") {
      playTone(audioContext, 82, 220, 2.2, 0.06);
      window.setTimeout(speakDeclaration, 260);
    }
  }, [active, audioContext, phase, soundEnabled]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [active, onComplete]);

  if (!active) return null;
  const takeover = phase !== "hold";

  return (
    <div className={`koLegacySequence phase-${phase} ${takeover ? "isTakeover" : "isHolding"}`} style={phaseStyle} role={takeover ? "dialog" : "status"} aria-modal={takeover || undefined} aria-label="Kap Ossen ceremonial legacy sequence">
      <div className="koSequenceAtmosphere" aria-hidden="true"><i /><i /><i /></div>
      <div className="koSequenceHold" aria-hidden={takeover}>
        <span>Legacy signal detected</span>
        <b>Kap Ossen ceremony preparing</b>
        <i><em /></i>
      </div>

      <div className="koCinemaStage" aria-hidden={!takeover}>
        <div className="koCinemaCrest"><img src={CREST} alt="" /></div>
        <div className="koFragmentField" aria-hidden="true">
          {fragments.map((fragment) => (
            <i
              className="koFragment"
              key={fragment.index}
              style={{
                "--fragment-column": fragment.column,
                "--fragment-row": fragment.row,
                "--fragment-left": `${fragment.column * 16.6667}%`,
                "--fragment-top": `${fragment.row * 16.6667}%`,
                "--fragment-bg-x": `${fragment.column * 20}%`,
                "--fragment-bg-y": `${fragment.row * 20}%`,
                "--fragment-x": `${fragment.x}px`,
                "--fragment-y": `${fragment.y}px`,
                "--fragment-rotation": `${fragment.rotation}deg`,
                "--fragment-delay": `${fragment.delay}ms`,
              } as CSSProperties}
            />
          ))}
        </div>
        <div className="koShockwaves" aria-hidden="true"><i /><i /><i /></div>
        <div className="koSparkField" aria-hidden="true">
          {sparks.map((spark) => <i key={spark.index} style={{ "--spark-angle": `${spark.angle}deg`, "--spark-distance": `${spark.distance}vmin`, "--spark-delay": `${spark.delay}ms` } as CSSProperties} />)}
        </div>
        <div className="koCeremonyWords" aria-live="polite">
          <span>KAP OSSEN</span>
          <strong>TAAAAAAAAAAAAAI</strong>
          <em>KIBENDIIIIIIIIIIII!</em>
        </div>

        <div className="koEcosystemStage">
          <div className="koLegacyRoots" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="koFoundationCopy">
            <span>ARROR · FAMILY FOUNDATION</span>
            <strong>ROOTED IN ARROR</strong>
            <small>Heritage · Family · Land · Knowledge</small>
          </div>

          <article className="koShowcaseCard koPartnerShowcase" aria-hidden={!(["st-firm", "ecosystem", "declaration"].includes(phase))}>
            <div className="koPartnerPlate"><img src={withBasePath("/showcase/st-firm-partner.webp")} alt="ST-Firm" width="260" height="280" decoding="async" /></div>
            <div><span>PROPOSED TECHNOLOGY &amp; DESIGN PARTNER</span><strong>KAP OSSEN <i>×</i> ST-FIRM</strong><small>Berlin, Deutschland ↔ ARROR, Kenya</small></div>
          </article>

          <article className="koShowcaseCard koGreenShowcase" aria-hidden={!(["green-ki", "ecosystem", "declaration"].includes(phase))}>
            <picture><source media="(max-width: 620px)" srcSet={withBasePath("/showcase/green-ki-mobile.webp")} /><img src={withBasePath("/showcase/green-ki-desktop.webp")} alt="GREEN KI and SSOS sovereign intelligence ecosystem" width="1200" height="1200" loading="eager" fetchPriority="low" decoding="async" /></picture>
            <div className="koProductCaption"><span>🌿 GREEN KI</span><strong>Sovereign intelligence</strong><small>Local · Secure · Sustainable</small></div>
          </article>

          <article className="koShowcaseCard koSsosShowcase" aria-hidden={!(["ssos", "ecosystem", "declaration"].includes(phase))}>
            <picture><source media="(max-width: 620px)" srcSet={withBasePath("/showcase/ssos-mobile.webp")} /><img src={withBasePath("/showcase/ssos-desktop.webp")} alt="SSOS Workflow Intelligence product presentation" width="1280" height="853" loading="eager" fetchPriority="low" decoding="async" /></picture>
            <div className="koProductCaption"><span>🧠 SSOS WORKFLOW INTELLIGENCE</span><strong>Organise. Automate. Preserve.</strong><small>Institutional knowledge designed to endure.</small></div>
          </article>

          <article className="koShowcaseCard koScofShowcase" aria-hidden={!(["scof", "ecosystem", "declaration"].includes(phase))}>
            <picture><source media="(max-width: 620px)" srcSet={withBasePath("/showcase/scof-coin-transparent-mobile.webp")} /><img src={withBasePath("/showcase/scof-coin-transparent.webp")} alt="SCOF digital value infrastructure coin powered by SSOS and ST-Firm" width="1000" height="1000" loading="eager" fetchPriority="low" decoding="async" /></picture>
            <div className="koProductCaption"><span>◉ SCOF</span><strong>Value infrastructure</strong><small>Strategic checkpoint · 29 October 2029</small></div>
          </article>

          <div className="koEcosystemLinks" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="koEcosystemBadges" aria-hidden="true">
            <span className="ecosystemKo"><img src={CREST} alt="" /></span>
            <i>×</i>
            <span className="ecosystemFirm"><img src={withBasePath("/showcase/st-firm-partner.webp")} alt="" /></span>
            <span className="ecosystemSsos"><img src={withBasePath("/showcase/ssos-symbol.webp")} alt="" /></span>
            <span className="ecosystemScof"><img src={withBasePath("/showcase/scof-coin-transparent-mobile.webp")} alt="" /></span>
          </div>
          <div className="koFinalDeclaration" aria-live="polite">
            <span>KAP OSSEN × ST-FIRM</span>
            <strong>ROOTED IN ARROR.<br />ENGINEERED IN DEUTSCHLAND.</strong>
            <p>Family knowledge transformed into sovereign systems, shared opportunity and lasting legacy.</p>
            <small>GREEN KI · SSOS · SCOF · ARROR CITY LEGACY</small>
          </div>
        </div>
      </div>

      <div className="koSequenceControls">
        {!soundEnabled && <button type="button" onClick={onEnableSound}>🔊 Enable ceremonial sound</button>}
        <button type="button" onClick={onComplete}>Skip <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  );
}
