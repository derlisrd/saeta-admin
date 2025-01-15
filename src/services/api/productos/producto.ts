import { AddProducto, AddProductoResponse } from "@/services/dto/productos/AddProducto";
import { BASE } from "../base";
import { ProductoResponse } from "@/services/dto/productos/producto";
import { ConsultarPorDepositoResponse } from "@/services/dto/productos/consulta";
import axios from 'axios'

export const apiServiceProductos = {
  consultarCodigoPorDeposito: async (token: string | null, codigo: string, deposito_id: number): Promise<ConsultarPorDepositoResponse> => {
    try {
      const { data, status } = await BASE.get(`/productos/consultar-por-deposito?codigo=${codigo}&deposito_id=${deposito_id}`, { headers: { Authorization: token } });
      return new ConsultarPorDepositoResponse({
        success: data.success,
        status: status,
        results: data.results,
        message: ""
      });
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return new ConsultarPorDepositoResponse({
              success: false,
              results: null,
              status: e.response?.status || 500,
              message: e.response?.data.message
            });
          }
      return new ConsultarPorDepositoResponse({
        success: false,
        status: 500,
        results: null,
        message: "Error al consultar producto"
      });
    }
  },
  verificarCodigoDisponible: async (codigo: string, token: string | null): Promise<boolean> => {
    try {
      const { data } = await BASE.get(`/productos/verificar/${codigo}`, { headers: { Authorization: token } });
      return data.success;
    } catch (e) {
      return false;
    }
  },
  list: async (token: string | null): Promise<ProductoResponse> => {
    try {
      const { data, status } = await BASE.get("/productos", { headers: { Authorization: token } });
      return ProductoResponse.fromJSON({
        success: data.success,
        status,
        results: data.results,
        message: ""
      });
    } catch (e) {
      return ProductoResponse.fromJSON({
        success: false,
        status: 500,
        results: null,
        message: "Error al obtener productos"
      });
    }
  },
  edit: () => {
    try {
    } catch (e) {}
  },
  delete: () => {
    try {
    } catch (e) {}
  },
  add: async (form: AddProducto, token: string | null): Promise<AddProductoResponse> => {
    try {
      const { data, status } = await BASE.post("/productos", form, { headers: { Authorization: token } });
      return AddProductoResponse.fromJSON({
        success: data.success,
        status,
        results: data.results,
        message: data.message
      });
    } catch (e) {
      return AddProductoResponse.fromJSON({
        success: false,
        status: 500,
        results: null,
        message: "Error al crear producto"
      });
    }
  }
};
