export class CreditosResponse{
  success: boolean;
  results: CreditosResults[];
  message: string;
  status: number;

  constructor(data: any) {
    this.success = data.success;
    this.results = data.results;
    this.message = data.message;
    this.status = data.status;
  }
}

export class CreditosResults {
  id: number;
  pedido_id: number;
  doc: string;
  razon_social: string;
  monto: number;
  monto_abonado: number;
  fecha_vencimiento: string;
  created_at: string;

  constructor({ id = 0, pedido_id = 0, doc = "", razon_social = "", monto = 0, monto_abonado = 0, fecha_vencimiento = "", created_at = "" }) {
    this.id = id;
    this.pedido_id = pedido_id;
    this.doc = doc;
    this.razon_social = razon_social;
    this.monto = monto;
    this.fecha_vencimiento = fecha_vencimiento;
    this.created_at = created_at;
    this.monto_abonado = monto_abonado;
  }
}