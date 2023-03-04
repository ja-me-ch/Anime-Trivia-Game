import React, { useState, createContext, useContext } from 'react';
import { AnimeTriviaGameContext } from './AnimeTriviaGameContext';
import AnimeSeasonAirDate from '../helper-functions/Questions/animeSeasonAirDate';
import VoiceActorAnimeCharacter from '../helper-functions/Questions/voiceActorAnimeCharacter';
import getRandomIndex from '../helper-functions/Functions/getRandomIndex';
import getRandomQuestion from '../helper-functions/Questions/master';

export const QuestionAndAnswerContext = createContext();

export function QuestionAndAnswerProvider(props) {
    const [currentQuestion, setCurrentQuestion] = useState();
    const [questionNumber, setQuestionNumber] = useState(-1);
    const [disableAnswering, setDisableAnswering] = useState(false);
    const [clicked, setClicked] = useState([]);
    const [buttonStatus, setButtonStatus] = useState(false);

    const { commonList, questionHistory } = useContext(AnimeTriviaGameContext)

    const getNextQuestion = function (commonUserCount) {
        setButtonStatus(true);
        const list = commonList.value.filter((e) => e.users.length >= commonUserCount);
        if (list.length === 0) return null;

        const MakeCall = async function () {
            for (let i = 0; i <= 20; i++) {
                const pendingQuestion = await getRandomQuestion(list);
                // console.log(pendingQuestion);
                if (pendingQuestion !== undefined) return pendingQuestion;
            }
            // return await getRandomQuestion(list);
        }

        MakeCall()
            .then((res) => {
                // console.log('res');
                // console.log(res);
                // const pendingNewQuestion = getRandomQuestion(list);
                if (res === undefined) {
                    setDisableAnswering(true);
                    return null;
                }
                else {
                    // console.log(res);

                    // const newQuestionHistory = questionHistory.map((e) => e);
                    // newQuestionHistory.push(res);
                    // setQuestionHistory(newQuestionHistory);
                    // setQuestionHistory((h) => {
                    //     const newHistory = h.map((h) => (h));
                    //     newHistory.push(res);
                    //     return newHistory;
                    // })

                    questionHistory.update(res);

                    // setQuestionNumber((s) => {
                    //     s = s + 1;
                    //     return s;
                    // });

                    const newQuestionNumber = questionNumber + 1;
                    setQuestionNumber(newQuestionNumber);

                    setClicked([]);
                    setDisableAnswering(false);
                }
            }).finally(() => {
                setButtonStatus(false);
            })


        //     //transfer below to makecall.then()
        // console.log(pendingNewQuestion)
        // if (pendingNewQuestion !== undefined) {
        //     setDisableAnswering(false);
        //     const newQuestionHistory = questionHistory.map((e) => e)
        //     newQuestionHistory.push(pendingNewQuestion);
        //     setQuestionHistory(newQuestionHistory);
        //     setQuestionNumber((s) => {
        //         s = s + 1;
        //         return s;
        //     });

        // }


    }

    const toggleClicked = function (index) {
        // console.log(index, isCorrect)
        const newClicked = [];
        for (let i = 0; i < currentQuestion.answers.length; i++) {
            if (i === index) {
                newClicked.push(true);
            }
            else newClicked.push(false);
        }
        setDisableAnswering(true);
        setClicked(newClicked);
        questionHistory.updateAnswers(questionNumber, index)
    }

    return (
        <QuestionAndAnswerContext.Provider
            value={{
                currentQuestion,
                setCurrentQuestion,
                questionNumber,
                getNextQuestion,
                disableAnswering,
                clicked,
                toggleClicked,
                buttonStatus
            }}>
            {props.children}
        </QuestionAndAnswerContext.Provider>
    )
}