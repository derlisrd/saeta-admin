import { SearchClienteResponse } from "@/services/dto/clientes/search";
import { BASE } from "../base"
import { PorDocumentoResponse } from "@/services/dto/clientes/pordocumento";
import { RegistroCliente, RegistroClienteResponse } from "@/services/dto/clientes/registro";
import axios from "axios";
import { ClientesResponse } from "@/services/dto/clientes/clientes";
import { AddCliente } from "@/services/dto/clientes/AddCliente";
import { AddClienteRensponse } from "@/services/dto/clientes/AddClienteResponse";

export const apiServiceClientes = {
    search: async(token : string | null, q : string)  =>  {
        try {
            const {data, status} = await BASE.get('/clientes/search?q='+q,{headers: {Authorization : token}})
            return new SearchClienteResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new SearchClienteResponse({ success : false, status : 500, results: [], message: 'Error de servidor'});
        }
    },
    registro: async(token : string | null, form : RegistroCliente) => {
        try {
            const {data, status} = await BASE.post('/clientes',form,{headers: {Authorization : token}})
            return new RegistroClienteResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return new RegistroClienteResponse({
                  success: false,
                  results: null,
                  status: e.response?.status || 500,
                  message: e.response?.data.message || 'Error en conexion'
                });
              }
              if (!navigator.onLine) {
                new RegistroClienteResponse({ success : false, status : 500, results: null, message: 'Error de conexion'});
              }
            return new RegistroClienteResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
    porDocumento: async(token : string | null, documento : string) => {
        try {
            
            const {data, status} = await BASE.get('/clientes/documento/'+documento,{headers: {Authorization : token}})
            return new PorDocumentoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new PorDocumentoResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
    list: async(token: string | null) => {
        try {
            const {data, status} = await BASE.get('/clientes',{headers: {Authorization : token}})
            return new ClientesResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new ClientesResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
    create: async(token : string | null, form : AddCliente) => {
        try {
            const {data, status} = await BASE.post('/clientes',form,{headers: {Authorization : token}})
            return new AddClienteRensponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return new AddClienteRensponse({
                  success: false,
                  results: null,
                  status: e.response?.status || 500,
                  message: e.response?.data.message || 'Error en conexion'
                });
              }
              if (!navigator.onLine) {
                new AddClienteRensponse({ success : false, status : 500, results: null, message: 'Error de conexion'});
              }
            return new AddClienteRensponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
}