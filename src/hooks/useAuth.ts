import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

function useAuth() {
    const {isAuth} = useContext(AuthContext)
    return {isAuth}
}

export default useAuth;