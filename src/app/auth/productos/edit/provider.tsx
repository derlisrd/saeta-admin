import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { ImpuestoResponse, ImpuestoResults } from "@/services/dto/factura/impuesto";
import { CategoriaResponse, CategoriaResults } from "@/services/dto/productos/categoria";
import { MedidasResponse, MedidasResults } from "@/services/dto/productos/medidas";
import { ProductoResponse, ProductoResults } from "@/services/dto/productos/producto";
import { useQueries } from "@tanstack/react-query";
import { useState, useContext, createContext } from "react";
import { useLocation, useParams } from "react-router-dom";

interface modalType {
    categorias: boolean;
    unidad: boolean;
}

interface EditProductoContextType {
    tabValue: number;
    setTabValue: React.Dispatch<React.SetStateAction<number>>;
    producto: any
    isLoading: boolean;
    form: any;
    changeByName: (name: string, value: any) => void;
    error: {
        code: number;
        message: string;
    };
    impuestos: ImpuestoResults[];
    medidas: MedidasResults[];
    categorias: CategoriaResults[];
    modal: modalType;
    handleModal: (key: keyof modalType) => void;
    sendEditProducto: () => Promise<void>;
}


const EditProductoContext = createContext<EditProductoContextType | undefined>(undefined);


export function EditProductoProvider({ children }: { children: React.ReactNode }) {

    const { userData } = useAuth();
    const location = useLocation();
    const { id: idStr } = useParams<{ id?: string }>();
    const id = idStr ? parseInt(idStr, 10) : 0;
    const productoDesdeState = location.state as ProductoResults;
    const [tabValue, setTabValue] = useState(0);
    const [form, setForm] = useState(productoDesdeState);

    const [modal, setModal] = useState<modalType>({
        categorias: false,
        unidad: false,
    });
    const handleModal = (key: keyof modalType) => {
        setModal((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    const [error, setError] = useState({
        code: 0,
        message: "",
    });

    const changeByName = (name: string, value: any) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const sendEditProducto = async () => {

        const res = await API.productos.edit(userData && userData.token, id, form);
        console.log(res)
    }

    const results = useQueries({
        queries: [
            {
                queryKey: ["producto", id],
                queryFn: () => API.productos.find(userData && userData.token, id),
                enabled: !productoDesdeState && !!id,
                select: (data: ProductoResponse) => {
                    data && data.results ? data.results : {};
                },
                retry: false,
                staleTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false,
            },
            {
                queryKey: ["impuestos"],
                queryFn: () => API.impuestos.list(userData && userData.token),
                select: (data: ImpuestoResponse) => (data && data.results) ? data.results : [],
                retry: false,
                staleTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false,
            },
            {
                queryKey: ["categorias"],
                queryFn: () => API.categorias.list(userData && userData.token),
                select: (data: CategoriaResponse) => (data && data.results) ? data.results : [],
                retry: false,
                staleTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false,
            },
            {
                queryKey: ["medidas"],
                queryFn: () => API.medidas.list(userData && userData.token),
                select: (data: MedidasResponse) => (data && data.results) ? data.results : [],
                retry: false,
                staleTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false,
            },
        ],
    });
    const [producto, impuestos, categorias, medidas] = results;

    const values = {
        tabValue,
        setTabValue,
        isLoading: producto.isLoading,
        producto: productoDesdeState || producto.data,
        form,
        changeByName,
        error,
        impuestos: impuestos.data || [],
        categorias: categorias.data || [],
        medidas: medidas.data || [],
        modal,
        handleModal,
        sendEditProducto,
    }

    return (
        <EditProductoContext.Provider value={values}>
            {children}
        </EditProductoContext.Provider>
    );
}


export function useEditProductoContext() {
    const context = useContext(EditProductoContext);
    if (!context) {
        throw new Error("useEditProductoContext must be used within a EditProductoProvider");
    }
    return context;
}
