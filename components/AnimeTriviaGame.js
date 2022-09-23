import React from 'react';
import { AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import Profile from './Profile';

function AnimeTriviaGame() {
    return (
        <AnimeTriviaGameProvider>
            <Profile name={'melody'} />
            <Profile name={'melody'} />
            <Profile name={'sterben'} />
            <Profile name={'???'} />
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame