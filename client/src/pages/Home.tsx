/* Style reminder: Signal Workshop — Swiss editorial + industrial wayfinding; warm paper, ink, signal orange, blueprint connectors, left-anchored asymmetric layout. */
import { useEffect, useState, type MouseEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Database,
  FileText,
  GitBranch,
  Globe2,
  Hammer,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  PenTool,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  UserRound,
  WandSparkles,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import Text3DFlip from "@/components/Text3DFlip";
import LiveChatVisual from "@/components/LiveChatVisual";
import FluidImageReveal from "@/components/FluidImageReveal";
import TeamProfileCarousel from "@/components/TeamProfileCarousel";

const rotatingWords = ["GROWTH", "SALES", "LEADS", "BIG DECISIONS", "THE REST"];

const services = [
  {
    no: "01",
    title: "AI workflow design",
    icon: "workflow",
    body: "Repeatable decisions, handled automatically — no chaos, no guesswork.",
    tags: ["Discovery", "Architecture"],
  },
  {
    no: "02",
    title: "WhatsApp AI agents",
    icon: "whatsapp",
    body: "Your customers get instant replies. You get your time back.",
    tags: ["Routing", "Handoffs"],
  },
  {
    no: "03",
    title: "Instagram AI agents",
    icon: "instagram",
    body: "Every DM answered. Every lead followed up. Zero effort.",
    tags: ["Triggers", "Replies"],
  },
  {
    no: "04",
    title: "Custom automations",
    icon: "custom",
    body: "We connect the dots between your tools — so nothing falls through the cracks.",
    tags: ["APIs", "Webhooks"],
  },
];

const aiAutomationServices = [
  [
    "01",
    "AI Agents",
    "Custom-built agents that think, respond, and act like part of your team.",
  ],
  [
    "02",
    "Instagram DM Automation",
    "Every comment and DM answered — instantly, in your brand's voice.",
  ],
  [
    "03",
    "AI Customer Support",
    "Round-the-clock support that actually resolves, not just replies.",
  ],
  [
    "04",
    "Lead Generation & Qualification",
    "Filter real buyers from browsers, automatically, before they reach your team.",
  ],
  [
    "05",
    "Automated Follow-Ups",
    "No lead goes cold. Every conversation gets picked back up, on time.",
  ],
  [
    "06",
    "Appointment & Booking Automation",
    "Calendars that fill themselves — no back-and-forth required.",
  ],
  [
    "07",
    "Email Automation",
    "Sequences that nurture, convert, and follow up while you focus elsewhere.",
  ],
  [
    "08",
    "CRM & Google Sheets Automation",
    "Your data updates itself — accurate, synced, and always current.",
  ],
  [
    "09",
    "Document & Data Processing",
    "Paperwork handled, sorted, and processed without a single manual click.",
  ],
  [
    "10",
    "Custom n8n Business Workflows",
    "Bespoke automations connecting every tool your business runs on.",
  ],
  [
    "11",
    "AI-Powered Reporting",
    "Real-time insights, delivered automatically — no more manual reports.",
  ],
];

const websiteServices = [
  [
    "01",
    "Professional Website Development",
    "Fast, modern websites built on solid structure — not just good looks.",
  ],
  [
    "02",
    "E commerce Websites",
    "Commerce experiences designed to make browsing, buying, and managing simpler.",
  ],
  [
    "03",
    "Landing Page Design",
    "High-converting pages built to turn visitors into leads, not just views.",
  ],
  [
    "04",
    "Website Redesigns",
    "Outdated sites rebuilt for speed, clarity, and modern design standards.",
  ],
];

const approachItems = [
  {
    no: "01",
    title: "No generic templates",
    body: "Every system is built around how your business actually works — not a one-size-fits-all package.",
    detail:
      "We start with your real workflow, then design only the automations that remove friction from it.",
  },
  {
    no: "02",
    title: "Fast, focused builds",
    body: "No bloated timelines or unnecessary complexity. Just what you need, built right.",
    detail:
      "Small, testable releases keep decisions clear and get useful systems into your hands sooner.",
  },
  {
    no: "03",
    title: "We stay after launch",
    body: "Ongoing support and fine-tuning — not a one-time handoff you’re left to figure out alone.",
    detail:
      "We monitor the handoffs, refine the edge cases, and help your team keep the system working as it grows.",
  },
  {
    no: "04",
    title: "Your tools, your data",
    body: "Nothing locked in. Everything connects to what you already use.",
    detail:
      "You keep ownership of your accounts and data while we connect the tools your business already trusts.",
  },
];

const cases = [
  {
    no: "A / 01",
    name: "Competitor intelligence",
    result: "Weekly research, automatically filtered for meaningful change.",
    stack: "n8n · Gemini · Sheets",
    tone: "orange",
  },
  {
    no: "B / 02",
    name: "ATS resume analyzer",
    result:
      "A four-agent workflow that turns a resume into recruiter-ready insight.",
    stack: "Agents · Webhooks · Gmail",
    tone: "ink",
  },
  {
    no: "C / 03",
    name: "Operations dashboard",
    result: "A single view of the signals a busy team needs to act on.",
    stack: "React · APIs · Data",
    tone: "blue",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [activeNav, setActiveNav] = useState("#services");
  const [activeService, setActiveService] = useState(0);
  const [serviceFilter, setServiceFilter] = useState<"all" | "ai" | "web">(
    "ai"
  );
  const [selectedService, setSelectedService] = useState("");
  const [expandedApproach, setExpandedApproach] = useState<number | null>(null);
  const [activeTeam, setActiveTeam] = useState<"manager" | "developer" | null>(
    null
  );
  const [expandedTeamMobile, setExpandedTeamMobile] = useState<
    "manager" | "developer" | null
  >(null);
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRotatingWordIndex(current => (current + 1) % rotatingWords.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  const rotatingWord = rotatingWords[rotatingWordIndex];
  const chooseService = (service: string) => {
    setSelectedService(service);
    window.setTimeout(
      () =>
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      40
    );
  };
  const navigateToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
    hash: string
  ) => {
    event.preventDefault();
    setActiveNav(hash);
    setNavVisible(true);
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(
          entry =>
            entry.isIntersecting && entry.target.classList.add("is-visible")
        ),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [serviceFilter]);

  useEffect(() => {
    const sectionIds = [
      "services",
      "process",
      "work",
      "team",
      "contact",
    ] as const;
    let lastScrollY = window.scrollY;
    const syncNavigation = () => {
      const currentScrollY = window.scrollY;
      const headerOffset = 120;
      if (currentScrollY < 180) {
        setActiveNav("#home");
        setNavVisible(true);
      } else {
        const current = sectionIds.reduce<string | null>((visible, id) => {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= headerOffset)
            return `#${id}`;
          return visible;
        }, null);
        if (current) setActiveNav(current);
        if (currentScrollY > lastScrollY + 4) setNavVisible(false);
        if (currentScrollY < lastScrollY - 4) setNavVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    syncNavigation();
    window.addEventListener("scroll", syncNavigation, { passive: true });
    return () => window.removeEventListener("scroll", syncNavigation);
  }, []);

  return (
    <div className="site-shell">
      <div className="topline">
        <span>IF / AUTOMATION</span>
        <span>
          AI AUTOMATION STUDIO <i className="status-dot" /> ONLINE
        </span>
      </div>
      <header
        className={`site-header ${navVisible ? "nav-visible" : "nav-hidden"}`}
      >
        <a
          className="wordmark"
          href="#top"
          onClick={event => navigateToSection(event, "top", "#home")}
        >
          <span className="mark mark-logo">
            <img
              src="/assets/if-automation-user-logo_b94e8788.png"
              alt="IF logo"
            />
          </span>
          <span>IF AUTOMATION</span>
        </a>
        <nav
          className={`morphic-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Primary navigation"
        >
          <a
            className={activeNav === "#home" ? "is-active" : ""}
            href="#top"
            onClick={event => navigateToSection(event, "top", "#home")}
          >
            Home
          </a>
          <a
            className={activeNav === "#services" ? "is-active" : ""}
            href="#services"
            onClick={event => navigateToSection(event, "services", "#services")}
          >
            Services
          </a>
          <a
            className={activeNav === "#process" ? "is-active" : ""}
            href="#process"
            onClick={event => navigateToSection(event, "process", "#process")}
          >
            How it works
          </a>
          <a
            className={activeNav === "#work" ? "is-active" : ""}
            href="#work"
            onClick={event => navigateToSection(event, "work", "#work")}
          >
            Selected work
          </a>
          <a
            className={activeNav === "#team" ? "is-active" : ""}
            href="#team"
            onClick={event => navigateToSection(event, "team", "#team")}
          >
            Team
          </a>
          <a
            className={activeNav === "#contact" ? "is-active" : ""}
            href="#contact"
            onClick={event => navigateToSection(event, "contact", "#contact")}
          >
            Contact
          </a>
        </nav>
        <a
          className="header-cta"
          href="https://wa.me/923108449695?text=Hi%21%20I%27d%20like%20to%20learn%20more%20about%20what%20you%20offer%20and%20how%20it%20could%20help%20my%20business."
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with IF Automation on WhatsApp"
        >
          Map a workflow <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow">
                <span>01</span> SYSTEMS FOR THE WORK BEHIND THE WORK
              </p>
            </Reveal>
            <Reveal delay={70} className="hero-headline-reveal">
              <h1
                className="hero-main-heading"
                aria-label={`Let AI handle the chats. You handle the ${rotatingWord.toLowerCase()}.`}
              >
                <span className="hero-main-heading-line">LET AI HANDLE</span>
                <span className="hero-main-heading-line">THE CHATS.</span>
                <span className="hero-main-heading-line">YOU HANDLE THE</span>
                <span
                  className="hero-main-heading-line hero-rotating-line"
                  aria-live="polite"
                >
                  <span className="rotating-word-shell" key={rotatingWordIndex}>
                    <Text3DFlip
                      tag="span"
                      text={rotatingWord}
                      color="#F05A3C"
                      flipColor="#171715"
                      animation="enter"
                      staggerDuration={0.07}
                      font={{
                        fontFamily: "'Space Grotesk'",
                        fontSize: "inherit",
                        fontWeight: 600,
                        letterSpacing: "-0.075em",
                        lineHeight: 0.92,
                      }}
                    />
                  </span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={500} className="hero-lede-reveal">
              <p className="hero-lede">
                No more missed messages or manual replies. We design AI agents
                that understand your customers, respond instantly, and keep your
                pipeline moving, even when you're offline.
              </p>
              <div
                className="hero-capability-tags"
                aria-label="AI agent capabilities"
              >
                <span>24/7 SUPPORT</span>
                <span>INSTANT REPLIES</span>
                <span>SMART ROUTING</span>
              </div>
            </Reveal>
            <Reveal delay={210}>
              <div className="hero-actions">
                <a
                  className="button button-dark"
                  href="https://wa.me/923108449695?text=Hi%21%20I%27d%20like%20to%20learn%20more%20about%20what%20you%20offer%20and%20how%20it%20could%20help%20my%20business."
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with IF Automation on WhatsApp"
                >
                  Connect now <ArrowUpRight size={17} />
                </a>
                <a className="text-link" href="#work">
                  See the systems <ChevronRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
          <div className="hero-visual">
            <div className="blueprint-image hero-chat-frame">
              <LiveChatVisual />
            </div>
          </div>
        </section>

        <section className="signal-band" aria-label="IF Webworks principles">
          <div className="signal-band-track">
            <span>MAP THE HANDOFF</span>
            <span>•</span>
            <span>AUTOMATE THE REPEAT</span>
            <span>•</span>
            <span>KEEP THE HUMAN IN CONTROL</span>
            <span>•</span>
            <span aria-hidden="true">MAP THE HANDOFF</span>
            <span aria-hidden="true">•</span>
            <span aria-hidden="true">AUTOMATE THE REPEAT</span>
            <span aria-hidden="true">•</span>
            <span aria-hidden="true">KEEP THE HUMAN IN CONTROL</span>
            <span aria-hidden="true">•</span>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="section-intro">
            <Reveal>
              <p className="eyebrow">
                <span>02</span> WHAT WE BUILD
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2>
                Systems that work.
                <br />
                <em>Even when you don&apos;t.</em>
              </h2>
            </Reveal>
          </div>
          <div className="service-layout">
            <Reveal className="service-note">
              <div className="note-number">[ SERVICE INDEX ]</div>
              <p className="service-principle-quote">
                Every missed message is a missed customer. We build the systems
                that make sure that never happens.
              </p>
            </Reveal>
            <div className="service-list">
              {services.map((service, i) => (
                <Reveal key={service.no} delay={i * 70}>
                  <button
                    type="button"
                    aria-pressed={activeService === i}
                    className={`service-row ${activeService === i ? "active" : ""}`}
                    onClick={() => setActiveService(i)}
                  >
                    <span className="service-no">{service.no}</span>
                    <span className="service-title">
                      {service.icon === "whatsapp" ? (
                        <MessageCircle
                          className="service-platform-icon whatsapp-icon"
                          size={18}
                          strokeWidth={2.2}
                          aria-label="WhatsApp"
                        />
                      ) : service.icon === "instagram" ? (
                        <Instagram
                          className="service-platform-icon instagram-icon"
                          size={18}
                          strokeWidth={2.2}
                          aria-label="Instagram"
                        />
                      ) : service.icon === "workflow" ? (
                        <GitBranch
                          className="service-platform-icon workflow-icon"
                          size={18}
                          strokeWidth={2.2}
                          aria-label="Workflow design"
                        />
                      ) : service.icon === "custom" ? (
                        <Wrench
                          className="service-platform-icon custom-icon"
                          size={18}
                          strokeWidth={2.2}
                          aria-label="Custom automations"
                        />
                      ) : null}
                      <span>{service.title}</span>
                    </span>
                    <span className="service-body">
                      {service.body}
                      <span className="service-tags">
                        {service.tags.map(tag => (
                          <small key={tag}>{tag}</small>
                        ))}
                      </span>
                    </span>
                    <ArrowUpRight className="service-arrow" size={20} />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="process-heading">
            <Reveal>
              <p className="eyebrow">
                <span>03</span> HOW IT WORKS
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2>
                Four steps.
                <br />
                <em>Zero chaos.</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p>
                From the first conversation to the final handoff, we make the
                path clear and keep the work moving.
              </p>
            </Reveal>
          </div>
          <Reveal className="workflow-card">
            <div className="workflow-top">
              <span>IF / AUTOMATION STEPS</span>
            </div>
            <div
              className="workflow-four-steps is-settled"
              aria-label="Four-step process"
            >
              <a className="process-card process-card-link" href="#contact">
                <strong className="process-marker process-label">
                  WE TALK
                </strong>
                <MessageCircle
                  className="process-icon"
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p>One call. We find exactly where your time is leaking.</p>
                <small>
                  BOOK A CONVERSATION <ArrowUpRight size={13} />
                </small>
              </a>
              <span className="process-flow-arrow" aria-hidden="true">
                <ArrowDown size={17} />
              </span>
              <article className="process-card">
                <strong className="process-marker process-label">
                  WE DESIGN
                </strong>
                <PenTool
                  className="process-icon"
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p>
                  A system built around how you actually work — not a generic
                  template.
                </p>
              </article>
              <span className="process-flow-arrow" aria-hidden="true">
                <ArrowDown size={17} />
              </span>
              <article className="process-card">
                <strong className="process-marker process-label">
                  WE BUILD
                </strong>
                <Hammer
                  className="process-icon"
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p>
                  Live, tested, and connected — usually faster than you&apos;d
                  expect.
                </p>
              </article>
              <span className="process-flow-arrow" aria-hidden="true">
                <ArrowDown size={17} />
              </span>
              <article className="process-card">
                <strong className="process-marker process-label">
                  YOU GROW
                </strong>
                <TrendingUp
                  className="process-icon"
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p>We stay to tune, support, and scale it with you.</p>
              </article>
            </div>
          </Reveal>
          <p className="process-swipe-hint" aria-hidden="true">
            SWIPE TO EXPLORE <ArrowUpRight size={13} />
          </p>
        </section>

        <section
          id="work"
          className="section work-section service-catalog-section"
        >
          <div className="work-heading">
            <Reveal>
              <p className="eyebrow">
                <span>04</span> SERVICE LIST
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2>
                Work less.
                <br />
                <em>Automate more.</em>
              </h2>
            </Reveal>
          </div>
          <div
            className="service-filter-tabs"
            role="tablist"
            aria-label="Service categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={serviceFilter === "all"}
              className={serviceFilter === "all" ? "is-active" : ""}
              onClick={() => setServiceFilter("all")}
            >
              ALL SERVICES <span>15</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={serviceFilter === "ai"}
              className={serviceFilter === "ai" ? "is-active" : ""}
              onClick={() => setServiceFilter("ai")}
            >
              AI AUTOMATION <span>11</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={serviceFilter === "web"}
              className={serviceFilter === "web" ? "is-active" : ""}
              onClick={() => setServiceFilter("web")}
            >
              WEBSITE DEVELOPMENT <span>04</span>
            </button>
          </div>
          {serviceFilter !== "web" && (
            <div className="catalog-group">
              <div className="service-card-grid">
                {aiAutomationServices.map(([no, title, body], i) => (
                  <Reveal key={title} delay={i * 45}>
                    <article
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${title}`}
                      className={`case-card service-card ${["orange", "ink", "blue", "paper"][i % 4]}`}
                      onClick={() => chooseService(title)}
                      onKeyDown={event => {
                        if (event.key === "Enter" || event.key === " ")
                          chooseService(title);
                      }}
                    >
                      <div className="case-top">
                        <span>{no}</span>
                      </div>
                      <div>
                        <div className="service-card-icon">
                          <ServiceIcon title={title} />
                        </div>
                        <p className="case-stack">AI AUTOMATION</p>
                        <h3>{title}</h3>
                        <p className="case-result">{body}</p>
                      </div>
                      <div className="case-bottom">
                        <span className="case-link">
                          SELECT SERVICE <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
          {serviceFilter !== "ai" && (
            <div className="catalog-group">
              <div className="service-card-grid">
                {websiteServices.map(([no, title, body], i) => (
                  <Reveal key={title} delay={i * 70}>
                    <article
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${title}`}
                      className={`case-card service-card ${["blue", "orange", "ink", "paper"][i % 4]}`}
                      onClick={() => chooseService(title)}
                      onKeyDown={event => {
                        if (event.key === "Enter" || event.key === " ")
                          chooseService(title);
                      }}
                    >
                      <div className="case-top">
                        <span>{no}</span>
                      </div>
                      <div>
                        <div className="service-card-icon">
                          <ServiceIcon title={title} />
                        </div>
                        <p className="case-stack">WEB SERVICES</p>
                        <h3>{title}</h3>
                        <p className="case-result">{body}</p>
                      </div>
                      <div className="case-bottom">
                        <span className="case-link">
                          SELECT SERVICE <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="section proof-section">
          <Reveal>
            <div className="proof-visual">
              <FluidImageReveal
                src="/assets/if-webworks-ai-agent-network_7e291949.png"
                alt="Central AI Agent system connected to WhatsApp, Instagram, Email, CRM, and Calendar"
              />
              <span>FIELD NOTE / 004</span>
            </div>
          </Reveal>
          <Reveal delay={100} className="proof-copy">
            <p className="eyebrow">
              <span>05</span> WHY US
            </p>
            <h2>
              Built different.
              <br />
              <em>On purpose.</em>
            </h2>
            <p className="approach-quote">
              &ldquo;No templates. No handoffs. Just people who actually build
              what they promise.&rdquo;
            </p>
            <p className="approach-label">[ APPROACH ]</p>
            <ul className="approach-list">
              {approachItems.map((item, index) => (
                <li
                  key={item.no}
                  tabIndex={0}
                  aria-expanded={expandedApproach === index}
                  className={expandedApproach === index ? "is-expanded" : ""}
                  onMouseEnter={() => setExpandedApproach(index)}
                  onMouseLeave={() => setExpandedApproach(null)}
                  onFocus={() => setExpandedApproach(index)}
                  onBlur={() => setExpandedApproach(null)}
                  onClick={() =>
                    setExpandedApproach(current =>
                      current === index ? null : index
                    )
                  }
                >
                  <span className="approach-number">{item.no}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                    <p className="approach-detail">{item.detail}</p>
                  </div>
                  <span className="approach-toggle" aria-hidden="true">
                    {expandedApproach === index ? "−" : "+"}
                  </span>
                </li>
              ))}
            </ul>
            <a className="text-link" href="#contact">
              Talk through your approach <ChevronRight size={16} />
            </a>
          </Reveal>
        </section>

        <section id="team" className="section team-section">
          <div className="team-heading">
            <Reveal>
              <p className="eyebrow">
                <span>06</span> THE TEAM
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2>
                Small team.
                <br />
                <em>Serious systems.</em>
              </h2>
            </Reveal>
          </div>
          <div className="team-grid">
            <Reveal>
              <article
                className={`team-card team-card-orange ${activeTeam && activeTeam !== "manager" ? "is-secondary" : activeTeam === "manager" ? "is-active" : ""}`}
                tabIndex={0}
                onPointerEnter={() => setActiveTeam("manager")}
                onPointerLeave={() => setActiveTeam(null)}
                onFocus={() => setActiveTeam("manager")}
                onBlur={event => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                  )
                    setActiveTeam(null);
                }}
                onClick={() => setActiveTeam("manager")}
              >
                <div className="team-card-top">
                  <span className="team-card-label" aria-hidden="true"></span>
                  <a
                    className="team-top-contact"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=mfaizanirfan06%40gmail.com"
                    aria-label="Email Muhammad Faizan"
                  >
                    <Mail size={21} />
                  </a>
                </div>
                <TeamProfileCarousel role="manager" />
                <p className="team-role">MANAGER</p>
                <h3>Muhammad Faizan</h3>
                <button
                  type="button"
                  className="team-accordion-toggle"
                  aria-expanded={expandedTeamMobile === "manager"}
                  onClick={event => {
                    event.stopPropagation();
                    setExpandedTeamMobile(current =>
                      current === "manager" ? null : "manager"
                    );
                  }}
                >
                  <span>VIEW DETAILS</span>
                  <span aria-hidden="true">
                    {expandedTeamMobile === "manager" ? "−" : "+"}
                  </span>
                </button>
                <p
                  className={`team-card-description ${expandedTeamMobile === "manager" ? "is-expanded" : ""}`}
                >
                  Leads strategy and client relationships, making sure every
                  system is built around how your business actually works, not
                  just what&apos;s easy to sell.
                </p>
                <span className="team-line" />
              </article>
            </Reveal>
            <Reveal delay={90}>
              <article
                className={`team-card team-card-ink ${activeTeam && activeTeam !== "developer" ? "is-secondary" : activeTeam === "developer" ? "is-active" : ""}`}
                tabIndex={0}
                onPointerEnter={() => setActiveTeam("developer")}
                onPointerLeave={() => setActiveTeam(null)}
                onFocus={() => setActiveTeam("developer")}
                onBlur={event => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                  )
                    setActiveTeam(null);
                }}
                onClick={() => setActiveTeam("developer")}
              >
                <div className="team-card-top">
                  <span className="team-card-label" aria-hidden="true"></span>
                  <a
                    className="team-top-contact"
                    href="https://www.linkedin.com/in/insharah-irshad"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Insharah Irshad on LinkedIn"
                  >
                    <Linkedin size={21} />
                  </a>
                </div>
                <TeamProfileCarousel role="developer" />
                <p className="team-role">DEVELOPER</p>
                <h3>Insharah Irshad</h3>
                <button
                  type="button"
                  className="team-accordion-toggle"
                  aria-expanded={expandedTeamMobile === "developer"}
                  onClick={event => {
                    event.stopPropagation();
                    setExpandedTeamMobile(current =>
                      current === "developer" ? null : "developer"
                    );
                  }}
                >
                  <span>VIEW DETAILS</span>
                  <span aria-hidden="true">
                    {expandedTeamMobile === "developer" ? "−" : "+"}
                  </span>
                </button>
                <p
                  className={`team-card-description ${expandedTeamMobile === "developer" ? "is-expanded" : ""}`}
                >
                  Builds and ships every agent, automation, and website, turning
                  ideas into systems that actually run.
                </p>
                <span className="team-line" />
              </article>
            </Reveal>
          </div>
          <div className="team-mobile-list" aria-label="Team members">
            <div
              className={`team-mobile-item ${expandedTeamMobile === "manager" ? "is-expanded" : ""}`}
            >
              <button
                type="button"
                className="team-mobile-row"
                aria-expanded={expandedTeamMobile === "manager"}
                onClick={() =>
                  setExpandedTeamMobile(current =>
                    current === "manager" ? null : "manager"
                  )
                }
              >
                <span className="team-mobile-avatar">
                  <TeamProfileCarousel role="manager" />
                </span>
                <span className="team-mobile-copy">
                  <strong>Muhammad Faizan</strong>
                  <small>MANAGER</small>
                </span>
                <ChevronRight
                  className="team-mobile-arrow"
                  size={20}
                  aria-hidden="true"
                />
              </button>
              {expandedTeamMobile === "manager" && (
                <div className="team-mobile-detail">
                  <p>
                    Leads strategy and client relationships, making sure every
                    system is built around how your business actually works, not
                    just what&apos;s easy to sell.
                  </p>
                  <a
                    className="team-contact-icon"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=mfaizanirfan06%40gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Email Muhammad Faizan"
                  >
                    <Mail size={17} />
                  </a>
                </div>
              )}
            </div>
            <div
              className={`team-mobile-item ${expandedTeamMobile === "developer" ? "is-expanded" : ""}`}
            >
              <button
                type="button"
                className="team-mobile-row"
                aria-expanded={expandedTeamMobile === "developer"}
                onClick={() =>
                  setExpandedTeamMobile(current =>
                    current === "developer" ? null : "developer"
                  )
                }
              >
                <span className="team-mobile-avatar">
                  <TeamProfileCarousel role="developer" />
                </span>
                <span className="team-mobile-copy">
                  <strong>Insharah Irshad</strong>
                  <small>DEVELOPER</small>
                </span>
                <ChevronRight
                  className="team-mobile-arrow"
                  size={20}
                  aria-hidden="true"
                />
              </button>
              {expandedTeamMobile === "developer" && (
                <div className="team-mobile-detail">
                  <p>
                    Builds and ships every agent, automation, and website,
                    turning ideas into systems that actually run.
                  </p>
                  <a
                    className="team-contact-icon"
                    href="https://www.linkedin.com/in/insharah-irshad"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Insharah Irshad on LinkedIn"
                  >
                    <Linkedin size={17} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-grid">
            <Reveal>
              <p className="eyebrow">
                <span>07</span> START A CONVERSATION
              </p>
              <h2>
                What keeps
                <br />
                repeating?
              </h2>
            </Reveal>
            <Reveal delay={90} className="contact-form-wrap">
              <p className="contact-lede">
                Tell us where the friction lives. We’ll help you find the first
                useful system.
              </p>
              <div className="contact-whatsapp-cta">
                <p className="contact-service-line">
                  AI Agents · Automation · Websites — just message us,
                  we&apos;ll guide you.
                </p>
                <a
                  className="button button-dark contact-chat-button"
                  href="https://wa.me/923108449695?text=Hi%21%20I%27d%20like%20to%20learn%20more%20about%20what%20you%20offer%20and%20how%20it%20could%20help%20my%20business."
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} /> CHAT ON WHATSAPP{" "}
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </Reveal>
          </div>
          <footer className="site-footer">
            <div className="footer-main">
              <div className="footer-brand">
                <strong>IF WEBWORKS.</strong>
                <p>
                  AI automation and web design
                  <br />
                  for businesses ready to
                  <br />
                  move faster.
                </p>
              </div>
              <div className="footer-column">
                <strong>SERVICES</strong>
                <a href="#work">AI Agents</a>
                <a href="#work">WhatsApp Automation</a>
                <a href="#work">Lead Generation</a>
                <a href="#work">Website Development</a>
                <a href="#work">E-commerce Websites</a>
              </div>
              <div className="footer-column">
                <strong>COMPANY</strong>
                <a href="#services">About Us</a>
                <a href="#process">How It Works</a>
                <a href="#work">Our Work</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-column footer-contact">
                <strong>GET IN TOUCH</strong>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mfaizanirfan06%40gmail.com" target="_blank" rel="noreferrer">
                  mfaizanirfan06@gmail.com
                </a>
                <a
                  className="footer-chat-link"
                  href="https://wa.me/923108449695?text=Hi%21%20I%27d%20like%20to%20learn%20more%20about%20what%20you%20offer%20and%20how%20it%20could%20help%20my%20business."
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={15} /> CHAT ON WHATSAPP{" "}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/if.automation/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="Open IF Automation on Instagram"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/insharah-irshad"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://wa.me/923108449695"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div className="footer-legal">
              <span>© 2026 IF WEBWORKS. ALL RIGHTS RESERVED.</span>
              <div>
                <a href="#top">PRIVACY POLICY</a>
                <a href="#top">TERMS OF SERVICE</a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

function ServiceIcon({ title }: { title: string }) {
  const props = { size: 25, strokeWidth: 1.6, "aria-hidden": true as const };
  if (title === "AI Agents") return <Bot {...props} />;
  if (title.includes("Instagram")) return <Instagram {...props} />;
  if (title.includes("Customer Support")) return <Headphones {...props} />;
  if (title.includes("Lead Generation")) return <UserCheck {...props} />;
  if (title.includes("Follow-Ups")) return <RefreshCw {...props} />;
  if (title.includes("Appointment")) return <CalendarDays {...props} />;
  if (title.includes("Email")) return <Mail {...props} />;
  if (title.includes("CRM")) return <Database {...props} />;
  if (title.includes("Document")) return <FileText {...props} />;
  if (title.includes("n8n")) return <Workflow {...props} />;
  if (title.includes("Reporting")) return <BarChart3 {...props} />;
  if (title.includes("Professional")) return <Globe2 {...props} />;
  if (title.includes("E commerce")) return <ShoppingBag {...props} />;
  return <WandSparkles {...props} />;
}
