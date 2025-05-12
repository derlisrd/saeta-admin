import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { Impresora } from "@/services/dto/config/impresora";
import { useMutation, useQuery,useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

function useImpresoras() {
    
    const {userData} = useAuth()
    const queryClient = useQueryClient();



    const {data, isLoading} = useSuspenseQuery({
        queryKey: ['impresoras'],
        queryFn: async() => {
            const res = await API.config.impresoras(userData && userData.token);
            if(res.success){
                return res.results
            }
            return []
        },
        staleTime: 1000 * 60 * 5
    });

    const {mutate, isPending} = useMutation({
        mutationFn: async(form: Impresora) => {
            // Asumiendo que existe un método para insertar impresoras en tu API
            return await API.config.insertarImpresora(userData && userData.token, form);
        },
        onSuccess: (data) => {
            // Invalidar y refrescar la caché
            queryClient.invalidateQueries({ queryKey: ['impresoras'] });
            
            // Alternativa: Actualizar la caché manualmente sin hacer una nueva solicitud
            
            queryClient.setQueryData(['impresoras'], (old: Impresora[] | undefined) => {
                if (old) {
                    return [...old, data.results];
                }
                return [data.results];
            });
            
        }
    });

    const insertar = async(form: Impresora) => {
        return mutate(form);
    }
    
    return {lista: data, isLoading, isPending, insertar}
}

export default useImpresoras;