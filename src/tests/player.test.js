import { Player } from "../app/player.js"
import { Gameboard } from "../app/gameboard"

describe("player test", () => {
    const gameboard1 = Gameboard();
    const player1 = Player(gameboard1);
    const gameboard2 = Gameboard();
    const player2 = Player(gameboard2);

    test("attack", () => {
        player1.attack(0, 0, player2);
        expect(player2.playerBoard.board[0][0]).toBe("m")
        expect(player1.playerBoard.board[0][0]).toEqual(0)
    });
    test("illegal random attack", () => {
        const coords = player1.randomAttack(player2);
        expect(player2.playerBoard.board[coords[1]][coords[0]]).toEqual("m")
        expect(player2.playerBoard.board[0][0]).toBe("m")
        console.log(player2.playerBoard.board)
    });

})