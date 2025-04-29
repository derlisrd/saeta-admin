import MessageType from "@/core/types/message";
import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { AddCliente } from "@/services/dto/clientes/AddCliente";
import {  useMutation } from "@tanstack/react-query";
import { useState } from "react";




function useAddClientes(onSuccessCallback: () => void) {
    const { userData } = useAuth();


    const [message, setMessage] = useState<MessageType | null>(null);
    const clearMessage = () => setMessage(null);

    const {isPending, mutate} = useMutation({
        mutationFn: async (form: AddCliente) => {
            return API.clientes.create(userData && userData?.token, form)
        },
        onSettled: (data) => {
            if (data && !data.success) {
              setMessage({ name: "Error", descripcion: data.message, severity: "error" });
              return;
            }
            if(data && data.success) {
              onSuccessCallback();
              setMessage({ name: "Correcto", descripcion: data.message, severity: "success" });
              return;
            }
        },
    })

    const addNewCliente = async (form: AddCliente) => {
        if (!form.doc.trim() || !form.nombres.trim() || !form.apellidos.trim()) {
            setMessage({
                name: "Atención",
                descripcion: "Los campos Documento o RUC, Nombre y Apellido son obligatorios.",
                severity: "warning",
            });
            return;
        }
        mutate(form)
    }

    return {isLoading: ( isPending), addNewCliente, message, clearMessage}
}

export default useAddClientes;