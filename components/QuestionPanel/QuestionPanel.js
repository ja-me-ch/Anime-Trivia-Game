import React, { useEffect, useContext, useState } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import AnimeSeasonAirDate from '../../helper-functions/Questions/animeSeasonAirDate';
import Question from './Question';

function QuestionPanel() {
    const { commonList } = useContext(AnimeTriviaGameContext);

    const [currentQuestion, setCurrentQuestion] = useState();

    useEffect(() => {
        const list = commonList.filter((e) => e.users.length >= 2);
        console.log(list);

        const CallApi = async function () {
            // await MakeRequest(GetMediaInfoById(15689)).then((res) => console.log(res))
            // await MakeRequest(GetStaffById(95028)).then((res) => console.log(res))

            const data = await AnimeSeasonAirDate(15689);
            setCurrentQuestion(data);
        }

        CallApi();


    }, [commonList])


    if (currentQuestion === undefined) return null;
    // console.log(currentQuestion);

    //pass currentQuestion to Question component
    return (
        <div>
            <Question props={currentQuestion}/>
        </div>
    )
}

export default QuestionPanel;
