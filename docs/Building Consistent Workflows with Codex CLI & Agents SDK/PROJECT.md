---
name: PROJECT.md
---

# Project Description

This document provides

- `## Target`: Description of the development software target.
- `## Components`: High-level project decomposition.
- `## Preferences and Constraints`: Development preferences and constraints.

Note: development of individual `## Components` may be "delegated" using different mechanisms:

- **Multi-agent environment**:
    - Instructions form - task agent prompt.
    - Delegation to focused task agents with separate environments and contexts.
- **Single-agent environment**:
    - Instructions form - agentic skill.
    - All components are actually executed by the same agent within the same environment and common context.
    - Alternatively, the workflow can be split, e.g., at component boundary. Then individual components may still be executed by different agents, but each agent would still operate within a single agent environment. When more than one agent is used, this approach still does not rely on inter-agent interaction: execution control may be dispatched manually or using a deterministic script (which may potentially dispatch AI calls using "conventional" non-MCP API).

## Target

**Objective**: Develop a tiny browser game to showcase a multi-agent workflow. 

**High-level requirements:**

- Single-screen game called "Bug Busters".
- Player clicks a moving bug to earn points.
- Game ends after 20 seconds and shows final score.
- Optional: submit score to a simple backend and display a top-10 leaderboard.

## Components

| ROLE          | OBJECTIVE                                                          |
| ------------- | ------------------------------------------------------------------ |
| **Architect** | Generates development plan and requirements from                   |
| **Designer**  | Create a one-page UI/UX spec and basic wireframe.                  |
| **Frontend**  | Implement the page and app logic.                                  |
| **Backend**   | Implement a minimal API (GET /health, GET/POST /scores).           |
| **Tester**    | Write a quick test plan and a simple script to verify core routes. |

## Preferences and Constraints

- No external database - memory storage is fine.
- Prefer vanilla HTML, CSS, and JavaScript.
- Keep everything readable for beginners; no frameworks required.
- All outputs should be small files saved in clearly named folders.
