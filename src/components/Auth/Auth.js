import React, { useState, useEffect } from 'react'
import { Button, Typography, Avatar, Paper, Grid, Container } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import useStyles from './styles'
import Input from './Input'

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCallbackResponse = async (response) => {
    const token = await response?.credential
    const result = jwt_decode(token)
    console.log(result)

    try {
        dispatch({ type: 'AUTH', data: { result, token }})
    
    } catch (error) {
        console.log(error)
    }
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

  const handleShowPassword = () => setShowPassword(prev => !prev)

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const switchMode = () => {
    setIsSignup(prev => !prev)
    setShowPassword(false)
  }

  const googleSuccess = async (response) => {
    const token = await response?.credential
    const result = jwt_decode(token)
    console.log(result)
  }
  const googleFailure = (error) => {
    console.log(error)
    console.log('Error')
  }

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                        <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autofocus half />
                            <Input name='lasttName' label='Last Name' handleChange={handleChange} half />  
                        </>
                    )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />     
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>     
                    { isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' sx={{'marginTop': 2}}>
                    { isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                {/* <Button id='signInDiv' fullWidth variant='outlined' color='primary' sx={{'marginTop': 2, 'marginBottom': 2}}></Button> */}
                {/* <GoogleLogin /> */}

                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    </Container>
  )
}
