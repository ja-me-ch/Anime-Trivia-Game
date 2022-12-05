import GetMediaInfoById from '../../graphql/getMediaInfoById';
import MakeRequest from '../../graphql/makeRequest';
import Question from '../../components/QuestionPanel/Question';
import Answer from '../../components/QuestionPanel/Answer';

//Generate the question:
//In what season did this anime air in? eg. Fall 2012
//find all related anime (eg. prequel sequel)
//filter all of them from commonList
//proceed with finding random answers for question

//todo: return question template
async function AnimeSeasonAirDate(mediaId, commonList) {
    const mediaInfo = await MakeRequest(GetMediaInfoById(mediaId))
        .then((res) => {
            return res.data.Media
        });

    const answers = [];
    answers.push(
        {
            answer: `${mediaInfo.season} ${mediaInfo.seasonYear}`,
            isCorrect: true
        }
    )

    while (answers.length < 4) {
        let falseAnswer = {
            answer: `${generateRandomSeason()} ${generateRandomYear(mediaInfo.seasonYear)}`,
            isCorrect: false
        }
        if (!answers.some((q) => q.answer === falseAnswer.answer)) {
            answers.push(falseAnswer);
        }
    }

    const answerComponents = answers.map((a) => {
        return <Answer text={a.answer} isCorrect={a.isCorrect}/>
    })


    //todo: generate full JSX for the question to be displayed in the question module
    return ({
        title: mediaInfo.title,
        question: `${mediaInfo.title.romaji} was released in which season and year?`,
        answers: answers,
        coverImage: mediaInfo.coverImage,
        bannerImage: mediaInfo.bannerImage,
        siteUrl: mediaInfo.siteUrl,
        //possible use for options: dont show coverImage/bannerImage incase of spoilers
        //eg. options: {bannerImage: false}
        //options: {} 
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