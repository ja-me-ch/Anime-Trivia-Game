import React, { useState, useEffect, useContext } from 'react';
import GetUserByName from "../graphql/getUserByName";
import MakeRequest from "../graphql/makeRequest";
import { styled } from '@mui/material/styles';
import GetMediaListCollectionByUserId from '../graphql/getMediaListCollectionByUserId';
import { AnimeTriviaGameContext } from '../contexts/AnimeTriviaGameContext';

const RootStyle = styled('div')((props) => ({
    width: '450px',
    height: '300px',
    margin: 'auto',
    padding: 'none',
    border: '1px solid red',
    borderRadius: '15px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
}));

const Avatar = styled('img')((props) => ({
    width: '100%'
}));

const BannerImage = styled('img')((props) => ({
    // width: '200%',
    // backgroundPositionX: '100px',
    // backgroundPositionY: '100px'
}));

const CardHalf = styled('div')((props) => ({
    background: props.background ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
    url(${props.background})` : null,
    backgroundSize: '150%',
    backgroundPosition: '50% 50%',
    // width: '100%',
    height: props.background ? '55%' : '45%',
    overflow: props.background ? 'hidden' : 'visible',
    // border: '1px solid yellow'
}));

const SquareContainer = styled('div')((props) => ({
    position: 'relative',
    top: '-70%',
    left: '5%',
    width: '125px',
    height: '125px',
    overflow: 'hidden',
    borderRadius: '15px',
    border: '1px border red'
}));

const Name = styled('h5')((props) => ({
    position: 'relative',
    top: '48%',
    left: '35%',
    fontSize: '24px',
    letterSpacing: '1.5px'
}));

function Profile(props) {
    const [data, setData] = useState(null);
    const { masterList, AddProfileToLists } = useContext(AnimeTriviaGameContext);
    const [render, setRender] = useState(false);

    useEffect(() => {
        const CallApi = async function (e) {
            const userParams = GetUserByName(props.name);
            await MakeRequest(userParams)
                .then((res) => {
                    return res.data;
                })
                .then(async (data) => {
                    if (data.User != null) {
                        setData(data);
                        const listParams = GetMediaListCollectionByUserId(data.User.id);
                        await MakeRequest(listParams)
                            .then((res) => {
                                const mediaListCollection = res.data.MediaListCollection;
                                setRender(AddProfileToLists(data, mediaListCollection));
                            })
                    }

                });
        }
        CallApi();
    }, []);


    let user = <div></div>
    if (render) {
        user = <>
            <CardHalf background={data.User.bannerImage}>
                <Name><a href={data.User.siteUrl}>{data.User.name}</a></Name>
            </CardHalf>
            <CardHalf>
                <SquareContainer>
                    <a href={data.User.siteUrl}><Avatar src={data.User.avatar.large}></Avatar></a>
                </SquareContainer>
            </CardHalf>
        </>

        return (<RootStyle>
            {user}
        </RootStyle>)
    }

    else return null;
}

export default Profile
