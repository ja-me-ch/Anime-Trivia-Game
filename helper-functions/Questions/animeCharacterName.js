import MakeRequest from '../../graphql/makeRequest';
import ShuffleArray from '../Functions/shuffleArray';
import getRandomIndex from '../Functions/getRandomIndex';
import GetCharactersByMediaId from '../../graphql/getCharactersByMediaId';

/*
Generates the question: 
[anime character image] what is the name of this character in [anime title]?
display 4 characters from the anime

If anime doesnt have > 4 characters, return undefined
*/

const AnimeCharacterName = async function (mediaId) {
    const mediaInfo = await MakeRequest(GetCharactersByMediaId(mediaId))
        .then((res) => {
            return res.data.Media;
        });

    if (mediaInfo.characters.nodes.length < 4) return undefined;

    const charactersArray = [];
    for (let i = 0; i <= 7; i++) {
        const pendingCharacter = getRandomCharacter(charactersArray, mediaInfo.characters.nodes);
        if (pendingCharacter !== undefined) charactersArray.push(pendingCharacter);
    }
    console.log(charactersArray);

}

const getRandomCharacter = function (charactersArray, characterPool) {
    let pendingCharacter = getRandomIndex(characterPool);
    console.log(pendingCharacter)
    if (pendingCharacter.image.large === '"https://s4.anilist.co/file/anilistcdn/character/large/default.jpg' || pendingCharacter.image.medium === 'https://s4.anilist.co/file/anilistcdn/character/medium/default.jpg') return undefined;
    if (charactersArray.some((c) => (c.id === pendingCharacter.id))) return undefined;
    else return pendingCharacter;
}

export default AnimeCharacterName;