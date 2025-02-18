import { useContext } from "react";
import ModalContext from "../_context/modalcontext";

function useModal() {
    const {modal, handleModal, clearAllModals} = useContext(ModalContext);
    return {modal, handleModal, clearAllModals}
}

export default useModal;