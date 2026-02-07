---
name: AGENT_TASKS.md
---

# Agent Tasks

## Project

- **Name**: Bug Busters
- **Source**: Derived from `PROJECT.md`
- **Purpose**: Define per-role executable task contracts (inputs, outputs, constraints)

## Global Constraints

- Use only project artifacts as source of truth (`PROJECT.md`, `REQUIREMENTS.md`, `TEST.md`, `AGENT_TASKS.md`, and role outputs).
- Do not introduce features not required by `PROJECT.md` / `REQUIREMENTS.md`.
- Prefer small, readable files; avoid unnecessary complexity.
- Persist cross-task information only via repository files.

---

## Role: Designer

### Objective
Translate the requirements into a concise UI/UX specification for the single-screen Bug Busters game so the frontend can implement the layout and interactions accurately.

### Allowed Work Area

- **Directory**: `design/`
- **May create additional files here**: Yes (only if needed to complete the role's task)
- **May modify files outside this directory**: No

### Inputs

The following files are the only authoritative inputs for this role:

- `REQUIREMENTS.md`
- `AGENT_TASKS.md`

If any required input is missing or contradictory, stop and report to the Controller.

### Primary Deliverables

These outputs are mandatory. Do not substitute other artifacts for them.

- `design/design_spec.md` - UI/UX layout and interaction specification for the game

### Auxiliary Artifacts (Optional)

- `design/wireframe.md` - Only if needed to clarify layout

### Task Breakdown

1. Describe the single-screen layout, including score, timer, play area, and end-of-game messaging.
2. Describe core interactions: clicking the bug, movement behavior, and end-of-game state.

### Acceptance Criteria

- The spec describes all required UI elements (score, timer, bug, play area, end-of-game message).
- Interactions required by `REQUIREMENTS.md` are clearly stated.

### Non-Goals

- Defining backend API details.
- Creating visual assets beyond basic UI description.

### Completion Report

Ensure the design spec exists and is consistent with requirements.

---

## Role: Frontend

### Objective
Implement the Bug Busters game UI and client-side behavior according to the design specification and requirements.

### Allowed Work Area

- **Directory**: `frontend/`
- **May create additional files here**: Yes (only if needed to complete the role's task)
- **May modify files outside this directory**: No

### Inputs

The following files are the only authoritative inputs for this role:

- `REQUIREMENTS.md`
- `AGENT_TASKS.md`
- `design/design_spec.md`

If any required input is missing or contradictory, stop and report to the Controller.

### Primary Deliverables

These outputs are mandatory. Do not substitute other artifacts for them.

- `frontend/index.html` - Single-page game UI and script wiring

### Auxiliary Artifacts (Optional)

- `frontend/styles.css` - Styles for the layout (if not inlined)
- `frontend/main.js` - Game logic (if not inlined)

### Task Breakdown

1. Build the single-screen layout and required UI elements.
2. Implement game logic: timer, score, bug movement, end-of-game state.
3. Ensure the game runs without errors as a static page.

### Acceptance Criteria

- The page renders the game UI with score, timer, and moving bug.
- Clicking the bug increments the score by 1.
- The game ends after 20 seconds and displays the final score.
- No runtime errors during normal play.

### Non-Goals

- Adding features beyond the requirements (power-ups, multiple levels, etc.).
- Implementing backend endpoints.

### Completion Report

Ensure `frontend/index.html` exists and the game is playable end-to-end.

---

## Role: Backend

### Objective
Provide a minimal local API for optional score submission and top-10 leaderboard display, if feasible within requirements.

### Allowed Work Area

- **Directory**: `backend/`
- **May create additional files here**: Yes (only if needed to complete the role's task)
- **May modify files outside this directory**: No

### Inputs

The following files are the only authoritative inputs for this role:

- `REQUIREMENTS.md`
- `AGENT_TASKS.md`

If any required input is missing or contradictory, stop and report to the Controller.

### Primary Deliverables

These outputs are mandatory. Do not substitute other artifacts for them.

- `backend/server.js` - Minimal API server for score submission and leaderboard

### Auxiliary Artifacts (Optional)

- `backend/package.json` - Only if needed to run the server via `npm start`

### Task Breakdown

1. Define minimal endpoints for submitting a score and fetching top-10 scores.
2. Implement in-memory storage and response formats.

### Acceptance Criteria

- Server starts locally and exposes endpoints for submit and leaderboard.
- Stores scores in memory and returns top 10.

### Non-Goals

- Persistent database storage.
- Authentication or user accounts.

### Completion Report

Ensure `backend/server.js` exists and includes basic endpoints.

---

## Role: Tester

### Objective
Validate the produced artifacts against `TEST.md` and confirm required outputs exist.

### Allowed Work Area

- **Directory**: `tests/`
- **May create additional files here**: Yes (only if needed to complete the role's task)
- **May modify files outside this directory**: No

### Inputs

The following files are the only authoritative inputs for this role:

- `TEST.md`
- `AGENT_TASKS.md`
- All produced artifacts from previous roles

If any required input is missing or contradictory, stop and report to the Controller.

### Primary Deliverables

These outputs are mandatory. Do not substitute other artifacts for them.

- `tests/TEST_PLAN.md` - Verification steps aligned to `TEST.md`

### Auxiliary Artifacts (Optional)

- None

### Task Breakdown

1. Map acceptance criteria from `TEST.md` into clear checks.
2. Record manual steps and any light automated checks.

### Acceptance Criteria

- `tests/TEST_PLAN.md` exists and maps to all checks in `TEST.md`.

### Non-Goals

- Fixing implementation issues.
- Adding new requirements.

### Completion Report

Ensure the test plan exists and is aligned with `TEST.md`.
