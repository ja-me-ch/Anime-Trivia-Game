import React, { useEffect, useContext } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

function QuestionPanel() {
    const { commonList } = useContext(AnimeTriviaGameContext);

    useEffect(() => {
        const list = commonList.filter((e) => e.users.length >= 2);
        console.log(list);
    }, [commonList])



    return (
        <div>

        </div>
    )
}

export default QuestionPanel;
