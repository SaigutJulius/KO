"use client";

/* eslint-disable @next/next/no-img-element -- controlled local brand assets bypass Vinext's unavailable image optimizer */

import { useEffect, useRef, useState } from "react";
import { Crest } from "./BrandRace";
import { withBasePath } from "./sitePaths";

const phases = [
  { key: "scof", duration: 3_000 },
  { key: "kap", duration: 3_500 },
  { key: "firm", duration: 3_500 },
  { key: "finale", duration: 2_500 },
  { key: "rest", duration: 5_000 },
] as const;

const fireworks = [1, 2, 3, 4, 5, 6, 7] as const;
const bubbles = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const snowflakes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;
const pillars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const circuits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export default function FooterFinale() {
  const footerRef = useRef<HTMLElement>(null);
  const phaseRef = useRef(4);
  const remainingRef = useRef(phases[4].duration);
  const [phaseIndex, setPhaseIndex] = useState(4);
  const [inView, setInView] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

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
    if (!footerRef.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) {
        phaseRef.current = 0;
        remainingRef.current = phases[0].duration;
        setPhaseIndex(0);
      }
    }, { threshold: 0.18 });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const paused = focusWithin || documentHidden || reducedMotion;

  useEffect(() => {
    if (!inView || paused) return;
    if (phaseRef.current !== phaseIndex) {
      phaseRef.current = phaseIndex;
      remainingRef.current = phases[phaseIndex].duration;
    }

    let completed = false;
    const startedAt = performance.now();
    const timer = window.setTimeout(() => {
      completed = true;
      const next = (phaseIndex + 1) % phases.length;
      phaseRef.current = next;
      remainingRef.current = phases[next].duration;
      setPhaseIndex(next);
    }, remainingRef.current);

    return () => {
      window.clearTimeout(timer);
      if (!completed) remainingRef.current = Math.max(80, remainingRef.current - (performance.now() - startedAt));
    };
  }, [inView, paused, phaseIndex]);

  const phase = phases[phaseIndex].key;
  const phaseClass = `phase${phase.charAt(0).toUpperCase()}${phase.slice(1)}`;

  return (
    <footer
      ref={footerRef}
      className={`siteFooter ${phaseClass} ${paused ? "finalePaused" : ""}`}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      <div className="footerAlliance">
        <span className="alliancePulse" aria-hidden="true" />
        <b>KAP OSSEN <i>×</i> ST‑FIRM</b>
        <em>Heritage · Technology · Legacy</em>
        <small><span>SCOF · Separate value ecosystem</span><span>Kap Ossen · Family Embassy</span><span>ST‑Firm · Proposed technology partner</span></small>
      </div>

      <div className="footerPerformanceStage" role="img" aria-label="SCOF, Kap Ossen and proposed ST-Firm relationship sequence">
        <div className="footerSky" aria-hidden="true">
          <span className="footerHorizon" />

          <span className="scofSnowfield">
            {snowflakes.map((item) => <i className={`scofSnowflake snowflake${item}`} key={`snowflake-${item}`} />)}
          </span>
          <span className="scofWord">{"SCOF".split("").map((letter, index) => <i key={letter}>{letter}<b className={`crystal crystal${index + 1}`} /></i>)}</span>

          <span className="koPillarRing">{pillars.map((item) => <i className={`koPillar pillar${item}`} key={`pillar-${item}`} />)}<Crest /></span>
          <span className="arrorRoots">{[1, 2, 3, 4, 5].map((item) => <i key={`root-${item}`} />)}</span>

          <span className="firmCircuitField">{circuits.map((item) => <i className={`firmCircuit circuit${item}`} key={`circuit-${item}`} />)}<img src={withBasePath("/st-firm-logo.png")} alt="" width="260" height="280" decoding="async" /></span>

          <span className="footerRunner footerKoRunner"><Crest /></span>
          <span className="footerRunner footerStRunner"><img src={withBasePath("/st-firm-logo.png")} alt="" width="260" height="280" decoding="async" /></span>
          <span className="footerInfinity" />
          <span className="footerPartnership">×</span>

          <span className="footerShowTitle scofShowTitle"><b>SCOF</b><small>Separate value ecosystem</small></span>
          <span className="footerShowTitle kapShowTitle"><b>KAP OSSEN</b><small>Family Embassy · ARROR</small></span>
          <span className="footerShowTitle firmShowTitle"><b>ST-FIRM</b><small>Proposed technology &amp; design partner</small></span>

          {fireworks.map((item) => <span className={`footerFirework firework${item}`} key={`firework-${item}`} />)}
          {bubbles.map((item) => <span className={`footerBubble footerBubble${item}`} key={`footer-bubble-${item}`} />)}
          <span className="footerShockwave shockwaveOne" />
          <span className="footerShockwave shockwaveTwo" />
        </div>
        <div className="footerStaticStageLockup" aria-hidden="true">
          <span className="staticKoMark"><Crest /></span>
          <i>×</i>
          <span className="staticFirmMark"><img src={withBasePath("/st-firm-logo.png")} alt="" width="260" height="280" decoding="async" /></span>
          <p><b>Kap Ossen</b><small>Heritage · Proposed technology relationship</small></p>
        </div>
      </div>

      <div className="footerIdentityDeck">
        <a className="footerBrand footerIdentity" href="#top" aria-label="Kap Ossen Family Embassy - return to top">
          <span className="footerLogoHalo"><img src={withBasePath("/brand/kap-ossen/ko-monogram-header-256.webp")} alt="" width="256" height="256" loading="lazy" decoding="async" /></span>
          <span><b>Kap Ossen</b><small>Family Embassy · From Heritage to Legacy</small></span>
        </a>

        <div className="stFirmMark footerIdentity">
          <span className="footerLogoHalo stHalo"><img src={withBasePath("/st-firm-logo.png")} alt="ST-Firm" width="260" height="280" loading="lazy" decoding="async" /></span>
          <p><b>Proposed technology &amp; design partner</b><span>ST-Firm · Berlin, Deutschland</span><em>Idee Meet’s Tech.</em></p>
        </div>
      </div>

      <nav className="footerLinks footerNavigationDeck" aria-label="Footer navigation">
        <a href="#top">Top ↑</a>
        <a href="#family-tree">Family tree</a>
        <a href="#gallery">Gallery</a>
        <a href="#governance">Governance</a>
      </nav>

      <div className="footerLegal footerLegalChamber">
        <span className="legalSpark legalSparkOne" aria-hidden="true" />
        <span className="legalSpark legalSparkTwo" aria-hidden="true" />
        <p className="legalSignature">© 2026–2027 <strong>Engineer Saigut Julius Kipkorir</strong>, trading as <span className="entity entityFirm">ST-Firm</span>.</p>
        <p className="legalRights"><strong>Kap Ossen Family Heritage Project.</strong> All rights reserved, subject to underlying family and third-party rights.</p>
        <div className="legalRule" aria-hidden="true"><span /></div>
        <p className="legalStatus">Working family vision and concept identity. Proposed roles and development concepts require formal approval. <span className="entity entityKap">Kap Ossen</span>, <span className="entity entityFirm">ST-Firm</span>, <span className="entity entityArrror">ARROR City Legacy</span>, <span className="entity entitySolomon">Solomon Ops</span>, <span className="entity entityScof">SCOF</span>, <span className="entity entityKenaff">KENAFF</span> and any future <span className="entity entityGateway">Gateway</span> vehicle retain distinct ownership, authority, finance, data and publication controls.</p>
      </div>
    </footer>
  );
}
