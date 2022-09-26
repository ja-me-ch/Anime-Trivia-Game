import React, { useState, useEffect, useContext } from 'react';
import GetUserByName from "../graphql/getUserByName";
import MakeRequest from "../graphql/makeRequest";
import { styled } from '@mui/material/styles';
import GetMediaListCollectionByUserId from '../graphql/getMediaListCollectionByUserId';
import { AnimeTriviaGameContext } from '../contexts/AnimeTriviaGameContext';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const RootStyle = styled('div')((props) => ({
    width: '450px',
    height: '300px',
    margin: 'auto',
    padding: 'none',
    borderRadius: '15px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(30, 30, 30, 1)'
}));

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
    backgroundPosition: '50% 50%',
    // width: '100%',
    height: '60%',
    minHeight: '60%',
    overflow: 'hidden'
}));

const CardBottom = styled('div')((props) => ({
    height: '40%'
}));

const SquareContainer = styled('div')((props) => ({
    position: 'relative',
    top: '-90%',
    left: '5%',
    width: '125px',
    height: '125px',
    overflow: 'hidden',
    borderRadius: '15px',
}));

const Name = styled('h5')((props) => ({
    position: 'relative',
    top: '55%',
    left: '35%',
    fontSize: '24px',
    letterSpacing: '1.5px'
}));

const ListContainer = styled('div')((props) => ({
    // border: '1px solid red',
    position: 'relative',
    top: '-90%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '80%',
    padding: '5px 12px'
}));

function Profile(props) {
    const [profile, setProfile] = useState({ User: { id: null } });
    const [render, setRender] = useState(false);
    const { masterList, AddProfileToLists, ReturnLists } = useContext(AnimeTriviaGameContext);

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
                                setRender(AddProfileToLists(data, res.data.MediaListCollection));
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
            {GenerateProfileCard(profile, ReturnLists)}
        </RootStyle>)
    }
}

export default Profile;

const OnCheckBox = function (profile) {

}

const GenerateProfileCard = function (profile, ReturnLists) {
    const profileCard = <>
        <CardTop background={profile.bannerImage}>
            <Name>
                <a href={profile.siteUrl}>{profile.name}</a>
            </Name>
        </CardTop>
        <CardBottom>
            <SquareContainer>
                <a href={profile.siteUrl}><Avatar src={profile.avatar.large}></Avatar></a>
            </SquareContainer>
            <ListContainer>
                {CreateCheckBoxes(profile)}
            </ListContainer>
        </CardBottom>
    </>


    return profileCard;
}
const CreateCheckBoxes = function (profile) {
    // const list = ReturnLists(profile.id);
    const listItems = profile.lists.map((e, index) => {
        console.log(e);
        console.log(e.name);
        return <div key={`${profile.name}-${e.name}-${e.status}`}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
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
