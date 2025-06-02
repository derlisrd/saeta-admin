export class EstadisticasPedidosResponse {
    success: boolean;
    results: EstadisticasResults | null;
    status: number;
    message: string;
  
  
    constructor(data: EstadisticasPedidosResponse) {
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
      semana_pasada: Estadistica;
      mes_pasado: Estadistica;
  
      constructor(data: EstadisticasResults) {
          this.hoy = data.hoy;
          this.mes = data.mes;
          this.semana = data.semana;
          this.ayer = data.ayer;
          this.semana_pasada = data.semana_pasada;
          this.mes_pasado = data.mes_pasado;
      }
  
      static fromJson(json: any): EstadisticasResults {
          return new EstadisticasResults({
            ayer: Estadistica.fromJson(json.ayer),
              hoy: Estadistica.fromJson(json.hoy),
              mes: Estadistica.fromJson(json.mes),
              semana: Estadistica.fromJson(json.semana),
              semana_pasada: Estadistica.fromJson(json.semana_pasada),
              mes_pasado: Estadistica.fromJson(json.mes_pasado)
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
              cantidad: json.cantidad_pedidos | 0,
              descuento: json.descuento_total | 0,
              importe: json.importe_final_total | 0
          });
      }
  
  }