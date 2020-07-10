import axios from 'axios';
import GLOBALS from '../../Globals';

const instance = axios.create({
  baseURL: GLOBALS.BASE_URL,
});
//creamos un interceptor para que siempre que haga un request, envie el access token
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer ' + GLOBALS.ACCESS_TOKEN;
    return config;
  },
  (error) => {
    console.log('entro a error');
    Promise.reject(error);
  },
);

export default instance;
