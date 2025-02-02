import { ImpuestoResults } from "@/services/dto/factura/impuesto";
import { CategoriaResults } from "@/services/dto/productos/categoria";
import { DepositoResults } from "@/services/dto/productos/deposito";
import { MedidasResults } from "@/services/dto/productos/medidas";

export default interface AllData {
    impuestos: ImpuestoResults[];
    categorias: CategoriaResults[];
    depositos: DepositoResults[];
    medidas: MedidasResults[];
  }