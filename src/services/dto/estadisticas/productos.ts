export class ProductosMasVendidosResponse{
  status: number;
  success: boolean;
  message: string;
  results: ProductosMasVendidosResults | null;


  constructor({ status, success, message, results }: Partial<ProductosMasVendidosResponse>) {
    this.status = status || 0;
    this.success = success || false;
    this.message = message || "";
    this.results = results || null;
  }
}


export class ProductosMasVendidosResults {
  productos: ProductoMasVendido[];
  total: number;
  constructor(data: Partial<ProductosMasVendidosResults>) {
    this.productos = data.productos || [];
    this.total = data.total || 0;
  }
}

export class ProductoMasVendido {
  id: number;
  nombre: string;
  precio: number;
  costo: number;
  cantidad_total_vendido: number;
  codigo: string;
  constructor(data: Partial<ProductoMasVendido>) {
    this.id = data.id || 0;
    this.nombre = data.nombre || "";
    this.precio = data.precio || 0;
    this.costo = data.costo || 0;
    this.cantidad_total_vendido = data.cantidad_total_vendido || 0;
    this.codigo = data.codigo || "";
  }
}
