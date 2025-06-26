import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { FormasPagoAdd, FormasPagoResponse } from "@/services/dto/config/formaspago";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
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
    onSettled: async(data) => {
        if(data && data.results && data.success){
            setModals({...modals, add: false})
            await queryClient.invalidateQueries({ queryKey: ['formasPago'] });
            queryClient.setQueryData(['formasPago'], (oldData: FormasPagoResponse | null) => {
                if (!oldData) return oldData;
                
                // Crear copia de los datos actuales
                const newData = { ...oldData };
                const nuevoResultado = {
                    id: data.results?.id || 0,
                    tipo: data.results?.tipo || "caja",
                    condicion: data.results?.condicion || "contado",
                    descripcion: data.results?.descripcion || "",
                    porcentaje_descuento: data.results?.porcentaje_descuento || 0,
                    activo: data.results?.activo || 0,
                }
                newData.results.push(nuevoResultado);
                
                return newData;
            });         
        }
    },
   })
    
    const {data, isLoading} = useSuspenseQuery({
        queryKey: ['formasPago'],
        queryFn: ()=> API.formasPago.list(userData && userData.token),
        select: (data) => FormasPagoResponse.fromJSON(data),
    })


    
    
    
    return {listado : data ? data.results : [], isLoading, modals, setModals, insertar : (form : FormasPagoAdd)=> mutateAsync(form) , isPending}
}

export default useFormasPago;