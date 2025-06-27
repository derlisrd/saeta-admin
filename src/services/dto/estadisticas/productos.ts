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

/* "productos": [
      {
        "id": 3,
        "nombre": "corbata",
        "precio": 123400,
        "costo": 80000,
        "total_vendido": 28
      },
      {
        "id": 1,
        "nombre": "Producto",
        "precio": 17000,
        "costo": 9000,
        "total_vendido": 19
      },
      {
        "id": 2,
        "nombre": "Nombre de producto",
        "precio": 45000,
        "costo": 19000,
        "total_vendido": 15
      },
      {
        "id": 5,
        "nombre": "Guitarra",
        "precio": 30000,
        "costo": 9000,
        "total_vendido": 7
      },
      {
        "id": 14,
        "nombre": "Manzanas",
        "precio": 1400,
        "costo": 900,
        "total_vendido": 6
      },
      {
        "id": 7,
        "nombre": "Teclado redragon 890 kb",
        "precio": 240000,
        "costo": 132000,
        "total_vendido": 5
      },
      {
        "id": 4,
        "nombre": "Zapatos",
        "precio": 12000,
        "costo": 9000,
        "total_vendido": 5
      },
      {
        "id": 17,
        "nombre": "Iphone 15 Pro",
        "precio": 1500000,
        "costo": 500000,
        "total_vendido": 4
      },
      {
        "id": 10,
        "nombre": "LG L2",
        "precio": 1600000,
        "costo": 900000,
        "total_vendido": 3
      },
      {
        "id": 6,
        "nombre": "Bajo",
        "precio": 13000,
        "costo": 9000,
        "total_vendido": 3
      }
    ],
    "total": 95 */

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
  total_vendido: number;
  constructor(data: Partial<ProductoMasVendido>) {
    this.id = data.id || 0;
    this.nombre = data.nombre || "";
    this.precio = data.precio || 0;
    this.costo = data.costo || 0;
    this.total_vendido = data.total_vendido || 0;
  }
}
