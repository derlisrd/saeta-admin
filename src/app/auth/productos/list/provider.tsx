import API from "@/services/api";
import { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { ProductoResponse, ProductoResults } from "@/services/dto/productos/producto";
import { QueryObserverResult, RefetchOptions, useSuspenseQuery } from "@tanstack/react-query";
import { DepositoResults } from "@/services/dto/productos/deposito";

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
    refresh: (options?: RefetchOptions) => Promise<QueryObserverResult<ProductoResponse, Error>>
    modals: modalsType;
    handleModals: (key: keyof modalsType) => void;
};

const ProductosListaContext = createContext<ProductosListaContextType | undefined>(undefined);

export const ProductosListaProvider = ({ children }: { children: React.ReactNode }) => {

    const { userData } = useAuth();

    const [modals, setModals] = useState<modalsType>({ codigo: false, imagenes: false });

    const handleModals = (key: keyof modalsType) => {
        setModals((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const [selectDeposito, setSelectDeposito] = useState<number>(0);
    const [selectedProducto, setSelectedProducto] = useState<ProductoResults | null>(null);
    // Fetch productos
    const { data: productosData, isLoading: productosLoading, error: productosError, refetch } = useSuspenseQuery({
        queryKey: ["productos", userData?.token],
        queryFn: () => API.productos.list(userData && userData?.token),
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    });

    // Fetch depósitos
    const { data: depositosData, isLoading: depositosLoading, error: depositosError } = useSuspenseQuery({
        queryKey: ["depositos", userData?.token],
        queryFn: () => API.depositos.list(userData && userData?.token),
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    });

    const values = {
        list: productosData?.results ?? [],
        depositos: depositosData?.results ?? [],
        loading: productosLoading || depositosLoading,
        error: productosError || depositosError,
        selectDeposito,
        setSelectDeposito,
        selectedProducto,
        setSelectedProducto,
        refresh: refetch,
        modals,
        handleModals,
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
