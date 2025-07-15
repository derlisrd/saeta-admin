import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useMutation } from "@tanstack/react-query";

function useResetPassword() {
    const {userData} = useAuth()
    
    const { data, error, isPending, mutateAsync, isSuccess } = useMutation({
      mutationKey: ["changePassword"],
      mutationFn: async ({ password, password_confirmation, id }: { password: string; password_confirmation: string, id: number }) => {
        return API.users.resetPassword(userData && userData.token, id, password, password_confirmation)
      },
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log("Error changing password:", error)
      }
    });
    
    
    return { isPending, error, data, mutateAsync, isSuccess };
}

export default useResetPassword;