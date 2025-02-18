import { ReactNode, useEffect, useState } from "react";
import ModalContext from "../_context/modalcontext";
import { modalType } from "../_types/modal";

function ModalProvider({ children }: { children: ReactNode }) {
  const initialModal: modalType = { main: true, clientes: false, finalizar: false, registro: false, productos: false, error: false, success: false };
  const [modal, setModal] = useState<modalType>(initialModal);
  const handleModal = (name: keyof modalType) => {
    setModal((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const clearAllModals = () => {
    setModal(initialModal);
  };

  useEffect(() => {
    const keyActions: Record<string, () => void> = {
      F6: () => {
        handleModal("clientes");
      },
      F7: () => {
        handleModal("productos");
      },
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (keyActions[event.key]) {
        event.preventDefault();
        keyActions[event.key]();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleModal]);

  const values = { modal, handleModal, clearAllModals };
  return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
