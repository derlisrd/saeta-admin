import { useContext } from "react";
import { AddPedidoContext } from "./context";

function useHook() {
  const { modal, handleModal, pedido, consultarCodigoInsertar, error, clearError, loadingAddProducto, inputCodigoRef, cantidad, setCantidad } = useContext(AddPedidoContext);
  return { modal, handleModal, pedido, consultarCodigoInsertar, error, clearError, loadingAddProducto, inputCodigoRef, cantidad, setCantidad};
}

export default useHook;
