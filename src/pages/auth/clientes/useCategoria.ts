import { useContext } from "react";
import CategoriasContext from "./context";

function useCategoria() {
    const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error("useCategoriasContext debe usarse dentro de un CategoriasProvider");
  } 
    const {lista,
      isLoading,
      error,
      refetch,
      handleModal,
      modals,
      addCategoria,
      isPendingAdd
    } = context
    return {lista,
      isLoading,
      error,
      refetch,
      handleModal,
      modals,
      addCategoria,
      isPendingAdd
    }
}

export default useCategoria;