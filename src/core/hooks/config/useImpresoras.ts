import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { Impresora } from "@/services/dto/config/impresora";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";

function useImpresoras() {
    
    const {userData} = useAuth()
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ['impresoras'],
        queryFn: async() => {
            const res = await API.config.impresoras(userData && userData.token);
            if(res.success){
                return res.results
            }
            return []
        },
        enabled: Boolean(userData && userData?.token), 
        staleTime: 1000 * 60 * 5
    });

    const insertarMutation = useMutation({
        mutationFn: async(form: Impresora) => {
            // Asumiendo que existe un método para insertar impresoras en tu API
            const res = await API.config.insertarImpresora(userData && userData.token, form);
            return res;
        },
        onSuccess: (data) => {
            // Invalidar y refrescar la caché
            queryClient.invalidateQueries({ queryKey: ['impresoras'] });
            
            // Alternativa: Actualizar la caché manualmente sin hacer una nueva solicitud
            
            queryClient.setQueryData(['impresoras'], (old: Impresora[] | undefined) => {
                if (!old) return [data.results];
                return [...old, data.results];
            });
            
        }
    });

    const insertar = async(form: Impresora) => {
        return insertarMutation.mutateAsync(form);
    }
    
    return {lista: data, isLoading : isLoading || insertarMutation.isPending, insertar}
}

export default useImpresoras;