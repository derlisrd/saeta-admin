import { useAuth } from "@/providers/AuthProvider";
import { BASE } from "@/services/api/base";
import { useQuery } from "@tanstack/react-query";

function useFormasPago() {
    const {userData} = useAuth()
    
    const {data, isLoading} = useQuery({
        queryKey: ['formasPago'],
        queryFn: ()=> fetch(BASE +'/formas-pago',{ method: 'GET', headers : { 'Authorization': userData ? userData.token : ''}}),
        
    })
    
    console.log(data);
    
    
    return {data, isLoading}
}

export default useFormasPago;