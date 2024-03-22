"use client"
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
export default function DarkMode() {
  const theme = useTheme();
  const [mode, setMode] = React.useState(theme.palette.mode);


  const toggleDarkMode = () => {
    const newPaletteType = mode === 'light' ? 'dark' : 'light';
  
    console.log(newPaletteType);
    setMode(newPaletteType);
    localStorage.setItem('theme', newPaletteType);
  };

  const appliedTheme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={toggleDarkMode} color="inherit"
        
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}