
const createCells = (board) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add(`r${i}`)
            cell.classList.add(`c${j}`)
            cell.addEventListener("click", renderAttack, {once: true});
            board.appendChild(cell);
        }
    }
}

const renderBoards = () => {
    const board1 = document.querySelector("#board1")
    const board2 = document.querySelector("#board2")
    console.log("rendered")
    createCells(board1);
    createCells(board2);
}

const renderShips = (player) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; i++) {
            if (typeof player.playerBoard.board[i][j] == "object") {

            }

        }
    }
}

const renderAttack = () => {

}

export { renderBoards }