// import axios from 'axios';

// const API_URL = '/api/v2/users';

// // Get all guides
// export const getGuides = async (params = {}) => {
//   const response = await axios.get(API_URL, { params });
//   return response.data;
// };

// // Get single guide
// export const getGuide = async (guideId) => {
//   const response = await axios.get(`${API_URL}/${guideId}`);
//   return response.data;
// };

// // Get current guide profile
// export const getMyProfile = async (token) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     };
    
//     const response = await axios.get(`${API_URL}/me`, config);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching guide profile:', error.response?.data || error.message);
//     throw error;
//   }
// };

// // Create or update guide profile
// export const updateProfile = async (profileData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   };
  
//   const response = await axios.put(`${API_URL}/me`, profileData, config);
//   return response.data;
// };

// // Upload image
// export const uploadImage = async (file, token) => {
//   const formData = new FormData();
//   formData.append('file', file);
  
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data'
//     }
//   };
  
//   const response = await axios.post('/api/v2/upload', formData, config);
//   return response.data;
// };

// // Delete guide profile
// export const deleteProfile = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
  
//   const response = await axios.delete(`${API_URL}/me`, config);
//   return response.data;
// };

// // Add review to guide
// export const addReview = async (guideId, reviewData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
  
//   const response = await axios.post(`${API_URL}/${guideId}/reviews`, reviewData, config);
//   return response.data;
// };