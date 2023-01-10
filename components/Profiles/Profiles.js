import React, { useContext } from 'react';
import AddProfile from './AddProfile';
import ProfileCardsPanel from './ProfileCardsPanel';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Button, Collapse } from '@mui/material'
import styled from '@emotion/styled';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

const RootStyle = styled('div')(({ showRightBar }) => ({
    border: '1px solid red',
    width: '100%'
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

const DrawerIcon = styled(GroupAddIcon)((props) => ({
    fontSize: '2rem',
    margin: '0.4rem'
}))

function Profiles(props) {
    const { toggleRightBar, showRightBar } = useContext(AnimeTriviaGameContext);

    return (

        <RootStyle showRightBar={showRightBar} className={'toggledRightBar'}>
            <TopBar>
                <Button
                    variant='outlined'
                    sx={{
                        marginX: '10px',
                        height: '50%',
                        aspectRatio: '1/1',
                        minWidth: 'unset',
                        padding: '8px'
                    }}
                    onClick={() => { toggleRightBar() }}
                >
                    <DrawerIcon />
                </Button>
                {showRightBar && <AddProfile />}
            </TopBar>
            <Collapse in={showRightBar} collapsedSize={0} orientation={'horizontal'}>
                <ProfileCardsPanel />
            </Collapse>
        </RootStyle>
    )
}

export default Profiles
