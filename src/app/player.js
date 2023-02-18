import { Gameboard } from "./gameboard.js"

const Player = () => {
    const playerBoard = Gameboard();
    let _turn = false;

    const attack = (c, r, enemy) => {
        if (!_turn) return
        enemy.playerBoard.receiveAttack(c, r);
    }

    const randomAttack = (enemy) => {
        if (!_turn) return
        
        const c = Math.floor(Math.random() * 10);
        const r = Math.floor(Math.random() * 10);

        if (enemy.playerBoard.board[r][c] === "X" || enemy.playerBoard.board[r][c] === "m") {
            randomAttack(enemy)
            return
        }

        enemy.playerBoard.receiveAttack(c, r);
        return [c, r]
    }

    
    return {
        get turn() {
            return _turn
        },
        set turn(turn) {
            _turn = turn;
        },
        playerBoard, attack, randomAttack
    }
}

export { Player }