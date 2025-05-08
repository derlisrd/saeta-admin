import { Dialog } from "@mui/material";
import useModal from "../_hooks/useModal";

function MasVendidosModal() {
  const { modal, handleModal } = useModal();
  if (!modal.masvendidos) return null;

  return <Dialog onClose={() => handleModal("masvendidos")} open={modal.masvendidos}></Dialog>;
}

export default MasVendidosModal;
