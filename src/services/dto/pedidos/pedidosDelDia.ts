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
    codigo_producto: string;
    cantidad: number;
    nombre_prooducto: string;
    precio: number;
    total: number;

    constructor({ codigo_producto = "", cantidad = 0, nombre_prooducto = "", precio = 0, total = 0 }: Partial<ItemsPedidoResults>) {
        this.codigo_producto = codigo_producto;
        this.cantidad = cantidad;
        this.nombre_prooducto = nombre_prooducto;
        this.precio = precio;
        this.total = total;
    }
}