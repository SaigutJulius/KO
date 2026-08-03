/* eslint-disable @next/next/no-img-element -- controlled public assets intentionally bypass Vinext's unavailable preview optimizer */

import HeroCarousel from "./HeroCarousel";
import FooterFinale from "./FooterFinale";
import ScofValueStage from "./ScofValueStage";
import SiteChrome from "./SiteChrome";
import { formatEur, formatKes, scofValueConfig, scofValueDerived } from "./scofValueConfig";
import { withBasePath } from "./sitePaths";

export const dynamic = "force-static";

const bulletin = [
  ["SCOF NOW", `1 SCOF = ${formatKes(scofValueConfig.current.kes)}`, "Issuer-set price", "☕"],
  ["2029 CHECKPOINT", formatKes(scofValueConfig.checkpoint.kes), scofValueConfig.checkpoint.dateLabel, "🎯"],
  ["GLOBAL HORIZON", `${formatEur(scofValueConfig.horizon.eur)} · ≈ ${formatKes(scofValueDerived.horizonKes)}`, "Illustrative FX conversion", "🌍"],
  ["VALUE PATH", `1.00× → ${scofValueDerived.checkpointMultiple.toFixed(2)}× → ${scofValueDerived.horizonFromCurrentMultiple.toFixed(2)}×`, "Targets are not guarantees", "📊"],
  ["FAMILY GOVERNANCE", "PROPOSED PATRON", "Hon. Solomon Saigut Cherogony", "🏛️"],
  ["GLOBAL KNOWLEDGE", "BERLIN, DEUTSCHLAND", "Experience brought home", "🌍"],
  ["LEGACY HORIZON", "ARROR CITY 2050", "Vision · feasibility required", "🌱"],
] as const;

const familyBranches = [
  ["A", "Laban Cherogony family branch", "Name and relationship pending consent"],
  ["B", "John Cherogony family branch", "Name and relationship pending consent"],
  ["C", "Solomon Saigut Cherogony family branch", "Name and relationship pending consent"],
  ["D", "Haron Cherogony family branch", "Name and relationship pending consent"],
  ["E", "Dan Cherogony family branch", "Name and relationship pending consent"],
  ["F", "Chemutai family branch", "Full public name pending"],
  ["G", "Ndolo family branch", "Full public name pending"],
  ["H", "Chela Barasel family branch", "Spelling and full public name pending"],
  ["I", "Wesley family branch", "Full public name pending"],
  ["J", "Yakwai family branch", "Full spelling pending"],
  ["K", "Kipruto family branch", "Full public name pending"],
  ["L", "Cherono Cherogony family branch", "Identity confirmation pending"],
  ["M", "Elijah Cherogony family branch", "Name and relationship pending consent"],
] as const;

const pillars = [
  ["🤝", "Family unity", "Gather, listen and decide together."],
  ["🏛️", "Leadership & community", "Serve with integrity and accountability."],
  ["☕", "Coffee & agriculture", "Grow quality, traceability and value addition."],
  ["🔗", "SCOF ecosystem", "Connect real utility to governed value creation."],
  ["🎓", "Education & mobility", "Prepare lawful local and global pathways."],
  ["💻", "ST-Firm Akademie", "Transfer AI, software and digital operations skills."],
  ["🚀", "Digital enterprise", "Create services, businesses and skilled work."],
  ["❤️", "Health & wellbeing", "Protect the people behind every ambition."],
  ["🌍", "Land stewardship", "Plan land responsibly across generations."],
  ["📊", "Family investment", "Use evidence, discipline and transparent controls."],
  ["📜", "Heritage & culture", "Preserve approved memories and oral histories."],
  ["✨", "Future generations", "Make knowledge and opportunity inheritable."],
] as const;

type GalleryItem = {
  kind: "art" | "placeholder";
  visual: string;
  title: string;
  category: string;
  description: string;
  width?: number;
  height?: number;
};

