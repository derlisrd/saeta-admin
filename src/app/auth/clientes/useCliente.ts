import { useContext } from "react";
import ClientesContext from "./context";


function useCliente() {
    const context = useContext(ClientesContext);
  if (!context) {
    throw new Error("useCliente debe usarse dentro de un ClientesProvider");
  } 
    const {
      modals,
      handleModal,
      lista,
      isLoading,
      isPendingAdd,
      addSubmit,
      error
    } = context
    return {
      modals,
      handleModal,
      lista,
      isLoading,
      isPendingAdd,
      addSubmit,
      error
    }
}

export default useCliente;