import React, { createContext, useState } from 'react';

export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const [profiles, setProfiles] = useState([]);
    const [listPool, setListPool] = useState([]);
    const masterList = { profiles: [], listPool: [] };


    const AddProfileState = function (data) { //New Add Profile
        const doesProfileExist = profiles.some((e) => (e.id) === data.profile.id);
        if (!doesProfileExist) {
            const listWithCheckData = data.lists.map((e, index) => {
                return { ...data.lists[index], checked: false }
            });

            setProfiles([...profiles, {
                ...data.profile,
                lists: listWithCheckData
            }])
        }
    }

    const AddProfile = function (profile) { //Old Add Profile
        const doesProfileExist = masterList.profiles.some((e) => (e.id) === profile.User.id);
        if (doesProfileExist === false) {
            masterList.profiles.push({
                id: profile.User.id,
                name: profile.User.name,
                // lists: mediaListCollection.lists
            });
            // console.log('Master List');
            // console.log(masterList);
            return true;
        }
        return true; //Change to true when testing styles, otherwise false
    }

    const UpdateListPool = function ({ checked, list, id, name, listName }) {
        console.log(listName);
        if (checked) {
            setProfiles(
                profiles.map((p) =>
                    p.id === id ? {
                        ...p, lists: p.lists.map((l) =>
                            l.name === listName ? { ...l, checked: checked } : l
                        )
                    } : p
                )
            )
            // masterList.listPool.push({
            //     ...list,
            //     id: id,
            //     ownerName: name
            // })
        }
        if (!checked) {
            setProfiles(
                profiles.map((p) =>
                    p.id === id ? {
                        ...p, lists: p.lists.map((l) =>
                            l.name === listName ? { ...l, checked: checked } : l
                        )
                    } : p
                )
            )
        }
    }

    const RemoveProfile = function (profileId) {
        console.log(profileId)
        masterList.listPool = masterList.listPool.filter(e => e.ownerId !== profileId);
        masterList.profiles = masterList.profiles.filter(e => e.id !== profileId);
        console.log(masterList);
    }

    return (
        <AnimeTriviaGameContext.Provider
            value={{
                profiles,
                AddProfileState,
                masterList,
                AddProfile,
                UpdateListPool,
                RemoveProfile
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}