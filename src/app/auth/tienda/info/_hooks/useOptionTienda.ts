import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";

function useOptionTienda() {

    const {userData} = useAuth()

    const {isLoading, data} = useQuery({
        queryKey: ['optionTienda'],
        queryFn: ()=> API.options.all(userData && userData.token)
    });

    const { isPending } = useMutation({
      mutationKey: ["updateOrCreate"],
      mutationFn: ({ key, value }: { key: string; value: string }) => API.options.createOrUpdate(userData && userData.token, key, value)
    });

    
    return {isLoading, isPending, data}
}

export default useOptionTienda;