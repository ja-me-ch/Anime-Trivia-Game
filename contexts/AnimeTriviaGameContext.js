import { common } from '@mui/material/colors';
import { refType } from '@mui/utils';
import React, { createContext, useState } from 'react';

export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const [profiles, setProfiles] = useState([]);
    const [commonList, setCommonList] = useState([]);
    const [lockAnswers, setLockAnswers] = useState(false);


    const AddProfile = function (data) { //New Add Profile
        const doesProfileExist = profiles.some((e) => (e.id) === data.profile.id);
        if (!doesProfileExist) {
            const listWithCheckData = data.lists.map((e, index) => {
                return { ...data.lists[index], checked: false }
            });

            listWithCheckData.forEach((list) => {
                list.entries = list.entries.map((e) => {
                    return e.mediaId
                });
            });

            setProfiles([...profiles, {
                ...data.profile,
                lists: listWithCheckData
            }])
        }
    }

    const UpdateListPool = function (props) {
        const { checked, list, id, name, listName } = props;

        setProfiles(
            profiles.map((p) => //finds the profile (p) = id else just return (p)
                p.id === id ? {
                    ...p, lists: p.lists.map((l) => //if (p) = id find list (l) with l.name = listName, set to checked value
                        l.name === listName ? { ...l, checked: checked } : l
                    )
                } : p
            )
        )

        const tempCommonList = commonList;
        if (checked) { //add to commonList
            list.entries.forEach((entry) => {
                const foundIndex = tempCommonList.findIndex(e => e.mediaId === entry)
                if (tempCommonList.some((e) => e.mediaId === entry)) {
                    tempCommonList[foundIndex].users = [...tempCommonList[foundIndex].users, name]
                }
                else {
                    tempCommonList = [...tempCommonList, { mediaId: entry, users: [name] }]
                }
            })
        }
        else {
            list.entries.forEach((entry) => {
                tempCommonList.forEach((c) => {
                    if (c.mediaId === entry) {
                        c.users = c.users.filter((u) => u !== name);
                        if (c.users.length === 0) {
                            tempCommonList = tempCommonList.filter((e) => e.mediaId !== entry)
                        }
                    }
                })
            })
        }
        setCommonList(tempCommonList);
    }

    const RemoveProfile = function (profileId) {
        const foundProfile = profiles.find((p) => p.id === profileId);
        foundProfile.lists.forEach((l) => {
            if (l.checked) {
                UpdateListPool({
                    checked: false,
                    list: l,
                    id: profileId,
                    name: foundProfile.name,
                    listName: l.name
                })
            }
        })
        setProfiles(profiles.filter((e) => e.id !== profileId));
    }

    const GenerateQuestions = function () {
        //create a question data state that will hold questions and weights
        //pick a random entry from commonList
        //check for preliminary things: eg. if the anime has more than 4 characters
        //if currently airing anime, eliminate N/a questions like end date/episode count
    }

    const AnswerOnClick = function(isCorrect) {
        console.log('clicked!')
    }

    return (
        <AnimeTriviaGameContext.Provider
            value={{
                profiles,
                AddProfile,
                commonList,
                UpdateListPool,
                RemoveProfile,
                AnswerOnClick
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}