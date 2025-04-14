import { useAuth } from "@/providers/AuthProvider"
import API from "@/services/api"
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

function useListaPedidos() {
    
    const {userData} = useAuth()

    const [search, setSearch] = useState("")
    const [lista,setLista] = useState<PedidosDelDiaResults[]>([])

    const buscar = ()=>{

    }

    const {isLoading, refetch} = useQuery({
        queryKey:['listaPedidos'],
        queryFn: async () => {
            if (!userData || !userData.token) {
                return []; // Retornar array vacío si no hay token
            }
            const res = await API.pedidos.lista(userData.token)
            if(res && res.success) {setLista (res.results)}
            return []
        },
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnMount: false,
        refetchOnWindowFocus: false, // Evita recargar cuando la ventana recupera el foco
    })
    
    return {lista, isLoading, refetch, setSearch, search, buscar}
}

export default useListaPedidos