import { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Brain,
  Server,
  Database,
  Wrench,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  ImageIcon,
  ZoomIn,
  Download,
  FileText,
  Eye,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Projects", "Experience", "Skills", "Resume", "Contact"];

// ─── HOW TO ADD PROJECT IMAGES ───────────────────────────────────────────────
// Each project has an `images` array. Add image URLs (local paths or remote URLs).
// Example local:  images: ["/screenshots/pitchdekh-1.png", "/screenshots/pitchdekh-2.png"]
// Example remote: images: ["https://your-cdn.com/img.png"]
// Leave the array empty [] to show the placeholder card.
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: "Assets",
    tags: ["React", "Node.js", "Supabase", "Generative AI", "LLM"],
    category: "GenAI · Full Stack",
    desc: "AI-powered marketing asset generation platform enabling unified creation of images, audio, and campaign content through a centralized, brand-aware workflow.",
    highlights: [
      "Multi-modal AI system for image, audio, and campaign generation",
      "Centralized campaign hub for brand voice and cross-platform consistency",
      "Advanced audio synthesis with script generation and multi-speaker support",
      "Custom image generation with brand-aligned visual controls",
      "Premium UI with fully responsive UX"
    ],
    github: "https://github.com/suraj-shrivastav/Assets",
    live: "https://assets-amber-nine.vercel.app/",
    images: ["/assets/hero.png", "/assets/image.png", "/assets/campaign.png", "/assets/audio.png", "/assets/audio2.png"],
  },
  {
    name: "PitchDekh",
    tags: ["React", "Express.js", "Gemini API", "Supabase", "Firecrawl"],
    category: "GenAI · Full Stack",
    desc: "AI-Powered Pitch Intelligence Platform for analyzing startup pitch decks and investor profiles. Built AI workflows extracting structured data via Gemini APIs and automated VC profile enrichment through scalable web-scraping pipelines.",
    highlights: [
      "AI-assisted startup–investor matching logic",
      "Scalable Firecrawl scraping pipelines",
      "Semantic data extraction via Gemini API",
    ],
    github: "https://github.com/suraj-shrivastav",
    live: "https://pitch-dekh-frontend.vercel.app/",
    images: ["/pitch/hero.png", "/pitch/marketResearch.png", "/pitch/matchVC.png", "/pitch/pitchDetailed.png", "/pitch/vcProfiles.png"],
  },
  {
    name: "Bot",
    tags: ["React", "Node.js", "Groq API", "RAG", "Pinecone"],
    category: "GenAI · Chatbot",
    desc: "AI-powered chatbot using open-source LLMs via Groq's low-latency inference. Enhanced relevance through prompt tuning and RAG with Pinecone vector search. Explored tool-calling and web-search augmentation.",
    highlights: [
      "RAG with Pinecone vector DB",
      "Groq low-latency inference",
      "Tool-calling & web-search augmentation",
    ],
    github: "https://github.com/suraj-shrivastav",
    live: "",
    images: ["/bot/web.png"],
  },
  {
    name: "ChatApp",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Zustand"],
    category: "Full Stack · Real-time",
    desc: "Real-time chat application with JWT-based authentication and live messaging via Socket.io. Mobile-first responsive UI with Zustand for scalable global state management.",
    highlights: [
      "Real-time messaging with Socket.io",
      "JWT auth & session management",
      "Zustand global state architecture",
    ],
    github: "https://github.com/suraj-shrivastav",
    live: "",
    images: ["/chat.png"],
  },
  {
    name: "Rating System",
    tags: ["React", "Express.js", "Node.js", "MySQL"],
    category: "Full Stack · CRUD",
    desc: "Full-stack web application with structured backend APIs for efficient data operations, seamlessly integrated with a React frontend. Smooth, responsive UI with dynamic state management.",
    highlights: [
      "RESTful API design",
      "MySQL relational schema",
      "Dynamic React frontend",
    ],
    github: "https://github.com/suraj-shrivastav/Roxiler",
    live: "",
    images: ["/roxiler.png"],
  },
  {
    name: "SlotSwapper",
    tags: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    category: "Full Stack · Web",
    desc: "Full-stack scheduling web app that enables users to create, manage, and swap time slots with others to enable flexible scheduling within teams or groups.",
    highlights: [
      "Implemented secure user authentication with JWT and slot management CRUD operations",
      "Built real-time slot swapping workflow with request accept/reject features",
      "Responsive frontend with React, Tailwind CSS and state management (Zustand)"
    ],
    github: "https://github.com/suraj-shrivastav/SlotSwapper",
    live: "",
    images: [],
  },
  {
    name: "URL Shortner",
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
    category: "Full Stack · Web",
    desc: "Full-stack URL shortening web application that generates compact links from long URLs with redirection support and simple link management.",
    highlights: [
      "Built REST API with Node.js and Express for URL creation and redirection",
      "React frontend enabling users to shorten URLs and copy results easily",
      "Persistent storage of URL mappings using MongoDB for reliable lookup"
    ],
    github: "https://github.com/suraj-shrivastav/URL_Shortner",
    live: "https://url-shortner-delta-coral.vercel.app",
    images: [],
  },
  {
    name: "Money Tracker",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Chart.js"],
    category: "Full Stack · Web",
    desc: "Full-stack money tracker web application that enables users to log, manage, and visualize income and expenses with interactive dashboard insights.",
    highlights: [
      "Built full-stack tracking with MongoDB backend and RESTful API for expense & income management",
      "Interactive dashboard with charts to visualize financial data and trends",
      "Responsive frontend with React and seamless CRUD operations for transaction management"
    ],
    github: "https://github.com/suraj-shrivastav/money-tracker",
    live: "",
    images: ["/expense-tracker.png"],
  },
  {
    name: "Tech Conference Website",
    tags: ["SvelteKit", "JavaScript", "HTML", "CSS"],
    category: "Frontend · Web",
    desc: "Responsive static website for a fictional tech conference built as a frontend intern assignment to showcase structured UI design and modern component architecture.",
    highlights: [
      "Developed multi-page conference site with home, speakers, schedule, sponsors, and contact sections",
      "Built with SvelteKit for reactive UI and optimized performance",
      "Designed responsive layouts and interactive elements for seamless UX across devices"
    ],
    github: "https://github.com/suraj-shrivastav/conference",
    live: "https://technext-one.vercel.app/",
    images: ["/conference.png"],
  },
  {
    name: "StaySpot",
    tags: ["Node.js", "Express.js", "HTML", "CSS", "Javascript", "MongoDB"],
    category: "Full Stack · Web",
    desc: "A property listing web application that enables users to add and browse hotel/stay listings with a basic UI as an educational full-stack project.",
    highlights: [
      "Implemented hotel stay listing functionality with create/view features",
      "Built using Node.js, Express.js backend and HTML/CSS for UI",
      "Designed responsive listing interfaces with CRUD operations"
    ],
    github: "https://github.com/suraj-shrivastav/StaySpot",
    live: "",
    images: ["/listing.png"],
  }

];

