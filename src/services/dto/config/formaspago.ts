export class FormasPagoAdd {
  tipo: "caja" | "banco";
  condicion: "contado" | "credito";
  descripcion: string;
  porcentaje_descuento: number;

  constructor({
    tipo = "caja",
    condicion = "contado",
    descripcion = "",
    porcentaje_descuento = 0
  }: Partial<FormasPagoAdd>) {
    this.tipo = tipo;
    this.condicion = condicion;
    this.descripcion = descripcion;
    this.porcentaje_descuento = porcentaje_descuento;
  }
}

export class FormasPagoAddResponse {
    success: boolean;
    status: number;
    results: FormasPagoResults | null;
    message: string;
    constructor({ success = false , status = 0, results = null, message = '' }) {
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }
}



export class FormasPagoResponse {
    success: boolean;
    status: number;
    results: Array<FormasPagoResults>;
    message: string;
 
    constructor({ success = false , status = 0, results = [], message = '' }) {
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }

    static fromJSON(data: any) {
        return new FormasPagoResponse({
            success: data.success,
            status: data.status,
            results: data.results.map(FormasPagoResults.fromJSON),
            message: data.message
        });
    }
}

export class FormasPagoResults {
  id: number;
  tipo: "caja" | "banco";
  condicion: "contado" | "credito";
  descripcion: string;
  porcentaje_descuento: number;
  activo: number;

  constructor({
    id = 0,
    tipo = "caja",
    condicion = "contado",
    descripcion = "",
    porcentaje_descuento = 0,
    activo = 0
  }: {
    id?: number;
    tipo?: "caja" | "banco";
    condicion?: "contado" | "credito";
    descripcion?: string;
    porcentaje_descuento?: number;
    activo: number;
  }) {
    this.id = id;
    this.tipo = tipo;
    this.condicion = condicion;
    this.descripcion = descripcion;
    this.porcentaje_descuento = porcentaje_descuento;
    this.activo = activo;
  }

  static fromJSON(data: any) {
    return new FormasPagoResults({ ...data });
  }
}
