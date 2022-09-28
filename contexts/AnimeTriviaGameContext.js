import React, { createContext, useState } from 'react';

export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const [profiles, setProfiles] = useState([]);
    const [listPool, setListPool] = useState([]);
    const masterList = { profiles: [], listPool: [] };


    const AddProfile = function (data) { //New Add Profile
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

    // const AddProfile = function (profile) { //Old Add Profile | no longer needed probably
    //     const doesProfileExist = masterList.profiles.some((e) => (e.id) === profile.User.id);
    //     if (doesProfileExist === false) {
    //         masterList.profiles.push({
    //             id: profile.User.id,
    //             name: profile.User.name,
    //             // lists: mediaListCollection.lists
    //         });
    //         // console.log('Master List');
    //         // console.log(masterList);
    //         return true;
    //     }
    //     return true; //Change to true when testing styles, otherwise false
    // }

    const UpdateListPool = function ({ checked, list, id, name, listName }) {
        setProfiles(
            profiles.map((p) => //finds the profile (p) = id else just return (p)
                p.id === id ? {
                    ...p, lists: p.lists.map((l) => //if (p) = id find list (l) with l.name = listName, set to checked value
                        l.name === listName ? { ...l, checked: checked } : l
                    )
                } : p
            )
        )

        if (checked) { //if checked add to listPool
            setListPool([...listPool, { ...list, owner: name, id: id, checked: checked }])
        }
        else if (!checked) { //if not checked filter from list pool
            setListPool(listPool.filter((l) => l.name !== listName || l.id !== id));
        }
    }

    const RemoveProfile = function (profileId) {
        setProfiles(profiles.filter((e) => e.id !== profileId));
        setListPool(listPool.filter((e) => e.id !== profileId));
    }

    return (
        <AnimeTriviaGameContext.Provider
            value={{
                profiles,
                AddProfile,
                masterList,
                UpdateListPool,
                RemoveProfile
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}