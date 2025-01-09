import { useAuth } from "@/providers/AuthProvider";
import { Empresa } from "@/services/dto/login";
import { useEffect, useState } from "react";

function useConfigEmpresa() {

    const {userData} = useAuth()
    const [empresa, setEmpresa] = useState<Empresa | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    

    useEffect(() => {
        if(userData){
            setEmpresa(userData.empresa)
            setLoading(false)
        }
    }, [userData])

    return {
        empresa,loading
    }
}

export default useConfigEmpresa;