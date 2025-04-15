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
    const handleKeyDown = (event: KeyboardEvent) => {
      // Mapeo de teclas a acciones usando un objeto
      const keyActions: Record<string, () => void> = {
        F5: () => handleModal("productos"),
        F6: () => handleModal("registro"),
        F7: () => handleModal("clientes"),
        F8: () => handleModal("finalizar"),
        Escape: clearAllModals,
      };
      const action = keyActions[event.key];

      // Si existe una acción para esta tecla
      if (action) {
        // Prevenir comportamiento por defecto para F5-F10
        if (event.key.startsWith("F")) {
          event.preventDefault();
        }

        // Ejecutar la acción
        action();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal, handleModal, clearAllModals]);

  const values = { modal, handleModal, clearAllModals, setModal };
  return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
