import { useContext } from "react";
import ModalContext from "../_context/modalcontext";

function useModal() {
    const {modal, handleModal, clearAllModals,setModal} = useContext(ModalContext);
    return {modal, handleModal, clearAllModals,setModal}
}

export default useModal;