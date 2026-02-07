const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const playArea = document.getElementById("playArea");
const bug = document.getElementById("bug");
const message = document.getElementById("message");
const finalScoreEl = document.getElementById("finalScore");

let score = 0;
let timeLeft = 20;
let moveIntervalId = null;
let timerIntervalId = null;
let gameOver = false;

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
}

function updateTimer() {
  timerEl.textContent = `Time: ${timeLeft}`;
}

function placeBugRandomly() {
  const areaRect = playArea.getBoundingClientRect();
  const bugRect = bug.getBoundingClientRect();
  const maxX = areaRect.width - bugRect.width;
  const maxY = areaRect.height - bugRect.height;

  const x = Math.random() * Math.max(0, maxX);
  const y = Math.random() * Math.max(0, maxY);

  bug.style.transform = `translate(${x}px, ${y}px)`;
}

function endGame() {
  gameOver = true;
  clearInterval(moveIntervalId);
  clearInterval(timerIntervalId);
  bug.disabled = true;
  message.hidden = false;
  finalScoreEl.textContent = `Final Score: ${score}`;
}

function startGame() {
  updateScore();
  updateTimer();
  placeBugRandomly();

  moveIntervalId = setInterval(placeBugRandomly, 900);
  timerIntervalId = setInterval(() => {
    timeLeft -= 1;
    updateTimer();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

bug.addEventListener("click", () => {
  if (gameOver) {
    return;
  }
  score += 1;
  updateScore();
  placeBugRandomly();
});

startGame();
