import { common } from '@mui/material/colors';
import { refType } from '@mui/utils';
import React, { createContext, useState } from 'react';

export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const [profiles, setProfiles] = useState([]);
    // const [listPool, setListPool] = useState([]);
    // const [combinedPool, setCombinedPool] = useState([]);
    const [commonList, setCommonList] = useState([]);
    // const masterList = { profiles: [], listPool: [] };


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
                    // console.log(`${entry} is already in commonList`);
                    tempCommonList[foundIndex].users = [...tempCommonList[foundIndex].users, name]
                    // console.log(`${name} added to entry:${entry} at ${tempCommonList.findIndex(e => e.mediaId === entry)}`)
                }
                else {
                    // console.log(`${entry} is not in commonList`);
                    tempCommonList = [...tempCommonList, { mediaId: entry, users: [name] }]
                    // tempCommonList.push({
                    //     mediaId: entry,
                    //     users: [name]
                    // })
                }
            })
            // setCommonList(tempCommonList);
        }
        else {
            // const tempCommonList = commonList;
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
            // tempCommonList = tempCommonList.filter((e) => e.users.length !== 0)
        }
        setCommonList(tempCommonList);


        // const foundIndex = combinedPool.findIndex((e) => e.id === id);

        // let newCb;
        // if (checked) { //if checked added to combinedPool
        //     if (foundIndex !== -1) { //if index isnt -1 aka id already exists simply add to the object at the index
        //         console.log('if-add');
        //         newCb = combinedPool.map((e, index) => {
        //             if (index === foundIndex) {
        //                 return {
        //                     ...e,
        //                     combinedEntries: [...e.combinedEntries, ...list.entries],
        //                     addedListNames: [...e.addedListNames, listName]
        //                 }
        //             }
        //             else return e;
        //         })
        //     }
        //     else { //else add a completely new object
        //         console.log('else-add');
        //         newCb = [
        //             ...combinedPool,
        //             {
        //                 id,
        //                 owner: name,
        //                 combinedEntries: combinedPool.combinedEntries !== undefined ? [...combinedPool.combinedEntries, ...list.entries] : [...list.entries],
        //                 addedListNames: combinedPool.addedListNames !== undefined ? [...combinedPool.addedListNames, ...listName] : [listName]
        //             }
        //         ]
        //         // return setCombinedPool(newCb);
        //     }
        // }
        // else { //if not checked filter/remove from list pool
        //     const filteredList = combinedPool[foundIndex].combinedEntries.filter((e) => {
        //         return !list.entries.some((m) => {
        //             return m === e
        //         });
        //     });
        //     const filteredListNames = combinedPool[foundIndex].addedListNames.filter((e) => e !== listName);
        //     newCb = combinedPool.map((e) =>
        //         e.id === id ? {
        //             ...e,
        //             combinedEntries: filteredList,
        //             addedListNames: filteredListNames
        //         } : e
        //     )
        // }
        // setCombinedPool(newCb)
    }

    // const UpdateCommonList = function () {
    //     console.log('update common list');
    //     const tempCommonList = [];
    //     combinedPool.forEach((user) => {
    //         user.combinedEntries.forEach((entry, index) => {
    //             console.log(entry)
    //             if (tempCommonList.some((e) => {
    //                 return e.mediaId === entry
    //             })) { //if entry is already in tempCommonList
    //                 console.log(`${entry} is already in commonList`);
    //                 // console.log(tempCommonList[index].users)
    //                 // console.log(tempCommonList[index].users.includes(user.owner))
    //                 // tempCommonList[index].users.push(user.owner);
    //                 if (!tempCommonList[index].users.includes(user.owner)) {
    //                     console.log(`${user.owner} added to ${entry}`)
    //                     tempCommonList[index].users.push(user.owner)
    //                 }
    //                 else {
    //                     console.log(`${user.owner} is already added for ${entry}`)
    //                 }
    //             }
    //             else { //else entry isnt found push the mediaId and the users
    //                 console.log(`${entry} is not in commonList`)
    //                 tempCommonList.push({
    //                     mediaId: entry,
    //                     users: [user.owner]
    //                 })
    //             }
    //         })
    //     })
    //     // setCommonList(tempCommonList);
    // }

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

        // setCombinedPool(combinedPool.filter((e) => e.id !== profileId));
        // setListPool(listPool.filter((e) => e.id !== profileId));
    }

    return (
        <AnimeTriviaGameContext.Provider
            value={{
                profiles,
                AddProfile,
                commonList,
                UpdateListPool,
                RemoveProfile
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}