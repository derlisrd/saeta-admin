import { ClienteResults } from "./cliente";

export class ClientesResponse{
    success : boolean;
    status : number;
    message : string
    results : ClienteResults[] | null;
    constructor( { success = false, status = 500, results = [], message = ''} : Partial<ClientesResponse>) {
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }
}
