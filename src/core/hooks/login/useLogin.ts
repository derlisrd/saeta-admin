import API from "@/services/api";
import useAuthStore from "@/store/authStore";
import { useState } from "react";

function useLogin() {
    const {iniciarSesion} = useAuthStore()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState({code: 0, message: ''})
    const [isLoading,setIsLoading] = useState(false)
    const clearError = ()=>setError({code: 0, message: ''})

    const handleLogin = async()=>{
        setIsLoading(true)
        const res = await API.auth.login(username,password)
        setIsLoading(false)
        
        if(!res.success){
            setError({code: res.status, message: res.message})
            return false;
        }

        iniciarSesion(res.results)
    }

    return { username,setUsername,password,setPassword, handleLogin, error, isLoading, clearError }
}

export default useLogin;