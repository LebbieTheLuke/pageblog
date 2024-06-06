const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 15,
    gravity: 0.6,
    velocity: 0,
    lift: -12
};

const pipes = [];
const pipeGap = 250;
const pipeWidth = 100;
let score = 0;
let isGameOver = false;
let attempts = 0;
const maxAttempts = 3;
// Load the bird image
const birdImg = new Image();
birdImg.src = 'bird.png'; // Set your bird image file path here

function drawBird() {
    ctx.drawImage(birdImg, bird.x - bird.radius, bird.y - bird.radius, bird.radius * 2, bird.radius * 2);
}


// Load the pipe image
const pipeImg = new Image();
pipeImg.src = 'pipe.png'; // Set your pipe image file path here

function drawPipes() {
    for (let i = 0; i = canvas.height || bird.y &lt;= 0) {
        gameOver();
    }
}

function updatePipes() {
    if (pipes.length === 0 || pipes[pipes.length - 1].x &lt; canvas.width - 200) {
        pipes.push({
            x: canvas.width,
            topHeight: Math.random() * (canvas.height - pipeGap - 300) + 150
        });
    }

    for (let i = 0; i &lt; pipes.length; i++) {
        pipes[i].x -= 2;

        if (pipes[i].x + pipeWidth  pipes[i].x &amp;&amp;
            bird.x - bird.radius &lt; pipes[i].x + pipeWidth &amp;&amp;
            (bird.y - bird.radius  pipes[i].topHeight + pipeGap)) {
            gameOver();
        }

        if (pipes[i].x + pipeWidth = maxAttempts) {
        ctx.font = '50px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText('Game Over', canvas.width / 2 - 150, canvas.height / 2);
    } else {
        ctx.font = '30px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText('Start Again', canvas.width / 2 - 150, canvas.height / 2);
    }
    // Add event listener for restart
    document.addEventListener('keydown', restartListener);
}

function restartListener(e) {
    if (e.key === ' ' &amp;&amp; attempts = maxAttempts) return;

    if (!isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBird();
        drawPipes();
        updateBird();
        updatePipes();
        drawScore();
        requestAnimationFrame(gameLoop);
    } else {
        drawInstructions();
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === ' ' &amp;&amp; attempts &lt; maxAttempts) {
        if (isGameOver) {
            restartGame();
        } else {
            bird.velocity = bird.lift;
        }
    }
});

function restartGame() {
    pipes.length = 0;
    bird.y = canvas.height / 2;
    score = 0;
    isGameOver = false;
    gameLoop();
}

gameLoop();
