'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const themeMode = "dark";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// localStorage.setItem('theme', themeMode);

//addeventlistener for theme change from localstorage
// window.addEventListener('storage', () => {
//   const themeMode = localStorage.getItem('theme');
//   theme.palette.mode = themeMode;
// });


const theme = createTheme({
  palette: {
    mode: themeMode,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#00b377',
          }),
        }),
      },
    },
  },
});

export default theme;
