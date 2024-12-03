import { createContext } from "react";

interface AuthContextValuesType {
  isAuth: boolean;
}

const AuthContext = createContext<AuthContextValuesType>({
  isAuth: false,
});

export default AuthContext;
