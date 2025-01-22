export class ClienteResults{
    id: number;
    nombres: string;
    apellidos: string | null;
    razon_social: string | null;
    doc: string;
    extranjero: boolean;
    telefono: string | null;

    constructor({ razon_social = '', id = 0, nombres = '', apellidos = '', doc ='', extranjero =false, telefono =''  } : Partial<ClienteResults>)  {
        this.id = id;
        this.razon_social = razon_social;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.doc = doc;
        this.extranjero = extranjero;
        this.telefono = telefono;
    }

    static fromJSON(data: any) {
        return new ClienteResults({
            id: data.id,
            razon_social: data.razon_social,
            nombres: data.nombres,
            apellidos: data.apellidos,
            doc: data.doc,
            extranjero: data.extranjero,
            telefono: data.telefono
        });
    }
}