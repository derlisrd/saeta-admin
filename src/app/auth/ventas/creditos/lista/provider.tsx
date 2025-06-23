import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { CreditosResults } from "@/services/dto/pedidos/creditos";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

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
        queryFn: async () => API.creditos.lista(userData && userData.token, desde, hasta),
        select: (data) => {
            if (data && data.success && data.results !== null) {
                return data.results;
            }
            return [];
        },
        retry: 2,
        //enabled: Boolean(userData && userData?.token),
        staleTime: 1000 * 60 * 5 // 5 minutos
    })




    const values: ListaCreditosContextType = {
        lista: data || [],
        isLoading: isLoading || isFetching,
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

    return <ListaCreditosContext.Provider value={values}>{children}</ListaCreditosContext.Provider>;
} export function useListaCreditosContext() {
    const context = useContext(ListaCreditosContext);
    if (!context) {
        throw new Error("useListaProductosContext debe ser usado dentro de un ListaProductosProvider");
    }
    return context;
}
