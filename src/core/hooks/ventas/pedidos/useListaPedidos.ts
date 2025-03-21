import { useAuth } from "@/providers/AuthProvider"
import API from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

function useListaPedidos() {
    
    const {userData} = useAuth()

    const [lista,setLista] = useState([])
    

    const {isLoading} = useQuery({
        queryKey:['listaPedidos'],
        queryFn: async () => {
            const res = await API.pedidos.lista(userData && userData.token)
            res && res.success && setLista(res.results)
        }
    })
    
    return {lista, isLoading}
}

export default useListaPedidos