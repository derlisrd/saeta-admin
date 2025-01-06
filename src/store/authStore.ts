import { useSessionStorage } from "@/hooks/useSessionStorage";
import { LoginResults } from "@/services/dto/login";
import { useCallback, useEffect, useState } from "react";
import { create } from "zustand";


type authStoreType = {
    isAuth: boolean,
    setIsAuth: (value : boolean)=> void,
    userData : LoginResults | null,
    setUserData : (data : LoginResults | null) => void
}

const authStore = create<authStoreType>((set)=>({
    isAuth: false,
    setIsAuth: (newState)=> set((state)=>({...state, isAuth: newState})),
    userData: null,
    setUserData: (newState)=> set((state)=>({...state, userData: newState}))
}))


const useAuthStore = ()=>{
    const {setItemValue : setSessionUserData, current : sessionUserData} = useSessionStorage<LoginResults | null>('userData',null)
    const isAuth = authStore((state) => state.isAuth);
    const setIsAuth = authStore((state) => state.setIsAuth);
    const userData = authStore(state => state.userData)
    const setUserData = authStore(state => state.setUserData)
    const [loading,setLoading] = useState(true)

    const iniciarSesion = (data : LoginResults | null, mantener ? : boolean) => {
        if(data !== null){
            setIsAuth(true);
            setUserData(data);
            mantener && setSessionUserData(data)
        }
    }

    const cerrarSesion = ()=>{
        setIsAuth(false)
        setUserData(null)
        setSessionUserData(null)
    }

    const checkIsAuth = useCallback(async()=>{
        setLoading(true)
        if(sessionUserData !== null){
            setIsAuth(true);
            setUserData(sessionUserData);
        }
        setLoading(false)
    },[])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {checkIsAuth()}
        return () => {isActive = false;ca.abort();};
      }, [checkIsAuth]);

    return {isAuth, userData, iniciarSesion, cerrarSesion, loading}
}

export default useAuthStore