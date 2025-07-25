import { UserCreateForm, UserCreateResponse, UserListResponse } from "@/services/dto/users/user";
import { BASE } from "../base";
import { isAxiosError } from "axios";

export const apiServiceUsers = {
    list: async(token: string | null) => {
        try{
            const {data, status} = await BASE.get('/users', {
                headers: {
                    Authorization: token
                }
            });
            return new UserListResponse( {
                success: data.success,
                status,
                results: data.results,
                message: data.message
            })
        }
        catch (e) {
            if(isAxiosError(e)){
                throw new Error(e.response?.data.message || "Error de servidor");
            }
            throw new Error("Error de servidor");
        }
    },
    create: async(token : string | null, form : UserCreateForm)=>{
        try {
            const {data, status} = await BASE.post('/users/create', form, { headers: { Authorization: token } });
            return new UserCreateResponse({
                success: data.success,
                status,
                results: data.results,
                message: data.message
            })
        } catch (error) {
            if(isAxiosError(error)){
                return {
                    success: false,
                    status: error.response?.status || 500,
                    results: null,
                    message: error.response?.data.message || 'Error de servidor'
                }
            }
            return {
                success: false,
                status: 500,
                results: null,
                message : 'Error de servidor'
            }
        }

    },

}