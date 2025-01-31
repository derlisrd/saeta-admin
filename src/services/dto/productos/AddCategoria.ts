export class AddCategoria {
    nombre: string;
    descripcion: string | null;
    publicado: boolean;

    constructor({
        nombre,
        descripcion,
        publicado
    }:{
        nombre: string,
        descripcion: string | null,
        publicado: boolean
    }){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.publicado = publicado;
    }
}



export class AddCategoriaResponse{
    success: boolean;
    status: number;
    message: string;
    results: AddCategoriaResults | null;

    constructor({
        success,
        status,
        message,
        results
    }:{
        success: boolean,
        status: number,
        message: string,
        results: AddCategoriaResults | null
    }){
        this.success = success;
        this.status = status;
        this.message = message;
        this.results = results;
    }
}

export class AddCategoriaResults{
    id: number;
    nombre: string;
    descripcion: string | null;
    publicado: number;

    constructor({
        id,
        nombre,
        descripcion,
        publicado
    }:{
        id: number,
        nombre: string,
        descripcion: string | null,
        publicado: number
    }){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.publicado = publicado;
    }

    static fromJSON(json: Record<string, any>): AddCategoriaResults{
        return new AddCategoriaResults({
            id: json.id,
            nombre: json.nombre,
            descripcion: json.descripcion,
            publicado: json.publicado
        });
    }
}