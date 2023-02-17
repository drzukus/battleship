import { Ship } from "../app/ship.js"

describe("Ship", () => {
    const five = Ship(3);
    test("length", () => {
        expect(five.length).toEqual(3);
    });
    test("hits", () => {
        expect(five.hit()).toEqual(1)
    });
    test("not sunk", () => {
        expect(five.isSunk()).toBeFalsy();
    });
    test("hit and sunk", () => {
        five.hit()
        five.hit();
        expect(five.isSunk()).toBeTruthy();
    })
})