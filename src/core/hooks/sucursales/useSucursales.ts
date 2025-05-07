import { useAuth } from "@/providers/AuthProvider"
import API from "@/services/api"
import { SucursalesResponse } from "@/services/dto/config/sucursales"
import { useQuery } from "@tanstack/react-query"

function useSucursales() {
    
    const {userData} = useAuth()
    
    const {isLoading, data} = useQuery({
        queryKey: ['sucursales'],
        queryFn: async() => API.sucursales.list(userData && userData.token),
        select: (data) => SucursalesResponse.fromJSON(data),
        enabled: !!userData,
        staleTime: 1000 * 60 * 60 ,
        
    })


    return {isLoading, listaSucursales : data ? data?.results : []}
}

export default useSucursales