import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useUsers() {
    const {userData} = useAuth()

    const { isLoading, data, refetch, error } = useQuery({
      queryKey: ["users"],
      queryFn: () => API.users.list(userData && userData.token),
      select: (data) => {
        if(data && data.results) return data.results
        return []
      },
      staleTime: 1000 * 60 * 5,
      retry: false
    });

    
    return {
        isLoading,
        data, 
        refetch,
        error
    }
}

export default useUsers;