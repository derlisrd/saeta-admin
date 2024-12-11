export class ProductoResponse{
    
}


export class AddProducto {
    impuesto_id: number;
    codigo: number;
    nombre: string;
    costo: number;
    precio_normal: number;
    precio_minimo: number;
    disponible: number;
    tipo: number;
    cantidad_minima: number;
  
    constructor({
      impuesto_id,
      codigo,
      nombre,
      costo,
      precio_normal,
      precio_minimo,
      disponible,
      tipo,
      cantidad_minima,
    }: {
      impuesto_id: number;
      codigo: number;
      nombre: string;
      costo: number;
      precio_normal: number;
      precio_minimo: number;
      disponible: number;
      tipo: number;
      cantidad_minima: number;
    }) {
      this.impuesto_id = impuesto_id;
      this.codigo = codigo;
      this.nombre = nombre;
      this.costo = costo;
      this.precio_normal = precio_normal;
      this.precio_minimo = precio_minimo;
      this.disponible = disponible;
      this.tipo = tipo;
      this.cantidad_minima = cantidad_minima;
    }
  
    public static fromJSON(json: Record<string, any>): AddProducto {
      return new AddProducto({
        impuesto_id: json.impuesto_id,
        codigo: json.codigo,
        nombre: json.nombre,
        costo: json.costo,
        precio_normal: json.precio_normal,
        precio_minimo: json.precio_minimo,
        disponible: json.disponible,
        tipo: json.tipo,
        cantidad_minima: json.cantidad_minima,
      });
    }
  
    public toJSON(): Record<string, any> {
      return {
        impuesto_id: this.impuesto_id,
        codigo: this.codigo,
        nombre: this.nombre,
        costo: this.costo,
        precio_normal: this.precio_normal,
        precio_minimo: this.precio_minimo,
        disponible: this.disponible,
        tipo: this.tipo,
        cantidad_minima: this.cantidad_minima,
      };
    }
  }
  