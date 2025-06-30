import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { ImpuestoResponse, ImpuestoResults } from "@/services/dto/factura/impuesto";
import { CategoriaResponse, CategoriaResults } from "@/services/dto/productos/categoria";
import { EditProductoForm } from "@/services/dto/productos/EditProductoForm";
import { MedidasResponse, MedidasResults } from "@/services/dto/productos/medidas";
import { ProductoResponse, ProductoResults } from "@/services/dto/productos/producto";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useState, useContext, createContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm, UseFormReturn } from "react-hook-form";

type errorType = {
    code: number;
    message: string;
};

type successType = {
    active: boolean;
    message: string;
};

export type modalType = {
    categorias: boolean;
    unidad: boolean;
};

// Tipo para los datos del formulario
type FormData = {
    codigo: string;
    tipo: number;
    disponible: number;
    nombre: string;
    descripcion: string | null;
    impuesto_id: number;
    category_id: number;
    medida_id: number;
    costo: number;
    precio_normal: number;
    precio_minimo: number;
};

interface EditProductoContextType {
    tabValue: number;
    setTabValue: React.Dispatch<React.SetStateAction<number>>;
    producto: any;
    isLoading: boolean;
    form: any;
    changeByName: (name: string, value: any) => void;
    error: errorType;
    clearError: () => void;
    success: successType;
    impuestos: ImpuestoResults[];
    medidas: MedidasResults[];
    categorias: CategoriaResults[];
    modal: modalType;
    handleModal: (key: keyof modalType) => void;
    sendEditProducto: () => void;
    // Nuevas propiedades para react-hook-form
    formMethods: UseFormReturn<FormData>;
    onSubmit: (data: FormData) => void;
    isFormValid: boolean;
}

const EditProductoContext = createContext<EditProductoContextType | undefined>(undefined);

export function EditProductoProvider({ children }: { children: React.ReactNode }) {
    const nav = useNavigate();
    const queryClient = useQueryClient();
    const { userData } = useAuth();
    const location = useLocation();
    const { id: idStr } = useParams<{ id?: string }>();
    const id = idStr ? parseInt(idStr, 10) : 0;
    const productoDesdeState = location.state as ProductoResults;
    const [tabValue, setTabValue] = useState(0);
    //const [form, setForm] = useState(productoDesdeState);

    // Configuración de react-hook-form
    const formMethods = useForm<FormData>({
        defaultValues: {
            codigo: productoDesdeState?.codigo || "",
            tipo: productoDesdeState?.tipo || 1,
            disponible: productoDesdeState?.disponible || 1,
            nombre: productoDesdeState?.nombre || "",
            descripcion: productoDesdeState?.descripcion || "",
            impuesto_id: productoDesdeState?.impuesto_id || 0,
            category_id: productoDesdeState?.category_id || 0,
            medida_id: productoDesdeState?.medida_id || 0,
            costo: productoDesdeState?.costo || 0,
            precio_normal: productoDesdeState?.precio_normal || 0,
            precio_minimo: productoDesdeState?.precio_minimo || 0,
        },
        mode: 'onChange'
    });

    const { handleSubmit, formState: { isValid }, watch } = formMethods;

    // Mantener sincronización entre form y formMethods
    const formValues = watch();

    const [modal, setModal] = useState<modalType>({
        categorias: false,
        unidad: false,
    });

    const handleModal = (key: keyof modalType) => {
        setModal((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const [error, setError] = useState({ code: 0, message: "" });
    const [success, setSuccess] = useState({ active: false, message: "" });

    const clearError = () => setError({ code: 0, message: "" });

    // Mantener compatibilidad con el método original
    const changeByName = (name: string, value: any) => {
        //setForm((prev) => ({ ...prev, [name]: value }));
        // También actualizar react-hook-form
        formMethods.setValue(name as keyof FormData, value);
    };

    const { isPending, mutateAsync } = useMutation({
        mutationKey: ["editProducto"],
        mutationFn: ({ formEdit }: { formEdit: EditProductoForm }) =>
            API.productos.edit(userData && userData.token, id, formEdit),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productos"] });
            setSuccess({
                active: true,
                message: "Producto editado correctamente",
            });

            setTimeout(() => {
                nav(-1);
            }, 1000);
        },
        onError: (error: any) => {
            setError({
                code: error.response.data.code,
                message: error.response.data.message,
            });
        },
    });

    // Función para manejar el submit del formulario con validación
    const onSubmit = async (data: FormData) => {
        try {
            // Limpiar errores previos
            clearError();

            // Crear el objeto de formulario para la API
            const formEdit = EditProductoForm.fromJSON(data);

            // Enviar datos
            await mutateAsync({ formEdit });
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }
    };

    // Función para enviar desde el botón externo
    const sendEditProducto = async () => {
        // Verificar si el formulario es válido antes de enviar
        const isFormValid = await formMethods.trigger();

        if (isFormValid) {
            // Si es válido, ejecutar el submit
            handleSubmit(onSubmit)();
        } else {
            // Si no es válido, mostrar un error
            setError({
                code: 400,
                message: "Por favor, complete todos los campos requeridos correctamente."
            });
        }
    };

    const results = useQueries({
        queries: [
            {
                queryKey: ["producto", id],
                queryFn: () => API.productos.find(userData && userData.token, id),
                enabled: !productoDesdeState && !!id,
                select: (data: ProductoResponse) => {
                    return data && data.results ? data.results : {};
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
        isLoading: producto.isLoading || categorias.isLoading || medidas.isLoading || impuestos.isLoading || isPending,
        producto: productoDesdeState || producto.data,
        form: formValues, // Usar los valores de react-hook-form
        changeByName,
        error,
        impuestos: impuestos.data || [],
        categorias: categorias.data || [],
        medidas: medidas.data || [],
        modal,
        handleModal,
        sendEditProducto,
        success,
        clearError,
        // Nuevas propiedades
        formMethods,
        onSubmit,
        isFormValid: isValid
    };

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