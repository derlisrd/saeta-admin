import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { useState } from "react";

function useInsertPedido() {

    const {userData} = useAuth();

    const [isLoading,setIsLoading] = useState(false);
    const insertPedido = async (pedido: AddPedido) => {
        setIsLoading(true);
        const res = await API.pedidos.insert(userData && userData.token,pedido);
        setIsLoading(false);
        return res
    }

    return {insertPedido, isLoading}
}

export default useInsertPedido;