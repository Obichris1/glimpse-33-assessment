'use client';
import { useTheme } from '../context/ThemeContext';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
      <IconButton onClick={toggleTheme} color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}