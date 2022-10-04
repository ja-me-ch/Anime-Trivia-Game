import { common } from '@mui/material/colors';
import { refType } from '@mui/utils';
import React, { createContext, useState } from 'react';

export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const [profiles, setProfiles] = useState([]);
    // const [listPool, setListPool] = useState([]);
    const [combinedPool, setCombinedPool] = useState([]);
    const commonList = [];
    const masterList = { profiles: [], listPool: [] };


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

        let newCb;
        if (checked) { //if checked added to combinedPool
            if (foundIndex !== -1) { //if index isnt -1 aka id already exists simply add to the object at the index
                console.log('if-add');
                newCb = combinedPool.map((e, index) => {
                    if (index === foundIndex) {
                        return {
                            ...e,
                            combinedEntries: [...e.combinedEntries, ...list.entries],
                            addedListNames: [...e.addedListNames, listName]
                        }
                    }
                    else return e;
                })
            }
            else { //else add a completely new object
                console.log('else-add');
                newCb = [
                    ...combinedPool,
                    {
                        id,
                        owner: name,
                        combinedEntries: combinedPool.combinedEntries !== undefined ? [...combinedPool.combinedEntries, ...list.entries] : [...list.entries],
                        addedListNames: combinedPool.addedListNames !== undefined ? [...combinedPool.addedListNames, ...listName] : [listName]
                    }
                ]
                // return setCombinedPool(newCb);
            }
        }
        else { //if not checked filter/remove from list pool
            const filteredList = combinedPool[foundIndex].combinedEntries.filter((e) => {
                return !list.entries.some((m) => {
                    return m === e
                });
            });
            const filteredListNames = combinedPool[foundIndex].addedListNames.filter((e) => e !== listName);
            newCb = combinedPool.map((e) =>
                e.id === id ? {
                    ...e,
                    combinedEntries: filteredList,
                    addedListNames: filteredListNames
                } : e
            )
        }
        setCombinedPool(newCb)
    }

    const UpdateCommonList = function () {
        console.log('update common list');
        combinedPool.forEach((user) => {
            user.combinedEntries.forEach((entry, index) => {
                console.log(entry)
                if (commonList.some((e) => {
                    return e.mediaId === entry
                })) {
                    console.log(`${entry} is already in commonList`)
                    console.log(commonList[index].users.push(user.owner));
                }
                else {
                    console.log(`${entry} is not in commonList`)
                    commonList.push({
                        mediaId: entry,
                        users: [user.owner]
                    })
                }
            })
        })
        console.log(commonList);
    }

    const RemoveProfile = function (profileId) {
        setProfiles(profiles.filter((e) => e.id !== profileId));
        setCombinedPool(combinedPool.filter((e) => e.id !== profileId));
        // setListPool(listPool.filter((e) => e.id !== profileId));
    }

    return (
        <AnimeTriviaGameContext.Provider
            value={{
                profiles,
                AddProfile,
                combinedPool,
                UpdateCommonList,
                UpdateListPool,
                RemoveProfile
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}