'use client';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        p: 3
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center'
        }}
      >
        Welcome to My Glimpse 33 Media Feed App Assessment
      </Typography>
      
      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 4,
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        Please login to continue with :
      </Typography>

      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 2,
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        Username : user@example.com
      </Typography>

      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 2,
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        Password : password
      </Typography>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          maxWidth: 400,
          width: '100%',
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ 
            mt: 3,
            py: 1.5,
            bgcolor: 'common.black',
            color: 'common.white',
            '&:hover': {
              bgcolor: 'grey.900',
              transform: 'translateY(-2px)',
              boxShadow: 4
            },
            transition: 'all 0.3s ease'
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </Box>
    </Box>
  );
}