import { createContext } from "react";
import { modalType } from "../_types/modal";

interface ModalContextProps {
  modal: modalType;
  handleModal: (name: keyof modalType) => void;
  clearAllModals: () => void;
  setModal: React.Dispatch<React.SetStateAction<modalType>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);
ModalContext.displayName = "ModalContext";
export default ModalContext;
