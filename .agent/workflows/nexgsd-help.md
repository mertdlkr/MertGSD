---
description: Show all available NexGsd commands and usage guide
---

# NexGsd Help — Available Commands

Display the following help information to the user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 NexGsd — Command Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ⚡ Core Commands

| Command              | Profile       | What it does                                                |
|----------------------|---------------|-------------------------------------------------------------|
| /nexgsd-super [prompt]  | **Autonomous** | FULL AUTONOMY: AI builds from prompt to production          |
| /nexgsd-autopilot [N]   | **Autonomous** | Autonomous build engine (plan → execute → verify loop)      |
| /nexgsd-no-halluc [q]   | **Verified**   | Technical Q&A with mandatory research and citations         |
| /nexgsd-commit-memory   | **Continuity** | Distill context into long-term memory                       |

## Standard Workflow

| Command              | Task          | What it does                                                |
|----------------------|---------------|-------------------------------------------------------------|
| /nexgsd-new-project     | **Setup**     | Questions → Research → Requirements → Roadmap → Config     |
| /nexgsd-discuss [N]     | **Context**   | Capture implementation decisions before planning            |
| /nexgsd-plan [N]        | **Blueprint** | Technical planning and research for a phase                |
| /nexgsd-list-phase-assumptions [N] | **Planning** | Preview planning assumptions for a phase |
| /nexgsd-execute [N]     | **Builder**   | Execute all plans with atomic git commits                   |
| /nexgsd-verify [N]      | **Audit**     | Verify built features through user acceptance testing       |

## Quality & Review

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /nexgsd-audit           | Full project audit (security, performance, mobile, SEO, a11y, brand) |
| /nexgsd-review [N]      | PR-style code review for a phase or specific files          |
| /nexgsd-refactor [desc] | Safe refactoring with test snapshots and rollback           |

## Operations

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /nexgsd-deploy          | Build, deploy, and verify (CF Pages, Vercel, Netlify)      |
| /nexgsd-migrate [desc]  | Database migration with safety gates and rollback SQL       |
| /nexgsd-setup-config    | Configure project settings (ntfy, deploy, Supabase, tests)  |

## Utilities

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /nexgsd-quick [desc]    | Execute small ad-hoc task with NexGsd quality guarantees       |
| /nexgsd-progress        | Pulse check: Current state, roadblocks, and next steps      |
| /nexgsd-commit-memory   | Distill project state into durable memory                    |
| /nexgsd-help            | Show this help message                                      |

## Brownfield & Milestones

| Command                       | What it does                                                |
|------------------------------|-------------------------------------------------------------|
| /nexgsd-map-codebase        | Build a real codebase map before planning existing apps     |
| /nexgsd-new-milestone       | Start the next milestone on an existing project             |
| /nexgsd-audit-milestone     | Audit milestone-wide requirement coverage and integration   |
| /nexgsd-complete-milestone  | Archive a shipped milestone and prepare the next cycle      |
| /nexgsd-plan-milestone-gaps | Convert milestone audit gaps into roadmap work              |

## Continuity & Maintenance

| Command                      | What it does                                                |
|-----------------------------|-------------------------------------------------------------|
| /nexgsd-debug [issue]      | Start or resume a structured debug session                  |
| /nexgsd-pause-work         | Save a precise handoff for the next session                 |
| /nexgsd-resume-work        | Restore project context and route to the next step          |
| /nexgsd-add-todo           | Capture a follow-up item during active work                 |
| /nexgsd-check-todos        | Review pending todos and route them into action             |
| /nexgsd-health             | Validate `.planning/` integrity and repair safe issues      |
| /nexgsd-update             | Update a NexGsd clone or explain reinstall flow            |
| /nexgsd-settings           | Inspect or update project settings                          |
| /nexgsd-set-profile        | Set the preferred model profile                             |
| /nexgsd-research-phase     | Run standalone phase research                               |
| /nexgsd-add-phase          | Append a new roadmap phase                                  |
| /nexgsd-insert-phase       | Insert an urgent decimal phase                              |
| /nexgsd-remove-phase       | Remove an unstarted future phase                            |
| /nexgsd-add-tests          | Add or strengthen tests                                     |
| /nexgsd-reapply-patches    | Reapply saved local patch overlays                          |

## Typical Workflow

