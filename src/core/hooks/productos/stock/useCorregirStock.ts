import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useCorregirStock(deposito_id:number, producto_id:number) {
    const {userData} = useAuth()
    const [cantidad,setCantidad] = useState<number>(0);
    
    
    const {isPending, mutateAsync} = useMutation({
        mutationKey: ["corregirStock"],
        mutationFn: ()=> API.stock.corregiRoReponer(userData && userData.token, deposito_id, producto_id, cantidad),
        /* onSettled: (data)=>{
            console.log(data)
        } */
    })

    const corregir = async () => {
        // validar primero
        if (cantidad <= 0) {
            return {
                success: false,
                message: "La cantidad debe ser mayor a 0"
            };
        }
        
        try {
            return await mutateAsync();
        } catch (error) {
            return {
                success: false,
                message: "Error al corregir el stock"
            };
        }
    };
    return {
        setCantidad,
        corregir,
        isPending
    }
}

export default useCorregirStock;