import React, { useEffect, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import AnimeSeasonAirDate from '../../helper-functions/Questions/animeSeasonAirDate';
import Question from './Question';
import Answer from './Answer';
import { CurrencyBitcoin } from '@mui/icons-material';

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
    const { commonList, lockAnswers, AnswerOnClick, profiles, questionHistory, GenerateNewQuestion } = useContext(AnimeTriviaGameContext);

    const [currentQuestion, setCurrentQuestion] = useState();

    useEffect(() => {
        const list = commonList.filter((e) => e.users.length >= 2);

        /*
            DONE:
            change questionpanel to rerender when question is added to history

            TODO:
            have a number selecter to increment to next questionHistory entry
            display latest question in questionpanel
            have a user input for number of users in common
            have a button to 'start' that starts to generate the questions
            store questions and history in an array in context
            keep track of length of array in a state variable to rerender
            and display current question (array.length-1)
            start button will change to 'next' button to display next randomly generated question
            it will push to the question history and update the length of the array (state) and render new question

            extra: keep track of whether the question was answered correctly
        */
        const CallApi = async function () {
            // await MakeRequest(GetMediaInfoById(15689)).then((res) => console.log(res))
            // await MakeRequest(GetStaffById(95028)).then((res) => console.log(res))

            // const data = await AnimeSeasonAirDate(15689);
        }
        // console.log(questionHistory);
        console.log('useEffect triggered!');
        console.log('questionHistory[0]: ' + questionHistory[0]);
        console.log('currentQuestion: ' + currentQuestion)
        setCurrentQuestion(questionHistory[0]);
        // CallApi();
    }, [questionHistory, currentQuestion])

    if (currentQuestion === undefined) return <button onClick={() => GenerateNewQuestion()}>Start/Next</button>;
    // console.log(questionHistory);
    console.log('past if check');
    // console.log(currentQuestion.answers);

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
