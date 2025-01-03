import { ImpuestoResponse } from "@/services/dto/factura/impuesto"
import { BASE } from "../base"

export const apiServiceImpuestos = {
    list: async(token : string | null)  =>  {
        try {
            const {data, status} = await BASE.get('/impuestos',{headers: {Authorization : token}})

            return new ImpuestoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new ImpuestoResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
}