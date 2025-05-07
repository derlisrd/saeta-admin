import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { UserCreateForm } from "@/services/dto/users/user";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useAddUsers() {

    const {userData} = useAuth()
    const initialMessage = null
    const [message,setMessage] = useState<{name: string, descripcion: string, severity?: "error" | "success" | "info" | "warning"} | null>(initialMessage)

    const clearMessage = () => setMessage(initialMessage)

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async(form: UserCreateForm) => {
            const f = {...form, empresa_id: userData ? userData.empresa.id : 0}
            const res = await API.users.create(userData && userData.token, f);
            return res;
        },
        onSettled(data) {
            if(data && data.success){
                setMessage({name: "Usuario creado", descripcion: "El usuario se ha creado correctamente", severity: "success"})
                return
            }
            setMessage({name: "Error", descripcion: data ? data.message : 'Ocurrio un error al crear al usuario', severity: "error"})
        },
    });

    const insertar = async(form: UserCreateForm) => mutateAsync(form);
    
    
    return { isPending, insertar, message, clearMessage}
}

export default useAddUsers;