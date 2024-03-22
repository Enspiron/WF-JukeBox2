'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

import * as React from 'react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

var themeMode = "dark"
localStorage.setItem('theme', themeMode);

//addeventlistener for theme change from localstorage
window.addEventListener('storage', () => {
  const themeMode = localStorage.getItem('theme');
  console.log(themeMode);
  theme.palette.mode = themeMode;
});


export function HandleThemeChange(props) {
  
}


const darktheme = createTheme({
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
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default darktheme;
