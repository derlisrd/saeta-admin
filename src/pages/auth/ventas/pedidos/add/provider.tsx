import { AddPedido, AddPedidoItem } from "@/services/dto/pedidos/AddPedido";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AddPedidoContext } from "./context";
import API from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PedidoStoreType } from "./_types/pedidoStore";

interface AddPedidoProviderProps {
  children: ReactNode;
}

function AddPedidoProvider({ children }: AddPedidoProviderProps) {
  const { userData } = useAuth();

  const inputCodigoRef = useRef<HTMLInputElement>(null);
  const { setItemValue: setStore, current: store } = useLocalStorage<PedidoStoreType | null>("pedidoStore", null);

  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState({ main: true, clientes: false });

  const [cantidad, setCantidad] = useState(1);
  const [loadingAddProducto, setLoadingAddProducto] = useState(false);
  const [selectedDeposito] = useState(1);
  const [pedidos, setPedidos] = useState<Array<AddPedido>>([
    new AddPedido({
      cliente_id: 0,
      formas_pago_id: 0,
      tipo: 0,
      porcentaje_descuento: 0,
      descuento: 0,
      total: 0,
      items: [],
    }),
  ]);
  const [error, setError] = useState({ code: 0, message: "", active: false });

  const clearError = () => setError({ ...error, active: false });

  const removeItem = (id: number) => {
    let copiaPedidos = [...pedidos];
    let newItems = copiaPedidos[index].items.filter((item) => item.producto_id !== id);
    copiaPedidos[index].items = newItems;
    set(copiaPedidos);
  };

  const set = (copiaPedidos: AddPedido[]) => {
    let nuevoTotal = 0;
    copiaPedidos[index].items.forEach((item) => {
      nuevoTotal += item.total;
    });
    copiaPedidos[index].total = nuevoTotal;
    setPedidos(copiaPedidos);
    setStore({ pedidos: copiaPedidos, index: index });
  };

  const consultarCodigoInsertar = async (codigo: string) => {
    const copiaPedidos = [...pedidos];

    const itemsFounded = copiaPedidos[index].items.filter((item) => item.codigo === codigo);

    if (itemsFounded.length > 0) {
      const item = itemsFounded[0];
      const nuevoItem = new AddPedidoItem({
        producto_id: item.producto_id,
        deposito_id: selectedDeposito,
        impuesto_id: item.impuesto_id,
        cantidad: item.cantidad + cantidad,
        precio: item.precio,
        descuento: 0,
        total: item.precio * (item.cantidad + cantidad),
        observacion: "",
        codigo: item.codigo,
        nombre: item.nombre,
      });

      const newItems = copiaPedidos[index].items.filter((item) => item.codigo !== codigo);
      copiaPedidos[index].items = [...newItems, nuevoItem];
      set(copiaPedidos);
      return;
    }
    setLoadingAddProducto(true);
    const res = await API.productos.consultarCodigoPorDeposito(userData && userData.token, codigo, selectedDeposito, cantidad);
    setLoadingAddProducto(false);

    if (!res.success) {
      setError({ code: res.status, message: res.message, active: true });
      return;
    }
    if (res.results) {
      const nuevoItem = new AddPedidoItem({
        producto_id: res.results.id,
        deposito_id: selectedDeposito,
        impuesto_id: res.results.impuesto_id,
        cantidad: cantidad,
        precio: res.results.precio_normal,
        descuento: 0,
        total: res.results.precio_normal * cantidad,
        observacion: "",
        codigo: res.results.codigo,
        nombre: res.results.nombre,
      });

      copiaPedidos[index].items = [...copiaPedidos[index].items, nuevoItem];
      set(copiaPedidos);
    }
  };

  const handleModal = (name: string, value: boolean) => {
    setModal({ ...modal, [name]: value });
  };

  useEffect(() => {
    if (store) {
      setPedidos(store.pedidos);
      setIndex(store.index);
      console.log("render store");
    }
  }, []);

  const values = {
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
  };
  return <AddPedidoContext.Provider value={values}>{children}</AddPedidoContext.Provider>;
}

export default AddPedidoProvider;
