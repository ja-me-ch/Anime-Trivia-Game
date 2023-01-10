import React, { useEffect, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Select, MenuItem, FormControl, InputLabel, Button, CircularProgress } from '@mui/material';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import { QuestionAndAnswerContext } from '../../contexts/QuestionAndAnswerContext';
import AnimeSeasonAirDate from '../../helper-functions/Questions/animeSeasonAirDate';
import Question from './Question';
import Answer from './Answer';


import VoiceActorAnimeCharacter from '../../helper-functions/Questions/voiceActorAnimeCharacter';
const RootStyle = styled('div')((props) => ({
    position: 'relative',
    overflow: 'hidden'
}));

const CommonUserCount_Select = styled(Select)((props) => ({
    color: 'white',
    border: '1px solid white'
}));

const StartNext_Button = styled(Button)((props) => ({
    color: 'white',
    border: '1px solid white',
    transition: 'all 0.5s ease',
    '&:disabled': {
        color: 'red'
    }
}));

const Answers_Container = styled('div')((props) => ({
    // border: '1px solid purple',
    margin: '1em 0em',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    // zIndex: '110'
}));

const LoadingOverlay = styled('div')(({buttonStatus}) => ({
    position: 'absolute',
    left: '0',
    // height: '100vh',
    // width: '100vw',
    height: '100%',
    width: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    // zIndex: buttonStatus ? '100' : '-1',
    // opacity: buttonStatus ? '100' : '0',
    zIndex: '110',
    opactiy: '100'
}));

function QuestionPanel() {
    const { profiles, questionHistory, commonList } = useContext(AnimeTriviaGameContext);

    const { currentQuestion, setCurrentQuestion, questionNumber, getNextQuestion, disableAnswering, clicked, toggleClicked, buttonStatus } = useContext(QuestionAndAnswerContext);

    const [commonUserCount, setCommonUserCount] = useState(1);

    useEffect(() => {

        /*
            DONE:
            change questionpanel to rerender when question is added to history
            have a number selecter to increment to next questionHistory entry
            display latest question in questionpanel
            disable next button until question is answered
            have a user input for number of users in common
            have a button to 'start' that starts to generate the questions
            store questions and history in an array in context
            keep track of length of array in a state variable to rerender
            and display current question (array.length-1)
            start button will change to 'next' button to display next randomly generated question
            it will push to the question history and update the length of the array (state) and render new question

            TODO:
            extra: keep track of whether the question was answered correctly
        */
        setCurrentQuestion(questionHistory[questionNumber]);
    }, [questionNumber, disableAnswering])

    const setCommonUserCount_Select = function () {
        const menuItems = [];
        let length = 1;
        if (profiles.length > 0) length = profiles.length;
        for (let i = 1; i <= length; i++) {
            menuItems.push(<MenuItem value={i} key={`menuItem-${i}`}>{i}</MenuItem>)
        }
        return <FormControl>
            <CommonUserCount_Select
                value={commonUserCount}
                onChange={(e) => {
                    setCommonUserCount(e.target.value)
                }}
                sx={
                    {
                        '.MuiSelect-icon': {
                            color: 'white'
                        }
                    }
                }>
                {menuItems}
            </CommonUserCount_Select>
        </FormControl>
    }

    const setStartNext_Button = function (currentQuestion) {
        let buttonText = '';
        if (currentQuestion === undefined) {
            buttonText = 'Start';
        }
        else {
            buttonText = 'Next';
        }

        const getButtonStatus = function () {
            if (buttonStatus) return true;
            else if (commonList.length === 0) return true;
            else {
                if (commonList.length > 0 && questionNumber === -1) return false;
                if (disableAnswering === false) return true;
                else return false;
            }

        }

        return <StartNext_Button
            disabled={getButtonStatus()}
            onClick={() => {
                getNextQuestion(commonUserCount);
            }
            }>{buttonText}</StartNext_Button>
    }

    const setQuestionsAndAnswers_Div = function (currentQuestion) {
        if (currentQuestion === undefined) {
            return (null);
        }
        else {
            const defaultColors = ['#302640', '#534070'];
            const correctColors = ['#5A895D'];
            const incorrectColors = ['#794F4F'];
            const letters = ['A', 'B', 'C', 'D'];

            const answerComponents = currentQuestion.answers.map((a, index) => {
                /*This function determines what color background the answer component
                will have when clicked, green if correct, red if incorrect, and
                will show the correct answer if the guess was incorrect
                */
                const getAnswerColor = function () {
                    if (clicked.length > 0) {
                        if (a.isCorrect) return correctColors;
                        else if (clicked[index] === true && a.isCorrect === false) return incorrectColors;
                        else return defaultColors;
                    }
                    else return defaultColors;
                }

                return <Answer
                    text={a.answer}
                    isCorrect={a.isCorrect}
                    letter={letters[index]}
                    index={index}
                    colors={getAnswerColor()}
                    disableAnswering={disableAnswering} //Whether the button should be disabled
                    toggleClicked={toggleClicked} //Toggles the disabled state and more
                    customChildren={a.customChildren !== undefined ? a.customChildren : undefined}
                    key={`${letters[index]}-${index}-${a.answer}`}
                />;
            });
            // console.log(currentQuestion);
            return <div>
                <Question
                    // bannerImage={currentQuestion.bannerImage ? currentQuestion.bannerImage : currentQuestion.coverImage.extraLarge}
                    // question={currentQuestion.question}
                    // title={currentQuestion.title}
                    // siteUrl={currentQuestion.siteUrl}
                    // customChildren={currentQuestion.customChildren}
                    // template={currentQuestion.template}
                    props={{ ...currentQuestion, disableAnswering }}
                />
                <Answers_Container>
                    {answerComponents}
                </Answers_Container>
            </div>
        }
    }

    const getLoadingOverlay = function () {

    }

    return (
        <RootStyle buttonStatus={buttonStatus}>
            {buttonStatus && <LoadingOverlay>
                <CircularProgress sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%'
                }} />
            </LoadingOverlay>}
            <div>
                {setCommonUserCount_Select()}
                {setStartNext_Button(currentQuestion)}
            </div>
            {setQuestionsAndAnswers_Div(currentQuestion)}
        </RootStyle>
    )
}

export default QuestionPanel;
