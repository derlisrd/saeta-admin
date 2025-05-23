import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function useBuscaProducto(searchInput: string = "", debounceTime: number = 500) {
    const { userData } = useAuth();
    const [debouncedSearch, setDebouncedSearch] = useState(searchInput);
    
    // Implementamos debounce para evitar peticiones innecesarias
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, debounceTime);
        
        return () => clearTimeout(timer);
    }, [searchInput, debounceTime]);

    const { data, isLoading } = useQuery({
      queryKey: ["buscaProducto", debouncedSearch],
      queryFn: () => API.productos.search(userData && userData?.token, debouncedSearch),
      // Solo se ejecuta cuando hay token válido y al menos 3 caracteres
      enabled: !!userData?.token && debouncedSearch.length >= 1,
      refetchOnWindowFocus: false,
      //staleTime: 1000 * 60 * 5 // 5 minutos de cache
    });

    

    return {
        listaBusqueda: data?.results ?? [],
        loadingBusqueda: isLoading,
        debouncedSearch
    } 
}

export default useBuscaProducto;