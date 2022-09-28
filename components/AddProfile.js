import React, { useState } from 'react';
import { useContext } from 'react';
import Profile from './Profile';
import MakeRequest from '../graphql/makeRequest';
import GetUserByName from '../graphql/getUserByName';
import GetMediaListCollectionByUserId from '../graphql/getMediaListCollectionByUserId';
import { AnimeTriviaGameContext } from '../contexts/AnimeTriviaGameContext';
import { TextField } from '@mui/material';

function AddProfile(props) {
    const [nameField, setNameField] = useState('melody');
    const { masterList, profiles, AddProfileState } = useContext(AnimeTriviaGameContext);

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
                            AddProfileState({
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
        if (e.code === 'Escape') {
            console.log('Escape was pressed!')
        }
    }

    return (
        <div>
            <TextField sx={{
                border: '1px solid white',
                borderRadius: '6px'
            }}
                inputProps={{
                    sx: {
                        color: 'white'
                    }
                }}
                placeholder={'Enter AniList Name'}
                onKeyDown={OnKeyDown}
                value={nameField}
                onChange={(e) => setNameField(e.target.value)}
            />
            {/* {profiles} */}
        </div>
    )
}

export default AddProfile;
