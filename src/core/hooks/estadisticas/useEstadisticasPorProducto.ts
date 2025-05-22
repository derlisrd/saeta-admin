import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useEstadisticasPorProducto() {
    const {userData} = useAuth();

    const { data } = useQuery({
        queryKey: ["estadisticasProducto", userData && userData.token],
        queryFn: () => API.estadisticas.producto(userData && userData.token, 4, "2023-01-01", "2025-12-31"),
        select: (data) => {
            if (data.success) {
                return data.results;
            }
        },
    });

    
    return {

    }
}

export default useEstadisticasPorProducto