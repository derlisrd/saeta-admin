export class PedidosDelDiaResponse {
  success: boolean;
  status: number;
  results: PedidosDelDiaResults[] | null;
  message: string;

  constructor({ success = false, status = 0, results = null, message = "" }: Partial<PedidosDelDiaResponse>) {
    this.success = success;
    this.status = status;
    this.results = results;
    this.message = message;
  }
}

export class PedidosDelDiaResults {
  id: number;
  fecha: string;
  created_at: string;
  total: number;
  estado: number;
  razon_social: string;
  doc: string;
  items: ItemsPedidoResults[];

  constructor({ id = 0, fecha = "", total = 0, estado = 0, created_at='',
    razon_social ='', doc = '', items = []
   }: Partial<PedidosDelDiaResults>) {
    this.id = id;
    this.fecha = fecha;
    this.total = total;
    this.estado = estado;
    this.created_at = created_at;
    this.razon_social = razon_social;
    this.doc = doc;
    this.items = items;
  }

  static fromJson(json: any): PedidosDelDiaResults {
    return new PedidosDelDiaResults({
      ...json,
      fecha: json.created_at
    });
  }
}



export class ItemsPedidoResults {
    codigo: string;
    cantidad: number;
    nombre: string;
    precio: number;
    total: number;
    impuesto_descripcion: string;
    impuesto_valor: number;
   

    constructor({ codigo = "", cantidad = 0, nombre = "", precio = 0, total = 0, impuesto_descripcion='', impuesto_valor=0 }: Partial<ItemsPedidoResults>) {
        this.codigo = codigo;
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;
        this.total = total;
        this.impuesto_descripcion = impuesto_descripcion;
        this.impuesto_valor = impuesto_valor;
    }
}
