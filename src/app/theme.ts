import { createTheme } from '@mui/material';

// Themed using Upgrade's palette
export const theme = createTheme({
  palette: {
    primary: {
      light: '#60c7a1',
      main: '#00a669',
      dark: '#008051',
    },
    secondary: {
      main: '#3f3d56',
      light: '#6bc1fe',
    },
    success: {
      main: '#03b57a',
      contrastText: '#ffffff',
    },
    error: {
      main: '#c83c4c',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#3f465e',
      secondary: '#008051'
    }
  },
});