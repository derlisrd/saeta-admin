export class EstadisticasProductoResponse {
  success: boolean;
  message: string;
  status: number;
  results: EstadisticasProductoResults | null;

  constructor({ success, message, status, results }: Partial<EstadisticasProductoResponse>) {
    this.success = success ?? false;
    this.message = message ?? "";
    this.status = status ?? 0;
    this.results = results ? EstadisticasProductoResults.fromJSON(results) : null;
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
      return EstadisticasProductoVentas.fromJSON(venta);
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
  fecha: string;

  constructor({ id, nombre, precio, costo, cantidad, descuento, fecha }: Partial<EstadisticasProductoVentas>) {
    this.id = id ?? 0;
    this.nombre = nombre ?? "";
    this.precio = precio ?? 0;
    this.costo = costo ?? 0;
    this.cantidad = cantidad ?? 0;
    this.descuento = descuento ?? 0;
    this.fecha = fecha ?? "";
  }
  static fromJSON(data: any) {
    return new EstadisticasProductoVentas({
      id: data.id,
      nombre: data.nombre,
      precio: data.precio,
      costo: data.costo,
      cantidad: data.cantidad,
      descuento: data.descuento,
      fecha: data.created_at
    });
  }
}