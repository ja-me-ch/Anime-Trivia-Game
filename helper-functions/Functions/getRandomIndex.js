const getRandomIndex = function (array) {
    //array: pulls a random index from this array
    //values: dont return any values that are present in this array
    //property: the name of the property to pull from

    let rand = Math.floor(Math.random() * array.length);
    return array[rand];
}

export default getRandomIndex;