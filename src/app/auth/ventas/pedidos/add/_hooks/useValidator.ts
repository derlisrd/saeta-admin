import { AddPedido } from "@/services/dto/pedidos/AddPedido";

function useValidator() {
    
    const validate = (form : AddPedido) => {
        let error = {
            code: 0,
            active: false,
            message: ""
        }
        if(form.items.length <= 0){
            error = {
                code: 2,
                active: true,
                message: "Debe agregar al menos un producto"
            }
            return error
        }
        if(form.formas_pagos.length === 0){
            error = {
                code: 43,
                active: true,
                message: "Debe seleccionar una forma de pago"
            }
            return error
        }
        let sumaFormasPago = form.formas_pagos.reduce((sum, formaPago) => sum + formaPago.monto, 0);
        if((form.total - form.descuento) > sumaFormasPago ){
            error = {
                code: 7,
                active: true,
                message: "El monto abonado no es suficiente"
            }
            return error
        }

        return error
    }

    
    return {validate}
}

export default useValidator;