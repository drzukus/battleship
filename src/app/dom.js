const board1 = document.querySelector("#board1")
const board2 = document.querySelector("#board2")
const winMsg = document.querySelector(".win-msg");
const restartBtn = document.querySelector(".restart-btn");
const turnMsg = document.querySelector(".turn-msg");
const p1CoordsPrompt = document.querySelector(".coords-prompt-p1");
const p2CoordsPrompt = document.querySelector(".coords-prompt-p2");
const p1CoordsForm = document.querySelector(".coords-p1");
const p2CoordsForm = document.querySelector(".coords-p2")
const placeShipError = document.querySelector(".placement-error-msg");
const beginBtn = document.querySelector(".begin-btn");


const clearShipPlacements = (board) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            board.children.item(i).children.item(j).classList.remove("ship");
        }
    }
}



const createCells = (board, player, enemy) => {
    for (let i = 0; i < 10; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", (e) => { renderAttack(e, player, enemy) });
            row.appendChild(cell);
        }
        board.appendChild(row)
    }
}

const renderDOM = (p1, p2) => {
    createCells(board1, p1, p2);
    createCells(board2, p2, p1);

    board1.classList.add("unclickable");
    board2.classList.add("unclickable");

    turnMsg.classList.add("hidden");

    renderCoordsEntry(p1);
    renderCoordsEntry(p2);

    beginBtn.addEventListener("click", () => {
        clearShipPlacements(board1);
        clearShipPlacements(board2);

        board1.classList.remove("unclickable");
        board2.classList.remove("unclickable");
        beginBtn.classList.add("hidden");
        turnMsg.classList.remove("hidden");
    });
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
    winMsg.classList.add("hidden");
    restartBtn.classList.add("hidden");
    beginBtn.classList.remove("hidden");
}

const endGame = (winner, loser) => {
    board1.classList.add("unclickable");
    board2.classList.add("unclickable");

    winMsg.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
    turnMsg.classList.add("hidden")

    winMsg.textContent = `${winner.name} won!`;
    restartBtn.style.display = "block";
    restartBtn.addEventListener("click", () => {resetBoards(winner, loser)});
}


const renderCoordsEntry = (player) => {
    const sizes = [5, 4, 3, 3, 2]
    let counter = 0;
    const form = player.name == "Player 1" ? p1CoordsForm : p2CoordsForm;
    const prompt = player.name == "Player 1" ? p1CoordsPrompt : p2CoordsPrompt;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const r = Number(form.elements["row"].value);
        const c = Number(form.elements["col"].value);
        const l = sizes[counter];
        const d = form.elements["dir"].value;

        if (!player.playerBoard.placeShip(r, c, l, d)) {
            placeShipError.textContent = "Invalid placement, try again";
            return
        }
        counter++;
        renderShip(player, r, c, l, d);
        if (counter < 5) {
            updateCoordsPrompt(sizes[counter], prompt);
        } else {
            removeCoordsEntry(form, prompt);
        }
        form.reset();
    })
}


const removeCoordsEntry = (form, prompt) => {
    prompt.classList.add("hidden");
    form.classList.add("hidden");
}

const updateCoordsPrompt = (size, prompt) => {
    prompt.textContent = prompt.textContent.slice(0, -1) + size.toString();
}

const renderShip = (player, r, c, l, d) => {
    const board = player.name == "Player 1" ? board1 : board2;
    for (let i = 0; i < l; i++) {
        if (d === "h") {
            board.children.item(r).children.item(c + i).classList.add("ship");
        }
        else if (d === "v") {
            board.children.item(r + i).children.item(c).classList.add("ship");
        }
    }
}

export { renderDOM }
