import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { ConsultarStockResults } from "@/services/dto/productos/ConsultarStock";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useCargaStock() {
    
    const { userData } = useAuth();
    const [results,setResults] = useState<ConsultarStockResults |null | undefined>(undefined)
    const { data, isLoading} = useQuery({
        queryKey: ["depositos", userData?.token],
        queryFn: () => API.depositos.list(userData && userData?.token),
        enabled: !!userData?.token,
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
        refetchOnWindowFocus: false
      });
  
    const consultarStockMutate = useMutation({
      mutationFn: ({deposito, producto} : {deposito: number, producto: number}) => API.stock.consultarStock(userData && userData.token, deposito, producto),
        onSettled(data) {
          if(data && data.success){
            console.log(data.results);
            
            setResults(data.results);
          }
        },
    })
    
    const consultarStock = async (deposito : number, producto: number) => {
        consultarStockMutate.mutate({deposito, producto});
    }


    return {depositos: data?.results ?? [], isLoading : isLoading || consultarStockMutate.isPending, consultarStock, results}
}

export default useCargaStock;