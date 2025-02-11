import { ClienteResults } from "./cliente";

export class ClientesResponse{
    success : boolean;
    status : number;
    results : any;
    message : ClienteResults[];
    constructor(){

    }
}

export class ClientesResults{
    id : string;
    nombre : string;
    documento : string;
    telefono : string;
    direccion : string;
    constructor(){}