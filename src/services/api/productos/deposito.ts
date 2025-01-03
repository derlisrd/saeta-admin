import { BASE } from "../base"
import { DepositoResponse } from "@/services/dto/productos/deposito";

export const apiServiceDepositos = {
    list: async(token : string | null)=>{
        try {
            const {data, status} = await BASE.get('/depositos',{headers: {Authorization : token}})

           return new DepositoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new DepositoResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
}