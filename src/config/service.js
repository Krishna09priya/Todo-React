import axios from 'axios';
import API_ROUTE from './serviceConstants';
import Notifications from '../utils/notifications';

const reset = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = '/login';
};

const apiGateway = axios.create({
  baseURL: API_ROUTE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

apiGateway.interceptors.response.use(
  (response) => response,
  
  ({ response }) => {
    if (response?.status === 400) {

     Notifications(response?.data?.message, 'error');
      return response;
    }
    if (response?.status=== 401) {
      reset();
    }
  }
);

apiGateway.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  const param = config;
  if (token) {
    param.headers = { ...config.headers, Authorization: `Bearer ${token}`};
  }
  return param;
});
export default apiGateway;