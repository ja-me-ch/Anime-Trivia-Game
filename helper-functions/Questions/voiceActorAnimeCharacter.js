import GetCharacterVoiceActorByMediaId from '../../graphql/getCharacterVoiceActorByMediaId';
import styled from '@emotion/styled';
import MakeRequest from '../../graphql/makeRequest';
import ShuffleArray from '../Functions/shuffleArray';
import getRandomIndex from '../Functions/getRandomIndex';
import Images from '../../components/QuestionPanel/QuestionTemplates/Images';

/*Generates the question:
    [voice actor] voices which character in [anime]?
    //Display 4 characters from the anime

    If anime doesn't have > 4 characters, return null
*/

const CustomNameSpan = styled('span')((props) => ({
    display: 'block',
    width: '100%',
    textAlign: 'center',
    margin: props.native ? '0 0 -8px 0' : '0',
    fontSize: props.native ? '0.8em' : '1.2em'
}));

const VoiceActorAnimeCharacter = async function (mediaId) {
    // console.log(mediaId);
    const mediaInfo = await MakeRequest(GetCharacterVoiceActorByMediaId(mediaId))
        .then((res) => {
            return res.data.Media;
        });

    const characters = mediaInfo.characters.edges;
    if (characters.length < 4) {
        // console.log(`${mediaInfo}`)
        return undefined;
    }
    // let selectedCharacter = mediaInfo.characters.edges[getRandomIndex(mediaInfo.characters.edges)]
    // for (let i = 0; i < 4; i++) {
    //     characters.push(mediaInfo.characters.edges[getRandomIndex(mediaInfo.characters.edges)])
    // }

    const pendingCharacters = [];
    pendingCharacters.push({
        ...getRandomCharacter(characters, 'Japanese', true),
        isCorrect: true,
        clicked: false
    });

    let i = 0;
    while (pendingCharacters.length !== 4 || i === 20) {
        let pendingCharacter = getRandomCharacter(characters, 'Japanese', true);
        if (!pendingCharacters.some((a) => a.voiceActor.id === pendingCharacter.voiceActor.id)) {
            // console.log(`${i} - ${pendingCharacter.voiceActor.id} is not in answers.`);
            // console.log(`pendingCharacter`)
            // console.log(pendingCharacter)
            pendingCharacters.push(pendingCharacter);
        }
        // else {
        //     console.log(`${i} - ${pendingCharacter.voiceActor.id} is already in answers.`);
        // }
        i++;
        if (i === 20) {
            return undefined;
        }
    }

    const answers = pendingCharacters.map((c) => {
        const getCustomChildren = function () {
            const nativeName = c.character.name.native;
            const fullName = c.character.name.full;
            return <div>
                {nativeName !== null ? <CustomNameSpan native={true}>{`${nativeName}`}</CustomNameSpan> : null}
                <CustomNameSpan>{`${fullName}`}</CustomNameSpan>
            </div>
        }
        return {
            answer: `${c.character.name.full}, ${c.character.name.native}`,
            isCorrect: c.isCorrect ? true : false,
            clicked: false,
            customChildren: getCustomChildren(),
            image: c.character.image.large,
            siteUrl: c.character.siteUrl
        }
    });

    // console.log(pendingCharacters[0]);

    const randomizedAnswers = ShuffleArray(answers);
    // console.log('answers:')
    // console.log(randomizedAnswers[0]);
    const images = [
        {
            image: pendingCharacters[0].voiceActor.image.large,
            siteUrl: pendingCharacters[0].voiceActor.siteUrl
        },
        {
            image: randomizedAnswers[0].image,
            siteUrl: randomizedAnswers[0].siteUrl
        },
        {
            image: randomizedAnswers[1].image,
            siteUrl: randomizedAnswers[1].siteUrl
        },
        {
            image: randomizedAnswers[2].image,
            siteUrl: randomizedAnswers[2].siteUrl
        },
        {
            image: randomizedAnswers[3].image,
            siteUrl: randomizedAnswers[3].siteUrl
        },
    ]

    return ({
        title: mediaInfo.title,
        question: `${pendingCharacters[0].voiceActor.name.full} voices which character in ${mediaInfo.title.romaji}?`,
        answers: randomizedAnswers,
        coverImage: mediaInfo.coverImage,
        bannerImage: mediaInfo.bannerImage,
        siteUrl: mediaInfo.siteUrl,
        images: images,
        template: 'Images'
    })



}

const getRandomCharacter = function (charactersArray, language, requiresVoiceActor) {
    /*
    Picks a random character from characters,
    if it has voiceActors, check if it has voice actors of the language
    if it a voice actor of the specified language, check if character is already present in answers
    if not, add it to answers
    repeat until answers.length = 4
    */

    let pendingCharacter = getRandomIndex(charactersArray);
    if (requiresVoiceActor) {
        let voiceActor = findVoiceActor(pendingCharacter, language);
        let i = 0;
        // console.log(`${i} - ${pendingCharacter.node.name.full}`)
        while (voiceActor === undefined || i === 20) {
            pendingCharacter = getRandomIndex(charactersArray);
            voiceActor = findVoiceActor(pendingCharacter, language);
            // console.log(`${i} - ${voiceActor.name.full} - ${pendingCharacter.node.name.full}`)
            i++;
        }
        if (i === 20) return undefined;
        else return {
            character: pendingCharacter.node,
            voiceActor: voiceActor
        };
    }
    else return pendingCharacter = {
        character: pendingCharacter.node
    }
}

const findVoiceActor = function (character, desiredLanguage) {
    let voiceActor = character.voiceActors.find((v) => (v.languageV2 === desiredLanguage));
    return voiceActor;
}

export default VoiceActorAnimeCharacter;

