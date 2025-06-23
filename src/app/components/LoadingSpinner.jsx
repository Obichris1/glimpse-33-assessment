'use client';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      py: 4,
      width: '100%'
    }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingSpinner;