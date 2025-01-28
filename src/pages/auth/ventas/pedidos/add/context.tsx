import { FormasPagoResults } from "@/services/dto/factura/formaspago";
import { AddPedido, AddPedidoResponse } from "@/services/dto/pedidos/AddPedido";
import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { modalType } from "./_types/modal";

type ErrorType = {
  active: boolean;
  code: number;
  message: string;
};

interface AddPedidoContextProps {
  modal: modalType;
  handleModal: <K extends keyof modalType>(name: K, value: boolean) => void;
  loading: boolean;
  changePedido: <K extends keyof AddPedido>(name: K, value: AddPedido[K]) => void;
  formasPago: FormasPagoResults[];
  esperar: () => void;
  setCliente: (id: number, label: string) => void;
  cancelar: () => void;
  removeItem: (id: number) => void;
  cantidad: number;
  setCantidad: Dispatch<SetStateAction<number>>;
  inputCodigoRef: RefObject<HTMLInputElement>;
  loadingAddProducto: boolean;
  clearError: () => void;
  error: ErrorType;
  limpiarFinalizarPedido: () => void;
  setError: Dispatch<SetStateAction<ErrorType>>;
  result: AddPedidoResponse | null;
  setResult: Dispatch<SetStateAction<AddPedidoResponse | null>>;
  pedidos: AddPedido[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  consultarCodigoInsertar: (codigo: string) => void;
}

export const AddPedidoContext = createContext<AddPedidoContextProps>({
  inputCodigoRef: { current: null },
  limpiarFinalizarPedido: () => {},
  changePedido: () => {},
  loading: false,
  setCliente: () => {},
  formasPago: [],
  removeItem: () => {},
  cantidad: 1,
  result: null,
  setResult: () => {},
  setCantidad: () => {},
  modal: {
    main: true,
    registro: false,
    clientes: false,
    finalizar: false,
    productos: false,
    error: false,
    success: false,
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
  setError: () => {},
  handleModal: () => {},
  pedidos: [],
  index: 0,
  setIndex: () => {},
  consultarCodigoInsertar: () => {},
});
