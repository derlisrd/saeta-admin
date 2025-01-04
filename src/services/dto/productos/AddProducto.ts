import { AddStock } from "./AddStock";

export class AddProducto {
    impuesto_id: number;
    medida_id: number;
    category_id: number;
    codigo: string;
    nombre: string;
    costo: number;
    precio_normal: number;
    precio_minimo: number;
    disponible: number;
    tipo: number;
    cantidad_minima: number;
    stock: AddStock[];
  
    constructor({
      impuesto_id = 0,
      medida_id = 0,
      category_id = 0,
      codigo = '',
      nombre = '',
      costo = 0,
      precio_normal = 0,
      precio_minimo = 0,
      disponible = 1,
      tipo = 1,
      cantidad_minima = 0,
      stock = [],
    }: Partial<AddProducto>) {
      this.impuesto_id = impuesto_id;
      this.medida_id = medida_id;
      this.category_id = category_id;
      this.codigo = codigo;
      this.nombre = nombre;
      this.costo = costo;
      this.precio_normal = precio_normal;
      this.precio_minimo = precio_minimo;
      this.disponible = disponible;
      this.tipo = tipo;
      this.cantidad_minima = cantidad_minima;
      this.stock = stock.map((item) => new AddStock(item));
    }
  
    static fromJSON(json: Record<string, any>): AddProducto {
      return new AddProducto(json);
    }
  
    toJSON(): Record<string, any> {
      return {
        impuesto_id: this.impuesto_id,
        medida_id: this.medida_id,
        category_id: this.category_id,
        codigo: this.codigo,
        nombre: this.nombre,
        costo: this.costo,
        precio_normal: this.precio_normal,
        precio_minimo: this.precio_minimo,
        disponible: this.disponible,
        tipo: this.tipo,
        cantidad_minima: this.cantidad_minima,
        stock: this.stock.map((item) => item.toJSON()),
      };
    }
  }
  

  