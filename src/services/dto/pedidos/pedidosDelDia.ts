export class PedidosDelDiaResponse{
    success: boolean;
    status: number;
    results: PedidosDelDiaResults[] | null;
    message: string;


    constructor({success = false, status = 0, results = null, message =''}: Partial<PedidosDelDiaResponse>){
        this.success = success;
        this.status = status;
        this.results = results;
        this.message = message;
    }
}

export class PedidosDelDiaResults{
    
}