const gridSize = 15;
const snakeColour = "#474747"
const foodColour = "#00ff00"
const deadColour = "#ff0000"

var gameOver = false;
var ctx = display.getContext("2d");
var foodPos = [];
var snakeDirection

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

    draw() {
        var squareSize = display.width / gridSize;
        var i;
        var x;
        var y;
        ctx.clearRect(0, 0, display.width, display.height);
        ctx.fillStyle = snakeColour;
        ctx.fillRect(this.x * squareSize, this.y * squareSize, squareSize + 1, squareSize + 1);
        for (i = 0; i < this.tailPos.length; i++) {
            x = this.tailPos[i][0];
            y = this.tailPos[i][1];
            ctx.fillRect(x * squareSize, y * squareSize, squareSize + 1, squareSize + 1);
        }
        ctx.fillStyle = foodColour;
        for (i = 0; i < foodPos.length; i++) {
            x = foodPos[i][0];
            y = foodPos[i][1];
            ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
        }
    }

    deathDraw() {
        var squareSize = display.width / gridSize;
        var i;
        var x;
        var y;
        ctx.clearRect(0, 0, display.width, display.height);
        ctx.fillStyle = deadColour;
        ctx.fillRect(this.x * squareSize, this.y * squareSize, squareSize + 1, squareSize + 1);
        for (i = 0; i < this.tailPos.length; i++) {
            x = this.tailPos[i][0];
            y = this.tailPos[i][1];
            ctx.fillRect(x * squareSize, y * squareSize, squareSize + 1, squareSize + 1);
        }
        ctx.fillStyle = foodColour;
        for (i = 0; i < foodPos.length; i++) {
            x = foodPos[i][0];
            y = foodPos[i][1];
            ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
        }
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
                snakeDirection = "left";
                break;
            case "ArrowUp":
                snakeDirection = "up";
                break;
            case "ArrowRight":
                snakeDirection = "right";
                break;
            case "ArrowDown":
                snakeDirection = "down";
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
    player.draw();
    score.textContent = "Score: " + (player.tailPos.length - 2);
    if (gameOver) {
        player.deathDraw();
    } else {
        setTimeout(loop, 100);
    }
}

var player = new snake(Math.floor(Math.random() * gridSize),
    Math.floor(Math.random() * gridSize));

body.onkeydown = player.changeDirection
player.draw(1);
placeFood();
loop();