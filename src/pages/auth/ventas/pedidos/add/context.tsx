import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { createContext, Ref } from "react";

interface AddPedidoContextProps {
  modal: {
    main: boolean;
    clientes: boolean;
  };
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
  consultarCodigoInsertar: (codigo: string, cantidad: number) => void;
}

export const AddPedidoContext = createContext<AddPedidoContextProps>({
  inputCodigoRef: { current: null },
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