const RESUME_PATH = "/Suraj_Shrivastav_Resume.pdf";

const EXPERIENCE = [  
  {
    company: "NeuralArc.ai",
    role: "GenAI Developer Intern",
    period: "Current",
    location: "Pune, India",
    points: [
      "Developing AI-powered solutions using cutting-edge generative models and LLMs",
      "Building scalable GenAI applications with prompt engineering and API integration",
      "Contributing to innovative AI workflows and product development initiatives",
    ],
  },
  {
    company: "Zymo",
    role: "Full Stack Intern",
    period: "Oct 2025 – Jan 2026",
    location: "Remote, India",
    points: [
      "Backend optimization via Firebase Cloud Functions & Firestore - reduced load times by ~15%",
      "Optimized AI-driven query workflows, improving response efficiency by 5%",
      "SEO strategies & performance optimizations - 10% increase in search impressions",
    ],
  },
  {
    company: "Praman Proserves Pvt. Ltd.",
    role: "Frontend Intern",
    period: "Mar 2025 – Apr 2025",
    location: "Pune, India",
    points: [
      "Rebuilt company website using React & Tailwind CSS, improving UI consistency",
      "Implemented responsive design principles for seamless cross-device experience",
      "Strengthened expertise in component-based architecture",
    ],
  },
];

