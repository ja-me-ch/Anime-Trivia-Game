import { useContext } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

import styled from '@emotion/styled';
import { Button, Collapse } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddProfile from '../Profiles/AddProfile';


const RootStyle = styled('div')(() => ({
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
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
    border: '1px solid yellow',
    alignItems: 'center',
}));

const CenterSide = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid yellow',
    alignItems: 'center',
}));

const TopBar = function () {
    const { toggleRightBar, showRightBar, getQuestionHistory } = useContext(AnimeTriviaGameContext);

    console.log(getQuestionHistory());

    return (
        <RootStyle>
            <LeftSide>
                <h2>Sample Text</h2>
            </LeftSide>

            <CenterSide>
                <h3>Score/question # will go here</h3>
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