
import { AddProducto } from "@/services/dto/productos/producto";
import { BASE } from "../base";




export const apiServiceProductos = {
    list: async(token : string | null)=>{
        try {
            const {data, status} = await BASE.get('/productos',{headers: {Authorization : token}})

            return {
                success : data.success as boolean,
                status,
                results: data.results
            }
        } catch (e) {
            return {
                success : false,
                status : 500
            }
        }
    },
    edit: ()=>{
        try {
        
        } catch (e) {
            
        }
    },
    delete: ()=>{
        try {
        
        } catch (e) {
            
        }
    },
    add: async(form : AddProducto, token : string | null)=>{
        try {
            const { data, status } = await BASE.post('/productos', form, { headers: { Authorization: token } });
            return {
                success: data.success as boolean,
                status,
                results: data.results,
                message: data.message
            };
        } catch (e) {
            return {
                success: false,
                status: 500,
                results: null,
                message : 'Error al agregar el producto'
            };
        }
    },
}
