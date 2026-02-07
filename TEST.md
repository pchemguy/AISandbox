---
name: TEST.md
---

# Bug Busters Test Criteria

## Required Artifacts
- `REQUIREMENTS.md`
- `AGENT_TASKS.md`
- `design/design_spec.md`
- `frontend/index.html`
- `backend/server.js`
- `tests/TEST_PLAN.md`

## Acceptance Criteria

### Designer
1. `design/design_spec.md` describes the single-screen layout with score, timer, play area, bug element, and end-of-game message.
2. Interactions (clicking bug, bug movement, 20-second timer, end-of-game) are clearly documented.

### Frontend
3. `frontend/index.html` loads the game UI with visible score, timer, and bug.
4. Clicking the bug increases the score by 1.
5. The timer counts down from 20 seconds and ends the game at 0.
6. The final score is displayed when the game ends.
7. No runtime errors during normal gameplay.

### Backend (Optional, but required if artifact exists)
8. `backend/server.js` starts a local server exposing endpoints for submitting a score and fetching a top-10 leaderboard.
9. The leaderboard response includes up to 10 scores and is maintained in memory.

### Tester
10. `tests/TEST_PLAN.md` maps to all acceptance criteria above and lists clear validation steps.
