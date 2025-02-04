export class PorDocumentoResponse{
    success: boolean;
    status: number;
    results: PorDocumentoResults | null;
    message: string;

    constructor({ success = false, status = 0, results = null, message = '' }) {
        this.success = success;
        this.status = status;
        this.results = results ? new PorDocumentoResults(results) : null;
        this.message = message;
    }


}

export class PorDocumentoResults{
    doc: string;
    ruc: string;
    nombre: string;
    razon_social: string;

    constructor({ doc = '', ruc = '', nombre = '', razon_social = '' }) {
        this.doc = doc;
        this.ruc = ruc;
        this.nombre = nombre;
        this.razon_social = razon_social;
    }

}