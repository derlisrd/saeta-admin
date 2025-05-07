import axios from "axios";
import { BASE } from "../base";

export const apiServiceSucursales = {
    list: async (token: string | null) => {
        try {
            const { data, status } = await BASE.get("/sucursales", { headers: { Authorization: token } });
            return ({ success: data.success as boolean, status, results: data.results, message: "" });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return {
                    success: false,
                    results: null,
                    status: e.response?.status || 500,
                    message: e.response?.data.message || "Error en conexion"
                };
            }
            if (!navigator.onLine) {
                return {
                    success: false,
                    results: null,
                    status: 0,
                    message: "No hay conexión a Internet."
                };
            }
            return {
                success: false,
                results: null,
                status: 500,
                message: "Error de servidor intente más tarde o contacte con Atención al cliente."
            };
        }
    },
}