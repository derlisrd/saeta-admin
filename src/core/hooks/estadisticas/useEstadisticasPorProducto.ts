import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useMutation } from "@tanstack/react-query";

function useEstadisticasPorProducto() {
    const {userData} = useAuth();

    const { isPending, mutateAsync, data } = useMutation({
      mutationKey: ["estadisticasProducto", userData && userData.token],
      mutationFn: ({ id, desde, hasta }: { id: number; desde: string; hasta: string }) => 
        API.estadisticas.producto(userData && userData.token, id, desde, hasta),
    });

  const send = async(id: number, desde: string, hasta: string) => await mutateAsync({ id, desde,hasta });
    
    return {
    send,
    isPending,
    data
    }
}

export default useEstadisticasPorProducto