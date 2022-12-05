import React from 'react';
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
    background: '#302640',
    transition: 'all 0.5s ease',
    '&:hover': {
        background: '#534070'
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
    const { text, isCorrect, index } = props;
    const letters = ['A', 'B', 'C', 'D'];
    return (
        <RootStyle>
            <LetterChoice>{letters[index]}.</LetterChoice>
            <TextBox>
                <AnswerText>{text}</AnswerText>
            </TextBox>
            <div></div>
        </RootStyle>
    )
}

export default Answer;
