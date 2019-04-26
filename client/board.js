class Board {
    constructor(player) {
        this.boardState = [[0, 0, 0,], [0, 0, 0,], [0, 0, 0,]];
        this.board = document.getElementById('board');
        this.player = player === 'X' ? 1 : -1;
        this.possiblePlays = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        this.turn = 1;
        this.winner = false;
    }

    checkWinner(row, col) {
        let sumRow = 0; let sumCol = 0; let sumDiagX = 0; let sumDiagY = 0;
        for (let i = 0; i < 3; i++) {
            sumRow += this.boardState[row][i];
            sumCol += this.boardState[i][col];
            sumDiagX += this.boardState[i][i];
            sumDiagY += this.boardState[i][2-i];
        }
        let winDiv = document.getElementById('winner');
        if (Math.abs(sumRow) === 3 || Math.abs(sumCol) === 3 || Math.abs(sumDiagX) === 3 || Math.abs(sumDiagY) === 3) {
            if (this.turn === this.player) {
                winDiv.innerText = 'You Won!';
            } else {
                winDiv.innerText = 'Computer Wins :(';
            }
            this.winner = true;
        } else if (this.possiblePlays.length === 0) {
            winDiv.innerText = 'The Game is a Draw';
            this.winner = true;
        }
    }
    
    nextTurn() {
        this.turn = this.turn * -1;
    }

    placeComputerPiece() {
        if (!this.winner) {
            let randomIndex = this.possiblePlays[Math.floor(Math.random() * this.possiblePlays.length)];
            this.placePiece(randomIndex, document.getElementById('board').children[randomIndex]);    
        }
    }

    placePlayerPiece(location, target) {
        if (target.innerText === '' && !this.winner) {
            this.placePiece(location, target);
            setTimeout(this.placeComputerPiece.bind(this), 100);
        }
    }

    placePiece(location, target) {
        let row = Math.floor(location / 3);
        let col = location % 3;
        this.boardState[row][col] = this.turn;
        this.possiblePlays.splice( this.possiblePlays.indexOf(Number(location)), 1 );
        this.renderPiece(target);
        this.checkWinner(row, col);
        this.nextTurn();
    }

    renderPiece(target) {
        target.innerText = this.turn === 1 ? 'X' : 'O';
    }
}