1. /nexgsd-new-project     → Set up project vision, requirements, roadmap, config
2. /nexgsd-discuss 1       → Capture your preferences for Phase 1
3. /nexgsd-plan 1          → Research and create task plans
4. /nexgsd-execute 1       → Execute plans with atomic commits
5. /nexgsd-verify 1        → Test and verify the work
6. /nexgsd-audit           → Full quality audit
7. /nexgsd-deploy          → Deploy to production
8. Repeat for next phase

💡 TIP: Start a NEW CONVERSATION between each step
for optimal context freshness and reduced hallucination risk.

## Agents (18)

| Agent                    | Role                                              |
|--------------------------|----------------------------------------------------|
| nexgsd-executor             | Executes plans with atomic commits                 |
| nexgsd-planner              | Creates executable task plans                      |
| nexgsd-debugger             | Investigates bugs using scientific method          |
| nexgsd-verifier             | Verifies phase goal achievement                    |
| nexgsd-codebase-mapper      | Explores and documents codebase structure          |
| nexgsd-phase-researcher     | Researches implementation before planning          |
| nexgsd-project-researcher   | Researches domain ecosystem before roadmap         |
| nexgsd-research-synthesizer | Synthesizes parallel research outputs              |
| nexgsd-roadmapper           | Creates project roadmaps with phase breakdown      |
| nexgsd-plan-checker         | Verifies plans will achieve phase goal             |
| nexgsd-integration-checker  | Verifies cross-phase integration and E2E flows     |
| nexgsd-security-auditor     | OWASP security scanning and vulnerability check    |
| nexgsd-performance-tester   | Lighthouse, bundle size, performance anti-patterns  |
| nexgsd-mobile-auditor       | Responsive design and mobile UX audit              |
| nexgsd-seo-checker          | Metadata, sitemap, structured data verification    |
| nexgsd-accessibility-tester | WCAG 2.2 AA compliance check                      |
| nexgsd-brand-reviewer       | Brand consistency, copy quality, design review     |
| nexgsd-notifier             | Push notifications via ntfy.sh                     |

## File Structure

.planning/
├── PROJECT.md          — Project vision and context
├── REQUIREMENTS.md     — Scoped v1/v2 requirements
├── ROADMAP.md          — Phases and progress tracking
├── STATE.md            — Current position (living memory)
├── nexgsd-config.json     — Project settings (ntfy, deploy, supabase, tests)
├── research/           — Domain research
└── phases/
    ├── 01-phase-name/
    │   ├── 01-CONTEXT.md         — Implementation decisions
    │   ├── 01-RESEARCH.md        — Phase-specific research
    │   ├── 01-01-PLAN.md         — Task plan
    │   ├── 01-01-SUMMARY.md      — Execution summary
    │   ├── 01-UAT.md             — User acceptance test results
    │   ├── 01-VERIFICATION.md    — Verification results
    │   ├── SECURITY-AUDIT.md     — Security audit report
    │   ├── PERFORMANCE-REPORT.md — Performance analysis
    │   ├── MOBILE-AUDIT.md       — Mobile responsiveness audit
    │   ├── SEO-REPORT.md         — SEO verification
    │   ├── ACCESSIBILITY-REPORT.md — WCAG compliance
    │   ├── BRAND-REVIEW.md       — Brand consistency review
    │   ├── REVIEW.md             — Code review verdict
    │   └── AUDIT.md              — Unified audit report
    └── 02-phase-name/
        └── ...

## 🛡️ Anti-Hallucination Features

| Protection                    | How it works                                           |
|-------------------------------|--------------------------------------------------------|
| File-First Context            | Always re-read files — never rely on memory            |
| Source Verification           | Technical claims verified via docs before use in plans |
| Confidence Levels             | Research tagged HIGH/MEDIUM/LOW by verification source |
| Verification Gates            | Every task verified — output read, not assumed         |
| No Auto-Pass                  | Tests never marked passed without user confirmation    |
| Decision Attribution          | Tracks USER-decided vs AI-suggested decisions          |
| Context Freshness             | New conversation recommended between workflow steps    |
| Checkpoint Integrity          | WAIT for user — never hallucinate completion           |

## Notifications (ntfy.sh)

When configured via /nexgsd-setup-config, you'll receive push notifications for:
- Phase completion
- Deploy success/failure
- Audit results
- Errors and blockers

## Multi-Model Compatibility

Works with any AI model:
- 🔵 Gemini (Google DeepMind)
- 🟢 GPT (OpenAI)
- 🟡 Open-source models

Model-agnostic by design: uses structural safeguards (file reads,
command verification, user gates) instead of model-specific behavior.
```
