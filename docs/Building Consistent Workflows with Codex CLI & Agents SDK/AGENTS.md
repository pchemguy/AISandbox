---
name: AGENTS.md
---

## Mandatory Project Discovery Steps

Before writing, modifying, or deleting **any** files, the agent must:

1. Read and operationalize the following files (if present):
    - `AGENTS.md` (this file)
    - `README.md`
    - `DEV_STRATEGY.md`
    - `PROJECT.md`
    - `AGENT_TASKS_TEMPLATE.md`
2. Discover available skills:
    - Enumerate `.agent/skills/`

**If required files are inaccessible** → agent must stop further task processing, output "BLOCKED" + list missing artifacts.
