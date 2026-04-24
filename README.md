# NexGsd

[![npm version](https://img.shields.io/npm/v/nexgsd.svg)](https://www.npmjs.com/package/nexgsd)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built by NexVar](https://img.shields.io/badge/built%20by-NexVar-0a0a0a?labelColor=000)](https://nexvar.io)

**The open-source AI agent framework for structured project execution.** Plan, build, audit, and deploy — fully autonomous or human-in-the-loop.

> Built at **[NexVar](https://nexvar.io)** by **[Mert Ali Dalkır](https://mertdlkr.com)** — the execution framework behind our production work.

```bash
npm i -g nexgsd && nexgsd install
```

NexGsd is a multi-agent system that turns AI coding assistants into complete project management engines. **18 specialized agents + 39 workflows** that handle everything from initial research to production deployment, brownfield mapping, milestone ops, debugging, and maintenance.


> *"I built this because every AI coding tool is great at writing code but terrible at managing projects. NexGsd bridges that gap."* — [Mert Ali Dalkır](https://mertdlkr.com)

---

## Why NexGsd?

**The problem:** AI coding assistants write code fast but lose context between sessions, hallucinate project state, skip testing, forget to audit security, and can't manage multi-phase projects.

**The solution:** NexGsd adds a structured execution layer on top of any AI coding tool:

- **Context management** — `.planning/` directory persists project state across sessions
- **Anti-hallucination** — every claim verified against real files and real command output
- **Quality gates** — security, performance, mobile, SEO, accessibility, brand audits built-in
- **Autonomous execution** — give a prompt, walk away, get notified when done
- **Phased delivery** — complex projects broken into manageable phases with atomic commits

---

## Quick Start

### Option A: npm (recommended)

```bash
npm i -g nexgsd
cd your-project
nexgsd install
```

That's it. Works on **macOS, Linux, and Windows**.

**One-time use without global install:**
```bash
cd your-project
npx nexgsd install
```

**Update later:**
```bash
npm update -g nexgsd
nexgsd update
```

### Option B: Git clone (manual)

<details>
<summary>Click to expand</summary>

```bash
git clone https://github.com/NexVar/NexGsd.git
```

**macOS / Linux / WSL:**
```bash
bash NexGsd/nexgsd-install.sh /path/to/your-project
```

**Windows (PowerShell):**
```powershell
# Use Git Bash
bash NexGsd/nexgsd-install.sh C:/Users/you/your-project

# Or manual copy
Copy-Item -Recurse NexGsd/.agent your-project/.agent
```

</details>

### Start building


**Step 1 — Plan your project:**
```
/nexgsd-new-project
```
It will ask you questions about what you want to build, research the domain, and create a structured project plan. No code is written at this stage.

**Step 2 — Build it autonomously:**
```
/nexgsd-super
```
After planning, run this to execute the entire project autonomously — plan, build, test, audit, and deploy. Walk away and get notified when it's done.

**Or skip planning and go full autonomous with a prompt:**
```
/nexgsd-super "Build a SaaS dashboard with auth, billing, and analytics"
```

**See all 39 commands:**
```
/nexgsd-help
```

> **Works with any AI coding tool.** For non-slash-command tools, just tell them: "Read `.agent/workflows/nexgsd-new-project.md` and follow the workflow."

### CLI Commands

```bash
nexgsd install [path]   # Install NexGsd to a project
nexgsd update [path]    # Update to latest version
nexgsd info             # Show agent/workflow counts
nexgsd --version        # Show version
nexgsd --help           # Show help
```

---

## Usage by Platform



```bash
cd your-project
/nexgsd-new-project          # Initialize project
/nexgsd-plan 1               # Plan phase 1
/nexgsd-execute 1            # Execute with atomic commits
/nexgsd-audit                # Full quality audit
/nexgsd-deploy               # Deploy to production
```

### GitHub Copilot CLI / OpenAI Codex CLI

The `.agent/` directory works as context files. Point the CLI to read them:

```bash
# Copilot CLI
copilot "Read .agent/workflows/nexgsd-new-project.md and follow the workflow to initialize this project"

# Codex CLI
codex "Follow the workflow in .agent/workflows/nexgsd-super.md to build: [your prompt]"
```

Add a `.github/copilot-instructions.md` referencing NexGsd:
```markdown
When I say /nexgsd-[command], read and follow .agent/workflows/nexgsd-[command].md
Available agents are in .agent/agents/
```

### Cursor / Windsurf / Cline / VS Code (IDE Agents)

1. Install NexGsd to your project: `./nexgsd-install.sh .`
2. Open your project in the IDE
3. Reference workflows in chat:
   - "Follow .agent/workflows/nexgsd-new-project.md to set up this project"
   - "Use the nexgsd-security-auditor agent to scan for vulnerabilities"
4. The IDE agent reads the `.agent/` files as context and follows the structured workflows

### Any LLM / Custom Setup

NexGsd agents and workflows are plain Markdown files. Any LLM that can read files and execute commands can use them:

```
System prompt: "You have access to a project management framework in .agent/.
Read .agent/workflows/nexgsd-help.md for available commands. When the user requests
a workflow, read and follow the corresponding .md file step by step."
```

---

## Default Workflow (The NexGsd Loop)

This is how most projects flow from idea to production:

```
┌─────────────────────────────────────────────────────────────┐
│                    THE NEXGSD LOOP                           │
│                                                              │
│  ┌──────────────┐                                           │
│  │ /nexgsd-new-project │  ← You describe what to build         │
│  └──────┬───────┘                                           │
│         │  Creates: PROJECT.md, REQUIREMENTS.md,            │
│         │  ROADMAP.md, STATE.md, nexgsd-config.json            │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /nexgsd-plan N  │  ← Research + create task plans           │
│  └──────┬───────┘                                           │
│         │  Creates: RESEARCH.md, PLAN.md files              │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /nexgsd-execute N│  ← Build with atomic commits             │
│  └──────┬───────┘                                           │
│         │  Creates: SUMMARY.md, VERIFICATION.md             │
│         │  Sends: push notification ✓                       │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /nexgsd-verify N│  ← User acceptance testing                │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ├── Pass? → Next phase (repeat from /nexgsd-plan N+1)  │
│         └── Gaps? → /nexgsd-plan N --gaps (fix and re-execute) │
│                                                              │
│  After all phases:                                           │
│  ┌──────────────┐                                           │
│  │ /nexgsd-audit   │  ← Security, performance, mobile, SEO,   │
│  └──────┬───────┘    accessibility, brand review             │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /nexgsd-deploy  │  ← Build, deploy, verify live URL         │
│  └──────────────┘                                           │
│                                                              │
│  SHORTCUT: /nexgsd-super does ALL of this autonomously         │
└─────────────────────────────────────────────────────────────┘
```

**For quick tasks** that don't need full project setup:
```
/nexgsd-quick "Add dark mode toggle to the navbar"
```

---

## Command Surface

### Core

| Command | What it does |
|---------|-------------|
| `/nexgsd-super [prompt]` | Full autonomy — prompt to production, zero human input |
| `/nexgsd-new-project` | Interactive setup: questions → research → requirements → roadmap → config |
| `/nexgsd-no-halluc [question]` | Verified Q&A with mandatory external research and citations |

### Build Cycle

| Command | What it does |
|---------|-------------|
| `/nexgsd-discuss [phase]` | Capture implementation decisions before planning |
| `/nexgsd-plan [phase]` | Research and create executable task plans |
| `/nexgsd-execute [phase]` | Execute plans with atomic git commits |
| `/nexgsd-verify [phase]` | User acceptance testing against phase goals |

### Quality & Review

| Command | What it does |
|---------|-------------|
| `/nexgsd-audit` | Full project audit — 6 agents in parallel |
| `/nexgsd-review [phase]` | PR-style code review with multi-agent analysis |
| `/nexgsd-refactor [desc]` | Safe refactoring with test snapshots + auto-rollback |

### Operations

| Command | What it does |
|---------|-------------|
| `/nexgsd-deploy` | Build → deploy → verify (CF Pages / Vercel / Netlify) |
| `/nexgsd-migrate [desc]` | DB migration with safety gates + rollback SQL |
| `/nexgsd-setup-config` | Configure ntfy, deploy platform, Supabase, tests |

### Utilities

| Command | What it does |
|---------|-------------|
| `/nexgsd-quick [desc]` | Small ad-hoc task with NexGsd guarantees |
| `/nexgsd-progress` | Current state, blockers, next steps |
| `/nexgsd-commit-memory` | Distill context into long-term memory |
| `/nexgsd-help` | Show all commands |

### Brownfield & Milestones

| Command | What it does |
|---------|-------------|
| `/nexgsd-map-codebase` | Build a real codebase map before planning existing projects |
| `/nexgsd-new-milestone` | Start the next milestone on an existing project |
| `/nexgsd-audit-milestone` | Verify milestone-wide requirement coverage and integration |
| `/nexgsd-complete-milestone` | Archive a shipped milestone and prepare the next cycle |
| `/nexgsd-plan-milestone-gaps` | Turn milestone audit gaps into roadmap work |

### Continuity & Maintenance

| Command | What it does |
|---------|-------------|
| `/nexgsd-debug [issue]` | Start or resume a structured debug session |
| `/nexgsd-pause-work` | Save a precise handoff for the next session |
| `/nexgsd-resume-work` | Restore project context and route to the next step |
| `/nexgsd-add-todo` | Capture follow-up work without losing context |
| `/nexgsd-check-todos` | Review pending todos and route them into action |
| `/nexgsd-health` | Validate `.planning/` integrity and repair safe issues |
| `/nexgsd-update` | Update a NexGsd clone or explain reinstall path |
| `/nexgsd-settings` | Inspect or update NexGsd project settings |
| `/nexgsd-set-profile` | Set the preferred model profile |
| `/nexgsd-research-phase` | Run standalone phase research before planning |
| `/nexgsd-add-phase` | Append a new roadmap phase |
| `/nexgsd-insert-phase` | Insert an urgent decimal phase |
| `/nexgsd-remove-phase` | Remove an unstarted future phase |
| `/nexgsd-add-tests` | Add or strengthen tests for an area or phase |
| `/nexgsd-reapply-patches` | Reapply locally saved patch overlays after updates |

---

## All Agents (18)

### Planning & Execution

| Agent | What it does |
|-------|-------------|
| `nexgsd-executor` | Executes plans with atomic commits, deviation handling, checkpoints |
| `nexgsd-planner` | Creates task plans with dependency analysis and wave ordering |
| `nexgsd-roadmapper` | Creates phased project roadmaps from requirements |
| `nexgsd-phase-researcher` | Researches implementation approach before planning |
| `nexgsd-project-researcher` | Researches domain, stack, ecosystem before roadmap |
| `nexgsd-research-synthesizer` | Merges parallel research outputs into actionable summaries |

### Verification

| Agent | What it does |
|-------|-------------|
| `nexgsd-verifier` | Goal-backward verification — did the code deliver what was promised? |
| `nexgsd-plan-checker` | Pre-execution plan quality check |
| `nexgsd-integration-checker` | Cross-phase integration and E2E flow verification |
| `nexgsd-debugger` | Scientific method bug investigation with hypothesis testing |
| `nexgsd-codebase-mapper` | Explores and documents codebase structure |

### Quality Auditors

| Agent | What it does |
|-------|-------------|
| `nexgsd-security-auditor` | OWASP top 10, dependency audit, secrets detection, CSP |
| `nexgsd-performance-tester` | Lighthouse, bundle size, lazy loading, render performance |
| `nexgsd-mobile-auditor` | Responsive design, touch targets, viewport, overflow |
| `nexgsd-seo-checker` | Metadata, sitemap, structured data, hreflang, headings |
| `nexgsd-accessibility-tester` | WCAG 2.2 AA, ARIA, keyboard nav, contrast, focus |
| `nexgsd-brand-reviewer` | Brand consistency, copy quality, design system, typography |

### Infrastructure

| Agent | What it does |
|-------|-------------|
| `nexgsd-notifier` | Push notifications via ntfy.sh at milestones |

---

## Anti-Hallucination System

The #1 problem with AI coding: it says it did something but didn't actually do it. NexGsd has 8 structural safeguards:

| Protection | How |
|------------|-----|
| **File-First Context** | Always re-reads files before acting — never trusts memory |
| **Source Verification** | Technical claims verified against docs, not training data |
| **Confidence Levels** | Research tagged `HIGH` (verified) / `MEDIUM` (searched) / `LOW` (memory) |
| **Verification Gates** | Every task output is READ — not assumed to pass |
| **No Auto-Pass** | Build/test results never marked passed without actual output |
| **Decision Attribution** | Tracks `USER-decided` vs `AI-suggested` for audit trail |
| **Context Freshness** | New conversation recommended between workflow steps |
| **Checkpoint Integrity** | Waits for human approval — never skips confirmation |

---

## Push Notifications

Configure during `/nexgsd-new-project` or `/nexgsd-setup-config`:

```
"Want push notifications?" → yes
"ntfy channel name?" → my-project-alerts
```

You'll get notified on your phone when:
- A phase completes
- Deploy succeeds or fails
- Audit finds critical issues
- Errors block execution

Uses <a href="https://ntfy.sh" target="_blank" rel="noreferrer">ntfy.sh</a> — free, open-source, no account needed.

---

## File Structure

```
your-project/
├── .agent/                          ← NexGsd system (copied by install)
│   ├── agents/                      ← 18 specialized agents
│   │   ├── nexgsd-executor.md
│   │   ├── nexgsd-planner.md
│   │   ├── nexgsd-security-auditor.md
│   │   └── ... (18 total)
│   └── workflows/                   ← 39 workflows
│       ├── nexgsd-new-project.md
│       ├── nexgsd-super.md
│       ├── nexgsd-audit.md
│       └── ... (39 total)
│
└── .planning/                       ← Project state (created by nexgsd-new-project)
    ├── PROJECT.md                   ← Vision and context
    ├── REQUIREMENTS.md              ← v1/v2 requirements
    ├── ROADMAP.md                   ← Phases and progress
    ├── STATE.md                     ← Current position (living memory)
    ├── nexgsd-config.json              ← Settings (ntfy, deploy, tests)
    ├── research/                    ← Domain research
    └── phases/
        └── 01-phase-name/
            ├── 01-01-PLAN.md        ← Task plan
            ├── 01-01-SUMMARY.md     ← Execution summary
            ├── 01-VERIFICATION.md   ← Goal verification
            ├── SECURITY-AUDIT.md    ← Security report
            ├── PERFORMANCE-REPORT.md
            ├── MOBILE-AUDIT.md
            ├── SEO-REPORT.md
            ├── ACCESSIBILITY-REPORT.md
            ├── BRAND-REVIEW.md
            └── AUDIT.md             ← Unified audit
```

---

## Real-World Example

This system was built while shipping real production projects:

- **<a href="https://nexvar.io" target="_blank" rel="noreferrer">NexVar.io</a>** — AI-first software studio site (Next.js 16, i18n, AI chatbot, newsletter, blog CMS)
- **Vault** — Personal finance tracker (Supabase, multi-currency, AI assistant, real-time rates)

Every agent and workflow exists because it was needed during real development. Read more at <a href="https://mertdlkr.com" target="_blank" rel="noreferrer">mertdlkr.com</a>.

---

## Requirements

**Required:**
- Git

**Optional:**
- Node.js 18+ (for web projects)
- <a href="https://ntfy.sh" target="_blank" rel="noreferrer">ntfy</a> app (push notifications)
- Supabase / Prisma (database features)
- Cloudflare / Vercel / Netlify (deployment)

---

## Model Compatibility

NexGsd works with any LLM:

| Model | Status |
|-------|--------|
| GPT / Codex (OpenAI) | Compatible |
| Gemini (Google) | Compatible |
| Llama / Mistral / DeepSeek | Compatible |

Model-agnostic by design — uses structural safeguards (file reads, command verification, user gates) instead of model-specific prompting.

---

## Contributing

PRs welcome. If you add a new agent or workflow, follow the existing format in `.agent/agents/` and `.agent/workflows/`.

---

## Built By

### <a href="https://nexvar.io" target="_blank" rel="noreferrer">NexVar</a>

AI-first software studio shipping production tooling, AI platforms, and developer infrastructure. NexGsd is the execution framework we use internally on every project we ship.

<a href="https://nexvar.io" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/nexvar.io-000?style=flat&amp;logo=safari&amp;logoColor=white" alt="Website"></a>
<a href="https://github.com/NexVar" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/NexVar-181717?style=flat&amp;logo=github&amp;logoColor=white" alt="GitHub"></a>

### <a href="https://mertdlkr.com" target="_blank" rel="noreferrer">Mert Ali Dalkır</a>

Creator and maintainer. Co-founder of NexVar. AI-first builder making AI-powered development faster, more reliable, and more structured.

<a href="https://mertdlkr.com" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mertdlkr.com-000?style=flat&amp;logo=safari&amp;logoColor=white" alt="Website"></a>
<a href="https://x.com/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/@mertdlkr-000?style=flat&amp;logo=x&amp;logoColor=white" alt="X"></a>
<a href="https://www.linkedin.com/in/mertdlkr/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mertdlkr-0A66C2?style=flat&amp;logo=linkedin&amp;logoColor=white" alt="LinkedIn"></a>
<a href="https://github.com/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mertdlkr-181717?style=flat&amp;logo=github&amp;logoColor=white" alt="GitHub"></a>
<a href="https://medium.com/@mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/@mertdlkr-000?style=flat&amp;logo=medium&amp;logoColor=white" alt="Medium"></a>
<a href="https://t.me/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/@mertdlkr-26A5E4?style=flat&amp;logo=telegram&amp;logoColor=white" alt="Telegram"></a>
<a href="https://instagram.com/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/@mertdlkr-E4405F?style=flat&amp;logo=instagram&amp;logoColor=white" alt="Instagram"></a>
<a href="https://kaggle.com/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mertdlkr-20BEFF?style=flat&amp;logo=kaggle&amp;logoColor=white" alt="Kaggle"></a>

---

## License

MIT © <a href="https://nexvar.io" target="_blank" rel="noreferrer">NexVar</a> and <a href="https://mertdlkr.com" target="_blank" rel="noreferrer">Mert Ali Dalkır</a>

---

**If NexGsd saves you time, give it a star.** It helps others find it.

Built with conviction at <a href="https://nexvar.io" target="_blank" rel="noreferrer">nexvar.io</a> and <a href="https://mertdlkr.com" target="_blank" rel="noreferrer">mertdlkr.com</a>.

<!--
Keywords for discoverability (LLM indexing, GitHub search, npm search):
multi-agent system, structured ai development, ai coding workflow, llm project planning,
ai code review, ai security audit, anti-hallucination, context management,
phased execution, atomic commits, ai deployment automation, cursor agents,
copilot custom agents, codex agents, windsurf agents, cline agents, antigravity agents,
ai software development, prompt to production, ai-powered development,
nexgsd, nexgsd, get shit done, ai coding assistant, ai project execution,
autonomous build, ai audit, ai deploy, ai testing, ai qa, ai devops,
project scaffolding, ai planning, ai requirements, ai roadmap,
npm ai framework, npx nexgsd, nexgsd install, nexgsd super,
vibe coding, ai first development, structured execution
-->
