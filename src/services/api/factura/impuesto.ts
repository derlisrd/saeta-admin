import { ImpuestoResponse } from "@/services/dto/factura/impuesto"
import { BASE } from "../base"
import { isAxiosError } from "axios";

export const apiServiceImpuestos = {
    list: async(token : string | null)  =>  {
        try {
            const {data, status} = await BASE.get('/impuestos',{headers: {Authorization : token}})

            return new ImpuestoResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            if(isAxiosError(e)){
                throw new Error(e.response?.data.message || "Error al obtener los impuestos");
            }
            throw new Error("Error al obtener los impuestos");
        }
    },
}