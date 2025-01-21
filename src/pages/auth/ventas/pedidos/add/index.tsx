import ClientesModal from "./_modals/clientes";
import FinalizarPedido from "./_modals/finalizar";
import RegistroClienteModal from "./_modals/registro";
import Main from "./main";
import AddPedidoProvider from "./provider";

function AddPedido() {
  return (
    <AddPedidoProvider>
      <ClientesModal />
      <RegistroClienteModal />
      <FinalizarPedido />
      <Main />
    </AddPedidoProvider>
  );
}

export default AddPedido;
