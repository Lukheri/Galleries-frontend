import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { gapi } from 'gapi-script'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

export default function App() {

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential)
    const userObject = jwt_decode(response.credential)
    console.log(userObject)
  }
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '367587044892-3uo6bio0a34ua95jli4g2viu4tu5jfn8.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )

  }, [])

  return (
    <BrowserRouter>
      <Container maxwidth='lg'>
        <Navbar />
        {/* <div id='signInDiv'></div> */}
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>    
    </BrowserRouter>

  )
}
