# Pamtech Group Redesign

Multipage frontend for the Pamtech Group website redesign. The current build is a
Next.js App Router site with public pages for the home page, story, impact,
foundations, business lines, careers, contact, news, and legal content.

## Prerequisites

- Node.js `>=22.13.0`
- npm

## Quick Start

```bash
npm install
npm run dev
```

Use this check before handoff or deployment:

```bash
npm test
```

`npm run dev` and `npm run build` use a local Windows-friendly Next.js wrapper.
Netlify uses the standard hosted build command below.

## Netlify Deployment

Netlify build settings are declared in `netlify.toml`:

- Build command: `npm run build:netlify`
- Publish directory: `.next`
- Node version: `22`

The site currently has no required runtime environment variables. When backend
features are added, add the Supabase values from `.env.example` to Netlify's
environment variables.

## Supabase Readiness

The frontend is ready to pair with Supabase later for contact submissions,
careers applications, editable news, or CMS-style content. Keep public browser
keys prefixed with `NEXT_PUBLIC_`; keep service-role keys server-only in Netlify
environment variables and never expose them in client components.

## Content Notes

- Foundation content lives under `/impact/foundations`.
- CTA destinations are placeholders where final destinations are still pending.
- The contact form is currently a front-end placeholder and does not submit data.
- Our Story and Impact include video-background placeholder treatments for final
  production assets.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the local production build
- `npm run build:netlify`: verify the Netlify production build command
- `npm run typecheck`: run TypeScript checks
- `npm run lint`: run ESLint
- `npm test`: run typecheck and the local production build
