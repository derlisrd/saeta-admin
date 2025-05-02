import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { ProductoResults } from "@/services/dto/productos/producto";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


function useListProductos() {
  const { userData } = useAuth();
  const [selectDeposito, setSelectDeposito] = useState<number>(0);
  const [selectedProducto, setSelectedProducto] = useState<ProductoResults | null>(null);
  // Fetch productos
  const { data: productosData, isLoading: productosLoading, error: productosError, refetch } = useQuery({
    queryKey: ["productos", userData?.token],
    queryFn: () => API.productos.list(userData && userData?.token),
    enabled: !!userData?.token,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });

  // Fetch depósitos
  const { data: depositosData, isLoading: depositosLoading, error: depositosError } = useQuery({
    queryKey: ["depositos", userData?.token],
    queryFn: () => API.depositos.list(userData && userData?.token),
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
    selectedProducto,
    setSelectedProducto,
    refresh: refetch,
  };
  
}

export default useListProductos;
