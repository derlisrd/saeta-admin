import { useAuth } from "@/providers/AuthProvider";
import { apiServiceDepositos } from "@/services/api/productos/deposito";
import { apiServiceProductos } from "@/services/api/productos/producto";
import { DepositoResults } from "@/services/dto/productos/deposito";
import { ProductoResults } from "@/services/dto/productos/producto";
import { useEffect, useState, useCallback } from "react";

function useListProductos() {
  const { userData } = useAuth();
  const [list, setList] = useState<ProductoResults[] | []>([]);
  const [depositos, setDepositos] = useState<DepositoResults[] | []>([]);
  const [loading, setLoading] = useState(true);

  const getDatas = useCallback(async () => {
    const [productosRes, depositoRes] = await Promise.all([
      apiServiceProductos.list(userData && userData.token),
      apiServiceDepositos.list(userData && userData.token),
    ])

    if (productosRes.success) {
      setList(productosRes.results || []);
      // localStorage.setItem("productos", JSON.stringify(productosRes.results));
    }
    if(depositoRes.success) {
      setDepositos(depositoRes.results || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getDatas();
  }, []);

  return { list, loading, depositos };
}

export default useListProductos;
