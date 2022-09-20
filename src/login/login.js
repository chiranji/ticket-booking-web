import React, { useState, useEffect } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios'

import { useUserDispatch } from '../context/loginContext';

const Login = ()=>{

  var userDispatch = useUserDispatch();

  const [Username, setUsername] = useState('')
  const [Pass, setPass] = useState('')
  const [userData, setUserData] = useState();
  const [isSignup, setSignup] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const theme = createTheme();

  const [formValues, setformValues] = useState({
    phone: '',
    name: '',
    password: '',
  })
  const [formErrors, setformErrors] = useState({})

    const HandleInputsFields = (name, value) => {
      setformValues((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    const handleSignup = (event) => {
      event.preventDefault();
      setformErrors(validate(formValues));
      setIsSubmit(true);
      // const data = new FormData(event.currentTarget);
      //   axios.post('http://localhost:4500/signup',formValues).then((resp)=>{
      //     console.log(resp);
      // })
    }

      const handleLogin = async (e) =>{
            e.preventDefault()
        await axios.post('http://localhost:4500/login', {username: Username, password: Pass}).then((resp)=>{
          //console.log(resp.data);
          setUserData(resp.data);
          localStorage.setItem("email",userData.username);
          userDispatch({type: "LOGIN_SUCCESS"});
           
        });

      }

    const validate = (values) => {
      let errors = {};
      
      var valname = values.name;
      const validName = new RegExp('^(?=.*?[A-Za-z]).{2,}$');
      if(!validName.test(valname)){
        errors.name = "Name is Required [min 2 Letters] !";
      }

      var valphone = values.phone;
      const validPhone = new RegExp('^(?=.*?[0-9]).{10}$');
      if(!validPhone.test(valphone)){
        errors.phone = "Enter Valid 10 Digit Mobile no !";
      }

      var validpass = values.password;
      const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
      if (!validPassword.test(validpass)) {
           errors.password = "Enter valid password min 6 charecters with combination of [letere,digit,symboles]";
      }
  
      return errors;
    };
  
    useEffect(() => {
      if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
      }
    }, [formErrors]);

    return(

        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {!isSignup &&
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e)=>setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPass(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" onClick={()=>setSignup(!isSignup)} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          }
          {isSignup &&
            <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    autoComplete="given-phone"
                    name="phone"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    autoFocus
                    onChange={(e)=>HandleInputsFields('phone',e.target.value)}
                    helperText={formErrors.phone}
                  />
                </Grid>
              
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="name"
                    onChange={(e)=>HandleInputsFields('name', e.target.value)}
                    helperText={formErrors.name}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e)=>HandleInputsFields('password', e.target.value)}
                    helperText={formErrors.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" onClick={()=>setSignup(!isSignup)}variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          }
        </Container>
      </ThemeProvider>
    );
}

export default Login