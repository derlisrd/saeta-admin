import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useLogin() {
    const { iniciarSesion } = useAuth();
    const [hide, setHide] = useState(true);
    const [error, setError] = useState({ code: 0, message: '' });
    
    const clearError = () => setError({ code: 0, message: '' });
    
    const toggleHide = () => {
        setHide(!hide);
        const input = document.getElementById("password_user") as HTMLInputElement | null;
        if (input) {
            const tipo = input.type;
            input.type = tipo === "text" ? "password" : "text";
            input.focus();

            // Para forzar que el cursor esté al final del texto
            const val = input.value;
            input.value = "";
            input.value = val;
        } else {
            console.error("Input element with id 'password_user' not found");
        }
    };

    const { isPending, mutateAsync } = useMutation({
        mutationKey: ["login"],
        mutationFn: ({ username, password }: { username: string; password: string }) => 
            API.auth.login(username, password),
        onSuccess: (data) => {
            iniciarSesion(data.results, true);
        },
        onError: (error: any) => {
            setError({ code: 400, message: error.message });
        }
    });

    const handleLogin = async (formData: { username: string; password: string }) => {
        clearError(); // Limpiar errores previos
        await mutateAsync(formData);
    };

    return { 
        handleLogin, 
        error, 
        isLoading: isPending, 
        clearError, 
        hide, 
        toggleHide 
    };
}

export default useLogin;