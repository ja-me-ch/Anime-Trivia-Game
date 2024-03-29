import { ThemeProvider } from '@mui/material';
import React from 'react';
import { AnimeTriviaGameProvider } from '../contexts/AnimeTriviaGameContext';
import AnimeTriviaGame from '../components/AnimeTriviaGame';
import theme from '../helper-functions/theme';

export default function Home(props) {
  return (
    <ThemeProvider theme={theme}>
      <AnimeTriviaGameProvider>
        <AnimeTriviaGame />
      </AnimeTriviaGameProvider>
    </ThemeProvider>
  )
}

