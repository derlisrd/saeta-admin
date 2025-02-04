import { SearchClienteResponse } from "@/services/dto/clientes/search";
import { BASE } from "../base"
import { PorDocumentoResponse } from "@/services/dto/clientes/pordocumento";

export const apiServiceClientes = {
    search: async(token : string | null, q : string)  =>  {
        try {
            const {data, status} = await BASE.get('/clientes/search?q='+q,{headers: {Authorization : token}})
            return new SearchClienteResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new SearchClienteResponse({ success : false, status : 500, results: [], message: 'Error de servidor'});
        }
    },
    registro: async() => {

    },
    porDocumento: async(token : string | null, documento : string) => {
        try {
            
            const {data, status} = await BASE.get('/clientes/documento/'+documento,{headers: {Authorization : token}})
            return new PorDocumentoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new PorDocumentoResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    }
}