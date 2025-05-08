import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { useState } from "react";

function useValidateFormaPago() {
    const initialError = { code: 0, message: ""};
        const [error, setError] = useState(initialError);
        

    const validate = (form : AddPedido) =>{
        let error = {
            code: 0,
            message: ''
        }
        let sumaFormasPago = form.formas_pagos.reduce((sum, formaPago) => sum + formaPago.monto, 0);
            if((form.total - form.descuento) > sumaFormasPago && form.tipo === 0 ){
                error = {
                    code: 7,
                    message: "El monto abonado no es suficiente"
                }
                return error
            }

        if(form.tipo ===1 && form.cliente_id === 0){
            error = {
                code: 1,
                message: "Debe seleccionar un cliente si la condición de venta es crédito"
            }
            return error
        }
        return error
    }

    return {error, validate,setError}
}

export default useValidateFormaPago;