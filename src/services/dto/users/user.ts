export class UserCreateForm{
    name: string;
    username: string;
    email: string;
    password: string;
    sucursal_id: number;
    empresa_id: number;

    constructor({ name = '', username = '', email='', password='',sucursal_id=0, empresa_id=0 } : Partial<UserCreateForm> ){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.sucursal_id = sucursal_id;
        this.empresa_id = empresa_id;
    }
}

export class UserCreateResponse{
    success: boolean;
    status: number;
    results: UserCreateResults | null;
    message: string;


    constructor({ success = false, status = 0, results = null, message = '' } : Partial<UserCreateResponse>){
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }
}
export class UserCreateResults{
    name: string;
    username: string;
    email: string;

    constructor({ name = '', username = '', email='' } : Partial<UserCreateResults> ){
        this.name = name;
        this.username = username;
        this.email = email;
    }
}

export class UserListResponse{
    success: boolean;
    status: number;
    results: UserListResults[] | null;
    message: string;

    constructor({ success = false, status = 0, results = null, message = '' } : Partial<UserListResponse>){
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }
}

export class UserListResults{
    id: number;
    name: string;
    username: string;
    email: string;
    activo: number;
    sucursal_id: number;

    constructor({ id = 0, name = '', username = '', email='', activo=0, sucursal_id=0 } : Partial<UserListResults> ){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.activo = activo;
        this.sucursal_id = sucursal_id;
    }
}