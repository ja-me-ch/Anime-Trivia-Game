import React from 'react';
import { AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import AddProfile from './Profiles/AddProfile';
import ProfileCardsPanel from './Profiles/ProfileCardsPanel';

function AnimeTriviaGame() {
    return (
        <AnimeTriviaGameProvider>
            <AddProfile />
            <ProfileCardsPanel />
        </AnimeTriviaGameProvider>
    )
}

export default AnimeTriviaGame
