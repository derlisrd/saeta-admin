import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useCargaStock() {
    
    const { userData } = useAuth();
    
    const { data, isLoading} = useQuery({
        queryKey: ["depositos", userData?.token],
        queryFn: () => API.depositos.list(userData && userData?.token),
        enabled: !!userData?.token,
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
        refetchOnWindowFocus: false
      });
    
    return {depositos: data?.results ?? [], isLoading}
}

export default useCargaStock;