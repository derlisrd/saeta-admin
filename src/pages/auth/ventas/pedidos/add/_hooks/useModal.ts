import { useContext } from "react";
import ModalContext from "../_context/modalcontext";

function useModal() {
    const {modal, handleModal} = useContext(ModalContext);
    return {modal, handleModal}
}

export default useModal;