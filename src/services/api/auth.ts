import axios from "axios";
import { LoginResponse } from "../dto/login";
import BASE from "./base";

export const apiServiceAuth = {
    login : async( username : string, password : string)=>{
        try {
            const {data,status} = await BASE.post('/login',{
              username,
              password 
            }) 

            return LoginResponse.fromJSON({
                success: data.success,
                results: data.results,
                status,
                message: ''
              });

        } catch (e) {
            if (axios.isAxiosError(e)) {
                return LoginResponse.fromJSON({
                  success: false,
                  results: null,
                  status: e.response?.status || 500,
                  message: e.response?.data.message || 'Error en conexion'
                });
              }
              if (!navigator.onLine) {
                return LoginResponse.fromJSON({
                  success: false,
                  results: null,
                  status: 0, 
                  message: "No hay conexión a Internet.",
                });
              }
              return LoginResponse.fromJSON({
                success: false,
                id: null,
                results: null,
                status: 500,
                message: "Error de servidor intente más tarde o contacte con Atención al cliente."
              });
            }
    }
    
}