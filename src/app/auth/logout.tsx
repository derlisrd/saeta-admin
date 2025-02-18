import Loading from "@/core/components/ui/loading";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const { cerrarSesion } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = () => {
      navigate("/");
      cerrarSesion();
    };
    signOut();
  }, []);

  return <Loading />;
}

export default LogOut;
