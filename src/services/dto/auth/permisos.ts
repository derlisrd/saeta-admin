export class PermisosResponse {
    success: boolean;
    message: string;
    results: PermisosResults[];
    status: number;
  
    constructor({ success, message, results, status }: { success: boolean; message: string; results: PermisosResults[]; status: number }) {
      this.success = success;
      this.message = message;
      this.results = results;
      this.status = status;
    }
  
  }
  
  export class PermisosResults {
    id: number;
    modulo: string;
    accion: string;
  
    constructor({ id, modulo, accion }: { id: number; modulo: string; accion: string }) {
      this.id = id;
      this.modulo = modulo;
      this.accion = accion;
    }
  
  }


  export class PermisosByUserResponse {
    success: boolean;
    message: string;
    results: PermisosByUserResults[];
    status: number;
  
    constructor({ success = false, message = "", results = [], status = 0 } : Partial<PermisosByUserResponse>){
      this.success = success;
      this.message = message;
      this.results = results;
      this.status = status;
    }
  }
  
  export class PermisosByUserResults {
    id: number;
    user_id: number;
    permiso_id: number;
  
    constructor({ id = 0, user_id = 0, permiso_id = 0 } : Partial<PermisosByUserResults>){
      this.id = id;
      this.user_id = user_id;
      this.permiso_id = permiso_id;
    }
  
  }