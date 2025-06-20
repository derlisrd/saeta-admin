import { AddProducto, AddProductoResponse } from "@/services/dto/productos/AddProducto";
import { BASE } from "../base";
import { ProductoResponse } from "@/services/dto/productos/producto";
import { ConsultarPorDepositoResponse } from "@/services/dto/productos/consulta";
import axios from 'axios'

export const apiServiceProductos = {
  productosPorDeposito: async (token: string | null, deposito_id: number, q : string): Promise<ProductoResponse> => {
    try {
      const { data, status } = await BASE.get(`/productos/deposito/${deposito_id}?q=${q}`, { headers: { Authorization: token } });
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
  consultarCodigoPorDeposito: async (token: string | null, codigo: string, deposito_id: number, cantidad : number): Promise<ConsultarPorDepositoResponse> => {
    try {
      const { data, status } = await BASE.get(`/productos/consultar-por-deposito?codigo=${codigo}&deposito_id=${deposito_id}&cantidad=${cantidad}`, { headers: { Authorization: token } });
      return new ConsultarPorDepositoResponse({
        success: data.success,
        status: status,
        results: data.results,
        message: data.message
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
  find: async(token: string | null, id: number) =>{
    try {
      const { data, status } = await BASE.get(`/productos/find/${id}`, { headers: { Authorization: token } });
      return ({
        success: data.success,
        status,
        results: data.results,
        message: ""
      });
    } catch (e) {
      return ({
        success: false,
        status: 500,
        results: null,
        message: "Error al obtener productos"
      });
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
  search : async (token: string | null, q: string): Promise<ProductoResponse> => {
    try {
      const { data, status } = await BASE.get(`/productos/search?q=${q}`, { headers: { Authorization: token } });
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
  searchPorDeposito : async (token: string | null, q: string, id: number): Promise<ProductoResponse> => {
    try {
      const { data, status } = await BASE.get(`/productos/search-por-deposito?deposito_id=${id}&q=${q}`, { headers: { Authorization: token } });
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

  add: async (form: AddProducto, token: string | null): Promise<AddProductoResponse> => {
    try {
      const formData = new FormData();

        // Agregar imágenes si existen
        if (form.images) {
          form.images.forEach((image, index : number) => {
            formData.append(`images[${index}]`, image);
          });
        }

        if(form.stock){
          form.stock.forEach((stock, index : number) => {
            formData.append(`stock[${index}][deposito_id]`, String(stock.deposito_id));
            formData.append(`stock[${index}][cantidad]`, String(stock.cantidad));
          });
        }
        if (form.atributos) {
          form.atributos.forEach((atributo, index: number) => {
              formData.append(`atributos[${index}][nombre]`, atributo.nombre);
              
              atributo.opciones.forEach((opcion, opcionIndex: number) => {
                  formData.append(`atributos[${index}][opciones][${opcionIndex}]`, opcion);
              });
          });
        }
        // Agregar los otros datos del producto
        Object.entries(form.toJSON()).forEach(([key, value]) => {
          if (key !== "images" && key !== "stock" && key !== "atributos") {
            formData.append(key, String(value)); // Convertir valores a string si es necesario
          }
        });

      const { data, status } = await BASE.post("/productos", formData, { headers: { Authorization: token , "Content-Type": "multipart/form-data" } });
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
