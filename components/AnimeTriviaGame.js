import React, { useState, useContext } from 'react';
// import styled from '@emotion/styled';
import { styled, useTheme } from '@mui/material/styles'
import { Collapse } from '@mui/material';

import { QuestionAndAnswerProvider } from '../contexts/QuestionAndAnswerContext';
import TopBar from './Stage/TopBar';
import CenterBar from './Stage/CenterBar';
import BottomBar from './Stage/BottomBar';
import { AnimeTriviaGameContext } from '../contexts/AnimeTriviaGameContext';
import { display } from '@mui/system';

const RootStyle = styled('div')(() => ({
    display: 'grid',
    position: 'relative',
    gridTemplateRows: 'auto 1fr auto',
    width: '100%',
    // border: '1px solid teal',
    // minWidth: '100%',
    // height: '100vh',
    // minHeight: '100vh',
    // maxHeight: '100vh',
}));

const RightSideBar = styled('div')(() => ({
    // border: '1px solid yellow'
}));

const CenterContainer = styled('div')(() => ({
    flexGrow: '4',
    // border: '1px solid green'
}));

function AnimeTriviaGame() {
    const [isToggled, setIsToggled] = useState(true);
    const { showRightBar } = useContext(AnimeTriviaGameContext)
    return (

        <QuestionAndAnswerProvider>
            <RootStyle>
                <TopBar />

                <CenterBar />

                <div style={{
                    // border: '1px solid red',
                    display: 'flex',
                    minWidth: '100vw',
                    width: '100vw',
                    flexDirection: 'row-reverse',
                    position: 'fixed',
                    bottom: '0',
                    right: '0'
                    }}>
                    <BottomBar />
                </div>
            </RootStyle>
        </QuestionAndAnswerProvider>

    )
}

export default AnimeTriviaGame
