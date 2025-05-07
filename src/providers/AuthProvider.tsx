import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { LoginResults } from "@/services/dto/auth/login";
import API from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define el tipo para el contexto
type AuthContextType = {
  isAuth: boolean;
  userData: LoginResults | null;
  iniciarSesion: (data: LoginResults | null, mantener?: boolean) => void;
  cerrarSesion: () => void;
  loading: boolean;
  updateUserData: (data: LoginResults) => void;
  refreshTokenFn: () => Promise<void>; // Modificamos para no recibir el token directamente
  isRefreshingToken: boolean; // Nuevo estado para indicar si se está refrescando el token
};

// Contexto inicializado como undefined para ser manejado correctamente por useContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { current: getSessionUserData, setItemValue: setSessionUserData } = useSessionStorage<LoginResults | null>("userData", null);
  const queryClient = useQueryClient();

  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<LoginResults | null>(null);
  const [isRefreshingToken, setIsRefreshingToken] = useState(false); // Nuevo estado

  const updateUserData = (data: LoginResults) => {
    setUserData(data);
    setSessionUserData(data);
  };

  // Función para iniciar sesión
  const iniciarSesion = useCallback(
    (data: LoginResults | null, mantener?: boolean) => {
      if (data !== null) {
        setIsAuth(true);
        setUserData(data);
        if (mantener) setSessionUserData(data);
      }
    },
    [setSessionUserData]
  );

  // Función para cerrar sesión
  const cerrarSesion = useCallback(() => {
    setIsAuth(false);
    setUserData(null);
    setSessionUserData(null);
    localStorage.removeItem("pedidoStore");
    queryClient.removeQueries({ queryKey: ["checkAuth"] });
  }, [setSessionUserData, queryClient]);

  const isTokenExpired = (token: string): boolean => {
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
  };

  const refreshTokenMutate = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: async () => {
      const storedUserData = getSessionUserData();
      if (storedUserData?.refreshToken) {
        return await API.auth.refreshToken("Bearer " + storedUserData.refreshToken);
      }
      return null;
    },
    onMutate: () => {
      setIsRefreshingToken(true); // Indicar que se está refrescando el token
    },
    onSettled: (data) => {
      setIsRefreshingToken(false); // Indicar que la renovación terminó
      if (data?.results && userData) {
        const updatedUserData = { ...userData, token: data.results.token, refreshToken: data.results.refreshToken };
        updateUserData(updatedUserData);
        // Actualizar la caché de la consulta 'checkAuth' con el nuevo token
        queryClient.setQueryData(["checkAuth"], updatedUserData);
      }
      if (data && data.results == null) {
        cerrarSesion();
      }
    },
    onError: () => {
      setIsRefreshingToken(false); // Indicar que la renovación terminó (con error)
      cerrarSesion();
    },
  });

  const refreshTokenFn = useCallback(async () => {
    if (!refreshTokenMutate.isPending) {
      await refreshTokenMutate.mutateAsync();
    }
  }, [refreshTokenMutate]);

  const { isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: async () => {
      const storedUserData = getSessionUserData();
      if (storedUserData && storedUserData !== null) {
        if (!storedUserData.token) {
          cerrarSesion();
          return null;
        }
        if (isTokenExpired(storedUserData.token)) {
          await refreshTokenFn();
          const updatedStoredUserData = getSessionUserData();
          return updatedStoredUserData || null; // Retornar el usuario actualizado o null si falla el refresh
        }
        iniciarSesion(storedUserData);
        return storedUserData;
      }
      return null;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 5 * 60 * 1000,
  });

  return (
    <AuthContext.Provider
      value={{
        refreshTokenFn,
        isAuth,
        userData,
        iniciarSesion,
        cerrarSesion,
        loading: isLoading || isRefreshingToken, // Incluir el estado de refresco en el loading general
        updateUserData,
        isRefreshingToken,
      }}
    >
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
  const { isAuth, userData, iniciarSesion, cerrarSesion, loading, updateUserData, refreshTokenFn, isRefreshingToken } = context;
  return { isAuth, userData, iniciarSesion, cerrarSesion, loading, updateUserData, refreshTokenFn, isRefreshingToken };
};
