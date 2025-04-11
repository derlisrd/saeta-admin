import { ClienteResults } from "../clientes/cliente";
import { FormasPagoResults } from "../factura/formaspago";

export class AddPedido {
  aplicar_impuesto: boolean;
  entregado: boolean;
  cliente_id: number;
  cliente: string;
  formas_pagos: FormasPago[];
  moneda_id: number;
  tipo: number;
  porcentaje_descuento: number;
  descuento: number;
  total: number;
  items: AddPedidoItem[];

  constructor({
    aplicar_impuesto = true,
    cliente_id = 0,
    entregado = false,
    formas_pagos = [],
    moneda_id = 0,
    cliente = "",
    tipo = 0,
    porcentaje_descuento = 0,
    descuento = 0,
    total = 0,
    items = []
  }: Partial<AddPedido>) {
    this.entregado = entregado;
    this.moneda_id = moneda_id;
    this.aplicar_impuesto = aplicar_impuesto;
    this.cliente_id = cliente_id;
    this.cliente = cliente;
    this.formas_pagos = formas_pagos;
    this.tipo = tipo;
    this.porcentaje_descuento = porcentaje_descuento;
    this.descuento = descuento;
    this.total = total;
    this.items = items.map((item) => new AddPedidoItem(item));
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
  constructor({ id = 0, abreviatura = "", monto = 0 }: Partial<FormasPago>) {
    this.id = id;
    this.abreviatura = abreviatura;
    this.monto = monto;
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
      results: data.results ? new AddPedidoResults(data.results) : null,
      message: data.message as string
    });
  }
}

export class AddPedidoResults{
    id: number;
    total: number;
    descuento: number;
    cliente: ClienteResults;
    estado: number;
    formas_pago_pedido: FormasPagoPedido[];
    fecha : string;


    constructor({ created_at = '', id = 0, total = 0, estado = 1, descuento = 0, cliente = new ClienteResults({}), formas_pago_pedido = [] }) {
        this.total = total;
        this.id = id;
        this.estado = estado;
        this.descuento = descuento;
        this.cliente = cliente;
        this.formas_pago_pedido =  formas_pago_pedido;
        this.fecha = this.formatFecha(created_at);
      }
  
      static fromJSON(data: any) {
        return new AddPedidoResults({
          id: data.id as number,
          total: data.total as number,
          descuento: data.descuento as number,
          cliente: ClienteResults.fromJSON(data.cliente),
          formas_pago_pedido:  data.formas_pago_pedido.map((item: FormasPagoPedido) => new FormasPagoPedido(item)),
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
      id: data.id,
      forma_pago_id: data.forma_pago_id,
      monto: data.monto,
      abreviatura: data.abreviatura
    });
  }
}
