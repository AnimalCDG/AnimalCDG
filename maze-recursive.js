let buttonCreate = document.getElementById("create");
buttonCreate.addEventListener("click", createMaze);

let buttonPlay = document.getElementById("play");
buttonPlay.addEventListener("click", playMaze);
buttonPlay.disabled = true;

let labelPlay = document.getElementById("label-play-maze");
labelPlay.style.display = 'none';

let textSize = document.getElementById("size");
let textRows = document.getElementById("rows");
let textColumns = document.getElementById("columns");

let canvas = document.querySelector('.maze');
let ctx = canvas.getContext('2d');

let canvasPlayer = document.querySelector('.play-maze');
let ctxPlayer = canvasPlayer.getContext('2d');

let create = false;
let current;
let gridMaze;

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

    reset() {
        ctxManual.clearRect(0, 0, canvas.width, canvas.height);
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.columns; c++){
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }
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
                buttonPlay.disabled = false;
                buttonCreate.disabled = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for(let r = 0; r < this.rows; r++){
                    for(let c = 0; c < this.columns; c++){
                        let grid = this.grid;
                        grid[r][c].show(this.size, this.rows, this.columns);
                    }
                }
                gridMaze = this.grid;
                return;
            }
        }   
        
        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}

function createMaze() {
    canvas.style.display = 'block';
    canvasPlayer.style.display = 'none';
    labelPlay.style.display = 'none';
    create = false;
    buttonPlay.disabled = true;
    buttonCreate.disabled = true;
    let newMaze = new Maze(textSize.value, textRows.value, textColumns.value);
    newMaze.setup();
    newMaze.draw();
}

function playMaze(){
    canvas.style.display = 'none';
    canvasPlayer.style.display = 'block';
    labelPlay.style.display = 'block';
    let newMazePlay = new MazePlay(textSize.value, textRows.value, textColumns.value);
    newMazePlay.setup();
    newMazePlay.play();
}