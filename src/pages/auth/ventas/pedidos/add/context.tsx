import { FormasPagoResults } from "@/services/dto/factura/formaspago";
import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { modalType } from "./_types/modal";

interface AddPedidoContextProps {
  modal: modalType;
  handleModal: <K extends keyof modalType>(name: K, value: boolean) => void;
  loading: boolean;
  changePedido: <K extends keyof AddPedido>(name: K, value: AddPedido[K]) => void;
  formasPago: FormasPagoResults[];
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

  pedidos: AddPedido[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  consultarCodigoInsertar: (codigo: string) => void;
}

export const AddPedidoContext = createContext<AddPedidoContextProps>({
  inputCodigoRef: { current: null },
  changePedido: () => {},
  loading: false,
  formasPago: [],
  removeItem: () => {},
  cantidad: 1,
  setCantidad: () => {},
  modal: {
    main: true,
    registro: false,
    clientes: false,
    finalizar: false,
    productos: false,
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
