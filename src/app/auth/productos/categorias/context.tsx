import { AddCategoria } from "@/services/dto/productos/AddCategoria";
import { CategoriaResults } from "@/services/dto/productos/categoria";
import { createContext } from "react";

export type CategoriasModals = {
  crear: boolean;
  editar: boolean;
  eliminar: boolean;
};

interface CategoriasContextType {
  lista: CategoriaResults[];
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  refetch: () => void;
  modals: CategoriasModals;
  handleModal: (modal: keyof CategoriasModals) => void;
  addCategoria: (form: AddCategoria) => void;
  isPendingAdd: boolean;
}

const CategoriasContext = createContext<CategoriasContextType | undefined>(undefined);

export default CategoriasContext;
