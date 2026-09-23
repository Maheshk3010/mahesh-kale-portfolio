# Market-aligned project portfolio strategy

## Goal
Rework the existing project showcase for Data Analyst and MIS Executive screening, while separating delivery status from evidence status and preserving all unknown fields as blank or pending.

## What will change
- Replace the current hardcoded featured-project structure with one shared project model used by the portfolio and MAHI.AI.
- Present the featured sequence as:
  1. Sales Performance Intelligence — Completed / Evidence Pending
  2. SQL Data Warehouse & ETL Pipeline — Completed / Evidence Pending
  3. MIS Reporting Automation & Management Dashboard — In Progress / Evidence Pending
  4. Customer Retention & Cohort Intelligence — Planned / Evidence Pending
- Keep Customer Analytics / Churn visible as completed supporting analytical work with model evidence pending.
- Keep Apple Stock Price Prediction and Product Recommendation System secondary, not equal to Data Analyst/MIS work.
- Add visibly separate delivery badges (`Completed`, `In Progress`, `Planned`) and evidence badges (`Evidence Available`, `Evidence Pending`).
- Give every featured project consistent fields for category, business question, data, workflow, tools, KPIs, output, findings, outcome, evidence, GitHub, and live demo.
- Render empty or unavailable facts honestly; no generated links, metrics, findings, outcomes, or evidence.
- Keep the existing control-room design and motion system; adjust only the project architecture and presentation.

## Technical details
- Extend the existing project data schema with status, evidence state, category, workflow, KPIs, and structured evidence fields.
- Update project data and the project showcase to consume the same source of truth.
- Update local MAHI.AI project wording so “completed” and “evidence available” are never treated as synonyms.
- Preserve the existing MIS section while making the new MIS project’s build state unambiguous.

## Validation
- Check build diagnostics after changes.
- Verify project order, badges, empty evidence behavior, links, and readable layouts on mobile and desktop.
- Confirm no planned project is described as completed and no missing URL becomes clickable.
