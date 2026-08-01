"use client";

import { useEffect, useRef, useState } from "react";

type Routine = "Legacy Launch" | "Aror to the World" | "Heritage × Technology" | "Twelve-Pillar Orbit" | "Homecoming Finish";
const routineNames: Routine[] = ["Legacy Launch", "Aror to the World", "Heritage × Technology", "Twelve-Pillar Orbit", "Homecoming Finish"];
const wait = (ms: number) => new Promise<void>(resolve => window.setTimeout(resolve, ms));

export function Crest({ compact = false }: { compact?: boolean }) {
  return <span className={`koCrest${compact ? " compact" : ""}`} aria-hidden="true">
    <span className="crestOrbit">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</span>
    <span className="crestCore"><b>KO</b><small>AROR</small></span>
  </span>;
}

export default function BrandRace() {
  const brandRef = useRef<HTMLAnchorElement>(null);
  const familyRef = useRef<HTMLSpanElement>(null);
  const techRef = useRef<HTMLSpanElement>(null);
  const animations = useRef<Animation[]>([]);
  const [routine, setRoutine] = useState<Routine>(routineNames[0]);
  const [racing, setRacing] = useState(false);

  useEffect(() => {
    const brand = brandRef.current;
    const family = familyRef.current;
    const tech = techRef.current;
    if (!brand || !family || !tech || !("animate" in family)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 999px)");
    let cancelled = false;
    let index = 0;

    async function loop() {
      while (!cancelled) {
        if (document.hidden || reduced.matches || narrow.matches) { setRacing(false); await wait(1200); continue; }
        const header = brand!.closest("header");
        const distance = Math.max(180, (header?.clientWidth ?? window.innerWidth) - brand!.clientWidth - 230);
        const current = routineNames[index++ % routineNames.length];
        setRoutine(current); setRacing(true);
        let familyFrames: Keyframe[];
        let techFrames: Keyframe[] = [{ transform: "translateY(0)" }, { transform: "translateY(-5px)", offset: .5 }, { transform: "translateY(0)" }];
        let duration = 9600;

        if (current === "Legacy Launch") familyFrames = [
          { transform: "translate3d(0,0,0)" }, { transform: "translate3d(0,5px,0) scale(1.08,.88)", offset: .17 },
          { transform: `translate3d(${distance}px,-3px,0) rotate(10deg)`, offset: .43 }, { transform: `translate3d(${distance}px,0,0) rotate(-5deg)`, offset: .52 },
          { transform: "translate3d(0,-10px,0) rotate(-360deg)", offset: .78 }, { transform: "translate3d(0,0,0) rotate(-360deg)" }
        ];
        else if (current === "Aror to the World") { duration = 10800; familyFrames = [
          { transform: "translate3d(0,0,0)" }, { transform: `translate3d(${distance * .25}px,-16px,0) rotate(90deg)`, offset: .22 },
          { transform: `translate3d(${distance * .55}px,5px,0) rotate(190deg)`, offset: .42 }, { transform: `translate3d(${distance}px,-14px,0) rotate(360deg)`, offset: .62 },
          { transform: `translate3d(${distance * .45}px,-22px,0) rotate(540deg)`, offset: .79 }, { transform: "translate3d(0,0,0) rotate(720deg)" }
        ]; }
        else if (current === "Heritage × Technology") { duration = 11200; familyFrames = [
          { transform: "translate3d(0,0,0)" }, { transform: `translate3d(${distance}px,-4px,0) rotate(12deg)`, offset: .32 }, { transform: "translate3d(0,0,0)", offset: .48 }, { transform: "translate3d(0,0,0)" }
        ]; techFrames = [
          { transform: "translate3d(0,0,0)" }, { transform: "translate3d(0,0,0)", offset: .43 }, { transform: `translate3d(${distance}px,-5px,0) rotate(10deg)`, offset: .72 },
          { transform: "translate3d(0,-10px,0) rotate(360deg)", offset: .9 }, { transform: "translate3d(0,0,0) rotate(360deg)" }
        ]; }
        else if (current === "Twelve-Pillar Orbit") { duration = 9900; familyFrames = [
          { transform: "translate3d(0,0,0) rotate(0) scale(1)" }, { transform: `translate3d(${distance * .5}px,-16px,0) rotate(360deg) scale(1.2)`, offset: .38 },
          { transform: `translate3d(${distance * .5}px,0,0) rotate(720deg) scale(.95)`, offset: .62 }, { transform: "translate3d(0,-10px,0) rotate(1080deg) scale(1.08)", offset: .86 },
          { transform: "translate3d(0,0,0) rotate(1080deg) scale(1)" }
        ]; }
        else familyFrames = [
          { transform: "translate3d(0,0,0)" }, { transform: `translate3d(${distance * .33}px,-28px,0) rotate(140deg)`, offset: .28 },
          { transform: `translate3d(${distance * .67}px,-32px,0) rotate(280deg)`, offset: .5 }, { transform: `translate3d(${distance}px,-26px,0) rotate(420deg)`, offset: .68 },
          { transform: "translate3d(0,-12px,0) rotate(720deg)", offset: .88 }, { transform: "translate3d(0,0,0) rotate(720deg)" }
        ];

        const a = family!.animate(familyFrames, { duration, easing: "cubic-bezier(.4,0,.2,1)" });
        const b = tech!.animate(techFrames, { duration, easing: "cubic-bezier(.4,0,.2,1)" });
        animations.current = [a, b];
        await Promise.all(animations.current.map(item => item.finished.catch(() => undefined)));
        setRacing(false); await wait(4800);
      }
    }
    loop();
    return () => { cancelled = true; animations.current.forEach(animation => animation.cancel()); };
  }, []);

  return <a ref={brandRef} className={`brandRace${racing ? " isRacing" : ""}`} href="#top" aria-label="Kap Ossen Family — Home">
    <span ref={familyRef} className="raceChip familyChip"><Crest compact /></span>
    <span className="brandWords"><strong>Kap Ossen</strong><small>Family Legacy · Aror</small></span>
    <span className="brandTimes" aria-hidden="true">×</span>
    <span ref={techRef} className="raceChip techChip"><img src="/st-firm-logo.png" alt="" width="260" height="280" /></span>
    <span className="routineName" aria-hidden="true">{routine}</span>
  </a>;
}
