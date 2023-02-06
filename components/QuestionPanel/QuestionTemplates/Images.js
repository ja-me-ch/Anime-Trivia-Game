import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { display, positions } from '@mui/system';
import Answer from '../Answer';
import { Padding } from '@mui/icons-material';

const QuestionContainer = styled('div')((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: props.bannerImage ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.3) 100%),
    url(${props.bannerImage})` : null,
    // backgroundImage: `url(${props.bannerImage})`,
    // backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0 %, rgba(0, 0, 0, 0.3) 100 %)`,
    backgroundSize: 'cover',
    // position: 'relative',
    padding: '10px',
    backgroundPosition: props.bannerImage ? '50% 50%' : null,
    backgroundRepeat: 'no-repeat',
    // transition: 'all 20s ease',
    '&:hover': {
        // backgroundSize: '175%'
    }

}));

const QuestionTextBox = styled('div')((props) => ({
    maxWidth: '80%',
    // minHeight: '250px',
    // height: 'auto',
    // border: '1px solid red',
    background: 'rgba(0,0,0,0.55)',
    borderRadius: '10px',
    padding: '20px 25px',
    justifyContent: 'center',
    // flexGrow: '1'
}));

const NativeTitle = styled('h2')(({ disableAnswering }) => ({
    padding: '0px',
    marginTop: '-5px',
    marginBottom: '-5px',
    fontSize: '1em',
    textAlign: 'center',
    pointerEvents: disableAnswering ? '' : 'none'
}));

const Title = styled('h2')(({ disableAnswering }) => ({
    padding: '0px',
    margin: '0 0 10px 0',
    fontSize: '1.5em',
    textAlign: 'center',
    pointerEvents: disableAnswering ? '' : 'none'
}));

const QuestionText = styled('div')((props) => ({
    textAlign: 'center',
    marginBottom: '10px'
}));

const CenterImageContainer = styled('div')((props) => ({
    display: 'flex',
    // flexShrink: '1',
    justifyContent: 'center',
    borderSizing: 'unset',
    marginRight: '25px',
    // height: 'auto',
    minWidth: '25%',
    // minWidth: '175px',
    // border: '1px solid red',
    // flexBasis: '50%'
}));

const CenterImageImg = styled('img')((props) => ({
    borderRadius: '3px',
    // height: 'auto',
    objectFit: 'cover',
    // minWidth: '20%',
    maxWidth: '100%'
}));

const AnswerImages = styled('div')(({ imagesCount }) => ({
    padding: '5px',
    // display: 'flex',
    // justifyContent: 'space-evenly',
    display: 'grid',
    gridTemplateColumns: `repeat(${imagesCount}, 1fr)`,
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
        '.answerImage': {
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
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    maxWidth: '100%',
    transition: 'all 1s ease'
}));

const AnswerImageLetter = styled('h2')((props) => ({
    display: 'inline-block',
    position: 'absolute',
    right: '5px',
    bottom: '-100px',
    fontSize: '5em',
    color: '#ECECEC',
    // zIndex: '10',
    WebkitTextStroke: '2.5px black',
    transition: 'all 0.7s ease',
}));

const PaddingDivs = styled('div')((props) => ({
    // height: 'auto',
    // flexGrow: '1',
}));

const Images = function ({ props }) {
    // console.log(props);
    const { bannerImage, template, question, title, siteUrl, customChildren, disableAnswering } = props;
    const { images, imagesCount, showMain } = template;
    const letters = ['A', 'B', 'C', 'D']

    const imageElements = images.map((i, index) => {
        if (index > 0) {
            const answerImageContainer = <AnswerImageContainer key={`${i}-${letters[index - 1]}`}>
                <AnswerImage src={i.image} className='answerImage' />
                {imagesCount === 4 ? <AnswerImageLetter className='answerImageLetter'>{letters[index - 1]}</AnswerImageLetter> : null}
            </AnswerImageContainer>

            if (disableAnswering) {
                answerImageContainer = <a href={i.siteUrl} style={{ display: 'contents' }} target='_blank' key={`link-${i}-${letters[index - 1]}`}>{answerImageContainer}</a>;
            }
            return answerImageContainer;
        }
    });

    const CenterImage = showMain ? <CenterImageImg src={images[0].image} /> : null;
    if (disableAnswering) { CenterImage = <a href={images[0].siteUrl} style={{ display: 'contents' }} target='_blank'>{CenterImage}</a> }

    return (
        <QuestionContainer bannerImage={bannerImage}>
            <QuestionTextBox>
                <NativeTitle disableAnswering={disableAnswering}>
                    <a href={siteUrl} target='_blank'>{title.native === title.english ? null : title.native}</a>
                </NativeTitle>
                <Title disableAnswering={disableAnswering}>
                    <a href={siteUrl} target='_blank'>{title.english === null ? title.native : title.romaji}</a>
                </Title>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                    // border: '1px solid blue'
                }}>
                    {showMain && <CenterImageContainer>
                        {CenterImage}
                    </CenterImageContainer>}
                    <div style={{
                        padding: '5px',
                        display: imagesCount === 0 ? 'flex' : null,
                        alignItems: imagesCount === 0 ? 'center' : null,
                        justifyContent: 'center'
                    }}>
                        <QuestionText>{question}</QuestionText>
                        <AnswerImages imagesCount={imagesCount}>
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