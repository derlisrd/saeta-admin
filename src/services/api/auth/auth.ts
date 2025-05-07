import axios from "axios";
import { LoginResponse } from "../../dto/auth/login";
import {BASE} from "../base";
import { RefreshTokenResponse } from "@/services/dto/auth/refresh";

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
    },
    check: async (token: string | null) => {
      try {
        const { data } = await BASE.get("/check", {headers: {Authorization: token}})
        return data.success as boolean
      } catch (error) {
        return false
      }
    },
    refreshToken: async (token : string | null)=>{
      try {
        const {data, status} = await BASE.get('/refresh-token',{headers: {Authorization: token}})
        return new RefreshTokenResponse({
          success: data.success,
          results: data.results,
          status,
          message: ''
        });
      } catch (error) {
        if(axios.isAxiosError(error)){
          return new RefreshTokenResponse( {
            success : false,
            results : null,
            status : error.response?.status || 500,
            message : error.response?.data.message || 'Error en conexion'
          })
        }
        if(!navigator.onLine){
          return new RefreshTokenResponse({
            success : false,
            results : null,
            status : 400,
            message : 'No hay conexión a internet'
          })
        }
        return new RefreshTokenResponse ({
          success : false,
          results : null,
          status : 500,
          message : 'Error de servidor intente más tarde o contacte con Atención al cliente'
        })
      }
    }
}