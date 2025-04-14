import { useAuth } from "@/providers/AuthProvider"
import API from "@/services/api"
import { useQuery } from "@tanstack/react-query"

function useListaPedidos() {
    
    const {userData} = useAuth()

    

    const {isLoading, data, refetch} = useQuery({
        queryKey:['listaPedidos'],
        queryFn: async () => {
            if (!userData || !userData.token) {
                return []; // Retornar array vacío si no hay token
            }
            const res = await API.pedidos.lista(userData.token)
            if(res && res.success) {return (res.results)}
            return []
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnMount: false,
        refetchOnWindowFocus: false, // Evita recargar cuando la ventana recupera el foco
    })
    
    return {lista : data, isLoading, refetch}
}

export default useListaPedidos