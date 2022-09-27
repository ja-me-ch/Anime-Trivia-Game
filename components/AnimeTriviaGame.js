import React from 'react';
import { AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import Profile from './Profile';

function AnimeTriviaGame() {
    return (
        <AnimeTriviaGameProvider>
            <Profile name={'melody'} />
            <Profile name={'sterben'} />
            {/* <Profile name={'burgerdynasty'} /> */}
            {/* <Profile name={'rediscover'} /> */}
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
