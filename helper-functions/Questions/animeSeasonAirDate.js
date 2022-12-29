import GetMediaInfoById from '../../graphql/getMediaInfoById';
import MakeRequest from '../../graphql/makeRequest';
import ShuffleArray from '../Functions/shuffleArray';

//Generate the question:
//In what season did this anime air in? eg. Fall 2012
//proceed with finding random answers for question

const AnimeSeasonAirDate = async function (mediaId) {
    const mediaInfo = await MakeRequest(GetMediaInfoById(mediaId))
        .then((res) => {
            return res.data.Media
        });

    const answers = [];
    answers.push(
        {
            answer: `${mediaInfo.season} ${mediaInfo.seasonYear}`,
            isCorrect: true,
            clicked: false
        }
    )

    while (answers.length < 4) {
        let falseAnswer = {
            answer: `${generateRandomSeason()} ${generateRandomYear(mediaInfo.seasonYear)}`,
            isCorrect: false,
            clicked: false
        }

        //if the falseAnswer.answer is not a duplicate of an answer in answers, push into answers
        if (!answers.some((q) => q.answer === falseAnswer.answer)) {
            answers.push(falseAnswer);
        }
    }

    return ({
        title: mediaInfo.title,
        question: `${mediaInfo.title.romaji} was released in which season and year?`,
        answers: ShuffleArray(answers),
        coverImage: mediaInfo.coverImage,
        bannerImage: mediaInfo.bannerImage,
        siteUrl: mediaInfo.siteUrl
    })
}

const generateRandomYear = function (year) {
    const max = year + 5;
    const min = year - 5;
    return Math.floor(min + Math.random() * (max - min + 1));
}

const generateRandomSeason = function () {
    const seasons = ['SPRING', 'SUMMER', 'FALL', 'WINTER'];
    const rnd = Math.floor(Math.random() * seasons.length);
    return seasons[rnd];
}

export default AnimeSeasonAirDate;