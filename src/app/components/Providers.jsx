'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeContextProvider } from '../context/ThemeContext';
import theme from '../theme';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../context/AuthContext';



const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <AuthProvider>
    <ThemeContextProvider >
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeContextProvider>
    </AuthProvider>
  );
}