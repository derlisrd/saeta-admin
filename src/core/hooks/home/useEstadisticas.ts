import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { EstadisticasResponse } from "@/services/dto/estadisticas/estadisticas";
import { LucrosResponse } from "@/services/dto/estadisticas/lucros";
import {  useSuspenseQueries } from "@tanstack/react-query";


function useEstadisticas() {
    const { userData } = useAuth();
    const token = userData && userData.token;

    const [pedidosResponse, lucrosResponse] = useSuspenseQueries({
        queries: [
          {
            queryKey: ["estadisticas", "pedidos"],
            queryFn: () => API.estadisticas.pedidos(token),
            staleTime: 1000 * 60 * 10,
            select: (data : EstadisticasResponse) => (data ? new EstadisticasResponse(data) : undefined),
          },
          {
            queryKey: ["estadisticas", "lucros"],
            queryFn: () => API.estadisticas.lucros(token),
            staleTime: 1000 * 60 * 10,
            select: (data : LucrosResponse) => (data ? new LucrosResponse(data) : undefined),
          },
        ],
      });

    const isLoading = pedidosResponse.isLoading || lucrosResponse.isLoading
    
    const combinedData = {
        hoy: {
            cantidad: pedidosResponse.data?.results?.hoy?.cantidad || 0,
            descuento: pedidosResponse.data?.results?.hoy?.descuento || 0,
            importe: pedidosResponse.data?.results?.hoy?.importe || 0,
            lucro: lucrosResponse.data?.results?.hoy?.lucro || 0,
        },
        semana: {
            cantidad: pedidosResponse.data?.results?.semana?.cantidad || 0,
            descuento: pedidosResponse.data?.results?.semana?.descuento || 0,
            importe: pedidosResponse.data?.results?.semana?.importe || 0,
            lucro: lucrosResponse.data?.results?.semana?.lucro || 0,
        },
        mes: {
            cantidad: pedidosResponse.data?.results?.mes?.cantidad || 0,
            descuento: pedidosResponse.data?.results?.mes?.descuento || 0,
            importe: pedidosResponse.data?.results?.mes?.importe || 0,
            lucro: lucrosResponse.data?.results?.mes?.lucro || 0,
        },
    };

    

    return { data: combinedData, isLoading };
}

export default useEstadisticas;