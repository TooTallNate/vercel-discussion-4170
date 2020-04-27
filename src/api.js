import axios from 'axios';

export const bujoy = axios.create({
  baseURL: process.env.REACT_APP_API_URL_PREFIX || '',
  headers: {
    Authorization: '',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
