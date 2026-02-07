---
name: frontend
description: Implements the client-side structure, styling, and behavior of the application exactly as specified by the design and task definitions. Use this skill when project defines Frontend (Developer) role, UI/UX specifications are finalized and frontend artifacts are required.
---

# Frontend Developer

## Overview

This skill implements the frontend of the project by translating approved UI/UX specifications into concrete, runnable client-side artifacts.

The Frontend Developer is responsible for faithful implementation, not design decisions, feature expansion, or workflow control.

## Core Capabilities

### Frontend Implementation

Produce the HTML, CSS, and JavaScript required to realize the specified interface and behavior.

- Implement the DOM structure as defined in the design specification.
- Implement interactions and logic exactly as described.
- Respect any integration points or API contracts specified in the task definitions.

### Styling Application

Apply styling according to the design specification.

- Use inline styles or a separate stylesheet only as specified in `AGENT_TASKS.md`.
- Avoid visual embellishments not required by the design.

## Inputs

The Frontend Developer must read the following files from the project root:

- `AGENT_TASKS.md`
- `REQUIREMENTS.md`
- `{PROJECT_ROOT}/design/design_spec.md`

These files are the sole source of truth. No assumptions may be made beyond their contents.

## Deliverables

Write the following files to the project directory:

- `{PROJECT_ROOT}/frontend/index.html`  
    Main page structure and DOM layout.
- `{PROJECT_ROOT}/frontend/styles.css` **or** inline styles  
    Styling as specified in `AGENT_TASKS.md` or the design specification.
- `{PROJECT_ROOT}/frontend/main.js` **or** `{PROJECT_ROOT}/frontend/game.js`  
    Client-side logic as specified in `AGENT_TASKS.md`.

Only the files listed above may be created or modified unless additional artifacts are explicitly permitted in the role's task definition.

## Constraints and Rules

- Implement exactly what is specified; do not add features, behaviors, or branding.
- Follow the Designer's DOM structure and layout conventions precisely.
- Adhere to integration points and data contracts defined in `AGENT_TASKS.md` and `REQUIREMENTS.md`.
- Prefer simple, readable, beginner-friendly code.
- Do not modify files outside the `frontend/` directory.

## Failure and Blocking Behavior

If required inputs are missing, inconsistent, or insufficient to implement the frontend:

- Do not speculate or invent behavior.
- Stop execution and report `BLOCKED`, following the protocol defined in `AGENTS.md`.

## When to Use This Skill

Use the Frontend skill when:

- UI/UX design artifacts have been produced and approved.
- The project requires client-side implementation of layout and behavior.

Do not use this skill for design, backend development, testing, or orchestration.
