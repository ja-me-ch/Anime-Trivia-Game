import React, { useState } from 'react';
import styled from '@emotion/styled';

const RootStyle = styled('div')((props) => ({
    display: 'flex',
    flex: '47%',
    justifyContent: 'space-between',
    width: 'auto',
    height: 'auto',
    // border: '1px solid red',
    borderRadius: '15px',
    margin: '6px',
    background: props.colors[0],
    transition: 'all 0.5s ease',
    pointerEvents: props.toggled ? 'none' : '',
    cursor: 'pointer',
    '&:hover': {
        background: props.colors[props.colors.length - 1]
    }
}));

const TextBox = styled('div')((props) => ({
    padding: '1.2em 0',
    // width: '100%',
    // border: '1px solid blue',
}));

const LetterChoice = styled('span')((props) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1em',
    fontSize: '1.4em',
    letterSpacing: '1px',
    // border: '1px solid yellow'
}));

const AnswerText = styled('span')((props) => ({
    display: 'flex',
    alignItems: 'center',
    marginRight: '1.4em',
    fontSize: '1.25em',
    fontWeight: 'normal',
    // border: '1px solid red'
}))

function Answer(props) {
    const { text, isCorrect, letter, disableAnswering, onClickAnswer, defaultColors, toggledColors } = props;
    // const [clicked, setClicked] = useState(props.clickState);
    let clicked = false;
    const handleOnClick = function () {
        clicked = true;
        onClickAnswer();
    }

    const getColors = function () {
        if (disableAnswering) {
            if (clicked) {
                return toggledColors;
            }
            else if (isCorrect) {
                return toggledColors
            }
            else return defaultColors;
        }
        else return defaultColors;
    }


    return (
        <RootStyle onClick={handleOnClick} colors={getColors()} toggled={disableAnswering}>
            <LetterChoice>{letter}.</LetterChoice>
            <TextBox>
                <AnswerText>{text}</AnswerText>
            </TextBox>
            <div></div>
        </RootStyle>
    )
}

export default Answer;
