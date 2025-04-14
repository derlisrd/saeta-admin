import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { AddCliente } from "@/services/dto/clientes/AddCliente";


import {  useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useAddClientes() {
    const { userData } = useAuth();

    const navigate = useNavigate();

    const [error, setError] = useState<Error | null>(null);




    const {isPending, mutate} = useMutation({
        mutationFn: async (form: AddCliente) => {
            return API.clientes.create(userData && userData?.token, form)
        },
        onSettled: (data) => {
            if (data && !data.success) {
              setError({ name: "error_add", message: data.message });
              return;
            }
            navigate(-1)

        },
    })

    const addNewCliente = async (form: AddCliente) => {
        mutate(form)
    }

    return {isLoading: ( isPending), addNewCliente, error}
}

export default useAddClientes;