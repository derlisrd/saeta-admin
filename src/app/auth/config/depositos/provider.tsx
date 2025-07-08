import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { DepositoResults } from "@/services/dto/productos/deposito";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";


interface DepositoContextType {
    lista: DepositoResults[];
    isPending: boolean;
    isLoading: boolean;
    activar: (id: number) => Promise<void>;
}

const DepositosContext = createContext<DepositoContextType | undefined>(undefined);

function DepositosProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();
    const { userData } = useAuth()

    const { isLoading, data } = useQuery({
        queryKey: ["depositos"],
        queryFn: () => API.depositos.list(userData && userData.token),
        select: (data) => {
            if (data && data.success && data.results) {
                return data.results
            }
            return []
        },
        enabled: !!userData && !!userData.token,

    });

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["activarDeposito"],
        mutationFn: ({ id }: { id: number }) => API.depositos.activar(userData && userData.token, id),
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: ["depositos", "depositoActivo"] });
            }
        },
    });

    const activar = async (id: number) => {
        await mutateAsync({ id });
    }

    const values = {
        lista: data || [],
        isPending,
        isLoading,
        activar
    }
    return <DepositosContext.Provider value={values}>
        {children}
    </DepositosContext.Provider>
}


const useDepositosContext = () => {
    const context = useContext(DepositosContext);
    if (!context)
        throw new Error("useDepositosContext must be used within a DepositosProvider");
    return context;
}

export { DepositosProvider, useDepositosContext };