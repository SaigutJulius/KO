"use client";

import { useEffect, useState } from "react";

const TARGET_TIME = Date.parse("2029-10-31T23:59:59+03:00");

type Countdown = { days: number; hours: number; minutes: number };

function timeRemaining(): Countdown {
  const remaining = Math.max(0, TARGET_TIME - Date.now());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
  };
}

export default function ScofCountdown() {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    const update = () => setCountdown(timeRemaining());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!countdown) return <p className="countdownLoading">Countdown synchronising...</p>;

  return (
    <div className="countdown" aria-label={`${countdown.days} days, ${countdown.hours} hours and ${countdown.minutes} minutes until the SCOF target review`}>
      <span><b>{countdown.days.toLocaleString()}</b><small>Days</small></span><i>:</i>
      <span><b>{String(countdown.hours).padStart(2, "0")}</b><small>Hours</small></span><i>:</i>
      <span><b>{String(countdown.minutes).padStart(2, "0")}</b><small>Minutes</small></span>
    </div>
  );
}
