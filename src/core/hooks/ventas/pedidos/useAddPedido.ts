import { AddPedido } from "@/services/dto/pedidos/AddPedido";
import { useState } from "react";

function useAddPedido() {
    const [modal,setModal] = useState({
        main: true,
        cliente: false,
    });

    const [pedido,setPedido] = useState(new AddPedido({}));

    const handleModal = (key : string, value: boolean) => {
        setModal({...modal, [key]: value});
    }

    const handlePedido = (key: string, value: any) => {
        setPedido({...pedido, [key]: value});
    }

    return {handleModal, modal, pedido, handlePedido};
}

export default useAddPedido;