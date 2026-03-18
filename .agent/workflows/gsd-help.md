---
description: Show all available GSD commands and usage guide
---

# GSD Help — Available Commands

Display the following help information to the user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MertGSD — Command Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ⚡ Core Commands

| Command              | Profile       | What it does                                                |
|----------------------|---------------|-------------------------------------------------------------|
| /gsd-super [prompt]  | **Autonomous** | FULL AUTONOMY: AI builds from prompt to production          |
| /gsd-no-halluc [q]   | **Verified**   | Technical Q&A with mandatory research and citations         |
| /gsd-commit-memory   | **Continuity** | Distill context into long-term memory                       |

## Standard Workflow

| Command              | Task          | What it does                                                |
|----------------------|---------------|-------------------------------------------------------------|
| /gsd-new-project     | **Setup**     | Questions → Research → Requirements → Roadmap → Config     |
| /gsd-discuss [N]     | **Context**   | Capture implementation decisions before planning            |
| /gsd-plan [N]        | **Blueprint** | Technical planning and research for a phase                |
| /gsd-execute [N]     | **Builder**   | Execute all plans with atomic git commits                   |
| /gsd-verify [N]      | **Audit**     | Verify built features through user acceptance testing       |

## Quality & Review

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /gsd-audit           | Full project audit (security, performance, mobile, SEO, a11y, brand) |
| /gsd-review [N]      | PR-style code review for a phase or specific files          |
| /gsd-refactor [desc] | Safe refactoring with test snapshots and rollback           |

## Operations

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /gsd-deploy          | Build, deploy, and verify (CF Pages, Vercel, Netlify)      |
| /gsd-migrate [desc]  | Database migration with safety gates and rollback SQL       |
| /gsd-setup-config    | Configure project settings (ntfy, deploy, Supabase, tests)  |

## Utilities

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /gsd-quick [desc]    | Execute small ad-hoc task with GSD quality guarantees       |
| /gsd-progress        | Pulse check: Current state, roadblocks, and next steps      |
| /gsd-help            | Show this help message                                      |

## Typical Workflow

1. /gsd-new-project     → Set up project vision, requirements, roadmap, config
2. /gsd-discuss 1       → Capture your preferences for Phase 1
3. /gsd-plan 1          → Research and create task plans
4. /gsd-execute 1       → Execute plans with atomic commits
5. /gsd-verify 1        → Test and verify the work
6. /gsd-audit           → Full quality audit
7. /gsd-deploy          → Deploy to production
8. Repeat for next phase

💡 TIP: Start a NEW CONVERSATION between each step
for optimal context freshness and reduced hallucination risk.

## Agents (17)

| Agent                    | Role                                              |
|--------------------------|----------------------------------------------------|
| gsd-executor             | Executes plans with atomic commits                 |
| gsd-planner              | Creates executable task plans                      |
| gsd-debugger             | Investigates bugs using scientific method          |
| gsd-verifier             | Verifies phase goal achievement                    |
| gsd-codebase-mapper      | Explores and documents codebase structure          |
| gsd-phase-researcher     | Researches implementation before planning          |
| gsd-project-researcher   | Researches domain ecosystem before roadmap         |
| gsd-research-synthesizer | Synthesizes parallel research outputs              |
| gsd-roadmapper           | Creates project roadmaps with phase breakdown      |
| gsd-plan-checker         | Verifies plans will achieve phase goal             |
| gsd-integration-checker  | Verifies cross-phase integration and E2E flows     |
| gsd-security-auditor     | OWASP security scanning and vulnerability check    |
| gsd-performance-tester   | Lighthouse, bundle size, performance anti-patterns  |
| gsd-mobile-auditor       | Responsive design and mobile UX audit              |
| gsd-seo-checker          | Metadata, sitemap, structured data verification    |
| gsd-accessibility-tester | WCAG 2.2 AA compliance check                      |
| gsd-brand-reviewer       | Brand consistency, copy quality, design review     |
| gsd-notifier             | Push notifications via ntfy.sh                     |

## File Structure

.planning/
├── PROJECT.md          — Project vision and context
├── REQUIREMENTS.md     — Scoped v1/v2 requirements
├── ROADMAP.md          — Phases and progress tracking
├── STATE.md            — Current position (living memory)
├── gsd-config.json     — Project settings (ntfy, deploy, supabase, tests)
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

When configured via /gsd-setup-config, you'll receive push notifications for:
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
