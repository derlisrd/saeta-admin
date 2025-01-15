import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { createContext } from "react";

interface AddPedidoContextProps {
  modal: {
    main: boolean;
    clientes: boolean;
  };
  clearError: () => void;
  error: {
    active: boolean;
    code: number;
    message: string;
  };
  handleModal: (name: string, value: boolean) => void;
  pedido: AddPedido;
  consultarCodigoInsertar: (codigo: string, cantidad: number) => void;
}

export const AddPedidoContext = createContext<AddPedidoContextProps>({
  modal: {
    main: true,
    clientes: false,
  },
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
