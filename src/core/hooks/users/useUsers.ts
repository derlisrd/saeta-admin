import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useUsers() {
    const {userData} = useAuth()

    const {isLoading, data} = useQuery({
        queryKey: ['users'],
        queryFn: () =>  API.users.list(userData && userData.token),
        enabled: !!userData && !!userData.token,
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
        })
    
    
    return {
        isLoading,
        data: data ? data.results : []
    }
}

export default useUsers;