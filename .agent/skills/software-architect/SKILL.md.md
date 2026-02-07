---
name: software-architect
description: Analyzes project description to derive an executable, role-aligned development specification. Use this skill to translate a high-level project definition and component breakdown into concrete requirements, per-role task contracts, and acceptance criteria for downstream skills.
---

# Software Architect

## Overview

This skill translates a high-level project definition (`PROJECT.md`) into a minimal set of precise, file-based specifications that define what the system will build and how each role-specific skill should operate.

The Software Architect is responsible for requirements synthesis and task decomposition, not for workflow orchestration or implementation.

## Core Capabilities

### 1. Requirements Synthesis

Derive an implementation-ready requirements specification from the project description.

- Identify product goals, intended users, scope boundaries, and constraints.
- Incorporate all preferences and constraints defined in `PROJECT.md`.
- Record any required assumptions explicitly and conservatively.

**Output:**

- `{PROJECT_ROOT}/REQUIREMENTS.md`

### 2. Role and Task Decomposition

Analyze the component/role definitions provided in `PROJECT.md` and derive a concrete task specification for each role.

- Extract the list of roles from `PROJECT.md`, skipping the **Architect** role, if included.
- For every non-Architect role:
    - extract from `PROJECT.md`
        - objective,
        - input/output artifacts:
            - include in corresponding sections of `AGENT_TASKS.md`,
            - treat as **non-negotiable task contracts**,
            - allow additional artifacts to be created **inside role’s subdir** to support execution,
            - never remove or replace these outputs.
    - create a dedicated task section that defines:
        - the role's objective in this project,
        - required deliverables with exact file names and purpose,
        - key technical notes and constraints necessary to avoid guesswork.

Task definitions must be role-aligned and executable in isolation, based solely on declared file inputs.

**Output:**

- `{PROJECT_ROOT}/AGENT_TASKS.md`
    - Use `{PROJECT_ROOT}/AGENT_TASKS_TEMPLATE.md`, extending it as necessary.

### 3. Acceptance Criteria Definition

Define how the outputs of each role will be evaluated for correctness and completeness.

- Decompose requirements into observable, verifiable checks.
- Associate checks with role ownership where appropriate.
- Include specific checks for presence of each output artifact specified in `PROJECT.md` and extracted per instructions in the previous section.
- Focus on outcomes and externally visible behavior rather than implementation strategy.

**Output:**

- `{PROJECT_ROOT}/TEST.md`

## Inputs

The Software Architect must read the following files from the project root:

- `AGENTS.md`
- `DEV_STRATEGY.md`
- `PROJECT.md`
- `AGENT_TASKS_TEMPLATE.md`
- `README.md` (if present)

These files constitute the complete and authoritative input context.

## Deliverables

Write the following files to the project root:

- `REQUIREMENTS.md`
- `AGENT_TASKS.md`
- `TEST.md`

No other files or directories may be created or modified by this skill.

## Constraints and Rules

- Do not define workflow order, execution phases, or orchestration logic.
- Do not create tasks for the Architect role.
- Do not introduce roles, components, or features not present in `PROJECT.md`.
- Do not create folders or write outside the project root.
- Resolve ambiguities only when necessary, using minimal and reasonable assumptions.
- All assumptions must be explicitly recorded in `REQUIREMENTS.md`.

## Failure and Blocking Behavior

If `PROJECT.md` is missing, incomplete, internally inconsistent, or insufficient to derive executable tasks:

- Do not speculate or invent requirements.
- Identify the blocking issues explicitly.
- Stop execution and report `BLOCKED`, following the protocol defined in `AGENTS.md`.

## When to Use This Skill

Use the Software Architect skill when:

- Initializing a new project from `PROJECT.md`.
- Updating task definitions or requirements after changes to project scope or components.
- Downstream skills require clarified, role-aligned task contracts and acceptance criteria.

Do not use this skill for orchestration, implementation, or testing activities.
