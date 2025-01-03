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
    stock: null | AddStock[];

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
      stock
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
      stock: null | AddStock[];
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
      this.stock = stock;
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
        stock: json.stock ? json.stock.map((item: Record<string, any>) => AddStock.fromJSON(item)) : null,
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

  export class AddStock {
    deposito_id: number;
    cantidad: number;
    constructor({ deposito_id, cantidad }: { deposito_id: number; cantidad: number }) {
      this.deposito_id = deposito_id;
      this.cantidad = cantidad;
    }
  
    public static fromJSON(json: Record<string, any>): AddStock {
      return new AddStock({
        deposito_id: json.deposito_id,
        cantidad: json.cantidad,
      });
    }
  
    public toJSON(): Record<string, any> {
      return {
        deposito_id: this.deposito_id,
        cantidad: this.cantidad,
      };
    }
  }
  