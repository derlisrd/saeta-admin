import { useContext } from "react";
import { AddPedidoContext } from "./context";

function useHook() {
  const { modal, handleModal, pedido, consultarCodigoInsertar, error, clearError } = useContext(AddPedidoContext);
  return { modal, handleModal, pedido, consultarCodigoInsertar, error, clearError };
}

export default useHook;
