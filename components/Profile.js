import React, { useState, useEffect, useContext } from 'react';
import styled from "@emotion/styled";
// import styled from "@emotion/styled/macro";

import GetMediaListCollectionByUserId from '../graphql/getMediaListCollectionByUserId';
import { AnimeTriviaGameContext } from '../contexts/AnimeTriviaGameContext';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Avatar = styled('img')((props) => ({
    width: '100%'
}));

const BannerImage = styled('img')((props) => ({
    // width: '200%',
    // backgroundPositionX: '100px',
    // backgroundPositionY: '100px'
}));

const CardTop = styled('div')((props) => ({
    background: props.background ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
    url(${props.background})` : null,
    backgroundSize: props.background ? '155%' : null,
    position: 'relative',
    backgroundPosition: props.background ?'50% 50%' : null,
    height: '60%',
    minHeight: '60%',
    transition: 'all 3s ease',
    '&:hover': {
        backgroundSize: '170%'
    }
}));

const CardBottom = styled('div')((props) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%'
}));

const SquareContainer = styled('div')((props) => ({
    position: 'relative',
    top: '45%',
    left: '3%',
    width: '125px',
    height: '125px',
    overflow: 'hidden',
    borderRadius: '15px',
    boxShadow: '4px 4px 12px rgba(0,0,0,0.5)'
}));

const Name = styled('h5')((props) => ({
    position: 'relative',
    top: '-20%',
    left: '33%',
    fontSize: '30px',
    letterSpacing: '2.5px',
    textShadow: '4px 4px 12px rgba(0,0,0,0.5)',
    fontFamily: 'Roboto, sans-serif'

}));

const ListContainer = styled('div')((props) => ({
    // border: '1px solid red',
    position: 'relative',
    left: '2%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '90%',
    // margin: '5px 15px'
}));

const ClearIconCircle = styled('div')((props) => ({
    className: 'clearIconCircle',
    position: 'absolute',
    top: '10px',
    right: '10px',
    height: '33px',
    width: '33px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(30, 30, 30, 1)',
    opacity: '0',
    transition: 'all 0.1s ease',
    '&:active': {
        color: 'rgba(30, 30, 30, 1)',
        background: 'white'
    }
}));

const RootStyle = styled('div')((props) => ({
    width: '450px',
    height: '300px',
    // margin: 'auto',
    // padding: 'none',
    borderRadius: '15px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(30, 30, 30, 1)',
    '&:hover': {
        '.clearIconCircle': {
            opacity: '1',
        }
    }
}));

function Profile(props) {
    const { id, name, avatar, bannerImage, siteUrl, lists } = props.props;
    const { profiles, listPool, UpdateListPool, RemoveProfile } = useContext(AnimeTriviaGameContext);

    const OnCheckBox = function (e) {
        const foundList = lists.find((list) => {
            return list.name === e.target.name
        });

        console.log(foundList);
        UpdateListPool({
            checked: e.target.checked,
            list: foundList,
            id: id,
            name: name,
            listName: e.target.name
        })

        console.log(profiles)
    }

    const OnClearIconClick = function (e) {
        RemoveProfile(id);
    }

    const GenerateProfileCard = function () {
        const profileCard = <>
            <CardTop background={bannerImage}>
                <SquareContainer>
                    <a href={siteUrl} target='_blank' rel='noopener noreferrer'><Avatar src={avatar.large}></Avatar></a>
                </SquareContainer>
                <Name>
                    <a href={siteUrl} target='_blank' rel='noopener noreferrer'>{name}</a>
                </Name>
                <ClearIconCircle className='clearIconCircle' onClick={OnClearIconClick}>
                    <ClearIcon />
                </ClearIconCircle>
            </CardTop>
            <CardBottom>
                <ListContainer>
                    {CreateCheckBoxes()}
                </ListContainer>
            </CardBottom>
        </>
        return profileCard;
    }
    const CreateCheckBoxes = function () {
        const listItems = lists.map((e, index) => {
            return <div key={`${name}-${e.name}-${e.status}-${index}`}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={OnCheckBox}
                                name={e.name}
                                checked={e.checked}
                                sx={{
                                    color: 'white',
                                    padding: '5px',
                                    '&.Mui-checked': {
                                        color: 'white'
                                    }
                                }}
                            />}
                        label={`${e.name} (${e.entries.length})`}
                    />
                </FormGroup>
            </div>
        })

        listItems.sort((a, b) => {
            return a.props.children.props.children.props.label.localeCompare(b.props.children.props.children.props.label);
        });
        return listItems;
    }

    return (<RootStyle>
        {GenerateProfileCard()}
    </RootStyle>)
}

export default Profile;


