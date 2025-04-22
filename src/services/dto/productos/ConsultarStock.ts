export class ConsultarStockResponse {
  success: boolean;
  status: number;
  results: ConsultarStockResults | null;
  message: string;

  constructor({ success, status, results, message }: { success: boolean; status: number; results: ConsultarStockResults; message: string }) {
    this.success = success;
    this.status = status;
    this.results = results;
    this.message = message;
  }

  static fromJSON(json: any): ConsultarStockResponse {
    return new ConsultarStockResponse({
      success: json.success,
      status: json.status,
      results: json.results,
      message: json.message
    });
  }

}

export class ConsultarStockResults{
    id: number;
    deposito_id: number;
    producto_id: number;
    cantidad: number;

    constructor({ id, deposito_id, producto_id, cantidad }: { id: number; deposito_id: number; producto_id: number; cantidad: number }) {
        this.id = id;
        this.deposito_id = deposito_id;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
    }
}