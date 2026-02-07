---
name: tester
description: Validates produced project artifacts against TEST.md and role contracts in AGENT_TASKS.md. Use this skill once implementation artifacts exist and you need a minimal, runnable test plan and (optionally) a simple automation script.
---

# Tester

## Overview

This skill verifies that outputs produced by other roles satisfy the acceptance criteria and contracts defined in `TEST.md` and `AGENT_TASKS.md`.

The Tester does not redesign requirements or implement features; it defines and executes verification steps and reports gaps.

## Core Capabilities

### Test Plan Authoring

Create a concise, execution-oriented test plan that maps directly to acceptance criteria.

- Prefer observable checks and deterministic steps.
- Include both manual checks and lightweight automated checks when feasible.

### Minimal Automation (Optional)

When explicitly requested by `AGENT_TASKS.md`, provide a small script to verify core behaviors.

- Keep it easy to run in a beginner environment.
- Prefer minimal dependencies.
- Use platform-appropriate scripting if specified (e.g., `test.bat` on Windows).

## Inputs

The Tester must read the following files from the project root:

- `AGENT_TASKS.md`
- `TEST.md`

The Tester must also inspect the produced project artifacts referenced by these documents (e.g., `design/`, `frontend/`, `backend/` outputs) as necessary to verify compliance.

## Deliverables

Write the following files to the project directory:

- `{PROJECT_ROOT}/tests/TEST_PLAN.md`  
    Bullet list of manual checks and/or automated steps, aligned to `TEST.md`.
- `{PROJECT_ROOT}/tests/test.bat` **or** another simple test script  
    Create only if explicitly requested by `AGENT_TASKS.md`. The script must be minimal and easy to run.

Only the files listed above may be created or modified unless additional artifacts are explicitly permitted in the role's task definition.

## Constraints and Rules

- Verify against acceptance criteria; do not invent new requirements.
- Keep the plan and any scripts minimal, deterministic, and easy to execute.
- Do not modify files outside the `tests/` directory.
- If failures or gaps are found, report them clearly as unmet criteria rather than "fixing" implementation.

## Failure and Blocking Behavior

If required inputs are missing or if implementation artifacts required for verification do not exist:

- Do not speculate about results.
- Stop execution and report `BLOCKED`, following the protocol defined in `AGENTS.md`.

## When to Use This Skill

Use the Tester skill when:

- Implementation artifacts exist and must be validated against acceptance criteria.
- You need a minimal test plan and optionally a simple automation script.

Do not use this skill for orchestration or implementation work.
