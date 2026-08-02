"use client";

import { useEffect, useRef, useState } from "react";
import BrandRace from "./BrandRace";

type BulletinItem = readonly [label: string, value: string, note: string, icon: string];

const navLinks = [
  ["🧬", "Family tree", "#family-tree"],
  ["📸", "Gallery", "#gallery"],
  ["🏗️", "30-acre vision", "#land-vision"],
  ["🏛️", "Governance", "#governance"],
  ["🌱", "Sustainability", "#sustainability"],
  ["☕", "SCOF", "#scof-value"],
] as const;

export default function SiteChrome({ bulletin }: { bulletin: readonly BulletinItem[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);

  return (
    <div className="stickyShell">
      <div className="marketRail" aria-label="Kap Ossen live family intelligence bulletin">
        <div className="liveFlag"><i aria-hidden="true" /><span>LIVE<br />LEGACY</span></div>
        <div className="tickerWindow">
          <div className="tickerTrack">
            {[0, 1].map((set) => (
              <div className="tickerSet" aria-hidden={set === 1} key={set}>
                {bulletin.map(([label, value, note, icon]) => (
                  <span className="tickerItem" key={`${set}-${label}`}>
                    <span className="tickerEmoji" aria-hidden="true">{icon}</span>
                    <span><small>{label}</small><strong>{value}</strong><em>{note}</em></span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <header className="siteHeader">
        <BrandRace />
        <nav className="siteNav" aria-label="Primary navigation">
          {navLinks.map(([icon, label, href]) => <a href={href} key={href}><span aria-hidden="true">{icon}</span>{label}</a>)}
        </nav>
        <a className="navCta" href="#legacy-map">Explore legacy <span aria-hidden="true">↗</span></a>
        <button ref={buttonRef} className="menuButton" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span><span className="srOnly">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </header>

      {open && (
        <nav ref={mobileNavRef} id="mobile-navigation" className="mobileNav isOpen" aria-label="Mobile navigation">
          {navLinks.map(([icon, label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}><span aria-hidden="true">{icon}</span><b>{label}</b><i aria-hidden="true">→</i></a>
          ))}
        </nav>
      )}
    </div>
  );
}
