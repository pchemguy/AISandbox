---
name: PROJECT.md
URL: https://chatgpt.com/c/6984b73c-d634-838a-953e-3b681a48e921
---

# Tetris

## Project Description

This document provides

- `## Target`: Description of the development software target.
- `## Components`: High-level project decomposition.
- `## Preferences and Constraints`: Development preferences and constraints.

## Target

**Objective**: Develop a browser-based implementation of the classic Tetris game. 

**Top-level source code directory**:

- `{SRC_ROOT}`: `{PROJECT_ROOT}/tetris/src/tetris`
- all source code paths should be treated as relative to `{SRC_ROOT}`.

**High-level requirements:**

- Minimalistic implementation with a single level.
- Keyboard controls:
    - left/right arrows.
    - down arrow: fall down at double speed.
    - shift + down arrow: drop to bottom, but allow for a standard drop time increment to shift piece in the horizontal direction. 
    - up arrow: rotate clockwise
    - shift + up arrow: rotate CCW

## Components

| ROLE          | OBJECTIVE                                  | INPUT ARTIFACTS                                              | OUTPUT ARTIFACTS                               |
| ------------- | ------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| **Architect** | Generate requirements and task definitions | `PROJECT.md`                                                 | `REQUIREMENTS.md`, `AGENT_TASKS.md`, `TEST.md` |
| **Designer**  | Create UI/UX spec and wireframe            | `REQUIREMENTS.md`,` AGENT_TASKS.md`                          | `design/design_spec.md`                        |
| **Frontend**  | Implement page and application logic       | `REQUIREMENTS.md`, `AGENT_TASKS.md`, `design/design_spec.md` | `frontend/index.html`                          |
| **Tester**    | Define and execute validation checks       | `TEST.md`, all produced artifacts                            | `tests/TEST_PLAN.md`                           |

Primary outputs define the minimum artifacts required to consider a role complete. Additional role-specific artifacts may be created if necessary.

## Execution and Completion Notes

- **Target technology**:
    - Browser-based single-page application implemented using vanilla HTML, CSS, and JavaScript.
- **Execution assumptions**: The frontend is expected to run as a static single-page artifact. If a backend is implemented, it is expected to run locally and be accessed via localhost.
- **Optional components**: Backend functionality is optional. If backend artifacts are not produced, frontend behavior must degrade gracefully without failure.
- **Project completion**:
  Game
    - Opens in a browser.
    - Can be played end-to-end for a full session.
    - Produces no runtime errors under normal use.

## Preferences and Constraints

- Keep everything readable for beginners; no frameworks required.
- All outputs should be small files saved in clearly named folders.
