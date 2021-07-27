let btnMaze = document.getElementById("maze");
let btnDetect = document.getElementById("detect");

btnMaze.addEventListener("click", pageMaze);
btnDetect.addEventListener("click", pageDetect);

function pageMaze(){
    window.location.href = "maze/index.html";
}

function pageDetect(){
    window.location.href = "detect/index.html";
}