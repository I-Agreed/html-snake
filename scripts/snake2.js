const gridSize = 15;
const snakeColour = "#474747"
const foodColour = "#00ff00"
const deadColour = "#ff0000"
var foodPos = [];
var gameOver = false;
var snakeDirection = "";
var player;
var loopTimeout;

class snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tailLength = 2;
        this.tailPos = [
            [x, y],
            [x, y]
        ];
        this.growing = false;
    }

    move(x, y) {
        this.tailPos.splice(0, 0, [this.x, this.y]);
        this.x += x;
        this.y += y;
        if (!this.growing) {
            this.tailPos.pop();
        }
        this.growing = false;
        var i;
        for (i = 0; i < this.tailPos.length; i++) {
            if (this.tailPos[i][0] == this.x && this.tailPos[i][1] == this.y) {
                gameOver = true;
            }
        }
        if (this.x < 0 || this.x >= gridSize || this.y < 0 || this.y >= gridSize) {
            gameOver = true;
        }
        for (i = 0; i < foodPos.length; i++) {
            if (foodPos[i][0] == this.x && foodPos[i][1] == this.y) {
                this.growing = true;
                foodPos[i] = randomCoords();
            }
        }
    }

    moveWithDirection() {
        switch (snakeDirection) {
            case "left":
                this.move(-1, 0);
                break;
            case "right":
                this.move(1, 0);
                break;
            case "up":
                this.move(0, -1);
                break;
            case "down":
                this.move(0, 1);
                break;
        }
    }

    changeDirection(event) {
        switch (event.key) {
            case "ArrowLeft":
                if (snakeDirection != "right") {
                    snakeDirection = "left";
                }
                break;
            case "ArrowUp":
                if (snakeDirection != "down") {
                    snakeDirection = "up";
                }
                break;
            case "ArrowRight":
                if (snakeDirection != "left") {
                    snakeDirection = "right";
                }
                break;
            case "ArrowDown":
                if (snakeDirection != "up") {
                    snakeDirection = "down";
                }
                break;
        }
    }
}

function placeFood() {
    var x = Math.floor(Math.random() * gridSize);
    var y = Math.floor(Math.random() * gridSize);
    foodPos.push([x, y]);
}

function randomCoords() {
    var x = Math.floor(Math.random() * gridSize);
    var y = Math.floor(Math.random() * gridSize);
    return [x, y];
}

function loop() {
    player.moveWithDirection();
    display.textContent = `Size: ${gridSize}x${gridSize} Snake Head: (${player.x}, ${player.y}) Food: (${foodPos[0][0]}, ${foodPos[0][1]})  Score: ${(player.tailPos.length - 2)} <br> Snake Tail: [${player.tailPos.map(x => `(${x[0]}, ${x[1]})`).join(", ")}]`;
    if (gameOver) {
        display.textContent = "GAME OVER";
    } else {
        loopTimeout = setTimeout(loop, 100);
    }
}

function setup() {
    clearTimeout(loopTimeout);
    foodPos = [];
    gameOver = false;
    snakeDirection = "";
    player = new snake(Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize));
    body.onkeydown = player.changeDirection;
    placeFood();
    loop();
}

startButton.onclick = setup;
setup();