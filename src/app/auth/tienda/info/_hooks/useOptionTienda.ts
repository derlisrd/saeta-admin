import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useOptionTienda() {

    const {userData} = useAuth()

    const {isLoading, data} = useQuery({
        queryKey: ['optionTienda'],
        queryFn: ()=> API.options.all(userData && userData.token)
    });

    
    return {isLoading, data}
}

export default useOptionTienda;