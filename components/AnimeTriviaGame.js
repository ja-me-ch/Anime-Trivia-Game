import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { AnimeTriviaGameContext, AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import { QuestionAndAnswerProvider } from '../contexts/QuestionAndAnswerContext';
import Profiles from './Profiles/Profiles';
import Question from './QuestionPanel/Question';
import QuestionPanel from './QuestionPanel/QuestionPanel';

const RootStyle = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row'
}));

const RightSideBar = styled('div')(() => ({
    // flexGrow: '1',
    border: '1px solid yellow'
}));

const CenterContainer = styled('div')(() => ({
    flexGrow: '4',
    border: '1px solid green'
}));

const LeftSideBar = styled('div')(() => ({
    // flexGrow: '1',
    border: '1px solid blue'
}));

function AnimeTriviaGame() {
    // const { showRightBar, showLeftBar } = useContext(AnimeTriviaGameContext);

    return (
        <AnimeTriviaGameProvider>
            <RootStyle>
                <LeftSideBar>

                </LeftSideBar>

                <CenterContainer>
                    <QuestionAndAnswerProvider>
                        <QuestionPanel />
                    </QuestionAndAnswerProvider>
                </CenterContainer>

                <RightSideBar>
                    <Profiles />
                </RightSideBar>
            </RootStyle>
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
