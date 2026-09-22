# Phase 2 — Cinematic Analytics Motion System

## Goal

Deepen the existing Analytics Control Room so motion explains Mahesh’s working sequence—data, validation, analysis, KPI, dashboard, report, decision—without changing any verified content or obscuring recruiter-critical information.

## Implementation

1. **Create one motion language**
   - Add reusable reveal, stagger, slide, image-reveal, line-draw, and hover-depth settings with shared timing and easing.
   - Keep content readable before and during motion, and let the existing reduced-motion preference disable decorative movement.

2. **Upgrade the first screen**
   - Stage the grid, restrained data paths, identity, role, stack, six-step pipeline, proof metrics, workstation fragments, and actions in a short sequence.
   - Keep Data Analyst, MIS Executive, SQL, Power BI, Advanced Excel, Python, proof, and actions visible within the initial viewport.
   - Reduce particle density and continuous effects on smaller screens.

3. **Connect the scroll story**
   - Add a restrained page-level data spine and section transition cues that visually continue the analytics sequence.
   - Give workflow stages distinct conceptual states: incoming records, cleaning, validation, analysis, visualization, and reporting.

4. **Strengthen evidence-first sections**
   - Give major projects editorial title, metadata, evidence-frame, tag, and action reveals while retaining every current evidence warning and placeholder.
   - Add purposeful MIS pipeline progression and capability icons, including Data Reconciliation as requested without claiming unsupported work.
   - Turn the stack into interactive capability relationships where relevant tools illuminate together.

5. **Refine navigation and remaining sections**
   - Add active-section tracking and a compact scrolled navigation state while preserving the accessible mobile sheet.
   - Animate the experience timeline line, markers, factual work bullets, and tools in sequence.
   - Add restrained credential/about reveals and a quieter final contact frame where ambient motion fades.

6. **Validate quality**
   - Check keyboard navigation, Escape/focus return, reduced motion, overflow, first-screen recruiter signals, console/network errors, and rendering at 390×844, 768×1024, 1280×800, and 1440×900.
   - Confirm no factual data, links, metrics, dates, screenshots, results, or outcomes were invented.

## Technical details

- Continue with Motion for React plus GPU-friendly CSS transforms and opacity; no WebGL, video, particle library, scroll hijacking, or loading screen.
- Use in-view and scroll-progress effects only where they communicate process; avoid continuous React state updates for decorative visuals.
- Keep the current TanStack Start architecture, page sections, MAHI.AI behavior, Radix mobile navigation, design tokens, and knowledge files intact.
