import { useContext } from "react";
import { AddPedidoContext } from "./context";

function useHook() {
  const { modal, handleModal, pedidos, consultarCodigoInsertar, error, clearError, loadingAddProducto, inputCodigoRef, cantidad, setCantidad, removeItem, index, setIndex, esperar,cancelar, formasPago, loading } =
    useContext(AddPedidoContext);
  return { modal, handleModal, pedidos, consultarCodigoInsertar, error, clearError, loadingAddProducto, inputCodigoRef, cantidad, setCantidad, removeItem, index, setIndex, esperar,cancelar, formasPago, loading };
}

export default useHook;
