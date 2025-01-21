import { useAuth } from "@/providers/AuthProvider";
import { apiServiceClientes } from "@/services/api/clientes/clientes";
import { SearchClienteResults } from "@/services/dto/clientes/search";
import { useState, useRef, useCallback } from "react";

function useBuscarCliente() {
    const { userData } = useAuth();
    const [listaBusqueda, setLista] = useState<{ label: string; id: number }[]>([]);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const buscarCliente = useCallback((value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            const res = await apiServiceClientes.search(userData && userData?.token, value);
            if (res.results) {
                const lista = res.results.map((cliente: SearchClienteResults) => ({
                    label: `${cliente.doc} ${cliente.nombres} ${cliente.apellidos}`,
                    id: cliente.id,
                }));
                setLista(lista);
            }
        }, 600); // Espera 500ms antes de ejecutar la búsqueda
    }, [userData?.token]);

    return { buscarCliente, listaBusqueda };
}

export default useBuscarCliente;
