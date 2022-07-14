import React, { useState, useEffect } from 'react'
import { AppBar, Button, Toolbar, Typography, Avatar } from '@mui/material'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

import useStyles from './styles'
import fb from '../../images/fb.png'

export default function Navbar() {
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const client_id = '367587044892-3uo6bio0a34ua95jli4g2viu4tu5jfn8.apps.googleusercontent.com'

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

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location, user?.token,])

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
    console.log('Error')
  }

  return (
    <GoogleOAuthProvider clientId={client_id} >
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
              <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Budget Facebook</Typography>
              <img className={classes.image} src={fb} alt="memories" height="60" />
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
