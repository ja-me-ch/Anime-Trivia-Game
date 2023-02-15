import { useContext } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

import styled from '@emotion/styled';
import { Button, Collapse, Tooltip, useTheme } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StartIcon from '@mui/icons-material/Start';
import AddProfile from '../Profiles/AddProfile';
import { Light } from '@mui/icons-material';


const RootStyle = styled('div')(() => ({
    // flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // display: 'grid',
    // gridTemplateColumns: '1fr 1fr 1fr',
    margin: '0 5px 0 5px',
    maxHeight: '100px',
}));

const OpenDrawerIcon = styled(GroupAddIcon)(({ textColor }) => ({
    color: textColor,
    borderColor: textColor,
    fontSize: '2rem',
    margin: '0.4rem'
}));

const CloseDrawerIcon = styled(StartIcon)(({ textColor }) => ({
    color: textColor,
    fontSize: '2rem',
    margin: '0.4rem'
}));

const RightSide = styled('div')(() => ({
    display: 'flex',
    // border: '1px solid red',
    justifyContent: 'flex-end',
    alignItems: 'center',

}));

const LeftSide = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'flex-start',
    // border: '1px solid yellow',
    alignItems: 'center',
}));

const CenterSide = styled('div')(() => ({
    // display: 'inline-block',
    position: 'absolute',
    justifyContent: 'center',
    left: '50.5%',
    top: '20px',
    // width: '100%',
    // border: '1px solid yellow',
    alignItems: 'center',
    fontSize: '2.5em',
    letterSpacing: '0.3em',
    transform: 'translateX(-50%)'
}));

const TotalCorrect = styled('span')(() => ({

}));

const TotalQuestions = styled('span')(() => ({
    letterSpacing: '0.1em'
}));

const SiteName = styled('h2')(({ theme }) => ({

}));

const MainColorText = styled('span')(({ theme }) => ({
    fontSize: '2em',
    color: theme.palette[theme.palette.theme].primary.main,
    WebkitTextStroke: `1px ${theme.palette[theme.palette.theme].primary.contrastText}`
}));

const LightColorText = styled('span')(({ theme }) => ({
    fontSize: '2em',
    color: theme.palette[theme.palette.theme].primary.light,
    WebkitTextStroke: `1px ${theme.palette[theme.palette.theme].primary.contrastText}`
}));

const TopBar = function () {
    const { toggleRightBar, showRightBar, questionHistory } = useContext(AnimeTriviaGameContext);

    const score = questionHistory.score();

    const theme = useTheme();

    // console.log(theme);

    // const getMainColorSpan = function (contents) {
    //     return <MainColorText colors={[theme.palette[selectedTheme.value].primary.main, theme.palette[selectedTheme.value].primary.contrastText]}>
    //         {contents}
    //     </MainColorText>
    // }

    // const getLightColorSpan = function (contents) {
    //     return <LightColorText colors={[theme.palette[selectedTheme.value].primary.light, theme.palette[selectedTheme.value].primary.contrastText]}>
    //         {contents}
    //     </LightColorText>
    // }

    const getCenterSide = function () {
        if (score !== undefined) {
            const scoreData = {
                totalCorrect: score[0],
                totalQuestions: score[1],
                totalIncorrect: (score[1] - score[0]),
                percentageCorrect: (score[0] / score[1] * 100).toFixed(2),
                percentageIncorrect: ((score[1] - score[0]) / score[1] * 100).toFixed(2)
            }

            const toolTipText = <div
                style={{
                    whiteSpace: 'pre-line',
                    fontSize: '1.4em',
                    padding: '7px',
                    lineHeight: '12px',
                    letterSpacing: '1px',
                    fontWeight: 600
                }}>
                {`Correct: ${scoreData.totalCorrect} (${scoreData.percentageCorrect}%)\n
                Incorrect: ${scoreData.totalIncorrect} (${scoreData.percentageIncorrect}%)`}
            </div>
            return <Tooltip title={toolTipText}>
                <span>
                    <TotalCorrect>
                        {scoreData.totalCorrect}
                    </TotalCorrect>
                    /
                    <TotalQuestions>
                        {scoreData.totalQuestions}
                    </TotalQuestions>
                </span>
            </Tooltip>
        }
    }

    return (
        <RootStyle>
            <LeftSide>
                <SiteName>
                    {/* {getMainColorSpan('A')}
                    {getLightColorSpan('ni')}
                    {getMainColorSpan('me')}
                    {getLightColorSpan('T')}
                    {getMainColorSpan('ri')}
                    {getLightColorSpan('vi')}
                    {getMainColorSpan('a')}
                    {getLightColorSpan('Ga')}
                    {getMainColorSpan('me')} */}

                    <MainColorText>A</MainColorText>
                    <LightColorText>ni</LightColorText>
                    <MainColorText>me </MainColorText>
                    <LightColorText>T</LightColorText>
                    <MainColorText>ri</MainColorText>
                    <LightColorText>vi</LightColorText>
                    <MainColorText>a </MainColorText>
                    <LightColorText>Ga</LightColorText>
                    <MainColorText>me</MainColorText>
                </SiteName>
            </LeftSide>

            <CenterSide>
                {getCenterSide()}
            </CenterSide>

            <RightSide>
                <Button
                    variant='outlined'
                    sx={{
                        borderColor: theme.palette[theme.palette.theme].primary.contrastText,
                        marginX: '5px',
                        height: '50%',
                        aspectRatio: '1/1',
                        minWidth: 'unset',
                        padding: '25px',
                        ':hover': {
                            borderColor: theme.palette[theme.palette.theme].primary.contrastText,
                            backgroundColor: 'rgba(255, 255, 255, 0.25)'
                        }
                    }}
                    onClick={() => { toggleRightBar() }}
                >
                    {showRightBar ?
                        <CloseDrawerIcon textColor={theme.palette[theme.palette.theme].primary.contrastText} />
                        : <OpenDrawerIcon textColor={theme.palette[theme.palette.theme].primary.contrastText} />
                    }
                </Button>
                <Collapse in={showRightBar} collapsedSize={0} orientation={'horizontal'}>
                    <AddProfile />
                </Collapse>
            </RightSide>
        </RootStyle>
    )
}

export default TopBar;