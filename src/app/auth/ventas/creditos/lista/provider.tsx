import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { CreditosResults } from "@/services/dto/pedidos/creditos";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

type modalsType = {
    imprimir: boolean
    filtros: boolean;
}

type ListaCreditosContextType = {
    lista: CreditosResults[];
    isLoading: boolean;
    refetch: () => void;
    desde: string;
    hasta: string;
    setDesde: React.Dispatch<React.SetStateAction<string>>;
    setHasta: React.Dispatch<React.SetStateAction<string>>;
    selectedRow: CreditosResults | null;
    setSelectedRow: (row: CreditosResults | null) => void;
    modals: modalsType;
    handleModals: (modal: keyof modalsType) => void;
};

const ListaCreditosContext = createContext<ListaCreditosContextType | undefined>(undefined);

export function ListaCreditosProvider({ children }: { children: React.ReactNode }) {

    const { userData } = useAuth()

    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [selectedRow, setSelectedRow] = useState<CreditosResults | null>(null)
    const [modals, setModals] = useState<modalsType>({
        imprimir: false,
        filtros: false,
    });
    const handleModals = (modal: keyof modalsType) => setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));


    const { isLoading, refetch, isFetching, data } = useSuspenseQuery({
        queryKey: ['listaCreditos'],
        queryFn: () => API.creditos.lista(userData && userData.token, desde, hasta),
        select: (res) => res?.success && res.results ? res.results : [],
        staleTime: 1000 * 60 * 5,
    });




    const values = useMemo(() => ({
        lista: data || [],
        isLoading: isLoading || isFetching,
        refetch,
        desde, hasta, setDesde, setHasta,
        selectedRow, setSelectedRow,
        modals, handleModals,
    }), [
        data, isLoading, isFetching,
        desde, hasta, selectedRow, modals
    ]);

    return <ListaCreditosContext.Provider value={values}>{children}</ListaCreditosContext.Provider>;
}


export function useListaCreditosContext() {
    const context = useContext(ListaCreditosContext);
    if (!context) {
        throw new Error("useListaCreditosContext debe ser usado dentro de un ListaCreditosProvider");
    }
    return context;
}
