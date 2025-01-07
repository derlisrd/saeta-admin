export class AddStock {
    deposito_id: number;
    cantidad: number;
    deposito: string;
  
    constructor({ deposito_id = 0, cantidad = 0, deposito ='' }: Partial<AddStock>) {
      this.deposito_id = deposito_id;
      this.cantidad = cantidad;
      this.deposito = deposito
    }
  
    static fromJSON(json: Record<string, any>): AddStock {
      return new AddStock(json);
    }
  
    toJSON(): Record<string, any> {
      return {
        deposito_id: this.deposito_id,
        cantidad: this.cantidad,
        deposito: this.deposito
      };
    }
  }