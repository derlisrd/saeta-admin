import { AddPedido, AddPedidoItem, AddPedidoResponse } from "@/services/dto/pedidos/AddPedido";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AddPedidoContext } from "./context";
import API from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";
import { PedidoStoreType } from "./_types/pedidoStore";
import useStore from "@/hooks/useStore";
import { FormasPagoResults } from "@/services/dto/factura/formaspago";
import { modalType } from "./_types/modal";

interface AddPedidoProviderProps {
  children: ReactNode;
}

function AddPedidoProvider({ children }: AddPedidoProviderProps) {
  const { userData } = useAuth();

  const inputCodigoRef = useRef<HTMLInputElement>(null);
  const { setItemValue: setStore, current: store } = useStore<PedidoStoreType | null>("pedidoStore", null);

  const [modal, setModal] = useState<modalType>({ main: true, clientes: false, finalizar: false, registro: false, productos: false, error: false, success: false });

  const [result, setResult] = useState<AddPedidoResponse | null>(null);

  const [formasPago, setFormasPago] = useState<FormasPagoResults[]>([]);
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [loadingAddProducto, setLoadingAddProducto] = useState(false);
  const [selectedDeposito] = useState(1);
  const initialPedido = new AddPedido({
    cliente_id: 0,
    aplicar_impuesto: true,
    formas_pago_id: 0,
    tipo: 0,
    porcentaje_descuento: 0,
    descuento: 0,
    total: 0,
    items: [],
  });
  const [pedidos, setPedidos] = useState<Array<AddPedido>>(store?.pedidos || [initialPedido]);

  const [index, setIndex] = useState<number>(store?.index ?? 0);
  const [error, setError] = useState({ code: 0, message: "", active: false });

  const clearError = useCallback(() => setError((prev) => ({ ...prev, active: false })), []);

  const handleModal = useCallback((name: string, value: boolean) => {
    setModal((prev) => ({ ...prev, [name]: value }));
  }, []);

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
        setError({ code: res.status, message: res.message, active: true });
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
    const res = await API.formasPago.list(userData && userData?.token);
    setLoading(false);
    if (res.success && res.results) {
      setFormasPago(res.results);
    }
  }, []);

  useEffect(() => {
    getAllDatas();
  }, [getAllDatas]);

  useEffect(() => {
    if (store) {
      setPedidos(store.pedidos);
      setIndex(store.index);
    }
  }, [store]);

  useEffect(() => {
    const keyActions: Record<string, () => void> = {
      F6: () => {
        handleModal("clientes", true);
      },
      F7: () => {
        inputCodigoRef.current?.focus();
      },
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (keyActions[event.key]) {
        event.preventDefault();
        keyActions[event.key]();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleModal]);

  const values = useMemo(
    () => ({
      modal,
      handleModal,
      pedidos,
      consultarCodigoInsertar,
      error,
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
    }),
    [
      modal,
      handleModal,
      pedidos,
      consultarCodigoInsertar,
      error,
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
    ]
  );
  return <AddPedidoContext.Provider value={values}>{children}</AddPedidoContext.Provider>;
}

export default AddPedidoProvider;
