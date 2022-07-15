import React, { useState } from 'react'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Gallery from './components/Gallery/Gallery'

export default function App() {
  const [mode, setMode] = useState('dark')

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const changeMode = () => {
    if(mode === 'dark'){
      setMode('light')
    } else if (mode === 'light'){
      setMode('dark')
    }
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <IconButton sx={{ ml: 1 }} onClick={changeMode} color="inherit">
          {mode === 'dark'? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Container maxwidth='lg'>
          <Routes>
            <Route path='/' exact element={<Gallery />} />
          </Routes>
        </Container>         
      </ThemeProvider>
    </BrowserRouter>
  )
}
