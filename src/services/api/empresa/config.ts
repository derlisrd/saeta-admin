import { Empresa } from "@/services/dto/auth/login";
import { BASE } from "../base";
import { EmpresaResponse } from "@/services/dto/config/empresa";
import { Impresora, ImpresoraResponse } from "@/services/dto/config/impresora";
import axios from "axios";

export const apiServiceConfig = {
    updateEmpresa: async(form: Empresa, token : string | null)=>{
        try {
            const { data, status } = await BASE.put('/config/empresa', form, { headers: { Authorization: token } });
            return EmpresaResponse.fromJSON({
                success: data.success,
                status,
                results: data.results,
                message: data.message
            })
        } catch (error) {
            return EmpresaResponse.fromJSON({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
    impresoras: async(token : string | null)=>{
        try {
            const { data, status } = await BASE.get('/impresoras', { headers: { Authorization: token } });
            return ImpresoraResponse.fromJSON({
                success: data.success,
                status,
                results: data.results,
                message: data.message
            })
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return ImpresoraResponse.fromJSON({
                  success: false,
                  results: null,
                  status: e.response?.status || 500,
                  message: e.response?.data.message || 'Error en conexion'
                });
              }
            return ImpresoraResponse.fromJSON({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
    insertarImpresora: async ( token : string | null, form : Impresora)=>{
        try {
            const { data, status } = await BASE.post('/impresoras', form, { headers: { Authorization: token } });
            return ImpresoraResponse.fromJSON({
                success: data.success,
                status,
                results: data.results,
                message: data.message
            })
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return ImpresoraResponse.fromJSON({
                  success: false,
                  results: null,
                  status: e.response?.status || 500,
                  message: e.response?.data.message || 'Error en conexion'
                });
              }
            return ImpresoraResponse.fromJSON({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    }
}