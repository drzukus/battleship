import { Gameboard } from "./gameboard.js"

const Player = (name) => {
    const playerBoard = Gameboard();
    let _turn = false;

    const attack = (r, c, enemy) => {
        if (!_turn) return
        enemy.playerBoard.receiveAttack(r, c);
    }

    const randomAttack = (enemy) => {
        if (!_turn) return

        const c = Math.floor(Math.random() * 10);
        const r = Math.floor(Math.random() * 10);

        if (enemy.playerBoard.board[r][c] === "X" || enemy.playerBoard.board[r][c] === "m") {
            randomAttack(enemy)
            return
        }

        enemy.playerBoard.receiveAttack(r, c);
        return [r, c]
    }

    
    return {
        get turn() {
            return _turn
        },
        set turn(turn) {
            _turn = turn;
        },
        get name() {
            return name
        },
        playerBoard, attack, randomAttack
    }
}

export { Player }