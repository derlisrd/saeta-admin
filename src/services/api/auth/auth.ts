import axios from "axios";
import { LoginResponse } from "../../dto/auth/login";
import { BASE } from "../base";
import { RefreshTokenResponse } from "@/services/dto/auth/refresh";

export const apiServiceAuth = {
  login: async (username: string, password: string) => {
    try {
      const { data, status } = await BASE.post("/login", {
        username,
        password
      });

      return LoginResponse.fromJSON({
        success: data.success,
        results: data.results,
        status,
        message: ""
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message || "Error en conexion");
      }
      if (!navigator.onLine) {
        throw new Error("No hay conexión a internet");
      }
      throw new Error("Error desconocido");
    }
  },
  check: async (token: string | null) => {
    try {
      const { data } = await BASE.get("/check", { headers: { Authorization: token } });
      return data.success as boolean;
    } catch (error) {
      return false;
    }
  },
  refreshToken: async (token: string | null) => {
    try {
      const { data, status } = await BASE.get("/refresh-token", { headers: { Authorization: token } });
      return RefreshTokenResponse.fromJSON({
        success: data.success,
        results: data.results,
        status,
        message: ""
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.message || "Error en conexion");
      }
      if (!navigator.onLine) {
        throw new Error("No hay conexión a Internet");
      }
      throw new Error("Error de servidor intente más tarde o contacte con Atención al cliente");
    }
  }
};
