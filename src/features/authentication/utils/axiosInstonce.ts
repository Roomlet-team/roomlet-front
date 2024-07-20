import axios from 'axios';

// 반복적으로 사용되는 axios 설정 추상화
export const axiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  });

  return instance;
};
