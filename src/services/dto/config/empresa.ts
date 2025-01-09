import { Empresa } from "../login";

export class EmpresaResponse{
    success : boolean;
    status: number;
    message: string;
    results: Empresa | null;

    constructor({success = false, status = 0, message='',results=null} : Partial<EmpresaResponse>){
        this.success = success;
        this.status = status;
        this.message = message;
        this.results = results;
    }

    static fromJSON(json: Record<string, any>): EmpresaResponse {
        return new EmpresaResponse(json);
      }
}