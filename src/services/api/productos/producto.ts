
import { AddProducto, AddProductoResponse } from "@/services/dto/productos/AddProducto";
import { BASE } from "../base";
import { ProductoResponse } from "@/services/dto/productos/producto";




export const apiServiceProductos = {
    verificarCodigoDisponible: async (codigo: string, token: string | null): Promise<boolean> => {
        try {
            const { data } = await BASE.get(`/productos/verificar/${codigo}`, { headers: { Authorization: token } });
            return data.success;
        } catch (e) {
            return false;
        }
    },
    list: async(token : string | null) : Promise<ProductoResponse> => {
        try {
            const {data, status} = await BASE.get('/productos',{headers: {Authorization : token}})
            return ProductoResponse.fromJSON({
                success: data.success,
                status,
                results: data.results,
                message: ''
            })
           
        } catch (e) {
            return ProductoResponse.fromJSON({
                success: false,
                status: 500,
                results: null,
                message: 'Error al obtener productos'
            })
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
    add: async(form : AddProducto, token : string | null) : Promise<AddProductoResponse> =>{
        try {
            const { data, status } = await BASE.post('/productos', form, { headers: { Authorization: token } });
            return AddProductoResponse.fromJSON({
                success: data.success,
                status,
                results: data.results,
                message: data.message
            })
        } catch (e) {
            return AddProductoResponse.fromJSON({
                success: false,
                status: 500,
                results: null,
                message: 'Error al crear producto'
            })
        }
    },
}
