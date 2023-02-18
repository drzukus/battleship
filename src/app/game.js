import { Player } from "./player"
import { renderBoards } from "./dom"


const startGame = () => {
    const p1 = Player();
    const p2 = Player();

    p1.turn = true;

    // To remove
    p1.playerBoard.placeShip(0, 0, 4, "h")
    p2.playerBoard.placeShip(0, 0, 4, "v")

    renderBoards()
    renderShips(p1)
    renderShips(p2)
}

export { startGame }