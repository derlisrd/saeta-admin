import ClientesModal from "./_modals/clientes";
import ErrorModal from "./_modals/error";
import FinalizarPedido from "./_modals/finalizar";
import RegistroClienteModal from "./_modals/registro";
import SuccessModal from "./_modals/success";
import Main from "./main";
import AddPedidoProvider from "./provider";
import Root from "./root";

function AddPedido() {
  return (
    <AddPedidoProvider>
      <ErrorModal />
      <SuccessModal />
      <ClientesModal />
      <RegistroClienteModal />
      <RegistroClienteModal />
      <FinalizarPedido />
      <Main />
      <Root />
    </AddPedidoProvider>
  );
}

export default AddPedido;
