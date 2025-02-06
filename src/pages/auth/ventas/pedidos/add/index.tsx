import modals from "./modals";
import Main from "./main";
import AddPedidoProvider from "./provider";
import Root from "./root";
import ModalProvider from "./_providers/modalprovider";

function AddPedido() {
  return (
    <AddPedidoProvider>
      <ModalProvider>
        {modals.map((Modal, index) => (
          <Modal key={index} />
        ))}
        <Main />
        <Root />
      </ModalProvider>
    </AddPedidoProvider>
  );
}

export default AddPedido;
