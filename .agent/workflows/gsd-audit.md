---
description: Full project audit spawning parallel agents for security, performance, mobile, SEO, accessibility, and brand
---

# GSD Audit — Full Project Audit with Parallel Agents

Run a comprehensive project audit by spawning multiple specialist agents in parallel. Covers security, performance, mobile, SEO, accessibility, and brand consistency. Collects all reports into a unified AUDIT.md with prioritized findings and action items.

> **ANTI-HALLUCINATION PROTOCOL -- ACTIVE IN THIS WORKFLOW**
> Audit findings must be based on ACTUAL code analysis, not assumptions. Every finding MUST cite the exact file and line. Do NOT fabricate audit results to appear thorough. Do NOT claim "no issues" in a category without having actually checked. If a tool is unavailable, say so -- do not simulate its output.

## Arguments

The user may specify which audits to run or a scope:
- `/gsd-audit` -- run all audits
- `/gsd-audit security performance` -- run only specified audits
- `/gsd-audit src/` -- audit specific directory

If no argument provided, run all audit categories.

## Multi-Model Safeguard: Audit Integrity

**MANDATORY -- regardless of which AI model is running:**

```
AUDIT RULES:
1. Re-read STATE.md and ROADMAP.md -- understand the project
2. Every finding must cite EXACT file path and line number
3. Do NOT invent findings to appear thorough
4. Do NOT suppress findings to appear clean
5. If a tool is unavailable, report "NOT AUDITED" -- do NOT fake results
6. Severity must match real impact -- critical means real risk of exploit/outage

WARNING: A clean audit that missed real issues is worse than no audit.
Be thorough. Be honest. Cite evidence.
```

## Steps

### 1. Validate Project

**Actually read** (not recall) `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/`:** "No GSD project found. Run /gsd-new-project first."

Determine audit scope:
```bash
# Understand the project structure
find . -maxdepth 2 -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.html" \) | head -50

# Count source files
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/dist/*" | wc -l

# Check for configuration files
ls package.json tsconfig.json next.config.* nuxt.config.* vite.config.* 2>/dev/null
```

Display:
```
+--------------------------------------------------+
| GSD > FULL PROJECT AUDIT                         |
+--------------------------------------------------+

Project:    [name from ROADMAP.md]
Phase:      [current phase from STATE.md]
Source files: [count]
Scope:      [All / specified categories]

Spawning audit agents...
```

### 2. Determine Audit Categories

Based on arguments and project type, select which audits to run:

| Category | Agent | Condition |
|----------|-------|-----------|
| Security | security-auditor | Always |
| Performance | performance-tester | Always |
| Mobile | mobile-auditor | If project has UI (React, Vue, HTML) |
| SEO | seo-checker | If project has public pages |
| Accessibility | accessibility-tester | If project has UI |
| Brand | brand-reviewer | If brand guidelines exist in `.planning/` |

**If a category is not applicable:** Note it as "N/A -- [reason]" and skip.

### 3. Security Audit

Perform a thorough security review of the codebase:

**3a. Secrets scan:**
```bash
# Check for hardcoded secrets
grep -rn --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.env*" -iE "(api_key|apikey|secret|password|token|private_key|aws_access|database_url)\s*[:=]\s*['\"][^'\"]{8,}" . --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null
```

**3b. Dependency vulnerabilities:**
```bash
npm audit --json 2>/dev/null
```

**3c. Code-level security review:**
For each source file, check for:
- SQL injection (string concatenation in queries)
- XSS (dangerouslySetInnerHTML, unescaped output)
- Command injection (exec, spawn with user input)
- Path traversal (user input in file paths)
- Insecure randomness (Math.random for security)
- Missing auth checks on API routes
- CORS misconfiguration
- Insecure cookie settings
- Exposed error details in production

**3d. Environment and config:**
```bash
# Check .gitignore for sensitive files
cat .gitignore 2>/dev/null | grep -iE "(env|secret|key|credential)"

# Check if .env files are committed
git ls-files | grep -iE "\.env"
```

Record all findings with file, line, severity, and description.

### 4. Performance Audit

**4a. Bundle analysis (if applicable):**
```bash
# Check bundle size
npm run build 2>&1 | tail -30

# Look for large dependencies
cat package.json | grep -E "dependencies|devDependencies" -A 50
```

