import { createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { AnimeTriviaGameContext } from "../contexts/AnimeTriviaGameContext";

const theme = createTheme({
    palette: {
        mode: 'dark',
        theme: 'dark',
        dark: {
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
        light: {
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
        }
    },
});

export default theme;