import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";


import { useQuery } from "@tanstack/react-query";



function useClientes() {
    const { userData } = useAuth();




    const { isLoading, data } = useQuery({
        queryKey:['listaClientes'],
        queryFn: async() =>{
            const res = await API.clientes.list(userData && userData.token)
            if(res && res.success && res.results) {
               return (res.results)
            }
            return []
        },
        refetchOnWindowFocus:true,
        staleTime: 1000 * 60 * 5,
      });




    return {isLoading,lista: data }
}

export default useClientes;