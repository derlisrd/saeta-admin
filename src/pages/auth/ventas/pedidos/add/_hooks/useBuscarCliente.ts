import { useAuth } from "@/providers/AuthProvider";
import { apiServiceClientes } from "@/services/api/clientes/clientes";
import { SearchClienteResults } from "@/services/dto/clientes/search";
import { useState,  useEffect } from "react";

function useBuscarCliente() {
    const { userData } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [q, setQ] = useState('')
    const [listaBusqueda, setLista] = useState<{ label: string; id: number }[]>([]);
        // poner en un usecallback

    useEffect(() => {

        const timer = 
        setTimeout(async()=>{
            if(q === '') return setLista([])
          setIsLoading(true)
          const res = await apiServiceClientes.search(userData && userData?.token, q);
            setIsLoading(false);
            if (res.results) {
                const lista = res.results.map((cliente: SearchClienteResults) => ({
                    label: `${cliente.doc} ${cliente.nombres} ${cliente.apellidos}`,
                    id: cliente.id,
                }));
                setLista(lista);
            }
          setIsLoading(false)
        },500)
        return ()=> clearTimeout(timer)
    }, [q]);

    return {  listaBusqueda, isLoading, q, setQ};
}

export default useBuscarCliente;
