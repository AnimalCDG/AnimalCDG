let currentRecursive;

let total = 0;

class MazeRecursive {
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
        currentRecursive = null;
        for(let r = 0; r < this.rows; r++){
            let row = [];
            for(let c = 0; c < this.columns; c++){
                let cell = new CellRecursive(r, c, this.grid, this.size);
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
        currentRecursive = this.grid[this.posX][this.posY];
    }

    execute() {
        canvas.style.background = 'white';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.columns; c++){
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }
        currentRecursive.highlight(this.columns, false);
        if(currentRecursive.exit){
            alert("Found the exit with "+this.countMove+" moves.");
            btnPlay.disabled = false;
            btnRecursive.disabled = false;
            return;
        }
        currentRecursive.visited = true;
        let next = currentRecursive.checkNeighbours();
        currentRecursive.trail();
        if(next){
            next.visited = true;
            this.stack.push(currentRecursive);
            currentRecursive.highlight(this.columns, false);
            currentRecursive = next;
            this.countMove += 1;    
        } else if(this.stack.length > 0){
            let cell = this.stack.pop();
            currentRecursive = cell;
            currentRecursive.trail();
            currentRecursive.highlight(this.columns, false);
            this.countMove += 1;    
        }
        labelPlay.innerHTML = 'Movimentos: '+this.countMove+';';
        total += 1;
        window.requestAnimationFrame(() => {
            this.execute();
        });
    }
}