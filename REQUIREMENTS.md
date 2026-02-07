---
name: REQUIREMENTS.md
---

# Bug Busters Requirements

## Goal
Create a single-screen browser game called **"Bug Busters"** where the player clicks a moving bug to earn points. The session lasts 20 seconds, then the game ends and shows the final score. Optional score submission and leaderboard display are allowed if specified by tasks.

## Users
- Casual players who want a quick, simple clicking game.

## Functional Requirements
1. The game loads as a single-page web app in the browser.
2. A visible **bug** moves around the play area continuously (or at regular intervals).
3. The player gains **one point per successful click** on the bug.
4. A visible **timer** counts down from **20 seconds**.
5. When the timer reaches 0, the game ends and the **final score** is shown.
6. The game should be playable end-to-end without runtime errors under normal use.

## Optional Backend / Leaderboard
- If a backend is implemented, it may accept score submissions and return a top-10 leaderboard.
- If no backend is implemented, the frontend must **degrade gracefully** (no errors, and no broken UI).

## Non-Functional Requirements
- Use **vanilla HTML, CSS, and JavaScript**.
- Keep code and files **small, readable, and beginner-friendly**.
- Avoid frameworks and unnecessary dependencies.

## Constraints
- Only the artifacts defined in `PROJECT.md` are required.
- The frontend must run as static files.
- Backend (if present) runs locally and is accessed via localhost.

## Assumptions
- The bug movement can be implemented by randomly repositioning it within a bounded play area at a steady interval.
- Score increments by **1** per click unless specified otherwise.
- The UI can display the timer and score in a simple header area.
