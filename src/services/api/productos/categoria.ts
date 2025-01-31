import { CategoriaResponse } from "@/services/dto/productos/categoria"
import { BASE } from "../base"
import { AddCategoriaResponse } from "@/services/dto/productos/AddCategoria";

export const apiServiceCategorias = {
    list: async(token : string | null)=>{
        try {
            const {data, status} = await BASE.get('/categorias',{headers: {Authorization : token}})

           return new CategoriaResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new CategoriaResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    },
    insert : async(token : string | null, nombre : string)=>{
        try {
            const {data, status} = await BASE.post('/categorias',{nombre},{headers: {Authorization : token}})

            return new AddCategoriaResponse({ success : data.success as boolean, status, results: data.results, message: '' });
        } catch (e) {
            return new AddCategoriaResponse({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    }
}