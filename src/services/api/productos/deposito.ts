import axios from "axios";
import { BASE } from "../base"
import { DepositoActivoResponse, DepositoResponse } from "@/services/dto/productos/deposito";

export const apiServiceDepositos = {
    list: async(token : string | null)=>{
        try {
            const {data, status} = await BASE.get('/depositos',{headers: {Authorization : token}})

           return new DepositoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            if(axios.isAxiosError(e)){
                throw new Error(e.response?.data.message || "Error al obtener depositos");
            }
            throw new Error("Error al consultar los depositos");
        }
    },
    activo: async(token : string | null)=>{
        try {
            const {data, status} = await BASE.get('/depositos/activo',{headers: {Authorization : token}})

           return new DepositoActivoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            if(axios.isAxiosError(e)){
                throw new Error(e.response?.data.message || "Error al obtener depositos");
            }
            throw new Error("Error al consultar los depositos");
        }
    },
    activar: async(token : string | null, id: number)=>{
        try {
            const {data, status} = await BASE.post('/depositos/activar',{id},{headers: {Authorization : token}})

           return new DepositoActivoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            if(axios.isAxiosError(e)){
                throw new Error(e.response?.data.message || "Error al obtener depositos");
            }
            throw new Error("Error al consultar los depositos");
        }
    },

}