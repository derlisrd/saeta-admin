export class AddCliente{
    nombres: string;
    apellidos: string;
    razon_social: string;
    doc: string;
    extranjero: number;
    telefono: string;
    email: string;

    constructor({ nombres = '', apellidos = '', razon_social = '', doc = '', extranjero = 0, telefono = '', email = '' }: Partial<AddCliente>) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.razon_social = razon_social;
        this.doc = doc;
        this.extranjero = extranjero;
        this.telefono = telefono;
        this.email = email;
    }
}