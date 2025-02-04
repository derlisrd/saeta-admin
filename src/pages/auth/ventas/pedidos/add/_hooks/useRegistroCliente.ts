import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { RegistroCliente } from "@/services/dto/clientes/registro";
import { useState } from "react";

function useRegistroCliente() {
    
    const {userData} = useAuth();
    const [loading, setLoading] = useState(false);
    const [form,setForm] = useState<RegistroCliente>(new RegistroCliente({}));

    const handleForm = (key: string, value: string) => {
        setForm({
            ...form,
            [key]: value
        });
    }

    const verificarPorDocumento = async (documento : string) => {
        setLoading(true)
        const res = await API.clientes.porDocumento(userData && userData.token,documento);
        console.log(res);
    }


    return {form, handleForm, verificarPorDocumento, loading};
}

export default useRegistroCliente;