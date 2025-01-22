import { AddPedido } from "@/services/dto/pedidos/AddPedido";

function useValidator() {
    
    const validate = (form : AddPedido) => {
        let error = {
            name: '',
            active: false,
            message: ""
        }
        if(form.items.length <= 0){
            error = {
                name: 'items',
                active: true,
                message: "Debe agregar al menos un producto"
            }
            return error
        }
        if(form.formas_pago_id === 0){
            error = {
                name: 'formas_pago_id',
                active: true,
                message: "Debe seleccionar una forma de pago"
            }
            return error
        }

        return error
    }

    
    return {validate}
}

export default useValidator;