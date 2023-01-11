import { useContext } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

import styled from '@emotion/styled';
import QuestionPanel from '../QuestionPanel/QuestionPanel';
import Profiles from '../Profiles/Profiles';

const RootStyle = styled('div')(() => ({
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // gridTemplateColumns: '1fr 1fr 1fr',
    // margin: '0 5px 0 5px',
    // display: 'flex',
}));

const LeftSide = styled('div')(() => ({

}));
const CenterSide = styled('div')(() => ({
    width: '100%'
}));
const RightSide = styled('div')(() => ({
    position: 'absolute',
    // height: '',
    right: '0',
    zIndex: '100'
}));

const CenterBar = function () {
    return (
        <RootStyle>
            <LeftSide>

            </LeftSide>

            <CenterSide>
                <QuestionPanel />
            </CenterSide>

            <RightSide>
                <Profiles />
            </RightSide>
        </RootStyle>
    )
}

export default CenterBar;