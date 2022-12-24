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

    const question = await getQuestionData(randomMediaEntry, randomQuestion);
    let i = 0;
    while (question === undefined) {
        console.log('while loop!')
        let pendingQuestion = await getQuestionData(randomMediaEntry, randomQuestion);
        // console.log(pendingQuestion);
        if (pendingQuestion === undefined) {
            console.log(`${pendingQuestion.mediaId} is not valid, rerolling.`)
            i++;
        }
        else {
            question = pendingQuestion;
            return question;
        }

        if (i === 20) {
            return undefined;
        }
    }
}

const getQuestionData = async function (media, question) {
    const questionData = await question(11583);
    // console.log(questionData)
    return questionData;
}

export default getRandomQuestion;