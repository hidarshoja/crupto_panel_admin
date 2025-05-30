import axios from "axios";



const axiosClient2 = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL2}/`
})

axiosClient2.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient2.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    // window.location.href= '/auth/login';
  } else if (response.status === 404) {
    //Show not found
  }else if (response.status === 403) {
    localStorage.removeItem('ACCESS_TOKEN')
    // window.location.href= '/auth/login';
  }

  throw error;
})





export default axiosClient2