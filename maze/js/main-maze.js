let txtSize = document.getElementById("size");
let txtRows = document.getElementById("rows");
let txtColumns = document.getElementById("columns");

let btnMazeIterative = document.getElementById("maze-iterative");
let btnMazeRecursive = document.getElementById("maze-recursive");
let btnBack = document.getElementById("back");
let btnPlay = document.getElementById("play");
let btnRecursive = document.getElementById("recursive");
let labelPlay = document.getElementById("label-play-maze");

let canvas = document.querySelector('.maze');
let ctx = canvas.getContext('2d');

btnMazeRecursive.disabled = true;
btnPlay.disabled = true;
btnRecursive.disabled = true;

btnMazeIterative.addEventListener("click", iterativeMaze);
btnMazeRecursive.addEventListener("click", recursiveMaze);
btnBack.addEventListener("click", pageBack);
btnPlay.addEventListener("click", solvePlay);
btnRecursive.addEventListener("click", solveRecursive);

labelPlay.innerHTML = 'Movimentos: -;';

function iterativeMaze() {
    //btnMazeRecursive.disabled = true;
    btnMazeIterative.disabled = true;
    btnPlay.disabled = true;
    btnRecursive.disabled = true;
    labelPlay.innerHTML = 'Movimentos: -;';
    let newMaze = new Maze(txtSize.value, txtRows.value, txtColumns.value);
    newMaze.setup();
    newMaze.iterative();
}

function recursiveMaze() {
    //btnMazeRecursive.disabled = true;
    btnMazeIterative.disabled = true;
    btnPlay.disabled = true;
    btnRecursive.disabled = true;
    labelPlay.innerHTML = 'Movimentos: -;';
    let newMaze = new Maze(txtSize.value, txtRows.value, txtColumns.value);
    newMaze.setup();
    newMaze.recursive();
}

function pageBack(){
    window.location.href = "../index.html";
}

function solvePlay() {
    btnPlay.disabled = true;
    btnRecursive.disabled = true;
    let newMaze = new MazePlay(txtSize.value, txtRows.value, txtColumns.value);
    newMaze.setup();
    newMaze.play();
}

function solveRecursive() {
    btnPlay.disabled = true;
    btnRecursive.disabled = true;
    let newMaze = new MazeRecursive(txtSize.value, txtRows.value, txtColumns.value);
    newMaze.setup();
    newMaze.execute();
}