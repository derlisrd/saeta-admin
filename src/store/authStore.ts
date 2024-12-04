import { LoginResults } from "@/services/dto/login";
import { create } from "zustand";


type authStoreType = {
    isAuth: boolean,
    setIsAuth: (value : boolean)=> void,
    userData : LoginResults | null,
    setUserData : (data : LoginResults) => void
}

const authStore = create<authStoreType>((set)=>({
    isAuth: false,
    setIsAuth: (newState)=> set((state)=>({...state, isAuth: newState})),
    userData: null,
    setUserData: (newState)=> set((state)=>({...state, userData: newState}))
}))


const useAuthStore = ()=>{
    const isAuth = authStore((state) => state.isAuth);
    const setIsAuth = authStore((state) => state.setIsAuth);
    const userData = authStore(state => state.userData)
    const setUserData = authStore(state => state.setUserData)

    const iniciarSesion = (data : LoginResults) => {
        setIsAuth(true);
        setUserData(data);
    }


    return {isAuth, userData, iniciarSesion}
}

export default useAuthStore