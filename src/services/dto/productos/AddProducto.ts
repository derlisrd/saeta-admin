import { AtributosProducto } from "@/core/types/atributoproducto";
//import { AddStock } from "./AddStock";

export class AddProducto {
  impuesto_id: number;
  medida_id: number;
  category_id: number;
  descripcion: string;
  codigo: string;
  nombre: string;
  costo: number;
  precio_normal: number;
  precio_minimo: number;
  precio_descuento: number;
  porcentaje_comision: number;
  disponible: number;
  tipo: number;
  cantidad_minima: number;
  stock: number;
  deposito_id: number;
  modo_comision: number;

  images: File[] | null;
  atributos: AtributosProducto[];
  constructor({
    images = null,
    impuesto_id = 0,
    medida_id = 0,
    category_id = 0,
    codigo = "",
    nombre = "",
    descripcion = "",
    costo = 0,
    precio_normal = 0,
    precio_minimo = 0,
    precio_descuento = 0,
    disponible = 1,
    tipo = 1,
    cantidad_minima = 0,
    porcentaje_comision = 0,
    stock = 0,
    deposito_id = 0,
    modo_comision = 1,
    atributos = []
  }: Partial<AddProducto>) {
    this.images = images;
    this.impuesto_id = impuesto_id;
    this.medida_id = medida_id;
    this.category_id = category_id;
    this.codigo = codigo;
    this.nombre = nombre;
    this.costo = costo;
    this.descripcion = descripcion;
    this.precio_normal = precio_normal;
    this.precio_minimo = precio_minimo;
    this.precio_descuento = precio_descuento;
    this.disponible = disponible;
    this.tipo = tipo;
    this.cantidad_minima = cantidad_minima;
    this.atributos = atributos;
    this.stock = stock;
    this.deposito_id = deposito_id;
    this.porcentaje_comision = porcentaje_comision;
    this.modo_comision = modo_comision;
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
      descripcion: this.descripcion,
      nombre: this.nombre,
      costo: this.costo,
      precio_normal: this.precio_normal,
      precio_minimo: this.precio_minimo,
      precio_descuento: this.precio_descuento,
      modo_comision: 1,//this.modo_comision,
      porcentaje_comision: this.porcentaje_comision,
      disponible: this.disponible,
      tipo: this.tipo,
      cantidad_minima: this.cantidad_minima,
      stock: this.stock,
      deposito_id: this.deposito_id,
      atributos: this.atributos,
      images: this.images
    };
  }
}

export class AddProductoResponse {
  success: boolean;
  status: number;
  results: AddProductoResults | null;
  message: string;

  constructor({ success = false, status = 0, results = null, message = "" }: Partial<AddProductoResponse>) {
    this.success = success;
    this.status = status;
    this.results = results;
    this.message = message;
  }

  static fromJSON(json: Record<string, any>): AddProductoResponse {
    return new AddProductoResponse(json);
  }

  toJSON(): Record<string, any> {
    return {
      success: this.success,
      status: this.status,
      results: this.results,
      message: this.message
    };
  }
}

export class AddProductoResults {
  id: number;
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

  constructor({
    id = 0,
    impuesto_id = 0,
    medida_id = 0,
    category_id = 0,
    codigo = "",
    nombre = "",
    costo = 0,
    precio_normal = 0,
    precio_minimo = 0,
    disponible = 1,
    tipo = 1,
    cantidad_minima = 0
  }: Partial<AddProductoResults>) {
    this.id = id;
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
  }


  static fromJSON(json: Record<string, any>): AddProductoResults {
    return new AddProductoResults(json);
  }
}
