import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { SearchClienteResults } from "@/services/dto/clientes/search";
import { useState, useEffect, useCallback, useDeferredValue } from "react";

function useBuscarCliente() {
    const { userData } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [q, setQ] = useState("");
    const [listaBusqueda, setLista] = useState<{ label: string; id: number }[]>([]);
const deferredQ = useDeferredValue(q); 
    // Función optimizada con useCallback
    const buscar = useCallback(async () => {
        if (!deferredQ.trim()) {
            setLista([]);
            return;
        }
        setIsLoading(true);
        try {
            const res = await API.clientes.search(userData && userData.token, deferredQ);
            
            if (res.results) {
                const lista = res.results.map((cliente: SearchClienteResults) => ({
                    label: `${cliente.doc} ${cliente.razon_social}`,
                    id: cliente.id,
                }));
                setLista(lista);
            }
        } catch (error) {
            console.error("Error al buscar productos:", error);
            setLista([]);
        } finally {
            setIsLoading(false);
        }


    }, [deferredQ, userData?.token]);// Se ejecutará solo si q o userData?.token cambian

    useEffect(() => {
        // Solo realizamos la búsqueda si hay un valor diferido
        if (deferredQ.trim() !== "") {
            const timer = setTimeout(() => {
                buscar();
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [deferredQ, buscar]);// Ahora el useEffect depende de buscarClientes

    return { listaBusqueda, isLoading, q, setQ };
}

export default useBuscarCliente;
