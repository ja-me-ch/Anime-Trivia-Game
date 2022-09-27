import React, { useState, useEffect, useContext } from 'react';
import GetUserByName from "../graphql/getUserByName";
import MakeRequest from "../graphql/makeRequest";
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
    background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
    url(${props.background})`,
    backgroundSize: '150%',
    position: 'relative',
    backgroundPosition: '50% 50%',
    height: '60%',
    minHeight: '60%',
    transition: 'all 1.5s ease',
    '&:hover': {
        backgroundSize: '160%'
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
}));

const Name = styled('h5')((props) => ({
    position: 'relative',
    top: '-25%',
    left: '33%',
    fontSize: '32px',
    letterSpacing: '1.5px'
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
    margin: 'auto',
    padding: 'none',
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
    const [profile, setProfile] = useState({ User: { id: null } });
    const [render, setRender] = useState(false);
    const { masterList, AddProfileToLists, UpdateListPool } = useContext(AnimeTriviaGameContext);

    const OnCheckBox = function (e) {
        console.log(profile.lists);
        const foundList = profile.lists.find((list) => {
            return list.name === e.target.name
        });

        console.log(foundList);
        UpdateListPool({
            checked: e.target.checked,
            list: foundList,
            profile: {
                id: profile.id,
                name: profile.name
            },
            listName: e.target.name
        })

        console.log(masterList);
    }

    const GenerateProfileCard = function (profile) {
        const profileCard = <>
            <CardTop background={profile.bannerImage}>
                <SquareContainer>
                    <a href={profile.siteUrl} target='_blank' rel='noopener noreferrer'><Avatar src={profile.avatar.large}></Avatar></a>
                </SquareContainer>
                <Name>
                    <a href={profile.siteUrl} target='_blank' rel='noopener noreferrer'>{profile.name}</a>
                </Name>
                <ClearIconCircle className='clearIconCircle'>
                    <ClearIcon />
                </ClearIconCircle>
            </CardTop>
            <CardBottom>
                <ListContainer>
                    {CreateCheckBoxes(profile)}
                </ListContainer>
            </CardBottom>
        </>


        return profileCard;
    }
    const CreateCheckBoxes = function (profile) {
        const listItems = profile.lists.map((e, index) => {
            return <div key={`${profile.name}-${e.name}-${e.status}-${index}`}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={OnCheckBox}
                                name={e.name}
                                defaultChecked={false}
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

    useEffect(() => {
        const CallApi = async function (e) {
            const userParams = GetUserByName(props.name);
            await MakeRequest(userParams)
                .then((res) => {
                    return res.data;
                })
                .then(async (data) => {
                    if (data.User != null) {
                        await MakeRequest(GetMediaListCollectionByUserId(data.User.id))
                            .then((res) => {
                                setProfile({ ...data.User, lists: res.data.MediaListCollection.lists });
                                setRender(AddProfileToLists(data));
                            });
                    }
                });
        }
        CallApi();
    }, []);

    if (render === false) return null;

    else {
        console.log(profile);
        return (<RootStyle>
            {GenerateProfileCard(profile)}
        </RootStyle>)
    }
}

export default Profile;


