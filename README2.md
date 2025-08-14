# My Online Resume — Sophisticated Version

This repository hosts a lightweight, framework-free personal resume and portfolio designed for GitHub Pages. It uses semantic HTML, modern CSS, and vanilla JavaScript only.

## Features

- Personal information hero section with avatar and quick actions
- Developer accounts section with links to code and blogs
- Projects section with elegant cards and technology tags
- Certificates gallery with a responsive grid and lightbox
- Skills distribution chart using the Canvas API (no libraries)
- Subtle animations, hover effects, and accessible semantics

## Project Structure

```
.
├─ index.html          # Main page
├─ styles.css          # Styling and responsive layout
├─ script.js           # Interactivity (chart, reveal, lightbox)
├─ README.md           # Original brief
├─ README2.md          # This detailed guide
└─ assets/
   ├─ avatar.svg
   └─ certificates/
      ├─ cert1.svg
      ├─ cert2.svg
      ├─ cert3.svg
      ├─ cert4.svg
      ├─ cert5.svg
      └─ cert6.svg
```

## Customization Guide

- Hero and personal info: edit names, titles, contact, and bio in `index.html`.
- Technical accounts: replace placeholder links under the "Technical Accounts" section.
- Projects: update project titles, descriptions, tags, and GitHub links in `index.html`.
- Certificates: replace the placeholder SVGs under `assets/certificates/` with your real images (PNG/JPG/SVG). Filenames do not matter; just update the `src` paths in the HTML.
- Skills chart: tweak labels, values, and colors in `script.js` under the `data` array.
- Theme: update color variables in `styles.css` under the `:root` block.

## Accessibility & Performance

- Semantics: all sections use descriptive headings and lists. Images include `alt` text. Lightbox respects Escape key to close.
- Keyboard: a skip link is provided. Lightbox close button is focusable. Consider adding focus trapping for advanced needs.
- Motion: animations reduce automatically when `prefers-reduced-motion: reduce` is set.
- Performance: no frameworks, optimized painting, GPU-friendly shadows, and scaled Canvas for HiDPI.

## Deployment to GitHub Pages

1. Push this repository to GitHub under a repo named `<username>.github.io` or enable Pages in repository settings.
2. On GitHub, open Settings → Pages → Select `main` branch → `/root`.
3. Wait a minute and visit `https://<username>.github.io/`.

## Suggested Improvements

- Add a JSON data file (still static) to drive content for projects/certificates and hydrate via `fetch()`.
- Implement hash-based deep linking and scroll spy for the navbar.
- Add print styles for exporting the resume as a PDF.
- Add unit tests for chart utilities using a simple test runner (still no bundlers required).
- Add a11y focus trapping inside the lightbox and ARIA `role="dialog"`.

## How to Replace Placeholders Quickly

1. Replace `assets/avatar.svg` with your portrait image.
2. Update the hero name, email, and the About section in `index.html`.
3. Replace the six certificate images with your real certificates; keep sizes reasonable for the web (e.g., 1600px wide max).
4. Update the projects’ repo links and descriptions.
5. Adjust skill values and colors in `script.js`.

## License

MIT — feel free to reuse and adapt.


