import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kap Ossen Family | 2026–2035 Development Plan",
  description: "A shared family vision for unity, education, prosperity and opportunity across generations.",
};

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
  ["SCOF REFERENCE", "1 SCOF = KSh 165", "Concept value"],
  ["MARKET STATUS", "UTILITY FIRST", "Not publicly traded"],
  ["FAMILY VISION", "2026 → 2035", "Building the future"],
  ["OPPORTUNITY RADAR", "KENYA · GERMANY · ROMANIA", "Plus remote careers"],
  ["IMPORTANT", "CONCEPT ONLY", "Not a public offering"],
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
    <header>
      <a className="brand" href="#top"><b>KO</b><span><strong>Kap Ossen</strong><small>Family Development Plan</small></span></a>
      <nav><a href="#vision">Vision</a><a href="#pillars">12 Pillars</a><a href="#roadmap">Roadmap</a><a href="#contribute">Contribute</a></nav>
      <a className="navCta" href="#gather">Begin together</a>
    </header>

    <section className="hero" id="top">
      <div className="heroGrid">
        <div>
          <p className="eyebrow">Descendants of the late Dickson Ossen Cherogony</p>
          <h1>One family. <em>Shared roots.</em> A future we build together.</h1>
          <p className="lede">A long-term family strategy for education, economic empowerment, agriculture, technology, leadership and mutual support.</p>
          <div className="actions"><a className="btn primary" href="#pillars">Explore the plan</a><a className="btn ghost" href="#vision">Our shared vision</a></div>
          <div className="tags"><span>United family</span><span>Shared heritage</span><span>Shared prosperity</span><span>Global opportunities</span></div>
        </div>
        <aside className="motto"><div className="seal"><b>KO</b><small>2026–2035</small></div><p>Our family motto</p><blockquote>“United in Heritage. Empowered by Knowledge. Building the Future Together.”</blockquote><hr /><small>Every member has something valuable to contribute.</small></aside>
      </div>
      <div className="stats"><div><b>12</b><span>Strategic pillars</span></div><div><b>2035</b><span>Shared horizon</span></div><div><b>1</b><span>Family vision</span></div><div><b>All</b><span>Generations included</span></div></div>
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

    <section className="section safeguards"><div><p className="eyebrow">Trust by design</p><h2>Ambition with responsibility.</h2></div><div className="rules"><p><b>Voluntary participation</b><span>Family initiatives invite contribution; they never coerce it.</span></p><p><b>Transparent decisions</b><span>Agreed projects need owners, records and accountability.</span></p><p><b>Lawful opportunities</b><span>Migration, markets and funding follow applicable rules.</span></p><p><b>Education before risk</b><span>Trading and digital assets are learning topics—not guaranteed income.</span></p></div></section>

    <section className="gather" id="gather"><div><p className="eyebrow">The next chapter</p><h2>A family plan becomes real when the family shapes it together.</h2><p>Begin with a family discussion. Agree what matters most, choose the first achievable actions, assign owners and review progress every year.</p><div className="actions"><a className="btn primary" href="#pillars">Review all pillars</a><a className="btn ghost" href="#top">Return to the beginning</a></div></div><div className="bigSeal"><b>KO</b><small>Together</small></div></section>

    <footer><div className="brand"><b>KO</b><span><strong>Kap Ossen Family</strong><small>Descendants of the late Dickson Ossen Cherogony</small></span></div><p>United in Heritage. Empowered by Knowledge. Building the Future Together.</p><small>2026–2035 development vision · For family discussion and refinement</small></footer>
  </main>;
}
