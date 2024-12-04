import axios from "axios";
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const XAPIKEY = import.meta.env.VITE_X_API_KEY;

const BASE = axios.create({ baseURL: BASE_API_URL + "/api", headers: { 
    'x-api-key': XAPIKEY, 
    Accept: 'application/json', 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
} });

export default BASE;
