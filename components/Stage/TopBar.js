import { useContext } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

import styled from '@emotion/styled';
import { Button, Collapse } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddProfile from '../Profiles/AddProfile';


const RootStyle = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // display: 'grid',
    // gridTemplateColumns: '1fr 1fr 1fr',
    margin: '0 5px 0 5px',
}));

const DrawerIcon = styled(GroupAddIcon)((props) => ({
    fontSize: '2rem',
    margin: '0.4rem'
}));

const RightSide = styled('div')(() => ({
    display: 'flex',
    // border: '1px solid red',
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    left: '50%',
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

}));

const TopBar = function () {
    const { toggleRightBar, showRightBar, questionHistory } = useContext(AnimeTriviaGameContext);

    const score = questionHistory.score();

    const getCenterSide = function () {
        if (score !== undefined) {
            return <>
                <span>{score[0]}</span> / <span>{score[1]}</span>
            </>
        }
    }

    return (
        <RootStyle>
            <LeftSide>
                <h2>Sample Text</h2>
            </LeftSide>

            <CenterSide>
                {getCenterSide()}
            </CenterSide>

            <RightSide>
                <Button
                    variant='outlined'
                    sx={{
                        marginX: '5px',
                        height: '50%',
                        aspectRatio: '1/1',
                        minWidth: 'unset',
                        padding: '25px',
                    }}
                    onClick={() => { toggleRightBar() }}
                >
                    <DrawerIcon />
                </Button>
                <Collapse in={showRightBar} collapsedSize={0} orientation={'horizontal'}>
                    <AddProfile />
                </Collapse>
            </RightSide>
        </RootStyle>
    )
}

export default TopBar;