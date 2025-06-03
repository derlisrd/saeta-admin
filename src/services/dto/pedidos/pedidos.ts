export class PedidosResponse{
  success: boolean;
  status: number;
  results: PedidosResults[] | null;
  message: string;


  constructor({ success, status, results, message }: { success: boolean; status: number; results: PedidosResults[] | null; message: string }) {
    this.success = success;
    this.status = status;
    this.results = results;
    this.message = message;
  }
}

export class PedidosResults{
  id: number;
  fecha: string;
  created_at: string;
  estado: number;
  descuento: number;
  doc: string;
  razon_social: string;
  tipo: number;
  total: number;
  importe_final: number;
  formas_pago_pedido: FormasPagoPedido[];
  items: Item[];

  constructor({
    id,
    fecha,
    created_at,
    estado,
    descuento,
    doc,
    razon_social,
    tipo,
    total,
    importe_final,
    formas_pago_pedido,
    items
  }: {
    id: number;
    fecha: string;
    created_at: string;
    estado: number;
    descuento: number;
    doc: string;
    razon_social: string;
    tipo: number;
    total: number;
    importe_final: number;
    formas_pago_pedido: FormasPagoPedido[];
    items: Item[];
  }) {
    this.id = id;
    this.fecha = fecha;
    this.created_at = created_at;
    this.estado = estado;
    this.descuento = descuento;
    this.doc = doc;
    this.razon_social = razon_social;
    this.tipo = tipo;
    this.total = total;
    this.importe_final = importe_final;
    this.formas_pago_pedido = formas_pago_pedido;
    this.items = items;
  }

  static fromJSON(json: any): PedidosResults {
    return new PedidosResults({
        ...json,
        fecha: json.created_at
    });
  }
}

export class FormasPagoPedido {
  id: number;
  abreviatura: string;
  detalles: string | null;
  monto: string;

  constructor({ id, abreviatura, detalles, monto }: { id: number; abreviatura: string; detalles: string | null; monto: string }) {
    this.id = id;
    this.abreviatura = abreviatura;
    this.detalles = detalles;
    this.monto = monto;
  }
}

export class Item{
    id: number;
  cantidad: number;
  codigo: string;
  impuesto_descripcion: string;
  impuesto_id: number;
  impuesto_valor: number;
  precio: number;
  nombre: string;

  constructor({
    id,
    cantidad,
    codigo,
    impuesto_descripcion,
    impuesto_id,
    impuesto_valor,
    precio,
    nombre
  }: {
    id: number;
    cantidad: number;
    codigo: string;
    impuesto_descripcion: string;
    impuesto_id: number;
    impuesto_valor: number;
    precio: number;
    nombre: string;
  }) {
    this.id = id;
    this.cantidad = cantidad;
    this.codigo = codigo;
    this.impuesto_descripcion = impuesto_descripcion;
    this.impuesto_id = impuesto_id;
    this.impuesto_valor = impuesto_valor;
    this.precio = precio;
    this.nombre = nombre;
  }
}
