import React from 'react';
import styled from '@emotion/styled';
import { AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import { QuestionAndAnswerProvider } from '../contexts/QuestionAndAnswerContext';
import Profiles from './Profiles/Profiles';
import Question from './QuestionPanel/Question';
import QuestionPanel from './QuestionPanel/QuestionPanel';
import { display } from '@mui/system';

const RootStyle = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row'
}));

const RightSideBar = styled('div')(() => ({
    border: '1px solid yellow'
}));

const CenterContainer = styled('div')(() => ({
    border: '1px solid green'
}));

const LeftSideBar = styled('div')(() => ({
    maxWidth: '',
    border: '1px solid blue'
}));

function AnimeTriviaGame() {

    return (
        <AnimeTriviaGameProvider>
            <RootStyle>
                <RightSideBar>

                </RightSideBar>

                <CenterContainer>
                    <QuestionAndAnswerProvider>
                        <QuestionPanel />
                    </QuestionAndAnswerProvider>
                </CenterContainer>

                <LeftSideBar>
                    <Profiles />
                </LeftSideBar>
            </RootStyle>
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
