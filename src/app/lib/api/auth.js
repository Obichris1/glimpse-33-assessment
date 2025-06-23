// Mock authentication service
const mockUsers = [
    { id: 1, email: 'user@example.com', password: 'password', name: 'Demo User' }
  ];
  
  export const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    
    return { 
      user: { id: user.id, email: user.email, name: user.name },
      token: 'mock-jwt-token'
    };
  };
  
  export const logout = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
  };
  
  export const getCurrentUser = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const token = localStorage.getItem('token');
    (token);
    
    if (!token) return null;
    
    // In a real app, you would validate the JWT here
    return mockUsers[0]; // Always return the demo user if token exists
  };