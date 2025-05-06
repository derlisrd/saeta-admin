import { useAuth } from "@/providers/AuthProvider"
import API from "@/services/api"
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia"
import { useQuery } from "@tanstack/react-query"
import { useState, useCallback } from "react"

function useListaPedidos() {
    const { userData } = useAuth()

    const [search, setSearch] = useState("")
    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [selectedRow, setSelectedRow] = useState<PedidosDelDiaResults | null>(null)

    const {
        isLoading,
        refetch,
        isFetching,
        data
    } = useQuery({
        queryKey: ['listaPedidos'], // Incluir desde y hasta en la queryKey para que se actualice automáticamente
        queryFn: async () => {
            if (!userData || !userData.token) {
                return []; // Retornar array vacío si no hay token
            }
            
            try {
                const res = await API.pedidos.lista(userData.token, desde, hasta)
                if (res && res.success) {
                    return res.results
                }
                return []
            } catch (error) {
                console.error("Error al obtener lista de pedidos:", error);
                return []
            }
        },
        enabled: Boolean(userData && userData?.token),
        staleTime: 1000 * 60 * 5 // 5 minutos
    })

    const buscar = useCallback(() => {
        refetch()
    }, [refetch])

    return {
        lista: data,
        isLoading: isFetching || isLoading,
        refetch,
        setSearch,
        search,
        buscar,
        desde,
        hasta,
        setDesde,
        setHasta,
        selectedRow,
        setSelectedRow
    }
}

export default useListaPedidos