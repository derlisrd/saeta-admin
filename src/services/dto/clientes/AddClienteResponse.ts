import { ClienteResults } from "./cliente";

export class AddClienteRensponse {
    success: boolean;
    message: string;
    status: number;
    results: ClienteResults | null;

    constructor({ success = false, message = '', results = null, status = 0  } : Partial<AddClienteRensponse> ){
        this.success = success;
        this.message = message;
        this.results = results;
        this.status = status;
    }
}