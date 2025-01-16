import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { createContext, Dispatch, Ref, SetStateAction } from "react";

interface AddPedidoContextProps {
  modal: {
    main: boolean;
    clientes: boolean;
  };
  cantidad: number;
  setCantidad: Dispatch<SetStateAction<number>>;
  inputCodigoRef: Ref<HTMLInputElement>;
  loadingAddProducto: boolean;
  clearError: () => void;
  error: {
    active: boolean;
    code: number;
    message: string;
  };
  handleModal: (name: string, value: boolean) => void;
  pedido: AddPedido;
  consultarCodigoInsertar: (codigo: string) => void;
}

export const AddPedidoContext = createContext<AddPedidoContextProps>({
  inputCodigoRef: { current: null },
  cantidad: 1,
  setCantidad: () => {},
  modal: {
    main: true,
    clientes: false,
  },
  loadingAddProducto: false,
  clearError: () => {},
  error: {
    active: false,
    code: 0,
    message: "",
  },
  handleModal: () => {},
  pedido: new AddPedido({}),
  consultarCodigoInsertar: () => {},
});
