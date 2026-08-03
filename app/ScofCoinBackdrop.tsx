"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "./sitePaths";

export default function ScofCoinBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const element = backdropRef.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: "180px 0px", threshold: 0.04 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={backdropRef}
      className={`scofCoinBackdrop${isActive ? " isActive" : ""}`}
      aria-hidden="true"
    >
      <div className="scofChainGrid" />
      <div className="scofValueBeam" />
      <div className="scofCoinOrbit">
        <picture>
          <source
            media="(max-width: 620px)"
            srcSet={withBasePath("/showcase/scof-coin-transparent-mobile.webp")}
          />
          <img
            src={withBasePath("/showcase/scof-coin-transparent.webp")}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
        <i className="scofCoinGlint" />
      </div>
      <div className="scofCircuit circuitOne"><i /><i /><i /></div>
      <div className="scofCircuit circuitTwo"><i /><i /></div>
      <div className="scofCircuit circuitThree"><i /><i /><i /></div>
    </div>
  );
}
