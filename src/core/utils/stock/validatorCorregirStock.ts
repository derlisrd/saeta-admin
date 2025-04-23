// src/utils/validators.ts

export function validarDeposito(depositoId: number): boolean {
    return depositoId > 0;
  }
  
  export function validarProducto(productoId: number): boolean {
    return productoId > 0;
  }
  
  export function validarCantidad(cantidad: number): boolean {
    return cantidad > 0;
  }
  
  export function validarFormularioStock(depositoId: number, productoId: number): boolean {
    return validarDeposito(depositoId) && validarProducto(productoId);
  }