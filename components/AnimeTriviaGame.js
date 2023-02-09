import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { AnimeTriviaGameContext, AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import { QuestionAndAnswerProvider } from '../contexts/QuestionAndAnswerContext';
import Profiles from './Profiles/Profiles';
import Question from './QuestionPanel/Question';
import QuestionPanel from './QuestionPanel/QuestionPanel';
import TopBar from './Stage/TopBar';
import CenterBar from './Stage/CenterBar';

const RootStyle = styled('div')(() => ({
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
}));

const RightSideBar = styled('div')(() => ({
    // border: '1px solid yellow'
}));

const CenterContainer = styled('div')(() => ({
    flexGrow: '4',
    // border: '1px solid green'
}));

function AnimeTriviaGame() {
    // const { showRightBar, showLeftBar } = useContext(AnimeTriviaGameContext);

    return (
        <AnimeTriviaGameProvider>
            <QuestionAndAnswerProvider>
                <RootStyle>
                    <TopBar />

                    <CenterBar />

                    <footer style={{
                        background: 'blue',
                        height: '2em'
                    }}>
                        allo
                    </footer>
                </RootStyle>
            </QuestionAndAnswerProvider>
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
