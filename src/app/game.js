import { Player } from "./player"
import { renderBoards, endGame } from "./dom"


const startGame = () => {
    const p1 = Player("Player 1");
    const p2 = Player("Player 2");

    p1.turn = true;

    // To remove
    p1.playerBoard.placeShip(0, 0, 4, "h")
    p2.playerBoard.placeShip(0, 0, 4, "v")

    renderBoards(p1, p2)
}

export { startGame }