import { useContext } from "react";
import { AddPedidoContext } from "./context";

function useHook() {
  const { modal, handleModal, pedidos, consultarCodigoInsertar, error, clearError, loadingAddProducto, inputCodigoRef, cantidad, setCantidad, removeItem, index, setIndex } =
    useContext(AddPedidoContext);
  return { modal, handleModal, pedidos, consultarCodigoInsertar, error, clearError, loadingAddProducto, inputCodigoRef, cantidad, setCantidad, removeItem, index, setIndex };
}

export default useHook;
