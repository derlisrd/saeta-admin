import { useContext } from "react";
import { AddPedidoContext } from "./context";

function useAddPedido() {
  const { modal, handleModal, pedido, consultarCodigoInsertar } = useContext(AddPedidoContext);
  return { modal, handleModal, pedido, consultarCodigoInsertar };
}

export default useAddPedido;
