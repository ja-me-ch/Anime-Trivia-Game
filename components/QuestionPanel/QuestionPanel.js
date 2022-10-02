import React, { useEffect, useContext } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

function QuestionPanel() {
    const { combinedPool } = useContext(AnimeTriviaGameContext);

    // useEffect(() => {
    //     console.log('questionpanel render!');

    // }, [combinedPool])



    return (
        <div>

        </div>
    )
}

export default QuestionPanel;
