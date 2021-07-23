let buttonCreate = document.getElementById("create");
buttonCreate.addEventListener("click", createMaze);

let buttonStart = document.getElementById("start");
buttonStart.addEventListener("click", startMaze);
buttonStart.disabled = true;

 let buttonReset = document.getElementById("reset");
buttonReset.addEventListener("click", reset);
buttonReset.disabled = true;

let canvasManual = document.querySelector('.mazeManual');
let canvasRecursive = document.querySelector('.mazeRecursive');
let canvasAI = document.querySelector('.mazeAI');

let ctxManual = canvasManual.getContext('2d');
let ctxRecursive = canvasRecursive.getContext('2d');
let ctxAI = canvasAI.getContext('2d');

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let create = false;
let current;

var posX = 0
var posY = 0;
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;
let currentManual;

class Cell {
    constructor(rowNum, colNum, parentGrid, parentSize){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        this.entry = false;
        this.exit = false;
        this.walls = {
            topWall : true,
            rightWall : true,
            bottomWall : true,
            leftWall : true
        };
        this.trailManual = 150;

        //Descarte (acho que não vou precisar)
        this.pilxesTop = 0;
        this.pilxesBottom = 0;
        this.pilxesRight = 0;
        this.pilxesLeft = 0;
    }

    checkNeighbours(){
        let grid = this.parentGrid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbours = [];

        let top = row != 0 ? grid[row - 1][col] : undefined;
        let right = col != grid.length - 1 ? grid[row][col + 1] : undefined;
        let bottom = row != grid.length - 1 ? grid[row + 1][col] : undefined;
        let left = col != 0 ? grid[row][col - 1] : undefined;

        if(top && !top.visited) neighbours.push(top);
        if(right && !right.visited) neighbours.push(right);
        if(bottom && !bottom.visited) neighbours.push(bottom);
        if(left && !left.visited) neighbours.push(left);

        if(neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return undefined;
        }
    }

    drawTopWall(x, y, size, columns, rows) {
        //Manual
        ctxManual.beginPath();
        ctxManual.moveTo(x, y);
        ctxManual.lineTo(x + size / columns, y);
        ctxManual.stroke();
        ctxManual.closePath();
        //Recursive
        ctxRecursive.beginPath();
        ctxRecursive.moveTo(x, y);
        ctxRecursive.lineTo(x + size / columns, y);
        ctxRecursive.stroke();
        ctxRecursive.closePath();
        //AI
        ctxAI.beginPath();
        ctxAI.moveTo(x, y);
        ctxAI.lineTo(x + size / columns, y);
        ctxAI.stroke();
        ctxAI.closePath();

        this.pilxesTop = y;
    }

    drawRightWall(x, y, size, columns, rows) {
        //Manual
        ctxManual.beginPath();
        ctxManual.moveTo(x + size / columns, y);
        ctxManual.lineTo(x + size / columns, y + size / rows);
        ctxManual.stroke();
        ctxManual.closePath();
        //Recursive
        ctxRecursive.beginPath();
        ctxRecursive.moveTo(x + size / columns, y);
        ctxRecursive.lineTo(x + size / columns, y + size / rows);
        ctxRecursive.stroke();
        ctxRecursive.closePath();
        //AI
        ctxAI.beginPath();
        ctxAI.moveTo(x + size / columns, y);
        ctxAI.lineTo(x + size / columns, y + size / rows);
        ctxAI.stroke();
        ctxAI.closePath();

        this.pilxesRight = (x + size / columns);
    }

