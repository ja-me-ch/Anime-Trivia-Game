import React, { useContext } from 'react';
// import styled from '@emotion/styled';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles'
import { AnimeTriviaGameContext, AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import { QuestionAndAnswerProvider } from '../contexts/QuestionAndAnswerContext';
import theme from '../helper-functions/theme';
import TopBar from './Stage/TopBar';
import CenterBar from './Stage/CenterBar';

const RootStyle = styled('div')(() => ({
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    // border: '1px solid teal',
    // width: '100vw',
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
    return (
        <AnimeTriviaGameProvider>
            <QuestionAndAnswerProvider>
            <ThemeProvider theme={theme}>
                    <RootStyle>
                        <TopBar />

                        <CenterBar />

                        <footer style={{
                            background: theme.palette.primary.dark,
                            height: '2em'
                        }}>
                            allo
                        </footer>
                    </RootStyle>
                </ThemeProvider>
            </QuestionAndAnswerProvider>
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
