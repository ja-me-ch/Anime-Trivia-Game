import { styled, NativeSelect, InputLabel, FormControl, Collapse } from '@mui/material';
import { useContext, useState } from 'react';
import ThemeSelector from '../ThemeSelector';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const RootStyle = styled('div')(({ theme, isToggled }) => ({
    display: 'flex',
    // flexDirection: isToggled ? 'row-reverse' : 'row',
    justifyContent: 'flex-end',
// gridTemplateColumns: '1fr 1fr 1fr',
    // position: 'fixed',
    // bottom: '0',
    // right: '0',
    // minHeight: '60px',
    paddingLeft: '10px',
    width: '100vw',
    // minWidth: '100%',
    // width: isToggled ? '100%' : 'auto',
    // border: '1px solid blue',
    // backgroundColor: theme.palette[theme.palette.theme].primary.light,
    // boxShadow: '5px -5px 25px 5px rgba(0, 0, 0, 0.5)',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // zIndex: '11',
    // transition: 'all 1s ease'
}));

const ThemeSelectorContainer = styled('div')(({ theme, isToggled }) => ({
    width: '100%',
    // position: 'absolute',
    // bottom: '0',
    // right: '0',
    height: '60px',
    // padding: '5px 0px 5px 5px',
    // padding: '10px 0',
    backgroundColor: theme.palette[theme.palette.theme].primary.light,
    // display: isToggled ? 'auto' : 'none'
}));

const ExpandButton = styled('div')(({ theme }) => ({
    // justifySelf: 'flex-end',
    backgroundColor: theme.palette[theme.palette.theme].primary.light,
    height: '60px',
    // position: 'fixed',
    // bottom: '0',
    // right: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '10px',
    // fontSize: '2em'
}))

const BottomBar = function ({ isToggled, setIsToggled }) {
    // const [isToggled, setIsToggled] = useState(true);
    const { selectedTheme, showRightBar } = useContext(AnimeTriviaGameContext);

    const onChangeThemeSelect = function (e) {
        selectedTheme.update(e.target.value);
    }

    const expandButtonStyle = {
        fontSize: '2em',
        cursor: 'pointer'
    }

    const onExpandButtonClick = function (e) {
        setIsToggled((st) => {
            return st ? false : true
        })
    }

    return (
        <RootStyle isToggled={isToggled}>
            <Collapse in={showRightBar} orientation='horizontal'>
                <div style={{
                    width: '100vw',
                    // border: '1px solid yellow'
                }}>
                    <ThemeSelectorContainer isToggled={showRightBar}>
                        <ThemeSelector />
                    </ThemeSelectorContainer>
                </div>
            </Collapse>
            <ExpandButton onClick={(e) => onExpandButtonClick(e)}>
                {showRightBar ? <KeyboardDoubleArrowRightIcon style={expandButtonStyle} /> : <KeyboardDoubleArrowLeftIcon style={expandButtonStyle} />}
            </ExpandButton>
        </RootStyle>
    )
}

export default BottomBar;