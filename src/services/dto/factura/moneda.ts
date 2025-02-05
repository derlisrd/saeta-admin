export class MonedaResponse{
    success: boolean;
    status: number;
    results: MonedaResults[] | null;
    message: string;
    constructor({success, status, results, message} : {success: boolean, status: number, results: MonedaResults[] | null, message: string}){
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }
}

export class MonedaResults{
    id: number;
    nombre: string;
    simbolo: string;
    constructor({id, nombre, simbolo} : {id: number, nombre: string, simbolo: string}){
        this.id = id;
        this.nombre = nombre;
        this.simbolo = simbolo;
    }
}