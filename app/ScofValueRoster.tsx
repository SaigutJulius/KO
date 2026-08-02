import { FinaleRosterId } from "./finaleMediaTimeline";
import { formatEur, formatKes, scofValueConfig, scofValueDerived } from "./scofValueConfig";

const consistencyPillars = ["Utility", "Adoption", "Governance", "Evidence", "Technology", "Community"] as const;

export default function ScofValueRoster({ scene }: { scene: FinaleRosterId }) {
  const currentKes = formatKes(scofValueConfig.current.kes);
  const checkpointKes = formatKes(scofValueConfig.checkpoint.kes);
  const horizonKes = formatKes(scofValueDerived.horizonKes);

  return (
    <div className={`scofValueRoster roster-${scene}`} aria-live="polite" aria-atomic="true">
      {scene === "awakening" && <div className="rosterSignal"><small>SCOF value command</small><b>Current position</b><span>Consistency begins with a governed baseline.</span></div>}
      {scene === "current" && <div className="rosterMonument"><small>1 SCOF · NOW</small><b>{currentKes}</b><span>{scofValueConfig.current.status}</span></div>}
      {scene === "current-fx" && <div className="rosterDual"><small>Current reference conversion</small><b>{currentKes}</b><i>≈</i><strong>{formatEur(scofValueDerived.currentEur)}</strong><span>Illustrative EUR/KES reference</span></div>}
      {scene === "checkpoint-date" && <div className="rosterDate"><small>SCOF strategic checkpoint</small><b>29</b><strong>October 2029</strong><span>Evidence before expectation.</span></div>}
      {scene === "checkpoint-path" && <div className="rosterPath"><small>Consistency pathway</small><b>{currentKes}</b><i>→</i><strong>{checkpointKes}</strong><span>Utility · Adoption · Governance · Evidence</span></div>}
      {scene === "checkpoint-multiple" && <div className="rosterMetrics"><article><small>Value multiple</small><b>{scofValueDerived.checkpointMultiple.toFixed(2)}×</b></article><article><small>Value gap</small><b>+{formatKes(scofValueDerived.checkpointGapKes)}</b></article><article><small>Target uplift</small><b>+{scofValueDerived.checkpointUpliftPercent.toFixed(1)}%</b></article></div>}
      {scene === "firm-activation" && <div className="rosterSignal firmSignal"><small>Proposed technology and design partner</small><b>ST‑FIRM</b><span>Systems for governed, measurable execution.</span></div>}
      {scene === "consistency" && <div className="rosterConsistency"><small>Consistency engine</small><b>Evidence creates trust.</b><span>{consistencyPillars.map((item) => <i key={item}>{item}</i>)}</span></div>}
      {scene === "checkpoint-fx" && <div className="rosterDual"><small>{scofValueConfig.checkpoint.dateLabel}</small><b>{checkpointKes}</b><i>≈</i><strong>{formatEur(scofValueDerived.checkpointEur)}</strong><span>{scofValueDerived.checkpointMultiple.toFixed(2)}× current price</span></div>}
      {scene === "horizon" && <div className="rosterMonument horizonMonument"><small>Long-horizon aspiration</small><b>{formatEur(scofValueConfig.horizon.eur)}</b><span>Per SCOF · No guaranteed market outcome</span></div>}
      {scene === "horizon-kes" && <div className="rosterDual horizonDual"><small>Illustrative conversion</small><b>{formatEur(scofValueConfig.horizon.eur)}</b><i>≈</i><strong>{horizonKes}</strong><span>At KSh {scofValueConfig.fxReference.eurKes.toFixed(2)} per EUR</span></div>}
      {scene === "ladder" && <div className="rosterLadder"><article><small>Now</small><b>{currentKes}</b><span>1.00×</span></article><i>→</i><article><small>29 Oct 2029</small><b>{checkpointKes}</b><span>{scofValueDerived.checkpointMultiple.toFixed(2)}×</span></article><i>→</i><article><small>Horizon</small><b>{formatEur(scofValueConfig.horizon.eur)}</b><span>{scofValueDerived.horizonFromCurrentMultiple.toFixed(2)}×</span></article></div>}
      {scene === "multiples" && <div className="rosterMetrics multiples"><article><small>Current → 2029</small><b>{scofValueDerived.checkpointMultiple.toFixed(2)}×</b></article><article><small>2029 → €45</small><b>{scofValueDerived.horizonFromCheckpointMultiple.toFixed(2)}×</b></article><article><small>Current → €45</small><b>{scofValueDerived.horizonFromCurrentMultiple.toFixed(2)}×</b></article></div>}
      {scene === "constellation" && <div className="rosterConsistency constellation"><small>Consistency constellation</small><b>Utility → Evidence → Trust</b><span>{consistencyPillars.map((item) => <i key={item}>{item}</i>)}</span></div>}
      {scene === "lockup" && <div className="rosterSignal lockupSignal"><small>SCOF · KAP OSSEN × ST‑FIRM</small><b>From consistency to global value.</b><span>Heritage · Technology · Legacy</span></div>}
      {scene === "status" && <div className="rosterStatus"><b>Current price · Strategic checkpoint · Long-horizon aspiration</b><span>Currency conversions are illustrative. Targets are not guaranteed market outcomes or investment returns.</span></div>}
    </div>
  );
}
