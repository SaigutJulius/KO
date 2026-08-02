"use client";

import { type CSSProperties, useEffect } from "react";

type LegacySignalDetectorProps = {
  active: boolean;
  resetting: boolean;
  seconds: number;
  soundEnabled: boolean;
  audioContext: AudioContext | null;
  onReset: () => void;
};

function signalTick(context: AudioContext, seconds: number, resetting: boolean) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  oscillator.type = resetting ? "sine" : "triangle";
  oscillator.frequency.setValueAtTime(resetting ? 180 : 370 + (6 - seconds) * 34, now);
  oscillator.frequency.exponentialRampToValueAtTime(resetting ? 95 : 520, now + 0.11);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.032, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.15);
}

export default function LegacySignalDetector({ active, resetting, seconds, soundEnabled, audioContext, onReset }: LegacySignalDetectorProps) {
  useEffect(() => {
    if ((!active && !resetting) || !soundEnabled || !audioContext) return;
    if (audioContext.state === "suspended") void audioContext.resume();
    signalTick(audioContext, seconds, resetting);
  }, [active, audioContext, resetting, seconds, soundEnabled]);

  if (!active && !resetting) return null;

  return (
    <aside className={`legacySignalDetector ${active ? "isActive" : ""} ${resetting ? "isResetting" : ""}`} role="status" aria-live="polite" aria-label={resetting ? "Legacy signal reset" : `Legacy signal active. Ceremony in ${seconds} seconds.`}>
      <div className="signalRadar" aria-hidden="true">
        <i className="radarArc arcOne" /><i className="radarArc arcTwo" /><i className="radarArc arcThree" />
        <span className="radarEye"><b /></span>
        <span className="radarSweep" />
      </div>
      <div className="signalCopy">
        <span><i aria-hidden="true" />{resetting ? "SIGNAL RESET" : "LEGACY SIGNAL ACTIVE"}</span>
        <strong>{resetting ? "Tracking cycle restarted" : "Kap Ossen identity detected"}</strong>
        <small>{resetting ? "Ceremony standing by" : "Ceremonial display acquiring…"}</small>
      </div>
      {!resetting && <div className="signalCountdown" aria-hidden="true"><span>LOCK</span><b>0{Math.max(0, seconds)}</b><i style={{ "--signal-turn": `${(6 - seconds) * 60}deg` } as CSSProperties} /></div>}
      <div className="signalStrength" aria-hidden="true">{[1, 2, 3, 4, 5].map((bar) => <i key={bar} />)}</div>
      {!resetting && <button type="button" onClick={onReset} aria-label="Cancel and reset the legacy ceremony countdown">×</button>}
    </aside>
  );
}
