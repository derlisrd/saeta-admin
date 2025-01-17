import { AddPedido, AddPedidoItem } from "@/services/dto/pedidos/AddPedido";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AddPedidoContext } from "./context";
import API from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";
import { PedidoStoreType } from "./_types/pedidoStore";
import useStore from "@/hooks/useStore";

interface AddPedidoProviderProps {
  children: ReactNode;
}

function AddPedidoProvider({ children }: AddPedidoProviderProps) {
  const { userData } = useAuth();

  const inputCodigoRef = useRef<HTMLInputElement>(null);
  const { setItemValue: setStore, current: store } = useStore<PedidoStoreType | null>("pedidoStore", null);

  const [modal, setModal] = useState({ main: true, clientes: false });

  const [cantidad, setCantidad] = useState(1);
  const [loadingAddProducto, setLoadingAddProducto] = useState(false);
  const [selectedDeposito] = useState(1);
  const [pedidos, setPedidos] = useState<Array<AddPedido>>(
    store?.pedidos || [
      new AddPedido({
        cliente_id: 0,
        formas_pago_id: 0,
        tipo: 0,
        porcentaje_descuento: 0,
        descuento: 0,
        total: 0,
        items: [],
      }),
    ]
  );

  const [index, setIndex] = useState<number>(store?.index ?? 0);
  const [error, setError] = useState({ code: 0, message: "", active: false });

  const clearError = useCallback(() => setError((prev) => ({ ...prev, active: false })), []);

  const handleModal = useCallback((name: string, value: boolean) => {
    setModal((prev) => ({ ...prev, [name]: value }));
  }, []);

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

  const cancelar = useCallback(
    (indice?: number) => {
      //const indiceACambiar = indice === undefined ? index : indice;

      setPedidos((prevPedidos) => {
        if (prevPedidos.length > 1) {
          const updatedPedidos = prevPedidos.filter((_, i) => i !== index);
          const newIndex = Math.max(0, index - 1);
          set(updatedPedidos, newIndex);
          return updatedPedidos;
        } else {
          const resetPedido = new AddPedido({
            cliente_id: 0,
            formas_pago_id: 0,
            tipo: 0,
            porcentaje_descuento: 0,
            descuento: 0,
            total: 0,
            items: [],
          });
          const updatedPedidos = [...prevPedidos];
          updatedPedidos[index] = resetPedido;
          set(updatedPedidos, index);
          return updatedPedidos;
        }
      });
      setIndex((prevIndex) => Math.max(0, prevIndex - 1));
    },
    [index, set]
  );

  const esperar = useCallback(() => {
    setPedidos((prevPedidos) => {
      const updatedPedidos = [
        ...prevPedidos,
        new AddPedido({
          cliente_id: 0,
          formas_pago_id: 0,
          tipo: 0,
          porcentaje_descuento: 0,
          descuento: 0,
          total: 0,
          items: [],
        }),
      ];
      set(updatedPedidos, updatedPedidos.length - 1);
      return updatedPedidos;
    });
    setIndex((prevIndex) => prevIndex + 1);
    inputCodigoRef.current?.focus();
  }, [set]);

  useEffect(() => {
    if (store) {
      setPedidos(store.pedidos);
      setIndex(store.index);
    }
  }, [store]);

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
    }),
    [modal, handleModal, pedidos, consultarCodigoInsertar, error, clearError, loadingAddProducto, cantidad, removeItem, index, esperar, cancelar]
  );
  return <AddPedidoContext.Provider value={values}>{children}</AddPedidoContext.Provider>;
}

export default AddPedidoProvider;
