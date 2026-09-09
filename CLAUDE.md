# Kim Hee Eun Portfolio

This repository contains the production portfolio published at `https://www.kimheeun.com/`.

## Stack

- React 19
- TypeScript
- Vite
- CSS Modules and shared styles in `src/styles/`

## Working rules

- Treat the existing site, content, responsive behavior, and interactions as the baseline.
- Make only the design or content changes the user requests; do not redesign unrelated sections.
- Reuse the existing design tokens, components, and image assets before introducing new patterns.
- Keep desktop and mobile layouts working after every visual change.
- Do not edit generated files in `dist/` or dependencies in `node_modules/` directly.
- Never expose personal contact information beyond what is already intentionally published on the site.
- Before finishing, run `npm run lint` and `npm run build`.
- For visual changes, run `npm run dev` and verify the affected page in a browser at desktop and mobile widths.

## Key locations

- Main application: `src/App.tsx`
- Home sections: `src/components/sections/`
- Project cards: `src/components/sections/works/`
- SOL Pay detail page: `src/pages/SolPayDetail.tsx`
- Global styles and tokens: `src/styles/`
- Images: `src/assets/images/`
- Fonts: `public/fonts/`

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```
