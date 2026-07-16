import { createFileRoute } from "@tanstack/react-router";
import profileAsset from "@/assets/profile.jpeg.asset.json";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Code2,
  Server,
  Database,
  Wrench,
  Sparkles,
  Rocket,
  Brain,
  GraduationCap,
  Award,
  ExternalLink,
  MapPin,
  Send,
  Sun,
  Moon,
  Layers,
  Cpu,
  Palette,
  Zap,
  Trophy,
  BookOpen,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhamini B — Full Stack Developer & Software Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Dhamini B — Final Year CSE student and Full Stack Developer building modern, responsive web experiences.",
      },
      { property: "og:title", content: "Dhamini B — Full Stack Developer & Software Engineer" },
      {
        property: "og:description",
        content:
          "Portfolio of Dhamini B — Final Year CSE student and Full Stack Developer building modern, responsive web experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------------- Helpers ---------------- */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function useTyping(words: string[], speed = 70, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = w.slice(0, text.length + 1);
          setText(next);
          if (next === w) setTimeout(() => setDel(true), pause);
        } else {
          const next = w.slice(0, Math.max(0, text.length - 1));
          setText(next);
          if (next === "") {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

/* ---------------- Background ---------------- */

function AuroraBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 20 + Math.random() * 25,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora blobs */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[oklch(0.55_0.22_295/0.35)] blur-3xl animate-aurora" />
      <div
        className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full bg-[oklch(0.6_0.2_220/0.3)] blur-3xl animate-aurora"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[700px] w-[700px] rounded-full bg-[oklch(0.55_0.2_260/0.3)] blur-3xl animate-aurora"
        style={{ animationDelay: "-8s" }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-10px] rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: "0 0 8px oklch(0.82 0.14 200 / 0.8)",
          }}
        />
      ))}
    </div>
  );
}

function MouseGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[5] transition-opacity duration-300"
      style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, oklch(0.72 0.19 295 / 0.12), transparent 60%)`,
      }}
    />
  );
}

/* ---------------- Nav ---------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Nav({
  theme,
  toggle,
}: {
  theme: "dark" | "light";
  toggle: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`glass flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <a
            href="#home"
            className="flex items-center gap-2 font-display text-lg font-bold"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.72_0.19_295)] to-[oklch(0.82_0.14_200)] text-primary-foreground">
              DB
            </span>
            <span className="text-gradient hidden sm:inline">Dhamini B</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border transition hover:bg-white/5"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <a
              href="#contact"
              className="hidden rounded-lg bg-gradient-to-r from-[oklch(0.72_0.19_295)] to-[oklch(0.68_0.19_260)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.72_0.19_295/0.35)] transition hover:shadow-[oklch(0.72_0.19_295/0.55)] md:inline-flex"
            >
              Let's talk
            </a>
            <button
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-border"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <Layers className="h-4 w-4" />
            </button>
          </div>
        </div>
        {open && (
          <div className="glass mt-2 grid gap-1 rounded-2xl p-2 md:hidden animate-fade-in">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

const TECH_ICONS = [
  { label: "React", color: "oklch(0.82 0.14 200)" },
  { label: "TS", color: "oklch(0.68 0.19 260)" },
  { label: "Node", color: "oklch(0.75 0.17 145)" },
  { label: "Py", color: "oklch(0.78 0.15 90)" },
  { label: "JS", color: "oklch(0.85 0.16 95)" },
  { label: "Java", color: "oklch(0.7 0.18 30)" },
  { label: "SQL", color: "oklch(0.72 0.15 220)" },
  { label: "Git", color: "oklch(0.7 0.2 30)" },
];

function Hero() {
  const typed = useTyping(
    [
      "Full Stack Developer",
      "Software Engineer",
      "UI/UX Enthusiast",
      "Problem Solver",
    ],
    75,
    1200,
  );
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-4 pt-32 pb-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="animate-fade-up">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px] shadow-green-400" />
            Available for Internships & Full-time Roles
          </div>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Hi, I'm{" "}
            <span className="text-gradient">Dhamini B</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
            <span className="text-foreground">{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-[oklch(0.82_0.14_200)] animate-blink" />
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            I'm a Final Year Computer Science Engineering student with a strong
            passion for Full Stack Development. I enjoy designing and developing
            modern, responsive, and user-friendly web applications while
            continuously learning new technologies to build impactful digital
            experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.72_0.19_295)] to-[oklch(0.68_0.19_260)] px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.72_0.19_295/0.35)] transition hover:-translate-y-0.5 hover:shadow-[oklch(0.72_0.19_295/0.55)]"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#projects"
              className="glass hover-glow inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="glass hover-glow inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              Contact Me
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            {[
              { href: "https://github.com/dhamini-b", Icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/dhaminib", Icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:dhaminib99@gmail.com", Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                className="glass grid h-11 w-11 place-items-center rounded-xl transition hover:-translate-y-0.5 hover:text-[oklch(0.82_0.14_200)]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: avatar orbit */}
        <div className="relative mx-auto flex h-[420px] w-[420px] max-w-full items-center justify-center">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[oklch(0.72_0.19_295/0.5)] via-[oklch(0.68_0.19_260/0.4)] to-[oklch(0.82_0.14_200/0.5)] blur-3xl animate-float"
          />
          {/* Rotating rings */}
          <div className="absolute inset-4 rounded-full border border-white/10 animate-spin-slow" />
          <div
            className="absolute inset-10 rounded-full border border-dashed border-white/10 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "40s" }}
          />
          {/* Orbiting tech icons */}
          {TECH_ICONS.map((t, i) => {
            const angle = (i / TECH_ICONS.length) * 360;
            return (
              <div
                key={t.label}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateX(200px)`,
                }}
              >
                <div
                  className="glass grid h-11 w-11 place-items-center rounded-xl text-xs font-semibold"
                  style={{
                    transform: `rotate(-${angle}deg)`,
                    color: t.color,
                    boxShadow: `0 0 20px ${t.color}`,
                  }}
                >
                  {t.label}
                </div>
              </div>
            );
          })}
          {/* Avatar */}
          <div className="glass-strong relative grid h-56 w-56 place-items-center rounded-full glow animate-float">
            <div className="h-52 w-52 overflow-hidden rounded-full bg-gradient-to-br from-[oklch(0.55_0.22_295)] via-[oklch(0.55_0.2_260)] to-[oklch(0.7_0.15_200)] p-[3px]">
              <img
                src={profileAsset.url}
                alt="Dhamini B"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#profile"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-float"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}

/* ---------------- Featured Profile ---------------- */

function ProfileSection() {
  return (
    <section id="profile" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow="Featured Profile"
            title="The person behind the code"
          />
        </Reveal>
        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto flex h-[420px] w-[420px] max-w-full items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[oklch(0.72_0.19_295/0.6)] via-[oklch(0.68_0.19_260/0.4)] to-[oklch(0.82_0.14_200/0.6)] blur-2xl animate-float-slower" />
              <div className="glass-strong grid h-[380px] w-[380px] place-items-center rounded-full p-2 glow">
                <div
                  className="grid h-full w-full place-items-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 90deg, oklch(0.72 0.19 295), oklch(0.68 0.19 260), oklch(0.82 0.14 200), oklch(0.72 0.19 295))",
                    padding: "3px",
                  }}
                >
                  <div className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-[oklch(0.2_0.04_275)] to-[oklch(0.14_0.03_275)]">
                    <div className="h-[92%] w-[92%] overflow-hidden rounded-full">
                      <img
                        src={profileAsset.url}
                        alt="Dhamini B"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="glass rounded-3xl p-8">
              <Sparkles className="h-8 w-8 text-[oklch(0.82_0.14_200)]" />
              <blockquote className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
                "Passionate about building{" "}
                <span className="text-gradient">modern, scalable, and user-friendly</span>{" "}
                web applications through Full Stack Development."
              </blockquote>
              <p className="mt-6 text-muted-foreground">
                I focus on clean architecture, beautiful interfaces, and
                shipping products that feel effortless to use. Currently
                exploring advanced React patterns, distributed systems, and AI.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Recruiter-friendly", "Fast learner", "Team player", "Detail-obsessed"].map(
                  (t) => (
                    <span
                      key={t}
                      className="glass rounded-full px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section head ---------------- */

function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
        <Sparkles className="h-3 w-3 text-[oklch(0.82_0.14_200)]" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

/* ---------------- About ---------------- */

const ABOUT_CARDS = [
  { icon: GraduationCap, title: "Final Year CSE Student", text: "Building a strong CS foundation with a focus on real-world apps." },
  { icon: Rocket, title: "Full Stack Developer", text: "Comfortable across the stack — from pixels to APIs to databases." },
  { icon: Palette, title: "UI/UX Enthusiast", text: "Design isn't decoration — it's how the product feels." },
  { icon: Brain, title: "Fast Learner", text: "Curious by default, methodical about new tech and best practices." },
  { icon: Cpu, title: "Software Engineering & AI", text: "Exploring modern architectures and applied intelligence." },
  { icon: Zap, title: "Problem Solver", text: "I love breaking hard problems into small, elegant pieces." },
];

const STATS = [
  { label: "Projects Completed", value: 12, suffix: "+" },
  { label: "Technologies Learned", value: 18, suffix: "+" },
  { label: "Coding Hours", value: 1500, suffix: "+" },
  { label: "Certifications", value: 6, suffix: "" },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function About() {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow="About Me"
            title="A little about my journey"
            subtitle="Curious student, growing engineer — obsessed with building things that ship and delight."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="glass hover-glow group h-full rounded-2xl p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.55_0.22_295)] to-[oklch(0.55_0.2_220)] text-white shadow-lg shadow-[oklch(0.72_0.19_295/0.3)]">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass-strong mt-10 grid gap-6 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */

const SKILL_GROUPS: {
  title: string;
  icon: typeof Code2;
  items: { name: string; level: number }[];
}[] = [
  {
    title: "Languages",
    icon: Code2,
    items: [
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "JavaScript", level: 88 },
    ],
  },
  {
    title: "Frontend",
    icon: Palette,
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "React", level: 88 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    items: [
      { name: "MySQL", level: 82 },
      { name: "MongoDB", level: 78 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 95 },
    ],
  },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[oklch(0.72_0.19_295)] via-[oklch(0.68_0.19_260)] to-[oklch(0.82_0.14_200)] transition-[width] duration-[1400ms] ease-out"
          style={{
            width: inView ? `${level}%` : "0%",
            boxShadow: "0 0 12px oklch(0.72 0.19 295 / 0.6)",
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow="Skills"
            title="My technical toolkit"
            subtitle="A snapshot of what I use to design, build, and ship."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 70}>
              <div className="glass hover-glow h-full rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.55_0.22_295)] to-[oklch(0.5_0.2_260)] text-white">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                </div>
                <div className="mt-5 space-y-4">
                  {g.items.map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */

const PROJECTS = [
  {
    title: "Smart Tourist Guide",
    desc: "A location-aware tourist guide system that provides personalized travel recommendations based on user preferences and context.",
    tech: ["HTML", "CSS", "JavaScript"],
    gradient: "from-[oklch(0.55_0.22_295)] to-[oklch(0.6_0.2_220)]",
    icon: MapPin,
  },
  {
    title: "Personal Portfolio",
    desc: "A premium responsive portfolio showcasing projects, skills, achievements, and contact — glassmorphism UI with aurora backdrops.",
    tech: ["React", "Tailwind CSS"],
    gradient: "from-[oklch(0.6_0.2_260)] to-[oklch(0.82_0.14_200)]",
    icon: Layers,
  },
  {
    title: "Landing Page",
    desc: "A modern marketing landing page with accessibility, responsiveness, and smooth animations built from scratch.",
    tech: ["HTML", "CSS", "JavaScript"],
    gradient: "from-[oklch(0.7_0.18_30)] to-[oklch(0.75_0.17_60)]",
    icon: Rocket,
  },
];

function Projects() {
  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow="Featured Projects"
            title="Things I've built"
            subtitle="A selection of projects that reflect how I think about products."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="glass hover-glow group flex h-full flex-col overflow-hidden rounded-2xl">
                <div
                  className={`relative aspect-[16/10] w-full bg-gradient-to-br ${p.gradient}`}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="glass-strong grid h-16 w-16 place-items-center rounded-2xl">
                      <p.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                    <a
                      href="https://github.com/dhamini-b"
                      target="_blank"
                      rel="noreferrer"
                      className="glass-strong grid h-9 w-9 place-items-center rounded-lg"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="glass-strong grid h-9 w-9 place-items-center rounded-lg"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience / Timeline ---------------- */

const TIMELINE = [
  {
    time: "2026 · Present",
    title: "Final Year — BE Computer Science Engineering",
    org: "University",
    desc: "Deep-diving into full stack projects, DSA, and software engineering fundamentals.",
    icon: GraduationCap,
  },
  {
    time: "2025",
    title: "Full Stack Development Focus",
    org: "Self-driven",
    desc: "Built responsive React apps, integrated REST APIs, and shipped end-to-end features.",
    icon: Rocket,
  },
  {
    time: "2024",
    title: "Frontend & UI/UX Exploration",
    org: "Personal Projects",
    desc: "Studied design systems, accessibility, and modern CSS — Tailwind, motion, glassmorphism.",
    icon: Palette,
  },
  {
    time: "2023",
    title: "Programming Foundations",
    org: "College",
    desc: "Strengthened Java, Python, and JavaScript through coursework and mini projects.",
    icon: Code2,
  },
];

function Experience() {
  return (
    <section id="experience" className="relative px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHead
            eyebrow="Experience"
            title="A short timeline"
          />
        </Reveal>
        <div className="relative mt-14">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:left-1/2" />
          <div className="space-y-8">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.title} delay={i * 60}>
                <div
                  className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="glass hover-glow ml-12 flex-1 rounded-2xl p-5 md:ml-0">
                    <div className="text-xs uppercase tracking-widest text-[oklch(0.82_0.14_200)]">
                      {t.time}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold">{t.title}</h3>
                    <div className="text-sm text-muted-foreground">{t.org}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                  <div className="absolute left-0 top-4 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.72_0.19_295)] to-[oklch(0.68_0.19_260)] text-white shadow-lg shadow-[oklch(0.72_0.19_295/0.5)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <t.icon className="h-4 w-4" />
                  </div>
                  <div className="hidden flex-1 md:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Education & Achievements ---------------- */

const ACHIEVEMENTS = [
  { icon: Trophy, title: "Built multiple responsive web apps", text: "From concept to deployment." },
  { icon: Rocket, title: "Learning Full Stack Development", text: "Modern React, Node, and databases." },
  { icon: Brain, title: "Strong problem-solving skills", text: "DSA & algorithmic thinking." },
  { icon: BookOpen, title: "Continuous learner", text: "Always exploring what's next." },
];

const CERTS = [
  "Full Stack Web Development",
  "Data Structures & Algorithms",
  "React Fundamentals",
  "MongoDB Basics",
  "Git & GitHub",
  "UI/UX Design Principles",
];

function Education() {
  return (
    <section id="education" className="relative px-4 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <Reveal>
            <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              <GraduationCap className="h-3 w-3 text-[oklch(0.82_0.14_200)]" /> Education
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold text-gradient">
              Education
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="glass-strong mt-8 rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-[oklch(0.82_0.14_200)]">
                Final Year
              </div>
              <h3 className="mt-1 font-display text-xl font-semibold">
                Bachelor of Engineering
              </h3>
              <p className="text-muted-foreground">Computer Science Engineering</p>
              <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                <div>• Core CS: DSA, OS, DBMS, Networks</div>
                <div>• Web Development & Software Engineering</div>
                <div>• Machine Learning & AI fundamentals</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h3 className="mt-10 font-display text-xl font-semibold">Certifications</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="glass rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Award className="mr-1 inline h-3 w-3 text-[oklch(0.82_0.14_200)]" />
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              <Trophy className="h-3 w-3 text-[oklch(0.82_0.14_200)]" /> Achievements
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold text-gradient">
              Wins along the way
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className="glass hover-glow rounded-2xl p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.55_0.22_295)] to-[oklch(0.5_0.2_260)] text-white">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-3 font-semibold">{a.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* GitHub stats placeholder */}
          <Reveal delay={200}>
            <div className="glass-strong mt-6 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5" />
                <h4 className="font-display text-lg font-semibold">GitHub Activity</h4>
              </div>
              <div className="mt-4 grid grid-cols-[repeat(26,1fr)] gap-1">
                {Array.from({ length: 26 * 7 }).map((_, i) => {
                  const lvl = Math.floor(Math.random() * 5);
                  const colors = [
                    "oklch(1 0 0 / 0.05)",
                    "oklch(0.55 0.22 295 / 0.25)",
                    "oklch(0.6 0.2 260 / 0.45)",
                    "oklch(0.7 0.19 260 / 0.7)",
                    "oklch(0.82 0.14 200 / 0.9)",
                  ];
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-[3px]"
                      style={{ background: colors[lvl] }}
                    />
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                A snapshot of my contribution rhythm.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */

const SERVICES = [
  { icon: Layers, title: "Full Stack Web Apps", text: "End-to-end apps with modern stacks." },
  { icon: Palette, title: "UI/UX Design", text: "Clean, accessible, delightful interfaces." },
  { icon: Server, title: "APIs & Backend", text: "REST APIs, auth, and integrations." },
  { icon: Zap, title: "Performance & SEO", text: "Fast, indexable, production-ready sites." },
];

function Services() {
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead eyebrow="Services" title="What I can help with" />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="glass hover-glow h-full rounded-2xl p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.55_0.22_295)] to-[oklch(0.5_0.2_220)] text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

const TESTIMONIALS = [
  {
    quote:
      "Dhamini is exceptionally focused — she pairs strong fundamentals with a real eye for design.",
    name: "Faculty Mentor",
    role: "CSE Department",
  },
  {
    quote: "Reliable, curious, and quick to learn. She ships polished work.",
    name: "Project Teammate",
    role: "Group Project",
  },
  {
    quote: "The kind of engineer who cares about both the code and the user.",
    name: "Peer Reviewer",
    role: "Hackathon",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHead eyebrow="Testimonials" title="Kind words" />
        </Reveal>
        <Reveal delay={100}>
          <div className="glass-strong mt-14 rounded-3xl p-10 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-[oklch(0.82_0.14_200)]" />
            <blockquote className="mx-auto mt-4 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">
              "{t.quote}"
            </blockquote>
            <div className="mt-6">
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Testimonial ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-8 bg-white" : "w-3 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS = [
  {
    q: "Are you open to internships?",
    a: "Yes — I'm actively looking for internships and full-time SDE roles.",
  },
  {
    q: "What's your preferred stack?",
    a: "React + TypeScript on the front, Node/Express on the back, MongoDB or MySQL for data.",
  },
  {
    q: "Do you work on UI/UX?",
    a: "Absolutely — I care deeply about design systems, accessibility, and micro-interactions.",
  },
  {
    q: "How do I reach you?",
    a: "Email dhaminib99@gmail.com or drop me a message via the contact form below.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHead eyebrow="FAQ" title="Frequently asked" />
        </Reveal>
        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <div className="glass overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-500"
                  style={{
                    gridTemplateRows: open === i ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHead
            eyebrow="Contact"
            title="Let's build something"
            subtitle="Have an opportunity, a project, or just want to say hi? My inbox is open."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="glass hover-glow flex h-full flex-col gap-4 rounded-2xl p-6">
              {[
                {
                  Icon: Mail,
                  label: "Email",
                  value: "dhaminib99@gmail.com",
                  href: "mailto:dhaminib99@gmail.com",
                },
                {
                  Icon: Github,
                  label: "GitHub",
                  value: "github.com/dhamini-b",
                  href: "https://github.com/dhamini-b",
                },
                {
                  Icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/dhaminib",
                  href: "https://www.linkedin.com/in/dhaminib",
                },
              ].map(({ Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="glass flex items-center gap-4 rounded-xl p-4 transition hover:-translate-y-0.5"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.55_0.22_295)] to-[oklch(0.5_0.2_260)] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {label}
                    </div>
                    <div className="text-sm font-medium">{value}</div>
                  </div>
                </a>
              ))}
              <div className="glass mt-2 flex-1 overflow-hidden rounded-xl">
                <div
                  className="relative h-full min-h-40 w-full"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.3 0.1 260 / 0.4), oklch(0.3 0.1 295 / 0.4)), radial-gradient(circle at 40% 60%, oklch(0.7 0.15 200 / 0.4), transparent 60%)",
                  }}
                >
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <MapPin className="mx-auto h-6 w-6 text-[oklch(0.82_0.14_200)]" />
                      <div className="mt-1 text-sm text-muted-foreground">
                        Based in India · Open to remote
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 3500);
              }}
              className="glass-strong grid gap-4 rounded-2xl p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FloatInput label="Your name" name="name" />
                <FloatInput label="Email" name="email" type="email" />
              </div>
              <FloatInput label="Subject" name="subject" />
              <FloatInput label="Message" name="message" textarea />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.72_0.19_295)] to-[oklch(0.68_0.19_260)] px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-[oklch(0.72_0.19_295/0.35)] transition hover:-translate-y-0.5 hover:shadow-[oklch(0.72_0.19_295/0.55)]"
              >
                <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                {sent ? "Message sent!" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FloatInput({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const [val, setVal] = useState("");
  const active = val.length > 0;
  const shared =
    "peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-2 text-sm text-foreground outline-none transition focus:border-[oklch(0.72_0.19_295)] focus:bg-white/10 focus:ring-2 focus:ring-[oklch(0.72_0.19_295/0.4)]";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className={shared}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className={shared}
        />
      )}
      <span
        className={`pointer-events-none absolute left-4 text-xs uppercase tracking-widest text-muted-foreground transition-all ${
          active ? "top-2" : "top-4 text-sm normal-case tracking-normal"
        } peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest`}
      >
        {label}
      </span>
    </label>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <div className="font-display text-lg font-semibold text-gradient">Dhamini B</div>
          <p className="text-xs text-muted-foreground">
            Designed & Developed by Dhamini B · © {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { href: "https://github.com/dhamini-b", Icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/dhaminib", Icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:dhaminib99@gmail.com", Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={label}
              className="glass grid h-10 w-10 place-items-center rounded-xl transition hover:-translate-y-0.5 hover:text-[oklch(0.82_0.14_200)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#home"
            className="glass ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs uppercase tracking-widest transition hover:-translate-y-0.5"
          >
            <ArrowUp className="h-4 w-4" /> Top
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Loading ---------------- */

function Loading({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background">
      <div className="text-center">
        <div className="relative mx-auto h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[oklch(0.72_0.19_295)] animate-spin" />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">Loading…</div>
      </div>
    </div>
  );
}

/* ---------------- Root ---------------- */

function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {loading && <Loading onDone={() => setLoading(false)} />}
      <AuroraBackground />
      <MouseGlow />
      <Nav theme={theme} toggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <main>
        <Hero />
        <ProfileSection />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
