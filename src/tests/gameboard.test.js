import { Gameboard } from "../app/gameboard.js";

describe("Gameboard", () => {
    const gameboard = Gameboard();

    // test("place ship within bounds", () => {
    //     gameboard.placeShip(0, 0, 4, "h")
    //     expect(gameboard.board[0]).toEqual([1, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
    //     console.log(gameboard.board)
    // });
    // test("place ship out of bounds, h", () => {
    //     gameboard.placeShip(8, 0, 4, "h")
    //     expect(gameboard.board[0]).toEqual([1, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
    // });
    // test("place ship out of bounds, v", () => {
    //     gameboard.placeShip(0, 8, 4, "v");
    //     console.log(gameboard.board)
    //     expect(gameboard.board[8]).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    // });
    // test("ship in the way", () => {
    //     gameboard.placeShip(0, 0, 4, "h");
    //     gameboard.placeShip(1, 0, 4, "h");
    //     gameboard.placeShip(0, 0, 4, "v");
    //     gameboard.placeShip(6, 0, 4, "h");
    //     expect(gameboard.board[0]).toEqual([1, 1, 1, 1, 0, 0, 1, 1, 1, 1]);
    //     expect(gameboard.board[1]).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    // });
    test("ship hit", () => {
        gameboard.placeShip(0, 0, 4, "h");
        gameboard.receiveAttack(0, 0);
        expect(gameboard.board[0][0]).toBe("X");
        // expect(gameboard.board[0][1]).toBe(1);
        expect(gameboard.board[1][0]).toBe(0);
    });
    test("all sunk", () => {
        expect(gameboard.allSunk()).toBeFalsy();
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(2, 0);
        gameboard.receiveAttack(3, 0);
        expect(gameboard.allSunk()).toBeTruthy();
    });
})