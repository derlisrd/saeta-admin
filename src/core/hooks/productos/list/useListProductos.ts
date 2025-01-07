import { useAuth } from "@/providers/AuthProvider";
import { apiServiceProductos } from "@/services/api/productos/producto";
import { ProductoResults } from "@/services/dto/productos/producto";
import { useEffect, useState, useCallback } from "react";

function useListProductos() {
  const { userData } = useAuth();
  const [list, setList] = useState<ProductoResults[] | []>([]);
  const [loading, setLoading] = useState(true);

  const getDatas = useCallback(async () => {
    const productosRes = await apiServiceProductos.list(userData && userData.token)

    if (productosRes.success) {
      setList(productosRes.results || []);
      localStorage.setItem("productos", JSON.stringify(productosRes.results));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getDatas();
  }, []);

  return { list, loading };
}

export default useListProductos;
