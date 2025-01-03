export class DepositoResponse{
    public success: boolean;
     public status: number;
     public results: DepositoResults[] | null;
     public message : string | null;
     constructor({
         success,
         status,
         results,
         message
     }:{
         success: boolean,
         status: number,
         results: DepositoResults[] | null,
            message?: string | null
     }){
         this.success = success;
         this.status = status;
         this.results = results;
         this.message = message || null;
     }
 
     public static fromJSON(json: Record<string, any>): DepositoResponse {
         return new DepositoResponse({
             success: json.success,
             status: json.status,
             results: json.results.map(DepositoResults.fromJSON),
             message: json.message
         });
     }
 }
 
 export class DepositoResults{
     public id: number;
     public sucursal_id: number;
     public nombre: string;
     public descripcion: string | null;

        constructor({
            id,
            nombre,
            sucursal_id,
            descripcion
        }:{
            id: number,
            nombre: string,
            sucursal_id: number,
            descripcion: string | null
        }){
            this.id = id;
            this.nombre = nombre;
            this.sucursal_id = sucursal_id;
            this.descripcion = descripcion;
        }
        static fromJSON(json: Record<string, any>): DepositoResults {
            return new DepositoResults({
                id: json.id,
                sucursal_id: json.sucursal_id,
                nombre: json.nombre,
                descripcion: json.descripcion,
            });
        }
 }