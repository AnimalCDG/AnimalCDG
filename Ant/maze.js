let canvas = document.querySelector('.maze');
let ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;
//var x = canvas.width / 2;
//var y = canvas.height - 30;
var x = 200
var y = 200;
var radius = 50;
var dx = 0;
var dy = 0;
var directionX = 0;
var directionY = -50;
var keyDirection = 'Up';
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;
let ant;
class Ant {
    constructor(x, y) {
        this.width = x;
        this.height = y;
        this.direction = {
            up: true,
            left: false,
            bottom: false,
            right: false
        };
    }

    draw() {

        switch(keyDirection) {
            case 'Up':
                directionX = 0;
                directionY = -50;
                break;
            case 'Left':
                directionX = -50;
                directionY = 0;
                break;
            case 'Down':
                directionX = 0;
                directionY = 50;
                break;
            case 'Right':
                directionX = 50;
                directionY = 0;
                break;
            default:
                directionX = 0;
                directionY = -50;
                break;
        }

        if(upPressed) {
            if(this.direction.up){
                dx = 0;
                dy = -1;
            } else {
                this.direction.up = true;
                this.direction.left = false;
                this.direction.bottom = false;
                this.direction.right = false;
                dx = 0;
                dy = 0;
            }            
        }
        else if(leftPressed) {
            console.log(leftPressed, this.direction, this.direction.left);
            if(this.direction.left == true){
                dx = -1;
                dy = 0;
                console.log('if', leftPressed, this.direction);
            } else {
                this.direction.up = false;
                this.direction.left = true;
                this.direction.bottom = false;
                this.direction.right = false;
                dx = 0;
                dy = 0;
                console.log('else', leftPressed, this.direction);
            }            
        }else if(downPressed) {
            if(this.direction.bottom){
                dx = 0;
                dy = 1;
            } else {
                this.direction.up = false;
                this.direction.left = false;
                this.direction.bottom = true;
                this.direction.right = false;
                dx = 0;
                dy = 0;
            }            
        } else  if(rightPressed) {
            if(this.direction.right){
                dx = 1;
                dy = 0;
            } else {
                this.direction.up = false;
                this.direction.left = false;
                this.direction.bottom = false;
                this.direction.right = true;
                dx = 0;
                dy = 0;
            }            
        } else {
            dx = 0;
            dy = 0;
        }
        
        ctx.beginPath(); //Corpo
        ctx.arc(x, y, radius, 0, Math.PI*2);
        ctx.fillStyle = "#DAA520";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath(); //Cabeça
        //ctx.arc(x + directionX, y + directionY, Math.floor(radius / 2), 0, Math.PI*2);
        ctx.arc(x + directionX, y + directionY, Math.floor(radius / 2), 0, Math.PI*2);
        ctx.fillStyle = "#4B0082";
        ctx.fill();
        ctx.closePath();

    }

}

function drawBall() {
    
    ant.draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if(x > 800) {
        dx = -1;
    } else if (x < 0) {
        dx = 1;
    }

    x += dx;
    y += dy;

    window.requestAnimationFrame(() =>{
        this.draw();
    });

}

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
        keyDirection = 'Up';
    }  else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        keyDirection = 'Left';
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
        keyDirection = 'Down';
    } else if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        keyDirection = 'Right';
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
        keyDirection = 'Up';
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
        keyDirection = 'Left';
    } else if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
        keyDirection = 'Right';
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
        keyDirection = 'Down';
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

ant = new Ant(x, y);
this.draw();