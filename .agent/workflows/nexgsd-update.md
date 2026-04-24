---
description: Update a NexGsd clone or explain how to refresh copied project installs
---

# NexGsd Update

Update NexGsd safely.

## Intent

There are two real install modes:

1. A git clone of the NexGsd repo
2. A project-local copied `.agent/` install created by `nexgsd-install`

Detect which one you are in before acting.

## If This Is A Git Clone

1. Check current branch and worktree cleanliness.
2. Fetch `origin`.
3. Compare local HEAD with `origin/main`.
4. If already current, say so clearly.
5. If updates exist, show a concise commit summary of what changed.
6. Ask for confirmation before pulling.
7. Use fast-forward update only.

## If This Is A Project Copy

Do not pretend git update is possible.

Instead:

1. Tell the user this project contains a copied NexGsd install.
2. Ask where the canonical NexGsd repo lives.
3. Instruct or perform:
   - update the source repo
   - rerun `nexgsd-install`
4. Re-check that `.agent/workflows/` and `.agent/agents/` match the new install.

## Output

Report:

- install mode detected
- current revision
- latest revision if available
- whether update was applied
- whether reinstall was needed
