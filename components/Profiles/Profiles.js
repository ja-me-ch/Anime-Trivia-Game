import React from 'react';
import AddProfile from './AddProfile';
import ProfileCardsPanel from './ProfileCardsPanel';
import styled from '@emotion/styled';

const RootStyle = styled('div')((props) => ({
    // border: '1px solid red'
}))

function Profiles(props) {
    return (
        <RootStyle>
            <AddProfile />
            <ProfileCardsPanel />
        </RootStyle>
    )
}

export default Profiles
