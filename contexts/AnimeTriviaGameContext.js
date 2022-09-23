import React, { createContext } from 'react';

export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const masterList = [];
    
    const AddProfileToLists = function(profile, mediaListCollection) {
        const doesProfileExist = masterList.some((e) => (e.id) === profile.User.id);
        if (doesProfileExist === false) {
            masterList.push({
                id: profile.User.id,
                name: profile.User.name,
                lists: mediaListCollection.lists
            });
            return true;
        }
        return false;
    }


    return (
        <AnimeTriviaGameContext.Provider
            value={{
                masterList,
                AddProfileToLists
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}