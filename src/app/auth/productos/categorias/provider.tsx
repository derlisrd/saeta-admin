import API from "@/services/api";
import CategoriasContext, { CategoriasModals } from "./context";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AddCategoria, AddCategoriaResponse } from "@/services/dto/productos/AddCategoria";
import { CategoriaResponse } from "@/services/dto/productos/categoria";

function CategoriasProvider({ children }: { children: React.ReactNode }) {
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const [modals, setModals] = useState<CategoriasModals>({
    crear: false,
    editar: false,
    eliminar: false,
  });

  const handleModal = (modal: keyof CategoriasModals) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const { mutate, isPending } = useMutation<AddCategoriaResponse, Error, AddCategoria>({
    mutationFn: async (form: AddCategoria) => {
      return API.categorias.create(userData && userData?.token, form);
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["categorias", userData && userData?.token] });

      const previousCategorias = queryClient.getQueryData(["categorias", userData && userData?.token]);

      return { data, previousCategorias };
    },
    onError: (context, error) => {
      console.log(context, error);
      // Si la mutación falla, revierte la lista de categorías al estado anterior
      /* if (context?.previousCategorias) {
        queryClient.setQueryData(['categorias', userData?.token], context.previousCategorias);
      } */
    },
    onSuccess: (data) => {
      if (data.success && data.results) {
        handleModal("crear");
        queryClient.setQueryData<CategoriaResponse>(["categorias", userData && userData?.token], (old) => {
          if (old) {
            let oldData = old.results || [];
            oldData.push({
              id: data.results?.id || 0,
              nombre: data.results?.nombre || "",
              publicado: data.results?.publicado || 0,
              descripcion: data.results?.descripcion || "",
            });
            return {
              ...old,
              results: oldData,
            };
          }
          return old;
        });
      }
    },
    onSettled: (data) => {
      console.log(data?.results);
      // Recarga los datos para asegurarte de que estén sincronizados con el servidor
      // queryClient.invalidateQueries({ queryKey: ["categorias", userData?.token] });
    },
  });

  const addCategoria = async (form: AddCategoria) => {
    mutate(form);
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categorias", userData && userData.token],
    queryFn: () => API.categorias.list(userData && userData.token),
    enabled: !!(userData && userData.token),
    staleTime: 1000 * 60 * 5,
  });

  const values = {
    lista: data?.results ?? [],
    isLoading,
    error,
    refetch,
    handleModal,
    modals,
    addCategoria,
    isPendingAdd: isPending,
  };
  return <CategoriasContext.Provider value={values}>{children}</CategoriasContext.Provider>;
}

export default CategoriasProvider;
