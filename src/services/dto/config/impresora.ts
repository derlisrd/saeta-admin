export class ImpresoraResponse{
    success: boolean;
    status: number;
    results: Impresora[] | null;
    message: string;

    constructor({ success, status, results, message }: { success: boolean, status: number, results: Impresora[] | null, message: string }) {
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }
    static fromJSON(json: any): ImpresoraResponse {
        return new ImpresoraResponse({
            success: json.success,
            status: json.status,
            results: json.results.map((result: any) => Impresora.fromJSON(result)),
            message: json.message
        });
    }

}

export class Impresora{
    id: number | null;
    sucursal_id:  number | null;
    nombre: string;
    activo: boolean;
    mm: number;

    constructor({ id, nombre, activo, mm, sucursal_id }: { id: number | null, nombre: string, activo: boolean, mm: number, sucursal_id: number | null }) {
        this.id = id;
        this.nombre = nombre;
        this.activo = activo;
        this.mm = mm;
        this.sucursal_id = sucursal_id;
    }

    static fromJSON(json: any): Impresora {
        return new Impresora({
            id: json.id,
            nombre: json.nombre,
            activo: json.activo,
            mm: json.mm,
            sucursal_id: json.sucursal_id
        });
    }
}

