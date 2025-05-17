import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { FormasPagoAdd, FormasPagoAddResponse, FormasPagoResponse, FormasPagoResults } from "@/services/dto/config/formaspago";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";


type modalsType = {
    add: boolean;
};

interface FormasPagoContextProps {
    isLoading: boolean;
    isPending: boolean;
    modals: modalsType;
    handleModals: (keyModal: keyof modalsType) => void;
    lista: FormasPagoResults[];
    insertar: (form: FormasPagoAdd) => Promise<FormasPagoAddResponse>;
}

const FormasPagoContext = createContext<FormasPagoContextProps | null>(null);

export const FormasPagoProvider = ({ children }: { children: React.ReactNode }) => {

    const { userData } = useAuth()
    const [modals, setModals] = useState({ add: false })
    const queryClient = useQueryClient();

    const handleModals = (keyModal: keyof modalsType) => setModals({ ...modals, [keyModal]: !modals[keyModal] })

    const { isPending, mutateAsync } = useMutation({
        mutationKey: ['formasPagoAdd'],
        mutationFn: async (form: FormasPagoAdd) => {
            return await API.formasPago.add(userData && userData.token, form)
        },
        onSettled: async (data) => {
            if (data && data.results && data.success) {
                setModals({ ...modals, add: false })
                queryClient.setQueryData(['formasPago'], (oldData: FormasPagoResponse | null) => {
                    if (!oldData) return oldData;

                    // Crear copia de los datos actuales
                    const newData = { ...oldData };
                    const nuevoResultado = {
                        id: data.results?.id || 0,
                        tipo: data.results?.tipo || "efectivo",
                        descripcion: data.results?.descripcion || "",
                        porcentaje_descuento: data.results?.porcentaje_descuento || 0,
                        activo: data.results?.activo || 0,
                    }
                    newData.results.push(nuevoResultado);

                    return newData;
                });
            }
        },
    })

    const { data, isLoading } = useSuspenseQuery({
        queryKey: ['formasPago'],
        queryFn: () => API.formasPago.list(userData && userData.token),
        select: (data) => FormasPagoResponse.fromJSON(data),
        staleTime: 1000 * 60 * 5,
    })

    const insertar = async (form: FormasPagoAdd) => await mutateAsync(form);



    const values = {
        isLoading,
        isPending,
        lista: data && data.results || [],
        modals,
        insertar,
        handleModals
    }
    return <FormasPagoContext.Provider value={values}>{children}</FormasPagoContext.Provider>;

}



export const useFormasPagoContext = () => {
    const context = useContext(FormasPagoContext);
    if (!context) {
        throw new Error("useFormasPagoContext must be used within a FormasPagoProvider");
    }
    return context;
};