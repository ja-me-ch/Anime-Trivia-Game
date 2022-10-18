import React, { useEffect, useContext, useState } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import MakeRequest from '../../graphql/makeRequest';
import GetMediaInfoById from '../../graphql/getMediaInfoById';
import GetStaffById from '../../graphql/getStaffById';

function QuestionPanel() {
    const { commonList } = useContext(AnimeTriviaGameContext);
    const [mediaInfo, setMediaInfo] = useState();
    const [staffInfo, setStaffInfo] = useState();

    useEffect(() => {
        const list = commonList.filter((e) => e.users.length >= 2);
        console.log(list);

        const CallApi = async function() {
            await MakeRequest(GetMediaInfoById(15689)).then((res) => console.log(res))
            await MakeRequest(GetStaffById(95028)).then((res) => console.log(res))
            // console.log(await MakeRequest(GetStaffById(95028)));
            // console.log(await MakeRequest(GetMediaInfoById(15689)));
        }

        CallApi();

        // console.log(mediaInfo);
        // console.log(staffInfo);
    }, [commonList])
    
    



    return (
        <div>

        </div>
    )
}

export default QuestionPanel;
