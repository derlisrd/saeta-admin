import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useMutation } from "@tanstack/react-query";

// Importa tus servicios aquí

interface CobroData {
    forma_pago_id: number;
    monto: number;
    credito_id: number;
}

export const useCobrarCreditoActions = () => {
    const {userData} = useAuth()

    const {isPending, error, mutateAsync,data, reset} = useMutation({
    mutationFn: ({ forma_pago_id, monto, credito_id }: CobroData) => {
            return API.creditos.cobrar({token: userData && userData.token, forma_pago_id, monto, id: credito_id})
        }
    })
  const procesarCobro = async (cobroData: CobroData) => {
    return await mutateAsync(cobroData);
  }

    return {
        procesarCobro,
        isPending,
        error,
    cobroData: data ? data.results : null,
    clearError: reset
    };
};