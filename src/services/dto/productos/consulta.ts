export class ConsultarPorDepositoResponse{
    success: boolean;
    status: number;
    results: ConsultarPorDepositoResults | null;
    message: string;

    constructor({
        success = false,
        status = 0,
        results = null,
        message = ''
    } : Partial<ConsultarPorDepositoResponse> = {}){
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }

    static fromJSON(json : any){
        return new ConsultarPorDepositoResponse({
            success: json.success,
            status: json.status,
            results: json.results,
            message: json.message
        })
    }
}

export class ConsultarPorDepositoResults {
    id: number;
    producto_id: number;
    deposito_id: number;
    codigo: string;
    nombre: string;
    impuesto_id: number;
    descripcion: string | null;
    costo: number;
    precio_normal: number;
    precio_minimo: number;
    disponible: number;
    tipo: number;
    cantidad: number;
    valor_comision: number | null;
    porcentaje_comision : number;
    constructor({
        id = 0,
        producto_id = 0,
        impuesto_id = 0,
        deposito_id = 0,
        codigo = '',
        nombre = '',
        descripcion = '',
        costo = 0,
        precio_normal = 0,
        precio_minimo = 0,
        disponible = 0,
        tipo = 0,
        cantidad = 0,
        valor_comision = 0,
        porcentaje_comision = 0
    } : Partial<ConsultarPorDepositoResults> = {}){
        this.id = id;
        this.producto_id = producto_id;
        this.deposito_id = deposito_id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.costo = costo;
        this.precio_normal = precio_normal;
        this.precio_minimo = precio_minimo;
        this.disponible = disponible;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.impuesto_id = impuesto_id;
        this.valor_comision = valor_comision;
        this.porcentaje_comision = porcentaje_comision;
    }
}