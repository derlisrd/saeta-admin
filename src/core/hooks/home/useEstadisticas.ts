import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { EstadisticasPedidosResponse } from "@/services/dto/estadisticas/estadisticas";
import { LucrosResponse } from "@/services/dto/estadisticas/lucros";
import { useSuspenseQueries } from "@tanstack/react-query";

function useEstadisticas() {
    const { userData } = useAuth();
    const token = userData && userData.token;

    const [pedidosResponse, lucrosResponse] = useSuspenseQueries({
        queries: [
            {
                queryKey: ["estadisticas", "pedidos"],
                queryFn: () => API.estadisticas.pedidos(token),
                staleTime: 1000 * 60 * 10,
                select: (data: EstadisticasPedidosResponse) =>
                    data ? new EstadisticasPedidosResponse(data) : undefined,
            },
            {
                queryKey: ["estadisticas", "lucros"],
                queryFn: () => API.estadisticas.lucros(token),
                staleTime: 1000 * 60 * 10,
                select: (data: LucrosResponse) =>
                    data ? new LucrosResponse(data) : undefined,
            },
        ],
    });

  const isLoading = pedidosResponse.isLoading || lucrosResponse.isLoading || lucrosResponse.isFetching || pedidosResponse.isFetching;

    const combinedData = {
        ayer: {
            cantidad: pedidosResponse.data?.results?.ayer?.cantidad || 0,
            descuento: pedidosResponse.data?.results?.ayer?.descuento || 0,
            importe: pedidosResponse.data?.results?.ayer?.importe || 0,
            lucro: lucrosResponse.data?.results?.ayer?.lucro || 0,
        },
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
        semana_pasada: {
            cantidad: pedidosResponse.data?.results?.semana_pasada?.cantidad || 0,
            descuento: pedidosResponse.data?.results?.semana_pasada?.descuento || 0,
            importe: pedidosResponse.data?.results?.semana_pasada?.importe || 0,
            lucro: 0,
        },
        mes_pasado: {
            cantidad: pedidosResponse.data?.results?.mes_pasado?.cantidad || 0,
            descuento: pedidosResponse.data?.results?.mes_pasado?.descuento || 0,
            importe: pedidosResponse.data?.results?.mes_pasado?.importe || 0,
            lucro: 0,
        },
        comparaciones: {
            dia: {
                importe: (pedidosResponse.data?.results?.hoy?.importe || 0) - (pedidosResponse.data?.results?.ayer?.importe || 0),
                porcentaje: calcularPorcentaje(
                    pedidosResponse.data?.results?.hoy?.importe || 0,
                    pedidosResponse.data?.results?.ayer?.importe || 0
                ),
            },
            semana: {
                importe: (pedidosResponse.data?.results?.semana?.importe || 0) - (pedidosResponse.data?.results?.semana_pasada?.importe || 0),
                porcentaje: calcularPorcentaje(
                    pedidosResponse.data?.results?.semana?.importe || 0,
                    pedidosResponse.data?.results?.semana_pasada?.importe || 0
                ),
            },
            mensual: {
                importe: (pedidosResponse.data?.results?.mes?.importe || 0) - (pedidosResponse.data?.results?.mes_pasado?.importe || 0),
                porcentaje: calcularPorcentaje(
                    pedidosResponse.data?.results?.mes?.importe || 0,
                    pedidosResponse.data?.results?.mes_pasado?.importe || 0
                ),
            },
        }
    };

    function calcularPorcentaje(valorActual: number, valorAnterior: number) {
        if (valorAnterior === 0) {
            return valorActual === 0 ? 0 : 100;
        }
        return ((valorActual - valorAnterior) / valorAnterior) * 100;
    }

  const refresh = () => {
    pedidosResponse.refetch();
    lucrosResponse.refetch();
  };

    return { data: combinedData, isLoading : isLoading, refresh };
}
export default useEstadisticas;
