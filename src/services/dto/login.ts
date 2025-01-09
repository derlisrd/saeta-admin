export class Sucursal {
  constructor(
    public id: number,
    public empresa_id: number,
    public nombre: string,
    public descripcion: string,
    public direccion: string,
    public telefono: string,
    public numero: number,
    public created_at: string,
    public updated_at: string
  ) {}

  static fromJSON(data: any): Sucursal {
    return new Sucursal(data.id, data.empresa_id, data.nombre, data.descripcion, data.direccion, data.telefono, data.numero, data.created_at, data.updated_at);
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
  constructor(
    public id: number,
    public nombre: string,
    public ruc: string,
    public telefono: string,
    public direccion: string,
    public licencia: string,
    public propietario: string | null,
    public configurado: number,
    public created_at: string,
    public updated_at: string
  ) {}

  static fromJSON(data: any): Empresa {
    return new Empresa(data.id, data.nombre, data.ruc, data.telefono, data.direccion, data.licencia, data.propietario, data.configurado, data.created_at, data.updated_at);
  }
}

export class LoginResults {
  constructor(public user: User, public token: string, public empresa: Empresa, public tokenRaw: string) {}

  static fromJSON(data: any): LoginResults {
    return new LoginResults(User.fromJSON(data.user), data.token, Empresa.fromJSON(data.empresa), data.tokenRaw);
  }
}

export class LoginResponse {
  constructor(public success: boolean, public results: LoginResults | null, public status: number, public message: string) {}

  static fromJSON(data: any): LoginResponse {
    const results = data.results === null ? null :  LoginResults.fromJSON(data.results)
    return new LoginResponse(data.success, 
      results, 
      data.status, data.message);
  }
}
