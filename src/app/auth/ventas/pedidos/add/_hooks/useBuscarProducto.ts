import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { ProductoResults } from "@/services/dto/productos/producto";
import { useState, useEffect, useCallback, useDeferredValue } from "react";

function useBuscarProducto(deposito_id: number) {
    const { userData } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [q, setQ] = useState("");
    const [listaBusqueda, setLista] = useState<ProductoResults[]>([]);
    const deferredQ = useDeferredValue(q); 
    // Función optimizada con useCallback
    const buscar = useCallback(async () => {
        if (!deferredQ.trim()) {
            setLista([]);
            return;
        }
        
        setIsLoading(true);
        try {
            const res = await API.productos.searchPorDeposito(userData && userData?.token, deferredQ, deposito_id);
            
            if (res && res.results) {
                setLista(res.results);
            } else {
                setLista([]);
            }
        } catch (error) {
            console.error("Error al buscar productos:", error);
            setLista([]);
        } finally {
            setIsLoading(false);
        }
    }, [deferredQ, userData?.token]);

    useEffect(() => {
        // Solo realizamos la búsqueda si hay un valor diferido
        if (deferredQ.trim() !== "") {
            const timer = setTimeout(() => {
                buscar();
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [deferredQ, buscar]);

    return { listaBusqueda, isLoading, q, setQ };
}

export default useBuscarProducto;
