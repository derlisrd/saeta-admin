import { AddPedido, AddPedidoItem } from "@/services/dto/pedidos/AddPedido";
import { ReactNode, useRef, useState } from "react";
import { AddPedidoContext } from "./context";
import API from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";

interface AddPedidoProviderProps {
  children: ReactNode;
}

function AddPedidoProvider({ children }: AddPedidoProviderProps) {
  const { userData } = useAuth();

  const inputCodigoRef = useRef<HTMLInputElement>(null);

  const [modal, setModal] = useState({
    main: true,
    clientes: false,
  });
  const [cantidad, setCantidad] = useState(1);
  const [loadingAddProducto, setLoadingAddProducto] = useState(false);
  const [selectedDeposito] = useState(1);
  const [pedido, setPedido] = useState(new AddPedido({}));
  const [error, setError] = useState({ code: 0, message: "", active: false });

  const clearError = () => setError({ ...error, active: false });

  const consultarCodigoInsertar = async (codigo: string) => {
    const items = pedido.items.filter((item) => item.codigo === codigo);
    if (items.length > 0) {
      const item = items[0];
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

      setPedido({
        ...pedido,
        items: pedido.items.map((item) => (item.codigo === codigo ? nuevoItem : item)),
      });
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
      setPedido({
        ...pedido,
        items: [...pedido.items, nuevoItem],
      });
    }
  };

  const handleModal = (name: string, value: boolean) => {
    setModal({ ...modal, [name]: value });
  };

  const values = { modal, handleModal, pedido, consultarCodigoInsertar, error, clearError, loadingAddProducto, inputCodigoRef, cantidad, setCantidad };
  return <AddPedidoContext.Provider value={values}>{children}</AddPedidoContext.Provider>;
}

export default AddPedidoProvider;
