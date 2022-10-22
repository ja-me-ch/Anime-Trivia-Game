import React, { useEffect, useContext, useState } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import AnimeSeasonAirDate from '../../helper-functions/animeSeasonAirDate';

function QuestionPanel() {
    const { commonList } = useContext(AnimeTriviaGameContext);

    useEffect(() => {
        const list = commonList.filter((e) => e.users.length >= 2);
        console.log(list);

        const CallApi = async function() {
            // await MakeRequest(GetMediaInfoById(15689)).then((res) => console.log(res))
            // await MakeRequest(GetStaffById(95028)).then((res) => console.log(res))
            
            AnimeSeasonAirDate(15689);
        }

        CallApi();


    }, [commonList])
    
    



    return (
        <div>

        </div>
    )
}

export default QuestionPanel;
