import { useState } from "react";
import ClientesContext from "./context";
import { ClientesModals } from "./types/clientesmodals";
import API from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { AddCliente } from "@/services/dto/clientes/AddCliente";
import { AddClienteRensponse } from "@/services/dto/clientes/AddClienteResponse";
import { ClientesResponse } from "@/services/dto/clientes/clientes";

function ClientesProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { userData } = useAuth();

  const [error, setError] = useState<Error | null>(null);

  const [modals, setModals] = useState<ClientesModals>({
    crear: false,
    editar: false,
    eliminar: false,
  });

  const handleModal = (key: keyof ClientesModals) => {
    setModals((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { mutate, isPending } = useMutation<AddClienteRensponse, Error, AddCliente>({
    mutationFn: async (form: AddCliente) => {
      return API.clientes.create(userData && userData?.token, form);
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["clientes", userData && userData?.token] });

      const prevClientes = queryClient.getQueryData(["clientes", userData && userData?.token]);

      return { data, prevClientes };
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
        queryClient.setQueryData<ClientesResponse>(["clientes", userData && userData?.token], (old) => {
          if (old) {
            let oldData = old.results || [];
            let newData = data.results;
            if (newData && newData !== null) {
              oldData.push({
                id: newData.id,
                razon_social: newData.razon_social,
                nombres: newData.nombres,
                apellidos: newData.apellidos,
                doc: newData.doc,
                extranjero: newData.extranjero,
                telefono: newData.telefono,
                email: newData.email,
              });
            }
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
      if (data && !data.success) {
        setError({ name: "error_add", message: data.message });
        return;
      }
      setError(null);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["clientes", userData && userData.token],
    queryFn: () => API.clientes.list(userData && userData.token),
    enabled: !!(userData && userData.token),
    staleTime: 1000 * 60 * 5,
  });

  const addSubmit = async (form: AddCliente) => {
    mutate(form);
  };

  const values = {
    modals,
    lista: data ? data.results : [],
    handleModal,
    isLoading,
    isPendingAdd: isPending,
    addSubmit,
    error,
  };
  return <ClientesContext.Provider value={values}>{children}</ClientesContext.Provider>;
}

export default ClientesProvider;
