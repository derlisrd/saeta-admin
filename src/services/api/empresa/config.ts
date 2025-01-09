import { Empresa } from "@/services/dto/login";
import { BASE } from "../base";
import { EmpresaResponse } from "@/services/dto/config/empresa";

export const apiSErviceConfig = {
    updateEmpresa: async(form: Empresa, token : string | null)=>{
        try {
            const { data, status } = await BASE.put('/config/empresa', form, { headers: { Authorization: token } });
            return EmpresaResponse.fromJSON({
                success: data.success,
                status,
                results: data.results,
                message: data.message
            })
        } catch (error) {
            return EmpresaResponse.fromJSON({ success : false, status : 500, results: null, message: 'Error de servidor'});
        }
    }
}