import { useState } from "react";
import { AddPedido } from "@/services/dto/pedidos/AddPedido";

function useFinalizarPedido() {
    const initialError = { code: 0, message: "", active: false };
    const [error, setError] = useState(initialError);
    

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
            if(form.formas_pagos.length === 0 && form.tipo === 0){
                error = {
                    code: 43,
                    active: true,
                    message: "Debe seleccionar una forma de pago"
                }
                return error
            }
            let sumaFormasPago = form.formas_pagos.reduce((sum, formaPago) => sum + formaPago.monto, 0);
            if((form.total - form.descuento) > sumaFormasPago && form.tipo === 0 ){
                error = {
                    code: 7,
                    active: true,
                    message: "El monto abonado no es suficiente"
                }
                return error
            }

            if(form.tipo ===1 && form.cliente_id === 0){
                error = {
                    code: 1,
                    active: true,
                    message: "Debe seleccionar un cliente si la condición de venta es crédito"
                }
                return error
            }
    
            return error
        }
    

    return {error,setError, validate}
}

export default useFinalizarPedido