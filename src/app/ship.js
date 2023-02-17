const Ship = (length) => {
    let hits = 0;
    const hit = () => {
        hits++
        return hits
    };

    const isSunk = () => {
        return hits === length ? true : false;
    }
    return { length, hit, isSunk }
}

export { Ship }