import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const useEditProductoQuery = (id : number | undefined, enabled : boolean) => {
    const {userData} = useAuth()
    return useQuery({
      queryKey: ['producto', id],
      queryFn: () => {
        if(typeof id !== 'number'){
            return undefined
        }    
        API.productos.find(userData && userData.token, id)
    },
      enabled: enabled,
      retry: 3, 
    });
}
export default useEditProductoQuery
