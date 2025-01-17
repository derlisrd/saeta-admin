import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { createContext, Dispatch, RefObject, SetStateAction } from "react";

interface AddPedidoContextProps {
  modal: {
    main: boolean;
    clientes: boolean;
  };
  esperar: () => void;
  cancelar: () => void;
  removeItem: (id: number) => void;
  cantidad: number;
  setCantidad: Dispatch<SetStateAction<number>>;
  inputCodigoRef: RefObject<HTMLInputElement>;
  loadingAddProducto: boolean;
  clearError: () => void;
  error: {
    active: boolean;
    code: number;
    message: string;
  };
  handleModal: (name: string, value: boolean) => void;
  pedidos: AddPedido[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  consultarCodigoInsertar: (codigo: string) => void;
}

export const AddPedidoContext = createContext<AddPedidoContextProps>({
  inputCodigoRef: { current: null },
  removeItem: () => {},
  cantidad: 1,
  setCantidad: () => {},
  modal: {
    main: true,
    clientes: false,
  },
  esperar: () => {},
  cancelar: () => {},
  loadingAddProducto: false,
  clearError: () => {},
  error: {
    active: false,
    code: 0,
    message: "",
  },
  handleModal: () => {},
  pedidos: [],
  index: 0,
  setIndex: () => {},
  consultarCodigoInsertar: () => {},
});
