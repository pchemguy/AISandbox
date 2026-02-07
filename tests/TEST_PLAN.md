# Bug Busters Test Plan

## Artifact Checks
- Confirm `REQUIREMENTS.md`, `AGENT_TASKS.md`, and `TEST.md` exist in the project root.
- Confirm `design/design_spec.md`, `frontend/index.html`, and `backend/server.js` exist.

## Manual UI Checks
1. Open `frontend/index.html` in a browser.
2. Verify the header shows **Score: 0** and **Time: 20**.
3. Verify the bug is visible within the play area.
4. Click the bug and confirm the score increments by 1 each click.
5. Wait for 20 seconds and confirm the game ends.
6. Verify the "Game Over" message appears and the final score is displayed.

## Backend Checks (Optional Backend Requirement)
1. Run `node backend/server.js`.
2. Submit a score:
   - `curl -X POST http://localhost:3000/submit -H "Content-Type: application/json" -d '{"score": 5}'`
   - Expect a `201` response with `{ "status": "ok" }`.
3. Fetch the leaderboard:
   - `curl http://localhost:3000/leaderboard`
   - Expect a `200` response with `{ "scores": [ ... ] }` containing up to 10 scores, including 5.