const SKILLS = [
  {
    icon: Code2,
    label: "Frontend",
    items: ["React.js", "Tailwind CSS", "Redux", "Zustand"],
  },
  {
    icon: Server,
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    icon: Brain,
    label: "GenAI",
    items: ["LLMs", "Prompt Engineering", "Gemini API", "Groq API", "Firecrawl", "RAG"],
  },
  {
    icon: Database,
    label: "Databases",
    items: ["MongoDB", "MySQL", "Supabase", "Pinecone"],
  },
  {
    icon: Wrench,
    label: "Tools",
    items: ["Git", "GitHub", "Docker", "Firebase", "CI/CD"],
  },
];

// ─── ProjectCarousel Component ───────────────────────────────────────────────

function ProjectCarousel({ images, projectName, onOpenLightbox }) {
  const [current, setCurrent] = useState(0);
  const hasImages = images && images.length > 0;

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  if (!hasImages) {
    return (
      <div
        style={{
          height: 200,
          borderRadius: "12px 12px 0 0",
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          borderBottom: "1px solid #e5e7eb",
          color: "#93c5fd",
        }}
      >
        <ImageIcon size={32} strokeWidth={1.2} />
      </div>
    );
  }

  return (
    <div
      style={{ position: "relative", borderRadius: "12px 12px 0 0", overflow: "hidden", height: 220, cursor: "zoom-in" }}
      onClick={() => onOpenLightbox(current)}
    >
      {/* Images */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${projectName} screenshot ${i + 1}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />
      ))}

      {/* Zoom hint */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "rgba(0,0,0,0.45)",
          borderRadius: 8,
          padding: "5px 8px",
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: "#fff",
          fontSize: 11,
          backdropFilter: "blur(4px)",
          pointerEvents: "none",
        }}
      >
        <ZoomIn size={11} /> View
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(0,0,0,0.45)",
            borderRadius: 99,
            padding: "3px 10px",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            backdropFilter: "blur(4px)",
            pointerEvents: "none",
          }}
        >
          {current + 1} / {images.length}
        </div>
      )}

      {/* Prev/Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            style={{
              position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%",
              width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              transition: "background 0.15s",
            }}
          >
            <ChevronLeft size={16} color="#374151" />
          </button>
          <button
            onClick={next}
            style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%",
              width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              transition: "background 0.15s",
            }}
          >
            <ChevronRight size={16} color="#374151" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 5,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              style={{
                width: i === current ? 18 : 6,
                height: 6,
                borderRadius: 99,
                background: i === current ? "#fff" : "rgba(255,255,255,0.5)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Lightbox Component ───────────────────────────────────────────────────────

function Lightbox({ images, startIndex, projectName, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,10,20,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)",
        animation: "fadeInLightbox 0.2s ease",
      }}
    >
      <style>{`@keyframes fadeInLightbox { from { opacity: 0 } to { opacity: 1 } }`}</style>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 20,
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%", width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#fff",
          transition: "background 0.15s",
        }}
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
        {projectName} · {current + 1} of {images.length}
      </div>

      {/* Main image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "min(90vw, 1100px)", maxHeight: "80vh", position: "relative" }}
      >
        <img
          src={images[current]}
          alt={`${projectName} ${current + 1}`}
          style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 12, display: "block", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
        />
      </div>

      {/* Prev/Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
            style={{
              position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", width: 48, height: 48,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", transition: "background 0.15s",
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
            style={{
              position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", width: 48, height: 48,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", transition: "background 0.15s",
            }}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 8,
          }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: 48, height: 32,
                borderRadius: 6,
                overflow: "hidden",
                border: i === current ? "2px solid #fff" : "2px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                padding: 0,
                transition: "border 0.2s",
                flexShrink: 0,
              }}
            >
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { images, startIndex, name }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["hero", ...NAV_LINKS.map((n) => n.toLowerCase())];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#F7F5F0",
        color: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Playfair+Display:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F7F5F0; }
        ::-webkit-scrollbar-thumb { background: #b0bec5; border-radius: 99px; }

        .nav-link {
          position: relative;
          color: #4a5568;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s;
          background: none; border: none; padding: 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: #2563eb;
          transition: width 0.25s ease;
        }
        .nav-link:hover, .nav-link.active { color: #2563eb; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .tag {
          display: inline-flex; align-items: center;
          background: #e8f0fe; color: #1d4ed8;
          font-size: 11.5px; font-weight: 500; letter-spacing: 0.02em;
          padding: 3px 10px; border-radius: 99px;
        }

        .project-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 28px 28px 24px;
          transition: box-shadow 0.25s, transform 0.25s;
          cursor: default;
        }
        .project-card:hover {
          box-shadow: 0 8px 32px rgba(37,99,235,0.10);
          transform: translateY(-3px);
        }

        .skill-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 22px 24px;
          transition: box-shadow 0.2s;
        }
        .skill-card:hover { box-shadow: 0 4px 20px rgba(37,99,235,0.08); }

        .exp-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 28px 32px;
          position: relative;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1d4ed8; color: #fff;
          font-size: 14px; font-weight: 500; letter-spacing: 0.03em;
          padding: 11px 22px; border-radius: 99px; border: none;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .btn-primary:hover { background: #1e40af; transform: translateY(-1px); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #1d4ed8;
          font-size: 14px; font-weight: 500; letter-spacing: 0.03em;
          padding: 10px 22px; border-radius: 99px;
          border: 1.5px solid #bfdbfe;
          cursor: pointer; transition: all 0.2s;
          text-decoration: none;
        }
        .btn-outline:hover { background: #eff6ff; border-color: #1d4ed8; }

        .social-icon {
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px; border-radius: 50%;
          border: 1.5px solid #e5e7eb;
          color: #64748b; background: #fff;
          transition: all 0.2s; text-decoration: none;
        }
        .social-icon:hover { border-color: #1d4ed8; color: #1d4ed8; background: #eff6ff; }

        section { scroll-margin-top: 80px; }

        .section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #2563eb;
          margin-bottom: 8px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 500; color: #111827; line-height: 1.15;
        }

        .divider {
          width: 48px; height: 2px; background: #bfdbfe; border-radius: 2px;
          margin-top: 12px;
        }

        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(247,245,240,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => scrollTo("hero")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, color: "#111827" }}>
              Suraj<span style={{ color: "#2563eb" }}>.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className={`nav-link ${activeSection === link.toLowerCase() ? "active" : ""}`}
                onClick={() => scrollTo(link.toLowerCase())}
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#374151" }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#F7F5F0", borderTop: "1px solid #e5e7eb", padding: "20px 24px 24px" }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className="nav-link"
                onClick={() => scrollTo(link.toLowerCase())}
                style={{ display: "block", marginBottom: 18, fontSize: 16 }}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "100px 24px 60px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ width: "100%" }}>
          {/* Greeting */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1.5, background: "#2563eb" }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#2563eb", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Available for opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 500,
              lineHeight: 1.05,
              color: "#111827",
              marginBottom: 20,
            }}
          >
            Suraj
            <br />
            <span style={{ color: "#2563eb" }}>Shrivastav</span>
          </h1>

          {/* Role badge */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
            {["MERN Stack Developer", "GenAI Integrations", "LLM Applications"].map((r) => (
              <span key={r} style={{ background: "#fff", border: "1.5px solid #dbeafe", color: "#1e40af", fontSize: 13, fontWeight: 500, padding: "5px 14px", borderRadius: 99 }}>
                {r}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p
            style={{
              maxWidth: 580,
              fontSize: 17,
              lineHeight: 1.75,
              color: "#4b5563",
              marginBottom: 40,
              fontWeight: 300,
            }}
          >
            Building modern web applications with the MERN stack, and actively integrating
            Generative AI & Large Language Models into production-ready products. Final year
            CE student with CGPA 9.30.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>
              View Projects <ArrowUpRight size={15} />
            </button>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>
              Get in Touch
            </button>
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://github.com/suraj-shrivastav" target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/suraj-shrivastav" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://leetcode.com/u/suraj-shrivastav/" target="_blank" rel="noreferrer" className="social-icon" title="LeetCode">
              <Code2 size={18} />
            </a>
            <a href="mailto:surajshrivastav07@gmail.com" className="social-icon" title="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Scroll</div>
          <ChevronDown size={16} color="#9ca3af" style={{ display: "block", margin: "0 auto" }} />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">About Me</div>
          <h2 className="section-title">Who I Am</h2>
          <div className="divider" style={{ marginBottom: 48 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="hero-grid">
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#4b5563", marginBottom: 20, fontWeight: 300 }}>
                I'm a final-year Computer Engineering student at Dhole Patil College of Engineering,
                Pune (CGPA 9.30 / 10), passionate about crafting performant, well-architected web applications.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#4b5563", marginBottom: 20, fontWeight: 300 }}>
                My core expertise lies in the <strong style={{ fontWeight: 600, color: "#111827" }}>MERN stack</strong> - building
                everything from real-time applications to complex full-stack products. Alongside traditional
                web development, I'm deeply engaged with <strong style={{ fontWeight: 600, color: "#111827" }}>Generative AI</strong> -
                integrating LLMs, building RAG pipelines, and crafting intelligent agents that solve real-world problems.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#4b5563", fontWeight: 300 }}>
                I've had hands-on experience as a Full Stack Intern at Zymo and a Frontend Intern at Praman Proserves,
                where I shipped features used in production environments.
              </p>
            </div>

            <div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
                {[
                  { num: "9.30", label: "CGPA" },
                  { num: "n", label: "Projects Built" },
                  { num: "3", label: "Internships" },
                  { num: "2026", label: "Graduating" },
                ].map(({ num, label }) => (
                  <div key={label} style={{ background: "#F7F5F0", border: "1px solid #e5e7eb", borderRadius: 12, padding: "18px 20px" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 500, color: "#1d4ed8", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: 8 }}>Education</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>Dhole Patil College of Engineering</div>
                <div style={{ fontSize: 13, color: "#4b5563", marginTop: 2 }}>B.E. Computer Engineering · 2022–2026</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 12, color: "#6b7280" }}>
                  <MapPin size={11} /> Pune, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ padding: "100px 24px", background: "#F7F5F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">Work</div>
          <h2 className="section-title">Projects</h2>
          <div className="divider" style={{ marginBottom: 12 }} />
          <p style={{ fontSize: 13.5, color: "#9ca3af", marginBottom: 48, fontWeight: 300 }}>
            Click any screenshot to open fullscreen · Use arrow keys to navigate
          </p>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}
            className="projects-grid"
          >
            {PROJECTS.map((p) => (
              <div key={p.name} className="project-card" style={{ padding: 0, overflow: "hidden" }}>

                {/* ── Image Carousel ── */}
                <ProjectCarousel
                  images={p.images}
                  projectName={p.name}
                  onOpenLightbox={(idx) =>
                    p.images.length > 0 &&
                    setLightbox({ images: p.images, startIndex: idx, name: p.name })
                  }
                />

                {/* ── Card Body ── */}
                <div style={{ padding: "22px 24px 24px" }}>
                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", marginBottom: 3 }}>
                        {p.category}
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 500, color: "#111827" }}>
                        {p.name}
                      </h3>
                    </div>

                    {/* Links */}
                    <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub"
                          style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: "#F7F5F0", border: "1px solid #e5e7eb",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#4b5563", transition: "all 0.15s", textDecoration: "none",
                          }}
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          title="Live Demo"
                          style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: "#eff6ff", border: "1px solid #bfdbfe",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#2563eb", transition: "all 0.15s", textDecoration: "none",
                          }}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#6b7280", marginBottom: 14, fontWeight: 300 }}>
                    {p.desc}
                  </p>

                  {/* Highlights */}
                  <ul style={{ marginBottom: 16, paddingLeft: 0, listStyle: "none" }}>
                    {p.highlights.map((h) => (
                      <li key={h} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5, fontSize: 12.5, color: "#374151" }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563eb", marginTop: 5.5, flexShrink: 0 }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">Career</div>
          <h2 className="section-title">Experience</h2>
          <div className="divider" style={{ marginBottom: 48 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {EXPERIENCE.map((e) => (
              <div key={e.company} className="exp-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: "#111827" }}>
                      {e.company}
                    </h3>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#2563eb", marginTop: 2 }}>{e.role}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{e.period}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 2, fontSize: 12, color: "#9ca3af" }}>
                      <MapPin size={11} /> {e.location}
                    </div>
                  </div>
                </div>
                <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                  {e.points.map((pt) => (
                    <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: 14, color: "#4b5563", lineHeight: 1.65 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#bfdbfe", border: "1.5px solid #2563eb", marginTop: 6, flexShrink: 0 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" style={{ padding: "100px 24px", background: "#F7F5F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">Technical</div>
          <h2 className="section-title">Skills</h2>
          <div className="divider" style={{ marginBottom: 48 }} />

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
            className="skills-grid"
          >
            {SKILLS.map(({ icon: Icon, label, items }) => (
              <div key={label} className="skill-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={16} color="#2563eb" />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {items.map((item) => (
                    <span key={item} style={{ background: "#F7F5F0", border: "1px solid #e5e7eb", color: "#374151", fontSize: 12.5, fontWeight: 400, padding: "4px 11px", borderRadius: 99 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Languages separately */}
            <div className="skill-card">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Code2 size={16} color="#2563eb" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em" }}>Languages</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {["JavaScript", "Python", "Java"].map((item) => (
                  <span key={item} style={{ background: "#F7F5F0", border: "1px solid #e5e7eb", color: "#374151", fontSize: 12.5, fontWeight: 400, padding: "4px 11px", borderRadius: 99 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section
        id="resume"
        style={{ padding: "100px 24px", background: "#fff" }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label">Document</div>
          <h2 className="section-title">Resume</h2>
          <div className="divider" style={{ margin: "0 auto 48px" }} />

          {/* Resume Card */}
          <div
            style={{
              background: "#F7F5F0",
              border: "1.5px solid #e5e7eb",
              borderRadius: 16,
              padding: "28px 24px",
              marginBottom: 24,
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FileText size={22} color="#1d4ed8" />
              </div>

              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
                  Suraj_Shrivastav_Resume.pdf
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  Last updated · 2025
                </div>
              </div>
            </div>

            {[
              ["Education", "B.E. Computer Engineering"],
              ["CGPA", "9.30 / 10"],
              ["Experience", "3 Internships"],
              ["Stack", "MERN + GenAI"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
                  {label}
                </span>
                <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href={RESUME_PATH}
              download
              className="btn-primary"
              style={{ justifyContent: "center" }}
            >
              <Download size={15} /> Download PDF
            </a>

            <a
              href="https://drive.google.com/file/d/1YgzIophVDS1QpJ0UuJpy_hFwPoEroNpG/view"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              style={{ justifyContent: "center" }}
            >
              <Eye size={15} /> Open in Browser
            </a>
          </div>
        </div>
      </section>


      {/* ── Contact ── */}
      <section id="contact" style={{ padding: "100px 24px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ textAlign: "center" }}>Let's Talk</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Get In Touch</h2>
          <div className="divider" style={{ margin: "0 auto 32px" }} />

          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#6b7280", marginBottom: 44, fontWeight: 300 }}>
            Whether it's a new opportunity, a collaboration, or just a conversation - my inbox is open.
            I'm currently seeking full-time and internship roles in full-stack and AI-integrated development.
          </p>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
            <a href="mailto:surajshrivastav07@gmail.com" className="btn-primary">
              <Mail size={15} /> surajshrivastav07@gmail.com
            </a>
          </div>

          {/* Contact cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 48 }}>
            {[
              { icon: MapPin, label: "Location", value: "Pune, India" },
              { icon: Mail, label: "Email", value: "surajshrivastav07@gmail.com" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ background: "#F7F5F0", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
                <Icon size={16} color="#2563eb" style={{ margin: "0 auto 6px" }} />
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9ca3af", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 12, color: "#374151", fontWeight: 400, wordBreak: "break-all" }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <a href="https://github.com/suraj-shrivastav" target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/suraj-shrivastav" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://leetcode.com/u/suraj-shrivastav/" target="_blank" rel="noreferrer" className="social-icon" title="LeetCode">
              <Code2 size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#111827", color: "#9ca3af", textAlign: "center", padding: "24px", fontSize: 13 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 400 }}>Suraj Shrivastav</span>
      </footer>

      {/* responsive helper */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          projectName={lightbox.name}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}