// src/hooks/useAxios.js
import axios from 'axios';
import { useCallback } from 'react';

const useAxios = () => {
  // Create instance
  const axiosInstance = axios.create({
    baseURL: 'https://your-api-url.com', // Replace with your base URL
    timeout: 10000,
  });

  // Optional: Add interceptors
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors globally
      if (error.response) {
        // Server responded with a status out of 2xx
        console.error('Error Response:', error.response);
      } else if (error.request) {
        // Request was made but no response
        console.error('No response from server:', error.request);
      } else {
        // Something else triggered an error
        console.error('Error', error.message);
      }
      return Promise.reject(error);
    }
  );

  // Example: a method that calls a route using axios
  const getData = useCallback(
    async (endpoint) => {
      try {
        const { data } = await axiosInstance.get(endpoint);
        return data;
      } catch (err) {
        // Rethrow or handle
        throw err;
      }
    },
    [axiosInstance]
  );

  // Return any method you need
  return { getData, axiosInstance };
};

export default useAxios;
