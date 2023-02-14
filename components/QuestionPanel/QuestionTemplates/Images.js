import React, { useContext } from 'react';
import { Box, styled, useTheme } from '@mui/material';
import { display, positions } from '@mui/system';
import Answer from '../Answer';
import { Padding } from '@mui/icons-material';

const QuestionContainer = styled('div')((props) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundImage: props.bannerImage ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.3) 100%),
    url(${props.bannerImage})` : null,
    // backgroundImage: `url(${props.bannerImage})`,
    // backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0 %, rgba(0, 0, 0, 0.3) 100 %)`,
    backgroundSize: 'cover',
    // position: 'relative',
    backgroundPosition: props.bannerImage ? '50% 50%' : null,
    backgroundRepeat: 'no-repeat',
    // transition: 'all 20s ease',
    '&:hover': {
        // backgroundSize: '175%'
    }

}));

const QuestionTextBox = styled('div')((props) => ({
    maxWidth: '90%',
    // minHeight: '250px',
    // height: '100%',
    // border: '1px solid red',
    background: 'rgba(0,0,0,0.55)',
    borderRadius: '10px',
    // margin: '1%',
    justifyContent: 'center',
    // flexGrow: '1'
}));

const NativeTitle = styled('h2')(({ disableAnswering }) => ({
    padding: '5px',
    // marginTop: '-5px',
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

const CenterImageContainer = styled('div')(({ imagesCount }) => ({
    display: 'flex',
    // flexShrink: '1',
    justifyContent: 'center',
    borderSizing: 'unset',
    // marginRight: '25px',
    paddingLeft: '15px',
    paddingBottom: '15px',
    height: 'auto',
    minWidth: imagesCount === 1 ? '50%' : '25%',
    // minWidth: '175px',
    // border: '1px solid red',
    // flexBasis: '50%'
}));

const CenterImageImg = styled('img')((props) => ({
    borderRadius: '3px',
    height: 'auto',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    // minWidth: '20%',
    maxWidth: '100%',
    // maxHeight: '100%',
}));

const AnswerImages = styled('div')(({ imagesCount, theme }) => ({
    padding: '5px',
    // display: 'flex',
    // justifyContent: 'space-evenly',
    display: 'grid',
    gridTemplateColumns: `repeat(${imagesCount}, 1fr)`,
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: imagesCount === 1 ? `repeat(${imagesCount}, 1fr)` : `repeat(${2}, auto)`,
        gridTemplateRows: `repeat(${2}, auto)`
    }
    // '@media(max-width: 500px)': {
    //     gridTemplateColumns: imagesCount === 1 ? `repeat(${imagesCount}, 1fr)` : `repeat(${2}, auto)`,
    //     gridTemplateRows: `repeat(${2}, auto)`,
    // }
}));

const AnswerImageContainer = styled('div')((props) => ({
    display: 'flex',
    // flexDirection: 'column',
    padding: '0.3em',
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
    padding: '5px',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    maxWidth: '100%',
    transition: 'all 1s ease'
}));

const AnswerImageLetter = styled('h2')(({ theme }) => ({
    display: 'inline-block',
    position: 'absolute',
    right: '5px',
    bottom: '-100px',
    fontSize: '5em',
    color: '#ECECEC',
    // zIndex: '10',
    WebkitTextStroke: '2.5px black',
    transition: 'all 0.7s ease',
    [theme.breakpoints.down('sm')]: {
        bottom: '-75px'
    }
}));

const QuestionContent = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
    }
}));

const Images = function ({ props }) {
    const { bannerImage, template, question, title, siteUrl, customChildren, disableAnswering } = props;
    const { images, imagesCount, showMain } = template;
    const letters = ['A', 'B', 'C', 'D'];

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
                <QuestionContent>
                    {showMain && <CenterImageContainer imagesCount={imagesCount}>
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
                </QuestionContent>
            </QuestionTextBox>
            {customChildren !== undefined ? customChildren : null}
        </QuestionContainer>
    )
}

export default Images;