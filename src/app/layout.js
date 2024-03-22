// "use client";
import { Inter } from "next/font/google";
// import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import darktheme from '../darktheme';

import React from 'react';
import { HandleThemeChange } from "../theme";

import Navbar from "./Components/Navbar";

import Character from '../Character.js'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WF Jukebox",
  description: "Generated by create next app",
};

//when localstorage changes for "theme" key, this event listener will be called

function CheckTheme() {
  return darktheme
}



export default function RootLayout(props) {
 
  

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      {/* <Main/> */}
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={CheckTheme()}>
            <CssBaseline />
            <Navbar />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}