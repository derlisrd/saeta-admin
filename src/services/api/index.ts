import { apiServiceAuth } from "./auth/auth";
import { apiServiceProductos } from "./productos/producto";

const API = {
    auth : apiServiceAuth,
    productos: apiServiceProductos 
}

export default API