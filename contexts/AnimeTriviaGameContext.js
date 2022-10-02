import React, { createContext, useState } from 'react';

export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const [profiles, setProfiles] = useState([]);
    // const [listPool, setListPool] = useState([]);
    const [combinedPool, setCombinedPool] = useState([]);
    const [commonList, setCommonList] = useState([]);
    const masterList = { profiles: [], listPool: [] };


    const AddProfile = function (data) { //New Add Profile
        const doesProfileExist = profiles.some((e) => (e.id) === data.profile.id);
        if (!doesProfileExist) {
            const listWithCheckData = data.lists.map((e, index) => {
                return { ...data.lists[index], checked: false }
            });

            // listWithCheckData.forEach((list) => {
            //     list.entries = list.entries.map((e) => {
            //         return e.mediaId
            //     });
            // });

            setProfiles([...profiles, {
                ...data.profile,
                lists: listWithCheckData
            }])
        }
    }

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

        const foundIndex = combinedPool.findIndex((e) => e.id === id);
        if (checked) {
            if (foundIndex !== -1) {
                const newCombinedPool = combinedPool;
                newCombinedPool[foundIndex].combinedEntries.push(...list.entries);
                newCombinedPool[foundIndex].addedListNames.push(list.name);
                setCombinedPool(newCombinedPool);
            }
            else {
                const oldCb = combinedPool;
                const newCb = [
                    ...oldCb,
                    {
                        id,
                        owner: name,
                        combinedEntries: oldCb.combinedEntries !== undefined ? [...oldCb.combinedEntries, ...list.entries] : [...list.entries],
                        addedListNames: oldCb.addedListNames !== undefined ? [...oldCb.addedListNames, ...listName] : [listName]
                    }
                ]
                setCombinedPool(newCb);
            }
        }
        else { //if not checked filter from list pool
            const filteredList = combinedPool[foundIndex].combinedEntries.filter((e) => {
                return !list.entries.some((m) => {
                    return m.mediaId === e.mediaId
                });
            });
            const filteredListNames = combinedPool[foundIndex].addedListNames.filter((e) => e !== listName);
            setCombinedPool(combinedPool.map((e) =>
                e.id === id ? {
                    ...e,
                    combinedEntries: filteredList,
                    addedListNames: filteredListNames
                } : e
            ))
        }
        // if (combinedPool.length < 1) {
        //     setCombinedPool(
        //         [
        //             ...combinedPool,
        //             {
        //                 id,
        //                 owner: name,
        //                 combinedEntries: [...list.entries],
        //                 addedListNames: [list.name]
        //             }
        //         ]
        //     )
        // }
        // else {

        //     if (foundIndex === -1) setCombinedPool([...combinedPool, { id, owner: name, combinedEntries: [...list.entries], addedListNames: [list.name] }]);
        // else {
        //     const newCombinedPool = combinedPool;
        //     newCombinedPool[foundIndex].combinedEntries.push(...list.entries);
        //     newCombinedPool[foundIndex].addedListNames.push(list.name);
        //     setCombinedPool(newCombinedPool);
        // }
        // }
        // }
        // else { //if not checked filter from list pool
        //     const filteredList = combinedPool[foundIndex].combinedEntries.filter((e) => {
        //         return !list.entries.some((m) => {
        //             return m.mediaId === e.mediaId
        //         });
        //     });
        //     const filteredListNames = combinedPool[foundIndex].addedListNames.filter((e) => e !== listName);
        //     setCombinedPool(combinedPool.map((e) =>
        //         e.id === id ? {
        //             ...e,
        //             combinedEntries: filteredList,
        //             addedListNames: filteredListNames
        //         } : e
        //     ))
        // }
    }

    const UpdateCommonList = function () {
        for (const cmbEnList of combinedPool) {
            console.log(cmbEnList.combinedEntries);
        }//end of for...of
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
                combinedPool,
                UpdateListPool,
                RemoveProfile
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}