let buttonCreate = document.getElementById("create");
buttonCreate.addEventListener("click", createMaze);

let buttonReset = document.getElementById("reset");
buttonReset.addEventListener("click", reset);

let canvas = document.querySelector('.maze');
let ctx = canvas.getContext('2d');

let create = false;
let current;

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
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / columns, y);
        ctx.stroke();
        ctx.closePath();
    }

    drawRightWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x + size / columns, y);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
        ctx.closePath();
    }

    drawBottomWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / rows);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
        ctx.closePath();
    }

    drawLeftWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size / rows);
        ctx.stroke();
        ctx.closePath();
    }

    highlight(columns, hidden){
        if(!hidden){
            let x = (this.colNum * this.parentSize) / columns + 1;
            let y = (this.rowNum * this.parentSize) / columns + 1;
            ctx.fillStyle = 'purple';
            ctx.fillRect(
                x, 
                y, 
                this.parentSize / columns - 3, 
                this.parentSize / columns - 3
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
        ctx.strokeStyle = 'black';
        ctx.fillStyle = (this.entry ? '#33FF33' : (this.exit ? '#FF3333' : 'white'));
        ctx.lineWidth = 2;
        if(this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
        if(this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
        if(this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
        if(this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
        if(this.visited){
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
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

    reset() {
        create = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let r = 0; r < this.rows; r++){
            for(let c= 0; c < this.columns; c++){
                this.grid[r][c].visited = false;
                this.grid[r][c].walls.topWall = true;
                this.grid[r][c].walls.rightWall = true;
                this.grid[r][c].walls.bottomWall = true;
                this.grid[r][c].walls.leftWall = true;
            }
        }
        this.draw();
    }

    draw() {
        if(!create){
            canvas.width = this.size;
            canvas.height = this.size;
            canvas.style.background = 'white';
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
                //return;
            }
        } else {
            //console.log('Maze criado, toca o terror agora.');
            for(let r = 0; r < this.rows; r++){
                for(let c = 0; c < this.columns; c++){
                    let grid = this.grid;
                    grid[r][c].show(this.size, this.rows, this.columns);
                }
            }
        }    
        
        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}

let newMaze;

function createMaze() {
    let textSize = document.getElementById("size");
    let textRows = document.getElementById("rows");
    let textColumns = document.getElementById("columns");
    newMaze = new Maze(textSize.value, textRows.value, textColumns.value);
    newMaze.setup();
    newMaze.draw();
}

function reset() {
    newMaze.reset();
}