const gallery: GalleryItem[] = [
  { kind: "art", visual: withBasePath("/og-family-embassy.png"), width: 1659, height: 948, title: "Family Embassy vision artwork", category: "Vision", description: "The visual bridge from ARROR roots to a future legacy destination." },
  { kind: "art", visual: withBasePath("/brand/kap-ossen/ko-crest-3d-plum-1200.jpg"), width: 1200, height: 1200, title: "Kap Ossen ceremonial crest", category: "Identity", description: "Draft V1 ceremonial crest for family review and formal approval." },
  { kind: "placeholder", visual: "🌳", title: "ARROR roots", category: "Origins", description: "Landscape, homestead and approved oral-history photographs." },
  { kind: "placeholder", visual: "👴🏿", title: "Grandfather's legacy", category: "Heritage", description: "Approved portraits and memories of the late Dickson Ossen Cherogony." },
  { kind: "placeholder", visual: "👨‍👩‍👧‍👦", title: "The family branches", category: "Generations", description: "Consent-cleared photographs representing every branch and generation." },
  { kind: "placeholder", visual: "🌾", title: "Work of our hands", category: "Enterprise", description: "Agriculture, construction, education, faith and professional service." },
  { kind: "placeholder", visual: "🌍", title: "The diaspora", category: "Knowledge", description: "Family journeys and experience across Kenya and the world." },
  { kind: "placeholder", visual: "🏙️", title: "The future archive", category: "Legacy", description: "Milestones from the 30-acre destination and ARROR City vision." },
];

const institutions = [
  ["01", "Kap Ossen", "Family embassy", "Heritage · unity · governance", "family"],
  ["02", "ST-Firm", "Delivery engine", "Technology · design · operations", "firm"],
  ["03", "ARROR City Legacy", "Long-horizon vision", "Land · infrastructure · 2050", "city"],
  ["04", "SCOF", "Separate ecosystem", "Utility · adoption · value target", "scof"],
  ["05", "Solomon Ops", "Separate political operation", "1 Aug 2026 · 2027 nomination cycle", "ops"],
] as const;

const zones = [
  ["A", "Gateway market", "Daily-needs market, local produce and efficient customer circulation.", "🛒"],
  ["B", "Mall & boutique street", "Flexible shops, food, services and a walkable public realm.", "🏬"],
  ["C", "Heritage & seasonal park", "Culture, December markets, events and family gatherings.", "🌳"],
  ["D", "Enterprise centre", "Training, co-working, incubation and ST-Firm Akademie.", "💡"],
  ["E", "Logistics & export", "Aggregation, storage, loading, packaging and forklift routes.", "📦"],
  ["F", "Future infrastructure", "Energy, water, drainage, safety and phased expansion.", "⚡"],
] as const;

const journey = [
  ["ARROR", "Roots", "Identity grounded in Baringo North."],
  ["MOMBASA", "Early chapter", "Family life shaped by work and transition."],
  ["ELDAMA RAVINE", "Homecoming", "Time with Guga deepened the legacy purpose."],
  ["ESTONIA", "Explore", "Lessons from digitally organised societies."],
  ["SWITZERLAND", "Opportunity", "Ethical visibility, networking and initiative."],
  ["BERLIN", "Build", "Technology and operating discipline in Deutschland."],
] as const;

const productSurfaces = [
  ["🧬", "Family Tree", "Internal review", "#family-tree", "review"],
  ["📸", "Living Archive", "Consent-led", "#gallery", "consent"],
  ["🗺️", "Legacy Map", "Concept", "#land-vision", "concept"],
  ["☕", "SCOF Value Command", "Separate ecosystem", "#scof-value", "separate"],
  ["🎓", "ST-Firm Akademie", "Planned", "#pillars", "planned"],
] as const;

