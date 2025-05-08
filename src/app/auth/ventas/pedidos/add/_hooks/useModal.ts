import { useContext } from "react";
import ModalContext from "../_context/modalcontext";

function useModal() {
    const context = useContext(ModalContext);
    if(!context){
        throw new Error('useModel error context')
    }
    return context
}

export default useModal;