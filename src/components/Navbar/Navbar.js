import React from 'react'
import { AppBar, Button, Toolbar, Typography, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'

import useStyles from './styles'
import fb from '../../images/fb.png'

export default function Navbar() {
  const classes = useStyles()

  const user = null

  return (
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
            <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Budget Facebook</Typography>
            <img className={classes.image} src={fb} alt="memories" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography> 
                    <Button variant='contained' className={classes.logout} color='secondary'>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign in</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}
