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
import Default from './Dialog/Default';
import Head from "next/head";

const RootStyle = styled("div")(() => ({
    display: "grid",
    position: "relative",
    gridTemplateRows: "auto 1fr auto",
    // width: '100%',
    // border: '1px solid teal',
    // minWidth: '100%',
    // height: '100vh',
    // minHeight: '100vh',
    // maxHeight: '100vh',
}));

const RightSideBar = styled("div")(() => ({
    // border: '1px solid yellow'
}));

const CenterContainer = styled("div")(() => ({
    flexGrow: "4",
    // border: '1px solid green'
}));

function AnimeTriviaGame() {
    return (
        <QuestionAndAnswerProvider>
            <Head>
                <title>Anime Trivia Game</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://ja-me-ch.github.io/Anime-Trivia-Game/"
                />
                <meta property="og:title" content="Anime Trivia Game" />
                <meta
                    property="og:description"
                    content="An Anime Trivia Game that generates trivia from your profile on AniList.co"
                />
            </Head>
            <RootStyle>
                <TopBar />

                <CenterBar />

                <div
                    style={{
                        display: "flex",
                        maxWidth: "100vw",
                        flexDirection: "row-reverse",
                        position: "fixed",
                        bottom: "0",
                        right: "0",
                    }}
                >
                    <BottomBar />
                </div>
                <Default />
            </RootStyle>
        </QuestionAndAnswerProvider>
    );
}

export default AnimeTriviaGame
