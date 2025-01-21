export class SearchClienteResponse {
    success: boolean;
    status: number;
    results: SearchClienteResults[];
    message: string;

    constructor({ success = false, status = 0, results = [], message = '' }) {
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }

    static fromJSON(data: any) {
        return new SearchClienteResponse({
            success: data.success,
            status: data.status,
            results:  data.results.map((item: any) => SearchClienteResults.fromJSON(item)),
            message: data.message
        });
    }
}

export class SearchClienteResults {
    id: number;
    nombres: string;
    apellidos: string | null;
    doc: string;
    telefono: string | null;
    email: string | null;
    direccion: string | null;

    constructor({ id = 0, nombres = '', apellidos = '', doc = '', telefono = '', email = '', direccion = '' }) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.doc = doc;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
    }

    static fromJSON(data: any) {
        return new SearchClienteResults({
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            doc: data.doc,
            telefono: data.telefono,
            email: data.email,
            direccion: data.direccion
        });
    }
}

export class SearchClienteRequest {
    q: string;

    constructor({ q = '' }) {
        this.q = q;
    }

    toJSON() {
        return {
            q: this.q
        };
    }
}