import { useContext } from "react";
import AddProductoContext from "../context";

const useAddProducto = () => {
  const {
    form,
    setForm,
    clearError,
    error,
    changeByName,
    sendForm,
    impuestos,
    categorias,
    depositos,
    loading,
    medidas,
    addStock,
    stockState,
    setStockState,
    removeStock,
    success,
    clearSuccess,
    verificarCodigoDisponible,
    generateCode,
    inputCodigoRef,
    changeStockState,
    tabValue,
    setTabValue,
    modal,
    handleModal
  } = useContext(AddProductoContext);
  return {
    form,
    setForm,
    clearError,
    error,
    changeByName,
    sendForm,
    impuestos,
    categorias,
    depositos,
    loading,
    medidas,
    addStock,
    stockState,
    setStockState,
    removeStock,
    success,
    clearSuccess,
    verificarCodigoDisponible,
    generateCode,
    inputCodigoRef,
    changeStockState,
    tabValue,
    setTabValue,
    modal,
    handleModal
  };
};

export default useAddProducto;
