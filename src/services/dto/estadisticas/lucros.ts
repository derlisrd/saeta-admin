export class LucrosResponse {
    success: boolean;
    results: LucrosResults | null;
    status: number;
    message: string;
  
    constructor(data: LucrosResponse) {
      this.success = data.success;
      this.results = data.results ? LucrosResults.fromJson(data.results) : null;
      this.status = data.status;
      this.message = data.message;
    }
  }
  
  export class LucrosResults {
    ayer: LucroEstadistica;
    hoy: LucroEstadistica;
    mes: LucroEstadistica;
    semana: LucroEstadistica;
  
    constructor(data: LucrosResults) {
      this.hoy = data.hoy;
      this.mes = data.mes;
      this.semana = data.semana;
      this.ayer = data.ayer;
    }
  
    static fromJson(json: any): LucrosResults {
      return new LucrosResults({
        hoy: LucroEstadistica.fromJson(json.hoy),
        mes: LucroEstadistica.fromJson(json.mes),
        semana: LucroEstadistica.fromJson(json.semana),
        ayer: LucroEstadistica.fromJson(json.ayer),
      });
    }
  }
  
  export class LucroEstadistica {
    lucro: number;
  
    constructor(data: LucroEstadistica) {
      this.lucro = data.lucro;
    }
  
    static fromJson(json: any): LucroEstadistica {
      return new LucroEstadistica({
        lucro: json.lucro_total,
      });
    }
  }