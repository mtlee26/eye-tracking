//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2;
let gravity = 0.4;

let gameOver = false;
let pause = false; // New: Pause state
let countdown = 0; // New: Countdown timer
let score = 0;
let falling = false;
let delayFalling = false;

//Audio
let flapSound = new Audio("./audio/flap.mp3");
let hitSound = new Audio("./audio/hit.mp3");
let scoreSound = new Audio("./audio/score.mp3");
let dropSound = new Audio("./audio/drop.mp3");
let bgrSound = new Audio("./audio/bgr.mp3");
bgrSound.loop = true;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // Load images
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  // Listen to mouse movement
  board.addEventListener("mousemove", moveBird);

  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver || pause) {
    if (gameOver) {
      if (falling) {
        if (!delayFalling) {
          bird.y += 10 * gravity; // Apply gravity to bird
        }
        bird.y = Math.max(0, Math.min(bird.y, boardHeight - bird.height)); // Prevent bird from falling below the ground
        context.clearRect(0, 0, board.width, board.height);
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        for (let i = 0; i < pipeArray.length; i++) {
          let pipe = pipeArray[i];
          if (!falling) {
            pipe.x += velocityX;
          }
          context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        }
      }
      context.fillText("GAME OVER", 5, 90); // Show game over message
      return;
    }

    if (pause) {
      showCountdown(); // Display countdown if paused
      return;
    }
  }
  context.clearRect(0, 0, board.width, board.height);

  if (bgrSound.paused) {
    bgrSound.play();
  }

  // Apply gravity
  bird.y += gravity;
  bird.y = Math.max(0, Math.min(bird.y, boardHeight - bird.height));
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > boardHeight) {
    endGame();
    return;
  }

  // Pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      if (scoreSound.paused) {
        scoreSound.play();
      }
      score += 0.5;
      pipe.passed = true;
      checkPauseCondition(); // Check if pause condition is met
    }

    if (detectCollision(bird, pipe)) {
      endGame();
      return;
    }
  }

  // Clear pipes
  if (!falling) {
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
      pipeArray.shift();
    }
  }

  // Score
  context.fillStyle = "white"; // Reset fill style for score text
  context.font = "45px Minecraft"; // Reset font for score text
  context.textAlign = "left"; // Reset text alignment for score text
  context.fillText(score, 5, 45); // Display score

  if (gameOver) {
    context.fillText("GAME OVER", 5, 90);
  }
}

function placePipes() {
  if (gameOver || pause) {
    return;
  }

  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 3;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

// Update bird's y position based on mouse movement
function moveBird(e) {
  if (gameOver || pause || falling) {
    return;
  }
  const rect = board.getBoundingClientRect();
  const mouseY = e.clientY - rect.top;

  bird.y = mouseY - bird.height / 2;

  if (flapSound.paused) {
    flapSound.play();
  }
}

// Check if game should pause
function checkPauseCondition() {
  if (score % 5 === 0 && score > 0) {
    pause = true;
    countdown = 3; // Start countdown from 3 seconds
    let interval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(interval);
        pause = false; // Resume game
      }
    }, 1000);
  }
}

// Display countdown
// Display countdown with 50% transparency overlay
function showCountdown() {
  context.fillStyle = "rgba(0, 0, 0, 0.5)"; // 50% transparent overlay
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "white";
  context.font = "40px Minecraft";
  context.textAlign = "center";
  context.fillText("Eyes rest time", board.width / 2, board.height / 2 - 20);
  context.font = "30px Minecraft";
  context.fillText(countdown + "s", board.width / 2, board.height / 2 + 20);
}

// End game and restart after 2 seconds
function endGame() {
  if (gameOver) {
    return;
  }
  bgrSound.pause();
  gameOver = true;
  falling = true;
  delayFalling = true;
  if (hitSound.paused) {
    hitSound.play();
  }

  setTimeout(() => {
    delayFalling = false;
    if (dropSound.paused) {
      dropSound.play();
    }
  }, 500); // Wait for 0.5 second before setting falling to true

  setTimeout(() => {
    restartGame();
  }, 3000);
}

function restartGame() {
  falling = false;
  bird.y = birdY;
  pipeArray = [];
  score = 0;
  gameOver = false;
  pause = false;
}

// Detect collision between bird and pipes
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
