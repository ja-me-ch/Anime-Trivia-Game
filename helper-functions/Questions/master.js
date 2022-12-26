import getRandomIndex from "../Functions/getRandomIndex";

import AnimeSeasonAirDate from "./animeSeasonAirDate";
import VoiceActorAnimeCharacter from "./voiceActorAnimeCharacter";

/*
-Randomly selects a question
-Question will be rerolled if undefined is returned

extra: weighted questions, not show question for same mediaId twice in a row
*/

const questions = [
    // AnimeSeasonAirDate,
    VoiceActorAnimeCharacter
]

const getRandomQuestion = async function (commonList) {
    let randomMediaEntry = getRandomIndex(commonList);
    let randomQuestion = getRandomIndex(questions);

    const question = undefined;
    question = await getQuestionData(randomMediaEntry, randomQuestion);
    let i = 0;
    let maxCalls = 20;

    for (let i = 0; i < maxCalls; i++) {
        const pendingQuestion = undefined;
        pendingQuestion = await getQuestionData(randomMediaEntry, randomQuestion)
            .then((res) => {
                if (res !== undefined) return res;
                i++;
            });
        if (pendingQuestion !== undefined) return pendingQuestion;
    }

}

const getQuestionData = async function (media, question) {
    // console.log(media.mediaId)
    const questionData = await question(media.mediaId);
    // console.log(questionData)
    return questionData;
}

export default getRandomQuestion;