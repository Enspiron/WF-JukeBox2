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
