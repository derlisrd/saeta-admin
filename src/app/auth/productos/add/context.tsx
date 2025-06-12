import React, { createContext } from "react";
import { ImpuestoResults } from "@/services/dto/factura/impuesto";
import { AddProducto } from "@/services/dto/productos/AddProducto";
import { AddStock } from "@/services/dto/productos/AddStock";
import { CategoriaResults } from "@/services/dto/productos/categoria";
import { DepositoResults } from "@/services/dto/productos/deposito";
import { MedidasResults } from "@/services/dto/productos/medidas";

type errorType = {
  code: number;
  message: string;
};

type successType = {
  active: boolean;
  message: string;
};

export type modalType = {
  categorias: boolean;
  unidad: boolean;
};

interface AddProductoContextTypes {
  form: AddProducto;
  modal: modalType;
  handleModal: (modal: keyof modalType) => void;
  setForm: React.Dispatch<React.SetStateAction<AddProducto>>;
  clearError: () => void;
  error: errorType;
  changeByName: (name: string, value: any) => void;
  sendForm: () => Promise<void>;
  impuestos: Array<ImpuestoResults>;
  categorias: Array<CategoriaResults>;
  depositos: Array<DepositoResults>;
  loading: boolean;
  medidas: Array<MedidasResults>;
  addStock: () => void;
  stockState: AddStock;
  setStockState: React.Dispatch<React.SetStateAction<AddStock>>;
  removeStock: (deposito_id: number) => void;
  success: successType;
  clearSuccess: () => void;
  verificarCodigoDisponible: (codigo: string) => void;
  generateCode: () => void;
  inputCodigoRef: React.RefObject<HTMLInputElement>;
  changeStockState: (name: string, value: number) => void;
  tabValue: number;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
  dataError: Error | null | undefined
}

const AddProductoContext = createContext<AddProductoContextTypes | undefined>(undefined);

export default AddProductoContext;
