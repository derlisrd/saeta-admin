import { useContext } from "react";
import { AddPedidoContext } from "./provider";

function useAddPedido() {
    const {modal,handleModal} = useContext(AddPedidoContext);
    return { modal, handleModal };
}

export default useAddPedido;