export class ClienteResults{
    id: number;
    nombres: string;
    apellidos: string | null;
    doc: string;
    extranjero: boolean;
    telefono: string | null;

    constructor({ id = 0, nombres = '', apellidos = '', doc ='', extranjero =false, telefono =''  } : Partial<ClienteResults>)  {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.doc = doc;
        this.extranjero = extranjero;
        this.telefono = telefono;
    }

    static fromJSON(data: any) {
        return new ClienteResults({
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            doc: data.doc,
            extranjero: data.extranjero,
            telefono: data.telefono
        });
    }
}