import { AddPedido, AddPedidoItem, AddPedidoResponse } from "@/services/dto/pedidos/AddPedido";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AddPedidoContext } from "./context";
import API from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";
import { PedidoStoreType } from "./_types/pedidoStore";
import useStore from "@/hooks/useStore";
import { FormasPagoResults } from "@/services/dto/factura/formaspago";
import { MonedaResults } from "@/services/dto/factura/moneda";

function AddPedidoProvider({ children }: { children: ReactNode }) {
  const { userData } = useAuth();

  const inputCodigoRef = useRef<HTMLInputElement>(null);
  const { setItemValue: setStore, current: store } = useStore<PedidoStoreType | null>("pedidoStore", null);

  const [result, setResult] = useState<AddPedidoResponse | null>(null);

  const [formasPago, setFormasPago] = useState<FormasPagoResults[]>([]);
  const [monedas, setMonedas] = useState<MonedaResults[]>([]);
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [loadingAddProducto, setLoadingAddProducto] = useState(false);
  const [selectedDeposito] = useState(1);
  const initialPedido: AddPedido = new AddPedido({
    cliente_id: 0,
    aplicar_impuesto: true,
    moneda_id: 1,
    formas_pago_id: 0,
    tipo: 0,
    porcentaje_descuento: 0,
    descuento: 0,
    entregado: true,
    total: 0,
    items: [],
  });
  const [pedidos, setPedidos] = useState<Array<AddPedido>>(store?.pedidos || [initialPedido]);

  const [index, setIndex] = useState<number>(store?.index ?? 0);
  const initialError = { code: 0, message: "", active: false };
  const [error, setError] = useState(initialError);

  const clearError = () => setError(initialError);

  const setCliente = useCallback(
    (id: number, label: string) => {
      const copyPedidos = [...pedidos];
      copyPedidos[index].cliente_id = id;
      copyPedidos[index].cliente = label;
      set(copyPedidos, index);
    },
    [index, pedidos]
  );

  const set = useCallback(
    (updatedPedidos: AddPedido[], newIndex: number) => {
      const nuevoTotal = updatedPedidos[newIndex].items.reduce((acc, item) => acc + item.total, 0);
      updatedPedidos[newIndex].total = nuevoTotal;

      setPedidos([...updatedPedidos]);
      setStore({ pedidos: updatedPedidos, index: newIndex });
    },
    [setStore]
  );

  const consultarCodigoInsertar = useCallback(
    async (codigo: string) => {
      setLoadingAddProducto(true);
      const res = await API.productos.consultarCodigoPorDeposito(userData && userData?.token, codigo, selectedDeposito, cantidad);
      setLoadingAddProducto(false);

      if (!res.success) {
        setError({ code: 1, message: res.message, active: true });
        return;
      }

      setPedidos((prevPedidos) => {
        const updatedPedidos = [...prevPedidos];
        const existingItemIndex = updatedPedidos[index].items.findIndex((item) => item.codigo === codigo);

        if (existingItemIndex !== -1) {
          const item = updatedPedidos[index].items[existingItemIndex];
          updatedPedidos[index].items[existingItemIndex] = new AddPedidoItem({
            ...item,
            cantidad: item.cantidad + cantidad,
            total: item.precio * (item.cantidad + cantidad),
          });
        } else {
          if (res.results) {
            updatedPedidos[index].items.push(
              new AddPedidoItem({
                producto_id: res.results.id,
                deposito_id: selectedDeposito,
                impuesto_id: res.results.impuesto_id,
                cantidad,
                precio: res.results.precio_normal,
                descuento: 0,
                total: res.results.precio_normal * cantidad,
                observacion: "",
                codigo: res.results.codigo,
                nombre: res.results.nombre,
              })
            );
          }
        }

        set(updatedPedidos, index);
        return updatedPedidos;
      });
    },
    [cantidad, index, selectedDeposito, set, userData?.token]
  );

  const changePedido = useCallback(
    <K extends keyof AddPedido>(name: K, value: AddPedido[K]) => {
      let pedidosCopy = [...pedidos];
      pedidosCopy[index][name] = value;
      set(pedidosCopy, index);
    },
    [pedidos, index, set]
  );

  const removeItem = useCallback(
    (id: number) => {
      setPedidos((prevPedidos) => {
        const updatedPedidos = [...prevPedidos];
        updatedPedidos[index].items = updatedPedidos[index].items.filter((item) => item.producto_id !== id);
        set(updatedPedidos, index);
        return updatedPedidos;
      });
    },
    [index, set]
  );

  const limpiarFinalizarPedido = useCallback(() => {
    let copyPedidos = [...pedidos];
    if (copyPedidos.length > 1) {
      copyPedidos.splice(index, 1);
    }
    if (copyPedidos.length === 1) {
      copyPedidos[0] = initialPedido;
    }
    let nuevoIndex = index - 1;
    if (nuevoIndex < 0) {
      nuevoIndex = 0;
    }
    setIndex(nuevoIndex);
    set(copyPedidos, nuevoIndex);
    clearError();
    setTimeout(() => {
      inputCodigoRef.current?.focus();
    }, 200);
  }, [index, pedidos, set]);

  const cancelar = useCallback(() => {
    //const indiceACambiar = indice === undefined ? index : indice;

    setPedidos((prevPedidos) => {
      if (prevPedidos.length > 1) {
        const updatedPedidos = prevPedidos.filter((_, i) => i !== index);
        const newIndex = Math.max(0, index - 1);
        set(updatedPedidos, newIndex);
        return updatedPedidos;
      } else {
        const updatedPedidos = [...prevPedidos];
        updatedPedidos[index] = initialPedido;
        set(updatedPedidos, index);
        return updatedPedidos;
      }
    });
    setIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }, [index, set]);

  const esperar = useCallback(() => {
    setPedidos((prevPedidos) => {
      const updatedPedidos = [...prevPedidos, initialPedido];
      set(updatedPedidos, updatedPedidos.length - 1);
      return updatedPedidos;
    });
    setIndex((prevIndex) => prevIndex + 1);
    inputCodigoRef.current?.focus();
  }, [set]);

  const getAllDatas = useCallback(async () => {
    setLoading(true);
    try {
      const [formasPagoRes, monedasRes] = await Promise.all([API.formasPago.list(userData && userData?.token), API.monedas.list(userData && userData?.token)]);
      if (formasPagoRes.success && formasPagoRes.results) {
        setFormasPago(formasPagoRes.results);
      }
      if (monedasRes.success && monedasRes.results) {
        setMonedas(monedasRes.results);
      }
    } finally {
      setLoading(false);
    }
  }, [userData?.token]);

  useEffect(() => {
    getAllDatas();
  }, [getAllDatas]);

  useEffect(() => {
    if (store) {
      setPedidos(store.pedidos);
      setIndex(store.index);
    }
  }, [store]);

  const values = useMemo(
    () => ({
      pedidos,
      consultarCodigoInsertar,
      error,
      setError,
      clearError,
      loadingAddProducto,
      inputCodigoRef,
      cantidad,
      setCantidad,
      removeItem,
      index,
      setIndex,
      esperar,
      cancelar,
      formasPago,
      loading,
      changePedido,
      setCliente,
      result,
      setResult,
      limpiarFinalizarPedido,
      monedas,
    }),
    [
      pedidos,
      consultarCodigoInsertar,
      error,
      setError,
      clearError,
      loadingAddProducto,
      cantidad,
      removeItem,
      index,
      esperar,
      cancelar,
      formasPago,
      loading,
      changePedido,
      setCliente,
      result,
      setResult,
      limpiarFinalizarPedido,
      monedas,
    ]
  );
  return <AddPedidoContext.Provider value={values}>{children}</AddPedidoContext.Provider>;
}

export default AddPedidoProvider;
