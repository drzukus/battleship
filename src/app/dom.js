const board1 = document.querySelector("#board1")
const board2 = document.querySelector("#board2")
const winMsg = document.querySelector(".win-msg");
const restartBtn = document.querySelector(".restart-btn");


const createCells = (board, player, enemy) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", (e) => { renderAttack(e, player, enemy) });
            board.appendChild(cell);
        }
    }
}

const renderBoards = (p1, p2) => {
    createCells(board1, p1, p2);
    createCells(board2, p2, p1);
}

const renderAttack = (e, player, enemy) => {
    if (!enemy.turn) return;

    const r = e.target.dataset.row;
    const c = e.target.dataset.col

    if (!e.target.textContent) {
        e.target.classList.add("hit");
        e.target.textContent = "X";
        enemy.attack(r, c, player);

        enemy.turn = false
        player.turn = true;
    }

    if (player.playerBoard.board[r][c] === "X") {
        e.target.classList.add("ship-hit");
        if (player.playerBoard.allSunk()) {
            endGame(enemy, player);
        }
    }
}

const renderShips = (player) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; i++) {
            if (typeof player.playerBoard.board[i][j] == "object") {

            }

        }
    }
}

const resetBoards = (winner, loser) => {
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
        cell.textContent = ""
        cell.classList.remove("hit");
        cell.classList.remove("ship-hit");
    });
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            winner.playerBoard.board[i][j] = 0;
            loser.playerBoard.board[i][j] = 0;
        }
    }

    board1.classList.remove("unclickable");
    board2.classList.remove("unclickable");

    winner.turn = true;
    loser.turn = false;

    winMsg.textContent = "";
    restartBtn.style.display = "none";
}

const endGame = (winner, loser) => {
    board1.classList.add("unclickable");
    board2.classList.add("unclickable");

    winMsg.textContent = `${winner.name} won!`;
    restartBtn.style.display = "block";
    restartBtn.addEventListener("click", () => {resetBoards(winner, loser)});
}


export { renderBoards }
