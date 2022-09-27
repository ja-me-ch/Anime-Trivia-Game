import React, { createContext } from 'react';

export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const masterList = { profiles: [], listPool: [] };

    const AddProfileToLists = function (profile) {
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

    const UpdateListPool = function({checked, list, profile, listName}) {
        if (checked) {
            masterList.listPool.push({
                ...list,
                ownerId: profile.id,
                ownerName: profile.name
            })
        }
        if (!checked) {
            masterList.listPool.forEach((element, index) => {
                if (element.name === listName && element.ownerId === profile.id) {
                    masterList.listPool.splice(index, 1);
                }
            });
        }
    }

    const RemoveProfile = function(profileId) {
        console.log(profileId)
        masterList.listPool = masterList.listPool.filter(e => e.ownerId !== profileId);
        masterList.profiles = masterList.profiles.filter(e => e.id !== profileId);
        console.log(masterList);
    }

    return (
        <AnimeTriviaGameContext.Provider
            value={{
                masterList,
                AddProfileToLists,
                UpdateListPool,
                RemoveProfile
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}