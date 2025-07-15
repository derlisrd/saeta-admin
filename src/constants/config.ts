


const CONFIG_LOCAL_STORAGE = "configEmpresa";
//const APP_PRODUCTION = (import.meta.env.VITE_APP_PRODUCTION  === 'true') as boolean;
//const API_URL = APP_PRODUCTION ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_BASE_DEV_URL;

const api_local = import.meta.env.VITE_API_BASE_DEV_URL

const isLocal = window.location.hostname === 'localhost';


export const API_URL = isLocal? `${api_local}/api` : `${window.location.protocol}//${window.location.hostname}/api`;


export const config = {
    BASE_PATH: import.meta.env.VITE_BASE_PATH,
    BASE_API_URL: API_URL,
    X_API_KEY: import.meta.env.VITE_X_API_KEY,
    CONFIG_LOCAL_STORAGE
}