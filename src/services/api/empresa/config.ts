import { Empresa } from "@/services/dto/auth/login";
import { BASE } from "../base";
import { EmpresaResponse } from "@/services/dto/config/empresa";
import { Impresora, ImpresoraResponse } from "@/services/dto/config/impresora";
import axios from "axios";
import { VerificarConfigEmpresaResponse } from "@/services/dto/config/verificarConfigEmpresa";
import { typeConfigForm } from "@/core/types/configForm";

export const apiServiceConfig = {
    configurarPrimeraVez: async(form: typeConfigForm)=>{
        try {
            const { data, status } = await BASE.post("/config",form);
              return new VerificarConfigEmpresaResponse({
                success: data.success,
                status,
                message: "Configurado correctamente",
                results: data.results
              });
          } catch (e) {
            if (axios.isAxiosError(e)) {
              throw new Error(e.response?.data.message || "Error de servidor");
            }
            throw new Error("Error de servidor");
          }
    },
    verificarEmpresa: async()=>{
        try {
          const { data, status } = await BASE.get("/config/verificar");
            return new VerificarConfigEmpresaResponse({
                success: data.success,
                status,
                message: '',
                results: data.results
            });
        } catch (e) {
          if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message || "Error de servidor");
          }
          throw new Error("Error de servidor");
        }
    },
    updateEmpresa: async(form: Empresa, token : string | null)=>{
        try {
            const { data, status } = await BASE.put('/config/empresa', form, { headers: { Authorization: token } });
            return EmpresaResponse.fromJSON({
                success: data.success,
                status,
                results: data.results,
                message: data.message
            })
        } catch (e) {
            if (axios.isAxiosError(e)) {
              throw new Error(e.response?.data.message || "Error de servidor");
            }
            throw new Error("Error de servidor");
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
        }
        catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message || "Error de servidor");
        }
        throw new Error("Error de servidor");
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
                throw new Error(e.response?.data.message || "Error de servidor");
            }
            throw new Error("Error de servidor");
            
        }
    }
}