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