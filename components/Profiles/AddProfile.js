import React, { useState } from 'react';
import { useContext } from 'react';
import styled from '@emotion/styled';
import MakeRequest from '../../graphql/makeRequest';
import GetUserByName from '../../graphql/getUserByName';
import GetMediaListCollectionByUserId from '../../graphql/getMediaListCollectionByUserId';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import { TextField } from '@mui/material';

const RootStyle = styled('div')((props) => ({
    margin: '5px 5px',
    backgroundColor: 'black'
}));

function AddProfile(props) {
    const [nameField, setNameField] = useState('');
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
        e.preventDefault();
        if (nameField === '') return null;
        if (e.code === 'Enter') {
            CallApi(nameField)
        }
    }

    const onSubmit = function (e) {
        e.preventDefault();
        console.log(e);
        if (nameField === '') return null;
        if (e.type === 'submit') {
            CallApi(nameField)
        }
    }

    return (
        <RootStyle>
            <form onSubmit={onSubmit}>
                <TextField
                    // variant='filled'
                    sx={{
                        height: '100%',
                        border: '1px solid white',
                        borderRadius: '6px',
                        minWidth: '200px',
                        width: '200px'
                    }}
                    inputProps={{
                        sx: {
                            height: '100%',
                            // marginBottom: '-5px'
                            // color: 'white'
                        }
                    }}
                    placeholder={'Enter AniList Name'}
                    // onKeyDown={OnKeyDown}
                    // onSubmit={onSubmit}
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)}
                />
            </form>
        </RootStyle>
    )
}

export default AddProfile;
