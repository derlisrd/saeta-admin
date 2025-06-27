import { ClienteResults } from "../clientes/cliente";

export class AddPedido {
  aplicar_impuesto: boolean = true;
  entregado: boolean = false;
  cliente_id: number = 0;
  cliente: string = "";
  formas_pagos: FormasPago[] = [];
  moneda_id: number = 0;
  tipo: number = 0;
  condicion: number = 0;
  porcentaje_descuento: number = 0;
  descuento: number = 0;
  total: number = 0;
  items: AddPedidoItem[] = [];
  fecha_vencimiento: string = "";

  constructor({
    aplicar_impuesto,
    cliente_id,
    entregado,
    formas_pagos,
    moneda_id,
    cliente,
    tipo,
    porcentaje_descuento,
    descuento,
    total,
    items,
    condicion,
    fecha_vencimiento
  }: Partial<AddPedido> = {}) { // Se agrega un objeto vacío como valor por defecto
    this.entregado = entregado ?? this.entregado;
    this.moneda_id = moneda_id ?? this.moneda_id;
    this.aplicar_impuesto = aplicar_impuesto ?? this.aplicar_impuesto;
    this.cliente_id = cliente_id ?? this.cliente_id;
    this.cliente = cliente ?? this.cliente;
    this.formas_pagos = formas_pagos ?? this.formas_pagos;
    this.tipo = tipo ?? this.tipo;
    this.condicion = condicion ?? this.condicion;
    this.porcentaje_descuento = porcentaje_descuento ?? this.porcentaje_descuento;
    this.descuento = descuento ?? this.descuento;
    this.total = total ?? this.total;
    this.items = (items ?? this.items).map((item) => new AddPedidoItem(item));
    this.fecha_vencimiento = fecha_vencimiento ?? this.fecha_vencimiento;
  }
}

export class AddPedidoItem {
  producto_id: number;
  nombre: string;
  codigo: string;
  deposito_id: number;
  impuesto_id: number;
  cantidad: number;
  precio: number;
  descuento: number;
  total: number;
  observacion: string;
  cantidad_disponible: number;

  constructor({
    producto_id = 0,
    deposito_id = 0,
    impuesto_id = 0,
    cantidad = 0,
    precio = 0,
    descuento = 0,
    total = 0,
    observacion = "",
    codigo = "",
    nombre = "",
    cantidad_disponible = 0
  }: Partial<AddPedidoItem>) {
    this.producto_id = producto_id;
    this.deposito_id = deposito_id;
    this.impuesto_id = impuesto_id;
    this.cantidad = cantidad;
    this.precio = precio;
    this.descuento = descuento;
    this.total = total;
    this.observacion = observacion;
    this.codigo = codigo;
    this.nombre = nombre;
    this.cantidad_disponible = cantidad_disponible;
  }
}

export class FormasPago{
  id: number;
  abreviatura: string;
  monto: number;
  detalles: string | undefined;
  constructor({ id = 0, abreviatura = "", monto = 0, detalles ='' }: Partial<FormasPago>) {
    this.id = id;
    this.abreviatura = abreviatura;
    this.monto = monto;
    this.detalles = detalles
  }
}

export class AddPedidoResponse {
  success: boolean;
  status: number;
  results: AddPedidoResults | null;
  message: string;

  constructor({ success = false, status = 0, results = null, message = "" }: Partial<AddPedidoResponse>) {
    this.success = success;
    this.status = status;
    this.results = results === null ? null : AddPedidoResults.fromJSON(results) ;
    this.message = message;
  }

  static fromJSON(data: any) {
    return new AddPedidoResponse({
      success: data.success as boolean,
      status: data.status as number,
      results: data.results ? AddPedidoResults.fromJSON(data.results) : null,
      message: data.message as string
    });
  }
}
export class AddPedidoResults{
  id: number;
  total: number;
  cliente: ClienteResults;
  estado: number;
  formas_pago_pedido: FormasPagoPedido[];
  fecha : string;
  descuento: number;
  importe_final: number;
  tipo: number;
  condicion: number;

  constructor({ created_at = '',tipo=0, id = 0, total = 0, estado = 1, descuento = 0, cliente = new ClienteResults({}), formas_pago_pedido = [], importe_final = 0, condicion =0 }) {
      this.total = total;
      this.id = id;
      this.estado = estado;
      this.descuento = descuento;
      this.cliente = cliente;
      this.formas_pago_pedido =  formas_pago_pedido;
      this.fecha = this.formatFecha(created_at);
      this.importe_final = importe_final;
      this.tipo = tipo;
      this.condicion = condicion
    }

    static fromJSON(data: any) {
      return new AddPedidoResults({
        ...data,
        id: data.id as number,
        total: data.total as number,
        tipo: data.tipo,
        importe_final: data.importe_final,
        descuento: data.descuento as number,
        cliente: ClienteResults.fromJSON(data.cliente),
        formas_pago_pedido:  (data.formas_pago_pedido || []).map((item: any) => FormasPagoPedido.fromJSON(item)),
        created_at: data.created_at as string
      });
    }

    private formatFecha(fecha: string): string {
        if (!fecha) return '';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES'); // Formato DD/MM/YYYY
    }
}

export class FormasPagoPedido{
id: number;
forma_pago_id: number;
monto: number;
abreviatura: string;
constructor({ id = 0, forma_pago_id = 0, monto = 0, abreviatura='' }: Partial<FormasPagoPedido>) {
  this.id = id;
  this.forma_pago_id = forma_pago_id;
  this.monto = monto;
  this.abreviatura = abreviatura
}
static fromJSON(data: any) {
  return new FormasPagoPedido({
    id: data.id as number,
    forma_pago_id: data.forma_pago_id as number,
    monto: data.monto as number,
    abreviatura: data.abreviatura as string
  });
}
}