**4b. Code-level performance review:**
For source files, check for:
- N+1 database queries (queries in loops)
- Missing pagination on list endpoints
- Unbounded data fetching
- Missing memoization (React.memo, useMemo, useCallback)
- Synchronous operations that should be async
- Memory leaks (event listeners, intervals, subscriptions not cleaned up)
- Unnecessary re-renders (object/array literals in JSX props)
- Large component files that should be split
- Missing lazy loading for routes/components
- Unoptimized images (no next/image, no srcset, no lazy)

**4c. Build configuration:**
```bash
# Check for source maps in production
grep -rn "sourcemap\|source-map\|devtool" *.config.* 2>/dev/null

# Check for tree shaking configuration
grep -rn "sideEffects\|treeshake" package.json *.config.* 2>/dev/null
```

Record all findings with file, line, severity, and description.

### 5. Mobile Audit

**Skip if project has no UI.**

Review mobile responsiveness and usability:
- Missing viewport meta tag
- Fixed widths that break on mobile (hardcoded px widths)
- Horizontal scroll issues (elements wider than viewport)
- Touch target sizes (buttons/links smaller than 44x44px)
- Missing responsive breakpoints
- Text too small on mobile (font-size < 16px without scaling)
- Missing mobile navigation pattern
- Unresponsive tables or forms
- Images without responsive sizing

```bash
# Check for viewport meta tag
grep -rn "viewport" --include="*.html" --include="*.tsx" --include="*.jsx" . --exclude-dir=node_modules 2>/dev/null

# Check for responsive utilities/breakpoints
grep -rn "@media\|useMediaQuery\|breakpoint" --include="*.css" --include="*.scss" --include="*.ts" --include="*.tsx" . --exclude-dir=node_modules 2>/dev/null | head -20
```

Record all findings with file, line, severity, and description.

### 6. SEO Audit

**Skip if project has no public pages.**

Check SEO fundamentals:
- Missing or duplicate title tags
- Missing meta descriptions
- Missing Open Graph tags
- Missing canonical URLs
- Missing sitemap.xml
- Missing robots.txt
- Missing alt text on images
- Missing semantic HTML (h1-h6 hierarchy)
- Missing structured data (JSON-LD)
- Client-side only rendering without SSR/SSG for public pages

```bash
# Check for SEO meta tags
grep -rn "<title\|<meta.*description\|og:title\|og:description" --include="*.html" --include="*.tsx" --include="*.jsx" . --exclude-dir=node_modules 2>/dev/null

# Check for sitemap and robots
ls public/sitemap.xml public/robots.txt 2>/dev/null

# Check for alt attributes on images
grep -rn "<img\|<Image" --include="*.tsx" --include="*.jsx" --include="*.html" . --exclude-dir=node_modules 2>/dev/null | grep -v "alt=" | head -10
```

Record all findings with file, line, severity, and description.

### 7. Accessibility Audit

**Skip if project has no UI.**

Check accessibility standards (WCAG 2.1):
- Missing alt text on images
- Missing ARIA labels on interactive elements
- Missing form labels
- Insufficient color contrast references
- Missing keyboard navigation support
- Missing focus indicators
- Missing skip navigation link
- Missing lang attribute on html element
- Non-semantic use of div/span for interactive elements
- Missing heading hierarchy

```bash
# Check for aria attributes usage
grep -rn "aria-\|role=" --include="*.tsx" --include="*.jsx" --include="*.html" . --exclude-dir=node_modules 2>/dev/null | wc -l

# Check for form labels
grep -rn "<input\|<select\|<textarea" --include="*.tsx" --include="*.jsx" . --exclude-dir=node_modules 2>/dev/null | grep -v "aria-label\|id=.*label" | head -10

# Check for onClick on non-button elements
grep -rn "onClick" --include="*.tsx" --include="*.jsx" . --exclude-dir=node_modules 2>/dev/null | grep -v "<button\|<a \|<Button\|<Link" | head -10
```

Record all findings with file, line, severity, and description.

### 8. Brand Audit

**Skip if no brand guidelines exist.**

Check for brand consistency:
```bash
# Look for brand guidelines
find .planning/ -iname "*brand*" -o -iname "*style*" -o -iname "*design*" 2>/dev/null
```

**If brand guidelines found, read them and check:**
- Color values match brand palette (no rogue hex values)
- Typography matches brand fonts
- Spacing follows the design system
- Component usage follows design system
- Copy tone matches brand voice