    drawBottomWall(x, y, size, columns, rows) {
        //Manual
        ctxManual.beginPath();
        ctxManual.moveTo(x, y + size / rows);
        ctxManual.lineTo(x + size / columns, y + size / rows);
        ctxManual.stroke();
        ctxManual.closePath();
        //Recursive
        ctxRecursive.beginPath();
        ctxRecursive.moveTo(x, y + size / rows);
        ctxRecursive.lineTo(x + size / columns, y + size / rows);
        ctxRecursive.stroke();
        ctxRecursive.closePath();
        //AI
        ctxAI.beginPath();
        ctxAI.moveTo(x, y + size / rows);
        ctxAI.lineTo(x + size / columns, y + size / rows);
        ctxAI.stroke();
        ctxAI.closePath();

        this.pilxesBottom = (y + size / rows);
    }

    drawLeftWall(x, y, size, columns, rows) {
        //Manual
        ctxManual.beginPath();
        ctxManual.moveTo(x, y);
        ctxManual.lineTo(x, y + size / rows);
        ctxManual.stroke();
        ctxManual.closePath();
        //Recursive
        ctxRecursive.beginPath();
        ctxRecursive.moveTo(x, y);
        ctxRecursive.lineTo(x, y + size / rows);
        ctxRecursive.stroke();
        ctxRecursive.closePath();
        //AI
        ctxAI.beginPath();
        ctxAI.moveTo(x, y);
        ctxAI.lineTo(x, y + size / rows);
        ctxAI.stroke();
        ctxAI.closePath();

        this.pilxesLeft = x;
    }

    highlight(columns, hidden){
        if(!hidden){
            let x = (this.colNum * this.parentSize) / columns + 1;
            let y = (this.rowNum * this.parentSize) / columns + 1;
            //Manual
            ctxManual.fillStyle = 'purple';
            ctxManual.fillRect(
                x, 
                y, 
                this.parentSize / columns - 3, 
                this.parentSize / columns - 3
            );
            //Recursive
            ctxRecursive.fillStyle = 'purple';
            ctxRecursive.fillRect(
                x, 
                y, 
                this.parentSize / columns - 3, 
                this.parentSize / columns - 3
            );
            //AI
            ctxAI.fillStyle = 'purple';
            ctxAI.fillRect(
                x, 
                y, 
                this.parentSize / columns - 3, 
                this.parentSize / columns - 3
            );
        }        
    }

    manual(columns, hidden){
        if(!hidden){
            let x = (this.colNum * this.parentSize) / columns + 1;
            let y = (this.rowNum * this.parentSize) / columns + 1;
            ctxManual.fillStyle = '#FFD700';
            ctxManual.fillRect(
                x, 
                y, 
                this.parentSize / columns - 2, 
                this.parentSize / columns - 2
            );
        }        
    }

    removeWalls(cell1, cell2){
        let x = cell1.colNum - cell2.colNum;
        if(x == 1){
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        } else if(x == -1){
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }
        let y = cell1.rowNum - cell2.rowNum;
        if(y == 1){
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        } else if(y == -1){
            cell1.walls.bottomWall = false;
            cell2.walls.topWall = false;
        }
    }

