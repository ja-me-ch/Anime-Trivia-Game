const getRandomCommonMediaId = function(array) {
    let rand = Math.floor(Math.random() * array.length);
    return array[rand].mediaId;
}

export default getRandomCommonMediaId;