# Pratyush Padhy — Portfolio

Personal portfolio showcasing ML/AI projects, built with React, TypeScript, and Tailwind CSS.

**Live site:** [pratyush-padhy-portfolio.netlify.app](https://pratyush-padhy-portfolio.netlify.app)

## Tech Stack

**Frontend:** React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion
**Deployment:** Netlify

## Features

- Two ML project showcases with detailed writeups and result visualizations
- Responsive design with mobile bottom navigation
- Animated page transitions and scroll-triggered animations
- Command palette (Cmd+K / Ctrl+K)
- Code-split routes with lazy loading
- Accessibility: skip link, ARIA labels, keyboard navigation, reduced-motion support

## Project Structure

```
frontend/
├── src/
│   ├── pages/          # Home, About, Projects, EmotionDetection, FakeNews
│   ├── components/     # Navbar, Footer, CommandPalette, ErrorBoundary, Lightbox
│   └── components/animations/  # FadeUp, GlowCard, StaggerContainer, PageTransition
└── public/             # Static assets, resume PDF, project images
```

## Running Locally

```bash
cd frontend
npm install
npm run dev          # starts on http://localhost:5173
```

## Deployment

**Netlify** (frontend):
- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: `frontend`
