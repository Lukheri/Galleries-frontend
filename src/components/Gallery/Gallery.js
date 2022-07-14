import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'



export default function Gallery() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const client_id = '367587044892-3uo6bio0a34ua95jli4g2viu4tu5jfn8.apps.googleusercontent.com'

  const dispatch = useDispatch()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })

    // navigate('/')
    setUser(null)
  }

  const googleSuccess = async (response) => {
    const token = await response?.credential
    const result = jwt_decode(token)

    try {
      dispatch({ type: 'AUTH', data: { result, token }})
  
    //   navigate('/')
    } catch (error) {
        console.log(error)
    }
  }
  
  const googleFailure = (error) => {
    console.log(error)
    console.log('Error')
  }

  return (
    <Grow in>
        <Home />
        <Navbar />
    </Grow>
  )
}
