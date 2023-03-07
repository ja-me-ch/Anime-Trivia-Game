import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: 'dark',
        theme: 'purple',
        purple: {
            primary: {
                main: '#482E73',
                light: '#7047B3',
                dark: '#180F26',
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
        },
        blue: {
            primary: {
                main: '#3C5375',
                light: '#5C80B5',
                dark: '#151D29',
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
        },
        jade: {
            primary: {
                main: '#218576',
                light: '#289E8C',
                dark: '#11423B',
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
        },
    },
});

export default theme;