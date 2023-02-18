import { styled, NativeSelect, InputLabel, FormControl, Collapse, Button, ButtonGroup } from '@mui/material';
import { useContext, useState } from 'react';
import ThemeSelector from '../ThemeSelector';
import { AnimeTriviaGameContext } from '../../contexts/AnimeTriviaGameContext';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useTheme } from '@emotion/react';

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
    // minWidth: '100%',
    // width: isToggled ? '100%' : 'auto',
    // width: '100vw',
    maxWidth: '100vw',
    // border: '1px solid blue',
    backgroundColor: theme.palette[theme.palette.theme].primary.light,
    boxShadow: '5px -5px 25px 5px rgba(0, 0, 0, 0.5)',
    borderRadius: isToggled ? null : '10px 0px 0px 10px',
    // alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: '10',
    // transition: 'all 1s ease'
}));

const ThemeSelectorContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',

    // width: '100%',
    // position: 'absolute',
    // bottom: '0',
    // right: '0',
    height: '60px',
    // padding: '5px 0px 5px 5px',
    padding: '0 0 0 10px',
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
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
    color: theme.palette[theme.palette.theme].primary.contrastText
}));

const ButtonGroupStyle = styled(ButtonGroup)(({ theme }) => ({
    // color: theme.palette[theme.palette.theme].primary.contrastText,
    height: '100%',
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
        borderColor: theme.palette[theme.palette.theme].primary.contrastText
    }
}))

const BottomBar = function () {
    const [isToggled, setIsToggled] = useState(true);
    const { dialog } = useContext(AnimeTriviaGameContext);
    const theme = useTheme();

    const expandButtonStyle = {
        fontSize: '2em',
        cursor: 'pointer'
    }

    const onExpandButtonClick = function (e) {
        setIsToggled((st) => {
            return st ? false : true
        })
    }

    const onButtonClick = function (e) {
        dialog.toggle(e.target.id);
    }

    return (
        <RootStyle isToggled={isToggled}>
            <Collapse in={isToggled} orientation='horizontal'>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100%',
                    // border: '1px solid red',
                }}>
                    <div style={{
                        position: 'absolute',
                        left: '10px',
                        // border: '1px solid yellow',
                        display: isToggled ? 'inline-block' : 'none',
                    }}>
                        <ThemeSelectorContainer>
                            <ThemeSelector />
                        </ThemeSelectorContainer>
                    </div>
                    <div style={{
                        justifySelf: 'center',
                        height: '70%',
                        // right: '50%',
                        // bottom: '50%',
                        // left: '50%',
                        // transform: 'translateX(50%)',
                        display: isToggled ? 'inline-block' : 'none',
                        // border: '1px solid red',
                    }}>
                        <ButtonGroupStyle variant='text' disableElevation>
                            <ButtonStyle id='gettingStarted' onClick={onButtonClick}>Getting Started</ButtonStyle>
                            <ButtonStyle id='about' onClick={onButtonClick}>About</ButtonStyle>
                        </ButtonGroupStyle>
                    </div>
                </div>
            </Collapse>
            <ExpandButton onClick={(e) => onExpandButtonClick(e)}>
                {isToggled ? <KeyboardDoubleArrowRightIcon style={expandButtonStyle} /> : <KeyboardDoubleArrowLeftIcon style={expandButtonStyle} />}
            </ExpandButton>
        </RootStyle>
    )
}

export default BottomBar;