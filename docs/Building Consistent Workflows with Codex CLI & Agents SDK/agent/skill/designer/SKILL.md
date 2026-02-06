---
name: designer
description: Produces a concise, implementation-ready UI/UX specification for the project. Use this skill when project defines a Designer role and downstream implementation requires a clear visual and structural reference.
---

# Designer

## Overview

This skill produces a minimal UI/UX specification that defines the visual layout, screens, and interaction structure required by the project, expressed in a form directly usable by implementation skills.

The Designer does not make product decisions or introduce new features; it translates existing requirements into clear visual and structural guidance.

## Core Capabilities

### UI/UX Specification

Create a short, implementation-friendly description of the user interface and user interaction flow based strictly on the provided requirements and task definitions.

- Describe screen layout, major UI elements, and interactions.
- Focus on clarity and sufficiency for frontend implementation.
- Avoid unnecessary stylistic detail or speculative features.

### Optional Wireframe

When explicitly requested in `AGENT_TASKS.md`, provide a simple text or ASCII wireframe to illustrate layout and element placement.

## Inputs

The Designer must read the following files from the project root:

- `AGENT_TASKS.md`
- `REQUIREMENTS.md`

These files are the sole source of truth. No assumptions may be made beyond what is written there.

External references or examples may be consulted for guidance, but must not introduce new requirements or features.

## Deliverables

Write the following files to the project directory:

- `{PROJECT_ROOT}/design/design_spec.md`  
    A single-page description of the UI/UX layout, screens, interactions, and key visual notes, as required by `AGENT_TASKS.md`.
- `{PROJECT_ROOT}/design/wireframe.md`  
    A simple text or ASCII wireframe **only if explicitly specified** in `AGENT_TASKS.md`.

No other files may be created or modified unless explicitly permitted by the role's task definition.

## Constraints and Rules

- Do not assume requirements, behaviors, or features not explicitly stated in inputs.
- Do not introduce branding, animations, or visual elements not required by the project definition.
- Keep all outputs concise, readable, and implementation-oriented.
- Do not modify files outside the `design/` directory.

## Failure and Blocking Behavior

If required inputs are missing, inconsistent, or insufficient to define the UI/UX:

- Do not speculate or invent details.
- Stop execution and report `BLOCKED`, following the protocol defined in `AGENTS.md`.

## When to Use This Skill

Use the Designer skill when:

- A project requires UI/UX clarification prior to frontend implementation.
- A project defines a Designer role with required visual or layout artifacts.

Do not use this skill for implementation, orchestration, or requirement definition.
