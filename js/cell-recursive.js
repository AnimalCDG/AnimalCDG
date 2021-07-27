class CellRecursive {
    constructor(rowNum, colNum, parentGrid, parentSize){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        this.entry = false;
        this.exit = false;
        this.trailCell = 200;
        //this.trailCell = 0;
        this.walls = {
            topWall : true,
            rightWall : true,
            bottomWall : true,
            leftWall : true
        };
        this.colorTrail = ['#ddd2ec', '#baa7d9', '#977dc6', '#7255b2', '#4a2d9f', '#00008b','#170a45'];
    }

    checkNeighbours(){
        let grid = this.parentGrid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbours = [];

        let top = !this.walls.topWall ? grid[row - 1][col] : undefined;
        let right = !this.walls.rightWall ? grid[row][col + 1] : undefined;
        let bottom = !this.walls.bottomWall ? grid[row + 1][col] : undefined;
        let left = !this.walls.leftWall ? grid[row][col - 1] : undefined;

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
        this.pilxesTop = y;
    }

    drawRightWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x + size / columns, y);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
        ctx.closePath();
        this.pilxesRight = (x + size / columns);
    }

    drawBottomWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / rows);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
        ctx.closePath();
        this.pilxesBottom = (y + size / rows);
    }

    drawLeftWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size / rows);
        ctx.stroke();
        ctx.closePath();
        this.pilxesLeft = x;
    }

    trail(){
        if(currentRecursive.visited){
            this.trailCell = (this.trailCell > 0 ? this.trailCell - 20 : (this.trailCell <= 0 ? 0 : this.trailCell ) );
        }
        // if(currentRecursive.visited){
        //     this.trailPlayer = (this.trailPlayer < 7 ? this.trailPlayer + 1 : 6 );
        // }
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

    highlight(columns, hidden){
        if(!hidden){
            let x = (this.colNum * this.parentSize) / columns + 1;
            let y = (this.rowNum * this.parentSize) / columns + 1;
            ctx.fillStyle = '#0062ff';
            ctx.fillRect(
                x, 
                y, 
                this.parentSize / columns - 2, 
                this.parentSize / columns - 2
            );
        }        
    }

    show(size, rows, columns){
        let x = (this.colNum * size) / columns;
        let y = (this.rowNum * size) / rows;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = (this.entry ? '#33FF33' : (this.exit ? '#FF3333' : (this.trailCell === 200 ? 'white' : 'rgb(160, '+this.trailCell+', 255)')));
        //ctx.fillStyle = (this.entry ? '#33FF33' : (this.exit ? '#FF3333' : (this.trailPlayer === 0 ? 'white' : this.colorTrail[this.trailPlayer])));
        ctx.lineWidth = 2;
        if(this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
        if(this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
        if(this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
        if(this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
        //if(this.visited){
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        //}
    }
}