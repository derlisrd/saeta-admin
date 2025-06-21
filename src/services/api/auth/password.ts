import { isAxiosError } from "axios";
import { BASE } from "../base";

export const apiServicePassword = {
  sendCode: async (email: string) => {
    try {
        const { data } = await BASE.post("/password/send-code", { email });
        return {
            success: true,
            message: data.message,
        }
    } catch (err) {
        if(isAxiosError(err)) {
            throw Error(err.response?.data.message || "Error en conexion")
        }
      throw Error("Error en servidor");
    }
  },
  verifyCode: async (code: string, email : string) => {
    try {
        const { data } = await BASE.post("/password/verify-code", { email, code });
        return {
            success: data.success,
            message: data.message,
            token: data.token
        }
    } catch (err) {
        if(isAxiosError(err)) {
            throw Error(err.response?.data.message || "Error en conexion")
        }
      throw Error("Error en servidor");
    }
  },
  reset: async ( token: string, password: string, password_confirmation: string) => {
    try {
      const { data } = await BASE.post("/password/reset", { token, password, password_confirmation });
      return {
          success: data.success,
          message: data.message,
          token: data.token
      }
  } catch (err) {
      if(isAxiosError(err)) {
          throw Error(err.response?.data.message || "Error en conexion")
      }
    throw Error("Error en servidor");
  }
  }
}