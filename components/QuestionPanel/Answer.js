import React, { useState } from 'react';
import styled from '@emotion/styled';

const RootStyle = styled('div')((props) => ({
    display: 'flex',
    flex: '47%',
    justifyContent: 'space-between',
    width: 'auto',
    height: 'auto',
    minHeight: '4rem',
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
    padding: '1.1em 0',
    display: 'flex',
    alignItems: 'center',
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

const AnswerText = styled('div')((props) => ({
    display: 'flex',
    alignItems: 'center',
    marginRight: '1.4em',
    fontSize: '1.25em',
    fontWeight: 'normal',
    // border: '1px solid red'
}))

function Answer(props) {
    const { text, isCorrect, letter, index, colors, disableAnswering, toggleClicked, customChildren } = props;
    const handleOnClick = function () {
        toggleClicked(index, isCorrect);
    }

    return (
        <RootStyle onClick={handleOnClick} colors={colors} toggled={disableAnswering}>
            <LetterChoice>{letter}.</LetterChoice>
            <TextBox>
                <AnswerText>
                    {customChildren === undefined ? <span>{text}</span> : customChildren}
                    {/* {customChildren} */}
                </AnswerText>
            </TextBox>
            <div></div>
        </RootStyle>
    )
}

export default Answer;
