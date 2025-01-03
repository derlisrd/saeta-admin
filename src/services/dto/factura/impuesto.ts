export class ImpuestoResponse{
   public success: boolean;
    public status: number;
    public results: ImpuestoResults[] | null;
    public message: string | null;

    constructor({
        success,
        status,
        results,
        message
    }:{
        success: boolean,
        status: number,
        results: ImpuestoResults[] | null,
        message?: string | null
    }){
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message || null;
    }

    public static fromJSON(json: Record<string, any>): ImpuestoResponse {
        return new ImpuestoResponse({
            success: json.success,
            status: json.status,
            results: json.results.map(ImpuestoResults.fromJSON),
            message: json.message
        });
    }
}

export class ImpuestoResults{
    public id: number;
    public descripcion: string;
    public valor: number;
    public porcentaje: string;

    constructor({
        id,
        descripcion,
        valor,
        porcentaje
    }:{
        id: number,
        descripcion: string,
        valor: number,
        porcentaje: string
    }){
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
        this.porcentaje = porcentaje;
    }

    public static fromJSON(json: Record<string, any>): ImpuestoResults {
        return new ImpuestoResults({
            id: json.id,
            descripcion: json.descripcion,
            valor: json.valor,
            porcentaje: json.porcentaje
        });
    }
}