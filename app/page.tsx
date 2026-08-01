import BrandRace, { Crest } from "./BrandRace";
import ScofCountdown from "./ScofCountdown";

const pillars = [
  ["01", "Family Unity", "Strengthen the relationships that make every other ambition possible.", "Meetings · Directory · Heritage · Mutual support", "plum"],
  ["02", "Leadership & Community Service", "Encourage leadership grounded in service, respect and responsible citizenship.", "Public service · Church · Mentorship · Development", "gold"],
  ["03", "Coffee & Agriculture", "Turn modern farming, quality and value addition into lasting prosperity.", "Modern coffee · Processing · Markets · Sustainability", "green"],
  ["04", "SCOF Ecosystem", "Explore a governed farm-to-market ecosystem built on traceability and technology.", "Empowerment · Traceability · Marketplace · Buyers", "plum"],
  ["05", "Education & Global Opportunities", "Prepare for lawful study and work pathways at home and abroad.", "Germany · Romania · Languages · Documentation", "blue"],
  ["06", "ST-Firm Akädemie", "Create a practical knowledge platform for future-ready skills.", "AI · Software · DevOps · Cybersecurity", "plum"],
  ["07", "Digital Economy & Entrepreneurship", "Build confidence to create businesses, digital services and income.", "Freelancing · E-commerce · Startups · Automation", "gold"],
  ["08", "Financial Markets Education", "Teach disciplined market study with strong risk awareness.", "Risk · Psychology · Gold · Forex", "blue"],
  ["09", "Career Development", "Support every honest path—from nursing and teaching to engineering.", "Planning · Readiness · Remote work · Enterprise", "green"],
  ["10", "Family Mentorship", "Make experience circulate so every generation helps the next.", "Advice · Literacy · Coaching · Leadership", "plum"],
  ["11", "Youth Development", "Give young people room to learn, innovate, serve and lead.", "Education · Sports · Innovation · Volunteerism", "gold"],
  ["12", "Diaspora Network", "Connect international experience with mentorship and family investment.", "Mentorship · Internships · Partnerships · Migration", "blue"],
];

const values = ["Unity", "Integrity", "Respect", "Hard Work", "Education", "Service", "Innovation", "Accountability", "Family First", "Faith & Prayer"];
const contributions = [
  ["Time", "Show up for meetings, projects and the moments when family matters most."],
  ["Knowledge", "Share lessons, opportunities and practical guidance across generations."],
  ["Mentorship", "Walk beside a younger member as they choose a career or build a skill."],
  ["Professional skills", "Contribute expertise in education, technology, farming, finance or leadership."],
  ["Resources", "Support agreed initiatives responsibly and transparently when you are able."],
  ["Prayer & encouragement", "Strengthen the family spiritually and celebrate one another’s progress."],
];

const bulletin = [
  ["SCOF OFFICIAL PRICE", "1 SCOF = KSh 165", "Issuer-set price"],
  ["31 OCTOBER 2029 TARGET", "1 SCOF = KSh 565", "Performance target"],
  ["VALUE MOVEMENT", "+KSh 400 · 3.42×", "+242.4% target uplift"],
  ["SCOF STATUS", "ECOSYSTEM DEVELOPMENT", "Utility · adoption · revenue"],
  ["FAMILY VISION", "2026 → 2035", "Building the future"],
  ["OPPORTUNITY RADAR", "KENYA · GERMANY · ROMANIA", "Plus remote careers"],
];

const heritageChapters = [
  ["01", "Origins", "ARROR and Baringo North—the landscape, values and community from which the family story grows."],
  ["02", "The founder", "The legacy of the late Dickson Ossen Cherogony and the responsibility carried by succeeding generations."],
  ["03", "Many branches", "Agriculture, engineering, education, faith, enterprise and public service across Kenya and the diaspora."],
  ["04", "The living archive", "Approved photographs, oral histories and documents preserved with consent for future generations."],
];

