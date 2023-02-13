import { Update } from '@mui/icons-material';
import React, { createContext, useState } from 'react';
import AnimeSeasonAirDate from '../helper-functions/Questions/animeSeasonAirDate';
//import getRandomCommonMediaId from '../helper-functions/Functions/getRandomCommonMediaId';



export const AnimeTriviaGameContext = createContext();

export function AnimeTriviaGameProvider(props) {
    const [profiles, setProfiles] = useState([]);
    const [commonList, setCommonList] = useState([]);
    const [questionHistory, setQuestionHistory] = useState([]);

    //Menu/UI states
    const [showRightBar, setShowRightBar] = useState(true);
    const [showLeftBar, setShowLeftBar] = useState(false);

    //ThemeContext
    const [selectedTheme, setSelectedTheme] = useState('dark');

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

    const GenerateNewQuestion = function (commonUserCount) {
        //create a question data state that will hold questions and weights
        //pick a random entry from commonList
        //check for preliminary things: eg. if the anime has more than 4 characters
        //if currently airing anime, eliminate N/a questions like end date/episode count
        // console.log('generating new question');

        const list = commonList.filter((e) => e.users.length >= 0);

        const MakeCall = async function () {
            return await AnimeSeasonAirDate(getRandomCommonMediaId(list));
        }
        MakeCall()
            .then((res) => {
                const newQuestionHistory = questionHistory.map((e) => e)
                newQuestionHistory.push(res);
                setQuestionHistory(newQuestionHistory);
            })

        
    }

    const toggleRightBar = function () {
        setShowRightBar((s) => (!s))
    }

    const toggleLeftBar = function () {
        setShowLeftBar((s) => (!s));
    }

    const getQuestionHistory = function () {
        let correctAnswers = 0;
        let answeredQuestions = 0;
        questionHistory.forEach((e) => {
            if (e.answers.some((a) => a.clicked === true)) {
                answeredQuestions++;
                const guess = e.answers.find((a) => (a.clicked === true));
                if (guess.isCorrect === true) correctAnswers++;
            }
        });
        if (answeredQuestions === 0) return undefined;
        return [correctAnswers, answeredQuestions];
    };

    const updateAnswersQuestionHistory = function (questionIndex, answerIndex) {
        setQuestionHistory((q) => {
            // console.log(q);
            q[questionIndex].answers[answerIndex].clicked = true;
            // console.log(q);
            return q;
        });
    }

    const updateQuestionHistory = function (newQuestion) {
        setQuestionHistory((h) => {
            const newHistory = h.map((h) => (h));
            newHistory.push(newQuestion);
            return newHistory;
        })
    }

    return (
        <AnimeTriviaGameContext.Provider
            //TODO: reorganize values
            value={{
                profiles: {
                    value: profiles,
                    add: AddProfile,
                    remove: RemoveProfile
                },
                commonList: {
                    value: commonList,
                    update: UpdateListPool
                },
                questionHistory: {
                    value: questionHistory,
                    updateAnswers: updateAnswersQuestionHistory,
                    update: updateQuestionHistory,
                    score: getQuestionHistory
                },
                selectedTheme: {
                    value: selectedTheme,
                    update: setSelectedTheme
                },
                GenerateNewQuestion,
                toggleRightBar,
                toggleLeftBar,
                showRightBar,
                showLeftBar,
            }}
        >
            {props.children}
        </AnimeTriviaGameContext.Provider>
    )
}