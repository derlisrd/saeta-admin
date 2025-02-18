import { AddCategoria } from "@/services/dto/productos/AddCategoria";
import { CategoriaResults } from "@/services/dto/productos/categoria";
import { createContext } from "react";

export type CategoriasModals = {
  crear: boolean;
  editar: boolean;
  eliminar: boolean;
};

interface CategoriasContextType {
  lista: CategoriaResults[] | null;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  modals: CategoriasModals;
  handleModal: (modal: keyof CategoriasModals) => void;
  addCategoria: (form: AddCategoria) => void;
  isPendingAdd: boolean;
}

const CategoriasContext = createContext<CategoriasContextType>({
  lista: null,
  isLoading: false,
  error: null,
  refetch: () => {},
  modals: {
    crear: false,
    editar: false,
    eliminar: false,
  },
  handleModal: () => {},
  addCategoria: () => {},
  isPendingAdd: false,
});

export default CategoriasContext;