const journey = [
  ["ARROR", "Roots", "A family identity grounded in Baringo North."],
  ["KENYA", "Foundation", "Engineering, enterprise, agriculture and service."],
  ["ESTONIA", "Exploration", "Learning how smaller digital nations organise opportunity."],
  ["SWITZERLAND", "Hunt", "Proactive, lawful professional networking and opportunity discovery."],
  ["BERLIN", "Build", "Technology, systems thinking and German operating standards."],
  ["HOME", "Return", "Knowledge translated into family institutions and development."],
];

const landZones = [
  ["A", "Gateway Market", "A German-inspired daily-needs market with clear circulation, local produce and efficient operations.", "market"],
  ["B", "Mall & Boutique Street", "Flexible shops, food, professional rooms and a walkable, photographic public street.", "retail"],
  ["C", "Heritage & Seasonal Park", "A cultural landscape for December markets, events, photography and family gatherings.", "park"],
  ["D", "Enterprise Centre", "Training, co-working, ST-Firm Akademie and practical business incubation.", "enterprise"],
  ["E", "Logistics & Export", "Warehousing, aggregation, forklift routes, loading, packaging and export preparation.", "logistics"],
  ["F", "Infrastructure & Future", "Energy, water, drainage, security, emergency access and space for phased expansion.", "future"],
];

