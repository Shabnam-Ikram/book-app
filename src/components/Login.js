import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); // Initialize dispatch function
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: username,
        password: password,
      });

      console.log('Login successful:', response.data);
      localStorage.setItem('authToken', response.data.token);


      // Dispatch the login action with user details
      dispatch(login({ authToken: response.data.token }));

      // Redirect to the home page after successful login
      navigate('/');
    } catch (error) {
      alert('try with correct Username and Password', error);
      // Handle login error, such as displaying an error message to the user
      setUsername = '';
      setPassword = '';
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 10,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box sx={{ width: '300px', marginBottom: '20px' }}>
        <TextField
          required
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box sx={{ width: '300px', marginBottom: '20px' }}>
        <TextField
          required
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary" sx={{ width: '300px' }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
