export class EstadisticasPeriodoResponse {
  success: boolean;
  message: string;
  status: number;
  results: EstadisticasPeriodoResults | null;
  constructor({ success, message, status, results }: Partial<EstadisticasPeriodoResponse>) {
    this.success = success || false;
    this.message = message || "";
    this.status = status || 0;
    this.results = results ? new EstadisticasPeriodoResults(results) : null;
  }
}

/* "results": {
        "cantidad_pedidos": 18,
        "importe_final_total": 2972300,
        "descuento_total": 4500
    } */
export class EstadisticasPeriodoResults {
  cantidad_pedidos: number;
  importe_final_total: number;
  descuento_total: number;
  lucro_total: number;

  constructor(data: Partial<EstadisticasPeriodoResults>) {
    this.cantidad_pedidos = data.cantidad_pedidos || 0;
    this.importe_final_total = data.importe_final_total || 0;
    this.descuento_total = data.descuento_total || 0;
    this.lucro_total = data.lucro_total || 0;
  }
}