export default function Home() {
  return <main>
    <div className="marketRail" aria-label="Kap Ossen family intelligence bulletin">
      <div className="liveFlag"><i /><span>FAMILY<br/>INTELLIGENCE</span></div>
      <div className="tickerWindow">
        <div className="tickerTrack">
          {[0, 1].map(set => <div className="tickerSet" aria-hidden={set === 1} key={set}>
            {bulletin.map(([label, value, note]) => <span className="tickerItem" key={`${set}-${label}`}>
              <small>{label}</small><strong>{value}</strong><em>{note}</em>
            </span>)}
          </div>)}
        </div>
      </div>
    </div>
    <header className="siteHeader">
      <BrandRace />
      <nav className="siteNav" aria-label="Primary"><a href="#heritage">Heritage</a><a href="#journey">Journey</a><a href="#land-vision">30 Acres</a><a href="#pillars">12 Pillars</a><a href="#scof-value">SCOF</a></nav>
      <a className="navCta" href="#gather">Family Embassy</a>
    </header>

    <section className="hero" id="top">
      <div className="heroGrid">
        <div>
          <p className="eyebrow">Descendants of the late Dickson Ossen Cherogony</p>
          <h1>One family. <em>Shared roots.</em> A future we build together.</h1>
          <p className="lede">A living family embassy for heritage, education, agriculture, technology, enterprise and a proposed 30-acre legacy destination.</p>
          <div className="actions"><a className="btn primary" href="#land-vision">Enter the land vision</a><a className="btn ghost" href="#heritage">Explore our heritage</a></div>
          <div className="tags"><span>ARROR roots</span><span>Global knowledge</span><span>Shared prosperity</span><span>Future generations</span></div>
        </div>
        <aside className="motto"><div className="seal"><Crest /><small>2026–2035</small></div><p>Our family motto</p><blockquote>“United in Heritage. Empowered by Knowledge. Building the Future Together.”</blockquote><hr /><small>Every member has something valuable to contribute.</small></aside>
      </div>
      <div className="stats"><div><b>12</b><span>Strategic pillars</span></div><div><b>≈30</b><span>Acres in the vision</span></div><div><b>2029</b><span>SCOF target review</span></div><div><b>All</b><span>Generations included</span></div></div>
    </section>

    <div className="flow"><span>Roots</span><i>→</i><span>Knowledge</span><i>→</i><span>Opportunity</span><i>→</i><span>Prosperity</span><i>→</i><span>Legacy</span></div>

    <section className="section light" id="vision">
      <div className="heading split"><div><p className="eyebrow dark">Our north star</p><h2>A family vision built to outlive us.</h2></div><p>The plan is not about one person or one profession. It creates a shared direction while leaving room for every member’s individual journey.</p></div>
      <div className="visionGrid">
        <article className="statement featured"><label>Vision</label><h3>United, educated, innovative and economically empowered.</h3><p>Creating opportunities for future generations locally and internationally while contributing positively to Kenya and the world.</p></article>
        <article className="statement"><label>Mission</label><h3>Turn family connection into practical opportunity.</h3><p>Unite through education, mentorship, technology, agriculture, entrepreneurship, leadership and responsible service.</p></article>
        <article className="statement"><label>Core values</label><div className="values">{values.map(v => <span key={v}>{v}</span>)}</div></article>
      </div>
    </section>

    <section className="section heritage" id="heritage">
      <div className="heading split"><div><p className="eyebrow">Family history gallery</p><h2>Memory becomes inheritance when it is preserved.</h2></div><p>This first gallery establishes the chapters. Family photographs, recordings and detailed biographies will be added only after confirmation and consent.</p></div>
      <div className="heritageGrid">
        {heritageChapters.map(([number, title, description]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
      </div>
      <div className="archiveRail" aria-label="Planned family archive chapters">
        <article><b>ARROR</b><small>Origins and land</small></article>
        <article><b>SERVICE</b><small>Faith and leadership</small></article>
        <article><b>ENTERPRISE</b><small>Farming and construction</small></article>
        <article><b>DIASPORA</b><small>Knowledge across borders</small></article>
      </div>
      <p className="privacyNote"><b>Private by design:</b> the will, exact land records, personal contacts and unapproved photographs remain outside the public Family Embassy.</p>
    </section>

    <section className="section journey" id="journey">
      <div className="journeyIntro"><div><p className="eyebrow">Engineer Saigut Julius Kipkorir · Global journey</p><h2>Go out. Learn the system. Bring the knowledge home.</h2></div><p>Engineer Saigut Julius Kipkorir is an AI & Python Automation Engineer, Founder & CEO of ST-Firm, based in Berlin, Germany. His ARROR-to-Berlin story of mobility, observation and determined opportunity hunting is being translated into technology and development for the family.</p></div>
      <div className="journeyLine">{journey.map(([place, stage, description], index) => <article key={place}><span>{String(index + 1).padStart(2, "0")}</span><b>{place}</b><small>{stage}</small><p>{description}</p></article>)}</div>
      <blockquote className="journeyQuote">“The objective is not simply to travel. It is to understand what works, build visibility ethically, and convert experience into opportunity for the people who come after us.”</blockquote>
    </section>

    <section className="section ink" id="pillars">
      <div className="heading"><p className="eyebrow">The family operating framework</p><h2>12 pillars. One connected future.</h2><p>Each pillar solves a different part of the same challenge: helping knowledge, opportunity and prosperity move across generations.</p></div>
      <div className="pillarGrid">{pillars.map(([n,t,s,f,c]) => <details className={`pillar ${c}`} key={n}>
        <summary><b>{n}</b><span><strong>{t}</strong><small>{s}</small></span><i>+</i></summary>
        <div className="detail"><label>Priority areas</label><p>{f}</p></div>
      </details>)}</div>
    </section>

    <section className="section warm">
      <div className="heading split"><div><p className="eyebrow dark">Opportunity pathways</p><h2>Many routes. Equal dignity.</h2></div><p>Some will build careers in Kenya, some will work remotely, and others will study or work abroad through lawful, well-prepared pathways.</p></div>
      <div className="pathways">
        <article><b className="code ke">KE</b><h3>Build in Kenya</h3><p>Agriculture, education, entrepreneurship, public service and technology.</p><small>Local enterprise · Modern farming · Community leadership</small></article>
        <article><b className="code de">DE</b><h3>Prepare for Germany</h3><p>Language, vocational training, nursing and skilled-worker readiness.</p><small>German A1–C2 · Documentation · Cultural preparation</small></article>
        <article><b className="code ro">RO</b><h3>Explore Romania</h3><p>Structured guidance for study, work and professional preparation.</p><small>Study pathways · Work pathways · Professional readiness</small></article>
        <article><b className="code digital">∞</b><h3>Work globally</h3><p>Remote careers, digital business and international networks.</p><small>Software · Freelancing · Digital entrepreneurship</small></article>
      </div>
    </section>

    <section className="section landVision" id="land-vision">
      <div className="landHeading"><div><p className="eyebrow">Proposed 30-acre legacy destination</p><h2>From family land to a living economic institution.</h2></div><div><span className="conceptBadge">Proposed concept</span><p>A future-ready mixed-use destination along the Eldama Ravine corridor, combining German-inspired retail discipline with local enterprise, culture, logistics and agriculture.</p></div></div>

      <div className="landMetrics"><article><b>≈30</b><span>Acres described</span></article><article><b>06</b><span>Connected zones</span></article><article><b>3D</b><span>Across · Up · Down</span></article><article><b>1</b><span>Long-term legacy</span></article></div>

      <div className="masterplan" aria-label="Conceptual six-zone master plan">
        <div className="planRoad"><span>Nakuru–Eldama Ravine corridor</span></div>
        {landZones.map(([letter, title, , type]) => <div className={`planZone ${type}`} key={letter}><b>{letter}</b><span>{title}</span></div>)}
        <div className="planAxis"><i /><span>Customer axis</span><i /><span>Service axis</span></div>
      </div>

      <div className="zoneGrid">{landZones.map(([letter, title, description, type]) => <article className={type} key={letter}><span>{letter}</span><h3>{title}</h3><p>{description}</p></article>)}</div>

      <div className="revenueGrid" aria-label="Commercial models to test"><article><small>Rental economy</small><b>Retail · Offices · Warehouses</b></article><article><small>Seasonal destination</small><b>Events · Stalls · Photography</b></article><article><small>Trade services</small><b>Aggregation · Storage · Logistics</b></article><article><small>Knowledge economy</small><b>Training · Co-working · Digital services</b></article></div>

      <div className="developmentRules"><div><p className="eyebrow">German discipline · Kenyan identity</p><h3>Designed for customers, traders, cargo and future generations.</h3></div><ul><li>Separate customers, pedestrians and heavy vehicles.</li><li>Basement parking only after geotechnical and drainage feasibility.</li><li>Original identity—no implied Lidl or Amazon affiliation.</li><li>Surveys, planning, road access and environmental approvals before construction.</li></ul></div>
    </section>

    <section className="section scofValue" id="scof-value">
      <div className="valueIntro">
        <div>
          <p className="eyebrow">SCOF value command</p>
          <h2>KSh 565 by<br /><em>31 October 2029.</em></h2>
        </div>
        <div className="targetSummary">
          <p>The mission is to move SCOF from its official issuer-set price of <b>KSh 165</b> to the ecosystem performance target of <b>KSh 565</b>.</p>
          <ScofCountdown />
          <small>Countdown to the target review in Kenya time (EAT).</small>
        </div>
      </div>

      <div className="valueMetrics" aria-label="SCOF target metrics">
        <article><small>Official price</small><strong>KSh 165</strong><span>Issuer-set baseline</span></article>
        <article className="target"><small>2029 target</small><strong>KSh 565</strong><span>31 October 2029</span></article>
        <article><small>Value gap</small><strong>+KSh 400</strong><span>Per SCOF</span></article>
        <article><small>Target multiple</small><strong>3.42×</strong><span>+242.4% uplift</span></article>
      </div>

      <div className="valuePlan">
        <div className="missionPhases">
          <article><b>01</b><div><small>Aug–Dec 2026</small><h3>Govern the foundation</h3><p>Publish the price authority, supply rules, treasury policy and a transparent monthly scorecard.</p></div></article>
          <article><b>02</b><div><small>2027</small><h3>Prove real utility</h3><p>Launch traceability, farm services and marketplace uses that solve measurable producer and buyer needs.</p></div></article>
          <article><b>03</b><div><small>2028</small><h3>Expand adoption</h3><p>Grow verified farmers, buyers, partners and repeat activity while reporting ecosystem performance.</p></div></article>
          <article><b>04</b><div><small>Jan–Oct 2029</small><h3>Reach target readiness</h3><p>Audit the evidence, close delivery gaps and complete the final value review on 31 October 2029.</p></div></article>
        </div>
        <aside className="readinessBoard">
          <p className="eyebrow">Mission scorecard</p>
          <h3>What must create the value</h3>
          <ul>
            <li><span>Utility</span><b>Working products & services</b></li>
            <li><span>Adoption</span><b>Verified active participants</b></li>
            <li><span>Commerce</span><b>Repeat marketplace activity</b></li>
            <li><span>Revenue</span><b>Sustainable ecosystem income</b></li>
            <li><span>Trust</span><b>Transparent reporting & audits</b></li>
          </ul>
          <p className="targetNote"><b>Target discipline:</b> KSh 565 is the 31 October 2029 performance target. Progress should be supported by verified ecosystem results; a future value is not guaranteed.</p>
        </aside>
      </div>
    </section>

    <section className="section roadmap" id="roadmap">
      <div className="heading center"><p className="eyebrow">Proposed family roadmap</p><h2>From shared intention to a living legacy.</h2><p>A practical sequence for family discussion, refinement and approval.</p></div>
      <div className="roadmapGrid">
        <article><b>2026</b><small>Phase 01</small><h3>Unite & organise</h3><p>Agree governance, create a directory, document heritage and establish regular meetings.</p></article>
        <article><b>2027–28</b><small>Phase 02</small><h3>Learn & mentor</h3><p>Launch mentorship circles, career guidance and practical learning programmes.</p></article>
        <article><b>2029–31</b><small>Phase 03</small><h3>Build & invest</h3><p>Develop agricultural, technology and enterprise initiatives with accountability.</p></article>
        <article><b>2032–35</b><small>Phase 04</small><h3>Scale & sustain</h3><p>Strengthen the diaspora network, partnerships and institutions for the next generation.</p></article>
      </div>
    </section>

    <section className="section light" id="contribute">
      <div className="heading split"><div><p className="eyebrow dark">Every member matters</p><h2>Contribution is bigger than money.</h2></div><p>A strong family makes space for different seasons of life. Everyone can contribute something—now or later, visibly or quietly.</p></div>
      <div className="contributions">{contributions.map(([t,p],i) => <article key={t}><span>{String(i+1).padStart(2,"0")}</span><h3>{t}</h3><p>{p}</p></article>)}</div>
    </section>

    <section className="section safeguards" id="safeguards"><div><p className="eyebrow">Trust by design</p><h2>Ambition with responsibility.</h2></div><div className="rules"><p><b>Private family records</b><span>The complete tree, will, documents and contacts belong in a protected Situation Room.</span></p><p><b>Transparent decisions</b><span>Agreed projects need owners, records and accountability.</span></p><p><b>Proposals labelled clearly</b><span>The land vision remains a concept until family and professional approvals are complete.</span></p><p><b>Education before risk</b><span>Markets and digital assets are not guaranteed income.</span></p></div></section>

    <section className="gather" id="gather"><div><p className="eyebrow">The Family Embassy is open</p><h2>A family plan becomes real when the family shapes it together.</h2><p>Confirm the history, approve the first photographs, assign project owners and turn this public vision into a secure family operating system.</p><div className="actions"><a className="btn primary" href="#heritage">Review the heritage</a><a className="btn ghost" href="#top">Return to the beginning</a></div></div><div className="bigSeal"><Crest /><small>Together</small></div></section>

    <footer><div className="brand"><b>KO</b><span><strong>Kap Ossen Family</strong><small>Descendants of the late Dickson Ossen Cherogony</small></span></div><p>United in Heritage. Empowered by Knowledge. Building the Future Together.</p><small>2026–2035 family development vision · Proposed land concept · Private records protected</small></footer>
  </main>;
}
