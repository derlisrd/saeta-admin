import { BASE } from "../base"
import { FormasPagoResponse } from "@/services/dto/factura/formaspago";

export const apiServiceFormasPago = {
    list: async(token : string | null)  =>  {
        try {
            const {data, status} = await BASE.get('/formas-pago',{headers: {Authorization : token}})
            return new FormasPagoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new FormasPagoResponse({ success : false, status : 500, results: [], message: 'Error de servidor'});
        }
    },
}