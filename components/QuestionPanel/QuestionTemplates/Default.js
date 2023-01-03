import React, { useContext } from 'react';
import styled from '@emotion/styled';

const QuestionContainer = styled('div')((props) => ({
    width: '100%',
    height: 'auto',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: props.bannerImage ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.3) 100%),
    url(${props.bannerImage})` : null,
    // backgroundImage: `url(${props.bannerImage})`,
    // backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0 %, rgba(0, 0, 0, 0.3) 100 %)`,
    backgroundSize: 'cover',
    position: 'relative',
    backgroundPosition: props.bannerImage ? '50% 50%' : null,
    backgroundRepeat: 'no-repeat',
    // transition: 'all 20s ease',
    // '&:hover': {
    //     // backgroundSize: '175%'
    // }

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

const NativeTitle = styled('h2')(({ disableAnswering }) => ({
    padding: '0px',
    marginTop: '-5px',
    marginBottom: '-5px',
    fontSize: '1em',
    textAlign: 'center',
    pointerEvents: !disableAnswering ? 'none' : ''
}));

const Title = styled('h2')(({ disableAnswering }) => ({
    padding: '0px',
    margin: '0 0 10px 0',
    fontSize: '1.5em',
    textAlign: 'center',
    pointerEvents: !disableAnswering ? 'none' : ''
}));

const QuestionText = styled('div')((props) => ({
    textAlign: 'center'
}));

const Default = function (props) {
    // console.log(props);
    const { bannerImage, question, title, siteUrl, customChildren, disableAnswering } = props.props;

    return (
        <QuestionContainer bannerImage={bannerImage}>
            <QuestionTextBox>
                <NativeTitle disableAnswering={disableAnswering}><a href={siteUrl} target='_blank'>{title.native === title.english ? null : title.native}</a></NativeTitle>
                <Title disableAnswering={disableAnswering}><a href={siteUrl} target='_blank'>{title.english === null ? title.native : title.romaji}</a></Title>
                <QuestionText>{question}</QuestionText>
                {customChildren !== undefined ? customChildren : null}
            </QuestionTextBox>
        </QuestionContainer>
    )
}

export default Default;