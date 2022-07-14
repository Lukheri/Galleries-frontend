import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { gapi } from 'gapi-script'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

export default function App() {

  return (
    <BrowserRouter>
      <Container maxwidth='lg'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>    
    </BrowserRouter>


  )
}
