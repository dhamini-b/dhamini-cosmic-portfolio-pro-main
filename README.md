# Dhamini B — Personal Portfolio

A modern, premium, fully responsive developer portfolio built for Dhamini B, a Final Year Computer Science Engineering student and aspiring Software Engineer specializing in Full Stack Development.

Designed with inspiration from Apple, Awwwards, Vercel, Linear, and Framer — dark-mode-first, glassmorphism UI, aurora gradients, and polished micro-interactions crafted to impress recruiters and hiring managers.

**Live Preview:** https://dhamini-cosmic-portfolio-pro.lovable.app

---

## ✨ Features

- **Aurora + Glassmorphism Design** — layered gradients, blurred glass panels, and soft glows
- **Dark Mode First** with optional light mode
- **Fully Responsive** across mobile, tablet, and desktop
- **Animated Hero** with typing effect and orbiting tech icons
- **About & Timeline** — animated stats and vertical education/experience timeline
- **Skills Matrix** — categorized cards with animated proficiency indicators
- **Projects Showcase** — hover-reactive cards with live and source links
- **Testimonials Carousel**, **FAQ Accordion**, and **GitHub-style Contribution Grid**
- **Contact Form** with validation
- **SEO Optimized** — semantic HTML, meta tags, Open Graph, and Twitter cards
- **Premium Typography** — Space Grotesk, Inter, and JetBrains Mono

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + SSR) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom OKLCH design tokens |
| UI Primitives | shadcn/ui + Radix UI |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| Data | @tanstack/react-query |
| Build Tool | Vite 8 |
| Deployment | Cloudflare Workers (edge) |

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 20+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-directory>

# Install dependencies
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the site.

### Build for Production

```bash
bun run build
bun run preview
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start the Vite dev server |
| `bun run build` | Create an optimized production build |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |

---

## 📁 Project Structure

```
src/
├── assets/            # Static assets (profile image, etc.)
├── components/ui/     # shadcn/ui components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and helpers
├── routes/            # File-based routing (TanStack Router)
│   ├── __root.tsx     # Root layout, head metadata, providers
│   └── index.tsx      # Home page (portfolio sections)
├── router.tsx         # Router configuration
├── server.ts          # SSR entry
├── start.ts           # Client entry
└── styles.css         # Tailwind + design tokens + custom utilities
public/                # Favicon and static public files
```

---

## 🎨 Design System

All colors, gradients, and shadows are defined as semantic design tokens in `src/styles.css` using the OKLCH color space. Custom utilities include:

- `.glass` — glassmorphism panels
- `.aurora-*` — animated aurora gradient backgrounds
- `.hover-glow` — interactive glow on hover
- Custom keyframes for `float`, `aurora-shift`, and `fade-up`

Never hardcode colors in components — always reference the semantic tokens for consistent theming.

---

## 📬 Contact

**Dhamini B** — Final Year CSE Student & Aspiring Software Engineer

Feel free to reach out through the contact form on the portfolio.

---

## 📄 License

This project is personal and made for professional showcase purposes.


