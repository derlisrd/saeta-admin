export class VerificarConfigEmpresaResponse{
    success : boolean;
    status: number;
    message: string;
    results: VerificarEmpresaResults | null;

  constructor({ success = false, status = 0, message = "", results = null }: Partial<VerificarConfigEmpresaResponse>) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.results = results ? VerificarEmpresaResults.fromJSON(results) : null;
  }
}

export class VerificarEmpresaResults{
  configurado: boolean;
  direccion: string;
  telefono: string;
  propietario: string | null;
  ruc: string;
  licencia: string;
  nombre: string;
  logo: string | null;

  constructor({ configurado = false, direccion = "", telefono = "", propietario = null, ruc = "", licencia = "", nombre = "", logo = null }: Partial<VerificarEmpresaResults>) {
    this.configurado = configurado;
    this.direccion = direccion;
    this.telefono = telefono;
    this.propietario = propietario;
    this.ruc = ruc;
    this.licencia = licencia;
    this.nombre = nombre;
    this.logo = logo;
  }

  static fromJSON(json: Record<string, any>): VerificarEmpresaResults {
    return new VerificarEmpresaResults({ ...json, configurado: json.configurado === 1 || false });
  }
}