    show(size, rows, columns){
        let x = (this.colNum * size) / columns;
        let y = (this.rowNum * size) / rows;
        //Manual
        ctxManual.strokeStyle = 'black';
        ctxManual.fillStyle = (this.entry ? '#33FF33' : (this.exit ? '#FF3333' : 'white'));
        ctxManual.lineWidth = 2;
        //Recursive
        ctxRecursive.strokeStyle = 'black';
        ctxRecursive.fillStyle = (this.entry ? '#33FF33' : (this.exit ? '#FF3333' : 'white'));
        ctxRecursive.lineWidth = 2;
        //AI
        ctxAI.strokeStyle = 'black';
        ctxAI.fillStyle = (this.entry ? '#33FF33' : (this.exit ? '#FF3333' : 'white'));
        ctxAI.lineWidth = 2;
        if(this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
        if(this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
        if(this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
        if(this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
        if(this.visited){
            //Manual
            ctxManual.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
            //Recursive
            ctxRecursive.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
            //AI
            ctxAI.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
    }
}

class Maze {
    constructor(size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
        this.start = false;
    }

    setup() {
        for(let r = 0; r < this.rows; r++){
            let row = [];
            for(let c = 0; c < this.columns; c++){
                let cell = new Cell(r, c, this.grid, this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        this.grid[0][0].entry = true;
        this.grid[this.rows - 1][this.columns - 1].exit = true;
        current = this.grid[0][0];
    }

    run() {
         this.start = true;
         currentManual = this.grid[posX][posY];
    }

    reset() {
        ctxManual.clearRect(0, 0, canvasManual.width, canvasManual.height);
        ctxRecursive.clearRect(0, 0, canvasRecursive.width, canvasRecursive.height);
        ctxAI.clearRect(0, 0, canvasAI.width, canvasAI.height);
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.columns; c++){
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }
        // for(let r = 0; r < this.rows; r++){
        //     for(let c= 0; c < this.columns; c++){
        //         this.grid[r][c].visited = false;
        //         this.grid[r][c].walls.topWall = true;
        //         this.grid[r][c].walls.rightWall = true;
        //         this.grid[r][c].walls.bottomWall = true;
        //         this.grid[r][c].walls.leftWall = true;
        //     }
        // }
        //this.draw();
    }

    draw() {
        if(!create){
            //Manual
            canvasManual.width = this.size;
            canvasManual.height = this.size;
            canvasManual.style.background = 'white';
            //Recursive
            canvasRecursive.width = this.size;
            canvasRecursive.height = this.size;
            canvasRecursive.style.background = 'white';
            //AI
            canvasAI.width = this.size;
            canvasAI.height = this.size;
            canvasAI.style.background = 'white';
            current.visited = true;
            for(let r = 0; r < this.rows; r++){
                for(let c = 0; c < this.columns; c++){
                    let grid = this.grid;
                    grid[r][c].show(this.size, this.rows, this.columns);
                }
            }
            let next = current.checkNeighbours();
            if(next){
                next.visited = true;
                this.stack.push(current);
                current.highlight(this.columns, false);
                current.removeWalls(current, next);
                current = next;
            } else if(this.stack.length > 0){
                let cell = this.stack.pop();
                current = cell;
                current.highlight(this.columns, false);
            }
            if(this.stack.length == 0){
                current.highlight(this.columns, true);
                create = true;
                buttonStart.disabled = false;
                buttonReset.disabled = false;
                //return;
            }
        } else {
            ctxManual.clearRect(0, 0, canvasManual.width, canvasManual.height);
            ctxRecursive.clearRect(0, 0, canvasRecursive.width, canvasRecursive.height);
            ctxAI.clearRect(0, 0, canvasAI.width, canvasAI.height);
            for(let r = 0; r < this.rows; r++){
                for(let c = 0; c < this.columns; c++){
                    let grid = this.grid;
                    grid[r][c].show(this.size, this.rows, this.columns);
                }
            }
            if(this.start) {
                currentManual.manual(this.columns, false);
                moveManual(this.grid);
            }
        }    
        
        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}

function moveManual(grid) {
    if(upPressed && !currentManual.walls.topWall){
        posX -= 1;
        upPressed = false;
    }
    if(leftPressed && !currentManual.walls.leftWall){
        posY -= 1;
        leftPressed = false;
    }
    if(rightPressed && !currentManual.walls.rightWall){
        posY += 1;
        rightPressed = false;
    }
    if(downPressed && !currentManual.walls.bottomWall){
        posX += 1;
        downPressed = false;
    }
    currentManual = grid[posX][posY];
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

let newMaze;

function createMaze() {
    buttonCreate.disabled = true;
    let textSize = document.getElementById("size");
    let textRows = document.getElementById("rows");
    let textColumns = document.getElementById("columns");
    newMaze = new Maze(textSize.value, textRows.value, textColumns.value);
    newMaze.setup();
    newMaze.draw();
}

function startMaze() {
    newMaze.run();
}

function reset() {
    newMaze.reset();
}
