import React, { useContext } from 'react';
import AddProfile from './AddProfile';
import ProfileCardsPanel from './ProfileCardsPanel';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Button, Collapse } from '@mui/material'
import styled from '@emotion/styled';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

const RootStyle = styled('div')(({ showRightBar }) => ({
    // border: '1px solid red',
    // position: 'relative',
    width: '100%',
    background: 'grey',
    padding: '10px 5px',
    margin: '0px 0px',
    maxHeight: '50vh',
    overflow: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
        width: '0px',
        position: 'relative',
        // background: 'red',
        // border: '1px solid black',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'red'
    },
    '&:hover': {
        '&::-webkit-scrollbar': {
            width: '8px'
        }
    }
}));

const TopBar = styled('div')((props) => ({
    // border: '1px solid yellow',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px'
}));

const DrawerIconContainer = styled('div')((props) => ({
    border: '1px solid red',
    height: '100%'
    // aspectRatio: '1 / 1'
}));



function Profiles(props) {
    const { toggleRightBar, showRightBar } = useContext(AnimeTriviaGameContext);

    return (
        <Collapse in={showRightBar} collapsedSize={0} orientation={'horizontal'}>
            <RootStyle>
                <ProfileCardsPanel />
            </RootStyle>
        </Collapse>
    )
}

export default Profiles
