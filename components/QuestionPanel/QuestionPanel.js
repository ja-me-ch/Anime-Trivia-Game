import React, { useEffect, useContext, useState } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import GetRelatedAnime from '../../helper-functions/Functions/getRelatedAnime';

function QuestionPanel() {
    const { commonList } = useContext(AnimeTriviaGameContext);

    useEffect(() => {
        const list = commonList.filter((e) => e.users.length >= 2);
        console.log(list);

        const CallApi = async function () {
            // await MakeRequest(GetMediaInfoById(15689)).then((res) => console.log(res))
            // await MakeRequest(GetStaffById(95028)).then((res) => console.log(res))

            GetRelatedAnime(15689);
        }

        CallApi();


    }, [commonList])





    return (
        <div>

        </div>
    )
}

export default QuestionPanel;
