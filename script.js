function solveNQueens() {
    const boardSize = parseInt(document.getElementById("boardSize").value);
    const board = new Array(boardSize).fill(0).map(() => new Array(boardSize).fill(0));
    const solutions = [];
    
    function isSafe(board, row, col) {
        for (let i = 0; i < col; i++) {
            if (board[row][i] === 1) return false;
        }
        
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 1) return false;
        }
        
        for (let i = row, j = col; i < boardSize && j >= 0; i++, j--) {
            if (board[i][j] === 1) return false;
        }
        
        return true;
    }
    
    function solve(board, col) {
        if (col >= boardSize) {
            const solution = board.map(row => row.slice());
            solutions.push(solution);
            return;
        }
        
        for (let i = 0; i < boardSize; i++) {
            if (isSafe(board, i, col)) {
                board[i][col] = 1;
                solve(board, col + 1);
                board[i][col] = 0;
            }
        }
    }
    
    solve(board, 0);
    
    if (solutions.length === 0) {
        alert("No solutions found.");
        return;
    }
    
    const boardContainer = document.getElementById("boardContainer");
    boardContainer.innerHTML = "";
    
    solutions.forEach((solution, index) => {
        const boardDiv = document.createElement("div");
        boardDiv.className = "board";
        solution.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement("div");
                cellDiv.className = "cell";
                if (cell === 1) {
                    cellDiv.innerHTML = '<span class="queen">&#9813;</span>';
                }
                boardDiv.appendChild(cellDiv);
            });
        });
        const solutionHeader = document.createElement("h2");
        solutionHeader.textContent = `Solution ${index + 1}`;
        boardContainer.appendChild(solutionHeader);
        boardContainer.appendChild(boardDiv);
    });
}
