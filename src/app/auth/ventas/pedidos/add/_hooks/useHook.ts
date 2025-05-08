import { useContext } from "react";
import { AddPedidoContext } from "../context";

function useHook() {
  const context = useContext(AddPedidoContext)
  if (!context) {
    throw new Error("useHook must be used within a AddPedidoContextProvider");
  }
  return context
}

export default useHook;
