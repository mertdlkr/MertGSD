# MertGSD Roadmap

Owner direction for this roadmap:

- Brand everything clearly as `MertGSD`
- Minimize confusion between old gsd-* and new mertgsd-*
- Make the repo operational end-to-end
- Make installation and machine-wide integrations reliable
- Close legacy gsd-* gaps in MertGSD style, not as a raw copy

## Phase 1: Brand Unification

Goal: eliminate ambiguous gsd-* file naming inside the repo and move to mertgsd-* naming where it improves branding and reduces confusion.

Scope:

- Rename workflow files from gsd-* to mertgsd-*
- Rename agent files from gsd-* to mertgsd-*
- Rename internal config references like `gsd-config.json` to `mertgsd-config.json`
- Update all mentions, links, `@` references, file examples, install docs, and platform examples
- Keep the system operational after renaming

Success criteria:

- No broken internal file references remain
- README, installer, workflows, agents, templates, and references all point to the new names consistently
- The repo has one clear naming language: `MertGSD`

## Phase 2: Workflow Surface Completion

Goal: restore missing high-value capabilities from legacy GSD in MertGSD's own tone and structure.

Priority additions:

- `mertgsd-map-codebase`
- `mertgsd-health`
- `mertgsd-update`
- `mertgsd-new-milestone`
- `mertgsd-complete-milestone`
- `mertgsd-audit-milestone`
- `mertgsd-pause-work`
- `mertgsd-resume-work`
- `mertgsd-add-todo`
- `mertgsd-check-todos`
- `mertgsd-debug`
- `mertgsd-list-phase-assumptions`
- `mertgsd-plan-milestone-gaps`

Success criteria:

- Missing workflows are available as repo-native workflow files
- Existing templates that referenced missing workflows become valid again
- The framework is stronger than legacy MertGSD on both execution and project operations

## Phase 3: Documentation And Internal Consistency

Goal: make the repo readable, coherent, and trustworthy from first read to daily usage.

Scope:

- Align README with actual repo surface
- Fix command counts and agent counts
- Remove stale /gsd- syntax where no longer valid
- Remove stale tool-specific references that no longer match the current repo
- Ensure templates and references do not mention nonexistent files or commands

Success criteria:

- A new user can follow README without hitting dead ends
- All documented commands exist
- All documented file names exist

## Phase 4: Installer And Machine-Wide Integration

Goal: make MertGSD easy to install and usable across the machine, not just in a single CLI.

Scope:

- Verify and harden `mertgsd-install.sh`
- Ensure local project install remains simple
- Check whether a global `mertgsd-install` command should exist and, if so, make its setup explicit and reproducible
- Verify update behavior against GitHub state

Success criteria:

- Install path works cleanly in practice
- Repo can be integrated globally without hidden manual steps
- Update mechanism is clear, predictable, and safe

## Phase 5: Validation Pass

Goal: run a repo-wide operational sanity pass after all changes.

Scope:

- Re-scan all files for stale gsd-* references that should now be mertgsd-*
- Re-check installer output and referenced paths
- Re-check README examples against actual file names

Success criteria:

- No obvious broken references remain
- Repo is internally consistent
- Brand language is unified

## Immediate Execution Order

1. Complete Phase 1 brand rename safely
2. Fix broken references introduced by rename
3. Restore missing workflows from Phase 2
4. Align docs and templates
5. Validate install and machine-wide integrations
