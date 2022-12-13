import React, { useEffect, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import { QuestionAndAnswerContext } from '../../contexts/QuestionAndAnswerContext';
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
    const { questionHistory } = useContext(AnimeTriviaGameContext);

    const { currentQuestion, setCurrentQuestion, questionNumber, getNextQuestion, disableAnswering, onClickAnswer } = useContext(QuestionAndAnswerContext);


    useEffect(() => {

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
        setCurrentQuestion(questionHistory[questionNumber]);
        // CallApi();
    }, [questionHistory, questionNumber, currentQuestion])

    // if (currentQuestion === undefined) return <button onClick={() => GenerateNewQuestion()}>Start/Next</button>;
    // console.log(questionHistory);
    // console.log(currentQuestion.answers);

    const setButton = function (currentQuestion) {
        if (currentQuestion === undefined) {
            return <button onClick={() => getNextQuestion()}>Start</button>
        }
        else return <button onClick={() => {
            getNextQuestion();
        }
        }>Next</button>
    }

    const setQuestionsAndAnswers = function (currentQuestion) {
        console.log(currentQuestion)
        if (currentQuestion === undefined) {
            return (null);
        }
        else {
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
                    disableAnswering={disableAnswering}
                    onClickAnswer={onClickAnswer}
                    defaultColors={defaultColors}
                    toggledColors={toggledColors}
                    clicked={a.clicked}
                    key={`${letters[index]}-${index}-${a.answer}`}
                // AnswersProps={AnswersProps}
                />;
            });
            return <div>
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
        }
    }

    return (
        <div>
            {setButton(currentQuestion)}
            {setQuestionsAndAnswers(currentQuestion)}
        </div>
    )
}

export default QuestionPanel;
