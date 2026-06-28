# Refined Minimal Premium Developer Portfolio

A handcrafted, premium, and minimal developer portfolio website designed for **Jagadiesh R**, inspired by the visual aesthetics of **Linear, Vercel, and Apple**.

This project has been modularized into a production-ready folder structure to improve maintainability, speed, and scalability. It is optimized to run seamlessly both on local servers and directly in the browser via double-clicking `index.html` (avoiding CORS blocks).

---

## Directory Structure

```
project/
│
├── index.html                  # Main semantic HTML structure
├── README.md                   # Project documentation & setup instructions
│
├── assets/
│   └── images/
│       └── profile.jpg         # Profile photo
│
├── css/
│   ├── style.css               # Core CSS entrypoint importing sub-sheets
│   ├── variables.css           # Design tokens (colors, fonts, variables)
│   ├── globals.css             # Background overlays, resets, scrollbars
│   ├── navbar.css              # Header navigation & mobile toggle states
│   ├── hero.css                # Spaced layout, orbit elements, light sweeps
│   ├── about.css               # Education cards and statistics listings
│   ├── skills.css              # Tech grid layouts and category buttons
│   ├── projects.css            # Interactive SVG cover simulations
│   ├── contact.css             # Floating inputs and success states
│   ├── footer.css              # Footer layouts & back-to-top button
│   ├── animations.css          # Conic sweeps, orbit transitions, preloader bars
│   ├── cursor.css              # Custom trailing cursor & hover indicators
│   └── responsive.css          # Mobile & tablet query break thresholds
│
├── data/
│   ├── constants.js            # Configuration values & typing text arrays
│   ├── skills.js               # Skills data structures
│   └── projects.js             # Projects details lists
│
└── js/
    ├── utils.js                # Magnetic elements pull & ripple helpers
    ├── cursor.js               # Dot & halo cursor coords handlers
    ├── particles.js            # Drifting background particle engines
    ├── navbar.js               # Sticky glass transforms & mobile menus
    ├── projects.js             # Category filter switches
    ├── animations.js           # Scroll reveals, countups, typing loops
    ├── contact.js              # Success confetti canvas generators
    └── main.js                 # Global document load initiators
```

---

## Key Refinements & Architecture

1. **CORS-Free Architecture**: Script files in `js/` and data variables in `data/` are loaded as standard script dependencies rather than ES Modules. This ensures that double-clicking `index.html` on any device opens the site locally with 100% features and no console blocks.
2. **Modular CSS Entry**: All individual section styles are separated. They are loaded cleanly in a single import manifest `css/style.css` which is linked in the HTML header.
3. **Structured Configurations**: Magic typing intervals, speed thresholds, and particle quantities are stored inside a centralized config dictionary inside `data/constants.js`.
4. **Clean Code**: No inline CSS, inline Javascript, or duplication.

---

## Local Verification Guidelines
To view the animations, cursor trails, and visual elements:
- Double-click the [index.html](file:///c:/Users/jagad/OneDrive/Documents/Projects/My%20portfolio/index.html) file to open it directly in Chrome, Firefox, or Edge.
- Alternatively, run a local Python HTTP server in this directory:
  ```bash
  python -m http.server 8080
  ```
  And navigate to `http://localhost:8080` in your web browser.
