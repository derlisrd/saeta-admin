import { MonedaResponse } from "@/services/dto/factura/moneda";
import { BASE } from "../base"


export const apiServiceMonedas = {
    list: async(token : string | null)  =>  {
        try {
            const {data, status} = await BASE.get('/monedas',{headers: {Authorization : token}})
            return new MonedaResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new MonedaResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
}