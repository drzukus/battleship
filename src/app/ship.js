const Ship = (length) => {
    let hits = 0;
    const hit = () => {
        hits++
        return hits
    };

    const isSunk = () => {
        if (hits === length) {
            return true;
        } else {
            return false
        }
    }
    return { length, hit, isSunk }
}

export { Ship }