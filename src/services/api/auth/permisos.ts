import axios from "axios";
import { BASE } from "../base";
import { PermisosByUserResponse, PermisosResponse } from "@/services/dto/auth/permisos";


export const apiServicePermisos = {
  list: async(token: string | null)=>{
    try {
      const { data, status } = await BASE.get("/permisos", { headers: { Authorization: `Bearer ${token}` } });
      return new PermisosResponse ({ success: data.success as boolean, message: data.message, results: data.results,status });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Error desconocido" );
      }
      throw new Error("Error desconocido");
    }
  },
  byUser: async(token: string | null, id: number) =>{
    try {
      const {data, status} = await BASE.get(`/permisos/by-user/${id}`, { headers: { Authorization: `Bearer ${token}` } });

      return new PermisosByUserResponse({ success: data.success as boolean, message: '', results: data.results, status: status });

    } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.message || "Error desconocido" );
        }
        throw new Error("Error desconocido");
      }
  },
  asignar: async(token: string | null, id: number, permisos: number[]) =>{
    try {
      const {data, status} = await BASE.post(`/permisos/asignar`, { permisos, user_id: id }, { headers: { Authorization: `Bearer ${token}` } });
      return { success: data.success as boolean, message: data.message, status: status };
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Error desconocido" );
      }
      throw new Error("Error desconocido");
    }
  },
  revocar: async(token: string | null, id: number, permisos: number[]) =>{
    try {
      const {data, status} = await BASE.post(`/permisos/revocar`, { permisos, user_id: id }, { headers: { Authorization: `Bearer ${token}` } });
      return { success: data.success as boolean, message: data.message, status: status };
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Error desconocido" );
      }
      throw new Error("Error desconocido");
      }
  },
}