import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { FormasPagoAdd, FormasPagoAddResponse, FormasPagoResponse } from "@/services/dto/config/formaspago";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function useFormasPago() {
    const {userData} = useAuth()
    const queryClient = useQueryClient();
   const [modals,setModals] = useState({add: false})

   const {isPending, mutateAsync} = useMutation({
    mutationKey: ['formasPagoAdd'],
    mutationFn: async(form : FormasPagoAdd)=>{
        return await API.formasPago.add(userData && userData.token, form)
    },
    onSuccess: async (response: FormasPagoAddResponse) => {
        if (response.success && response.results) {
            await queryClient.invalidateQueries({ queryKey: ['formasPago'] });
            queryClient.setQueryData(['formasPago'], (oldData: any) => {
                if (!oldData) return oldData;
                
                // Crear copia de los datos actuales
                const newData = { ...oldData };
                newData.push(response.results)
                
                return newData;
            });   
            // Cerrar el modal después de añadir exitosamente
            setModals(prev => ({ ...prev, add: false }));
        }
    },
    onSettled: () => {
        
    },
   })
    
    const {data, isLoading} = useQuery({
        queryKey: ['formasPago'],
        queryFn: ()=> API.formasPago.list(userData && userData.token),
        select: (data) => FormasPagoResponse.fromJSON(data),
    })


    
    
    
    return {listado : data ? data.results : [], isLoading, modals, setModals, insertar : (form : FormasPagoAdd)=> mutateAsync(form) , isPending}
}

export default useFormasPago;