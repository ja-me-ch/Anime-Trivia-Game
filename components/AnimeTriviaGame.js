import React from 'react';
import { AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import Profiles from './Profiles/Profiles';
import QuestionPanel from './QuestionPanel/QuestionPanel';

function AnimeTriviaGame() {
    return (
        <AnimeTriviaGameProvider>
           <Profiles />
           <QuestionPanel />
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
