

export class SucursalesResponse{
    success : boolean = false;
    status : number = 0;
    results : SucursalesResults[] | null = null;
    message : string = '';

    constructor({success, status, results, message} : Partial<SucursalesResponse>){
        this.success = success || this.success;
        this.status = status || this.status;
        this.results = results || this.results;
        this.message = message || this.message;
    }
    static fromJSON(data: Partial<SucursalesResponse>): SucursalesResponse {
        return new SucursalesResponse(data);
    }
}

export class SucursalesResults{
    id: number = 0;
    nombre: string = '';
    descripcion: string = '';
    direccion: string = '';
    telefono: string = '';
    empresa_id: number = 0;

    constructor({id, nombre, descripcion, direccion, telefono, empresa_id} : Partial<SucursalesResults>){
        this.id = id || this.id;
        this.nombre = nombre || this.nombre;
        this.descripcion = descripcion || this.descripcion;
        this.direccion = direccion || this.direccion;
        this.telefono = telefono || this.telefono;
        this.empresa_id = empresa_id || this.empresa_id;
    }

    static fromJSON(data: Partial<SucursalesResults>): SucursalesResults {
        return new SucursalesResults(data);
    }

}