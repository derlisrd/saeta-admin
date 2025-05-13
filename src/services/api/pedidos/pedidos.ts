import { AddPedido, AddPedidoResponse } from "@/services/dto/pedidos/AddPedido";
import { BASE } from "../base";
import axios from "axios";

export const apiServicePedidos = {
  insert: async (token: string | null, pedido: AddPedido) => {
    try {
      const { data, status } = await BASE.post("/pedidos", pedido, { headers: { Authorization: token } });
      return new AddPedidoResponse({ success: data.success as boolean, status, results: data.results, message: "" });
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        return new AddPedidoResponse({
          success: false,
          results: null,
          status: e.response?.status || 500,
          message: e.response?.data.message || "Error en conexion"
        });
      }
      if (!navigator.onLine) {
        return new AddPedidoResponse({
          success: false,
          results: null,
          status: 0,
          message: "No hay conexión a Internet."
        });
      }
      return new AddPedidoResponse({
        success: false,
        results: null,
        status: 500,
        message: "Error de servidor intente más tarde o contacte con Atención al cliente."
      });
    }
  },
  lista: async (token: string | null, desde?: string | null, hasta?: string | null) => {
    try {
      const { data, status } = await BASE.get(`/pedidos?desde=${desde}&hasta=${hasta}`, { headers: { Authorization: token } });
      return ({ success: data.success as boolean, status, results: data.results, message: "" });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return ({
          success: false,
          results: null,
          status: e.response?.status || 500,
          message: e.response?.data.message || "Error en conexion"
        });
      }
      if (!navigator.onLine) {
        return ({
          success: false,
          results: null,
          status: 0,
          message: "No hay conexión a Internet."
        });
      }
      return ({
        success: false,
        results: null,
        status: 500,
        message: "Error de servidor intente más tarde o contacte con Atención al cliente."
      });
    }
  }
}
