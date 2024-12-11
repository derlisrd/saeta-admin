import API from "@/services/api";
import useAuthStore from "@/store/authStore";
import { useState } from "react";

function useLogin() {
    const {iniciarSesion} = useAuthStore()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [hide,setHide] = useState(true)

    const [error,setError] = useState({code: 0, message: ''})
    const [isLoading,setIsLoading] = useState(false)
    
    const clearError = ()=>setError({code: 0, message: ''})
    const toggleHide = ()=>{
        setHide(!hide)
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
    }
    const handleLogin = async()=>{
        setIsLoading(true)
        const res = await API.auth.login(username,password)
        setIsLoading(false)
        
        if(!res.success){
            setError({code: res.status, message: res.message})
            return false;
        }

        iniciarSesion(res.results,true)
    }

    return { username,setUsername,password,setPassword, handleLogin, error, isLoading, clearError, hide,toggleHide }
}

export default useLogin;