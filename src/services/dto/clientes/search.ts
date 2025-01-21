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
    nombre: string;
    apellido: string | null;
    doc: string;
    telefono: string | null;
    email: string | null;
    direccion: string | null;

    constructor({ id = 0, nombre = '', apellido = '', doc = '', telefono = '', email = '', direccion = '' }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.doc = doc;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
    }

    static fromJSON(data: any) {
        return new SearchClienteResults({
            id: data.id,
            nombre: data.nombre,
            apellido: data.apellido,
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