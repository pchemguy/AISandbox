# Bug Busters UI/UX Specification

## Screen Layout
Single-screen layout with a simple header and a play area:

1. **Header Bar (Top)**
   - **Score label** on the left: "Score: 0".
   - **Timer label** on the right: "Time: 20".

2. **Play Area (Center)**
   - A rectangular area where the bug moves.
   - The **bug** is a visible, clickable element (e.g., a small circle or bug icon) positioned absolutely within the play area.

3. **End-of-Game Message (Overlay or Below Play Area)**
   - Hidden during gameplay.
   - When the timer hits 0, show "Game Over" and the **final score**.

## Interaction Flow

1. **Start State**
   - Score starts at 0.
   - Timer starts at 20 seconds.
   - Bug is visible in the play area.

2. **Gameplay**
   - The bug moves to a new random position within the play area on a steady interval.
   - Clicking the bug increases the score by 1 immediately.

3. **End State**
   - When timer reaches 0, stop bug movement and disable clicking.
   - Display the final score in the end-of-game message.

## Visual Notes
- Keep visuals simple and readable.
- Ensure the bug stands out against the play area for easy clicking.
