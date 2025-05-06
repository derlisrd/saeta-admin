import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { EstadisticasResponse } from "@/services/dto/estadisticas/estadisticas";
import { LucrosResponse } from "@/services/dto/estadisticas/lucros";
import { useQuery } from "@tanstack/react-query";


function useEstadisticas() {
    const { userData } = useAuth();

    const { data: pedidosResponse, isLoading: isLoadingPedidos } = useQuery({
        queryKey: ["estadisticas", "pedidos"],
        queryFn: () => API.estadisticas.pedidos(userData && userData.token),
        enabled: !!userData && !!userData.token,
        staleTime: 1000 * 60 * 10,
        select: (data) => data ? new EstadisticasResponse(data) : undefined, // Aplica el modelo a la respuesta de pedidos
    });

    const { data: lucrosResponse, isLoading: isLoadingLucros } = useQuery({
        queryKey: ["estadisticas", "lucros"],
        queryFn: () => API.estadisticas.lucros(userData && userData.token),
        enabled: !!userData && !!userData.token,
        staleTime: 1000 * 60 * 10,
        select: (data) => data ? new LucrosResponse(data) : undefined, // Aplica el modelo a la respuesta de lucros
    });

    const isLoading = isLoadingPedidos || isLoadingLucros;
    
    
    const combinedData = {
        hoy: {
            cantidad: pedidosResponse?.results?.hoy?.cantidad || 0,
            descuento: pedidosResponse?.results?.hoy?.descuento || 0,
            importe: pedidosResponse?.results?.hoy?.importe || 0,
            lucro: lucrosResponse?.results?.hoy?.lucro || 0,
        },
        semana: {
            cantidad: pedidosResponse?.results?.semana?.cantidad || 0,
            descuento: pedidosResponse?.results?.semana?.descuento || 0,
            importe: pedidosResponse?.results?.semana?.importe || 0,
            lucro: lucrosResponse?.results?.semana?.lucro || 0,
        },
        mes: {
            cantidad: pedidosResponse?.results?.mes?.cantidad || 0,
            descuento: pedidosResponse?.results?.mes?.descuento || 0,
            importe: pedidosResponse?.results?.mes?.importe || 0,
            lucro: lucrosResponse?.results?.mes?.lucro || 0,
        },
    };

    console.log(combinedData);
    

    return { data: combinedData, isLoading };
}

export default useEstadisticas;