import React, { useEffect } from 'react'
import { AppBar, Button, Toolbar, Typography, Avatar } from '@mui/material'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import decode from 'jwt-decode'

import useStyles from './styles'
import gal from '../../images/gal.png'

export default function Navbar({ user, setUser }) {
  const classes = useStyles()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })

    navigate('/')
    setUser(null)
  }

  useEffect(() => {
    const token = user ?.token

    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location, setUser, user?.token])

  const googleSuccess = async (response) => {
    const token = await response?.credential
    const result = jwt_decode(token)

    try {
      dispatch({ type: 'AUTH', data: { result, token }})
  
      navigate('/')
    } catch (error) {
        console.log(error)
    }
  }
  
  const googleFailure = (error) => {
    console.log(error)
  }
  
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID} >
      <AppBar sx={{
                  borderRadius: 15,
                  margin: '30px 0',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 50px',
              }} position="static" color="inherit">
          <div className={classes.brandContainer}>
              <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Galleries</Typography>
              <img className={classes.image} src={gal} alt="memories" height="60" />
          </div>
          <Toolbar className={classes.toolbar}>
              {user ? (
                  <div className={classes.profile}>
                      <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                      <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography> 
                      <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                  </div>
              ) : (
                  <GoogleLogin onSuccess={googleSuccess} onFailure={googleFailure}/>
              )}
              
          </Toolbar>
      </AppBar>      
    </GoogleOAuthProvider>

  )
}
