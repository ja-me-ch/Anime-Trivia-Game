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
    const [disableAnswering, setDisableAnswering] = useState(true);
    const [clicked, setClicked] = useState([]);

    const { commonList, questionHistory, setQuestionHistory } = useContext(AnimeTriviaGameContext)

    const getNextQuestion = function (commonUserCount) {
        const list = commonList.filter((e) => e.users.length >= commonUserCount);
        if (list.length > 0) {
            // console.log(list);
            const MakeCall = async function () {
                //to test 11583
                // const selection = await VoiceActorAnimeCharacter(getRandomIndex(list).mediaId);
                // console.log(selection);
                // return selection;
                // return await AnimeSeasonAirDate(getRandomCommonMediaId(list));
                // return await AnimeSeasonAirDate(142329);

                return getRandomQuestion(list);
            }
            MakeCall()
                .then((res) => {
                    const newQuestionHistory = questionHistory.map((e) => e)
                    newQuestionHistory.push(res);
                    setQuestionHistory(newQuestionHistory);
                    setQuestionNumber((s) => {
                        s = s + 1;
                        return s;
                    });
                    setDisableAnswering(false);
                });


                //transfer below to makecall.then()
            const pendingNewQuestion = getRandomQuestion(list);
            console.log(pendingNewQuestion)
            if (pendingNewQuestion !== undefined) {
                setClicked([]);
                setDisableAnswering(false);
                const newQuestionHistory = questionHistory.map((e) => e)
                newQuestionHistory.push(pendingNewQuestion);
                setQuestionHistory(newQuestionHistory);
                setQuestionNumber((s) => {
                    s = s + 1;
                    return s;
                });

            }

        }
    }

    const toggleClicked = function (index, isCorrect) {
        const newClicked = [];
        for (let i = 0; i < currentQuestion.answers.length; i++) {
            if (i === index) {
                newClicked.push(true);
            }
            else newClicked.push(false);
        }
        setDisableAnswering(true);

        setClicked(newClicked);
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
                toggleClicked
            }}>
            {props.children}
        </QuestionAndAnswerContext.Provider>
    )
}