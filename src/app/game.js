import { Player } from "./player"
import { renderBoards } from "./dom"


const startGame = () => {
    const p1 = Player("Player 1");
    const p2 = Player("Player 2");

    p1.turn = true;


    renderBoards(p1, p2)
}

export { startGame }