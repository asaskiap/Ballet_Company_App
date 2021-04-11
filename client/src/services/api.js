import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REST_API_ORIGIN,
    withCredentials: true
});

export default api;