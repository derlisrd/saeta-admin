import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { apiServiceAuth } from "@/services/api/auth/auth";
import { LoginResults } from "@/services/dto/login";

// Define el tipo para el contexto
type AuthContextType = {
  isAuth: boolean;
  userData: LoginResults | null;
  iniciarSesion: (data: LoginResults | null, mantener?: boolean) => void;
  cerrarSesion: () => void;
  loading: boolean;
};

// Contexto inicializado como undefined para ser manejado correctamente por useContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setItemValue: setSessionUserData, current: sessionUserData } = useSessionStorage<LoginResults | null>("userData", null);

  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<LoginResults | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, [setSessionUserData]);

  // Función para verificar autenticación
  const checkIsAuth = useCallback(async () => {
    setLoading(true);
    if (sessionUserData !== null) {
      const res = await apiServiceAuth.check(sessionUserData.token);
      if (res) {
        iniciarSesion(sessionUserData);
      }
    }
    setLoading(false);
  }, []);

  // Verificación inicial en el montaje del componente
  useEffect(() => {
    checkIsAuth();
  }, [checkIsAuth]);

  return <AuthContext.Provider value={{ isAuth, userData, iniciarSesion, cerrarSesion, loading }}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  const { isAuth, userData, iniciarSesion, cerrarSesion, loading } = context;
  return { isAuth, userData, iniciarSesion, cerrarSesion, loading };
};
