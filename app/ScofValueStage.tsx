import ScofCoinBackdrop from "./ScofCoinBackdrop";
import ScofCountdown from "./ScofCountdown";
import { formatEur, formatKes, scofValueConfig, scofValueDerived } from "./scofValueConfig";

const valueSteps = [
  ["01", "2026", "Govern", "Price authority, supply rules, treasury policy and reporting."],
  ["02", "2027", "Prove utility", "Traceability, services and real producer/buyer use cases."],
  ["03", "2028", "Expand adoption", "Verified participants, repeat activity and audited evidence."],
  ["04", "2029", "Review readiness", "Close delivery gaps and complete the 29 October review."],
] as const;

export default function ScofValueStage() {
  const checkpointMultiple = scofValueDerived.checkpointMultiple.toFixed(2);
  const horizonFromCurrent = scofValueDerived.horizonFromCurrentMultiple.toFixed(2);
  const horizonFromCheckpoint = scofValueDerived.horizonFromCheckpointMultiple.toFixed(2);

  return (
    <section className="section scofSection" id="scof-value" aria-labelledby="scof-command-title">
      <ScofCoinBackdrop />

      <div className="scofCommandShell">
        <header className="scofHero">
          <div className="scofHeroCopy">
            <p className="scofProtocol"><span>LIVE VALUE PROTOCOL</span><i>BLOCK 2029</i></p>
            <p className="kicker light"><span aria-hidden="true">◆</span> SCOF value command</p>
            <h2 className="scofCommandTitle" id="scof-command-title">
              <span className="scofValuePrimary">{formatKes(scofValueConfig.checkpoint.kes)}</span>
              <span className="scofCheckpointLine">Strategic checkpoint</span>
              <em>by {scofValueConfig.checkpoint.dateLabel}.</em>
            </h2>
            <p className="scofLead">
              A transparent value path measured against SCOF&apos;s current issuer-set price of {formatKes(scofValueConfig.current.kes)}. The separate {formatEur(scofValueConfig.horizon.eur)} horizon remains an aspiration—not a promise of future market value.
            </p>
            <div className="scofHeroChips" aria-label="SCOF value summary">
              <span><small>Current</small><b>{formatKes(scofValueConfig.current.kes)}</b></span>
              <span><small>Checkpoint multiple</small><b>{checkpointMultiple}×</b></span>
              <span><small>Horizon equivalent</small><b>≈ {formatKes(scofValueDerived.horizonKes)}</b></span>
            </div>
          </div>

          <aside className="countdownCard" aria-label="SCOF checkpoint countdown">
            <div className="countdownStatus"><span>Target review</span><i>Kenya time · EAT</i></div>
            <ScofCountdown />
            <p>Utility <i>+</i> adoption <i>+</i> commerce <i>+</i> revenue <i>+</i> trust</p>
          </aside>
        </header>

        <div className="scofValuePath" aria-label="Illustrative SCOF value path">
          <article className="scofPathNode pathCurrent">
            <div className="scofNodeHeading"><span>BLOCK 01</span><i>Current</i></div>
            <b className="scofPathValue">{formatKes(scofValueConfig.current.kes)}</b>
            <strong className="scofPathMultiple">1.00× <small>baseline</small></strong>
            <p>Current issuer-set reference price.</p>
          </article>

          <article className="scofPathNode pathCheckpoint">
            <div className="scofNodeHeading"><span>BLOCK 02</span><i>2029 checkpoint</i></div>
            <b className="scofPathValue">{formatKes(scofValueConfig.checkpoint.kes)}</b>
            <strong className="scofPathMultiple">{checkpointMultiple}× <small>from current</small></strong>
            <p>{scofValueConfig.checkpoint.dateLabel} strategic review.</p>
          </article>

          <article className="scofPathNode pathHorizon">
            <div className="scofNodeHeading"><span>BLOCK 03</span><i>Long horizon</i></div>
            <b className="scofPathValue">{formatEur(scofValueConfig.horizon.eur)}</b>
            <span className="scofKesEquivalent">≈ {formatKes(scofValueDerived.horizonKes)}</span>
            <strong className="scofPathMultiple scofHorizonMultiple">{horizonFromCurrent}× <small>from current</small></strong>
            <p>{horizonFromCheckpoint}× from the {formatKes(scofValueConfig.checkpoint.kes)} checkpoint.</p>
          </article>
        </div>

        <div className="scofMetrics" aria-label="SCOF value metrics">
          <article><small>Current price</small><b>{formatKes(scofValueConfig.current.kes)}</b><span>Issuer-set baseline</span></article>
          <article className="target"><small>2029 checkpoint</small><b>{formatKes(scofValueConfig.checkpoint.kes)}</b><span>{scofValueConfig.checkpoint.dateLabel}</span></article>
          <article><small>Checkpoint value gap</small><b>+{formatKes(scofValueDerived.checkpointGapKes)}</b><span>{checkpointMultiple}× current</span></article>
          <article className="horizon"><small>Global horizon</small><b>{formatEur(scofValueConfig.horizon.eur)}</b><span>≈ {formatKes(scofValueDerived.horizonKes)}*</span></article>
        </div>

        <div className="valueSteps" aria-label="SCOF delivery sequence">
          {valueSteps.map(([number, year, title, description]) => (
            <article key={number}>
              <b>{number}</b>
              <div><small>{year}</small><h3>{title}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>

        <p className="scofFxNote">
          *Illustrative conversion at KSh {scofValueConfig.fxReference.eurKes.toFixed(2)} per EUR. Currency rates change. All multiples describe illustrative value relationships between stated reference points; checkpoints and aspirations are not guaranteed market outcomes or investment returns.
        </p>
      </div>
    </section>
  );
}