**If no brand guidelines:** Note "No brand guidelines found -- brand audit skipped."

### 9. Compile AUDIT.md

Collect all findings and prioritize by severity:

**Severity definitions:**
| Severity | Definition | Examples |
|----------|-----------|---------|
| Critical | Immediate risk of exploit, data loss, or outage | SQL injection, exposed secrets, auth bypass |
| High | Significant issue affecting users or security | XSS, missing auth, N+1 queries on main pages |
| Medium | Should be fixed but not urgent | Missing alt text, hardcoded values, minor perf |
| Low | Nice to have, best practice | Code style, minor a11y, SEO improvements |

Create `.planning/AUDIT.md`:

```markdown
# Project Audit Report

**Date:** [date]
**Project:** [name from ROADMAP.md]
**Phase:** [current phase]
**Audited by:** GSD Automated Audit

## Executive Summary

[2-3 sentences: overall project health assessment]

**Overall Score:** [Critical issues count] critical, [High] high, [Medium] medium, [Low] low

## Findings by Severity

### Critical ([count])
[List each critical finding with file:line and brief description, or "None"]

### High ([count])
[List each high finding with file:line and brief description, or "None"]

### Medium ([count])
[List each medium finding with file:line and brief description, or "None"]

### Low ([count])
[List each low finding with file:line and brief description, or "None"]

## Audit Categories

### Security Audit
**Status:** Audited | Not Audited
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### Performance Audit
**Status:** Audited | Not Audited
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### Mobile Audit
**Status:** Audited | Not Audited | N/A
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### SEO Audit
**Status:** Audited | Not Audited | N/A
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### Accessibility Audit
**Status:** Audited | Not Audited | N/A
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

### Brand Audit
**Status:** Audited | Not Audited | N/A
**Findings:** [count]

| # | Severity | File | Line | Finding | Recommendation |
|---|----------|------|------|---------|----------------|
| 1 | [sev] | [path] | [line] | [issue] | [fix] |

## Action Items

Prioritized list of fixes, ordered by severity then effort:

| Priority | Severity | Category | Action | Files | Effort |
|----------|----------|----------|--------|-------|--------|
| 1 | Critical | Security | [what to do] | [files] | [S/M/L] |
| 2 | Critical | Security | [what to do] | [files] | [S/M/L] |
| 3 | High | Performance | [what to do] | [files] | [S/M/L] |

## Categories Not Audited
[List any categories that were skipped and why]

---
*Audited: [date]*
```

### 10. Git Commit

```bash
git add .planning/AUDIT.md
git commit -m "audit: full project audit — [critical] critical, [high] high, [medium] medium, [low] low"
```

### 11. Update STATE.md

**Read and then update** `.planning/STATE.md`:

Add to Audits section (create if not exists):

```markdown
### Audits

| Date | Scope | Critical | High | Medium | Low | Report |
|------|-------|----------|------|--------|-----|--------|
| [date] | Full | [count] | [count] | [count] | [count] | AUDIT.md |
```

Update last activity line.

```bash
git add .planning/STATE.md
git commit -m "docs: update STATE.md with audit results"
```

### 12. Completion

**If no critical issues:**
```
+--------------------------------------------------+
| GSD > AUDIT COMPLETE                             |
+--------------------------------------------------+

Project:  [name]
Findings: [critical] critical, [high] high, [medium] medium, [low] low
Report:   .planning/AUDIT.md

Categories Audited:
  [x] Security      — [count] findings
  [x] Performance   — [count] findings
  [x] Mobile        — [count] findings
  [x] SEO           — [count] findings
  [x] Accessibility — [count] findings
  [x] Brand         — [count] findings

Action items: [total count] (see AUDIT.md)

## > Next Up

/gsd-quick [action item]  -> Fix a specific finding
/gsd-plan [N]             -> Plan fixes into next phase
```

**If critical issues found:**
```
+--------------------------------------------------+
| GSD > AUDIT COMPLETE -- CRITICAL ISSUES FOUND    |
+--------------------------------------------------+

!! [count] CRITICAL ISSUES REQUIRE IMMEDIATE ATTENTION !!

[List each critical issue briefly]

Full report: .planning/AUDIT.md

These issues should be fixed before any new feature work.

## > Next Up

/gsd-quick [critical fix]  -> Fix critical issue immediately
/gsd-review                -> Review after fixes applied
```
