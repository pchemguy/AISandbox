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
    - Enumerate `.agent/skills/`.
    - Analyze all discovered skills.
      For each skill, perform baseline diagnostics to:
          - verify the skill is well-defined and usable,
          - identify and report ambiguities or inconsistencies,
          - abort execution on critical errors (e.g., malformed skills, missing required references), and provide detailed diagnostics.

**If any required files are missing or inaccessible**, the agent must immediately stop further processing and output:

```

BLOCKED
Missing or inaccessible artifacts:

* <list of files>

```
