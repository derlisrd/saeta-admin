import { ConsultarStockResponse } from "@/services/dto/productos/ConsultarStock";
import { BASE } from "../base";

export const apiServiceStock = {
    consultarStock: async (token: string | null, deposito: number, producto: number): Promise<ConsultarStockResponse> => {
        try {
            const { data, status } = await BASE.get(`/stock/consultar?deposito_id=${deposito}&producto_id=${producto}`, { headers: { Authorization: token } });
            return ConsultarStockResponse.fromJSON({
                success: data.success,
                status,
                results: data.results,
                message: ""
            });
        } catch (e) {
            return ConsultarStockResponse.fromJSON({
                success: false,
                status: 500,
                results: null,
                message: "Error al obtener productos"
            });
        }
    },
    corregiRoReponer: async (token: string | null, deposito: number, producto: number, cantidad: number) => {
        try {
            const { data, status } = await BASE.put(`/stock/corregir`, { deposito_id: deposito, producto_id: producto, cantidad }, { headers: { Authorization: token } });
            return {
                success: data.success,
                status,
                message: data.message
            }
        } catch (e) {
            return {
                success: false,
                status: 500,
                message: "Error al agregar stock"
            }
        }
    }
}