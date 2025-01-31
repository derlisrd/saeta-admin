import API from "@/services/api";
import CategoriasContext, { CategoriasModals } from "./context";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { CategoriaResults } from "@/services/dto/productos/categoria";
import { useState } from "react";

function CategoriasProvider({ children }: { children: React.ReactNode }) {
  const { userData } = useAuth();

  const [modals, setModals] = useState<CategoriasModals>({
    crear: false,
    editar: false,
    eliminar: false,
  });

  const handleModal = (modal: keyof CategoriasModals) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categorias", userData && userData.token],
    queryFn: () => API.categorias.list(userData && userData.token),
    enabled: !!(userData && userData.token), // Solo ejecuta la consulta si hay un token válido
    staleTime: 1000 * 60 * 5, // Cachea los datos por 5 minutos
  });

  const lista: CategoriaResults[] | null = data?.results ?? null;

  const values = {
    lista,
    isLoading,
    error,
    refetch,
    handleModal,
    modals,
  };
  return <CategoriasContext.Provider value={values}>{children}</CategoriasContext.Provider>;
}

export default CategoriasProvider;
