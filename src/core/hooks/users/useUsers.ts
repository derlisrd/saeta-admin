import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useSuspenseQuery } from "@tanstack/react-query";

function useUsers() {
    const {userData} = useAuth()

    const {isLoading, data, refetch} = useSuspenseQuery({
        queryKey: ['users'],
        queryFn: () =>  API.users.list(userData && userData.token),
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
        })
    
    
    return {
        isLoading,
        data: data ? data.results : [], refetch
    }
}

export default useUsers;