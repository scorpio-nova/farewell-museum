# Project Context

## Purpose
A 24h hackathon MVP web app called "告别博物馆" (Farewell Museum).
Users create a memorial object and tap to "repair/grow" it, then choose to archive it into a museum or release it with a sealing tombstone animation.

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS v4 (via @tailwindcss/vite)
- react-router-dom
- Persistence: localStorage only (no backend)

## Project Conventions

### Code Style
- TypeScript strict, prefer explicit types for shared models
- Default exports for pages: CreatePage / RepairPage / MuseumPage
- Use functional React components + hooks
- Keep components small; put shared types in `src/app/types.ts`

### Architecture Patterns
- Routes in `src/App.tsx`:
  - `/create`, `/repair/:id`, `/museum`
- Local persistence helpers in `src/app/storage.ts`
- Mobile-first UI with Tailwind classes

### Testing Strategy
- No automated tests for MVP (manual acceptance checks only)

### Git Workflow
- Small commits, message format: `feat: ...`, `fix: ...`, `chore: ...`

## Domain Context
- Tone: gentle, restrained, non-therapeutic. Include a disclaimer that the app is not professional help.

## Important Constraints
- Must be demoable on local WiFi: run with `npm run dev -- --host 0.0.0.0`
- Do NOT add PostCSS/Tailwind v3 init steps.
  - Tailwind v4 is configured with `@tailwindcss/vite`
  - `src/index.css` uses `@import "tailwindcss";`
- No deep chat, no mental-health claims.

## External Dependencies
- None (no cloud services)