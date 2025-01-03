import { MedidasResponse } from "@/services/dto/productos/medidas";
import { BASE } from "../base"

export const apiServiceMedidas = {
    list: async(token : string | null)=>{
        try {
            const {data, status} = await BASE.get('/medidas',{headers: {Authorization : token}})

           return new MedidasResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new MedidasResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
}