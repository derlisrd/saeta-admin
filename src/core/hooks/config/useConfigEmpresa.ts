import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { Empresa } from "@/services/dto/login";
import { useEffect, useState } from "react";

function useConfigEmpresa() {
  const { userData, updateUserData } = useAuth();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState({ active: false, message: "" });
  const [error, setError] = useState({ code: 0, message: "" });
  const clearSuccess = () => {
    setSuccess({ active: false, message: "" });
  };
  const clearError = () => {
    setError({ code: 0, message: "" });
  };

  const onChange = (name: string, value: any) => {
    if (empresa) {
      setEmpresa({ ...empresa, [name]: value });
    }
  };

  const updateEmpresa = async () => {
    if (!empresa?.nombre) {
      setError({ code: 1, message: "El nombre de la empresa es requerido" });
      return;
    }
    if (!empresa?.ruc) {
      setError({ code: 2, message: "El RUC de la empresa es requerido" });
      return;
    }
    if (!empresa?.telefono) {
      setError({ code: 3, message: "El teléfono de la empresa es requerido" });
      return;
    }
    if (!empresa?.direccion) {
      setError({ code: 4, message: "La dirección de la empresa es requerida" });
      return;
    }

    setLoading(true);
    const response = await API.config.updateEmpresa(empresa, userData && userData?.token);
    setLoading(false);

    if (!response.success) {
      setError({ code: 8, message: response.message });
      return;
    }

    if (userData) {
      const newdata = { ...userData };
      newdata.empresa = empresa;
      updateUserData(newdata);
    }
    setSuccess({ active: true, message: response.message });
  };

  useEffect(() => {
    if (userData) {
      setEmpresa(userData.empresa);
      setLoading(false);
    }
  }, [userData]);

  return {
    empresa,
    loading,
    clearError,
    error,
    updateEmpresa,
    success,
    clearSuccess,
    onChange
  };
}

export default useConfigEmpresa;
