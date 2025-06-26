import { isAxiosError } from "axios";
import { BASE } from "../base";
import { CreditosResponse } from "@/services/dto/pedidos/creditos";

export const apiServiceCreditos = {
    lista: async (token: string | null, desde?: string | null, hasta?: string | null) => {
        try {
          const { data, status } = await BASE.get(`/creditos?desde=${desde}&hasta=${hasta}`, { headers: { Authorization: token } });
          return new CreditosResponse({ success: data.success as boolean, status, results: data.results, message: "" });
        } catch (e) {
          if (isAxiosError(e)) {
            throw new Error(e.response?.data.message || "Error en conexion");
          }
          if (!navigator.onLine) {
            throw new Error("No hay conexión a Internet.");
          }
            throw new Error("Error de servidor intente más tarde o contacte con Atención al cliente.");
        }
      },
  cobrar: async ({ token, forma_pago_id, monto }: { token: string | null; forma_pago_id: number; monto: number }) => {
    try {
      const { data, status } = await BASE.post(`/creditos/cobrar`, { forma_pago_id, monto }, { headers: { Authorization: token } });
      return new CreditosResponse({ success: data.success as boolean, status, results: data.results, message: "" });
    } catch (e) {
      if (isAxiosError(e)) {
        throw new Error(e.response?.data.message || "Error en conexion");
      }
      if (!navigator.onLine) {
        throw new Error("No hay conexión a Internet.");
      }
      throw new Error("Error de servidor intente más tarde o contacte con Atención al cliente.");
    }
  }
}