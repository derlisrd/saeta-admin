import { isAxiosError } from "axios";
import { BASE } from "../base";
import { OptionsResponse, OptionsResults } from "@/services/dto/tienda/options";

export const apiServiceOptions = {
  all: async (token: string | null) => {
    try {
        const {data, status} = await BASE.get('/options', {headers: { Authorization: token}})
        return new OptionsResponse({ results: data.results, status: status, message: '', success : data.success });
    } catch (e) {
      if (isAxiosError(e)) {
        throw new Error(e.response?.data.message || "Error de servidor");
      }
      throw new Error("Error de servidor");
    }
  },
  createOrUpdate : async(token: string | null, option : OptionsResults)=>{
    try {
      const {data, status} = await BASE.post('/options',
        {
          key: option.key,value : option.value, json: option.json
        },
        {headers: { Authorization: token}})
      return new OptionsResponse({ results: data.results, status: status, message: '', success : data.success });
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message || "Error de servidor");
    }
    throw new Error("Error de servidor");
  }
  }
};
