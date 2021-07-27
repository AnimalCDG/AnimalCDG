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
            enableCreate(false); 
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
        
        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}
