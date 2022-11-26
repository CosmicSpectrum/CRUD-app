import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RequestsGate from '../../network/requests.network';
import { useMainContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function Login() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const {setUserInfo} = useMainContext();
  const Navigate = useNavigate();

  const validateNotEmpty = (data)=>{
    let vaild = true;
    if(data.get('password').length === 0){
        setPasswordError(true)
        vaild = false;
    }if(data.get('emailAddress').length === 0){
        setEmailError(true);
        vaild = false;
    }

    return vaild
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    const data = new FormData(event.currentTarget);
    if(validateNotEmpty(data)){
        RequestsGate.login({emailAddress: data.get('emailAddress'), password: data.get('password')})
        .then(userInfo=>{
            setUserInfo(userInfo);
            Navigate('/crud')
        }).catch(err=>{
            switch(err.response.status){
                case 400:
                    setEmailError(true);
                    break;
                case 401:
                    setPasswordError(true);
                    break;
                case 404:
                    setEmailError(true);
            }
        })
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="emailAddress"
              label="Email Address"
              name="emailAddress"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError && 'Invalid email address'}
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
              error={passwordError}
              helperText={passwordError && 'Invalid password'}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}