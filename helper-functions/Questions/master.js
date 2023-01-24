import getRandomIndex from "../Functions/getRandomIndex";

import AnimeSeasonAirDate from "./animeSeasonAirDate";
import VoiceActorAnimeCharacter from "./voiceActorAnimeCharacter";
import AnimeEpisodeCount from "./animeEpisodeCount";
import AnimeCharacterName from "./animeCharacterName";

/*
-Randomly selects a question
-Question will be rerolled if undefined is returned

extra: 
-weighted questions, not show question for same mediaId twice in a row
-if the question is invalid/undefined, reroll the question instead of mediaId first
*/

const questions = [
    // AnimeSeasonAirDate,
    // VoiceActorAnimeCharacter,
    // AnimeEpisodeCount,
    AnimeCharacterName
]

const getRandomQuestion = async function (commonList) {
    // let randomMediaEntry = getRandomIndex(commonList);
    // let randomQuestion = getRandomIndex(questions);

    // const question = undefined;
    // question = await getQuestionData(randomMediaEntry, randomQuestion);
    // let i = 0;
    let maxCalls = 1;

    for (let i = 0; i < maxCalls; i++) {
        const pendingQuestion = undefined;
        pendingQuestion = await getQuestionData(getRandomIndex(commonList), getRandomIndex(questions))
            .then((res) => {
                if (res !== undefined) return res;
                i++;
            });
        if (pendingQuestion !== undefined) return pendingQuestion;
        // else console.log(`Rerolling question for ${pendingQuestion}... ${i}`)
    }

}

const getQuestionData = async function (media, question) {
    // console.log(media.mediaId)
    const questionData = await question(media.mediaId);
    // if (questionData !== undefined) console.log(questionData.title.romaji);
    return questionData;
}

export default getRandomQuestion;