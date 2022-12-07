import React, { useEffect, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import AnimeSeasonAirDate from '../../helper-functions/Questions/animeSeasonAirDate';
import Question from './Question';
import Answer from './Answer';

const AnswersContainer = styled('div')((props) => ({
    // border: '1px solid purple',
    margin: '1em 0em',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center'
}));

function QuestionPanel() {
    const { commonList, lockAnswers, AnswerOnClick } = useContext(AnimeTriviaGameContext);

    const [currentQuestion, setCurrentQuestion] = useState();

    useEffect(() => {
        const list = commonList.filter((e) => e.users.length >= 2);
        console.log(list);

        const CallApi = async function () {
            // await MakeRequest(GetMediaInfoById(15689)).then((res) => console.log(res))
            // await MakeRequest(GetStaffById(95028)).then((res) => console.log(res))

            const data = await AnimeSeasonAirDate(15689);
            setCurrentQuestion(data);
        }
        CallApi();
    }, [commonList])


    if (currentQuestion === undefined) return null;
    console.log(currentQuestion);

    const defaultColors = ['#302640', '#534070'];
    const correctColors = ['#5A895D'];
    const incorrectColors = ['#794F4F'];
    const letters = ['A', 'B', 'C', 'D'];
    const answerComponents = currentQuestion.answers.map((a, index) => {
        const toggledColors = [];
        if (a.isCorrect) toggledColors = correctColors;
        else toggledColors = incorrectColors;
        return <Answer
            text={a.answer}
            isCorrect={a.isCorrect}
            letter={letters[index]}
            lockAnswers={lockAnswers}
            AnswerOnClick={AnswerOnClick}
            defaultColors={defaultColors}
            toggledColors={toggledColors}
        // AnswersProps={AnswersProps}
        />;
    })

    //decouple Answer.js from Question.js
    return (
        <div>
            <Question
                bannerImage={currentQuestion.bannerImage}
                question={currentQuestion.question}
                title={currentQuestion.title}
                siteUrl={currentQuestion.siteUrl}
            />
            <AnswersContainer>
                {answerComponents}
            </AnswersContainer>
        </div>
    )
}

export default QuestionPanel;
