import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { RegistroCliente } from "@/services/dto/clientes/registro";
import { useState } from "react";
import { ErrorType } from "../_types/error";

function useRegistroCliente() {
    
    const {userData} = useAuth();
    const [loading, setLoading] = useState(false);
    const [form,setForm] = useState<RegistroCliente>(new RegistroCliente({}));
    const [error,setError] = useState<ErrorType>({
        code: 0,
        message: "",
        active:false
    });
    const clearFormRegistroCliente = () => setForm(new RegistroCliente({}));
    

    const handleForm = (key: string, value: string) => setForm({...form,[key]: value});
    

    const verificarPorDocumento = async (documento : string) => {
        if(documento.length < 4) return;
        setLoading(true)
        const res = await API.clientes.porDocumento(userData && userData.token,documento);
        setLoading(false)
        if(!res.success && res.results){
            setForm({
                ...form,
                doc: res.results.ruc,
                nombres: res.results.nombre
            })
        }
    }

    const handleRegistro = async () => {
        setLoading(true);
        const res = await API.clientes.registro(userData && userData.token,form);
        setLoading(false);
        if(!res.success){
            setError({code: res.status, message: res.message, active: true});
            return null
        }
        return res && res.results
    }


    return {form, handleForm, verificarPorDocumento, loading, handleRegistro, clearFormRegistroCliente, error};
}

export default useRegistroCliente;