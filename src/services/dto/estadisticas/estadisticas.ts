export class EstadisticasResponse {
    success: boolean;
    results: EstadisticasResults | null;
    status: number;
    message: string;
  
  
    constructor(data: EstadisticasResponse) {
      this.success = data.success;
      this.results = data.results ? EstadisticasResults.fromJson(data.results) : null;
      this.status = data.status;
      this.message = data.message;
    }
  }
  
  export class EstadisticasResults {
      ayer: Estadistica;
      hoy: Estadistica;
      mes: Estadistica;
      semana: Estadistica;
  
      constructor(data: EstadisticasResults) {
          this.hoy = data.hoy;
          this.mes = data.mes;
          this.semana = data.semana;
          this.ayer = data.ayer;
      }
  
      static fromJson(json: any): EstadisticasResults {
          return new EstadisticasResults({
            ayer: Estadistica.fromJson(json.ayer),
              hoy: Estadistica.fromJson(json.hoy),
              mes: Estadistica.fromJson(json.mes),
              semana: Estadistica.fromJson(json.semana)
          });
      }
  
  }
  
  export class Estadistica{
      cantidad: number;
      descuento: number;
      importe : number;
  
  
      constructor(data: Estadistica) {
          this.cantidad = data.cantidad;
          this.descuento = data.descuento;
          this.importe = data.importe;
      }
  
      static fromJson(json: any): Estadistica {
          return new Estadistica({
              cantidad: json.cantidad_pedidos,
              descuento: json.descuento_total,
              importe: json.importe_final_total
          });
      }
  
  }