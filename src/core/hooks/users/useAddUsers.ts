import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { UserCreateForm, UserListResults } from "@/services/dto/users/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddUsers() {

    const queryClient = useQueryClient();
    const {userData} = useAuth()

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async(form: UserCreateForm) => {
            // Asumiendo que existe un método para insertar impresoras en tu API
            const res = await API.users.create(userData && userData.token, form);
            return res;
        },
        onSuccess: (data) => {
            // Invalidar y refrescar la caché
            queryClient.invalidateQueries({ queryKey: ['users'] });
            
            // Alternativa: Actualizar la caché manualmente sin hacer una nueva solicitud
            
            queryClient.setQueryData(['impresoras'], (old: UserListResults[] | undefined) => {
                if (!old) return [data.results];
                return [...old, data.results];
            });
            
        }
    });

    const insertar = async(form: UserCreateForm) => {
        return mutateAsync(form);
    }
    
    return { isPending, insertar}
}

export default useAddUsers;