import axios from 'axios';

const http = axios.create({
    baseURL: 'https://demo.eldor.kz',
    withCredentials: true,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/json',
    },
});

export default http;