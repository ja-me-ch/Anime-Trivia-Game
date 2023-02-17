import React, { useState } from 'react';
import { useContext } from 'react';
import styled from '@emotion/styled';
import MakeRequest from '../../graphql/makeRequest';
import GetUserByName from '../../graphql/getUserByName';
import GetMediaListCollectionByUserId from '../../graphql/getMediaListCollectionByUserId';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import { TextField } from '@mui/material';

const RootStyle = styled('div')((props) => ({
    margin: '5px 5px'
}));

function AddProfile(props) {
    const [nameField, setNameField] = useState('melody');
    const { profiles } = useContext(AnimeTriviaGameContext);

    const CallApi = async function (name) {
        const userParams = GetUserByName(name);
        await MakeRequest(userParams)
            .then((res) => {
                return res.data;
            })
            .then(async (data) => {
                if (data.User != null) {
                    setNameField('');
                    await MakeRequest(GetMediaListCollectionByUserId(data.User.id))
                        .then((res) => {
                            profiles.add({
                                profile: data.User,
                                lists: res.data.MediaListCollection.lists
                            });
                        });
                }
            });
    }

    const OnKeyDown = function (e) {
        if (nameField === '') return null;
        if (e.code === 'Enter') {
            CallApi(nameField)
        }
    }

    return (
        <RootStyle>
            <TextField sx={{
                border: '1px solid white',
                borderRadius: '6px',
                minWidth: '200px',
                width: '200px'
            }}
                // inputProps={{
                //     sx: {
                //         // color: 'white'
                //     }
                // }}
                placeholder={'Enter AniList Name'}
                onKeyDown={OnKeyDown}
                value={nameField}
                onChange={(e) => setNameField(e.target.value)}
            />
        </RootStyle>
    )
}

export default AddProfile;
