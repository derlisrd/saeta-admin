export class CategoriaResponse{
    public success: boolean;
     public status: number;
     public results: CategoriaResults[] | null;
     public message : string | null;
     constructor({
         success,
         status,
         results,
         message
     }:{
         success: boolean,
         status: number,
         results: CategoriaResults[] | null,
            message?: string | null
     }){
         this.success = success;
         this.status = status;
         this.results = results;
         this.message = message || null;
     }
 
     public static fromJSON(json: Record<string, any>): CategoriaResponse {
         return new CategoriaResponse({
             success: json.success,
             status: json.status,
             results: json.results.map(CategoriaResults.fromJSON),
             message: json.message
         });
     }
 }
 
 export class CategoriaResults{
     public id: number;
     public nombre: string;
     public descripcion: string | null;
     public publicado : number;

        constructor({
            id,
            nombre,
            descripcion,
            publicado
        }:{
            id: number,
            nombre: string,
            descripcion: string | null,
            publicado: number
        }){
            this.id = id;
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.publicado = publicado;
        }
        static fromJSON(json: Record<string, any>): CategoriaResults {
            return new CategoriaResults({
                id: json.id,
                nombre: json.nombre,
                descripcion: json.descripcion,
                publicado: json.publicado
            });
        }
 }