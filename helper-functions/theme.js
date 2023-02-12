import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#302640',
            light: '#534070',
            dark: '#17131e',
            contrastText: '#ffffff',
        },
        error: {
            main: '#794F4F',
            // light: '',
            // dark: '',
            contrastText: '#ffffff',
        },
        success: {
            main: '#5A895D',
            // light: '',
            // dark: '',
            contrastText: '#ffffff',
        }
    }
});

export default theme;