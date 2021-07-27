let canvas = document.querySelector('.maze');
let ctx = canvas.getContext('2d');

let canvasPlayer = document.querySelector('.play-maze');
let ctxPlayer = canvasPlayer.getContext('2d');

let canvasRecursive = document.querySelector('.recursive-maze');
let ctxRecursive = canvasRecursive.getContext('2d');

let buttonCreate = document.getElementById("create");
buttonCreate.addEventListener("click", createMaze);

let buttonPlay = document.getElementById("play");
buttonPlay.addEventListener("click", playMaze);
buttonPlay.disabled = true;

let buttonRecursive = document.getElementById("recursive");
buttonRecursive.addEventListener("click", recursiveMaze);
buttonRecursive.disabled = true;

let buttonAI = document.getElementById("ai");
//buttonRecursive.addEventListener("click", recursiveMaze);
buttonAI.disabled = true;

let labelPlay = document.getElementById("label-play-maze");
labelPlay.style.display = 'none';

let textSize = document.getElementById("size");
let textRows = document.getElementById("rows");
let textColumns = document.getElementById("columns");

function enableCreate(status){
    buttonPlay.disabled = status;
    buttonCreate.disabled = status;
    buttonRecursive.disabled = status;
    buttonAI.disabled = status;
}

function createMaze() {
    canvas.style.display = 'block';
    canvasPlayer.style.display = 'none';
    labelPlay.style.display = 'none';
    canvasRecursive.style.display = 'none';
    //create = false;
    enableCreate(true);    
    let newMaze = new Maze(textSize.value, textRows.value, textColumns.value);
    newMaze.setup();
    newMaze.draw();
}

function playMaze(){
    canvas.style.display = 'none';
    canvasPlayer.style.display = 'block';
    labelPlay.style.display = 'block';
    canvasRecursive.style.display = 'none';
    labelPlay.innerHTML = 'Movimentos: 0;';
    let newMazePlay = new MazePlay(textSize.value, textRows.value, textColumns.value);
    newMazePlay.setup();
    newMazePlay.play();
}

function recursiveMaze(){
    canvas.style.display = 'none';
    canvasPlayer.style.display = 'none';
    canvasRecursive.style.display = 'block';
    labelPlay.style.display = 'block';
    labelPlay.innerHTML = 'Movimentos: 0;';
    let newMaze = new MazeRecursive(textSize.value, textRows.value, textColumns.value);
    newMaze.setup();
    newMaze.execute();
}