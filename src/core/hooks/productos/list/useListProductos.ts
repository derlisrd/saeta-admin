import { useAuth } from "@/providers/AuthProvider";
import { apiServiceDepositos } from "@/services/api/productos/deposito";
import { apiServiceProductos } from "@/services/api/productos/producto";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


function useListProductos() {
  const { userData } = useAuth();
  const [selectDeposito, setSelectDeposito] = useState<number>(0);

  // Fetch productos
  const { data: productosData, isLoading: productosLoading, error: productosError } = useQuery({
    queryKey: ["productos", userData?.token],
    queryFn: () => apiServiceProductos.list(userData && userData?.token),
    enabled: !!userData?.token,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });

  // Fetch depósitos
  const { data: depositosData, isLoading: depositosLoading, error: depositosError } = useQuery({
    queryKey: ["depositos", userData?.token],
    queryFn: () => apiServiceDepositos.list(userData && userData?.token),
    enabled: !!userData?.token,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });

  return {
    list: productosData?.results ?? [],
    depositos: depositosData?.results ?? [],
    loading: productosLoading || depositosLoading,
    error: productosError || depositosError,
    selectDeposito,
    setSelectDeposito,
  };
  
}

export default useListProductos;
