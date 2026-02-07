---
name: backend
description: Implements the backend API exactly as specified by AGENT_TASKS.md and REQUIREMENTS.md. Use this skill when the project includes backend endpoints (e.g., health check, score submission) and a minimal runnable server is required.
---

# Backend Developer

## Overview

This skill implements a minimal backend service according to the project's defined API contract, producing a runnable server and any required configuration files.

The Backend Developer is responsible for faithful implementation of specified endpoints and contracts, not for orchestration, feature expansion, or architectural redesign.

## Core Capabilities

### Backend API Implementation

Implement only the endpoints described in the inputs.

- Follow the specified routes, request/response shapes, and status codes.
- Keep logic simple and readable.
- Use in-memory storage when persistence is required and external databases are disallowed.

### Minimal Server Packaging

Provide the minimal runtime scaffolding required to start the server locally.

- Include `package.json` with a start script if requested by `AGENT_TASKS.md`.
- Avoid unnecessary dependencies unless explicitly required by the specification.

## Inputs

The Backend Developer must read the following files from the project root:

- `AGENT_TASKS.md`
- `REQUIREMENTS.md`

These files are the sole source of truth. No assumptions may be made beyond their contents.

## Deliverables

Write the following files to the project directory:

- `{PROJECT_ROOT}/backend/package.json`  
    Include a start script if specified in `AGENT_TASKS.md`.
- `{PROJECT_ROOT}/backend/server.js`  
    Implement the API endpoints and backend logic exactly as specified.

Only the files listed above may be created or modified unless additional artifacts are explicitly permitted in the role's task definition.

## Constraints and Rules

- Implement exactly what is specified; do not add endpoints, features, or behaviors not required by the inputs.
- No external database; use in-memory storage where needed.
- Prefer minimal, beginner-readable code and clear structure.
- Do not modify files outside the `backend/` directory.

## Failure and Blocking Behavior

If required inputs are missing, inconsistent, or insufficient to implement the backend:

- Do not speculate or invent API details.
- Stop execution and report `BLOCKED`, following the protocol defined in `AGENTS.md`.

## When to Use This Skill

Use the Backend skill when:

- The project includes a backend component with specified endpoints.
- Downstream testing or frontend integration requires a runnable local server.

Do not use this skill for orchestration, frontend work, or test planning.
