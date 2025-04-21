import { Impresora } from "./config/impresora"

export class Sucursal {
  public id: number
    public empresa_id: number
    public nombre: string
    public descripcion: string
    public direccion: string
    public telefono: string
    public numero: number
    public created_at: string
    public updated_at: string
  
  constructor({ id = 0, empresa_id = 0, nombre = '', descripcion = '', direccion = '', telefono = '', numero = 0, created_at = '', updated_at = '' }: Partial<Sucursal>) {
    this.id = id
    this.empresa_id = empresa_id
    this.nombre = nombre
    this.descripcion = descripcion
    this.direccion = direccion
    this.telefono = telefono
    this.numero = numero
    this.created_at = created_at
    this.updated_at = updated_at
  }

  static fromJSON(data: any): Sucursal {
    return new Sucursal({
      id: data.id,
      empresa_id: data.empresa_id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      direccion: data.direccion,
      telefono: data.telefono,
      numero: data.numero,
      created_at: data.created_at,
      updated_at: data.updated_at
    });
  }
}

export class User {
  constructor(
    public id: number,
    public empresa_id: number,
    public sucursal_id: number,
    public name: string,
    public username: string,
    public email: string,
    public tipo: number,
    public activo: number,
    public cambiar_password: number,
    public sucursal: Sucursal
  ) {}

  static fromJSON(data: any): User {
    return new User(
      data.id,
      data.empresa_id,
      data.sucursal_id,
      data.name,
      data.username,
      data.email,
      data.tipo,
      data.activo,
      data.cambiar_password,
      Sucursal.fromJSON(data.sucursal)
    );
  }
}

export class Empresa {
    public id: number
    public nombre: string
    public ruc: string
    public telefono: string
    public direccion: string
    public licencia: string
    public propietario: string | null
    public configurado: number
    public created_at: string

  
    constructor( { id = 0, nombre = '', ruc ='', telefono='', direccion='',licencia='', propietario = null, configurado = 0, created_at ='' } : Partial<Empresa>) {
      this.id = id
      this.nombre = nombre
      this.ruc = ruc
      this.telefono = telefono
      this.direccion = direccion
      this.licencia = licencia
      this.propietario = propietario
      this.configurado = configurado
      this.created_at = created_at
    }

  static fromJSON(data: any): Empresa {
    return new Empresa({
      id: data.id,
      nombre: data.nombre,
      ruc: data.ruc,
      telefono: data.telefono,
      direccion: data.direccion,
      licencia: data.licencia,
      propietario: data.propietario,
      configurado: data.configurado,
      created_at: data.created_at
    });
  }
}

export class LoginResults {
  public user: User
  public token: string
  public empresa: Empresa
  public tokenRaw: string
  public impresoras: Impresora[] | null

  constructor({user, token, empresa, tokenRaw, impresoras}: {user: User, token: string, empresa: Empresa, tokenRaw: string, impresoras: Impresora[] | null}) {
    this.user = user
    this.token = token
    this.empresa = empresa
    this.tokenRaw = tokenRaw
    this.impresoras = impresoras
  }

  static fromJSON(data: any): LoginResults {
    return new LoginResults({
      user: User.fromJSON(data.user),
      token: data.token,
      empresa: Empresa.fromJSON(data.empresa),
      tokenRaw: data.tokenRaw,
      impresoras: data.impresoras
    });
  }
}

export class LoginResponse {
  public success: boolean
   public results: LoginResults | null
   public status: number
   public message: string

  constructor({ success, results, status, message }: { success: boolean, results: LoginResults | null, status: number, message: string }) {
    this.success = success;
    this.results = results;
    this.status = status;
    this.message = message;

  }

  static fromJSON(data: any): LoginResponse {
    const results = data.results === null ? null : LoginResults.fromJSON(data.results);
    return new LoginResponse({ success: data.success, results, status: data.status, message: data.message });
  }
}
