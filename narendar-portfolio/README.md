# Narendar — Cinematic Developer Portfolio

A React + Vite portfolio starter built around the supplied portrait and resume details.

## Requirements
- Node.js 20.19+ or 22.12+
- VS Code
- Internet connection for Google Fonts

## Run locally (Windows)
1. Extract the ZIP file.
2. Open the extracted `narendar-portfolio` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Personalization notes
- The supplied portrait is at `public/images/narendar.jpg`.
- Contact details and education/project information are based on the supplied resume.
- Project-level live demo/repository URLs were not present in the resume, so no fake project links are added.
- Review all metrics and descriptions against your actual project evidence before publishing.
- Update social/contact URLs in `src/App.jsx` if they change.

## Included interactions
- GSAP + ScrollTrigger section reveals and portrait parallax.
- Framer Motion contact modal and CTA hover/tap interactions.
- Cursor flashlight reveal on fine-pointer devices.
- Responsive navigation and layouts.
- Reduced-motion support and Escape-to-close contact overlay.
