export class MedidasResponse{
    public success: boolean;
     public status: number;
     public results: MedidasResults[] | null;
     public message : string | null;
     constructor({
         success,
         status,
         results,
         message
     }:{
         success: boolean,
         status: number,
         results: MedidasResults[] | null,
        message?: string | null
     }){
         this.success = success;
         this.status = status;
         this.results = results;
         this.message = message || null;
     }
 
     public static fromJSON(json: Record<string, any>): MedidasResponse {
         return new MedidasResponse({
             success: json.success,
             status: json.status,
             results: json.results.map(MedidasResults.fromJSON),
             message: json.message
         });
     }
 }
 
 export class MedidasResults{
     public id: number;
     public abreviatura: string;
     public descripcion: string | null;


        constructor({
            id,
            abreviatura,
            descripcion
        }:{
            id: number,
            abreviatura: string,
            descripcion: string | null
        }){
            this.id = id;
            this.abreviatura = abreviatura;
            this.descripcion = descripcion;
        }
        static fromJSON(json: Record<string, any>): MedidasResults {
            return new MedidasResults({
                id: json.id,
                abreviatura: json.nombre,
                descripcion: json.descripcion
            });
        }
 }