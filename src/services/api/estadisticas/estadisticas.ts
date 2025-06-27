
import { EstadisticasProductoResponse } from "@/services/dto/estadisticas/producto";
import { BASE } from "../base";
import axios, { isAxiosError } from "axios";
import { EstadisticasPeriodoResponse } from "@/services/dto/estadisticas/generales";
import { ProductosMasVendidosResponse } from "@/services/dto/estadisticas/productos";

export const apiServiceEstadisticas = {
  pedidos: async (token: string | null) => {
    try {
      const { data, status } = await BASE.get("/estadisticas/pedidos", { headers: { Authorization: token } });
      return { success: data.success as boolean, status, results: data.results, message: "" };
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
  lucros: async (token: string | null) => {
    try {
      const { data, status } = await BASE.get("/estadisticas/lucros", { headers: { Authorization: token } });
      return { success: data.success as boolean, status, results: data.results, message: "" };
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
  producto: async (token: string | null, id: number, desde: string, hasta: string): Promise<EstadisticasProductoResponse> => {
    try {
      const { data, status } = await BASE.get(`/estadisticas/producto/${id}?desde=${desde}&hasta=${hasta}`, { headers: { Authorization: token } });
      return new EstadisticasProductoResponse({
        success: data.success as boolean,
        message: "",
        status,
        results: data.results
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return new EstadisticasProductoResponse({
          success: false,
          results: null,
          status: e.response?.status || 500,
          message: e.response?.data.message || "Error en conexion"
        });
      }
      if (!navigator.onLine) {
        return new EstadisticasProductoResponse({
          success: false,
          results: null,
          status: 0,
          message: "No hay conexión a Internet."
        });
      }
      return new EstadisticasProductoResponse({
        success: false,
        results: null,
        status: 500,
        message: "Error de servidor intente más tarde o contacte con Atención al cliente."
      });
    }
  },
  periodo: async (token: string | null, mes: string, anio: string) => {
    try {
      const {data, status} = await BASE.get(`/estadisticas/periodo?mes=${mes}&anio=${anio}`, { headers: { Authorization: token } });

      return new EstadisticasPeriodoResponse({
        success: data.success as boolean,
        message: "",
        status,
        results: data.results
      });
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Error en conexion");
      }
      if (!navigator.onLine) {
        throw new Error("No hay conexión a Internet.");
      }
      throw new Error("Error de servidor intente más tarde o contacte con Atención al cliente.");
    }
  },
  productosMasVendidos: async (token: string | null, mes: string, anio: string) => {
    try {
      const {data, status} = await BASE.get(`/estadisticas/productos-mas-vendidos?mes=${mes}&anio=${anio}`, { headers: { Authorization: token } });

      return new ProductosMasVendidosResponse({
        success: data.success as boolean,
        message: "",
        status,
        results: data.results
      });
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Error en conexion");
      }
      if (!navigator.onLine) {
        throw new Error("No hay conexión a Internet.");
      }
      throw new Error("Error de servidor intente más tarde o contacte con Atención al cliente.");
    }
  },
};
