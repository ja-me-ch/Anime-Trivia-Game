import React, { useEffect, useContext } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

function QuestionPanel() {
    const { combinedPool, UpdateCommonList } = useContext(AnimeTriviaGameContext);

    useEffect(() => {
        UpdateCommonList();

    }, [combinedPool])



    return (
        <div>

        </div>
    )
}

export default QuestionPanel;
