import { useContext } from 'react';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';

import styled from '@emotion/styled';
import QuestionPanel from '../QuestionPanel/QuestionPanel';
import Profiles from '../Profiles/Profiles';

const RootStyle = styled('div')(() => ({
    display: 'flex',
    // flex: '1 1 auto',
    width: '100%',
    // minWidth: '100vw',
    height: '100%',
    // maxHeight: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // gridTemplateColumns: '1fr 1fr 1fr',
    // margin: '0 5px 0 5px',
    // display: 'flex',
}));

const LeftSide = styled('div')(() => ({

}));
const CenterSide = styled('div')(() => ({
    width: '100%',
}));
const RightSide = styled('div')(() => ({
    // border: '1px solid yellow',
    position: 'absolute',
    // height: '',
    // left: '0%',
    right: '0',
    zIndex: '100',
    '@media(max-width: 450px)': {
        // left: 'unset',
        right: '0'
    }
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