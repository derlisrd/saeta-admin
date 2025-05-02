import { createContext } from "react";
import { modalType } from "../_types/modal";

interface ModalContextProps {
  modal: modalType;
  handleModal: (name: keyof modalType) => void;
  clearAllModals: () => void;
  setModal: React.Dispatch<React.SetStateAction<modalType>>;
}

const ModalContext = createContext<ModalContextProps>({
  modal: {
    main: true,
    registro: false,
    clientes: false,
    finalizar: false,
    productos: false,
    error: false,
    success: false,
    descuento: false,
  },
  setModal: () => {},
  handleModal: () => {},
  clearAllModals: () => {},
});
ModalContext.displayName = "ModalContext";
export default ModalContext;
