const gridSize = 15;
const snakeColour = "#ff0000"
const foodColour = "#00ff00"
var ctx = display.getContext("2d");
class snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tailLength = 2;
        this.tailPos = [
            [x - 1, y],
            [x - 2, y]
        ];
    }

    draw(food) {
        var squareSize = display.width / gridSize;
        var i;
        var x;
        var y;
        ctx.clearRect(0, 0, display.width, display.height);
        ctx.fillRect(this.x * squareSize, this.y * squareSize, squareSize, squareSize);
        for (i = 0; i < this.tailPos.length; i++) {
            x = this.tailPos[i][0];
            y = this.tailPos[i][1];
            x = this.tailPos[i][0];
            ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
        }
    }

    move(x, y) {
        this.tailPos.splice(0, 0, [this.x, this.y]);
        this.x += x;
        this.y += y;
        this.tailPos.pop();

    }
}

var player = new snake(5, 5);
player.draw(1);