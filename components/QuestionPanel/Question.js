import React from 'react';
import styled from '@emotion/styled';
import { fontSize } from '@mui/system';
import ShuffleArray from '../../helper-functions/Functions/shuffleArray';
import Answer from './Answer';

const RootStyle = styled('div')((props) => ({
    // border: '1px solid lime',
    width: '100%',
    height: 'auto',

}));

const QuestionContainer = styled('div')((props) => ({
    width: '100%',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: props.bannerImage ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.3) 100%),
    url(${props.bannerImage})` : null,
    backgroundSize: '160%',
    backgroundPosition: props.bannerImage ? '50% 50%' : null,
    backgroundRepeat: 'no-repeat'
}));

const QuestionTextBox = styled('div')((props) => ({
    width: '50%',
    height: 'auto',
    // border: '1px solid red',
    background: 'rgba(0,0,0,0.55)',
    borderRadius: '10px',
    padding: '20px',
    justifyContent: 'center',
}));

const NativeTitle = styled('h2')((props) => ({
    padding: '0px',
    marginTop: '-5px',
    marginBottom: '-5px',
    fontSize: '1em',
    textAlign: 'center'
}));

const Title = styled('h2')((props) => ({
    padding: '0px',
    margin: '0 0 10px 0',
    fontSize: '1.5em',
    textAlign: 'center',

}));

const QuestionText = styled('div')((props) => ({
    textAlign: 'center'
}));

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

function Question(props) {
    const { bannerImage, question, title, siteUrl, answers } = props.props;
    console.log(title);
    console.log(props.props);
    const shuffledAnswers = ShuffleArray(answers);
    console.log(shuffledAnswers);
    const answerComponents = shuffledAnswers.map((a, index) => {
        return <Answer text={a.answer} isCorrect={a.isCorrect} index={index} />
    });

    console.log(answerComponents)
    return (
        <RootStyle>
            <QuestionContainer bannerImage={bannerImage}>
                <QuestionTextBox>
                    <NativeTitle><a href={siteUrl} target='_blank'>{title.native}</a></NativeTitle>
                    <Title><a href={siteUrl} target='_blank'>{title.english}</a></Title>
                    <QuestionText>{question}</QuestionText>
                </QuestionTextBox>
            </QuestionContainer>
            <AnswersContainer>
                {answerComponents}
            </AnswersContainer>
        </RootStyle>
    )
}

export default Question;
