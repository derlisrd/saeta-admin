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
  cliente: ClientePedidoResults;

  constructor({ id = 0, fecha = "", total = 0, estado = 0, created_at='',
    cliente = new ClientePedidoResults({})
   }: Partial<PedidosDelDiaResults>) {
    this.id = id;
    this.fecha = fecha;
    this.total = total;
    this.estado = estado;
    this.created_at = created_at;
    this.cliente = cliente;
  }

  static fromJson(json: any): PedidosDelDiaResults {
    return new PedidosDelDiaResults({
      ...json,
      fecha: json.created_at,
      created_at: (json.created_at),
    });
  }
}

export class ClientePedidoResults {
  id: number;
  doc: string;
  email: string | null;
  tipo: number;
  razon_social: string;
  telefono: string | null;

constructor({ id = 0, doc = "", email = "", tipo = 0, razon_social = "", telefono = "" }: Partial<ClientePedidoResults>) {
    this.id = id;
    this.doc = doc;
    this.email = email;
    this.tipo = tipo;
    this.razon_social = razon_social;
    this.telefono = telefono;
  }
}

export class ItemsPedidoResults {
    
}