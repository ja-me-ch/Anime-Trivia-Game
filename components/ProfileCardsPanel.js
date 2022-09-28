import React, { useContext, useEffect, useState } from 'react';
import { AnimeTriviaGameContext } from '../contexts/AnimeTriviaGameContext';
import Profile from './Profile';

function ProfileCardsPanel() {
    const { profiles } = useContext(AnimeTriviaGameContext);
    const [profileCards, setProfileCards] = useState([]);

    useEffect(() => {
        setProfileCards(profiles.map((e) => {
            return <Profile props={e} key={e.id}/>
        }));
    }, [profiles]);
    if (profiles.length === 0) return null;
    return (
        <div>
            {profileCards}
        </div>
    )
}

export default ProfileCardsPanel
