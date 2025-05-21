// import axios from 'axios';

// const API_URL = '/api/v2/auth';

// // Register user
// export const register = async (userData) => {
//   const response = await axios.post(`${API_URL}/register`, userData);
//   return response.data;
// };

// // Login user
// export const login = async (userData) => {
//   const response = await axios.post(`${API_URL}/login`, userData);
  
//   if (response.data.token) {
//     localStorage.setItem('token', response.data.token);
//   }
  
//   return response.data;
// };

// // Logout user
// export const logout = () => {
//   localStorage.removeItem('token');
// };

// // Get current token
// export const getToken = () => {
//   return localStorage.getItem('token');
// };

// // Get user profile
// export const getProfile = async () => {
//   const token = getToken();
//   const response = await axios.get(`${API_URL}/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return response.data;
// };

// // Default export with all methods
// const authService = {
//   register,
//   login,
//   logout,
//   getToken,
//   getProfile
// };

// export default authService;