import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { display, positions } from '@mui/system';

const QuestionContainer = styled('div')((props) => ({
    width: '100%',
    height: '100%',
    // minHeight: '500px',
    // maxHeight: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: props.bannerImage ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.3) 100%),
    url(${props.bannerImage})` : null,
    // backgroundImage: `url(${props.bannerImage})`,
    // backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0 %, rgba(0, 0, 0, 0.3) 100 %)`,
    backgroundSize: 'cover',
    // position: 'relative',
    padding: '50px',
    backgroundPosition: props.bannerImage ? '50% 50%' : null,
    backgroundRepeat: 'no-repeat',
    // transition: 'all 20s ease',
    '&:hover': {
        // backgroundSize: '175%'
    }

}));

const QuestionTextBox = styled('div')((props) => ({
    width: '70%',
    minHeight: '250px',
    height: 'auto',
    // border: '1px solid red',
    background: 'rgba(0,0,0,0.55)',
    borderRadius: '10px',
    padding: '15px',
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

const CenterImageContainer = styled('div')((props) => ({
    display: 'flex',
    justifyContent: 'center',
    // height: 'auto',
    width: '40%',
    minWidth: '175px',
    // border: '1px solid red',
    // flexBasis: '30%'
}));

const CenterImageImg = styled('img')((props) => ({
    borderRadius: '3px',
    // height: 'auto',
    objectFit: 'cover',
    // minWidth: '20%',
    maxWidth: '100%'
}));

const AnswerImages = styled('div')((props) => ({
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-evenly',
}));

const AnswerImageContainer = styled('div')((props) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    // border: '1px solid yellow',
    position: 'relative',
    width: 'auto',
    '&:hover': {
        '.answerImageLetter': {
            opacity: '0',
        },
        '.answerImage' : {
            borderRadius: '5px'
        }
    }
}));

const AnswerImage = styled('img')((props) => ({
    // position: 'relative',
    // top: '0',
    // left: '0',
    borderRadius: '10px',
    padding: '2px',
    // height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    maxWidth: '100%',
    transition: 'all 1s ease'
}));

const AnswerImageLetter = styled('h2')((props) => ({
    display: 'inline',
    position: 'absolute',
    right: '5px',
    bottom: '-100px',
    fontSize: '5em',
    color: '#ECECEC',
    zIndex: '100',
    WebkitTextStroke: '2.5px black',
    transition: 'all 0.7s ease',
}));

const Images = function ({ props }) {
    console.log(props);
    const { bannerImage, question, title, siteUrl, customChildren, images } = props;

    const imageElements = images.map((i, index) => {
        const letters = ['A', 'B', 'C', 'D']
        if (index > 0) {
            return <AnswerImageContainer>
                <AnswerImage src={i} className='answerImage'/>
                <AnswerImageLetter className='answerImageLetter'>{letters[index-1]}</AnswerImageLetter>
            </AnswerImageContainer>
        }
    })
    return (
        <QuestionContainer bannerImage={bannerImage}>
            <QuestionTextBox>
                <NativeTitle>
                    <a href={siteUrl} target='_blank'>{title.native === title.english ? null : title.native}</a>
                </NativeTitle>
                <Title>
                    <a href={siteUrl} target='_blank'>{title.english === null ? title.native : title.romaji}</a>
                </Title>
                <div style={{
                    display: 'flex',
                    // border: '1px solid blue'
                }}>
                    <CenterImageContainer>
                        <CenterImageImg src={images[0]} />
                    </CenterImageContainer>
                    <div style={{
                        padding: '5px'
                    }}>
                    <QuestionText>{question}</QuestionText>
                    <AnswerImages>
                        {imageElements}
                    </AnswerImages>
                    </div>
                </div>
            </QuestionTextBox>
            {customChildren !== undefined ? customChildren : null}
        </QuestionContainer>
    )
}

export default Images;