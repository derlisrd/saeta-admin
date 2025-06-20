import API from "@/services/api";
import { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { ProductoResponse, ProductoResults } from "@/services/dto/productos/producto";
import { useMutation, useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import { DepositoResponse, DepositoResults } from "@/services/dto/productos/deposito";

type modalsType = {
    codigo: boolean;
    imagenes: boolean;
};

type ProductosListaContextType = {
    list: ProductoResults[];
    depositos: DepositoResults[];
    loading: boolean;
    error: Error | null
    selectDeposito: number;
    setSelectDeposito: Dispatch<SetStateAction<number>>;
    selectedProducto: ProductoResults | null;
    setSelectedProducto: Dispatch<SetStateAction<ProductoResults | null>>;
    refresh: () => void,
    isFeching: boolean;
    modals: modalsType;
    handleModals: (key: keyof modalsType) => void;
    changeSelectDeposito: (id: number, q: string) => void;
};

const ProductosListaContext = createContext<ProductosListaContextType | undefined>(undefined);

export const ProductosListaProvider = ({ children }: { children: React.ReactNode }) => {

    const { userData } = useAuth();
    const queryClient = useQueryClient();

    const [modals, setModals] = useState<modalsType>({ codigo: false, imagenes: false });

    const handleModals = (key: keyof modalsType) => {
        setModals((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const [selectDeposito, setSelectDeposito] = useState<number>(0);
    const [selectedProducto, setSelectedProducto] = useState<ProductoResults | null>(null);
    // Fetch productos

    const fetchs = useSuspenseQueries({
        queries: [
            {
                queryKey: ["productos", userData && userData.token],
                queryFn: () => API.productos.list(userData && userData?.token),
                staleTime: 1000 * 60 * 5, // Cache por 5 minutos
                select: (data: ProductoResponse) => {
                    if (data && data.results && data.success) {
                        return data.results;
                    }
                    return [];
                },
            },
            {
                queryKey: ["depositos", userData && userData.token],
                queryFn: () => API.depositos.list(userData && userData?.token),
                staleTime: 1000 * 60 * 5, // Cache por 5 minutos
                select: (data: DepositoResponse) => {
                    if (data && data.results && data.success) {
                        return data.results;
                    }
                    return [];
                }
            },
        ],
    });

    const searchPorDeposito = useMutation({
        mutationKey: ["productos-deposito", userData && userData.token],
        mutationFn: ({ deposito_id, q }: { deposito_id: number; q: string }) =>
            API.productos.productosPorDeposito(userData && userData.token, deposito_id, q),
        onSettled(data) {
            if (data && data.success) {
                queryClient.setQueryData(["productos", userData && userData.token], data);
            }
        },
    })
    const [
        productosData,
        depositosData,
    ] = fetchs


    const values: ProductosListaContextType = {
        list: productosData.data,
        depositos: depositosData.data,
        loading: productosData.isFetching || depositosData.isFetching,
        isFeching: searchPorDeposito.isPending,
        error: productosData.error,
        selectDeposito,
        setSelectDeposito,
        selectedProducto,
        setSelectedProducto,
        refresh: productosData.refetch,
        modals,
        handleModals,
        changeSelectDeposito: (id: number, q: string) => {
            searchPorDeposito.mutate({ deposito_id: id, q });
        }
    };


    return <ProductosListaContext.Provider value={values}>{children}</ProductosListaContext.Provider>;
};
export const useProductosLista = () => {
    const context = useContext(ProductosListaContext);
    if (!context) {
        throw new Error("useProductosLista debe ser usado dentro de un ProductosListaProvider");
    }
    return context;
};
