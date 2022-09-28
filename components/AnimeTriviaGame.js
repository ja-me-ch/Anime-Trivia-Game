import React from 'react';
import { AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import AddProfile from './AddProfile';
import ProfileCardsPanel from './ProfileCardsPanel';

function AnimeTriviaGame() {
    return (
        <AnimeTriviaGameProvider>
            <AddProfile />
            <ProfileCardsPanel />
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
