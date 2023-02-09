import React, { useContext, useEffect, useState } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import ProfileCard from './ProfileCard';
import styled from '@emotion/styled';

const RootStyle = styled('div')(() => ({
    // border: '1px solid red',
    width: '450px',
    // maxWidth: '450px',
    '@media(max-width: 500px)': {
        width: '100vw'
    }
    // background: 'grey',
    // padding: '5px',
    // paddingBottom: '10px',
    // height: '100%',
    // overflow: 'hidden',
    // // scrollbarGutter: 'auto',
    // // scrollbarColor: 'unset',
    // // scrollbarWidth: 'thin',
    // overflowX: 'hidden',
    // overflowY: 'scroll',

    // '&::-webkit-scrollbar': {
    //     backgroundColor: 'grey',
    //     width: '0px',
    //     // height: '50%',
    //     // position: 'relative',
    // },
    // '&:hover': {
    //     '&::-webkit-scrollbar': {
    //         width: '2px',
    //         border: '1px solid red'
    //     }
    // }
}));

function ProfileCardsPanel() {
    const { profiles } = useContext(AnimeTriviaGameContext);
    const [profileCards, setProfileCards] = useState([]);

    useEffect(() => {
        setProfileCards(profiles.value.map((e) => {
            return <ProfileCard props={e} key={e.id}/>
        }));
    }, [profiles.value]);
    if (profiles.value.length === 0) return null;
    return (
        <RootStyle>
            {profileCards}
        </RootStyle>
    )
}

export default ProfileCardsPanel
