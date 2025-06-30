import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { LoginResults } from "@/services/dto/auth/login";
import API from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Define el tipo para el contexto
type AuthContextType = {
  isAuth: boolean;
  userData: LoginResults | null;
  iniciarSesion: (data: LoginResults | null, mantener?: boolean) => void;
  cerrarSesion: () => void;
  loading: boolean;
  updateUserData: (data: LoginResults) => void;
};

// Contexto inicializado como undefined para ser manejado correctamente por useContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [isAuthInternal, setIsAuthInternal] = useState(false);
  const [userDataInternal, setUserDataInternal] = useState<LoginResults | null>(null);
  const queryClient = useQueryClient();

  const updateUserDataInternal = useCallback((data: LoginResults) => {
    setUserDataInternal(data);
    window.sessionStorage.setItem("userData", JSON.stringify(data));
  }, []);

  const iniciarSesionInternal = useCallback(
    (data: LoginResults | null, mantener?: boolean) => {
      if (data !== null) {
        setIsAuthInternal(true);
        setUserDataInternal(data);
        if (mantener) {
          window.sessionStorage.setItem("userData", JSON.stringify(data));
        }
      }
    },
    []
  );

  const cerrarSesionInternal = () => {
    setIsAuthInternal(false);
    setUserDataInternal(null);
    window.sessionStorage.removeItem('userData')
    localStorage.removeItem("pedidoStore");
    queryClient.removeQueries({ queryKey: 'checkAuth' }) // Limpia la query al cerrar sesión
  }

  /* const isTokenExpiredFn = (token: string): boolean => {
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
  } */

  /* const refreshTokenFnInternal = useCallback(async (refreshToken: string) => {
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
  }, [API.auth, userDataInternal, updateUserDataInternal, cerrarSesionInternal]); */

  const { isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: async () => {
      const localData = window.sessionStorage.getItem("userData");

      if (localData) {
        const localDataParsed = JSON.parse(localData) as LoginResults;
        /* if (isTokenExpiredFn(localDataParsed.token)) {
          const resfresh = await API.auth.refreshToken("Bearer " + localDataParsed.refreshToken);
          if (resfresh && resfresh.success && resfresh.results) {
            const newUserData = { ...localDataParsed, token: resfresh.results.token, refreshToken: resfresh.results.refreshToken };
            updateUserDataInternal(newUserData);
            return newUserData;
          }
        } */
        if (localDataParsed.refreshToken) {
          const res = await API.auth.refreshToken("Bearer " + localDataParsed.refreshToken);
          if (res && res.success && res.results) {
            const newUserData = { ...localDataParsed, token: res.results.token, refreshToken: res.results.refreshToken };
            iniciarSesionInternal(newUserData, true);
            return localData;
          }
        }
      }
      return null;
    },
    throwOnError() {
      window.sessionStorage.removeItem("userData");
      queryClient.clear();
      window.location.reload()
      return true
    },
    retry: 1,
    staleTime: 30 * 60000,
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 60000, // Refrescar si el token es válido y tiene un refreshToken
  });

  const values = {
    isAuth: isAuthInternal,
    userData: userDataInternal,
    iniciarSesion: iniciarSesionInternal,
    cerrarSesion: cerrarSesionInternal,
    loading: isLoading,
    updateUserData: updateUserDataInternal
  };


  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};


// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
