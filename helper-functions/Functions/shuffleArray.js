const ShuffleArray = function (inputArray) {
    const array = inputArray.map((e) => (e));
    const shuffledArray = [];

    while (array.length > 0) {
        let rand = Math.floor(Math.random() * array.length)
        let answer = array[rand];
        array.splice(rand, 1);
        shuffledArray.push(answer);
    }
    return shuffledArray;
}

export default ShuffleArray;