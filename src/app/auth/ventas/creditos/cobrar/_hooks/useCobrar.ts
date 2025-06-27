import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useCobrarCredito() {
  const { userData } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["formasPago"],
    queryFn: async () => API.formasPago.list(userData && userData.token),
    select: (data) => {
      if (data && data.results && data.success) {
        return data.results;
      }
      return [];
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5
  });

  return {
    formasPago: data || [],
    isLoading: isLoading
  };
}

export default useCobrarCredito;
