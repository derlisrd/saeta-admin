export class AddPedido{
    cliente_id : number;
    formas_pago_id : number;
    tipo: number;
    porcentaje_descuento: number;
    descuento: number;
    total: number;
    items: AddPedidoItem[];

    constructor({
        cliente_id = 0,
        formas_pago_id = 0,
        tipo = 0,
        porcentaje_descuento = 0,
        descuento = 0,
        total = 0,
        items = []
    }: Partial<AddPedido>){
        this.cliente_id = cliente_id;
        this.formas_pago_id = formas_pago_id;
        this.tipo = tipo;
        this.porcentaje_descuento = porcentaje_descuento;
        this.descuento = descuento;
        this.total = total;
        this.items = items.map(item => new AddPedidoItem(item));
    }
}


export class AddPedidoItem{
    producto_id: number;
    deposito_id: number;
    impuesto_id: number;
    cantidad: number;
    precio: number;
    descuento: number;
    total: number;
    observacion: string;

    constructor({
        producto_id = 0,
        deposito_id = 0,
        impuesto_id = 0,
        cantidad = 0,
        precio = 0,
        descuento = 0,
        total = 0,
        observacion = ""
    }: Partial<AddPedidoItem>){
        this.producto_id = producto_id;
        this.deposito_id = deposito_id;
        this.impuesto_id = impuesto_id;
        this.cantidad = cantidad;
        this.precio = precio;
        this.descuento = descuento;
        this.total = total;
        this.observacion = observacion;
    }
}