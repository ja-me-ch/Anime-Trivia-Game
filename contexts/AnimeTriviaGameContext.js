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

    const ReturnLists = function(id) {
        const profile = masterList.find((e) => (e.id === id));
        if (profile !== undefined) {
            const listItems = [];
            profile.lists.forEach((list) => {
                listItems.push({
                    name: list.name,
                    entries: list.entries.length
                })
            });
            console.log(listItems);
            return listItems;
        }
    }


    return (
        <AnimeTriviaGameContext.Provider
            value={{
                masterList,
                AddProfileToLists,
                ReturnLists
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}