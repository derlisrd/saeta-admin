import { FormasPagoResults } from "@/services/dto/factura/formaspago";
import { AddPedido, AddPedidoResponse } from "@/services/dto/pedidos/AddPedido";
import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { MonedaResults } from "@/services/dto/factura/moneda";
import { ErrorType } from "./_types/error";
import { DepositoResults } from "@/services/dto/productos/deposito";
import { ConfiguracionType } from "./_types/configuracion";

interface AddPedidoContextProps {
  loading: boolean;
  changePedido: <K extends keyof AddPedido>(name: K, value: AddPedido[K]) => void;
  formasPago: FormasPagoResults[];
  monedas: MonedaResults[];
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
  handleFormasPago: (monto: number, id: number, type: "add" | "remove") => void;
  selectedDeposito: number;
  setSelectedDeposito: Dispatch<SetStateAction<number>>;
  depositos: DepositoResults[];
  config: ConfiguracionType;
  settingConfig: (config: ConfiguracionType) => void;
  aplicarDescuento: (descuento: number) => void;
}

export const AddPedidoContext = createContext<AddPedidoContextProps | undefined>(undefined);
