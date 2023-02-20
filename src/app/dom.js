const board1 = document.querySelector("#board1")
const board2 = document.querySelector("#board2")
const winMsg = document.querySelector(".win-msg");
const restartBtn = document.querySelector(".restart-btn");
const turnMsg = document.querySelector(".turn-msg");
const coordsPrompt = document.querySelector(".ship-coords-prompt");
const p1CoordsForm = document.querySelector(".coords-p1")


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

    board1.classList.add("unclickable");
    board2.classList.add("unclickable");

    renderCoordsEntry(p1);
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

        turnMsg.textContent = `${player.name}'s turn`
    }

    if (player.playerBoard.board[r][c] === "X") {
        e.target.classList.add("ship-hit");
        if (player.playerBoard.allSunk()) {
            endGame(enemy, player);
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


const renderCoordsEntry = (player) => {
    const sizes = [5, 4, 3, 3, 2]
    let counter = 1;
    p1CoordsForm.addEventListener("submit", (e) => {
        e.preventDefault()
        if (counter < 5) {
            updateCoordsPrompt(sizes[counter]);
            counter++;
            player.playerBoard.placeShip(Number(p1CoordsForm.elements["row"].value), Number(p1CoordsForm.elements["col"].value), sizes[counter - 2], p1CoordsForm.elements["dir"].value);
            console.log(player.playerBoard.board)
            renderShip(player);
        } else {
            removeCoordsEntry()
        }
        p1CoordsForm.reset();
    })
}

const removeCoordsEntry = () => {
    coordsPrompt.style.display = "none";
    p1CoordsForm.style.display = "none";
}

const updateCoordsPrompt = (size) => {
    coordsPrompt.textContent = coordsPrompt.textContent.slice(0, -1) + size.toString();
}

const renderShip = (player) => {
    
}

export { renderBoards }
