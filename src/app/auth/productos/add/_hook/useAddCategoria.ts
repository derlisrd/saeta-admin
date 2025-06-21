import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { AddCategoria, AddCategoriaResponse } from "@/services/dto/productos/AddCategoria";
import { CategoriaResponse } from "@/services/dto/productos/categoria";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


function useAddCategoria() {

    const {userData} = useAuth()
    const queryClient = useQueryClient();

    const [agregado,setAgregado] = useState(false)

    const [form,setForm] = useState<AddCategoria>({
        nombre: "",
        descripcion: "",
        publicado: 1,
    })




    const { mutate, isPending, isSuccess } = useMutation<AddCategoriaResponse,Error,AddCategoria>({
        mutationFn: async (form: AddCategoria) => {
          return API.categorias.create(userData && userData?.token, form);
        },
        onMutate: async () => {
          // await queryClient.cancelQueries({ queryKey: ["allData",userData && userData?.token] });
        },
        onError: () => {
        },
        onSuccess: (data: AddCategoriaResponse) => {
          if (data.success && data.results) {
            queryClient.setQueryData(["categorias"], (oldData: CategoriaResponse | undefined) => {
              if (!oldData) return oldData;
              const todosLosDatos = oldData.results ? [...oldData.results, data.results] : [data.results];
              return {
                ...oldData,
                results: todosLosDatos
              };
            });
          }
        },
        onSettled: (data: AddCategoriaResponse | undefined) => {
          // Invalida la consulta para asegurarse de que los datos estén sincronizados
          if(data){
            setAgregado(true)
          }
        },
      });
    
      const addCategoria = async (form: AddCategoria) => {
        mutate(form);
      };


  return { form, setForm, addCategoria, isPendingAdd: isPending, isSuccess, setAgregado, agregado };
}

export default useAddCategoria;