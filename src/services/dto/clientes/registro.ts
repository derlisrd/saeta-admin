export class RegistroCliente {
    doc : string;
    nombres : string;
    apellidos : string;
    email : string;
    razon_social: string | null;
    telefono: string | null;
    direccion: string | null;

    constructor({ doc = '', nombres = '', apellidos = '', email = '', razon_social = '', telefono = '', direccion = ''  } : Partial<RegistroCliente>)  {
        this.doc = doc;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.email = email;
        this.razon_social = razon_social;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    static fromJSON(data: any) {
        return new RegistroCliente({
            doc: data.doc,
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            razon_social: data.razon_social,
            telefono: data.telefono,
            direccion: data.direccion
        });
    }

}