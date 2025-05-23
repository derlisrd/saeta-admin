import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { EstadisticasProductoResponse } from "@/services/dto/estadisticas/producto";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useEstadisticasPorProducto() {
    const {userData} = useAuth();
  const [data, setData] = useState<EstadisticasProductoResponse | undefined > (undefined);

    const { isPending, mutateAsync } = useMutation({
      mutationKey: ["estadisticasProducto", userData && userData.token],
      mutationFn: ({ id, desde, hasta }: { id: number; desde: string; hasta: string }) => 
        API.estadisticas.producto(userData && userData.token, id, desde, hasta),
      onSettled(data) {
        if(data && data.success){
        setData(data);
        }
      },
    });

  const send = async(id: number, desde: string, hasta: string) => await mutateAsync({ id, desde,hasta });
    
    return {
    send,
    isPending,
    data
    }
}

export default useEstadisticasPorProducto