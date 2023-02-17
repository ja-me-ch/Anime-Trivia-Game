import { styled, NativeSelect, InputLabel, FormControl, Collapse } from '@mui/material';
import { useContext } from 'react';
import { AnimeTriviaGameContext } from '../contexts/AnimeTriviaGameContext';

const ThemeSelector = function () {
    const {selectedTheme} = useContext(AnimeTriviaGameContext)

    return <FormControl sx={{
    }}>
        <InputLabel variant="standard" htmlFor='themeSelect'>
            Theme
        </InputLabel>
        <NativeSelect
            defaultValue={'purple'}
            inputProps={{
                name: 'theme',
                id: 'themeSelect',
            }}
            onChange={(e) => {
                selectedTheme.update(e.target.value);
            }}
        >
            <option value={'purple'}>Purple</option>
            <option value={'blue'}>Blue</option>
            <option value={'jade'}>Jade</option>
        </NativeSelect>
    </FormControl>
}

export default ThemeSelector;