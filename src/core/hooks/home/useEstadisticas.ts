import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useEstadisticas() {
    const {userData} = useAuth()

    const initialData = {
        hoy: {
            cantidad: 0,
            descuento: 0,
            importe: 0
        },
        mes: {
            cantidad: 0,
            descuento: 0,
            importe: 0
        },
        semana: {
            cantidad: 0,
            descuento: 0,
            importe: 0
        }
    }

    const {data, isLoading} = useQuery({
        queryKey: ["estadisticas"],
        queryFn: () => API.pedidos.estadisticas(userData && userData.token),
        enabled: !!userData && !!userData.token,
        staleTime: 1000 * 60 * 10,
    })
    
    
    return {data : data ? data.results : initialData, isLoading}
}

export default useEstadisticas;