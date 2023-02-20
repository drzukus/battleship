import { Ship } from "./ship.js"

const Gameboard = () => {

    let board = [];
    const createBoard = (() => {
        for (let i = 0; i < 10; i++) {
            board[i] = [];
            for (let j = 0; j < 10; j++) {
                board[i][j] = 0;
            }
        }
    })();

    const cellsValid = (r, c, length, dir) => {
        for (let i = 0; i < length; i++) {
            if (dir === "h") {
                if (board[r][c + i] != 0 || board[r][c + i] === undefined) {
                    return false;
                }
            }
            else if (dir === "v") {
                if (board[r + i][c] || board[r + i][c] === undefined) return false;
            }
        }
        return true;
    };

    const placeShip = (r, c, length, dir) => {
        if (cellsValid(r, c, length, dir)) {
            const ship = Ship(length);
            for (let i = 0; i < ship.length; i++) {
                if (dir === "h") {
                    board[r][c + i] = ship;
                }
                else if (dir === "v") {
                    board[r + i][c] = ship;
                }
            }
        }
    };

    const receiveAttack = (r, c) => {
        if (typeof board[r][c] == "object") {
            board[r][c].hit();
            board[r][c] = "X";
        }
        else if (board[r][c] === 0) {
            board[r][c] = "m";
        };
    };

    const allSunk = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i].some((entry) => typeof entry == "object" )) return false;
        }
        return true;
    }

    return { 
        get board() {
        return board;
    },
     placeShip,
     receiveAttack,
     allSunk
    }
}

export { Gameboard }