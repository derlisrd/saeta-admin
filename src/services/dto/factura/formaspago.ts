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
    tipo: "efectivo" | "digital";
    descripcion: string;
    porcentaje_descuento: number;

    constructor({ id = 0, tipo = "efectivo", descripcion = "", porcentaje_descuento = 0 }: { 
        id?: number; 
        tipo?: "efectivo" | "digital"; 
        descripcion?: string; 
        porcentaje_descuento?: number; 
    }) {
        this.id = id;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.porcentaje_descuento = porcentaje_descuento;
    }

    static fromJSON(data: any) {
        return new FormasPagoResults({
            id: data.id,
            tipo: data.tipo,
            descripcion: data.descripcion,
            porcentaje_descuento: data.porcentaje_descuento
        });
    }
}
