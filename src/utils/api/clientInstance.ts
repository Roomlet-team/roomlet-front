import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosInstance from './axiosInstance';

const setInterceptors = (instance: AxiosInstance) => {
  // 요청 인터셉트
  instance.interceptors.request.use(
    async (config) => {
      const result = await axios.get('/api/auth');
      const token = result.headers.authorization;

      // Authorization에 access token 저장
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.log('Request interceptor > error', error);
      Promise.reject(error);
    }
  );

  // 응답 인터셉트
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Response interceptor > error', error);
      return Promise.reject(error);
    }
  );
};

// axios 요청 및 응답 전에 인터셉트 과정을 거치도록 함.
// 특히, 요청 과정에서 access token을 authorization에 저장하여 서버에 요청하도록 함.
const clientInstance = () => {
  setInterceptors(axiosInstance);

  return axiosInstance;
};

export default clientInstance();
