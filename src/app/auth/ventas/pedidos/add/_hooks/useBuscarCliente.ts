import { useAuth } from "@/providers/AuthProvider";
import { apiServiceClientes } from "@/services/api/clientes/clientes";
import { SearchClienteResults } from "@/services/dto/clientes/search";
import { useState, useEffect, useCallback } from "react";

function useBuscarCliente() {
    const { userData } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [q, setQ] = useState("");
    const [listaBusqueda, setLista] = useState<{ label: string; id: number }[]>([]);

    // Función optimizada con useCallback
    const buscarClientes = useCallback(async () => {
        if (q === "") {
            setLista([]);
            return;
        }
        setIsLoading(true);
        const res = await apiServiceClientes.search(userData && userData.token, q);
        setIsLoading(false);
        
        if (res.results) {
            const lista = res.results.map((cliente: SearchClienteResults) => ({
                label: `${cliente.doc} ${cliente.razon_social}`,
                id: cliente.id,
            }));
            setLista(lista);
        }
    }, [q, userData?.token]); // Se ejecutará solo si q o userData?.token cambian

    useEffect(() => {
        const timer = setTimeout(() => {
            buscarClientes();
        }, 500);

        return () => clearTimeout(timer);
    }, [buscarClientes]); // Ahora el useEffect depende de buscarClientes

    return { listaBusqueda, isLoading, q, setQ };
}

export default useBuscarCliente;
