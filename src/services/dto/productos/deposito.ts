export class DepositoResponse{
    public success: boolean;
     public status: number;
     public results: DepositoResults[] | null;
     public message : string | null;
     constructor({
         success=false,
         status=0,
         results=null,
         message
     }:Partial<DepositoResponse>){
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
 
 export class DepositoResults {
   public id: number;
   public sucursal_id: number;
   public nombre: string;
   public descripcion: string | null;
   public activo: number;
   constructor({ id =0, nombre='', sucursal_id=0, descripcion='', activo=0 }: Partial<DepositoResults>) {
     this.id = id;
     this.nombre = nombre;
     this.sucursal_id = sucursal_id;
     this.descripcion = descripcion;
     this.activo = activo;
   }
   static fromJSON(json: Record<string, any>): DepositoResults {
     return new DepositoResults({
       id: json.id,
       nombre: json.nombre,
       sucursal_id: json.sucursal_id,
       descripcion: json.descripcion,
       activo: json.activo});
   }
 }

 export class DepositoActivoResponse{
  public success: boolean;
     public status: number;
     public results: DepositoResults | null;
     public message : string | null;
     constructor({
         success=false,
         status=0,
         results=null,
         message
     }:Partial<DepositoActivoResponse>){
         this.success = success;
         this.status = status;
         this.results = results;
         this.message = message || null;
     }
  }