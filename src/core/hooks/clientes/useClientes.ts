import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { ClienteResults } from "@/services/dto/clientes/cliente";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


function useClientes() {
    const { userData } = useAuth();


    const [lista,setLista] = useState<ClienteResults[]>([])

    const { isLoading } = useQuery({
        queryKey:['listaPedidos'],
        queryFn: async() =>{
            const res = await API.clientes.list(userData && userData.token)
            if(res && res.success && res.results) {
                setLista(res.results)
            }
            return []
        },
        refetchOnWindowFocus:false,
        staleTime: 1000 * 60 * 5,
      });




    return {isLoading,lista }
}

export default useClientes;