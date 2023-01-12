import React, { useContext } from 'react';
import AddProfile from './AddProfile';
import ProfileCardsPanel from './ProfileCardsPanel';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Button, Collapse } from '@mui/material'
import styled from '@emotion/styled';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

const RootStyle = styled('div')(({ profiles, showRightBar }) => ({
    // border: '1px solid red',
    // position: 'relative',
    width: '100%',
    background: 'black',
    padding: '6px 6px',
    margin: '0px 0px',
    borderRadius: '3px',
    maxHeight: '60vh',
    overflow: 'overlay',
    overflowX: 'hidden',
    visibility: profiles > 0 ? 'visible' : 'hidden',
    zIndex: showRightBar && profiles > 0 ? '200' : '0',
    '&::-webkit-scrollbar': {
        width: '0px',
        position: 'relative',
        background: 'rgba(26, 26, 26, 0.9)'
        // background: 'red',
        // border: '1px solid black',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(77, 77, 77, 0.9)',
        borderRadius: '5px',
        position: 'relative',
        right: '-100px'
    },
    '&:hover': {
        '&::-webkit-scrollbar': {
            width: '6px'
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
    const { toggleRightBar, showRightBar, profiles } = useContext(AnimeTriviaGameContext);

    return (
        <Collapse in={showRightBar} collapsedSize={0} orientation={'horizontal'}>
            <RootStyle profiles={profiles.length} showRightBar={showRightBar}>
                <ProfileCardsPanel />
            </RootStyle>
        </Collapse>
    )
}

export default Profiles
