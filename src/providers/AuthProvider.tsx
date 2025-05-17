import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { LoginResults } from "@/services/dto/auth/login";
import useAuthenticatedQuery from "@/hooks/useAutenticatedQuery";

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
  const authQuery = useAuthenticatedQuery();

  return (
    <AuthContext.Provider value={{ ...authQuery }}>
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
