import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { AddCategoria, AddCategoriaResponse } from "@/services/dto/productos/AddCategoria";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AllData from "../_types/allData";

function useAddCategoria() {

    const {userData} = useAuth()
    const queryClient = useQueryClient();

    const [form,setForm] = useState<AddCategoria>({
        nombre: "",
        descripcion: "",
        publicado: 1,
    })


    const { mutate, isPending } = useMutation<AddCategoriaResponse,Error,AddCategoria>({
        mutationFn: async (form: AddCategoria) => {
          return API.categorias.create(userData && userData?.token, form);
        },
        onMutate: async () => {
          await queryClient.cancelQueries({ queryKey: ["allData",userData && userData?.token] });
        },
        onError: () => {
        },
        onSuccess: (data: AddCategoriaResponse) => {
          if (data.success && data.results) {
            queryClient.setQueryData(["allData", userData && userData?.token], (oldData: AllData | undefined) => {
              if (!oldData) return oldData;
      
              return {
                ...oldData,
                categorias: [...oldData.categorias, data.results], // Se agrega la nueva categoría
              };
            });
          }
        },
        onSettled: () => {
          // Invalida la consulta para asegurarse de que los datos estén sincronizados
          queryClient.cancelQueries({ queryKey: ["allData",userData && userData?.token] });
        },
      });
    
      const addCategoria = async (form: AddCategoria) => {
        mutate(form);
      };


    return {form,setForm, addCategoria, isPendingAdd : isPending}
}

export default useAddCategoria;