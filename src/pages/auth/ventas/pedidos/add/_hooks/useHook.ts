import { useContext } from "react";
import { AddPedidoContext } from "../context";

function useHook() {
  const {
    modal,
    handleModal,
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
    monedas
  } = useContext(AddPedidoContext);
  return {
    modal,
    handleModal,
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
    monedas
  };
}

export default useHook;
