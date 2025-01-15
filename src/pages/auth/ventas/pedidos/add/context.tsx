import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { createContext } from "react";

interface AddPedidoContextProps {
  modal: {
    main: boolean;
    clientes: boolean;
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
  handleModal: () => {},
  pedido: new AddPedido({}),
  consultarCodigoInsertar: () => {},
});
