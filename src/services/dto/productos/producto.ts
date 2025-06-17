export class ProductoResponse{
    public success : boolean;
    public status : number;
    public results : ProductoResults[] | null;
    public message : string;

    constructor({ success = false, status = 0, results = null, message = "" } : Partial<ProductoResponse>){
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }

    static fromJSON(json : Record<string, any>) : ProductoResponse{
        
        return new ProductoResponse({
            success: json.success,
            status: json.status,
            message: json.message,
            results: Array.isArray(json.results) 
                ? json.results.map((result) => ProductoResults.fromJSON(result))
                : null,
        });
    }

}

export class ProductoResults{
    id: number;
    impuesto_id: number;
    category_id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    costo: number;
    precio_normal: number;
    precio_minimo: number;
    disponible: number;
    tipo: number;
    cantidad_minima: number;
    created_at: string;
    cantidad: number | null;
    images: ProductoResultsImages[]
  
    constructor({
      id = 0,
      impuesto_id = 0,
      category_id = 0,
      codigo = "",
      nombre = "",
      descripcion = '',
      costo = 0,
      precio_normal = 0,
      precio_minimo = 0,
      disponible = 1,
      tipo = 1,
      cantidad_minima = 0,
      created_at = "",
      cantidad = null,
      images = []
    }: Partial<ProductoResults>) {
      this.id = id;
      this.impuesto_id = impuesto_id;
      this.category_id = category_id;
      this.codigo = codigo;
      this.nombre = nombre;
      this.costo = costo;
      this.precio_normal = precio_normal;
      this.precio_minimo = precio_minimo;
      this.disponible = disponible;
      this.tipo = tipo;
      this.cantidad_minima = cantidad_minima;
      this.descripcion = descripcion;
      this.created_at = created_at;
      this.cantidad = cantidad;
      this.images = images;
    }
  
  
    static fromJSON(json: Record<string, any>): ProductoResults {
      return new ProductoResults({
        ...json,
      cantidad: json.cantidad || null
      });
    }
}

export class ProductoResultsImages{
  id: number;
  url: string;
  miniatura: string;

  constructor({
    id = 0,
    url = "",
    miniatura = ""
  }: Partial<ProductoResultsImages>) {
    this.id = id;
    this.url = url;
    this.miniatura = miniatura;
  }
  
  static fromJSON(json: Record<string, any>): ProductoResultsImages {
    return new ProductoResultsImages({
      ...json,
    });
  }
}