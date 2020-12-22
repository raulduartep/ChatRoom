import axios, { AxiosInstance } from 'axios';

const privateApi = (cb: () => void): AxiosInstance => {
  const api = axios.create({
    baseURL: 'http://localhost:3333',
  })

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('@ChatRoom:token')}`
    return config
  }, (err) => {
    return Promise.reject(err);
  })

  api.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve) => {
      if (err.response && err.response.status === 401) {
        cb()
      }
      
      return Promise.reject(err)
    })
  })

  return api
};

export default privateApi;