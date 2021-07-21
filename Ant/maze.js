let canvas = document.querySelector('.maze');
let ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;
//var x = canvas.width / 2;
//var y = canvas.height - 30;
var x = 400
var y = 400;
var radius = 50;
var dx = 2;
var dy = 0;
var direction = 70;
var upPressed = false;
var bottomPressed = false;
var rightPressed = false;
var leftPressed = false;

class Ant {
    constructor(x, y) {
        this.width = x;
        this.height = y;
    }

    draw() {

        // ctx.beginPath(); //Cabeça
        // ctx.arc(x + direction, y - 50 + direction, Math.floor(radius / 2), 0, Math.PI*2);
        // ctx.fillStyle = "#4B0082";
        // ctx.fill();
        // ctx.closePath();

        ctx.beginPath(); //Corpo
        ctx.arc(x, y, radius, 0, Math.PI*2);
        ctx.fillStyle = "#DAA520";
        ctx.fill();
        ctx.closePath();
    }

}

function drawBall() {
    let ant = new Ant(x, y);
    ant.draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if(x > 800) {
        dx = -2;
    } else if (x < 0) {
        dx = 2;
    }

    x += dx;
    y += dy;
}

function keyDownHandler(e) {
    console.log(e.key);
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    } else if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    } else if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10);