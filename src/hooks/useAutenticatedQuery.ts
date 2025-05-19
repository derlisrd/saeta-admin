import API from "@/services/api";
import { LoginResults } from "@/services/dto/auth/login";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useSessionStorage } from "./useSessionStorage";

const useAuthenticatedQuery = () => {
    const { setItemValue: setSessionUserData } = useSessionStorage<LoginResults | null>("userData", null);
    const [isAuthInternal, setIsAuthInternal] = useState(false);
    const [userDataInternal, setUserDataInternal] = useState<LoginResults | null>(null);
    const queryClient = useQueryClient();
  
    const updateUserDataInternal = useCallback((data: LoginResults) => {
      setUserDataInternal(data);
      setSessionUserData(data);
    }, [setSessionUserData]);
  
    const iniciarSesionInternal = useCallback(
      (data: LoginResults | null, mantener?: boolean) => {
        if (data !== null) {
          setIsAuthInternal(true);
          setUserDataInternal(data);
          if (mantener) setSessionUserData(data);
        }
      },
      [setSessionUserData]
    );
  
    const cerrarSesionInternal = useCallback(() => {
      setIsAuthInternal(false);
      setUserDataInternal(null);
      setSessionUserData(null);
      localStorage.removeItem("pedidoStore");
      queryClient.removeQueries({queryKey: 'checkAuth'}) // Limpia la query al cerrar sesión
    }, [setSessionUserData, queryClient]);
  
    const isTokenExpiredFn = useCallback((token: string): boolean => {
      if (!token) return true;
  
      try {
        const parts = token.split(".");
        if (parts.length !== 3) return true;
        const payload = JSON.parse(atob(parts[1]));
        if (!payload.exp) return false;
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
      } catch (error) {
        console.error("Error al verificar el token:", error);
        return true;
      }
    }, []);
  
    const refreshTokenFnInternal = useCallback(async (refreshToken: string) => {
      const res = await API.auth.refreshToken("Bearer " + refreshToken);
      if (res && res.success && res.results && userDataInternal) {
        const newUserData = { ...userDataInternal, token: res.results.token, refreshToken: res.results.refreshToken };
        updateUserDataInternal(newUserData);
        return newUserData; // Importante retornar los nuevos datos
      }
      if (res && !res.success) {
        cerrarSesionInternal();
        return null;
      }
      return null;
    }, [API.auth, userDataInternal, updateUserDataInternal, cerrarSesionInternal]);
  
    const query = useQuery({
      queryKey: ["checkAuth"],
      
      queryFn: async () => {
        const localData = window.sessionStorage.getItem("userData");
        if (localData) {
            const localDataParsed = JSON.parse(localData) as LoginResults;
           
          if (isTokenExpiredFn(localDataParsed.token)) {
            const resfresh = await API.auth.refreshToken("Bearer " + localDataParsed.refreshToken);
            if (resfresh && resfresh.success && resfresh.results) {
            const newUserData = { ...localDataParsed, token: resfresh.results.token, refreshToken: resfresh.results.refreshToken };
            updateUserDataInternal(newUserData);
            return newUserData;
          }
        }
  
          const res = await API.auth.check(localDataParsed.token);
          if (res) {
            iniciarSesionInternal(localDataParsed);
            return localData;
          } else {
            cerrarSesionInternal();
            return null;
          }
        }
        return null;
      },
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchInterval: 5 * 60 * 1000,
    });
  
    return {
      isAuth: isAuthInternal,
      userData: userDataInternal,
      iniciarSesion: iniciarSesionInternal,
      cerrarSesion: cerrarSesionInternal,
      loading: query.isLoading,
      updateUserData: updateUserDataInternal,
      refreshTokenFnInternal
    };
  }

  export default useAuthenticatedQuery;