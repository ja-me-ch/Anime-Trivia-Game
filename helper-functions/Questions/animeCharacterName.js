import MakeRequest from '../../graphql/makeRequest';
import styled from '@emotion/styled';
import ShuffleArray from '../Functions/shuffleArray';
import getRandomIndex from '../Functions/getRandomIndex';
import GetCharactersByMediaId from '../../graphql/getCharactersByMediaId';
import { Shuffle } from '@mui/icons-material';

/*
Generates the question: 
[anime character image] what is the name of this character in [anime title]?
display 4 characters from the anime

If anime doesnt have > 4 characters, return undefined
*/

const CustomNameSpan = styled('span')((props) => ({
    display: 'block',
    width: '100%',
    textAlign: 'center',
    margin: props.native ? '0 0 -8px 0' : '0',
    fontSize: props.native ? '0.8em' : '1.2em'
}));

const AnimeCharacterName = async function (mediaId) {
    const mediaInfo = await MakeRequest(GetCharactersByMediaId(mediaId))
        .then((res) => {
            return res.data.Media;
        });

    if (mediaInfo.characters.nodes.length < 4) return undefined;

    const charactersArray = [];

    let i = 0;
    while (charactersArray.length !== 4 || i === 20) {
        const pendingCharacter = getRandomCharacter(charactersArray, mediaInfo.characters.nodes);
        if (pendingCharacter !== undefined) charactersArray.push(pendingCharacter);
        i++;
        if (i === 20) {
            return undefined;
        }
    }

    const answers = charactersArray.map((c, index) => {
        return {
            answer: `${c.name.full}, ${c.name.native}`,
            isCorrect: index === 0 ? true : false,
            clicked: false,
            customChildren: getCustomChildren(c),
            image: c.image.large,
            siteUrl: c.siteUrl
        }
    });

    // console.log(answers);

    const images = [
        {
            image: mediaInfo.coverImage.large,
            siteUrl: mediaInfo.siteUrl
        },
        {
            image: charactersArray[0].image.large,
            siteUrl: charactersArray[0].siteUrl
        }
    ]

    const randomizedAnswers = ShuffleArray(answers);

    return ({
        title: mediaInfo.title,
        question: `What is the name of this character in the anime: ${mediaInfo.title.romaji}`,
        answers: randomizedAnswers,
        coverImage: mediaInfo.coverImage,
        bannerImage: mediaInfo.bannerImage,
        siteUrl: mediaInfo.siteUrl,
        template: {
            name: 'Images',
            showMain: true,
            imagesCount: 1,
            images: images,
        }
    })
}

const getCustomChildren = function (c) {
    const nativeName = c.name.native;
    const fullName = c.name.full;
    return <div>
        {nativeName !== null ? <CustomNameSpan native={true}>{`${nativeName}`}</CustomNameSpan> : null}
        <CustomNameSpan>{`${fullName}`}</CustomNameSpan>
    </div>
}

const getRandomCharacter = function (charactersArray, characterPool) {
    let pendingCharacter = getRandomIndex(characterPool);
    console.log(pendingCharacter)
    if (pendingCharacter.image.large === '"https://s4.anilist.co/file/anilistcdn/character/large/default.jpg' || pendingCharacter.image.medium === 'https://s4.anilist.co/file/anilistcdn/character/medium/default.jpg') return undefined;
    if (charactersArray.some((c) => (c.id === pendingCharacter.id))) return undefined;
    else return pendingCharacter;
}

export default AnimeCharacterName;