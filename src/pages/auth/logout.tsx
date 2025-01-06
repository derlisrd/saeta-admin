import Loading from "@/core/components/ui/loading";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const { cerrarSesion } = useAuthStore();
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
