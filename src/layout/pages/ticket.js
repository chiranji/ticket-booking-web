import { Divider, Grid } from '@mui/material';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react'
import { useUserDispatch } from '../../context/loginContext'
import { Grid3x3 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Nav from './header'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
function Ticket(){
    var userDispatch = useUserDispatch();
    const logout = (event) =>{
        event.preventDefault()

        localStorage.clear();
        userDispatch({type: 'LOG OUT'});
        window.location.reload();
    }
    return (
    <>

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movies Ticket Booking system
          </Typography>
          <Nav />


          <Typography variant='h5' spacing='6'>
          <Button color='inherit' onClick={logout}>Logout</Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

        </>
    );
}

export default Ticket;