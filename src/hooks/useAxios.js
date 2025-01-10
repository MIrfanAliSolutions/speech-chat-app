import axios from 'axios';

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    Headers: {
      'Content-Type': 'application/json',
    },
  });

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

  return { axiosInstance };
};

export default useAxios;
