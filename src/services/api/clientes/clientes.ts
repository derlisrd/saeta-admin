import { SearchClienteResponse } from "@/services/dto/clientes/search";
import { BASE } from "../base"

export const apiServiceClientes = {
    search: async(token : string | null, q : string)  =>  {
        try {
            const {data, status} = await BASE.get('/clientes/search?q='+q,{headers: {Authorization : token}})
            return new SearchClienteResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new SearchClienteResponse({ success : false, status : 500, results: [], message: 'Error de servidor'});
        }
    },
}