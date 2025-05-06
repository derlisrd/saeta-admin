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
  importe_final: number;
  formas_pago_pedido: FormasPagoPedidoResults[];
  descuento: number;
  tipo: number;

  constructor({ id = 0, fecha = "", total = 0, estado = 0, created_at='',
    razon_social ='', doc = '', items = [], importe_final = 0, formas_pago_pedido = [], descuento = 0, tipo=0
   }: Partial<PedidosDelDiaResults>) {
    this.id = id;
    this.fecha = fecha;
    this.total = total;
    this.estado = estado;
    this.created_at = created_at;
    this.razon_social = razon_social;
    this.doc = doc;
    this.items = items;
    this.importe_final = importe_final;
    this.formas_pago_pedido = formas_pago_pedido;
    this.descuento = descuento;
    this.tipo = tipo;
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
export class FormasPagoPedidoResults {
    id: number;
    abreviatura: string;
    monto: string;

    constructor({ id = 0, abreviatura = "", monto = "" }: Partial<FormasPagoPedidoResults>) {
        this.id = id;
        this.abreviatura = abreviatura;
        this.monto = monto;
    }

}