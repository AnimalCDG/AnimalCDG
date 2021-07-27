document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;

let currentPlayer;

class MazePlay {
    constructor(size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
        this.start = false;
        this.posX = 0
        this.posY = 0;
        this.countMove = 0;
    }

    setup() {
        currentPlayer = null;
        for(let r = 0; r < this.rows; r++){
            let row = [];
            for(let c = 0; c < this.columns; c++){
                let cell = new CellPlayer(r, c, this.grid, this.size);
                cell.colNum = gridMaze[r][c].colNum;
                cell.rowNum = gridMaze[r][c].rowNum;
                cell.entry = gridMaze[r][c].entry;
                cell.exit = gridMaze[r][c].exit;
                cell.parentSize = gridMaze[r][c].parentSize;
                cell.pilxesBottom = gridMaze[r][c].pilxesBottom;
                cell.pilxesLeft = gridMaze[r][c].pilxesLeft;
                cell.pilxesRight = gridMaze[r][c].pilxesRight;
                cell.pilxesTop = gridMaze[r][c].pilxesTop;
                cell.visited = false;
                cell.walls = gridMaze[r][c].walls;
                row.push(cell);
            }
            this.grid.push(row);
        }
        currentPlayer = this.grid[this.posX][this.posY];
    }

    play() {
        canvas.style.background = 'white';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.columns; c++){
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }
        currentPlayer.play(this.columns, false);
        if(currentPlayer.exit){
            alert("Found the exit with "+this.countMove+" moves.");
            btnPlay.disabled = false;
            btnRecursive.disabled = false;
            return;
        }

        if(upPressed && !currentPlayer.walls.topWall){
            upPressed = false;
            currentPlayer.trail();
            this.posX -= 1;
            this.countMove += 1;            
        }
        if(leftPressed && !currentPlayer.walls.leftWall){
            leftPressed = false;
            currentPlayer.trail();
            this.posY -= 1;
            this.countMove += 1;            
        }
        if(rightPressed && !currentPlayer.walls.rightWall){
            rightPressed = false;
            currentPlayer.trail();
            this.posY += 1;
            this.countMove += 1;            
        }
        if(downPressed && !currentPlayer.walls.bottomWall){
            downPressed = false;
            currentPlayer.trail();
            this.posX += 1;
            this.countMove += 1;            
        }
        currentPlayer = this.grid[this.posX][this.posY];
        currentPlayer.visited = true;
        labelPlay.innerHTML = 'Movimentos: '+this.countMove+';';
        window.requestAnimationFrame(() => {
            this.play();
        });
    }
}

function keyDownHandler(e) {
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