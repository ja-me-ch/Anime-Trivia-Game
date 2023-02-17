import React, { useEffect, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Select, MenuItem, FormControl, InputLabel, Button, CircularProgress, useTheme, FormLabel, Tooltip } from '@mui/material';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import { QuestionAndAnswerContext } from '../../contexts/QuestionAndAnswerContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Question from './Question';
import Answer from './Answer';

const RootStyle = styled('div')((props) => ({
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '700px',
    height: '100%',
    // maxHeight: '100%',
    // border: '1px solid'
    zIndex: '0'
}));

const CommonUserCount_Select = styled(Select)((props) => ({
    color: 'white',
    marginRight: '10px'
    // borderColor: 'white',
    // height: '90%',

    // border: '1px solid white'
}));

const StartNext_Button = styled(Button)((props) => ({
    color: 'white',
    // border: '1px solid white',
    transition: 'all 0.5s ease',
    // minHeight: '100%',
    '&:disabled': {
        color: 'red'
    }
}));

const StartNext_Div = styled('div')(({ disabled, theme }) => ({
    // position: 'absolute',
    // left: '50%',
    // transform: 'translateX(-50%)',
    color: theme.palette[theme.palette.theme].primary.contrastText,
    // border: '1px solid white',
    transition: 'all 0.5s ease',
    background: disabled ? theme.palette[theme.palette.theme].primary.dark : theme.palette[theme.palette.theme].primary.main,
    // minHeight: '100%',
    height: '100%',
    width: '100%',
    pointerEvents: disabled ? 'none' : 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '10px',
    '&:hover': {
        background: theme.palette[theme.palette.theme].primary.light
    },
}));

const Answers_Container = styled('div')((props) => ({
    // border: '1px solid purple',
    margin: '10px 0px',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    // zIndex: '110'
}));

const LoadingOverlay = styled('div')(({ buttonStatus }) => ({
    position: 'absolute',
    left: '0',
    height: '100%',
    width: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: '2',
}));

const QuestionHeaderBar = styled('div')((props) => ({
    // border: '1px solid red',
    display: 'grid',
    gridTemplateColumns: '1fr 34% 1fr',
    paddingBottom: '10px',
    // minHeight: '100%',
    // height: 'auto',
    // justifyContent: 'space-between',
}));

const CommonUserContainer = styled('div')((props) => ({
    display: 'flex',
    alignItems: 'center'
    // width: '100%',
    // border: '1px solid blue',
    // alignSelf: 'flex-start',
}));

const NextButtonContainer = styled('div')((props) => ({
    display: 'inline',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
}));


function QuestionPanel() {
    const { profiles, questionHistory, commonList, showRightBar, toggleRightBar, selectedTheme } = useContext(AnimeTriviaGameContext);

    const { currentQuestion, setCurrentQuestion, questionNumber, getNextQuestion, disableAnswering, clicked, toggleClicked, buttonStatus } = useContext(QuestionAndAnswerContext);

    const [commonUserCount, setCommonUserCount] = useState(1);

    const theme = useTheme();

    // console.log(theme);
    useEffect(() => {
        setCurrentQuestion(questionHistory.value[questionNumber]);
    }, [questionNumber, disableAnswering]);

    const setCommonUserCount_Select = function () {
        const menuItems = [];
        let length = 1;
        if (profiles.value.length > 0) length = profiles.value.length;
        for (let i = 1; i <= length; i++) {
            menuItems.push(<MenuItem value={i} key={`menuItem-${i}`}>{i}</MenuItem>)
        }
        return <CommonUserCount_Select
            value={commonUserCount}
            onChange={(e) => {
                setCommonUserCount(e.target.value);
            }}>
            {menuItems}
        </CommonUserCount_Select>
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
            else if (commonList.value.length === 0) return true;
            else {
                if (commonList.value.length > 0 && questionNumber === -1) return false;
                if (disableAnswering === false) return true;
                else return false;
            }

        }

        return <StartNext_Div
            disabled={getButtonStatus()}
            // colors={[theme.palette[theme.palette.theme].primary.main, theme.palette[theme.palette.theme].primary.light, theme.palette[selectedTheme.value].primary.dark]}
            // textColor={theme.palette[theme.palette.theme].primary.contrastText}
            onClick={() => getNextQuestion(commonUserCount)}
        >
            <span>{buttonText}</span>
        </StartNext_Div>

        // return <StartNext_Button
        //     disabled={getButtonStatus()}
        //     onClick={() => {
        //         getNextQuestion(commonUserCount);
        //     }
        //     }>{buttonText}</StartNext_Button>
    }

    // const defaultColors = [theme.palette.primary.main, theme.palette.primary.light, theme.palette.primary.dark];
    // const correctColors = [theme.palette.success.main];
    // const incorrectColors = [theme.palette.error.main];
    const letters = ['A', 'B', 'C', 'D'];
    const setQuestionsAndAnswers_Div = function (currentQuestion) {
        if (currentQuestion === undefined) {
            return (null);
        }
        else {
            const answerComponents = currentQuestion.answers.map((a, index) => {
                return <Answer
                    text={a.answer}
                    isCorrect={a.isCorrect}
                    letter={letters[index]}
                    index={index}
                    clicked={clicked[index]}
                    disableAnswering={disableAnswering} //Whether the button should be disabled
                    toggleClicked={toggleClicked} //Toggles the disabled state and more
                    customChildren={a.customChildren !== undefined ? a.customChildren : undefined}
                    key={`${letters[index]}-${index}-${a.answer}`}
                />;
            });
            return <div style={{
                display: 'grid',
                gridTemplateRows: '1fr auto',
                height: '100%',
                maxHeight: '100%',
                overflow: 'hidden'
            }}>
                <Question
                    props={{ ...currentQuestion, disableAnswering }}
                />
                <Answers_Container>
                    {answerComponents}
                </Answers_Container>
            </div>
        }
    }

    return (
        <RootStyle>
            {(buttonStatus || (showRightBar && questionNumber > -1)) && <LoadingOverlay
                onClick={() => {
                    if (showRightBar) toggleRightBar();
                }}>
                {buttonStatus && <CircularProgress sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%'
                }} />}
            </LoadingOverlay>}
            <QuestionHeaderBar>
                <CommonUserContainer>
                    <span style={{
                        padding: '0 10px'
                    }}>Common Users:
                    </span>
                    {setCommonUserCount_Select()}
                    <Tooltip title={<div style={{
                        fontSize: '1rem',
                        letterSpacing: '1px'
                    }}>
                        The minimum amount of common users required for the anime to be considered for a question.
                        eg. If there are 3 users added and common users is set to 2, at minimum the anime must be in atleast 2 of the users' lists.
                    </div>}>
                        <HelpOutlineIcon />
                    </Tooltip>
                </CommonUserContainer>
                {setStartNext_Button(currentQuestion)}
            </QuestionHeaderBar>
            {setQuestionsAndAnswers_Div(currentQuestion)}
        </RootStyle>
    )
}

export default QuestionPanel;
