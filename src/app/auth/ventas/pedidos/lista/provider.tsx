import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { PedidosDelDiaResults } from "@/services/dto/pedidos/pedidosDelDia";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

type modalsType = {
    imprimir: boolean
    filtros: boolean;
}

type ListaPedidosContextType = {
    lista: PedidosDelDiaResults[];
    isLoading: boolean;
    refetch: () => void;
    desde: string;
    hasta: string;
    setDesde: React.Dispatch<React.SetStateAction<string>>;
    setHasta: React.Dispatch<React.SetStateAction<string>>;
    selectedRow: PedidosDelDiaResults | null;
    setSelectedRow: (row: PedidosDelDiaResults | null) => void;
    modals: modalsType;
    handleModals: (modal: keyof modalsType) => void;
};

const ListaPedidosContext = createContext<ListaPedidosContextType | undefined>(undefined);

export function ListaPedidosProvider({ children }: { children: React.ReactNode }) {

    const { userData } = useAuth()

    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [selectedRow, setSelectedRow] = useState<PedidosDelDiaResults | null>(null)
    const [modals, setModals] = useState<modalsType>({
        imprimir: false,
        filtros: false,
    });
    const handleModals = (modal: keyof modalsType) => setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));


    const { refetch, isFetching, data, isLoading } = useSuspenseQuery({
        queryKey: ['listaPedidos'],
        queryFn: async () => API.pedidos.lista(userData && userData.token, desde, hasta),
        select: (data) => {
            if (data && data.success && data.results !== null) {
                return data.results;
            }
            return [];
        },
        //enabled: Boolean(userData && userData?.token),
        staleTime: 1000 * 60 * 5 // 5 minutos
    })




    const values: ListaPedidosContextType = {
        lista: data || [],
        isLoading: isFetching || isLoading,
        refetch,
        setSelectedRow,
        selectedRow,
        setDesde,
        setHasta,
        desde,
        hasta,
        handleModals,
        modals
    };

    return <ListaPedidosContext.Provider value={values}>{children}</ListaPedidosContext.Provider>;
}

export function useListaPedidosContext() {
    const context = useContext(ListaPedidosContext);
    if (!context) {
        throw new Error("useListaProductosContext debe ser usado dentro de un ListaProductosProvider");
    }
    return context;
}
