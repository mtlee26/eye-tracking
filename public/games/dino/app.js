const playerElement = document.querySelector(".player");
const obstacleElement = document.querySelector(".obstacle");
const scoreElement = document.querySelector(".score-card .score");
const highScoreElement = document.querySelector(".score-card .high-score");
const restartGameElement = document.querySelector(".restart-game");
const containerElement = document.querySelector(".game-container");

const OBSTACLE_SIZES = ["xs", "s", "m", "l"];
const JUMP_THRESHOLD = 300;

const jumpSound = new Audio("./assets/jump.mp3");
const overSound = new Audio("./assets/over.mp3");
let bgrSound = new Audio("./assets/bgr.mp3");
bgrSound.loop = true;

let isGameOver = false;
/**
 * JUMP
 */
function addJumpListener() {
  document.addEventListener("mousemove", (event) => {
    if (event.clientY < JUMP_THRESHOLD && !jumping) {
      jump();
    }
  });
}

let jumping = false;
function jump() {
  if (jumping || isGameOver) {
    return;
  }
  if (jumpSound.paused) {
    jumpSound.play();
  }
  jumping = true;
  playerElement.classList.add("jump");
  setTimeout(() => {
    playerElement.classList.remove("jump");
    jumping = false;
  }, 1200);
}

/**
 * COLLISION
 */
let collisionInterval;
function monitorCollision() {
  collisionInterval = setInterval(() => {
    if (isCollision()) {
      isGameOver = true;
      checkForHighScore();
      stopGame();
    }
  }, 10);
}

// Left buffer for tail
const LEFT_BUFFER = 50;
function isCollision() {
  const playerClientRect = playerElement.getBoundingClientRect();
  const playerL = playerClientRect.left;
  const playerR = playerClientRect.right;
  const playerB = playerClientRect.bottom;

  const obstacleClientRect = obstacleElement.getBoundingClientRect();
  const obstacleL = obstacleClientRect.left;
  const obstacleR = obstacleClientRect.right;
  const obstacleT = obstacleClientRect.top;

  const xCollision = obstacleR - LEFT_BUFFER > playerL && obstacleL < playerR;
  const yCollision = playerB > obstacleT;

  return xCollision && yCollision;
}

/**
 * SCORE
 */
let score = 0;
function setScore(newScore) {
  scoreElement.innerHTML = score = newScore;
}

let scoreInterval;
function countScore() {
  scoreInterval = setInterval(() => {
    setScore(score + 1);
  }, 100);
}

let highscore = localStorage.getItem("highscore") || 0;
function setHighScore(newScore) {
  highScoreElement.innerText = highscore = newScore;
  localStorage.setItem("highscore", newScore);
}

function checkForHighScore() {
  if (score > highscore) {
    setHighScore(score);
  }
}

/**
 * RANDOMISE OBSTACLE
 */
function getRandomObstacleSize() {
  const index = Math.floor(Math.random() * (OBSTACLE_SIZES.length - 1));
  return OBSTACLE_SIZES[index];
}

let changeObstacleInterval;
function randomiseObstacle() {
  changeObstacleInterval = setInterval(() => {
    const obstacleSize = getRandomObstacleSize();
    obstacleElement.className = `obstacle obstacle-${obstacleSize}`;
  }, 3000);
}

/**
 * STOP GAME
 */
function stopGame() {
  if (overSound.paused) {
    bgrSound.pause();
    overSound.play();
  }
  clearInterval(collisionInterval);
  clearInterval(scoreInterval);
  clearInterval(changeObstacleInterval);
  restartGameElement.classList.add("show");
  containerElement.classList.add("stop");
  restartCountdown();
}

/**
 * RESTART COUNTDOWN
 */
function restartCountdown() {
  restartGameElement.classList.add("show");
  let seconds = 3;
  const countdownElement = document.querySelector(".restart-game .countdown");
  countdownElement.textContent = seconds;

  const countdownInterval = setInterval(() => {
    seconds--;
    countdownElement.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(countdownInterval);
      restart();
    }
  }, 1000);
}

function restart() {
  location.reload();
}

function main() {
  if (bgrSound.paused) {
    bgrSound.play();
  }
  addJumpListener();
  monitorCollision();
  countScore();
  setHighScore(highscore);
  randomiseObstacle();
}

main();
