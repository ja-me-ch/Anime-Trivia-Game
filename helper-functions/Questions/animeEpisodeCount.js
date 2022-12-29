import { common } from '@mui/material/colors';
import GetMediaInfoById from '../../graphql/getMediaInfoById';
import MakeRequest from '../../graphql/makeRequest';
import ShuffleArray from '../Functions/shuffleArray';

/*
Generate the question:
How many episodes does [anime] have? 

*/

const commonEpisodeCounts_A = [11, 12, 13];
const commonEpisodeCounts_B = [23, 24, 25];
const commonEpisodeCounts_C = [50, 51, 52];
const commonEpisodeCounts = commonEpisodeCounts_A.concat(commonEpisodeCounts_B).concat(commonEpisodeCounts_C);

const AnimeEpisodeCount = async function (mediaId) {
    const mediaInfo = await MakeRequest(GetMediaInfoById(mediaId))
        .then((res) => {
            return res.data.Media
        });

    // console.log(mediaInfo);
    //Return undefined if episode count is 1 or null
    if (mediaInfo.episodes === 1 || mediaInfo.episodes === null) return undefined;

    const answers = [];
    answers.push({
        answer: mediaInfo.episodes,
        isCorrect: true,
        clicked: false
    });

    generateSimilarAnswers(mediaInfo.episodes, answers);
    
    if (answers.length < 4) fillRemainingAnswers(answers);

    return ({
        title: mediaInfo.title,
        question: `${mediaInfo.title.romaji} contains how many episodes?`,
        answers: ShuffleArray(answers),
        coverImage: mediaInfo.coverImage,
        bannerImage: mediaInfo.bannerImage,
        siteUrl: mediaInfo.siteUrl
    })

}

const generateSimilarAnswers = function (episodeCount, answers) {
    //Generates similar answers and adds to the array
    //Generates a random amount, 1 or 2
    //eg. if the episode count is 150 it will generate 1 or 2 answers near 150

    //the range the random answer will be from episodeCount, eg. 147-153 if episodeCount is 150 and offset is 3
    const rangeOffset = 3;
    const maxAmount = 3; //max amount of answers to be generated
    const minAmount = 0; //min amount of answers to be generated

    let randAmount = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
    
    while (answers.length < randAmount + 1) {
        let randEpisodeCount = Math.floor(Math.random() * (rangeOffset * 2 + 1)) + (episodeCount - rangeOffset);
        
        if (ifValidAnswer(answers, randEpisodeCount)) {
            answers.push({
                answer: randEpisodeCount,
                isCorrect: false,
                clicked: false
            });
        }
    }
}

const ifValidAnswer = function (answers, pendingAnswer) {
    if (pendingAnswer <= 0) return false;
    
    if (!answers.some((a) => (a.answer === pendingAnswer))) return true;
    else return false;
}

const fillRemainingAnswers = function (answers) {
    //Fills answers array with random answers with commonEpisodeCounts
    while (answers.length < 4) {
        let rand = Math.floor(Math.random() * commonEpisodeCounts.length);
        if (!answers.some((q) => q.answer === commonEpisodeCounts[rand])) {
            answers.push({
                answer: commonEpisodeCounts[rand],
                isCorrect: false,
                clicked: false
            })
        }
    }
    return answers;
}




export default AnimeEpisodeCount;