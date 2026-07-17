# DELTA — Web Application
### Data Oriented Thinkers' Association | Christ College of Engineering, Thrissur

This is the official client application for the **DELTA** student association at Christ College of Engineering, Thrissur. The platform is designed under a data-oriented, technical blueprint style called *"The Intelligent Grid"*—featuring asymmetric layouts, connection nodes, and clean wireframe borders.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React.js (v19.x) |
| **Styling** | Tailwind CSS (v3.x) & CSS Custom Properties |
| **Routing** | React Router (v7.x) |
| **Animations** | Framer Motion (v12.x) & HTML5 Canvas |
| **Icons** | Lucide React (stroke width: 1.5) |
| **Integration** | Formspree / EmailJS hooks for contact dispatches |

---

## 🎨 Design Metaphor: "The Intelligent Grid"

- **Primary Canvas Background**: Paper Cream (`#f7f1e4`)
- **Primary Text & Headers**: Deep Indigo (`#0e3061`)
- **Accents & CTAs**: Signal Orange (`#fe572a`)
- **Secondary Anchors**: Teal Green (`#065964`)
- **Aesthetic Principles**: Asymmetrical placement, monospace technical indicators, line-connect animation vectors, and blueprint-style grid intersections (`+` marks).

---

## 📂 Codebase Architecture

```
frontend/src/
 ├─ components/
 │   ├─ Button.jsx                  # Reusable action triggers (Primary & Secondary)
 │   ├─ Card.jsx                    # Corner-anchored icon card structures
 │   ├─ ColorSwatch.jsx             # Visual palette swatch with copy-to-clipboard handler
 │   ├─ ContactForm.jsx             # Validation controls with submission states
 │   ├─ Footer.jsx                  # Asymmetric footer containing location, quicklinks & tagline
 │   ├─ Navbar.jsx                  # Sticky header with layout active morphs & mobile drawer
 │   ├─ NodeCanvasBackground.jsx    # Custom HTML5 coordinate particle background
 │   ├─ OrgChart.jsx                # Visual representation of the committee hierarchy
 │   ├─ ScrollReveal.jsx            # Scroll reveal animation wrapper (motion-reduced safe)
 │   └─ ScrollToTop.jsx             # Resets scroll scroll-y coordinates on path transitions
 ├─ data/
 │   └─ committee.js                # Database for faculty leads, core board, and department divisions
 ├─ pages/
 │   ├─ Home.jsx                    # Landing page containing Hero, core values, What We Do, and leader previews
 │   ├─ About.jsx                   # Narrative detailing Origin timeline and fields focus grids
 │   ├─ Committee.jsx               # Roster grids showing all active coordinators and org chart
 │   ├─ Brand.jsx                   # Vector logo playgrounds, typography guides, and live color boards
 │   └─ Contact.jsx                 # Interactive forms, direct dials, and greyscale coordinate maps
 ├─ App.js                          # Client routing coordinates
 ├─ index.js                        # Dom entry point
 └─ index.css                       # Font loads, scroll overrides, and Tailwind binds
```

---

## 🔧 Getting Started

### 1. Install Dependencies
Navigate to the `frontend` directory and install the node modules:
```bash
cd frontend
npm install
```

### 2. Run Local Development Server
Launch the development engine:
```bash
npm start
```
The app will run locally at [http://localhost:3000](http://localhost:3000).

### 3. Build for Production
Compile optimized build files:
```bash
npm run build
```
The compiled files will compile inside the `/build` folder ready for deployment on static hosting CDN networks (Vercel, Netlify, Github Pages, etc.).

---

## 📨 Form Integration Config
To activate the contact form, open the `.env` file in the `frontend` root directory and set the `REACT_APP_FORMSPREE_ENDPOINT` variable to your Formspree form URL:
```env
REACT_APP_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```
If empty, the form will simulate validation checks and mock loading states locally in a sandbox mode.

