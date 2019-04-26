let showGameBoard, showPlayerOptions, grid;

if (window.readyState === 'complete') {
    gameReady();
} else {
    window.addEventListener('DOMContentLoaded', gameReady)
}

function clickHandler(event) {
    gameBoard.placePlayerPiece(event.target.attributes.data.value, event.target);
}

function gameReady() {
    showGameBoard = document.getElementById('game');
    showPlayerOptions = document.getElementById('selection');
}

function resetBoard() {
    showGameBoard.style.display = 'none';
    showPlayerOptions.style.display = 'block';
    grid = document.getElementById('board');
    for (let i = 0; i < grid.children.length; i++) {
        grid.children[i].innerText = '';
    }
    document.getElementById('winner').innerText = '';
}

function selectPlayer(event) {
    let player = event.target.innerText;
    gameBoard = new Board(player);
    if (player !== 'X') {
        gameBoard.placeComputerPiece();
    }
    showGameBoard.style.display = 'block';
    showPlayerOptions.style.display = 'none';
}