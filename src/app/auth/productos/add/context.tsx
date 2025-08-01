import React, { createContext, Dispatch, SetStateAction } from "react";
import { ImpuestoResults } from "@/services/dto/factura/impuesto";
import { AddProducto } from "@/services/dto/productos/AddProducto";
//import { AddStock } from "@/services/dto/productos/AddStock";
import { CategoriaResults } from "@/services/dto/productos/categoria";
import { DepositoResults } from "@/services/dto/productos/deposito";
import { MedidasResults } from "@/services/dto/productos/medidas";

type errorType = {
  code: number;
  message: string;
};


export type notiType = {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info"
  icon?: string;
}

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
  depositoActivo: DepositoResults;
  loading: boolean;
  medidas: Array<MedidasResults>;
  verificarCodigoDisponible: (codigo: string) => void;
  generateCode: () => void;
  inputCodigoRef: React.RefObject<HTMLInputElement>;
  tabValue: number;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
  dataError: Error | null | undefined;
  isError: boolean;
  noti: notiType | null;
  setNoti: Dispatch<SetStateAction<notiType | null>>;
}

const AddProductoContext = createContext<AddProductoContextTypes | undefined>(undefined);

export default AddProductoContext;
