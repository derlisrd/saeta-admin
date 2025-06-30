import { AtributosProducto } from "@/core/types/atributoproducto";


export class EditProductoForm {
  impuesto_id: number;
  medida_id: number;
  category_id: number;
  descripcion: string;
  codigo: string;
  nombre: string;
  costo: number;
  precio_normal: number;
  precio_minimo: number;
  disponible: number;
  tipo: number;
  cantidad_minima: number;

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
    disponible = 1,
    tipo = 1,
    cantidad_minima = 0,
    atributos = []
  }: Partial<EditProductoForm>) {
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
    this.disponible = disponible;
    this.tipo = tipo;
    this.cantidad_minima = cantidad_minima;
    this.atributos = atributos;
  }

  static fromJSON(json: Record<string, any>): EditProductoForm {
    return new EditProductoForm(json);
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
      disponible: this.disponible,
      tipo: this.tipo,
      cantidad_minima: this.cantidad_minima,
      atributos: this.atributos,
      images: this.images
    };
  }
}

export class EditProductoFormResponse {
  success: boolean;
  status: number;
  results: EditProductoFormResults | null;
  message: string;

  constructor({ success = false, status = 0, results = null, message = "" }: Partial<EditProductoFormResponse>) {
    this.success = success;
    this.status = status;
    this.results = results;
    this.message = message;
  }

  static fromJSON(json: Record<string, any>): EditProductoFormResponse {
    return new EditProductoFormResponse(json);
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

export class EditProductoFormResults {
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
  }: Partial<EditProductoFormResults>) {
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


  static fromJSON(json: Record<string, any>): EditProductoFormResults {
    return new EditProductoFormResults(json);
  }
}
