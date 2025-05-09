import axios from "axios";
import { BASE } from "../base"
import { FormasPagoAdd, FormasPagoAddResponse, FormasPagoResponse } from "@/services/dto/config/formaspago";

export const apiServiceFormasPago = {
    list: async(token : string | null)  =>  {
        try {
            const {data, status} = await BASE.get('/formas-pago',{headers: {Authorization : token}})
            return new FormasPagoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            if(axios.isAxiosError(e)){
                return new FormasPagoResponse({ success : false, status : 500, results: [], message: e.response?.data.message})
            }
            return new FormasPagoResponse({ success : false, status : 500, results: [], message: 'Error de servidor'});
        }
    },
    add: async(token: string | null, form: FormasPagoAdd)=>{
        try {
            const {data, status} = await BASE.post('/formas-pago',form,{headers: {Authorization : token}})
            return new FormasPagoAddResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            if(axios.isAxiosError(e)){
                return new FormasPagoAddResponse({ success : false, status : 500, results: null, message: e.response?.data.message})
            }
            return new FormasPagoAddResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        } 
    }
}