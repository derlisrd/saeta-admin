import { createContext } from "react";
import { ClientesModals } from "./types/clientesmodals";
import { ClienteResults } from "@/services/dto/clientes/cliente";
import { AddCliente } from "@/services/dto/clientes/AddCliente";

const ClientesContext = createContext<{
  modals: ClientesModals;
  handleModal: (modal: keyof ClientesModals) => void;
  isPendingAdd: boolean;
  isLoading: boolean;
  lista: ClienteResults[] | null;
  addSubmit: (form: AddCliente) => Promise<void>;
}>({
  modals: {
    crear: false,
    editar: false,
    eliminar: false,
  },
  handleModal: () => {},
  isPendingAdd: false,
  isLoading: false,
  lista: [],
  addSubmit: async () => {},
});

export default ClientesContext;
