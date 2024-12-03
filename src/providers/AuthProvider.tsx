import AuthContext from "@/contexts/AuthContext";
import { ReactNode, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth] = useState(false);

  const values = { isAuth };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
