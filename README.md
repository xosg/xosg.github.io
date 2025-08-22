
# My Online Resume — Modern Version

This repository contains a minimalist, framework-free personal resume and portfolio for GitHub Pages. It uses semantic HTML, modern CSS, and vanilla JavaScript, with all dynamic content driven by JSON files.

## Features

- Emoji avatar in the hero section (no SVG file needed)
- Technical accounts section with icons and tooltips, data-driven from HTML or JSON
- Projects section rendered from JSON data
- Certificates gallery with responsive grid and lightbox
- Pie charts (skills, languages, etc.) rendered from a JSON array (fully dynamic)
- Subtle animations, hover effects, and accessible markup

## Project Structure

```
.
├─ index.html          # Main page
├─ styles.css          # Styling and responsive layout
├─ script.js           # All interactivity (charts, reveal, lightbox, dynamic sections)
├─ data/
│   ├─ projects.json   # Project data
│   ├─ skills.json     # Pie chart configs (array, dynamic)
│   ├─ timeline.json   # Timeline data
│   └─ svg.html        # Account SVGs (if used)
├─ assets/
│   └─ certificates/   # Certificate images (SVG/PNG/JPG)
├─ favicon.svg         # Site favicon
└─ README.md           # This guide
```

## Customization Guide

- Hero: edit name, title, and emoji in `index.html`.
- Technical accounts: update SVGs or JSON for your links and icons.
- Projects: edit `data/projects.json` for project cards.
- Certificates: add images to `assets/certificates/` and update HTML if needed.
- Pie charts: edit `data/skills.json` (array of chart configs, each with selector, title, subtitle, and data).
- Theme: update color variables in `styles.css` under the `:root` block.

## Accessibility & Performance

- Semantic HTML, descriptive headings, and alt text for images/icons
- Keyboard accessible navigation and lightbox
- Animations respect `prefers-reduced-motion`
- No frameworks, fast load, and optimized for GitHub Pages

## Deployment

1. Push this repository to GitHub as `<username>.github.io` or enable Pages in repository settings.
2. On GitHub, open Settings → Pages → Select `main` branch → `/root`.
3. Wait a minute and visit `https://<username>.github.io/`.

## Tips

- All major sections are now data-driven and easy to update via JSON.
- Add or remove pie charts by editing the array in `skills.json`.
- No avatar SVG file is needed—just use an emoji in the HTML.
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


