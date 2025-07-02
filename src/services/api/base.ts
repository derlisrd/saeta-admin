import { config } from "@/constants/config";
import axios from "axios";

const { BASE_API_URL, X_API_KEY } = config;

export const BASE = axios.create({ baseURL: BASE_API_URL , headers: { 
    'x-api-key': X_API_KEY, 
    Accept: 'application/json'
} });



