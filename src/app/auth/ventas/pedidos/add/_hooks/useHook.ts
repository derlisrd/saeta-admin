import { useContext } from "react";
import { AddPedidoContext } from "../context";

function useHook() {
  const {
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
    monedas,
    handleFormasPago
  } = useContext(AddPedidoContext);
  return {
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
    monedas,
    handleFormasPago
  };
}

export default useHook;
