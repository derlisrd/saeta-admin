import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { AddCategoria, AddCategoriaResponse } from "@/services/dto/productos/AddCategoria";
import { CategoriaResponse } from "@/services/dto/productos/categoria";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function useAddCategoria() {

    const {userData} = useAuth()
    const queryClient = useQueryClient();

    const [form,setForm] = useState<AddCategoria>({
        nombre: "",
        descripcion: "",
        publicado: 1,
    })


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
            queryClient.setQueryData<CategoriaResponse>(["categoriasAddProducto", userData && userData?.token], (old) => {
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


    return {form,setForm, addCategoria, isPendingAdd : isPending}
}

export default useAddCategoria;