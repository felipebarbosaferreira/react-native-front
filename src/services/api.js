import axios from 'axios';

const baseURL = 'http://10.0.2.2:3333';

const api = axios.create({
    baseURL
});

export default api;