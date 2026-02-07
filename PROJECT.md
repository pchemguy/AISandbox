---
name: PROJECT.md
---

# Project Description

This document provides

- `## Target`: Description of the development software target.
- `## Components`: High-level project decomposition.
- `## Preferences and Constraints`: Development preferences and constraints.

## Target

**Objective**: Develop a tiny browser game to showcase a multi-agent workflow. 

**High-level requirements:**

- Single-screen game called "Bug Busters".
- Player clicks a moving bug to earn points.
- Game ends after 20 seconds and shows final score.
- Optional: submit score to a simple backend and display a top-10 leaderboard.

## Components

| ROLE          | OBJECTIVE                                  | INPUT ARTIFACTS                                              | OUTPUT ARTIFACTS                               |
| ------------- | ------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| **Architect** | Generate requirements and task definitions | `PROJECT.md`                                                 | `REQUIREMENTS.md`, `AGENT_TASKS.md`, `TEST.md` |
| **Designer**  | Create UI/UX spec and wireframe            | `REQUIREMENTS.md`,` AGENT_TASKS.md`                          | `design/design_spec.md`                        |
| **Frontend**  | Implement page and application logic       | `REQUIREMENTS.md`, `AGENT_TASKS.md`, `design/design_spec.md` | `frontend/index.html`                          |
| **Backend**   | Implement minimal API                      | `REQUIREMENTS.md`, `AGENT_TASKS.md`                          | `backend/server.js`                            |
| **Tester**    | Define and execute validation checks       | `TEST.md`, all produced artifacts                            | `tests/TEST_PLAN.md`                           |

Primary outputs define the minimum artifacts required to consider a role complete. Additional role-specific artifacts may be created if necessary.

## Preferences and Constraints

- No external database - memory storage is fine.
- Prefer vanilla HTML, CSS, and JavaScript.
- Keep everything readable for beginners; no frameworks required.
- All outputs should be small files saved in clearly named folders.
