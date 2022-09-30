import React, { useContext, useEffect, useState } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import ProfileCard from './ProfileCard';

function ProfileCardsPanel() {
    const { profiles } = useContext(AnimeTriviaGameContext);
    const [profileCards, setProfileCards] = useState([]);

    useEffect(() => {
        setProfileCards(profiles.map((e) => {
            return <ProfileCard props={e} key={e.id}/>
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
