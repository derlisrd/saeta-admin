export class EstadisticasProductoResponse {
  success: boolean;
  message: string;
  status: number;
  results: EstadisticasProductoResults | null;

  constructor({ success, message, status, results }: Partial<EstadisticasProductoResponse>) {
    this.success = success ?? false;
    this.message = message ?? "";
    this.status = status ?? 0;
    this.results = results ?? null;
  }

  
}

export class EstadisticasProductoResults {
    cantidad: number;
    lucro: number;
    costo: number;
    total: number;
    ventas: Array<EstadisticasProductoVentas>;

  constructor() {
    this.cantidad = 0;
    this.lucro = 0;
    this.costo = 0;
    this.total = 0;
    this.ventas = [];
  }

  static fromJSON(data: any) {
    const results = new EstadisticasProductoResults();
    results.cantidad = data.cantidad;
    results.lucro = data.lucro;
    results.costo = data.costo;
    results.total = data.total;
    results.ventas = data.ventas.map((venta: any) => {
      const ventaObj = new EstadisticasProductoVentas();
      ventaObj.id = venta.id;
      ventaObj.nombre = venta.nombre;
      ventaObj.precio = venta.precio;
      ventaObj.costo = venta.costo;
      ventaObj.cantidad = venta.cantidad;
      ventaObj.descuento = venta.descuento;
      return ventaObj;
    });
    return results;
  }
}

export class EstadisticasProductoVentas {
  id: number;
  nombre: string;
  precio: number;
  costo: number;
  cantidad: number;
  descuento: number;

  constructor() {
    this.id = 0;
    this.nombre = "";
    this.precio = 0;
    this.costo = 0;
    this.cantidad = 0;
    this.descuento = 0;
  }
}