export default function Home() {
  return (
    <main>
      <SiteChrome bulletin={bulletin} />
      <HeroCarousel />

      <section className="productDock" aria-label="Kap Ossen connected digital surfaces">
        <div className="productDockHeading"><div><span className="networkPulse" aria-hidden="true" /><small>ST-Firm systems layer</small></div><p>Five gateways. Clear status. One connected legacy.</p></div>
        <div className="productRail">
          {productSurfaces.map(([icon, title, status, href, tone]) => (
            <a className="productTile" href={href} key={title}>
              <span className="productIcon" aria-hidden="true">{icon}</span>
              <span className="productTitle"><b>{title}</b><small><i className={tone} />{status}</small></span>
              <span className="productArrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className="systemsSignature"><b>Proposed technology and implementation partner</b><span>ST-Firm · Berlin, Deutschland · Idee Meet’s Tech.</span></p>
      </section>

      <section className="section introSection" id="legacy-map">
        <header className="sectionHeading splitHeading">
          <div><p className="kicker"><span>🧭</span> The living family embassy</p><h2>One legacy.<br /><em>Five protected lanes.</em></h2></div>
          <p>Kap Ossen connects heritage to action while keeping family affairs, commercial delivery, the land vision, SCOF and political operations in clearly governed lanes.</p>
        </header>
        <div className="institutionMap">
          <div className="mapSpine"><span>KO</span><b>Shared purpose</b><small>Family-approved mandate</small></div>
          <div className="institutionCards">
            {institutions.map(([number, title, role, scope, tone]) => (
              <article className={tone} key={title}><span>{number}</span><div><small>{role}</small><h3>{title}</h3><p>{scope}</p></div></article>
            ))}
          </div>
        </div>
        <p className="clarityNote"><b>Governance firewall:</b> family participation is voluntary. Family data, land authority, SCOF operations, ST-Firm contracts and Solomon Ops funds must never be silently combined.</p>
      </section>

      <section className="legacySnapshot" aria-label="Kap Ossen legacy snapshot">
        <div className="signalDeck" aria-label="Kap Ossen headline metrics">
          <div><b>12</b><span>Strategic pillars</span></div>
          <div><b>≈30</b><span>Acres in the vision</span></div>
          <div><b>2029</b><span>SCOF target review</span></div>
          <div><b>All</b><span>Generations included</span></div>
        </div>
        <div className="legacyFlow" aria-label="Kap Ossen legacy pathway">
          {[["🌳", "Roots"], ["🧠", "Knowledge"], ["🚪", "Opportunity"], ["🌱", "Prosperity"], ["✨", "Legacy"]].map(([icon, label], index) => (
            <div key={label}><span aria-hidden="true">{icon}</span><b>{label}</b>{index < 4 && <i aria-hidden="true">→</i>}</div>
          ))}
        </div>
      </section>

      <section className="section familyTreeSection" id="family-tree">
        <header className="sectionHeading splitHeading">
          <div><p className="kicker light"><span>🧬</span> Living family tree</p><h2>From one root,<br /><em>many branches.</em></h2></div>
          <p>This is an internal working tree for family review—not a public genealogy. Names, relationships, biographies and photographs move to “confirmed” only after consent.</p>
        </header>
        <div className="familyTree">
          <article className="rootPerson">
            <span className="personIcon" aria-hidden="true">🌳</span>
            <div><small>Family root · family confirmation required</small><h3>The late Dickson Ossen Cherogony</h3><p>Children and family branches · confirmation in progress</p></div>
          </article>
          <div className="treeTrunk" aria-hidden="true"><i /></div>
          <div className="branchGrid">
            {familyBranches.map(([number, name, detail]) => (
              <article key={number}><span>{number}</span><div><h3>{name}</h3><p>{detail}</p></div></article>
            ))}
          </div>
        </div>
        <div className="verificationLegend"><b>INTERNAL REVIEW · DO NOT PUBLISH</b><span><i className="confirmed" /> Core record</span><span><i className="account" /> Family account</span><span><i className="pending" /> Consent pending</span></div>
      </section>

      <section className="section gallerySection" id="gallery">
        <header className="sectionHeading splitHeading">
          <div><p className="kicker"><span>📸</span> Family history gallery</p><h2>A gallery built on<br /><em>memory and consent.</em></h2></div>
          <p>The first two cards use project artwork. Every photography slot below is intentionally honest until the family approves the image, caption and publication rights.</p>
        </header>
        <div className="galleryGrid">
          {gallery.map((item, index) => (
            <article className={`${item.kind === "art" ? "galleryArt" : "galleryPlaceholder"} gallery-${index + 1}`} key={item.title}>
              {item.kind === "art" ? <img src={item.visual} alt={item.title} width={item.width} height={item.height} loading="lazy" decoding="async" /> : <span className="placeholderIcon" aria-hidden="true">{item.visual}</span>}
              <div className="galleryOverlay"><small>{item.category}</small><h3>{item.title}</h3><p>{item.description}</p>{item.kind !== "art" && <b>Photo awaiting family approval</b>}</div>
            </article>
          ))}
        </div>
        <p className="privacyStrip"><span>🔒</span><b>Private by design:</b> wills, title documents, exact personal locations, contacts and unapproved photographs stay outside the public site.</p>
      </section>

      <section className="section journeySection" id="journey">
        <header className="sectionHeading splitHeading">
          <div><p className="kicker"><span>🌍</span> Engineer Saigut Julius Kipkorir</p><h2>Go out. Learn.<br /><em>Bring knowledge home.</em></h2></div>
          <p>Founder and current sole proprietor trading as ST-Firm, operating from Berlin, Deutschland. His journey is framed as learning, ethical opportunity discovery and service to future generations.</p>
        </header>
        <div className="journeyTrack">
          {journey.map(([place, stage, description], index) => (
            <article key={place}><span>{String(index + 1).padStart(2, "0")}</span><small>{stage}</small><h3>{place}</h3><p>{description}</p></article>
          ))}
        </div>
        <blockquote>“The journey matters when knowledge returns home and becomes opportunity for others.”</blockquote>
      </section>

      <section className="section pillarSection" id="pillars">
        <header className="sectionHeading splitHeading">
          <div><p className="kicker light"><span>🧩</span> Family operating framework</p><h2>12 pillars.<br /><em>One connected future.</em></h2></div>
          <p>Each pillar is a practical programme lane. Together they move the family from shared identity to skills, institutions and intergenerational prosperity.</p>
        </header>
        <div className="pillarGrid">
          {pillars.map(([icon, title, description], index) => (
            <article key={title}><span aria-hidden="true">{icon}</span><small>{String(index + 1).padStart(2, "0")}</small><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      <section className="section landSection" id="land-vision">
        <header className="sectionHeading splitHeading">
          <div><p className="kicker light"><span>🏗️</span> Proposed 30-acre destination</p><h2>Use space across,<br /><em>upwards and downwards.</em></h2></div>
          <div><span className="conceptTag">Vision · not an approved development</span><p>A phased mixed-use gateway along the Eldama Ravine corridor: rooted in Kenyan place, disciplined by lessons learned in Deutschland and subject to land, planning, environmental, road-access and commercial feasibility.</p></div>
        </header>
        <div className="landStats"><div><b>≈30</b><span>Acres described</span></div><div><b>06</b><span>Connected zones</span></div><div><b>3D</b><span>Across · up · down</span></div><div><b>2050</b><span>ARROR City horizon</span></div></div>
        <div className="masterplanGraphic" aria-label="Conceptual six-zone land diagram">
          <div className="corridor"><span>Nakuru – Eldama Ravine corridor</span></div>
          {zones.map(([letter, title, , icon]) => <div className={`landZone zone${letter}`} key={letter}><span>{icon}</span><small>Zone {letter}</small><b>{title}</b></div>)}
          <div className="movementAxis"><span>People flow</span><i /><span>Service flow</span><i /><span>Future expansion</span></div>
        </div>
        <div className="zoneCards">
          {zones.map(([letter, title, description, icon]) => <article key={letter}><span aria-hidden="true">{icon}</span><small>Zone {letter}</small><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <ScofValueStage />

      <section className="section governanceSection" id="governance">
        <header className="sectionHeading splitHeading">
          <div><p className="kicker"><span>🏛️</span> Governance by consent</p><h2>Purpose needs<br /><em>clear stewardship.</em></h2></div>
          <p>The vision becomes credible when roles, permissions, records and money are governed before public claims or major commitments are made.</p>
        </header>
        <div className="governanceGrid">
          <article className="patronCard patronMediaCard" aria-label="Proposed Patron portrait and vision slogan">
            <div className="patronCardTop">
              <span className="roleBadge">Proposed Patron</span>
              <span className="patronConsultationStatus"><i /> Family consultation pending</span>
            </div>

            <figure className="patronPortrait">
              <picture>
                <source
                  media="(max-width: 620px)"
                  srcSet={withBasePath("/people/hon-solomon-saigut-cherogony-uda-2027-mobile.webp")}
                />
                <img
                  src={withBasePath("/people/hon-solomon-saigut-cherogony-uda-2027.webp")}
                  width="1536"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                  alt="Hon. Solomon Saigut Cherogony standing beside UDA campaign branding for the 2027 Eldama Ravine parliamentary campaign."
                />
              </picture>
              <figcaption>Submitted portrait · Campaign-branded source</figcaption>
            </figure>

            <div className="patronCardBody">
              <div className="patronSloganBlock">
                <span>Vision slogan</span>
                <blockquote>
                  <span>Taking Ravine</span>{" "}
                  <em>to the world</em>{" — "}
                  <span>and bringing the world</span>{" "}
                  <strong>to Ravine.</strong>
                </blockquote>
                <div className="patronWorldRoute" aria-hidden="true">
                  <span><i />Ravine</span><b /><span><i />World</span><b /><span><i />Ravine</span>
                </div>
              </div>
            </div>
          </article>

          <div className="governanceColumn">
            <div className="governanceFlow">
              <article><span>01</span><div><h3>Family Assembly</h3><p>Shared mandate, major approvals and intergenerational voice.</p></div></article>
              <article><span>02</span><div><h3>Family Council</h3><p>Representation, policy oversight and conflict handling.</p></div></article>
              <article><span>03</span><div><h3>Custodians & committees</h3><p>Heritage, land, finance, programmes, data and communications.</p></div></article>
              <article><span>04</span><div><h3>Independent controls</h3><p>Separate accounts, minutes, conflict declarations and audits.</p></div></article>
            </div>

            <article className="patronProfilePanel" aria-labelledby="patron-profile-title">
              <span className="patronProfileEyebrow">Proposed family stewardship</span>
              <h3 id="patron-profile-title">Hon. Solomon Saigut Cherogony</h3>
              <p className="patronRoleCopy">Proposed family patron and unifying senior steward, subject to formal family consultation, acceptance and documented appointment.</p>

              <div className="patronProfileNotices">
                <div className="patronNotice patronAppointment">
                  <span>Appointment status</span>
                  <p>No appointment is implied until that process is completed.</p>
                </div>

                <div className="patronNotice patronBoundary">
                  <span>Governance boundary</span>
                  <p>The supplied portrait and vision slogan reflect campaign identity. Political campaign activity remains operationally separate from the proposed family-governance role.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="operationsNotice"><span>🗳️</span><div><b>Solomon Ops remains separate.</b><p>It is the dedicated operation for Hon. Solomon Saigut Cherogony&apos;s 2027 MP bid and UDA nomination cycle, planned from 1 August 2026 through the applicable 2027 electoral phase. It needs its own authority, data, finance, team and compliance records.</p></div></div>
      </section>

      <section className="section sustainabilitySection" id="sustainability">
        <header className="sectionHeading splitHeading">
          <div><p className="kicker light"><span>🌱</span> Five-capital sustainability</p><h2>Built to create value<br /><em>without consuming the legacy.</em></h2></div>
          <p>Sustainability is the operating model: preserve family trust, land, knowledge, institutional capacity and financial resilience at the same time.</p>
        </header>
        <div className="capitalWheel">
          <div className="capitalCore"><span>KO</span><b>2050</b><small>Regenerative legacy</small></div>
          {[["👨‍👩‍👧‍👦", "Human", "Skills · health · opportunity"], ["🤝", "Social", "Trust · consent · belonging"], ["🌿", "Natural", "Land · water · biodiversity"], ["🏗️", "Built", "Safe · adaptable · efficient"], ["💰", "Financial", "Diverse · phased · accountable"]].map(([icon, name, detail], index) => <article className={`capital capital${index + 1}`} key={name}><span>{icon}</span><div><h3>{name} capital</h3><p>{detail}</p></div></article>)}
        </div>
      </section>

      <section className="section horizonSection">
        <header className="sectionHeading centered"><p className="kicker"><span>🗓️</span> The long horizon</p><h2>Build in phases.<br /><em>Keep the destination clear.</em></h2></header>
        <div className="horizonTimeline"><article><b>2026</b><h3>Organise</h3><p>Family confirmations, governance, archive and institutional boundaries.</p></article><article><b>2027</b><h3>Activate</h3><p>Skills, mentorship, partnerships and separate Solomon Ops delivery.</p></article><article><b>2028–29</b><h3>Prove</h3><p>SCOF utility evidence and land pre-feasibility.</p></article><article><b>2030–35</b><h3>Build</h3><p>Phased gateway, enterprise and family programmes.</p></article><article><b>2050</b><h3>ARROR City</h3><p>A long-horizon regional legacy vision—earned through evidence.</p></article></div>
      </section>

      <FooterFinale />
    </main>
  );
}
