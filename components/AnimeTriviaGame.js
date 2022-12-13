import React from 'react';
import { AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import { QuestionAndAnswerProvider } from '../contexts/QuestionAndAnswerContext';
import Profiles from './Profiles/Profiles';
import Question from './QuestionPanel/Question';
import QuestionPanel from './QuestionPanel/QuestionPanel';

function AnimeTriviaGame() {
    return (
        <AnimeTriviaGameProvider>
            <Profiles />
            <QuestionAndAnswerProvider>
                <QuestionPanel />
            </QuestionAndAnswerProvider>
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
